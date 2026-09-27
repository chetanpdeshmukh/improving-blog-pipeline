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
  const failItems = extractFailItems(qaOutput);
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
      warnCount,
      reason: `QA review found ${failCount} FAIL item(s). Escalating to human review. No further automated steps will run.`,
    };
  }

  return {
    decision: 'proceed',
    failCount: 0,
    failItems: [],
    warnCount,
    reason: `QA review passed with 0 FAIL items (${warnCount} WARN item(s) noted). Proceeding to blog-refinement.`,
  };
}

module.exports = { qaGate, extractFailItems };
