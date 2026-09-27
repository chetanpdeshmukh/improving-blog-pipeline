I'm running the six-check smell test on this blog draft, starting with the Category 2 grep pass before reading for feel.

The Category 2 grep pass (`isn't|wasn't|doesn't|not a |not the |it's not|that's not|rather than|, not |not because`) on the full body text returns zero clean hits on contrast-negation templates. The production note at the bottom confirms all four em dashes were removed in this revision. Category 2 is unusually clean for a blog draft.

Now running all six checks and saving the scorecard.

```markdown
# AI Smell Test — your-ai-roi-framework-is-the-problem.md

**Date:** 2026-09-27
**Grade:** C   ·   **Word count:** ~750   ·   **Threshold:** B
**Document type:** Client-facing deliverable

🚨 **DO NOT SHIP** — this draft reads as AI-generated.

## Scorecard

| Category | Score | Weight | Notes |
|---|---|---|---|
| Voice clichés, hollow affirmations & false authoritative framing | 9/10 | 20% | No hollow openers, no leverage/robust/seamless; voice is direct and specific throughout |
| Contrast negation & em-dash overuse | 9/10 | 20% | Zero hits on full-document grep pass; em dashes confirmed removed per production note |
| Triadic structures & parallel listing | 5/10 | 10% | 8 three-item lists across ~750 words; 5+ within the first 500 words; two triadic lists in back-to-back sentences on line 31 |
| Generic content & fake specifics | 5/10 | 25% | Three unattributed statistics (60% pilot failure, 20-30%/70-80% value split, $1/$2 ratio) stated as benchmarks with no source; production note flags two of the three as open issues |
| Structural tells | 8/10 | 15% | Clean heading hierarchy; no tables; five acronyms unexpanded (AI, ROI, ERP, POC, CFO) — below the six-acronym threshold |
| Synonym sprawl, repetition & rhetorical scaffolding | 7/10 | 10% | Mic-drop sentence closers at three of six section endings; "compounding curve" repeated in near-identical framing across two sections |

## Critical findings

- **Line 11:** "The operational efficiency gains visible in a traditional ROI model account for roughly 20-30% of AI's total measurable value. [...] Strategic differentiation and organizational intelligence, the remaining 70-80%, require different instrumentation to capture."
  - **Why it's a smell:** The 20-30% / 70-80% breakdown is presented as fact with no source. A skeptical reader who asks where these numbers come from will find nothing to cite — and the production note on this draft explicitly flags the 70-80% sourcing as an unresolved issue.
  - **Suggested rewrite:** "Traditional ROI models capture the most visible gains first: cost savings, headcount reduction, process speed. These are real, but they represent the floor of AI's financial impact, not the ceiling. Decision quality, competitive positioning, and organizational capability — what the program does to how your company operates — take longer to quantify, and most measurement frameworks never set up the metrics to capture them."

- **Line 17:** "Close to 60% of enterprise AI pilots never reach production."
  - **Why it's a smell:** The statistic appears without attribution. It circulates widely (often cited from McKinsey or Gartner), but the specific source determines how "AI pilot" is defined and what population was sampled. As written, it is unanchorable if challenged.
  - **Suggested rewrite:** Attribute it with a footnote, or soften to: "Most enterprise AI pilots never reach production — the pattern is consistent enough across industries that program designers now plan for it as a structural risk, not an edge case."

- **Line 21:** "budgeting $1 in change management support for every $2 in technical infrastructure"
  - **Why it's a smell:** A specific ratio presented as an industry benchmark with no source or methodology. The production note on this draft explicitly flags provenance as an open issue. A CFO reader will ask where this comes from, and there is no answer in the text.
  - **Suggested rewrite:** Remove the ratio until it can be sourced: "Organizations that scale past pilot treat change management as a first-class budget line — not an afterthought bolted on after the technical build."

## Major findings

- **Line 9:** "measure cost savings, count headcount reduction, compare labor hours before and after"
  - **Why it's a smell:** Three parallel verb phrases in the same grammatical shape — one of eight triadic structures across this draft, and five appear within the first 500 words.
  - **Suggested rewrite:** "ERP ROI was built on concrete, near-term numbers: headcount reduction, cost savings, hours saved per process — all visible within a quarter of go-live."

- **Line 31:** "Leading indicators (model accuracy, end-user adoption rate, time-to-insight) signal whether the program is on track. Lagging indicators (revenue impact, cost per decision, customer satisfaction) are what you report to the board."
  - **Why it's a smell:** Two three-item parenthetical lists in consecutive sentences, both in the same grammatical shape. The density signals a list-generating pattern rather than editorial judgment about which examples matter most.
  - **Suggested rewrite:** "Leading indicators — model accuracy, adoption rate, time-to-insight — tell you whether the program is tracking before the financial results arrive. Lagging indicators are what you eventually take to the board. Managing only the lagging ones means steering by looking out the rear window: you see where you've been, not where you're heading."

- **Lines 21, 27, 45 — mic-drop section closers:** "Most organizations invert that ratio." / "The measurement architecture has to precede the program." / "That conversation starts before the program does."
  - **Why it's a smell:** Three of the six major sections close with a short, aphoristic one-liner. One or two is craft; three across six sections is a template — the rhetorical equivalent of the contrast-negation pattern in Category 2. The reader starts to feel the rhythm before the content lands.
  - **Suggested rewrite:** Keep the strongest one ("The measurement architecture has to precede the program" — it is the clearest payoff line in the piece). Rewrite the other two section endings to advance the next point or set up the following section rather than close with a pulled quote.

## Minor findings

- **Lines 11 and 25:** "compounding curve" appears in near-identical framing in both the first body section ("on a compounding curve that takes months to appear in financial metrics") and the Board Conversation section ("AI systems operate on a compounding curve"). Two uses of an unusual phrase in the same structural position across two sections reads as a copy-paste, not a callback.

- **Lines 11 and 39:** "instrumentation" used in two distinct senses — measurement tooling ("require different instrumentation to capture") and a diagnosis of why CFOs push back ("The cause is insufficient instrumentation"). Worth a second read to confirm the uses don't blur.

- **Line 43:** "AI-native" appears twice in the same sentence ("AI-native infrastructure," "AI-native competitors"), adding a compound-adjective repetition on top of the triadic structure in that paragraph.

## The one paragraph to rewrite first

**Before (line 11):**
> AI systems improve as they consume data and feedback, on a compounding curve that takes months to appear in financial metrics. The operational efficiency gains visible in a traditional ROI model account for roughly 20-30% of AI's total measurable value. They're the easiest to see and the least strategically interesting. Strategic differentiation and organizational intelligence, the remaining 70-80%, require different instrumentation to capture.

**After:**
> AI systems improve as they consume data and feedback, on a curve that takes months to show up in financial metrics. Traditional ROI models capture the most visible gains first: cost savings, headcount reduction, process speed. These are real, but they represent the floor of what AI can deliver financially, not the ceiling. Decision quality, competitive positioning, and organizational capability take longer to quantify — and most measurement frameworks never set up the metrics to capture them at all.

*The 20-30% / 70-80% figures are removed because they lack a citable source. If the author has a source, add the attribution inline. If not, the rewrite above makes the same argument without a number that cannot be defended under scrutiny.*

## What to do next

- Source or remove the three unattributed statistics (60% pilot failure rate, 20-30%/70-80% value split, $1/$2 change management ratio) before publishing — a single skeptical reader can invalidate the piece if these cannot be backed up, and the production note confirms the author already knows two of the three are open issues.
- Reduce triadic structures to no more than three across the full draft; the leading/lagging indicators breakdown (line 31) is the most content-specific and worth keeping — convert the others to prose or drop the weakest item from each list.
- Keep one mic-drop section closer (line 27 is the strongest) and rewrite the other two endings to develop a point or set up the next section.
- Vary "compounding curve" in the second occurrence — even a small change ("the same compounding pattern," "that same curve") signals a writer who noticed the repetition, not one who generated two sections independently.
- Re-run the smell test after addressing the Category 4 items — fixing sourcing alone could move the grade to B.
```

Scorecard saved at `your-ai-roi-framework-is-the-problem.smell-test.md`. Use it as your checklist while you edit.

**The headline finding:** Category 1 and 2 are genuinely clean — this is a well-edited draft by the standards of those two categories, and the contrast-negation work the production note references shows. The grade is C (7.25 weighted) because Category 4 drags it: three specific-sounding statistics with no citable source. Fix the sourcing on those three numbers and the grade likely moves to B without touching anything else.