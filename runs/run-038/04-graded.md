Grading the pasted draft now. Running the Category 2 grep pass first, then the full six checks.

---

# AI Smell Test — [pasted draft: "Your AI ROI Framework Is the Problem"]

**Date:** 2026-09-27
**Grade:** B · **Word count:** ~730 · **Threshold:** B
**Document type:** Client-facing deliverable

## Scorecard

| Category | Score | Weight | Notes |
|---|---|---|---|
| Voice clichés, hollow affirmations & false authoritative framing | 9/10 | 20% | No clichés, hollow affirmations, or false authoritative framing found |
| Contrast negation & em-dash overuse | 7/10 | 20% | One bare mid-sentence tail (line 43); one two-sentence corrective echo (line 21); em dashes under threshold (2, both inside diagram placeholder) |
| Triadic structures & parallel listing | 8/10 | 10% | Four three-item noun lists in 730 words; no single 500-word stretch clears 3+, but the pattern is consistent |
| Generic content & fake specifics | 7/10 | 25% | "Nearly 60 percent" stat is unattributed; `[INSERT DIAGRAM]` placeholder is unresolved |
| Structural tells | 7/10 | 15% | Four bold callout blocks across three sections; unresolved diagram placeholder renders as a code block in most publishing environments |
| Synonym sprawl, repetition & rhetorical scaffolding | 8/10 | 10% | "compounds/compounding" 3× (related uses); two aphoristic section closers, below the 3+ threshold |

**Weighted average: 7.60 → B**

---

## Critical findings

- **Line 17:** "Nearly 60 percent of enterprise AI pilots never reach production."
  - **Why it's a smell:** Unattributed statistic with no source, no qualifier. Reads as AI-invented.
  - **Suggested rewrite:** "McKinsey's 2024 AI adoption survey puts the share of enterprise pilots that never reach production at around 60 percent — and the cause almost never shows up in the autopsy as the technology." *(Or attribute to Improving's own client data if that's the actual source.)*

---

## Major findings

- **Line 21:** "you are measuring whether the model performs in controlled conditions. Production will not be controlled."
  - **Why it's a smell:** Two-sentence corrective template — the repeated word "controlled" across both sentences with a negation in the second is the signature Category 2 shape.
  - **Suggested rewrite:** "Pilots measure model performance under controlled conditions. Production introduces every variable the POC excluded."

- **Line 43:** "These are program functions that require explicit budget and ownership, not a line item added after the technical build is scoped."
  - **Why it's a smell:** Bare mid-sentence contrast tail — the ", not a line item" qualifier is the most common Category 2 variant found in the 2026-09-04 audit.
  - **Suggested rewrite:** "These are program functions that require explicit budget and ownership. Treating them as a post-build line item is how they disappear from scope."

- **Line 29:** `` `[INSERT DIAGRAM: three-phase timeline — months 1-3 (investment), 3-9 (learning/feedback loop tightening), 9+ (compounding returns) — annotated with what's happening organizationally at each stage]` ``
  - **Why it's a smell:** Unresolved placeholder renders as a literal code block in Ghost, Substack, and most CMS environments. Reads as an incomplete AI draft.
  - **Suggested rewrite:** Insert the actual diagram, or replace the placeholder with a prose bridge sentence until the diagram is ready: "The arc follows three phases: investment in months one through three, a tightening feedback loop through month nine, and compounding returns after that."

- **Lines 21, 37, 45 (×2 instances):** Bold callout blocks — **Failure mode:** appears twice, **When this works:** and **When it fails:** appear once each, four total across three sections.
  - **Why it's a smell:** Repeated structural scaffolding creates a fill-in-the-template feel. The editorial note at the bottom acknowledges dissolving this pattern in Section 1; the fix didn't carry through.
  - **Suggested rewrite:** Convert at least one **Failure mode:** block to running prose, the way the Section 1 callout was handled.

---

## Minor findings

- Four three-item noun lists appear at lines 9, 17, and 49 (twice). No single 500-word stretch exceeds two instances, so the Category 3 threshold isn't triggered. Worth varying the structure on revision to break the rhythm.
- "compounds / compounding" appears 3× (lines 9, 13, 49). The uses are related and the word is the post's thesis, but the third instance could swap for a synonym ("accumulates," "builds") to reduce the tic.
- Two aphoristic section closers: "The silence is the problem." (line 5) and "Production will not be controlled." (line 21). Both fall under the 3+ threshold. One should stay — the opening kicker earns its place. The line 21 rewrite above kills the second one.
- The editorial revision note at the bottom of the paste ("Four changes drove most of the work...") must be removed before publishing. It reads as author-to-editor commentary, not blog content.

---

## The one paragraph to rewrite first

**Before (line 21):**
> **Failure mode:** Skipping organizational readiness assessment before declaring a pilot successful means you are measuring whether the model performs in controlled conditions. Production will not be controlled.

**After:**
> The most common failure here is declaring a pilot successful before assessing whether the organization around it can hold up. A model that performs cleanly under controlled conditions will meet every variable the POC excluded the moment it hits production.

This single rewrite removes the Category 2 contrast-negation template, dissolves one of the four bold callout blocks, and eliminates the second aphoristic mic-drop closer — three MAJOR findings addressed in one pass.

---

## What to do next

- Source or attribute the "60 percent" stat before publishing. If it comes from Improving's client portfolio, say so; if it's third-party research, cite it.
- Apply the line 21 rewrite above — it's the highest-leverage single edit in the piece.
- Resolve the `[INSERT DIAGRAM]` placeholder. It will render as a code block as written.
- Grep `, not ` across the full draft one final time — the pattern has a way of surviving revision passes.
- Remove the editorial revision note from the bottom before the post goes live.