/**
 * qa-gate.js
 * Guardrail after Step 5 (blog-qa-reviewer) — the hard adversarial gate.
 * Any FAIL item in the QA report → punch-out to human review.
 * All PASS/WARN → proceed to blog-refinement.
 * Deterministic — no AI calls.
 */

'use strict';

/**
 * Patterns that identify a checkpoint-row FAIL line in blog-qa-reviewer
 * output. The reviewer's real output is a markdown checkpoint table
 * ("| 4A | Word count | FAIL | ... |") — not the "FAIL:" prefix or bold
 * notation this originally assumed, which never matched a real report and
 * let every FAIL silently proceed.
 */
const FAIL_PATTERNS = [
  /^FAIL:/im,
  /^\*\*FAIL\*\*/im,
  /^\s*[-*]\s*FAIL\b/im,
  /\bstatus:\s*FAIL\b/i,
  /\|\s*FAIL\s*\|/i,
];

// The reviewer's own top-line summary ("## Verdict: FAIL" / "### Verdict:
// FAIL"). Tracked separately from FAIL_PATTERNS — see the note in qaGate()
// below on why it is never counted on its own toward the blocking decision.
const VERDICT_FAIL_PATTERN = /^#+\s*Verdict:\s*FAIL\b/im;

// Checkpoints excluded from ever blocking (still logged for visibility,
// never punch out on their own):
//
// 4A (word count) — Chetan's direction, 2026-09-27 session 11: word count
// is never a punch-out condition anywhere in the pipeline; a mechanical
// word-count miss is not "a concrete technical issue" and should never
// withhold a blog from the requester.
//
// 5D (publication kit present) — Chetan's direction, 2026-09-27 session 12:
// blog-qa-reviewer (Step 5) reviews the article BEFORE blog-refinement
// (Step 6) generates the SEO title/meta/slug/internal-link kit, so 5D fails
// structurally on every real run regardless of content quality — it is a
// pipeline-sequencing artifact, not a defect a human needs to weigh in on,
// since blog-refinement adds the kit unconditionally on the very next step.
// Every OTHER checkpoint (placeholders, factual/technical inconsistency,
// banned phrases, ungrounded claims, etc.) is unaffected and still punches
// out on a real FAIL.
const NON_BLOCKING_ROW_PATTERNS = {
  wordCount:        /\|\s*4A\s*\|/i,
  publicationKit:   /\|\s*5D\s*\|/i,
};

/**
 * Extract all checkpoint-row FAIL lines from the QA report for logging.
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
 *   wordCountFailItems: string[],
 *   publicationKitFailItems: string[],
 *   nonBlockingFailItems: string[],
 *   warnCount: number,
 *   reason: string
 * }}
 */
function qaGate(qaOutput) {
  const allFailItems = extractFailItems(qaOutput);

  const wordCountFailItems = allFailItems.filter(item => NON_BLOCKING_ROW_PATTERNS.wordCount.test(item));
  const publicationKitFailItems = allFailItems.filter(item => NON_BLOCKING_ROW_PATTERNS.publicationKit.test(item));
  const nonBlockingFailItems = [...wordCountFailItems, ...publicationKitFailItems];

  // Blocking FAILs are every checkpoint-row FAIL except the excluded rows
  // above. The reviewer's own "## Verdict: FAIL" summary line is NOT
  // counted on its own — it aggregates every checkpoint including the
  // excluded ones, so a report that fails ONLY on 4A/5D still prints
  // "Verdict: FAIL" even though nothing blocking is wrong. Gating on the
  // real per-checkpoint rows (and ignoring the redundant summary line)
  // is what makes the exclusion actually take effect instead of being
  // silently overridden by the verdict line.
  const failItems = allFailItems.filter(item =>
    !NON_BLOCKING_ROW_PATTERNS.wordCount.test(item) &&
    !NON_BLOCKING_ROW_PATTERNS.publicationKit.test(item)
  );
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
      publicationKitFailItems,
      nonBlockingFailItems,
      warnCount,
      reason: `QA review found ${failCount} blocking FAIL item(s) (excluding word count and publication-kit rows, which never block). Escalating to human review. No further automated steps will run.`,
    };
  }

  return {
    decision: 'proceed',
    failCount: 0,
    failItems: [],
    wordCountFailItems,
    publicationKitFailItems,
    nonBlockingFailItems,
    warnCount,
    reason: nonBlockingFailItems.length > 0
      ? `QA review passed (0 blocking FAIL items; non-blocking flagged: ${nonBlockingFailItems.join('; ')}). Proceeding to blog-refinement.`
      : `QA review passed with 0 FAIL items (${warnCount} WARN item(s) noted). Proceeding to blog-refinement.`,
  };
}

module.exports = { qaGate, extractFailItems, VERDICT_FAIL_PATTERN };
