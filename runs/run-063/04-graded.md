I'll run the full smell test on this draft now, starting with the Category 2 grep pass before reading for feel.

**Category 2 grep pass first** — scanning for `isn't|wasn't|doesn't|not a |not the |it's not|that's not|rather than|, not |not because`:

- Line 1 (title): "Isn't AI-Ready" — thesis premise, not the corrective template
- Line 13: "rather than enforcement infrastructure" — substantive contrast resolving into a specific named distinction; borderline, leaning not-flag
- Line 47: "prerequisites, not afterthoughts" — clear bare mid-sentence tail
- No em dashes found anywhere in the body text
- No "not because" hits

Notably clean for Category 2. Proceeding with full scoring.

---

# AI Smell Test — Your Data Isn't AI-Ready (blog draft, pasted text)

**Date:** 2026-09-27
**Grade:** B   ·   **Word count:** ~1,780   ·   **Threshold:** B (default)
**Document type:** Client-facing deliverable

Grade is at threshold — one polish pass and ship.

## Scorecard

| Category | Score | Weight | Notes |
|---|---|---|---|
| Voice clichés, hollow affirmations & false authoritative framing | 9/10 | 20% | No buzzword saturation, no hollow openers, no false-candor framing found |
| Contrast negation & em-dash overuse | 8/10 | 20% | One confirmed bare tail (line 47); zero em dashes; notably clean relative to audit history |
| Triadic structures & parallel listing | 8/10 | 10% | Several "X, Y, and Z" lists but substantive and varied; no paragraph-level saturation |
| Generic content & fake specifics | 7/10 | 25% | Dead letter queue case (lines 39-41) has no industry context and no outcome metric; acknowledged honestly but still a reader-facing gap |
| Structural tells | 7/10 | 15% | Unresolved `[INSERT DIAGRAM]` placeholder (line 45) is a hard ship-blocker; four acronyms unexpanded for a business audience |
| Synonym sprawl, repetition & rhetorical scaffolding | 8/10 | 10% | Clean on all new Category 6 sub-checks; "liability" used twice in parallel context (below threshold) |

**Weighted total: 7.80 → Grade: B**

---

## Critical findings

- **Lines 39-41:** "A client came to Improving with 400,000 records stuck in a dead letter queue... Resolution metrics from this engagement are pending client follow-up. The architecture is documented; the outcome data is not yet available for publication."
  - **Why it's a smell:** Category 4. A case study section without a measurable outcome is a credibility gap at the reader level — you get the problem and the approach but no proof it worked. The honest disclosure is better than fabricating a number, but a published blog with a case study that trails off at "architecture is documented" invites the question of whether it actually succeeded.
  - **Suggested rewrite:** Either hold this case study until outcome metrics are available and replace with a brief placeholder ("We're tracking results from this engagement and will update this section when the client has cleared them for publication"), or reframe the section explicitly as an architecture illustration rather than a case study: "Here's what a deployable agentic triage architecture looks like — the pattern, not the outcome, is what transfers."

---

## Major findings

- **Line 45:** `` `[INSERT DIAGRAM: Event flow trace: incoming event → agent evaluation → output event(s) → observability layer, with kill switch and alert threshold indicated]` ``
  - **Why it's a smell:** Unresolved placeholder that will appear verbatim in the published post. Hard ship-blocker before anything else.
  - **Suggested rewrite:** Produce the diagram or remove the placeholder entirely. The surrounding prose (lines 43 and 47) already describes the flow clearly enough to stand without it; the diagram would add value but the post does not require it.

- **Line 47:** "The deployment described here worked because data structure and observability were prerequisites, not afterthoughts."
  - **Why it's a smell:** Bare mid-sentence contrast-negation tail — the sentence is complete at "prerequisites"; ", not afterthoughts" is the reflexive qualifier the AI appends when it wants to land a point harder. One use in a 1,780-word piece is low compared to audit history, but the pattern is still the pattern.
  - **Suggested rewrite:** "The deployment described here worked because data structure and observability were prerequisites — built in before the agent touched production."

---

## Minor findings

- **Line 11:** "PII" used without expansion. For a business leadership audience (the implied reader for this post), spell out "personally identifiable information (PII)" on first use.
- **Line 21:** "LLMs" not expanded. "Large language models (LLMs)" on first use is safer for this audience.
- **Line 55:** "SLA" not expanded — "service-level agreement (SLA)" on first use.
- **Line 65:** "ETL" in the closing paragraph not expanded — "extract, transform, load (ETL)" on first use, or swap to "data pipeline" if the acronym isn't load-bearing here.

---

## The one paragraph to rewrite first

The closing two sentences of "What a working agentic deployment looks like" (line 47), because they contain the only confirmed Category 2 hit and currently close the most evidence-thin section of the piece.

**Before:**
> Wide-open database access, undocumented fields, and absent monitoring turn an agentic deployment into a liability operating at machine speed. The deployment described here worked because data structure and observability were prerequisites, not afterthoughts.

**After:**
> Wide-open database access, undocumented fields, and absent monitoring turn an agentic deployment into a liability at machine speed. The deployment described here worked because data structure and observability were prerequisites — built in before the agent touched production.

---

## What to do next

- Resolve the `[INSERT DIAGRAM]` placeholder before anything else — it is a hard ship-blocker.
- Decide on the dead letter queue case study: hold it until outcome metrics clear, or reframe it explicitly as an architecture illustration rather than a case study.
- Cut the ", not afterthoughts" tail from line 47 (one-minute fix).
- Expand PII, LLM, SLA, and ETL on first use.
- Re-run the smell test once the diagram and case study framing are resolved.

---

**Overall assessment:** This is one of the cleaner drafts this skill has seen — no Category 1 saturation, a near-zero Category 2 hit rate, strong specificity in the quotes and diagnostic examples, and honest disclosure where data is missing. The two remaining blockers (the INSERT DIAGRAM placeholder and the case study without an outcome) are real but fixable without rebuilding the draft.

Since this was pasted text rather than a file path, I can't save the `.smell-test.md` automatically — paste the report above into a file next to your draft if you want to use it as a remediation checklist.