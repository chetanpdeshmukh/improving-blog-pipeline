/**
 * qa-gate.js
 * Guardrail after Step 5 (blog-qa-reviewer) — the hard adversarial gate.
 * Any FAIL item in the QA report → punch-out to human review.
 * All PASS/WARN → proceed to blog-refinement.
 * Deterministic — no AI calls.
 */

'use strict';

/**
 * Patterns that identify a FAIL line in blog-qa-reviewer output.
 * The reviewer's real output is a markdown checkpoint table
 * ("| 4A | Word count | FAIL | ... |") plus a top verdict line
 * ("## Verdict: FAIL" / "### Verdict: FAIL") — not the "FAIL:"
 * prefix or bold notation this originally assumed, which never
 * matched a real report and let every FAIL silently proceed.
 */
const FAIL_PATTERNS = [
  /^FAIL:/im,
  /^\*\*FAIL\*\*/im,
  /^\s*[-*]\s*FAIL\b/im,
  /\bstatus:\s*FAIL\b/i,
  /\|\s*FAIL\s*\|/i,
  /^#+\s*Verdict:\s*FAIL\b/im,
];

// Checkpoint 4A is word count. Per Chetan's direction (2026-09-27, session
// 11): word count is never a punch-out condition anywhere in the pipeline —
// a mechanical word-count miss is not "a concrete technical issue" and
// should never withhold a blog from the requester. A 4A FAIL row (blog-
// qa-reviewer can still emit one under 776 or over 1,648 words per its own
// checkpoint bands) is logged for visibility but excluded from the count
// that drives this gate's decision. Every other checkpoint (placeholders,
// factual/technical inconsistency, missing pub kit, banned phrases, etc.)
// is unaffected and still punches out on a real FAIL.
const WORD_COUNT_ROW_PATTERN = /\|\s*4A\s*\|/i;

/**
 * Extract all FAIL lines from the QA report for logging.
 * @param {string} qaOutput
 * @returns {string[]}
 */
function extractFailItems(qaOutput) {
  const lines = qaOutput.split('\n');
  return lines.filter(line =>
    FAIL_PATTERNS.some(pattern => pattern.test(line))
  ).map(l => l.trim());
}

/**
 * @param {string} qaOutput - Raw output from blog-qa-reviewer step
 * @returns {{
 *   decision: 'proceed' | 'punch-out',
 *   failCount: number,
 *   failItems: string[],
 *   warnCount: number,
 *   reason: string
 * }}
 */
function qaGate(qaOutput) {
  const allFailItems = extractFailItems(qaOutput);

  // Word count (4A) never blocks — see WORD_COUNT_ROW_PATTERN note above.
  // Still surfaced separately so it isn't silently dropped from the audit
  // trail, just kept out of the count that decides punch-out.
  const wordCountFailItems = allFailItems.filter(item => WORD_COUNT_ROW_PATTERN.test(item));
  const failItems = allFailItems.filter(item => !WORD_COUNT_ROW_PATTERN.test(item));
  const failCount = failItems.length;

  // Count WARNs for informational logging. Same table-row format as the
  // FAIL patterns above — the "^WARN:"/"**WARN**" forms never matched a
  // real report either, just less harmfully (warnCount is informational
  // only and never affects `decision`).
  const warnLines = qaOutput.split('\n').filter(line =>
    /^WARN:|^\*\*WARN\*\*|\bstatus:\s*WARN\b|\|\s*WARN\s*\|/i.test(line)
  );
  const warnCount = warnLines.length;

  if (failCount > 0) {
    return {
      decision: 'punch-out',
      failCount,
      failItems,
      wordCountFailItems,
      warnCount,
      reason: `QA review found ${failCount} FAIL item(s) (excluding word count, which never blocks). Escalating to human review. No further automated steps will run.`,
    };
  }

  return {
    decision: 'proceed',
    failCount: 0,
    failItems: [],
    wordCountFailItems,
    warnCount,
    reason: wordCountFailItems.length > 0
      ? `QA review passed (0 blocking FAIL items; word count flagged non-blocking: ${wordCountFailItems.join('; ')}). Proceeding to blog-refinement.`
      : `QA review passed with 0 FAIL items (${warnCount} WARN item(s) noted). Proceeding to blog-refinement.`,
  };
}

module.exports = { qaGate, extractFailItems };
