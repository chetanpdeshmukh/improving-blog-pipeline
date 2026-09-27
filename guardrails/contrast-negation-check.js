/**
 * contrast-negation-check.js
 * Guardrail after Step 2 (blog-draft-writer), before anti-ai-voice.
 * Catches the #1 AI writing tell — "X doesn't/isn't Y. It Z." and its
 * variants — with a deterministic grep so the draft can be bounced back
 * to blog-draft-writer for a targeted rewrite BEFORE the expensive
 * anti-ai-voice → ai-smell-test → grade-gate cycle runs.
 *
 * Two runs in a row (run-027, run-028) plateaued at grade C because this
 * exact category scored 4/10 on both the first draft and the one
 * line-edit revision from blog-refinement. The pattern is a drafting-
 * stage habit, not a lexical slip — catching it immediately after the
 * draft (before voice-cleaning and grading) lets the fix happen at the
 * source instead of being patched downstream.
 *
 * Deterministic — no AI calls.
 */

'use strict';

const CONTRAST_NEGATION_PATTERNS = [
  // "X doesn't/isn't/wasn't Y. It Z." — the two-sentence corrective template
  { pattern: /\b(?:doesn't|isn't|wasn't|aren't|weren't)\b[^.!?]*[.!?]\s+It\b/i, reason: 'two-sentence corrective template ("X doesn\'t Y. It Z.")' },
  // "Not X — Y." / "Not X, Y."
  { pattern: /^Not\s+[^.!?—,]+[—,]/im, reason: '"Not X — Y." sentence opener' },
  // "The question isn't X. It's Y."
  { pattern: /question isn't[^.!?]*[.!?]\s+It'?s\b/i, reason: '"The question isn\'t X. It\'s Y." template' },
  // Bare mid-sentence tail: ", not a/the/an ..."
  { pattern: /,\s*not\s+(?:a|an|the|just|only)\s+\w+/i, reason: 'bare tail negation (", not a/the ...")' },
  // "is not X; it is Y" / "is not X, it is Y"
  { pattern: /\bis not\b[^.!?]*[;,]\s*it is\b/i, reason: '"is not X; it is Y" contrast template' },
  // Bare "is not / are not X" as a standalone corrective claim
  { pattern: /\b(?:is|are)\s+not\s+(?:a|an|the)\s+\w+/i, reason: 'bare "is not a/the X" corrective claim' },
  // "X rather than Y" — substitution framing overused as the AI hedge-and-correct move
  { pattern: /\brather than\b/i, reason: '"rather than" substitution framing' },
];

// The smell test doesn't flag a single stray instance — it flags density.
// Bouncing back on every lone "rather than" would loop the pipeline
// forever on borderline-fine prose, so this guardrail passes up to a
// small number of hits and only fails when the pattern is clearly a habit.
const MAX_ALLOWED_HITS = 3;

/**
 * @param {string} text - Raw or stripped output from blog-draft-writer
 * @returns {{ pass: boolean, hits: Array<{ reason: string, excerpt: string }> }}
 */
function contrastNegationCheck(text) {
  const hits = [];

  for (const { pattern, reason } of CONTRAST_NEGATION_PATTERNS) {
    const regex = new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g');
    let match;
    while ((match = regex.exec(text)) !== null) {
      const start = Math.max(0, match.index - 30);
      const end = Math.min(text.length, match.index + match[0].length + 30);
      hits.push({
        reason,
        excerpt: `...${text.slice(start, end).replace(/\n/g, ' ')}...`,
      });
      if (match[0].length === 0) regex.lastIndex++;
    }
  }

  return {
    pass: hits.length <= MAX_ALLOWED_HITS,
    hits,
  };
}

module.exports = { contrastNegationCheck, CONTRAST_NEGATION_PATTERNS };
