/**
 * grade-gate.js
 * Guardrail after Step 4 (ai-smell-test).
 * Parses the grade from ai-smell-test output.
 * A or B → proceed. C/D/F → increment revision counter, return to draft-writer (max 2 rounds).
 * After 2 failed revisions → punch-out.
 * Deterministic — no AI calls.
 */

'use strict';

const PASSING_GRADES = new Set(['A', 'B']);
const MAX_REVISIONS = 2;

/**
 * @param {string} smellTestOutput - Raw output from ai-smell-test step
 * @param {number} revisionCount - How many revision rounds have run so far (starts at 0)
 * @returns {{
 *   decision: 'proceed' | 'revise' | 'punch-out',
 *   grade: string | null,
 *   revisionCount: number,
 *   reason: string
 * }}
 */
function gradeGate(smellTestOutput, revisionCount = 0) {
  // Parse grade — handles "Grade: X" and "**Grade:** X" (bold markdown from ai-smell-test)
  const match = smellTestOutput.match(/\*{0,2}Grade:\*{0,2}\s*([A-F][\+\-]?)/i);

  if (!match) {
    // Cannot parse grade — treat as worst case, trigger revision
    const newCount = revisionCount + 1;
    if (newCount >= MAX_REVISIONS) {
      return {
        decision: 'punch-out',
        grade: null,
        revisionCount: newCount,
        reason: `Could not parse grade from ai-smell-test output after ${newCount} attempt(s). Escalating to human review.`,
      };
    }
    return {
      decision: 'revise',
      grade: null,
      revisionCount: newCount,
      reason: `Could not parse grade from ai-smell-test output. Revision attempt ${newCount} of ${MAX_REVISIONS}.`,
    };
  }

  // Normalise to uppercase single letter
  const grade = match[1].toUpperCase().charAt(0);

  if (PASSING_GRADES.has(grade)) {
    return {
      decision: 'proceed',
      grade,
      revisionCount,
      reason: `Grade ${grade} — passes quality bar. Proceeding to blog-qa-reviewer.`,
    };
  }

  // Failing grade
  const newCount = revisionCount + 1;

  if (newCount >= MAX_REVISIONS) {
    return {
      decision: 'punch-out',
      grade,
      revisionCount: newCount,
      reason: `Grade ${grade} after ${newCount} revision attempt(s) — maximum revisions reached. Escalating to human review.`,
    };
  }

  return {
    decision: 'revise',
    grade,
    revisionCount: newCount,
    reason: `Grade ${grade} — below passing bar. Revision attempt ${newCount} of ${MAX_REVISIONS}. Returning to blog-draft-writer with smell-test feedback.`,
  };
}

module.exports = { gradeGate, MAX_REVISIONS, PASSING_GRADES };
