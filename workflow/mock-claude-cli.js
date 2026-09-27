#!/usr/bin/env node
/**
 * mock-claude-cli.js
 *
 * A stand-in for the real `claude` binary, for exercising run-workflow.js's
 * ORCHESTRATION logic (redraft loops, revision loops, gate wiring) with zero
 * API cost and zero wait — no real generation happens, every step returns
 * canned but structurally valid output routed by which prompt was called.
 *
 * This is NOT a content-quality test. It proves the control flow: does a
 * word-count "redraft" issue actually get sent back to blog-draft-writer,
 * does the second attempt's trimmed draft actually pass, does qa-gate's
 * decision match a real Verdict line, etc. --draft/--outline flags in
 * run-workflow.js skip too much of the pipeline to exercise this; this
 * mock lets the FULL 6-step flow run against real transcripts/outlines.
 *
 * Usage:
 *   CLAUDE_BIN="node $(pwd)/workflow/mock-claude-cli.js" node workflow/run-workflow.js <transcript>
 *
 * Reads the combined systemPrompt+userContent from stdin (same contract as
 * the real CLI with --print), and writes {"result": "..."} to stdout
 * (matching the --output-format json envelope run-workflow.js parses).
 */

'use strict';

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => { input += chunk; });
process.stdin.on('end', () => {
  const result = route(input);
  process.stdout.write(JSON.stringify({ result }));
});

function h2(title, words) {
  return `## ${title}\n\n${'word '.repeat(words).trim()}`;
}

/** Build a draft of an exact total word count (title + 3 H2s + given body split). */
function buildDraft(totalWords, title = 'Mock Draft Title') {
  const titleTokens = title.split(/\s+/).length + 1; // "#" + words
  const headingTokens = 3 * 3; // "##", "Section", "N" per section
  const overhead = titleTokens + headingTokens;
  const bodyWords = Math.max(totalWords - overhead, 30);
  const k1 = Math.ceil(bodyWords / 3);
  const k2 = Math.ceil((bodyWords - k1) / 2);
  const k3 = bodyWords - k1 - k2;
  return `# ${title}\n\n${h2('Section One', k1)}\n\n${h2('Section Two', k2)}\n\n${h2('Section Three', k3)}`;
}

function extractAfterMarker(text, marker) {
  const idx = text.indexOf(marker);
  if (idx === -1) return null;
  return text.slice(idx + marker.length).trim();
}

function route(input) {
  // ── blog-draft-writer ────────────────────────────────────────────────
  if (/^name:\s*"?blog-draft-writer"?/m.test(input)) {
    if (/Trim it:/.test(input)) {
      // Redraft-for-overage instruction present -> return a compliant draft.
      console.error('[mock-claude-cli] blog-draft-writer: TRIM instruction detected -> returning 1400-word compliant draft');
      return buildDraft(1400);
    }
    if (/Expand the thinnest section/.test(input)) {
      console.error('[mock-claude-cli] blog-draft-writer: EXPAND instruction detected -> returning 1400-word compliant draft');
      return buildDraft(1400);
    }
    if (/contrast-negation.*sentence shape/.test(input)) {
      console.error('[mock-claude-cli] blog-draft-writer: contrast-negation redraft -> returning 1400-word compliant draft');
      return buildDraft(1400);
    }
    // First attempt: deliberately 1649 words (3.1% over 1600) to exercise
    // the NEW word-count redraft path end-to-end.
    console.error('[mock-claude-cli] blog-draft-writer: first attempt -> returning 1649-word draft (3.1% over ceiling, triggers redraft)');
    return buildDraft(1649);
  }

  // ── anti-ai-voice ─────────────────────────────────────────────────────
  if (/^name:\s*anti-ai-voice/m.test(input)) {
    const draft = extractAfterMarker(input, 'Here is the blog draft to clean:');
    console.error('[mock-claude-cli] anti-ai-voice: echoing draft unchanged (mock does no real cleaning)');
    return draft || buildDraft(1400);
  }

  // ── ai-smell-test ─────────────────────────────────────────────────────
  if (/^name:\s*"?ai-smell-test"?/m.test(input)) {
    console.error('[mock-claude-cli] ai-smell-test: returning canned Grade B report');
    return '**Grade:** B\n\nMock smell-test report. No significant AI-voice patterns detected. Minor polish opportunities noted.';
  }

  // ── blog-qa-reviewer ──────────────────────────────────────────────────
  if (/^name:\s*blog-qa-reviewer/m.test(input)) {
    console.error('[mock-claude-cli] blog-qa-reviewer: returning canned PASS/WARN report (no FAIL items)');
    return [
      '## Verdict: PASS',
      '',
      '| # | Checkpoint | Status | Notes |',
      '|---|-----------|--------|-------|',
      '| 1A | Clear search intent | PASS | mock |',
      '| 4A | Word count | PASS | within range |',
      '| 5D | Publication kit | WARN | mock reviewer does not check this |',
    ].join('\n');
  }

  // ── blog-refinement (publish-kit or targeted fix) ────────────────────
  if (/^name:\s*blog-refinement/m.test(input)) {
    if (/TARGETED REVISION ONLY/.test(input)) {
      console.error('[mock-claude-cli] blog-refinement: targeted fix -> echoing draft unchanged');
      const draft = extractAfterMarker(input, 'Return ONLY the corrected article markdown. Do not add or remove sections.');
      return draft || buildDraft(1400);
    }
    console.error('[mock-claude-cli] blog-refinement: returning canned publish kit');
    return `${buildDraft(1400)}\n\n---\n\n## Publication Kit\n\n**SEO Title:** Mock Title\n**Meta Description:** Mock description.\n**URL Slug:** /mock-title\n**Social Teaser:** Mock teaser text.`;
  }

  // ── transcript-analysis ───────────────────────────────────────────────
  if (/^name:\s*"?transcript-analysis"?/m.test(input)) {
    console.error('[mock-claude-cli] transcript-analysis: returning canned outline');
    return JSON.stringify({ title: 'Mock Outline', sections: ['One', 'Two', 'Three'] });
  }

  console.error('[mock-claude-cli] WARNING: unrecognized prompt, no route matched — returning generic filler');
  return buildDraft(1200);
}
