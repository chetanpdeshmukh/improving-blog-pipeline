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
const { qaGate } = require('../guardrails/qa-gate');
const { extractSmellTestReport, stripDraftMetaCommentary } = require('./run-workflow');

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
  assert.strictEqual(result.pass, false, 'expected fail at 1680 words against the 1600 production ceiling');
});

test('--short test-mode override: 600 words passes with {minWords:500, maxWords:800}, fails default', () => {
  const body = 'word '.repeat(200); // 3 sections x 200 = 600 words
  const text = `# Title\n\n## Section One\n\n${body}\n\n## Section Two\n\n${body}\n\n## Section Three\n\n${body}`;
  const shortResult = draftCheck(text, { minWords: 500, maxWords: 800 });
  assert.strictEqual(shortResult.pass, true, `expected pass under --short range, got: ${JSON.stringify(shortResult.errors)}`);
  const defaultResult = draftCheck(text);
  assert.strictEqual(defaultResult.pass, false, 'expected fail under production 800-1600 range (600 words is below 800 minimum)');
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
  const text = '## Verdict: FAIL\n\n| 4A | Word count | FAIL | too short |';
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

test('real blog-qa-reviewer table-row FAIL triggers punch-out (regression: table format never matched)', () => {
  const text = [
    '## Verdict: FAIL',
    '',
    '| # | Checkpoint | Status | Notes |',
    '|---|-----------|--------|-------|',
    '| 4A | Word count | FAIL | ~745 words; under 800 minimum |',
    '| 4B | Trade-offs discussed | PASS | fine |',
  ].join('\n');
  const result = qaGate(text);
  assert.strictEqual(result.decision, 'punch-out');
  assert.ok(result.failCount >= 1);
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

// ---------------------------------------------------------------------------
console.log(`\n=== Results: ${pass} passed, ${fail} failed ===\n`);
if (fail > 0) {
  process.exit(1);
}
