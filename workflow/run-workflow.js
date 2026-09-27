/**
 * run-workflow.js
 * Blog pipeline orchestrator — Stage 4 AI Certification
 *
 * Usage:
 *   node workflow/run-workflow.js path/to/transcript.txt
 *
 * Authentication:
 *   Uses the `claude` CLI (Claude Code) — no ANTHROPIC_API_KEY required.
 *   The CLI must be installed and authenticated (run `claude` once to confirm).
 *
 * Steps:
 *   1. transcript-analysis  → outline-check
 *   2. blog-draft-writer    → draft-check
 *   3. anti-ai-voice        → voice-check
 *   4. ai-smell-test        → grade-gate  (revision loop, max 2)
 *   5. blog-qa-reviewer     → qa-gate     (hard stop on any FAIL)
 *   6. blog-refinement      → publish kit (terminal success)
 */

'use strict';

const { spawnSync, execSync } = require('child_process');
const fs                      = require('fs');
const path                    = require('path');

// ---------------------------------------------------------------------------
// Resolve the `claude` binary path at startup.
// spawnSync with shell:true uses /bin/sh which may not have claude in PATH.
// We ask zsh (the macOS default interactive shell) where claude lives.
// ---------------------------------------------------------------------------
function resolveClaude() {
  // 1. Explicit override
  if (process.env.CLAUDE_BIN) return process.env.CLAUDE_BIN;

  // 2. Claude desktop app install locations (macOS) — glob latest version dir.
  // We skip `which claude` / PATH lookups intentionally: the npm-installed claude
  // at /opt/homebrew/bin/claude may be present but broken (missing native binary),
  // while the desktop app ships a working native binary.
  const home = process.env.HOME || '';
  const searchRoots = [
    path.join(home, 'Library', 'Application Support', 'Claude', 'claude-code'),
    path.join(home, 'Library', 'Application Support', 'Claude', 'claude-code-vm'),
  ];
  for (const root of searchRoots) {
    if (!fs.existsSync(root)) continue;
    // Check if root itself is the binary
    if (fs.statSync(root).isFile()) return root;
    // Otherwise look one level deep for version dirs, pick latest
    const entries = fs.readdirSync(root).sort().reverse();
    for (const entry of entries) {
      const candidates = [
        path.join(root, entry, 'claude.app', 'Contents', 'MacOS', 'claude'),
        path.join(root, entry, 'claude'),
        path.join(root, 'claude'),
      ];
      for (const p of candidates) {
        if (fs.existsSync(p)) return p;
      }
    }
  }

  throw new Error(
    'Cannot locate claude binary.\n' +
    'Fix: CLAUDE_BIN=/path/to/claude node workflow/run-workflow.js ...'
  );
}

const CLAUDE_BIN = process.env.CLAUDE_BIN || resolveClaude();
console.log(`  [init] claude binary: ${CLAUDE_BIN}`);

// ---------------------------------------------------------------------------
// Paths (all relative to workflow/ where this script lives)
// ---------------------------------------------------------------------------
const ROOT          = path.resolve(__dirname, '..');
const PROMPTS_DIR   = path.join(ROOT, 'prompts');
const RUNS_DIR      = path.join(ROOT, 'runs');
const PUNCH_OUT_DIR = path.join(ROOT, 'punch-out');

// ---------------------------------------------------------------------------
// Dependencies
// ---------------------------------------------------------------------------
const { logStep, aiStepEntry, guardrailEntry } = require('../monitoring/audit-logger');
const { outlineCheck }  = require('../guardrails/outline-check');
const { draftCheck }    = require('../guardrails/draft-check');
const { voiceCheck }    = require('../guardrails/voice-check');
const { gradeGate }     = require('../guardrails/grade-gate');
const { qaGate }        = require('../guardrails/qa-gate');

const MODEL = 'claude-sonnet-4-6';

// Sonnet 4.6 pricing (USD per token) — used for estimated cost in audit trail
const PRICE_INPUT_PER_TOKEN  = 3.00  / 1_000_000;
const PRICE_OUTPUT_PER_TOKEN = 15.00 / 1_000_000;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Auto-increment run ID based on existing run-NNN folders. */
function resolveRunId() {
  fs.mkdirSync(RUNS_DIR, { recursive: true });
  const existing = fs.readdirSync(RUNS_DIR).filter(d => /^run-\d{3}$/.test(d));
  return `run-${String(existing.length + 1).padStart(3, '0')}`;
}

/** Read a prompt file. */
function readPrompt(stepName) {
  return fs.readFileSync(path.join(PROMPTS_DIR, `${stepName}.md`), 'utf8');
}

/** Write an artifact into the run folder. */
function saveArtifact(runDir, filename, content) {
  fs.writeFileSync(path.join(runDir, filename), content, 'utf8');
}

/** Trigger punch-out: write record, log it, exit 1. */
function punchOut(runId, runDir, step, reason) {
  fs.mkdirSync(PUNCH_OUT_DIR, { recursive: true });
  const record = JSON.stringify({ runId, step, reason, timestamp: new Date().toISOString() }, null, 2);
  saveArtifact(runDir, 'punch-out.json', record);
  fs.writeFileSync(path.join(PUNCH_OUT_DIR, `${runId}.json`), record, 'utf8');

  const entry = guardrailEntry(runId, step, 'punch-out', reason);
  logStep(runDir, entry);

  console.error(`\n[PUNCH-OUT] ${runId} → step "${step}": ${reason}`);
  process.exit(1);
}

/**
 * Call Claude via the `claude` CLI in non-interactive (--print) mode.
 *
 * Combines systemPrompt + userContent into a single stdin payload.
 * Token counts are estimated (1 token ≈ 4 chars) since the CLI does not
 * return usage metadata. Costs are derived from those estimates.
 *
 * Returns { text, inputTokens, outputTokens }.
 */
function callModel(systemPrompt, userContent) {
  const combinedPrompt = `${systemPrompt}\n\n---\n\n${userContent}`;

  const result = spawnSync(
    CLAUDE_BIN,
    ['--print', '--model', MODEL, '--output-format', 'json', '--tools', 'none'],
    {
      input:     combinedPrompt,   // fed to claude's stdin
      encoding:  'utf8',
      maxBuffer: 20 * 1024 * 1024, // 20 MB — enough for any blog step output
      timeout:   600_000,          // 10 minutes per step
    }
  );

  if (result.error) {
    throw new Error(`claude CLI spawn error: ${result.error.message}`);
  }
  if (result.status !== 0) {
    const stderr = (result.stderr || '').trim();
    throw new Error(`claude CLI exited ${result.status}${stderr ? ': ' + stderr : ''}`);
  }

  // --output-format json wraps the response; extract the text result.
  // Falls back to raw stdout if parsing fails (e.g. older CLI versions).
  let text;
  try {
    const envelope = JSON.parse(result.stdout.trim());
    text = (envelope.result ?? envelope.content ?? result.stdout).trim();
  } catch (_) {
    text = result.stdout.trim();
  }

  if (!text) {
    throw new Error('claude CLI returned empty output');
  }

  // Rough token estimation: 1 token ≈ 4 characters (English text heuristic)
  const inputTokens  = Math.round(combinedPrompt.length / 4);
  const outputTokens = Math.round(text.length / 4);

  return { text, inputTokens, outputTokens };
}

/**
 * Extract the actual smell-test report from ai-smell-test output.
 * The skill runs with --tools none, so it outputs tool call XML wrapping the report.
 * Pull the content out of the <parameter name="content"> block when present,
 * otherwise strip all XML tags and return what remains.
 */
function extractSmellTestReport(text) {
  // Try to pull content from <parameter name="content">...</parameter>
  const match = text.match(/<parameter name="content">([\s\S]*?)<\/parameter>/);
  if (match) return match[1].trim();
  // Fallback: strip XML-style tags
  return text.replace(/<[^>]+>/g, '').trim();
}

/**
 * Strip model preamble/postamble from blog draft output.
 * Keeps only content from the first # heading onwards and removes any
 * trailing "Draft complete" meta-commentary after the last blog section.
 */
function stripDraftMetaCommentary(text) {
  const lines = text.split('\n');
  const firstHeadingIdx = lines.findIndex(l => /^#/.test(l));
  if (firstHeadingIdx === -1) return text;
  let stripped = lines.slice(firstHeadingIdx).join('\n');
  stripped = stripped.replace(/\n---\s*\nDraft complete[\s\S]*$/i, '');
  stripped = stripped.replace(/\n\nDraft complete[\s\S]*$/i, '');
  return stripped.trim();
}

/**
 * Run one AI step, log it, and save the artifact.
 * Returns the raw text output.
 */
async function runStep({ runId, runDir, stepName, artifactFile, systemPrompt, userContent, attempt = 1 }) {
  console.log(`  [${stepName}] calling claude CLI (attempt ${attempt})...`);
  const { text, inputTokens, outputTokens } = callModel(systemPrompt, userContent);

  const entry = aiStepEntry(runId, stepName, MODEL, inputTokens, outputTokens, 'pass',
    `${artifactFile} produced`, attempt);
  logStep(runDir, entry);
  saveArtifact(runDir, artifactFile, text);

  return text;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  // --outline <path>  skips step 1 and reuses an existing transcript-analysis output.
  // Useful for testing steps 2-6 without waiting for the slow analysis step.
  const outlineFlag = process.argv.indexOf('--outline');
  const outlinePath = outlineFlag !== -1 ? process.argv[outlineFlag + 1] : null;
  // Only treat argv[2] as a transcript if --outline was NOT passed
  const transcriptPath = outlinePath ? null : process.argv[2];

  if (!transcriptPath && !outlinePath) {
    console.error('Usage: node workflow/run-workflow.js <path/to/transcript.txt>');
    console.error('       node workflow/run-workflow.js --outline <path/to/01-outline.json>');
    process.exit(1);
  }

  const runId  = resolveRunId();
  const runDir = path.join(RUNS_DIR, runId);
  fs.mkdirSync(runDir, { recursive: true });

  let outlineText;

  if (outlinePath) {
    // ── Skip step 1: load existing outline ───────────────────────────────────
    if (!fs.existsSync(outlinePath)) {
      console.error(`Outline file not found: ${outlinePath}`);
      process.exit(1);
    }
    outlineText = fs.readFileSync(outlinePath, 'utf8');
    console.log(`\n=== Blog Pipeline — ${runId} (resume from outline) ===`);
    console.log(`Outline: ${path.basename(outlinePath)}\n`);
    console.log('[1/6] transcript-analysis — SKIPPED (using provided outline)');
    saveArtifact(runDir, '01-outline.json', outlineText);
    logStep(runDir, guardrailEntry(runId, 'outline-check', 'pass', 'outline loaded from prior run (skip)'));
  } else {
    // ── Step 1: transcript-analysis ──────────────────────────────────────────
    if (!fs.existsSync(transcriptPath)) {
      console.error(`File not found: ${transcriptPath}`);
      process.exit(1);
    }
    const transcript = fs.readFileSync(transcriptPath, 'utf8');
    console.log(`\n=== Blog Pipeline — ${runId} ===`);
    console.log(`Transcript: ${path.basename(transcriptPath)}\n`);

    console.log('[1/6] transcript-analysis');
    outlineText = await runStep({
      runId, runDir,
      stepName:     'transcript-analysis',
      artifactFile: '01-outline.json',
      systemPrompt: readPrompt('transcript-analysis'),
      userContent:  `Here is the SME interview transcript:\n\n${transcript}`,
    });

    const outlineResult = outlineCheck(outlineText);
    logStep(runDir, guardrailEntry(runId, 'outline-check',
      outlineResult.pass ? 'pass' : 'fail',
      outlineResult.pass ? 'outline valid' : outlineResult.errors.join('; ')));
    if (!outlineResult.pass) {
      punchOut(runId, runDir, 'outline-check', `Outline failed validation: ${outlineResult.errors.join('; ')}`);
    }
  }

  // ── Step 2: blog-draft-writer ─────────────────────────────────────────────
  console.log('[2/6] blog-draft-writer');
  const rawDraftText = await runStep({
    runId, runDir,
    stepName:     'blog-draft-writer',
    artifactFile: '02-draft.md',
    systemPrompt: readPrompt('blog-draft-writer'),
    userContent:  `Here is the approved outline:\n\n${outlineText}\n\n---\nIMPORTANT: Write the full blog draft now. Output ONLY the blog article — no preamble, no commentary, no "Draft complete" lines. Start directly with the # title heading. Hard limit: 800–1,500 words maximum. Do NOT exceed 1,500 words.\n\nCRITICAL AI-SMELL BAN: Do NOT use contrast-negation structures ("X doesn't Y. It Z." / "Not X — Y." / "The question isn't X. It's Y."). These are the #1 AI writing tell and will cause an automatic D grade. Rewrite any such sentence as a direct positive claim.`,
  });

  // Strip any model preamble/postamble before guardrail check
  const draftText = stripDraftMetaCommentary(rawDraftText);
  if (draftText !== rawDraftText) {
    saveArtifact(runDir, '02-draft.md', draftText);
  }

  const draftResult = draftCheck(draftText);
  logStep(runDir, guardrailEntry(runId, 'draft-check',
    draftResult.pass ? 'pass' : 'fail',
    draftResult.pass ? 'draft valid' : draftResult.errors.join('; ')));
  if (!draftResult.pass) {
    punchOut(runId, runDir, 'draft-check', `Draft failed validation: ${draftResult.errors.join('; ')}`);
  }

  // ── Step 3 + 4: anti-ai-voice → ai-smell-test (revision loop) ────────────
  console.log('[3/6] anti-ai-voice');
  let cleanedText;
  let gradedText;
  let revisionCount = 0;
  const MAX_REVISIONS = 2;
  let currentDraft = draftText;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // Step 3: anti-ai-voice
    const rawCleanedText = await runStep({
      runId, runDir,
      stepName:     'anti-ai-voice',
      artifactFile: `03-cleaned${revisionCount > 0 ? `-rev${revisionCount}` : ''}.md`,
      systemPrompt: readPrompt('anti-ai-voice'),
      userContent:  `Here is the blog draft to clean:\n\n${currentDraft}`,
      attempt:      revisionCount + 1,
    });

    // Strip any model preamble/postamble before saving/grading — same leak
    // pattern as the raw blog-draft-writer output (e.g. "Let me scan for
    // banned words..." narration ahead of the actual article).
    cleanedText = stripDraftMetaCommentary(rawCleanedText);
    if (cleanedText !== rawCleanedText) {
      saveArtifact(runDir, `03-cleaned${revisionCount > 0 ? `-rev${revisionCount}` : ''}.md`, cleanedText);
    }

    const voiceResult = voiceCheck(cleanedText);
    logStep(runDir, guardrailEntry(runId, 'voice-check',
      voiceResult.pass ? 'pass' : 'fail',
      voiceResult.pass ? 'voice clean' : `${voiceResult.violations?.length ?? 0} banned phrases found`));
    // voice-check failure is a warning, not a hard stop — grade-gate catches quality issues

    // Step 4: ai-smell-test
    console.log('[4/6] ai-smell-test');
    gradedText = await runStep({
      runId, runDir,
      stepName:     'ai-smell-test',
      artifactFile: `04-graded${revisionCount > 0 ? `-rev${revisionCount}` : ''}.md`,
      systemPrompt: readPrompt('ai-smell-test'),
      userContent:  `Please grade this blog draft:\n\n${cleanedText}`,
      attempt:      revisionCount + 1,
    });

    // Extract clean report text (strips tool-call XML that ai-smell-test emits with --tools none)
    const gradeReport = extractSmellTestReport(gradedText);

    const gradeResult = gradeGate(gradeReport, revisionCount);
    logStep(runDir, guardrailEntry(runId, 'grade-gate',
      gradeResult.decision === 'proceed' ? 'pass' : (gradeResult.decision === 'punch-out' ? 'punch-out' : 'fail'),
      `Grade: ${gradeResult.grade ?? '?'} | revisions: ${revisionCount}`));

    if (gradeResult.decision === 'proceed') {
      // Save final cleaned artifact with canonical name
      saveArtifact(runDir, '03-cleaned.md', cleanedText);
      saveArtifact(runDir, '04-graded.md', gradeReport);
      break;
    }

    if (gradeResult.decision === 'punch-out' || revisionCount >= MAX_REVISIONS) {
      punchOut(runId, runDir, 'grade-gate',
        `Grade ${gradeResult.grade ?? '?'} after ${revisionCount + 1} attempt(s) — max revisions reached`);
    }

    // Revision: send to blog-refinement with targeted smell-fix instructions.
    // blog-refinement is scoped here to pattern fixes only — no SEO, no publish kit.
    revisionCount += 1;
    console.log(`  [grade-gate] Grade ${gradeResult.grade} — targeted smell-fix via blog-refinement (attempt ${revisionCount + 1}/${MAX_REVISIONS + 1})`);
    const smellFixText = await runStep({
      runId, runDir,
      stepName:     'blog-refinement',
      artifactFile: `04b-smell-fix-rev${revisionCount}.md`,
      systemPrompt: readPrompt('blog-refinement'),
      userContent:  [
        'TARGETED REVISION ONLY — do NOT produce a publish kit, SEO metadata, URL slug, or social teaser.',
        'Return ONLY the corrected article markdown. Do not add or remove sections.',
        '',
        'Fix each flagged pattern below and nothing else. The smell test grader will re-score the output.',
        '',
        '## Smell-test findings to fix',
        gradeReport,
        '',
        '## Draft to fix',
        cleanedText,
      ].join('\n'),
      attempt: revisionCount,
    });
    currentDraft = smellFixText;
  }

  // ── Step 5: blog-qa-reviewer (adversarial gate) ───────────────────────────
  console.log('[5/6] blog-qa-reviewer');
  const qaText = await runStep({
    runId, runDir,
    stepName:     'blog-qa-reviewer',
    artifactFile: '05-qa.md',
    systemPrompt: readPrompt('blog-qa-reviewer'),
    userContent:  `Please review this blog article:\n\n${cleanedText}`,
  });

  const qaResult = qaGate(qaText);
  logStep(runDir, guardrailEntry(runId, 'qa-gate',
    qaResult.punchOut ? 'punch-out' : 'pass',
    qaResult.punchOut
      ? `${qaResult.failItems.length} FAIL item(s): ${qaResult.failItems.slice(0, 3).join('; ')}`
      : 'all checks PASS/WARN'));

  if (qaResult.punchOut) {
    punchOut(runId, runDir, 'qa-gate',
      `QA reviewer found ${qaResult.failItems.length} FAIL item(s): ${qaResult.failItems.join('; ')}`);
  }

  // ── Step 6: blog-refinement (PASS path) ──────────────────────────────────
  console.log('[6/6] blog-refinement');
  await runStep({
    runId, runDir,
    stepName:     'blog-refinement',
    artifactFile: '06-publish-kit.md',
    systemPrompt: readPrompt('blog-refinement'),
    userContent: [
      'Please produce the final polished article and full SEO publication kit.',
      '',
      '## Cleaned Draft',
      cleanedText,
      '',
      '## QA Review Notes',
      qaText,
    ].join('\n'),
  });

  // ── Success ───────────────────────────────────────────────────────────────
  console.log('\n=== Pipeline Complete ===');
  console.log(`Run ID  : ${runId}`);
  console.log(`Folder  : ${runDir}`);
  console.log('Output  : 06-publish-kit.md');
  console.log('Audit   : audit-trail.jsonl\n');
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------
main().catch(err => {
  console.error('\n[FATAL]', err.message ?? err);
  try {
    fs.mkdirSync(PUNCH_OUT_DIR, { recursive: true });
    fs.writeFileSync(
      path.join(PUNCH_OUT_DIR, 'unknown-fatal.json'),
      JSON.stringify({ runId: 'unknown', step: 'orchestrator', reason: err.message ?? String(err), timestamp: new Date().toISOString() }, null, 2),
      'utf8'
    );
  } catch (_) { /* swallow */ }
  process.exit(1);
});
