Running the smell test now: Category 2 grep pass first, then the full six-check analysis.

# AI Smell Test — "Your Business Doesn't Need an AI Strategy. It Needs a Data Strategy."

**Date:** 2026-09-27
**Grade:** C · **Word count:** ~1,350 · **Threshold:** B (default)
**Document type:** Client-facing deliverable (public blog post)

🚨 **DO NOT SHIP** — this draft reads as AI-generated.

## Scorecard

| Category | Score | Weight | Notes |
|---|---|---|---|
| Voice clichés, hollow affirmations & false authoritative framing | 8/10 | 20% | No classic clichés; "Rusic's read on the outcome is direct:" mildly telegraphs what the quote should demonstrate on its own |
| Contrast negation & em-dash overuse | 5/10 | 20% | CRITICAL: two-sentence corrective in the title; CRITICAL: ", not permission to wait" in the closing paragraph; MAJOR: "It just wasn't reachable" in the body |
| Triadic structures & parallel listing | 7/10 | 10% | Triadic "It's human connections, it's service providing, it's delivering value to customers" (may be verbatim quote); three-item security-practices list in the coding section |
| Generic content & fake specifics | 6/10 | 25% | Education company case study: no name, no metric (inline pre-publication blocker still open); AI Adoption Maturity Model section applies equally to any consultancy |
| Structural tells | 9/10 | 15% | Clean: no tables, no heading skips, paragraph lengths vary meaningfully |
| Synonym sprawl, repetition & rhetorical scaffolding | 7/10 | 10% | Two section-closing mic-drop lines across the piece; three "That/That's" paragraph openers |

---

## Critical findings

- **Title:** "Your Business Doesn't Need an AI Strategy. It Needs a Data Strategy."
  - **Why it's a smell:** The two-sentence corrective template ("doesn't need X; it needs Y") applied to the highest-read location in the entire piece. Every reader sees this before anything else. This is the single most common AI-writing pattern logged in the 2026-09-04 audit, and placing it in the title maximizes its impact on how the piece reads.
  - **Suggested rewrite:** Lead with the Rusic credit card story and let the thesis emerge from the anecdote, or reframe the title to state the argument directly without the contrast scaffold: "Data Infrastructure Is the AI Strategy" or "The Question Every AI Initiative Skips."

- **Education company paragraph (body):** "Improving worked with a large education company sitting on years of content... **[NEEDS METRIC: one quantitative outcome from the engagement team before this publishes]**"
  - **Why it's a smell:** A named case study with no client name and no quantified outcome reads as fabricated to a technical executive audience, regardless of whether it happened. The inline flag confirms this is already identified as a blocker — it must close before this piece ships.
  - **Suggested rewrite:** Hold the paragraph; insert one real number (time-to-retrieval, support-ticket reduction, or content utilization rate) before publishing. Without it, the example proves only that AI can index content, which any reader already assumes.

- **Closing paragraph:** "Treat it as a posture, not permission to wait."
  - **Why it's a smell:** Bare mid-sentence tail — ", not permission to wait" appended to a claim that stands without it. Found in the closing paragraph, where contrast-negation does the most damage to how the piece ends.
  - **Suggested rewrite:** "Treat it as a posture: pick one specific friction point and build against it."

---

## Major findings

- **Intro section (Rusic quote):** "It's human connections, it's service providing, it's delivering value to customers."
  - **Why it's a smell:** Triadic structure with identical grammatical shape across all three items. If this is verbatim from the interview transcript, keep it and ignore this finding — speech patterns are not the author's tell. If paraphrased, vary the structure.
  - **Suggested rewrite (if paraphrased):** "He isn't describing a technology transition. He's describing the same businesses doing the same things — connection, service, delivery — just more efficiently."

- **"Why AI Mandates Are Backfiring" section:** "Rusic's read on the outcome is direct:"
  - **Why it's a smell:** "is direct" announces the quality of the quote rather than letting the quote prove it. Mild false-authority framing applied to the introduction of a third-party statement.
  - **Suggested rewrite:** "Rusic on the outcome:" — then the quote.

- **Closing paragraph:** "Nobody has reached AI nirvana. Rusic says this plainly."
  - **Why it's a smell:** "says this plainly" is the same announcing move — plainness labeled rather than demonstrated. "AI nirvana" is also a vague metaphor in an otherwise precise piece.
  - **Suggested rewrite:** "Nobody has a complete AI program, including Improving."

- **AI Adoption Maturity Model (entire section):** Three levels described in terms that apply to any AI consultancy's framework.
  - **Why it's a smell:** Level 1 (prompting), Level 2 (data integration), Level 3 (agents) is industry-generic. Nothing in this section names Improving's specific sequencing, prior results at each level, or a differentiating take. A reader can find this same framework from any firm.
  - **Suggested rewrite:** Add one concrete Improving example per level (the credit card bot and the API credential story already exist and could anchor Levels 3 and 1 respectively), or collapse the maturity model framing and fold the governance/security content into adjacent sections where it already has specifics.

- **Security coding section:** "security scans on every AI-generated commit, code review that explicitly checks for credential handling, and authentication standards enforced at the framework level"
  - **Why it's a smell:** Three-item parallel list. The content is specific and actionable, which limits the damage, but the triadic structure is still mechanical.
  - **Suggested rewrite:** Lead with the most specific item and break the parallel shape: "Start with the credential check — it's the one item a framework can enforce at the point of generation. Back it with security scans on every AI-generated commit and code review that explicitly verifies credential handling."

- **End of AI Adoption Maturity Model section:** "That's how you end up explaining an AI-initiated action to your board."
  - **Why it's a smell:** One-sentence aphoristic mic-drop section closer. Two of these appear across the piece ("That's how you end up explaining..." and "Take the next right step"), which is at the lower edge of the threshold. Neither is saturated on its own; together they establish a pattern.
  - **Suggested rewrite:** Fold it into the preceding sentence: "Skipping to agents without the data governance foundation creates autonomous systems with no defined authority boundaries — which means the first conversation about that decision happens in a board room."

---

## Minor findings

- "Garbage in, garbage out" (Maturity Model section) is an overused idiom. A technical executive audience does not need the explainer, and removing it tightens the paragraph.
- Three paragraphs open with "That" or "That's" ("That example has a clear boundary," "That was the dominant playbook," "That's how you end up explaining..."). No single one is a problem; the cluster across the piece is worth varying on a polish pass.
- "adoption theater" (Where to Start section) is a sharp coinage — if the piece is going to introduce it, consider using it once more earlier to make it feel intentional rather than a stray observation.

---

## The one paragraph to rewrite first

**Before:**
> Nobody has reached AI nirvana. Rusic says this plainly. Treat it as a posture, not permission to wait. The organizations that will have a durable advantage in three years are building the data estate now. Take the next right step.

**After:**
> Nobody has a complete AI program, including Improving. The organizations building durable advantage treat data infrastructure as the ongoing investment, starting before the business case is airtight. Identify where the gap between your value and your customers' ability to reach it is widest. Close that gap. That's where AI returns compound.

The rewrite removes the contrast-negation tail ("not permission to wait"), the announcing-plainness move ("says this plainly"), and the generic mic-drop closer ("Take the next right step"), while keeping the piece's actual argument and closing on a concrete, repeatable action rather than an aphorism.

---

## What to do next

- **Fix the title first.** Kill the "doesn't need X, it needs Y" corrective scaffold and replace with a headline that leads with the Rusic question or states the thesis directly without a contrast frame.
- **Close the education company metric.** This is the only factual gap in the piece and the first thing a technical reader will notice. Get one real number from the engagement team before publishing.
- **Rewrite the closing paragraph** using the before/after above — it carries both a CRITICAL contrast-negation hit and a mic-drop closer in five sentences.
- **Re-run the Category 2 grep** (`isn't|wasn't|doesn't|not a |not the |it's not|that's not|rather than|, not |not because`) on the revised draft before shipping, specifically after the title rewrite, to confirm no new instances were introduced.
- **Decide on the Maturity Model section.** It's the weakest section for specificity. Either anchor each level to a real Improving example or trim it and redistribute the governance/security points into sections that already carry specific stories.

---

The draft is genuinely better than the average post in the 2026-09-04 audit — no buzzword saturation, a named expert with real quotes, and two strong concrete stories (the credit card bot and the API credential incident). The grade is C, not F, because the bones are solid. The title and the missing education company metric are the two blockers. Fix those and a second pass likely clears B.