/**
 * qa-gate.js
 * Guardrail after Step 5 (blog-qa-reviewer) — the hard adversarial gate.
 * Any FAIL item in the QA report → punch-out to human review, with one
 * exception: checkpoint 3B (banned words), which gets exactly one targeted
 * revision via anti-ai-voice before punching out (see MAX_BANNED_WORD_REVISIONS
 * below and Chetan's direction, session 13).
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
  // Table-row cell, tolerating markdown emphasis around the value itself
  // (e.g. "| **FAIL** |") — a real reviewer report bolded a FAIL cell
  // (run-065, checkpoint 3A) and the unadorned "| FAIL |" version below
  // silently failed to match it, letting a real punch-out-worthy row
  // through as if the gate were clean.
  /\|\s*[*_]{0,2}FAIL[*_]{0,2}\s*\|/i,
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

// 3B (banned words) — Chetan's direction, 2026-09-27 session 13: a banned word
// used more than 3 times is a real overuse problem (run-062's "stakeholders" x6),
// but the reviewer is now instructed to score 1-3 occurrences of a given word as
// WARN, not FAIL (run-063's "journey" x1 no longer needs to block a whole run).
// A 3B row that IS still FAIL (a word over the 3-occurrence threshold) is not
// immediately punch-out-worthy the way other checkpoints are — it's mechanically
// fixable, so it gets ONE targeted revision via anti-ai-voice (the skill whose
// actual job is lexical banned-word removal) before escalating. See qaGate()'s
// `revisionAttempted` parameter and MAX_BANNED_WORD_REVISIONS below.
const REVISABLE_ROW_PATTERNS = {
  bannedWords: /\|\s*3B\s*\|/i,
};

const MAX_BANNED_WORD_REVISIONS = 1;

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
 * @param {number} bannedWordRevisionCount - How many banned-word revision
 *   rounds have run so far (starts at 0). Mirrors gradeGate's revisionCount
 *   parameter.
 * @returns {{
 *   decision: 'proceed' | 'revise' | 'punch-out',
 *   failCount: number,
 *   failItems: string[],
 *   wordCountFailItems: string[],
 *   publicationKitFailItems: string[],
 *   bannedWordFailItems: string[],
 *   nonBlockingFailItems: string[],
 *   bannedWordRevisionCount: number,
 *   warnCount: number,
 *   reason: string
 * }}
 */
function qaGate(qaOutput, bannedWordRevisionCount = 0) {
  const allFailItems = extractFailItems(qaOutput);

  const wordCountFailItems = allFailItems.filter(item => NON_BLOCKING_ROW_PATTERNS.wordCount.test(item));
  const publicationKitFailItems = allFailItems.filter(item => NON_BLOCKING_ROW_PATTERNS.publicationKit.test(item));
  const bannedWordFailItems = allFailItems.filter(item => REVISABLE_ROW_PATTERNS.bannedWords.test(item));
  const nonBlockingFailItems = [...wordCountFailItems, ...publicationKitFailItems];

  // Blocking FAILs are every checkpoint-row FAIL except the excluded rows
  // (4A/5D, never block) and the revisable row (3B, handled separately
  // below instead of being lumped in with an immediate punch-out). The
  // reviewer's own "## Verdict: FAIL" summary line is NOT counted on its
  // own — it aggregates every checkpoint including the excluded/revisable
  // ones, so a report that fails ONLY on 4A/5D/3B still prints "Verdict:
  // FAIL" even though nothing punch-out-worthy is wrong yet. Gating on the
  // real per-checkpoint rows (and ignoring the redundant summary line) is
  // what makes the exclusions actually take effect instead of being
  // silently overridden by the verdict line.
  const failItems = allFailItems.filter(item =>
    !NON_BLOCKING_ROW_PATTERNS.wordCount.test(item) &&
    !NON_BLOCKING_ROW_PATTERNS.publicationKit.test(item) &&
    !REVISABLE_ROW_PATTERNS.bannedWords.test(item)
  );
  const failCount = failItems.length;

  // Count WARNs for informational logging. Same table-row format as the
  // FAIL patterns above — the "^WARN:"/"**WARN**" forms never matched a
  // real report either, just less harmfully (warnCount is informational
  // only and never affects `decision`).
  const warnLines = qaOutput.split('\n').filter(line =>
    /^WARN:|^\*\*WARN\*\*|\bstatus:\s*WARN\b|\|\s*[*_]{0,2}WARN[*_]{0,2}\s*\|/i.test(line)
  );
  const warnCount = warnLines.length;

  if (failCount > 0) {
    // A real, non-revisable checkpoint is FAIL — punch out regardless of
    // whether 3B also happens to be FAIL in the same report.
    return {
      decision: 'punch-out',
      failCount,
      failItems,
      wordCountFailItems,
      publicationKitFailItems,
      bannedWordFailItems,
      nonBlockingFailItems,
      bannedWordRevisionCount,
      warnCount,
      reason: `QA review found ${failCount} blocking FAIL item(s) (excluding word count, publication-kit, and banned-word rows, which are handled separately). Escalating to human review. No further automated steps will run.`,
    };
  }

  if (bannedWordFailItems.length > 0) {
    const newCount = bannedWordRevisionCount + 1;
    if (newCount > MAX_BANNED_WORD_REVISIONS) {
      return {
        decision: 'punch-out',
        failCount: bannedWordFailItems.length,
        failItems: bannedWordFailItems,
        wordCountFailItems,
        publicationKitFailItems,
        bannedWordFailItems,
        nonBlockingFailItems,
        bannedWordRevisionCount: newCount,
        warnCount,
        reason: `Banned-word overuse (3B) still FAIL after ${newCount} targeted revision attempt(s): ${bannedWordFailItems.join('; ')}. Escalating to human review.`,
      };
    }
    return {
      decision: 'revise',
      failCount: 0,
      failItems: [],
      wordCountFailItems,
      publicationKitFailItems,
      bannedWordFailItems,
      nonBlockingFailItems,
      bannedWordRevisionCount: newCount,
      warnCount,
      reason: `Banned-word overuse (3B): ${bannedWordFailItems.join('; ')}. Revision attempt ${newCount} of ${MAX_BANNED_WORD_REVISIONS}. Returning to anti-ai-voice for a targeted lexical fix.`,
    };
  }

  return {
    decision: 'proceed',
    failCount: 0,
    failItems: [],
    wordCountFailItems,
    publicationKitFailItems,
    bannedWordFailItems: [],
    nonBlockingFailItems,
    bannedWordRevisionCount,
    warnCount,
    reason: nonBlockingFailItems.length > 0
      ? `QA review passed (0 blocking FAIL items; non-blocking flagged: ${nonBlockingFailItems.join('; ')}). Proceeding to blog-refinement.`
      : `QA review passed with 0 FAIL items (${warnCount} WARN item(s) noted). Proceeding to blog-refinement.`,
  };
}

module.exports = { qaGate, extractFailItems, VERDICT_FAIL_PATTERN, MAX_BANNED_WORD_REVISIONS };
