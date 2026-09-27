/**
 * voice-check.js
 * Guardrail after Step 3 (anti-ai-voice).
 * Scans for critical banned AI phrases. Logs exact phrase and character position.
 * Deterministic — no AI calls.
 */

'use strict';

/**
 * Each entry: { phrase, pattern, reason }
 * Pattern is case-insensitive by default.
 */
const BANNED_PHRASES = [
  { phrase: 'It is important to note',      pattern: /it is important to note/i,         reason: 'hollow affirmation' },
  { phrase: 'It is worth noting',           pattern: /it is worth noting/i,              reason: 'hollow affirmation' },
  { phrase: 'In conclusion',                pattern: /^In conclusion[,\s]/im,            reason: 'AI essay closer' },
  { phrase: 'Delve into',                   pattern: /\bdelve into\b/i,                  reason: 'AI cliché verb' },
  { phrase: 'Leverage (as verb)',           pattern: /\bleverage\b(?=\s+(?:this|the|a|an|your|our|their|its|AI|data|cloud|machine|deep|technology|tool|platform|approach|strategy|framework)\b)/i, reason: 'marketing verb overuse' },
  { phrase: 'Game-changer',                 pattern: /\bgame[- ]changer\b/i,             reason: 'hollow superlative' },
  { phrase: 'Moreover (sentence opener)',   pattern: /^Moreover[,\s]/im,                 reason: 'AI transition word' },
  { phrase: 'Furthermore (sentence opener)',pattern: /^Furthermore[,\s]/im,              reason: 'AI transition word' },
  { phrase: 'In today\'s fast-paced',       pattern: /in today's fast-paced/i,           reason: 'generic AI opener' },
  { phrase: 'Cutting-edge',                 pattern: /\bcutting[- ]edge\b/i,             reason: 'hollow superlative' },
  { phrase: 'Unlock the potential',         pattern: /unlock the potential/i,            reason: 'marketing cliché' },
  { phrase: 'Transformative',              pattern: /\btransformative\b/i,              reason: 'overused buzzword' },
  { phrase: 'Seamless',                    pattern: /\bseamless(?:ly)?\b/i,             reason: 'hollow descriptor' },
  { phrase: 'Dive deep',                   pattern: /\bdive deep\b/i,                   reason: 'AI cliché' },
  { phrase: 'Empower',                     pattern: /\bempower(?:ing|s|ed|ment)?\b/i,   reason: 'marketing cliché' },
  { phrase: 'Robust solution',             pattern: /\brobust solution\b/i,             reason: 'hollow tech phrase' },
  { phrase: 'Holistic approach',           pattern: /\bholistic approach\b/i,           reason: 'consulting cliché' },
  { phrase: 'Best-in-class',              pattern: /\bbest[- ]in[- ]class\b/i,         reason: 'hollow superlative' },
  { phrase: 'It\'s worth mentioning',     pattern: /it's worth mention/i,              reason: 'hollow hedging phrase' },
  { phrase: 'In summary',                 pattern: /^In summary[,\s]/im,               reason: 'AI essay closer' },
  // Canonical Improving Anti-AI Voice Editor v1.0 additions (2026-02-19 SharePoint source)
  { phrase: 'Em dash (—)',                 pattern: /—/,                                reason: 'em dash explicitly banned — synthetic sentence construction tell' },
  { phrase: 'Now more than ever',          pattern: /now more than ever/i,               reason: 'high-confidence AI tell phrase' },
  { phrase: 'At the end of the day',       pattern: /at the end of the day/i,            reason: 'high-confidence AI tell phrase' },
  { phrase: 'The bottom line is',          pattern: /the bottom line is/i,               reason: 'high-confidence AI tell phrase' },
  { phrase: 'As we\'ve seen',              pattern: /as we'?ve seen/i,                   reason: 'high-confidence AI tell phrase' },
  { phrase: 'This begs the question',      pattern: /this begs the question/i,           reason: 'high-confidence AI tell phrase' },
  { phrase: 'What this means is',          pattern: /what this means is/i,               reason: 'high-confidence AI tell phrase' },
  { phrase: 'Paradigm shift',              pattern: /\bparadigm shift\b/i,               reason: 'empty insight buzzword' },
  { phrase: 'Experts agree',               pattern: /\bexperts agree\b/i,                reason: 'empty authority attribution' },
  { phrase: 'It\'s widely believed',       pattern: /it'?s widely believed/i,            reason: 'empty authority attribution' },
];

/**
 * @param {string} text - Output from anti-ai-voice step
 * @returns {{ pass: boolean, violations: Array<{ phrase: string, position: number, reason: string, excerpt: string }> }}
 */
function voiceCheck(text) {
  const violations = [];

  for (const { phrase, pattern, reason } of BANNED_PHRASES) {
    // Reset lastIndex for global patterns
    const regex = new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g');
    let match;
    while ((match = regex.exec(text)) !== null) {
      const start = Math.max(0, match.index - 30);
      const end = Math.min(text.length, match.index + match[0].length + 30);
      violations.push({
        phrase,
        position: match.index,
        reason,
        excerpt: `...${text.slice(start, end)}...`,
      });
      // Avoid infinite loop on zero-width matches
      if (match[0].length === 0) regex.lastIndex++;
    }
  }

  return {
    pass: violations.length === 0,
    violations,
  };
}

module.exports = { voiceCheck, BANNED_PHRASES };
