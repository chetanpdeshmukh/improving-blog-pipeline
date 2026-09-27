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
const FAILURES_DIR  = path.join(ROOT, 'failures');

// Tracks the active run's id/dir so the top-level catch handler (which fires
// on ANY uncaught error, including a CLI spawn crash mid-step) can attribute
// a failure record to the real run instead of writing a generic "unknown"
// placeholder. Set as soon as main() claims a run folder; null before that
// (e.g. a bad CLI argument) and after main() returns normally.
let activeRunId = null;
let activeRunDir = null;

// ---------------------------------------------------------------------------
// Dependencies
// ---------------------------------------------------------------------------
const { logStep, aiStepEntry, guardrailEntry } = require('../monitoring/audit-logger');
const { outlineCheck }  = require('../guardrails/outline-check');
const { contrastNegationCheck } = require('../guardrails/contrast-negation-check');
const { draftCheck, WORD_COUNT_WARN_THRESHOLD } = require('../guardrails/draft-check');
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

/**
 * Auto-increment run ID and claim its folder atomically.
 *
 * Uses the HIGHEST existing run-NNN number + 1, not a count of
 * matching folders — a count silently reuses an existing run's id
 * (and overwrites its files) whenever the sequence has a gap, e.g.
 * a manually deleted run-NNN folder. Also claims the folder with a
 * non-recursive mkdirSync (EEXIST on collision) and retries the next
 * number, so two processes racing resolveRunId() at the same instant
 * still each get a distinct, exclusively-created folder instead of
 * both writing into the same run.
 */
function resolveRunId() {
  fs.mkdirSync(RUNS_DIR, { recursive: true });
  for (let attempt = 0; attempt < 50; attempt++) {
    const existing = fs.readdirSync(RUNS_DIR).filter(d => /^run-\d{3}$/.test(d));
    const maxNum = existing.reduce((max, d) => Math.max(max, parseInt(d.slice(4), 10)), 0);
    const runId = `run-${String(maxNum + 1 + attempt).padStart(3, '0')}`;
    try {
      fs.mkdirSync(path.join(RUNS_DIR, runId));
      return runId;
    } catch (err) {
      if (err.code === 'EEXIST') continue;
      throw err;
    }
  }
  throw new Error('resolveRunId: could not claim a run folder after 50 attempts');
}

/** Read a prompt file. */
function readPrompt(stepName) {
  return fs.readFileSync(path.join(PROMPTS_DIR, `${stepName}.md`), 'utf8');
}

/** Write an artifact into the run folder. */
function saveArtifact(runDir, filename, content) {
  fs.writeFileSync(path.join(runDir, filename), content, 'utf8');
}

/**
 * Trigger punch-out: write record, log it, exit 1.
 *
 * Reserved for a guardrail (deterministic check or the adversarial-review
 * agent, blog-qa-reviewer) catching a REAL content/quality problem that
 * needs a human's judgment call — per the Stage 4 framework, "a decision
 * which should not be left to an AI alone." This is deliberately separate
 * from failWorkflow() below: a malformed/broken technical output is a
 * failure, not a question for a human to weigh in on.
 */
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
 * Trigger a workflow FAILURE: write record, log it, exit 1.
 *
 * Reserved for a technical/mechanical breakage — a CLI spawn error, an
 * unparseable structured artifact (e.g. the outline JSON missing required
 * fields), an uncaught exception — where there is no content judgment for
 * a human to make, just a broken step to investigate and rerun. Kept in a
 * separate `failures/` folder from `punch-out/` so the punch-out evidence
 * stays pure human-escalation evidence, per the Stage 4 framework's
 * explicit separation of "fail workflow" (automated) from "punch to human"
 * (manual).
 */
function failWorkflow(runId, runDir, step, reason) {
  fs.mkdirSync(FAILURES_DIR, { recursive: true });
  const record = JSON.stringify({ runId, step, reason, timestamp: new Date().toISOString() }, null, 2);
  if (runDir) saveArtifact(runDir, 'failure.json', record);
  fs.writeFileSync(path.join(FAILURES_DIR, `${runId ?? 'unknown'}.json`), record, 'utf8');

  const entry = guardrailEntry(runId ?? 'unknown', step, 'fail', reason);
  if (runDir) logStep(runDir, entry);

  console.error(`\n[FAIL] ${runId ?? 'unknown'} → step "${step}": ${reason}`);
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

  // A 10-minute ceiling with no retry was hit on a SOLO run (no concurrent
  // load) during session 10 — the call itself legitimately took longer
  // than 10 minutes for a rich full-length transcript, not just under
  // parallel contention. Raised to 15 minutes and given one automatic
  // retry specifically for ETIMEDOUT (a transient condition, safe to
  // retry — a real error like a bad model name or missing binary fails
  // some other way and is not retried here).
  const SPAWN_TIMEOUT_MS = 900_000; // 15 minutes per step
  const MAX_SPAWN_ATTEMPTS = 2;

  let result;
  for (let attempt = 1; attempt <= MAX_SPAWN_ATTEMPTS; attempt++) {
    result = spawnSync(
      CLAUDE_BIN,
      ['--print', '--model', MODEL, '--output-format', 'json', '--tools', 'none'],
      {
        input:     combinedPrompt,   // fed to claude's stdin
        encoding:  'utf8',
        maxBuffer: 20 * 1024 * 1024, // 20 MB — enough for any blog step output
        timeout:   SPAWN_TIMEOUT_MS,
      }
    );

    if (result.error?.code === 'ETIMEDOUT' && attempt < MAX_SPAWN_ATTEMPTS) {
      console.error(`  [callModel] claude CLI timed out after ${SPAWN_TIMEOUT_MS / 60000} min (attempt ${attempt}/${MAX_SPAWN_ATTEMPTS}) — retrying once`);
      continue;
    }
    break;
  }

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
  // Try to pull content from <parameter name="content">...</parameter>.
  // The model sometimes emits more than one tool-call attempt in a single
  // response (a partial/aborted one, then a corrected one) — taking the
  // FIRST match risks capturing a truncated fragment with no scorecard,
  // which then fails grade-gate parsing entirely. Take the LONGEST match
  // instead, since a truncated attempt is reliably shorter than the real
  // report.
  const matches = [...text.matchAll(/<parameter name="content">([\s\S]*?)<\/parameter>/g)];
  if (matches.length > 0) {
    const longest = matches.reduce((a, b) => (b[1].length > a[1].length ? b : a));
    return longest[1].trim();
  }
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

  // --draft <path>  skips steps 1 AND 2 and feeds a pre-written draft straight
  // into anti-ai-voice → ai-smell-test → grade-gate. For fast iteration on the
  // back half of the pipeline (voice/smell/grade) without waiting on the two
  // slowest, most expensive steps (transcript-analysis, blog-draft-writer).
  const draftFlag = process.argv.indexOf('--draft');
  const draftFlagPath = draftFlag !== -1 ? process.argv[draftFlag + 1] : null;

  // --short  test-iteration mode: targets a 500-800 word draft instead of the
  // production 800-1,600 range. For running REAL transcripts fast during
  // iteration (shorter draft = faster + cheaper claude CLI calls at every
  // downstream step) without switching to a synthetic --draft fixture.
  // Never use this for the actual certification submission runs.
  const shortMode = process.argv.includes('--short');
  const WORD_MIN = shortMode ? 500 : 800;
  const WORD_MAX = shortMode ? 800 : 1600;
  if (shortMode) {
    console.log(`  [test-mode] --short: targeting ${WORD_MIN}-${WORD_MAX} words instead of production 800-1600`);
  }

  // Only treat argv[2] as a transcript if neither --outline nor --draft was passed
  const transcriptPath = (outlinePath || draftFlagPath) ? null : process.argv.find((a, i) => i >= 2 && a !== '--short');

  if (!transcriptPath && !outlinePath && !draftFlagPath) {
    console.error('Usage: node workflow/run-workflow.js [--short] <path/to/transcript.txt>');
    console.error('       node workflow/run-workflow.js --outline <path/to/01-outline.json>');
    console.error('       node workflow/run-workflow.js --draft <path/to/draft.md>');
    process.exit(1);
  }

  const runId  = resolveRunId();
  const runDir = path.join(RUNS_DIR, runId);
  fs.mkdirSync(runDir, { recursive: true });
  activeRunId  = runId;
  activeRunDir = runDir;

  let outlineText;

  if (draftFlagPath) {
    console.log(`\n=== Blog Pipeline — ${runId} (resume from draft) ===`);
    console.log(`Draft: ${path.basename(draftFlagPath)}\n`);
    console.log('[1/6] transcript-analysis — SKIPPED (using provided draft)');
    console.log('[2/6] blog-draft-writer — SKIPPED (using provided draft)');
    outlineText = '(skipped — draft supplied directly via --draft)';
    logStep(runDir, guardrailEntry(runId, 'outline-check', 'pass', 'skipped — draft supplied directly'));
    logStep(runDir, guardrailEntry(runId, 'draft-check', 'pass', 'skipped — draft supplied directly'));
  } else if (outlinePath) {
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
      // Malformed structured handoff artifact (missing required fields) is a
      // technical failure, not a content judgment call for a human — see
      // failWorkflow()'s doc comment.
      failWorkflow(runId, runDir, 'outline-check', `Outline failed validation: ${outlineResult.errors.join('; ')}`);
    }
  }

  // ── Step 2: blog-draft-writer ─────────────────────────────────────────────
  let draftText;

  if (draftFlagPath) {
    if (!fs.existsSync(draftFlagPath)) {
      console.error(`Draft file not found: ${draftFlagPath}`);
      process.exit(1);
    }
    draftText = fs.readFileSync(draftFlagPath, 'utf8').trim();
    saveArtifact(runDir, '02-draft.md', draftText);

    const contrastResult = contrastNegationCheck(draftText);
    logStep(runDir, guardrailEntry(runId, 'contrast-negation-check',
      contrastResult.pass ? 'pass' : 'fail',
      contrastResult.pass ? 'contrast-negation density acceptable' : `${contrastResult.hits.length} contrast-negation hits found`));
    if (!contrastResult.pass) {
      punchOut(runId, runDir, 'contrast-negation-check', `Supplied draft failed contrast-negation gate: ${contrastResult.hits.length} hits`);
    }
  } else {
  console.log('[2/6] blog-draft-writer');
  const MAX_DRAFT_REDRAFTS = 2;
  let draftUserContent = `Here is the approved outline:\n\n${outlineText}\n\n---\nIMPORTANT: Write the full blog draft now. Output ONLY the blog article — no preamble, no commentary, no "Draft complete" lines. Start directly with the # title heading. Hard limit: ${WORD_MIN}–${WORD_MAX} words maximum. Do NOT exceed ${WORD_MAX} words.\n\nCRITICAL AI-SMELL BAN: Do NOT use contrast-negation structures ("X doesn't Y. It Z." / "Not X — Y." / "The question isn't X. It's Y." / bare ", not a/the ..." tails / "rather than" substitutions). These are the #1 AI writing tell and will cause an automatic D grade. Rewrite any such sentence as a direct positive claim.`;

  for (let draftAttempt = 1; draftAttempt <= MAX_DRAFT_REDRAFTS + 1; draftAttempt++) {
    const rawDraftText = await runStep({
      runId, runDir,
      stepName:     'blog-draft-writer',
      artifactFile: `02-draft${draftAttempt > 1 ? `-rev${draftAttempt - 1}` : ''}.md`,
      systemPrompt: readPrompt('blog-draft-writer'),
      userContent:  draftUserContent,
      attempt:      draftAttempt,
    });

    // Strip any model preamble/postamble before guardrail check
    const stripped = stripDraftMetaCommentary(rawDraftText);
    if (stripped !== rawDraftText) {
      saveArtifact(runDir, `02-draft${draftAttempt > 1 ? `-rev${draftAttempt - 1}` : ''}.md`, stripped);
    }
    draftText = stripped;

    const draftResult = draftCheck(draftText, { minWords: WORD_MIN, maxWords: WORD_MAX });
    logStep(runDir, guardrailEntry(runId, 'draft-check',
      draftResult.pass ? 'pass' : 'fail',
      draftResult.pass ? 'draft valid' : draftResult.errors.join('; ')));
    if (!draftResult.pass) {
      punchOut(runId, runDir, 'draft-check', `Draft failed validation: ${draftResult.errors.join('; ')}`);
    }

    // Word count is handled separately from the structural errors above.
    // A marginal miss (within WORD_COUNT_WARN_THRESHOLD, currently 3%) is
    // logged as a warning for whoever reviews the run — it does not block
    // and does not spend a redraft. A larger miss goes into the same
    // redraft loop as contrast-negation below (see wordCountNeedsRedraft).
    const wordCountIssue = draftResult.wordCountIssue;
    if (wordCountIssue?.severity === 'warn') {
      logStep(runDir, guardrailEntry(runId, 'draft-check',
        'warn', `Word count marginal — review recommended: ${wordCountIssue.message}`));
      console.log(`  [draft-check] WARN: ${wordCountIssue.message} (within ${(WORD_COUNT_WARN_THRESHOLD * 100).toFixed(0)}% tolerance — proceeding, flagged for review)`);
    }
    const wordCountNeedsRedraft = wordCountIssue?.severity === 'redraft';

    // Deterministic pre-check for contrast-negation density — catches the
    // habit at the source, before spending an anti-ai-voice + smell-test
    // cycle on a draft that's going to plateau at C regardless.
    const contrastResult = contrastNegationCheck(draftText);
    logStep(runDir, guardrailEntry(runId, 'contrast-negation-check',
      contrastResult.pass ? 'pass' : 'fail',
      contrastResult.pass ? 'contrast-negation density acceptable' : `${contrastResult.hits.length} contrast-negation hits found`));

    if ((contrastResult.pass && !wordCountNeedsRedraft) || draftAttempt > MAX_DRAFT_REDRAFTS) {
      if (wordCountNeedsRedraft) {
        // Word count is never a punch-out condition (Chetan's direction,
        // 2026-09-27, session 11): a mechanical word-count miss is not "a
        // concrete technical issue" and should never withhold a blog from
        // the requester. After the full redraft budget (3 attempts total)
        // is spent without landing in range, flag it for human review and
        // let the pipeline proceed with the draft as-is — someone can read
        // the flag and supply an updated transcript/outline if the length
        // problem is actually a content-thinness problem. Structural/content
        // defects (placeholders, contrast-negation, banned words, grade)
        // still punch out — this exception is scoped to word count only.
        logStep(runDir, guardrailEntry(runId, 'draft-check',
          'warn', `Word count still out of range after ${MAX_DRAFT_REDRAFTS} redraft attempt(s) — proceeding anyway, flagged for review: ${wordCountIssue.message}`));
        console.log(`  [draft-check] WARN: ${wordCountIssue.message} (redraft budget spent — proceeding, NOT punching out; flagged for review)`);
      }
      break;
    }

    const issueList = [];
    if (wordCountNeedsRedraft) {
      console.log(`  [draft-check] ${wordCountIssue.message} — sending back to blog-draft-writer (attempt ${draftAttempt + 1}/${MAX_DRAFT_REDRAFTS + 1})`);
      const direction = draftResult.wordCount > WORD_MAX
        ? `Your previous draft was ${draftResult.wordCount} words, over the ${WORD_MAX}-word maximum. Trim it: cut whichever paragraph or example contributes least to the argument (per the "if removing it doesn't reduce the article's value, remove it" test) — do not shorten sentences throughout, that damages the specific, consequential writing this piece needs.`
        : `Your previous draft was ${draftResult.wordCount} words, under the ${WORD_MIN}-word minimum. Expand the thinnest section using mechanism, risk, or consequence — never restatement or generic filler.`;
      issueList.push(direction);
    }
    if (!contrastResult.pass) {
      console.log(`  [contrast-negation-check] ${contrastResult.hits.length} hits — sending back to blog-draft-writer (attempt ${draftAttempt + 1}/${MAX_DRAFT_REDRAFTS + 1})`);
      const flaggedList = contrastResult.hits.map((h, i) => `${i + 1}. [${h.reason}] "${h.excerpt}"`).join('\n');
      issueList.push(`Your previous draft used contrast-negation / substitution-framing sentences ${contrastResult.hits.length} times. Rewrite avoiding this sentence shape entirely. Flagged instances:\n\n${flaggedList}\n\nCRITICAL AI-SMELL BAN: Do NOT use contrast-negation structures ("X doesn't Y. It Z." / bare ", not a/the ..." tails / "rather than" substitutions / "is not a/the X" claims). State claims directly and positively instead.`);
    }

    draftUserContent = `Here is the approved outline:\n\n${outlineText}\n\n---\n${issueList.join('\n\n')}\n\nRewrite the full blog draft from scratch using the SAME outline. Output ONLY the blog article — no preamble, no commentary. Start directly with the # title heading. Hard limit: ${WORD_MIN}–${WORD_MAX} words maximum.`;
  }
  } // end else (normal blog-draft-writer path)

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

    // Deterministic re-check for contrast-negation density on THIS pass's output.
    // run-034 showed blog-refinement's targeted smell-fix can reintroduce this
    // pattern in a draft that was previously clean, and because the original
    // contrast-negation-check only ran once (right after blog-draft-writer),
    // the reintroduction went undetected until the expensive ai-smell-test call
    // — by then the revision budget was spent and the run punched out at a
    // worse grade than it started with. Re-running the same deterministic gate
    // on every pass through this loop catches that at the source again.
    const contrastLoopResult = contrastNegationCheck(cleanedText);
    logStep(runDir, guardrailEntry(runId, 'contrast-negation-check',
      contrastLoopResult.pass ? 'pass' : 'fail',
      contrastLoopResult.pass ? 'contrast-negation density acceptable' : `${contrastLoopResult.hits.length} contrast-negation hits found (post-refinement)`));

    if (!contrastLoopResult.pass) {
      if (revisionCount >= MAX_REVISIONS) {
        punchOut(runId, runDir, 'contrast-negation-check',
          `${contrastLoopResult.hits.length} contrast-negation hits reintroduced post-refinement, max revisions reached`);
      }
      revisionCount += 1;
      console.log(`  [contrast-negation-check] ${contrastLoopResult.hits.length} hits reintroduced post-refinement — targeted fix via blog-refinement (attempt ${revisionCount + 1}/${MAX_REVISIONS + 1})`);
      const flaggedList = contrastLoopResult.hits.map((h, i) => `${i + 1}. [${h.reason}] "${h.excerpt}"`).join('\n');
      currentDraft = await runStep({
        runId, runDir,
        stepName:     'blog-refinement',
        artifactFile: `04c-contrast-fix-rev${revisionCount}.md`,
        systemPrompt: readPrompt('blog-refinement'),
        userContent:  [
          'TARGETED REVISION ONLY — do NOT produce a publish kit, SEO metadata, URL slug, or social teaser.',
          'Return ONLY the corrected article markdown. Do not add or remove sections.',
          '',
          'Fix ONLY the contrast-negation / substitution-framing sentences flagged below. Do not touch anything else in the draft — no other rewrites, no additional polish.',
          '',
          '## Flagged contrast-negation instances',
          flaggedList,
          '',
          '## Draft to fix',
          cleanedText,
        ].join('\n'),
        attempt: revisionCount,
      });
      continue; // restart loop: re-run anti-ai-voice on the fixed draft before grading
    }

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
  const qaPunchOut = qaResult.decision === 'punch-out';
  logStep(runDir, guardrailEntry(runId, 'qa-gate',
    qaPunchOut ? 'punch-out' : 'pass',
    qaPunchOut
      ? `${qaResult.failItems.length} FAIL item(s): ${qaResult.failItems.slice(0, 3).join('; ')}`
      : 'all checks PASS/WARN'));

  if (qaPunchOut) {
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
// Entry point — only runs the pipeline when this file is executed directly.
// When required as a module (e.g. by a local no-CLI test harness), only the
// pure helper functions below are exposed; main() is never invoked.
// ---------------------------------------------------------------------------
if (require.main === module) {
  main().catch(err => {
    console.error('\n[FATAL]', err.message ?? err);
    // A CLI spawn crash, an uncaught exception mid-step, etc. — a technical
    // breakage, not a human decision point. Route to failWorkflow() so it
    // lands in failures/, not punch-out/ (see failWorkflow()'s doc comment).
    // Uses activeRunId/activeRunDir when a run was already claimed (the
    // common case — most errors happen mid-step, not before argument
    // parsing), falling back to an unattributed record only for an error
    // that occurs before resolveRunId() runs.
    try {
      failWorkflow(activeRunId, activeRunDir, 'orchestrator', err.message ?? String(err));
    } catch (_) { /* failWorkflow already calls process.exit(1); this only
                     guards the rare case where it itself throws before
                     exiting (e.g. disk full) */ }
    process.exit(1);
  });
}

module.exports = { extractSmellTestReport, stripDraftMetaCommentary };
