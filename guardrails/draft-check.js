/**
 * draft-check.js
 * Guardrail after Step 2 (blog-draft-writer).
 * Validates word count, required headings, no placeholder text, no generic opener.
 * Deterministic — no AI calls.
 */

'use strict';

const MIN_WORDS = 800;
const MAX_WORDS = 1800;
const MIN_H2_HEADINGS = 3;

const PLACEHOLDER_PATTERNS = [
  /\bTBD\b/i,
  /\bINSERT HERE\b/i,
  /\bTODO\b/i,
  /\[placeholder\]/i,
  /\[insert\b[^\]]*\]/i,
  /\bXXX\b/,
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
 * @returns {{ pass: boolean, errors: string[], warnings: string[], wordCount: number }}
 */
function draftCheck(draftText) {
  const errors = [];
  const warnings = [];

  // Word count
  const wordCount = countWords(draftText);
  if (wordCount < MIN_WORDS) {
    errors.push(`Word count too low: ${wordCount} words (minimum ${MIN_WORDS})`);
  } else if (wordCount > MAX_WORDS) {
    errors.push(`Word count too high: ${wordCount} words (maximum ${MAX_WORDS})`);
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
  };
}

module.exports = { draftCheck };
