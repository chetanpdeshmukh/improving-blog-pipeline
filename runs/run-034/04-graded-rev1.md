I'll run the Category 2 grep pass first, then score all six checks against this pasted draft.

**Grep results (contrast negation):**
- Line 11: "...not the ceiling" (bare tail)
- Line 17: "...not an edge case" (bare tail)
- Line 21: "...not an afterthought" (bare tail)
- Line 31: "...not where you're heading" (bare tail)
- Line 45: "...not in month five" (bare tail — **closing paragraph, CRITICAL**)

No em-dashes found. Now scoring all six categories.

---

**Category 1 (Voice clichés):** No hollow affirmations, no false-authority labels. Clean. → **8/10**

**Category 2 (Contrast negation):** Five bare-tail instances in ~720 words, one in the closing paragraph. → **4/10**

**Category 3 (Triadic):** Eight three-item lists across ~720 words. Lines 9 and 11 recycle the same three items in different order. → **5/10**

**Category 4 (Generic content):** "The three-dimension framework" is cited three times but the three dimensions are never named. Month timeline (1-3, 3-9, 9+) is asserted without basis. Anonymous boardrooms. → **6/10**

**Category 5 (Structural):** Every section is exactly two paragraphs — uniform across all six sections. Otherwise clean. → **7/10**

**Category 6 (Rhetorical scaffolding):** Five of six sections close with an aphoristic one-liner. "The" opens six of sixteen paragraphs. → **5/10**

**Weighted average:** (8×.20) + (4×.20) + (5×.10) + (6×.25) + (7×.15) + (5×.10) = **5.95 → D**

Saving the scorecard now.

```
---
Saving to: ai-roi-framework-blog.smell-test.md
---
```

```markdown
# AI Smell Test — ai-roi-framework-blog (pasted draft)

**Date:** 2026-09-27
**Grade:** D   ·   **Word count:** ~720   ·   **Threshold:** B (default)
**Document type:** Client-facing deliverable

🚨 **DO NOT SHIP** — this draft reads as AI-generated.

## Scorecard

| Category | Score | Weight | Notes |
|---|---|---|---|
| Voice clichés, hollow affirmations & false authoritative framing | 8/10 | 20% | No hollow affirmations; no false-authority labels; clean |
| Contrast negation & em-dash overuse | 4/10 | 20% | 5 bare-tail contrast hits including one in the closing paragraph (CRITICAL); no em-dashes |
| Triadic structures & parallel listing | 5/10 | 10% | 8 three-item lists in ~720 words; same items recycled in different order across lines 9 and 11 |
| Generic content & fake specifics | 6/10 | 25% | "Three-dimension framework" referenced 3× but never defined; month timeline asserted without basis; anonymous boardrooms |
| Structural tells | 7/10 | 15% | Every section is exactly 2 paragraphs across all 6 sections; otherwise clean |
| Synonym sprawl, repetition & rhetorical scaffolding | 5/10 | 10% | Aphoristic mic-drop closer on 5 of 6 sections; "The" opens 6 of 16 paragraphs |

## Critical findings

- **Line 45:** "That work belongs at the start of the program, not in month five when the CFO is already unconvinced."
  - **Why it's a smell:** Bare contrast-negation tail (", not in month five") in the closing paragraph — the most visible position in the piece and the highest-frequency AI tell this skill finds.
  - **Suggested rewrite:** "That work belongs at the start of the program. By month five, the case for measurement redesign requires a political fight instead of a data conversation."

- **Line 39:** "The three-dimension framework gives those metrics a coherent home in the ROI conversation."
  - **Why it's a smell:** The piece references "all three value dimensions" (line 13) and "the three-dimension framework" three times without ever naming the three dimensions — the framework is the claimed solution but is never delivered to the reader.
  - **Suggested rewrite:** Name the three dimensions at first mention around line 11: "operational efficiency, decision quality, and organizational capability." Then line 39 lands: "The three-dimension framework — operational efficiency, decision quality, and organizational capability — gives those metrics a coherent home in the ROI conversation."

## Major findings

- **Line 11:** "...they represent the floor of what AI can deliver financially, not the ceiling."
  - **Why it's a smell:** Bare contrast-negation tail; the "not the ceiling" qualifier adds nothing not already carried by "the floor."
  - **Suggested rewrite:** "They are the floor. Decision quality, competitive positioning, and organizational capability represent the ceiling — and most frameworks never build the metrics to measure them."

- **Line 17:** "...program designers now plan for it as a structural risk, not an edge case."
  - **Why it's a smell:** Bare contrast-negation tail; "not an edge case" is fully redundant with "structural risk."
  - **Suggested rewrite:** "...program designers now treat pilot failure as a structural risk and build around it."

- **Line 21:** "Organizations that scale past pilot treat change management as a first-class budget line, not an afterthought bolted on after the technical build."
  - **Why it's a smell:** Bare contrast-negation tail; fourth instance of the same template in this draft.
  - **Suggested rewrite:** "Organizations that scale past pilot fund change management before the first sprint, on par with the technical build."

- **Line 31:** "...you see where you've been, not where you're heading."
  - **Why it's a smell:** Bare contrast-negation tail; five instances across ~720 words matches the density the 2026-09-04 audit found in saturated drafts.
  - **Suggested rewrite:** "...you see where you've been. The next quarter's results stay invisible until they've already arrived."

- **Lines 21, 27, 33, 39, 45 (section closers):** Five of six sections end with an aphoristic one-liner: "That investment discipline is what keeps the board conversation alive when results take longer than expected." / "The measurement architecture has to precede the program." / "...a harder slide to prepare and a much harder slide to dismiss." / "The three-dimension framework gives those metrics a coherent home..." / "...not in month five when the CFO is already unconvinced."
  - **Why it's a smell:** Recurring mic-drop closer is a Category 6 rhetorical-scaffolding tell when it is the default move across nearly every section, not a deliberate choice used once or twice.
  - **Suggested rewrite:** Replace at least three with a sentence that advances the argument or poses the next section's question rather than wrapping the current one.

- **Paragraph openers throughout:** "The" opens six of sixteen paragraphs (lines 5, 9, 19, 27, 39, 45).
  - **Why it's a smell:** Six instances is double the 3-or-more threshold for paragraph-opener monotony.
  - **Suggested rewrite:** Rotate through alternatives: lead with the named concept, a number, a named actor, or a verb phrase.

- **Lines 9 and 11:** "headcount reduction, cost savings, hours saved per process" (line 9) and "cost savings, headcount reduction, process speed" (line 11) — the same three items, reshuffled, within two paragraphs.
  - **Why it's a smell:** Triadic recycling within the same section signals list-slot filling rather than considered word choice.
  - **Suggested rewrite:** Name the items once, then refer to them collectively in the next reference.

## Minor findings

- Uniform 2-paragraph structure across all six sections creates a templated rhythm; one single-paragraph or three-paragraph section would break it.
- "Most enterprise AI pilots never reach production" (line 17) and the month-timeline breakdown (line 25) are asserted without sourcing. A parenthetical attribution or "in our experience across N engagements" framing would anchor both.

## The one paragraph to rewrite first

**Before (line 45 — closing paragraph):**

> The CFO who demands traditional ROI metrics and kills a well-structured program at month six is optimizing for the wrong time horizon. The measurement framework needs to change. That work belongs at the start of the program, not in month five when the CFO is already unconvinced.

**After:**

> The CFO who demands traditional ROI metrics and kills a well-structured program at month six is optimizing for the wrong time horizon. Fixing that starts with measurement architecture — and measurement architecture has to precede the program. By month five, the case for redesign requires a political fight instead of a data conversation.

## What to do next

- Grep for `isn't|wasn't|doesn't|not a |not the |it's not|that's not|rather than|, not |not because` and resolve all five hits; start with line 45.
- Name the three ROI dimensions explicitly — around line 11 or 13 — and use those names every time "all three value dimensions" or "the three-dimension framework" currently appears.
- Vary the section closers: at least three of the five aphoristic one-liners should end with a sentence that advances the argument or opens the next question.
- Add one attribution for "most enterprise AI pilots never reach production" and one for the 1-3 / 3-9 / 9+ month timeline.
- Re-run the smell test before publishing.
```

Let me write that to the file now.

Writing the scorecard to `ai-roi-framework-blog.smell-test.md` in the working directory.

```
# AI Smell Test — ai-roi-framework-blog (pasted draft)

**Date:** 2026-09-27  
**Grade:** D   ·   **Word count:** ~720   ·   **Threshold:** B (default)  
**Document type:** Client-facing deliverable

🚨 **DO NOT SHIP** — this draft reads as AI-generated.
...
```

The file is saved. Here is the summary of what the scan found.

---

**Grade: D (5.95 weighted average). DO NOT SHIP.**

The two biggest problems:

**Contrast negation is saturated.** Five bare-tail instances in ~720 words — one of them in the closing paragraph, which is a CRITICAL finding. This is the highest-frequency AI tell this skill tracks, and this draft has it at the same density the 2026-09-04 audit found in fully AI-generated posts. Run the grep pattern (`isn't|wasn't|doesn't|not a |not the |it's not|that's not|rather than|, not |not because`) and fix every hit before anything else.

**The three-dimension framework is never defined.** The piece is built around arguing for a better ROI framework, but the three dimensions are referenced three times without being named. A reader finishes the post not knowing what the framework actually is. That is a Category 4 fake-specific finding — the number "three" does authoritative work that the content doesn't back up.

The rest is fixable in one pass: vary three of the five aphoristic section-closers, rotate paragraph starters off "The," and drop one citation for the pilot-failure rate claim.

Scorecard saved at `ai-roi-framework-blog.smell-test.md` — use it as your checklist while you edit.