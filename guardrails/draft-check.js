/**
 * draft-check.js
 * Guardrail after Step 2 (blog-draft-writer).
 * Validates word count, required headings, no placeholder text, no generic opener.
 * Deterministic — no AI calls.
 */

'use strict';

const MIN_WORDS = 800;
const MAX_WORDS = 1600;
const MIN_H2_HEADINGS = 3;

// A word-count miss within this fraction of the nearest boundary is treated
// as marginal: warn only, don't block or redraft. Beyond it, the miss is
// large enough to send back to blog-draft-writer for a real trim/expansion
// pass rather than either punching out immediately or silently ignoring it.
// (Two full-length runs punched out here for being 1.2% and 3.1% over —
// see KB session 10 notes.)
const WORD_COUNT_WARN_THRESHOLD = 0.03;

const PLACEHOLDER_PATTERNS = [
  /\bTBD\b/i,
  /\bINSERT HERE\b/i,
  /\bTODO\b/i,
  /\[placeholder\]/i,
  // [INSERT DIAGRAM: ...] / [INSERT TABLE: ...] are the sanctioned visual-callout
  // convention from blog-draft-writer.md, not a leftover template gap — excluded here.
  /\[insert(?!\s+(diagram|table|chart|image|graphic|screenshot)\b)[^\]]*\]/i,
  /\bXXX\b/,
  // NOTE: [NEEDS SOURCE: ...] is a second sanctioned callout (blog-draft-writer.md's
  // Statistic & Attribution Discipline) for a stat the SME cited without a source at
  // draft time. It doesn't start with "insert" so none of the patterns above catch it —
  // no exclusion needed, but flagging here so a future stricter placeholder pattern
  // doesn't accidentally reintroduce a block on it. blog-qa-reviewer.md's Checkpoint 2A
  // scores a tagged stat WARN, not FAIL.
];

const GENERIC_OPENERS = [
  /^In today's/i,
  /^In the world of/i,
  /^In recent years/i,
  /^In an era/i,
  /^It goes without saying/i,
  /^As we all know/i,
];

/**
 * Count words in markdown text (strips code blocks and headings markers).
 * @param {string} text
 * @returns {number}
 */
function countWords(text) {
  // Strip markdown code fences
  const stripped = text.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '');
  return stripped.trim().split(/\s+/).filter(w => w.length > 0).length;
}

/**
 * @param {string} draftText - Raw markdown output from blog-draft-writer
 * @param {{ minWords?: number, maxWords?: number }} [opts] - Override the default
 *   800-1600 production range. Used by the --short test-iteration mode in
 *   run-workflow.js (500-800 words) so fast-iteration runs on real transcripts
 *   don't get punched out by the production word-count gate.
 * @returns {{
 *   pass: boolean, errors: string[], warnings: string[], wordCount: number,
 *   wordCountIssue: null | { severity: 'warn'|'redraft', message: string, deviation: number }
 * }}
 *
 * Word count is handled separately from the other structural errors below:
 * a miss within WORD_COUNT_WARN_THRESHOLD of the nearest boundary is a
 * `warn`-severity wordCountIssue (never blocks, never redrafts — the run
 * proceeds and the note is there for whoever reviews the run); a larger
 * miss is `redraft`-severity, which the orchestrator sends back to
 * blog-draft-writer for a real trim/expand pass (same pattern as the
 * contrast-negation redraft loop) before punching out. Neither case sets
 * `pass: false` on its own — only the structural errors below do.
 */
function draftCheck(draftText, opts = {}) {
  const minWords = opts.minWords ?? MIN_WORDS;
  const maxWords = opts.maxWords ?? MAX_WORDS;
  const errors = [];
  const warnings = [];
  let wordCountIssue = null;

  // Word count
  const wordCount = countWords(draftText);
  if (wordCount < minWords) {
    const deviation = (minWords - wordCount) / minWords;
    const message = `Word count too low: ${wordCount} words (minimum ${minWords}, ${(deviation * 100).toFixed(1)}% under)`;
    wordCountIssue = {
      severity: deviation <= WORD_COUNT_WARN_THRESHOLD ? 'warn' : 'redraft',
      message,
      deviation,
    };
  } else if (wordCount > maxWords) {
    const deviation = (wordCount - maxWords) / maxWords;
    const message = `Word count too high: ${wordCount} words (maximum ${maxWords}, ${(deviation * 100).toFixed(1)}% over)`;
    wordCountIssue = {
      severity: deviation <= WORD_COUNT_WARN_THRESHOLD ? 'warn' : 'redraft',
      message,
      deviation,
    };
  }

  // H2 heading count
  const h2Matches = draftText.match(/^## .+/gm) || [];
  if (h2Matches.length < MIN_H2_HEADINGS) {
    errors.push(`Only ${h2Matches.length} H2 heading(s) found — minimum ${MIN_H2_HEADINGS} required`);
  }

  // Placeholder text
  for (const pattern of PLACEHOLDER_PATTERNS) {
    if (pattern.test(draftText)) {
      errors.push(`Placeholder text found matching pattern: ${pattern}`);
    }
  }

  // Generic opener (check first non-empty line of actual prose — skip headings and blank lines)
  const lines = draftText.split('\n').map(l => l.trim()).filter(l => l.length > 0 && !l.startsWith('#'));
  if (lines.length > 0) {
    const firstLine = lines[0];
    for (const pattern of GENERIC_OPENERS) {
      if (pattern.test(firstLine)) {
        errors.push(`Generic AI opener detected: "${firstLine.slice(0, 80)}..."`);
        break;
      }
    }
  }

  return {
    pass: errors.length === 0,
    errors,
    warnings,
    wordCount,
    wordCountIssue,
  };
}

module.exports = { draftCheck, WORD_COUNT_WARN_THRESHOLD };
