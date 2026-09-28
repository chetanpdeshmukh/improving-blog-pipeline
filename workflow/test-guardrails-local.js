/**
 * test-guardrails-local.js
 * No-CLI regression suite for every deterministic guardrail plus the pure
 * text-parsing helpers in run-workflow.js.
 *
 * Purpose: iterate on guardrail/orchestration logic without spending a
 * `claude --print` call (each of which costs 2-6 minutes and real tokens).
 * Run this after any change to guardrails/*.js or the parsing helpers in
 * run-workflow.js, before spending a real pipeline run to confirm it.
 *
 * Usage: node workflow/test-guardrails-local.js
 */

'use strict';

const assert = require('assert');
const { contrastNegationCheck } = require('../guardrails/contrast-negation-check');
const { voiceCheck } = require('../guardrails/voice-check');
const { draftCheck } = require('../guardrails/draft-check');
const { gradeGate } = require('../guardrails/grade-gate');
const { qaGate, MAX_BANNED_WORD_REVISIONS } = require('../guardrails/qa-gate');
const { extractSmellTestReport, extractCleanContent, stripDraftMetaCommentary } = require('./run-workflow');

let pass = 0;
let fail = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    pass++;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    fail++;
    failures.push({ name, err });
    console.log(`  ✗ ${name}`);
    console.log(`      ${err.message}`);
  }
}

console.log('\n=== contrast-negation-check ===');

test('zero-tolerance: fails on a single title-line hit', () => {
  const text = "# AI Doesn't Change Your Business DNA. It Amplifies It.\n\nClean opening sentence.\n\nBody text with no issues.";
  const result = contrastNegationCheck(text);
  assert.strictEqual(result.pass, false, 'expected fail on title hit');
  assert.ok(result.hits.some(h => h.zone.includes('zero-tolerance')));
});

test('zero-tolerance: fails on opening-sentence hit even with clean title', () => {
  const text = "# A Clean Title About Infrastructure\n\nThe question isn't whether this works. It's whether teams adopt it.\n\nBody text with no issues.";
  const result = contrastNegationCheck(text);
  assert.strictEqual(result.pass, false, 'expected fail on opening-sentence hit');
});

test('density threshold: passes with 3 or fewer body hits, title/opening clean', () => {
  const text = "# A Clean Title About Infrastructure\n\nA clean opening sentence with no tricks.\n\nBody text with one rather than usage, and another rather than usage, and a third rather than usage.";
  const result = contrastNegationCheck(text);
  assert.strictEqual(result.pass, true, 'expected pass at exactly 3 body hits');
});

test('density threshold: fails with more than 3 body hits, title/opening clean', () => {
  const text = "# A Clean Title About Infrastructure\n\nA clean opening sentence with no tricks.\n\nBody text with one rather than usage, and another rather than usage, and a third rather than usage, and a fourth rather than usage.";
  const result = contrastNegationCheck(text);
  assert.strictEqual(result.pass, false, 'expected fail at 4 body hits');
});

test('fully clean draft passes', () => {
  const text = "# We Cut Sync Errors From 40 a Day to Zero\n\nThree months ago our helpdesk logged 40 failures every day.\n\nBody text describing the fix in concrete terms.";
  const result = contrastNegationCheck(text);
  assert.strictEqual(result.pass, true);
  assert.strictEqual(result.hits.length, 0);
});

console.log('\n=== voice-check ===');

test('regression: "leverage and" is not a false positive (original regex bug)', () => {
  const text = 'We fixed the pipeline and leverage and applied the patch.';
  const result = voiceCheck(text);
  assert.strictEqual(result.pass, true, `expected no violation, got: ${JSON.stringify(result.violations)}`);
});

test('catches "leverage" used as a marketing verb', () => {
  const text = 'We leverage the platform to solve this.';
  const result = voiceCheck(text);
  assert.strictEqual(result.pass, false);
});

test('catches em dash', () => {
  const text = 'This approach works — but only if teams align early.';
  const result = voiceCheck(text);
  assert.strictEqual(result.pass, false);
  assert.ok(result.violations.some(v => v.phrase.includes('Em dash')));
});

test('violations field name is "violations" not "matches" (regression: field-name bug)', () => {
  const text = 'This has a game-changer moment.';
  const result = voiceCheck(text);
  assert.ok(Array.isArray(result.violations), 'result.violations must exist and be an array');
  assert.strictEqual(result.matches, undefined, 'result.matches should not exist — using it was the bug');
});

console.log('\n=== draft-check ===');

test('flags [INSERT CLIENT NAME] leftover template placeholder (run-030 punch-out cause)', () => {
  const text = '# Title\n\n## Section One\n\nWe worked with [INSERT CLIENT NAME] on this.\n\n## Section Two\n\nBody.\n\n## Section Three\n\nBody.\n' + 'word '.repeat(800);
  const result = draftCheck(text);
  assert.strictEqual(result.pass, false);
  assert.ok(result.errors.some(e => e.includes('Placeholder')));
});

test('does NOT flag [INSERT DIAGRAM: ...] — sanctioned visual-callout syntax from blog-draft-writer.md', () => {
  const body = 'word '.repeat(280);
  const text = `# Title\n\n## Section One\n\n[INSERT DIAGRAM: architecture overview]\n\n${body}\n\n## Section Two\n\n${body}\n\n## Section Three\n\n${body}`;
  const result = draftCheck(text);
  assert.strictEqual(result.pass, true, `expected pass, got errors: ${JSON.stringify(result.errors)}`);
});

test('passes a clean draft with 3 H2s and sufficient words', () => {
  const body = 'word '.repeat(280); // 3 sections x 280 = 840 words, within 800-1600 range
  const text = `# Title\n\n## Section One\n\n${body}\n\n## Section Two\n\n${body}\n\n## Section Three\n\n${body}`;
  const result = draftCheck(text);
  assert.strictEqual(result.pass, true, `expected pass, got errors: ${JSON.stringify(result.errors)}`);
});

test('production max is 1,600, not the old 1,800 (regression: stale word-count range)', () => {
  const body = 'word '.repeat(560); // 3 sections x 560 = 1680 words — over 1600, under old 1800
  const text = `# Title\n\n## Section One\n\n${body}\n\n## Section Two\n\n${body}\n\n## Section Three\n\n${body}`;
  const result = draftCheck(text);
  // Word count no longer flips `pass` on its own (see the wordCountIssue
  // tri-state tests below) — but it must still be flagged against the
  // 1,600 ceiling, not the stale 1,800 one.
  assert.ok(result.wordCountIssue, 'expected a wordCountIssue at 1680 words against the 1600 production ceiling');
  assert.strictEqual(result.wordCountIssue.severity, 'redraft', '1680/1600 is 5% over — beyond the 3% warn threshold');
});

test('--short test-mode override: 600 words passes with {minWords:500, maxWords:800}, flags redraft under default 800-1600', () => {
  const body = 'word '.repeat(200); // 3 sections x 200 = 600 words
  const text = `# Title\n\n## Section One\n\n${body}\n\n## Section Two\n\n${body}\n\n## Section Three\n\n${body}`;
  const shortResult = draftCheck(text, { minWords: 500, maxWords: 800 });
  assert.strictEqual(shortResult.pass, true, `expected pass under --short range, got: ${JSON.stringify(shortResult.errors)}`);
  assert.strictEqual(shortResult.wordCountIssue, null, 'expected no word-count issue under --short range');
  const defaultResult = draftCheck(text);
  assert.strictEqual(defaultResult.pass, true, 'word count alone no longer fails `pass` — structural checks are unaffected');
  assert.ok(defaultResult.wordCountIssue, 'expected a wordCountIssue (600 is 25% below the 800 minimum)');
  assert.strictEqual(defaultResult.wordCountIssue.severity, 'redraft');
});

test('word count within 3% of a boundary is severity "warn", not "redraft" (regression: run-043/run-045 punched out for 1.2%/3.1% misses with no revision chance)', () => {
  // countWords tokenizes markdown syntax chars too ("#", "##" each count),
  // so build text to an EXACT total word count by measuring the fixed
  // heading overhead (11 tokens: "# Title" + three "## Section N" lines)
  // and filling the body to make up the rest, split across the 3
  // required H2 sections (the split doesn't need to be even).
  const makeText = (totalWords) => {
    const overhead = 11;
    const bodyWords = totalWords - overhead;
    const k1 = Math.ceil(bodyWords / 3);
    const k2 = Math.ceil((bodyWords - k1) / 2);
    const k3 = bodyWords - k1 - k2;
    const b1 = 'word '.repeat(k1).trim(), b2 = 'word '.repeat(k2).trim(), b3 = 'word '.repeat(k3).trim();
    return `# Title\n\n## Section One\n\n${b1}\n\n## Section Two\n\n${b2}\n\n## Section Three\n\n${b3}`;
  };

  // 1648/1600 = exactly 3% over -> warn (boundary is inclusive)
  const atThreshold = draftCheck(makeText(1648));
  assert.strictEqual(atThreshold.wordCount, 1648, 'test text construction should hit the exact target word count');
  assert.strictEqual(atThreshold.pass, true);
  assert.strictEqual(atThreshold.wordCountIssue.severity, 'warn', `1648 words (3.0% over) should warn, got: ${JSON.stringify(atThreshold.wordCountIssue)}`);

  // 1649/1600 = just over 3% -> redraft
  const overThreshold = draftCheck(makeText(1649));
  assert.strictEqual(overThreshold.wordCountIssue.severity, 'redraft', `1649 words (3.06% over) should redraft, got: ${JSON.stringify(overThreshold.wordCountIssue)}`);

  // Exactly in range -> no issue at all
  const clean = draftCheck(makeText(1200));
  assert.strictEqual(clean.wordCountIssue, null);
});

console.log('\n=== extractSmellTestReport (XML tool-call stripping) ===');

test('extracts content from single tool-call XML wrapper', () => {
  const text = '<function_calls>\n<invoke name="write">\n<parameter name="content">\n# Report\n**Grade:** B\n</parameter>\n</invoke>\n</function_calls>';
  const result = extractSmellTestReport(text);
  assert.ok(result.includes('**Grade:** B'));
  assert.ok(!result.includes('<parameter'));
});

test('regression: takes LONGEST match, not FIRST (truncation bug)', () => {
  const truncatedFirst = '<parameter name="content">\nshort fragment\n</parameter>';
  const realSecond = '<parameter name="content">\n# Full Report\n**Grade:** C\n\nDetailed findings here that make this the longer, real match.\n</parameter>';
  const text = truncatedFirst + '\n' + realSecond;
  const result = extractSmellTestReport(text);
  assert.ok(result.includes('**Grade:** C'), `expected longest match to win, got: ${result}`);
  assert.ok(!result.includes('short fragment'));
});

test('falls back to tag-stripping when no parameter block present', () => {
  const text = '<report>**Grade:** A</report>';
  const result = extractSmellTestReport(text);
  assert.ok(result.includes('**Grade:** A'));
});

console.log('\n=== extractCleanContent (JSON write_file blob + leading-narration stripping) ===');

test('regression: run-065/066 — literal {"type":"write_file",...} JSON blob (not XML) is unwrapped, not saved raw', () => {
  const text = [
    'Running the AI smell test on the pasted draft. I\'ll save the report next to where the draft would live.',
    '',
    '**Category 2 grep pass first**: clean.',
    '',
    '{"type":"write_file","path":"/tmp/x.smell-test.md","content":"# AI Smell Test - draft.md\\n\\n**Grade:** B\\n\\nBody text here."}',
    '',
    '**Grade: B** (weighted average 7.65) -- one polish pass and ship.',
  ].join('\n');
  const result = extractCleanContent(text);
  assert.ok(result.startsWith('# AI Smell Test'), `expected to start at the real heading, got: ${result.slice(0, 60)}`);
  assert.ok(result.includes('**Grade:** B'));
  assert.ok(!result.includes('Running the AI smell test'), 'leading narration should be stripped');
  assert.ok(!result.includes('{"type":"write_file"'), 'raw JSON wrapper should not appear in the saved artifact');
});

test('extractCleanContent falls through to tag/narration stripping when the JSON blob is truncated/unparseable', () => {
  const text = 'Some narration.\n\n{"type":"write_file","path":"/tmp/x.md","content":"# Title\\n\\nBody'; // missing closing quote+brace
  const result = extractCleanContent(text);
  // No valid JSON and no heading found in the raw text as-is (the truncated
  // blob's literal "# Title" is still embedded in unparsed text) — just
  // confirm it does not throw and returns *something* usable, not empty.
  assert.ok(result.length > 0, 'must not crash or return empty on a truncated JSON blob');
});

test('regression: leading narration before a real heading is stripped even with no wrapper at all (e.g. 06-publish-kit.md, every real run to date)', () => {
  const text = 'I\'ll run the full Phase 3 refinement pass on this draft now.\n\n# The Real Title\n\nBody of the article.';
  const result = extractCleanContent(text);
  assert.ok(result.startsWith('# The Real Title'));
  assert.ok(!result.includes('Phase 3 refinement pass'));
});

test('extractCleanContent leaves clean content (already starting at a heading) unchanged', () => {
  const text = '# Already Clean\n\nNo narration here.';
  const result = extractCleanContent(text);
  assert.strictEqual(result, text);
});

console.log('\n=== stripDraftMetaCommentary (model preamble/postamble leak) ===');

test('strips preamble before first heading', () => {
  const text = 'Let me scan for banned words in this draft...\n\n# Real Title\n\nReal body.';
  const result = stripDraftMetaCommentary(text);
  assert.ok(result.startsWith('# Real Title'));
  assert.ok(!result.includes('Let me scan'));
});

test('strips "Draft complete" postamble', () => {
  const text = '# Title\n\nBody.\n\n---\nDraft complete. Word count: 500.';
  const result = stripDraftMetaCommentary(text);
  assert.ok(!result.includes('Draft complete'), `expected postamble stripped, got: ${result}`);
});

console.log('\n=== grade-gate ===');

test('field name is "decision" not "pass"/"punchOut" (regression: orchestrator field-mismatch bug)', () => {
  const result = gradeGate('**Grade:** A', 0);
  assert.ok(['proceed', 'revise', 'punch-out'].includes(result.decision), 'result.decision must be one of the three enum values');
  assert.strictEqual(result.pass, undefined, 'result.pass should not exist — using it was the bug');
  assert.strictEqual(result.punchOut, undefined, 'result.punchOut should not exist — using it was the bug');
});

test('grade A proceeds', () => {
  const result = gradeGate('**Grade:** A', 0);
  assert.strictEqual(result.decision, 'proceed');
});

test('grade B proceeds', () => {
  const result = gradeGate('**Grade:** B', 0);
  assert.strictEqual(result.decision, 'proceed');
});

test('grade C on first attempt triggers revise', () => {
  const result = gradeGate('**Grade:** C', 0);
  assert.strictEqual(result.decision, 'revise');
  assert.strictEqual(result.revisionCount, 1);
});

test('grade C after MAX_REVISIONS triggers punch-out', () => {
  const result = gradeGate('**Grade:** C', 1);
  assert.strictEqual(result.decision, 'punch-out');
});

test('unparseable grade text triggers revise then punch-out', () => {
  const first = gradeGate('no grade line here', 0);
  assert.strictEqual(first.decision, 'revise');
  const second = gradeGate('no grade line here', 1);
  assert.strictEqual(second.decision, 'punch-out');
});

console.log('\n=== qa-gate ===');

test('field name is "decision" not "punchOut" (regression: orchestrator read qaResult.punchOut, which never existed, so qa-gate silently never punched out on real content)', () => {
  const text = '## Verdict: FAIL\n\n| 4B | Trade-offs discussed | FAIL | none present |';
  const result = qaGate(text);
  assert.ok(['proceed', 'punch-out'].includes(result.decision), 'result.decision must be one of the two enum values');
  assert.strictEqual(result.punchOut, undefined, 'result.punchOut should not exist — reading it in run-workflow.js was the bug');
});

test('any FAIL line triggers punch-out', () => {
  const text = '- PASS: title tag\n- FAIL: missing meta description\n- WARN: image alt text thin';
  const result = qaGate(text);
  assert.strictEqual(result.decision, 'punch-out');
  assert.strictEqual(result.failCount, 1);
});

test('all PASS/WARN proceeds', () => {
  const text = '- PASS: title tag\n- WARN: image alt text thin';
  const result = qaGate(text);
  assert.strictEqual(result.decision, 'proceed');
});

test('real table-row WARN (e.g. 4A word count within the 3% tolerance band) is counted, not silently missed like table-row FAIL was', () => {
  const text = [
    '## Verdict: PASS',
    '',
    '| # | Checkpoint | Status | Notes |',
    '|---|-----------|--------|-------|',
    '| 4A | Word count | WARN | 790 words, within 3% of the 800 floor |',
  ].join('\n');
  const result = qaGate(text);
  assert.strictEqual(result.decision, 'proceed');
  assert.strictEqual(result.warnCount, 1, `expected the table-row WARN to be counted, got warnCount=${result.warnCount}`);
});

test('real blog-qa-reviewer table-row FAIL (non-word-count) triggers punch-out (regression: table format never matched)', () => {
  const text = [
    '## Verdict: FAIL',
    '',
    '| # | Checkpoint | Status | Notes |',
    '|---|-----------|--------|-------|',
    '| 4A | Word count | FAIL | ~745 words; under 800 minimum |',
    '| 4B | Trade-offs discussed | FAIL | every section says the approach is great |',
  ].join('\n');
  const result = qaGate(text);
  assert.strictEqual(result.decision, 'punch-out');
  assert.ok(result.failItems.some(i => /4B/.test(i)), 'the 4B FAIL should be in the blocking failItems');
  assert.ok(!result.failItems.some(i => /4A/.test(i)), 'the 4A FAIL should NOT be in the blocking failItems');
  assert.strictEqual(result.wordCountFailItems.length, 1, 'the 4A FAIL should be surfaced separately as non-blocking');
});

test('word count (4A) alone, even at FAIL, never triggers punch-out (Chetan\'s direction, session 11: mechanical word-count miss is not a concrete technical issue)', () => {
  const text = [
    '## Verdict: CONDITIONAL PASS',
    '',
    '| # | Checkpoint | Status | Notes |',
    '|---|-----------|--------|-------|',
    '| 4A | Word count | FAIL | ~745 words; under 800 minimum |',
    '| 4B | Trade-offs discussed | PASS | fine |',
  ].join('\n');
  const result = qaGate(text);
  assert.strictEqual(result.decision, 'proceed', 'a 4A-only FAIL must not punch out');
  assert.strictEqual(result.failCount, 0);
  assert.strictEqual(result.wordCountFailItems.length, 1, 'the 4A FAIL should still be surfaced, just non-blocking');
});

test('bolded FAIL cell (e.g. "| **FAIL** |") triggers punch-out (regression: run-065, 2026-09-28 — reviewer bolded checkpoint 3A\'s FAIL cell for POV-consistency leak, and the unadorned "| FAIL |" pattern silently let it through as "all checks PASS/WARN")', () => {
  const text = [
    '### Verdict: FAIL',
    '',
    '| # | Checkpoint | Status | Notes |',
    '|---|-----------|--------|-------|',
    '| 3A | POV consistency | **FAIL** | "The host cited a report" — podcast transcript language leaked through |',
    '| 3B | Banned words | PASS | clean |',
  ].join('\n');
  const result = qaGate(text);
  assert.strictEqual(result.decision, 'punch-out', 'a bolded FAIL cell must still block, not silently proceed');
  assert.ok(result.failItems.some(i => /3A/.test(i)), 'the 3A FAIL should be in the blocking failItems');
});

test('real blog-qa-reviewer clean table (all PASS/WARN cells) proceeds', () => {
  const text = [
    '## Verdict: PASS',
    '',
    '| # | Checkpoint | Status | Notes |',
    '|---|-----------|--------|-------|',
    '| 4A | Word count | PASS | 1200 words |',
    '| 4B | Trade-offs discussed | WARN | thin but present |',
  ].join('\n');
  const result = qaGate(text);
  assert.strictEqual(result.decision, 'proceed');
});

test('publication kit (5D), alone, even at FAIL, never triggers punch-out (Chetan\'s direction, session 12: 5D fails structurally on every run since blog-refinement generates the kit AFTER blog-qa-reviewer runs — it is a sequencing artifact, not a content defect)', () => {
  const text = [
    '### Verdict: FAIL',
    '| 5D | Publication kit | FAIL | No SEO title tag, meta description, or URL slug present |',
  ].join('\n');
  const result = qaGate(text);
  assert.strictEqual(result.decision, 'proceed', 'a 5D-only FAIL must not punch out');
  assert.strictEqual(result.failCount, 0);
  assert.strictEqual(result.publicationKitFailItems.length, 1, 'the 5D FAIL should still be surfaced, just non-blocking');
});

test('a report failing ONLY on excluded checkpoints (4A + 5D) proceeds even though the reviewer\'s own Verdict line says FAIL (regression: the standalone "## Verdict: FAIL" summary line aggregates every checkpoint, including excluded ones, so counting it independently would silently override the 4A/5D exclusions)', () => {
  const text = [
    '## Verdict: FAIL',
    '',
    '| # | Checkpoint | Status | Notes |',
    '|---|-----------|--------|-------|',
    '| 4A | Word count | FAIL | 495 words, under the 776 floor |',
    '| 5D | Publication kit | FAIL | kit not yet generated |',
  ].join('\n');
  const result = qaGate(text);
  assert.strictEqual(result.decision, 'proceed', 'excluded-only FAILs must proceed despite the Verdict line reading FAIL');
  assert.strictEqual(result.failCount, 0);
  assert.strictEqual(result.nonBlockingFailItems.length, 2);
});

test('a real (non-excluded, non-revisable) checkpoint FAIL still punches out even when 4A/5D/3B also FAIL in the same report', () => {
  const text = [
    '## Verdict: FAIL',
    '| 2B | No invented examples | FAIL | "Company X achieved 40%" is untraceable |',
    '| 3B | Banned words | FAIL | "leverage" present |',
    '| 4A | Word count | FAIL | 495 words |',
    '| 5D | Publication kit | FAIL | kit not yet generated |',
  ].join('\n');
  const result = qaGate(text);
  assert.strictEqual(result.decision, 'punch-out');
  assert.strictEqual(result.failCount, 1);
  assert.ok(result.failItems.some(i => /2B/.test(i)));
  assert.ok(!result.failItems.some(i => /3B|4A|5D/.test(i)), '3B/4A/5D rows must not leak into the blocking failItems');
});

test('a 3B (banned words) FAIL alone, with no other blocking checkpoint, is "revise" on the first attempt, not punch-out', () => {
  const text = [
    '## Verdict: FAIL',
    '| 3B | Banned words | FAIL | "stakeholders" appears 6 times |',
  ].join('\n');
  const result = qaGate(text, 0);
  assert.strictEqual(result.decision, 'revise');
  assert.strictEqual(result.bannedWordRevisionCount, 1);
  assert.ok(result.bannedWordFailItems.some(i => /3B/.test(i)));
});

test('a 3B FAIL still present after MAX_BANNED_WORD_REVISIONS attempts punches out instead of revising again', () => {
  const text = [
    '## Verdict: FAIL',
    '| 3B | Banned words | FAIL | "stakeholders" appears 6 times |',
  ].join('\n');
  const result = qaGate(text, MAX_BANNED_WORD_REVISIONS);
  assert.strictEqual(result.decision, 'punch-out');
  assert.strictEqual(result.bannedWordRevisionCount, MAX_BANNED_WORD_REVISIONS + 1);
});

test('a 3B WARN (1-3 occurrences, per the tiered reviewer rule) never blocks or revises — only a 3B FAIL row does', () => {
  const text = [
    '## Verdict: CONDITIONAL PASS',
    '| 3B | Banned words | WARN | "journey" appears once |',
  ].join('\n');
  const result = qaGate(text, 0);
  assert.strictEqual(result.decision, 'proceed');
  assert.strictEqual(result.failCount, 0);
});

// ---------------------------------------------------------------------------
console.log(`\n=== Results: ${pass} passed, ${fail} failed ===\n`);
if (fail > 0) {
  process.exit(1);
}
