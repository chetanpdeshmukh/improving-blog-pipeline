I'll run the full smell test on this blog draft now, starting with the Category 2 grep pass before anything else.

**Category 2 grep pass** (`isn't|wasn't|doesn't|not a |not the |it's not|that's not|rather than|, not |not because`):

Hits found:
- Line 4: "complaint filters, **not** resolution tools" — opening paragraph, CRITICAL
- Line 12: "The content existed; the discoverability did **not**" — semicolon contrast form
- Line 16: "**rather than** useful ones"
- Line 24: "**not** after someone asks"
- Line 34: "evasion, **not** compliance"
- Line 44: "resistance **rather than** adoption" and "happening to them **rather than** something available for them"
- Line 46: "**not** generic productivity statistics"
- Line 52: "**not** announcing a Level 3 initiative"
- Line 56: "stagnation, **not** preservation" — closing section

Eight hits total. Proceeding to full six-check scoring.

Writing the report now.

```markdown
# AI Smell Test — ai-works-best-draft.md

**Date:** 2026-09-27
**Grade:** C   ·   **Word count:** ~1,200   ·   **Threshold:** B
**Document type:** Client-facing deliverable

🚨 **DO NOT SHIP** — this draft reads as AI-generated in key structural positions.

## Scorecard

| Category | Score | Weight | Notes |
|---|---|---|---|
| Voice clichés, hollow affirmations & false authoritative framing | 9/10 | 20% | Clean — no affirmations, no false-authority framing, no landscape opener |
| Contrast negation & em-dash overuse | 4/10 | 20% | 8 grep hits; `, not` in the opening paragraph is CRITICAL; em-dash usage is clean (1 total) |
| Triadic structures & parallel listing | 6/10 | 10% | 7 three-item parallel lists; "chatbots... dashboards..." structure mirrors itself nearly word-for-word in lines 6 and 58 |
| Generic content & fake specifics | 6/10 | 25% | Unattributed "40 percent" stat; two anonymous case studies with no quantified outcomes |
| Structural tells | 9/10 | 15% | Clean — appropriate headers, varied paragraph length, no markdown bleed |
| Synonym sprawl, repetition & rhetorical scaffolding | 7/10 | 10% | Two aphoristic mic-drop closers (below the 3-instance threshold); "The" opens 10+ paragraphs but is not one of the flagged forms |

**Weighted average:** (9×0.20) + (4×0.20) + (6×0.10) + (6×0.25) + (9×0.15) + (7×0.10) = **6.75 → C**

---

## Critical findings

- **Line 4:** "Most chatbots are complaint filters, not resolution tools."
  - **Why it's a smell:** `, not` corrective template in the document's opening paragraph — the single highest-frequency AI tell in the 2026-09-04 audit, in the worst possible position.
  - **Suggested rewrite:** "Most chatbots filter complaints and route tickets. This one was authorized to resolve the problem. That authorization is a business decision first, a technology decision second."

- **Line 34:** "Roughly 40 percent of companies have a formal AI policy."
  - **Why it's a smell:** Round-number statistic with no source — reads as invented. A reader who searches for the study and can't find it will discount the rest of the section.
  - **Suggested rewrite:** Cite the source (e.g., "A 2024 KPMG survey found fewer than half of companies have a formal AI policy") or replace with an observation from Improving's own client portfolio.

---

## Major findings

- **Line 12:** "The content existed; the discoverability did not."
  - **Why it's a smell:** Semicolon contrast-negation template — structurally identical to "X is not Y. It is Z." just with a semicolon instead of a period.
  - **Suggested rewrite:** "The content existed but was practically unfindable without a guide."

- **Line 16:** "Connecting AI to a disorganized, untagged data estate produces confident, wrong answers rather than useful ones."
  - **Why it's a smell:** `rather than` corrective tail appended to a sentence that already stands on its own.
  - **Suggested rewrite:** "Connecting AI to a disorganized, untagged data estate produces confident, wrong answers."

- **Line 24:** "That exposure exists the moment you connect AI to the data, not after someone asks."
  - **Why it's a smell:** `, not` bare mid-sentence tail — the qualifier adds nothing the preceding clause doesn't already imply.
  - **Suggested rewrite:** "That exposure exists the moment you connect AI to the data."

- **Line 34:** "A prohibition that offers no replacement produces evasion, not compliance."
  - **Why it's a smell:** `, not` corrective tail — the point is already made by "produces evasion"; the tail is redundant scaffolding.
  - **Suggested rewrite:** "A prohibition that offers no replacement produces evasion."

- **Line 44:** "Metric-driven AI mandates generate resistance rather than adoption." and "The framing makes AI something happening to them rather than something available for them."
  - **Why it's a smell:** Two `rather than` corrective tails in consecutive paragraphs — the pattern becomes visible on a second read.
  - **Suggested rewrite (first):** "Metric-driven AI mandates generate resistance."
  - **Suggested rewrite (second):** "The framing makes AI something happening to them." (The implied alternative — something available to them — doesn't need to be stated.)

- **Line 46:** "concrete examples from their specific context, not generic productivity statistics pulled from industry reports"
  - **Why it's a smell:** `, not` corrective tail mid-sentence.
  - **Suggested rewrite:** "concrete examples from their specific role and workflow" — drop the tail entirely.

- **Line 52:** "taking the next step deliberately, not announcing a Level 3 initiative because a competitor did"
  - **Why it's a smell:** `, not` corrective tail.
  - **Suggested rewrite:** "taking the next step deliberately."

- **Line 56:** "Protecting customer service processes that frustrate customers because they have always worked that way is stagnation, not preservation."
  - **Why it's a smell:** `, not` corrective tail in the closing argument — concentrates the tell where readers finish the piece.
  - **Suggested rewrite:** "Protecting customer service processes that frustrate customers because they have always worked that way is stagnation."

- **Lines 6 and 58:** "chatbots that answer nothing useful, dashboards nobody opens, and productivity investments that return nothing measurable" / "chatbots nobody needed, dashboards nobody opened, initiatives whose primary output is a press release"
  - **Why it's a smell:** Near-identical three-item parallel structures used in both the opening and closing sections — the repetition reads as scaffolding, not a deliberate callback.
  - **Suggested rewrite:** Keep the line 58 version (shorter and punchier) in the closing only. Rewrite the line 6 version to be grounded in the specific setup: "That path produces chatbots nobody asked for, dashboards that go unopened, and productivity investments with no measurable return."

---

## Minor findings

- **Line 12:** Education company case study has no quantified outcome. "In ways no keyword search could replicate" is qualitative. Even one concrete signal — time-to-find, support ticket reduction, renewal rate — would anchor it.
- **Line 14:** Roofing startup case study has no quantified outcome. "Faster and more precise" is plausible but unmeasured. A timeline or adoption signal would help.

---

## The one paragraph to rewrite first

**Before (Line 4 — the opening):**
> A few months ago, John Rusic missed a credit card payment. He opened the company's chatbot expecting the usual runaround, explained the situation, and the bot refunded the late fee immediately with no escalation required. Most chatbots are complaint filters, not resolution tools. This one had actual authorization to solve the problem, and that distinction is a business decision first, a technology decision second.

**After:**
> A few months ago, John Rusic missed a credit card payment. He opened the company's chatbot expecting the usual runaround, explained the situation, and the bot refunded the late fee immediately with no escalation required. Most chatbots filter complaints and route tickets. This one was authorized to resolve the problem. That authorization is a business decision first, a technology decision second.

The fix is surgical — two sentences recast, contrast-negation removed, nothing else changed.

---

## What to do next

- Grep the draft for `isn't|wasn't|doesn't|not a |not the |it's not|that's not|rather than|, not |not because` and resolve all 8 hits: cut corrective tails where they are redundant, recast the sentence where the contrast is load-bearing.
- Fix the opening paragraph first using the rewrite above — it carries the CRITICAL hit and sets the reader's first impression of the voice.
- Source or replace the "40 percent of companies" statistic before publishing.
- Keep the line 58 "chatbots nobody needed, dashboards nobody opened" version and rewrite the line 6 version so the two aren't structural echoes.
- Re-run the smell test before publishing.
```

---

**Grade: C — do not ship.** The voice is genuinely strong: no affirmations, no landscape openers, no false-authority framing, clean structure. The single problem is contrast-negation saturation — 8 instances of the `, not` / `rather than` corrective template, including one in the opening paragraph. That pattern will read as AI-generated to anyone who has seen it before, and it's concentrated enough to pull the grade below the B threshold. The fix is mostly additive deletion: most of the corrective tails can simply be cut, and the sentences they attach to are stronger without them.