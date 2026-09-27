Running the full smell test on the pasted draft now. Starting with the Category 2 mechanical grep pass as required, then scoring all six categories.

---

# AI Smell Test — [pasted draft: "Your Business Doesn't Need an AI Strategy. It Needs a Data Strategy."]

**Date:** 2026-09-27
**Grade:** C · **Word count:** ~1,175 · **Threshold:** B
**Document type:** Client-facing deliverable

> Note: Input was pasted text, not a file path. No `.smell-test.md` was saved to disk. Use this report as your remediation checklist.

🚨 **DO NOT SHIP** — grade is C, below the B threshold. Contrast-negation saturation and two unresolved publication blockers (unsourced statistic, unquantified case study) must be resolved before this ships.

---

## Scorecard

| Category | Score | Weight | Notes |
|---|---|---|---|
| Voice clichés, hollow affirmations & false authoritative framing | 8/10 | 20% | Largely clean; mild "it's worth noting" variant in closing paragraph |
| Contrast negation & em-dash overuse | 4/10 | 20% | 9 contrast-negation hits including 2 CRITICAL (opening and closing paragraphs); ~18 em dashes across ~1,175 words (~7/page vs. 3/page threshold) |
| Triadic structures & parallel listing | 7/10 | 10% | Three triadic lists cluster in the first ~300 words; fourth appears in the security section |
| Generic content & fake specifics | 6/10 | 25% | "Large education company" with no name and no quantified outcome; unsourced 232-incidents/day figure — both are pre-ship blockers |
| Structural tells | 8/10 | 15% | Structurally clean; inline EDITOR NOTEs must be resolved and stripped before publication |
| Synonym sprawl, repetition & rhetorical scaffolding | 7/10 | 10% | "friction" appears 5× for slightly different referents; mic-drop section closers recur in 3+ sections |

**Weighted average: 6.5 → Grade C**

---

## Critical findings

- **Line 3:** "His reaction wasn't relief. It was a question: who decided that bot was authorized to do that?"
  - **Why it's a smell:** Two-sentence contrast-negation template in the opening paragraph — highest-visibility position for this pattern.
  - **Suggested rewrite:** "His reaction was a question: who decided that bot was authorized to do that?"

- **Line 21:** `[EDITOR NOTE: A quantitative outcome here — time savings, reduction in support requests, retrieval rate — would significantly strengthen this example for a technical executive audience.]`
  - **Why it's a smell:** The case study names no client and reports no outcome. "Improving worked with a large education company" is indistinguishable from a fabricated example.
  - **Suggested rewrite:** Obtain one metric from the engagement team before publication. Even directional works: "search queries returning no results dropped by X%" or "support requests for content location fell from Y to Z per month." Replace the EDITOR NOTE with the number.

- **Line 35:** `[EDITOR NOTE: A study cited in the source interview reported approximately 232 incidents per day on average; source attribution is required before this figure can be published. Verify and cite, or remove.]`
  - **Why it's a smell:** A precise number without a named source reads as invented in a client-facing piece. Cannot ship with the note in place.
  - **Suggested rewrite:** Verify from the interview recording and cite inline — "[Source], [date]: approximately 232 incidents per day" — or cut the sentence entirely.

- **Line 75:** "The organizations that will have a durable advantage in three years are building the data estate now, not shipping a chatbot."
  - **Why it's a smell:** Bare ", not Y" contrast tail in the closing paragraph — the pattern's most damaging position.
  - **Suggested rewrite:** "The organizations that will have a durable advantage in three years are building the data estate now."

---

## Major findings

- **Line 13:** "The problem isn't the ambition. It's the sequence."
  - **Why it's a smell:** Textbook two-sentence contrast-negation template.
  - **Suggested rewrite:** "The problem is the sequence: AI amplifies what already works."

- **Line 23:** "they deployed AI horizontally because it was available, not because they identified where friction was highest"
  - **Why it's a smell:** Causal negation tail — the same corrective structure as the two-sentence template, easier to miss on a read-through.
  - **Suggested rewrite:** "they deployed AI horizontally because it was available, without asking where friction was actually highest."

- **Line 29:** "Rusic doesn't frame this as advice. He frames it as a precondition."
  - **Why it's a smell:** Two-sentence contrast-negation template; lines 29-31 have two of these back to back.
  - **Suggested rewrite:** "Rusic calls it a precondition."

- **Line 31:** "AI doesn't create structure where none exists — it exposes the absence of structure faster and at greater scale."
  - **Why it's a smell:** Contrast template (X doesn't Y — it Z), compounding the line 29 hit in the same paragraph.
  - **Suggested rewrite:** "AI exposes the absence of structure faster and at greater scale than any manual audit can."

- **Line 53:** "The AI wasn't wrong in a narrow technical sense — the code functioned. It just opened the most convenient possible security hole."
  - **Why it's a smell:** Contrast template (wasn't wrong — it just Y).
  - **Suggested rewrite:** "The code functioned. It also left the most convenient possible credential exposed in the frontend."

- **Lines throughout:** Em dash overuse — approximately 18 em dashes across ~1,175 words (~7/page; threshold is 3/page). Paired dashes on lines 3, 5, 21, 35, and 41 account for 10 of them.
  - **Why it's a smell:** Em-dash saturation at this density is among the most consistent AI-generation signals this skill encounters.
  - **Suggested rewrite:** Replace at least 10. Lines 5 and 41 are the easiest conversions to parentheses or commas. Lines 31, 37, and 63 can become new sentences.

- **Lines 7, 15, 19:** Three triadic structures in the first ~300 words — "It's human connections, it's service providing, it's delivering value to customers" / "surface patterns, reduce friction, and extend reach" / "surfacing unstructured data..., scanning large information landscapes..., and drawing connections..."
  - **Why it's a smell:** Three-item parallel lists concentrating in the same early section signal template-driven structure rather than accumulated argument.
  - **Suggested rewrite:** Collapse one into a direct claim. Line 19 is the strongest candidate: "AI is fastest at making previously unsearchable content findable — the thing it did for that education company."

- **Lines 47, 63, 75:** Mic-drop section closers recurring across at least 3 sections — "That's how you end up explaining an AI-initiated action to your board." / "unsanctioned tools that don't show up in the dashboard." / "Build the foundation. Take the next right step."
  - **Why it's a smell:** A pithy pull-quote kicker closing each major section is a Category 6 scaffolding tic when it recurs this consistently.
  - **Suggested rewrite:** Keep line 47 — it earns its punch. Let lines 63 and 75's first sentence land on their content rather than a packaged summary.

- **Lines 15, 23, 25, 61, 69:** "friction" used 5× — "reduce friction," "where friction was highest," "specific friction point," "specific friction they face daily," "friction highest."
  - **Why it's a smell:** A distinctive non-generic word reused for slightly different referents 3+ times reads as a reach for the same word rather than a decision.
  - **Suggested rewrite:** Keep lines 23 and 25, where the word is most precise. Replace the others: line 15 → "extend reach"; line 61 → "the specific slowdown they face daily"; line 69 → "where the gap between what you deliver and what the customer can actually access is widest."

---

## Minor findings

- **Line 75:** "it's worth holding as a strategic posture" — mild variant of the Category 1 "It's worth noting that..." cliché. Rewrite: "Treat it as a posture, not permission to wait." (Also removes a contrast tail.)
- **Line 61:** "not mandate compliance" — bare contrast tail; lowest priority given the volume of higher-severity hits above.

---

## The one paragraph to rewrite first

**Before (closing paragraph, line 75):**

> Nobody has reached AI nirvana — Rusic says this plainly, and it's worth holding as a strategic posture rather than reading it as permission to wait. The organizations that will have a durable advantage in three years are building the data estate now, not shipping a chatbot. Build the foundation. Take the next right step.

**After:**

> Nobody has reached AI nirvana — Rusic says this plainly. Treat it as a posture, not permission to wait. The organizations that will have a durable advantage in three years are building the data estate now. Build the foundation. Take the next right step.

Four words removed, three smells cleared: the CRITICAL closing contrast tail ("not shipping a chatbot"), the Category 2 "rather than" hit, and the Category 1 "it's worth holding" variant. If you want a single mic-drop close, cut "Build the foundation." and let "Take the next right step." carry the ending alone.

---

## What to do next

- Resolve both EDITOR NOTEs first: get a quantitative outcome for the education company example, and verify the 232-incidents/day source or cut the stat entirely. Nothing else matters until these are closed.
- Grep the full draft for `isn't|wasn't|doesn't|not a |not the |it's not|that's not|rather than|, not |not because` and rewrite every hit — there are at least 9 confirmed and the Category 2 experience is that close read finds more.
- Cut at least 10 of the 18 em dashes; start with lines 5, 31, 37, 41, and 63 where a comma or period does the same job.
- Collapse one of the three triadic lists in the opening two sections into a direct claim.
- Re-run the smell test after edits.