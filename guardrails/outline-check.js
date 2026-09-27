/**
 * outline-check.js
 * Guardrail after Step 1 (transcript-analysis).
 * Validates the JSON outline has all required fields before handing off to blog-draft-writer.
 * Deterministic — no AI calls.
 */

'use strict';

/**
 * @param {string} outlineText - Raw output from transcript-analysis step (JSON string or markdown containing JSON)
 * @returns {{ pass: boolean, errors: string[] }}
 */
function outlineCheck(outlineText) {
  const errors = [];

  // Extract the last ```json block from the output.
  // transcript-analysis outputs rich markdown prose; the JSON summary is appended last.
  // Using the last match avoids grabbing an earlier code block in the analysis body.
  let outline;
  try {
    const jsonBlockMatches = [...outlineText.matchAll(/```json\s*([\s\S]*?)```/g)];

    let rawJson;
    if (jsonBlockMatches.length > 0) {
      rawJson = jsonBlockMatches[jsonBlockMatches.length - 1][1].trim();
    } else {
      // Fallback: bare JSON object anywhere in the text
      const objMatch = outlineText.match(/(\{[\s\S]*\})/);
      rawJson = objMatch ? objMatch[1].trim() : outlineText.trim();
    }

    outline = JSON.parse(rawJson);
  } catch (e) {
    return {
      pass: false,
      errors: [`Could not parse outline JSON summary block: ${e.message}. ` +
               'Ensure transcript-analysis output ends with a ```json summary block.'],
    };
  }

  // Required top-level fields
  if (!outline.title || outline.title.trim() === '') {
    errors.push('Missing or empty: title');
  }

  if (!outline.introduction || outline.introduction.trim() === '') {
    errors.push('Missing or empty: introduction');
  }

  if (!outline.problem_statement || outline.problem_statement.trim() === '') {
    errors.push('Missing or empty: problem_statement');
  }

  if (!outline.takeaway || outline.takeaway.trim() === '') {
    errors.push('Missing or empty: takeaway');
  }

  // body_sections must be an array with at least 3 entries
  if (!Array.isArray(outline.body_sections)) {
    errors.push('body_sections must be an array');
  } else if (outline.body_sections.length < 3) {
    errors.push(`body_sections has ${outline.body_sections.length} item(s) — minimum 3 required`);
  } else {
    // Each section must have a heading
    outline.body_sections.forEach((section, i) => {
      if (!section.heading || section.heading.trim() === '') {
        errors.push(`body_sections[${i}] is missing a heading`);
      }
    });
  }

  return {
    pass: errors.length === 0,
    errors,
  };
}

module.exports = { outlineCheck };
