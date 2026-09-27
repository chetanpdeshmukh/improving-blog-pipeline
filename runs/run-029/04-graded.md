37, 91 — "gap" reused 3× for different referents:** knowledge gap among boards (L5), access-control gap in data estates (L37), productivity gap in the closing (L91).
  - **Why it's a smell:** A distinctive word doing different work 3+ times instead of the writer finding new language each time.
  - **Suggested rewrite:** L5: "the difference." L37: "the exposure." L91: "that spread."

- **Lines 5, 37, 59, 87, 91:** Abstraction-as-active-subject 5+ times: "That framing difference is what separates..." / "Enterprise AI makes those gaps immediately visible..." / "That social proof is more persuasive than any mandate." / "That customer experience was better than anything..." / "That is how the gap...gets decided."
  - **Why it's a smell:** Five instances across 2,170 words reads as a tic; the author defers to the abstraction rather than making the claim directly.
  - **Suggested rewrite (selective):** L5: "Companies that start with the business problem consistently outperform those that start with the technology." L59: "Internal advocates are more persuasive than mandates."

---

## Minor findings

- **Line 91:** The closing collapses the opening's ranges ("30-40%" and "15-20%") to single figures ("30%" and "15%"). If those numbers stay, they need to be consistent between hook and payoff.
- **Line 91:** "starting from the customer problem, building on a governed data foundation, and amplifying what already works" — another triadic gerund in the closing sentence, echoing the Section 1 cluster.
- **Line 6:** "The gap is wider than most boards understand" stacks a second abstraction-as-subject directly onto the first in the same two-sentence paragraph.

---

## The one paragraph to rewrite first

**Before (lines 5–6):**
> That framing difference is what separates a 30-40% productivity gain from a 15-20% loss. The gap is wider than most boards understand when they approve an AI initiative.

**After:**
> In our engagements, the spread between AI that earns its cost and AI that burns through budget traces back to one decision made in the first month: whether leadership started with the customer problem or with the technology. Most boards approve AI initiatives without knowing which path the initiative is on.

**Why this paragraph first:** It carries two unsourced statistics that are echoed in the closing, and it is the single most fact-checkable claim in the post. Fixing it here defangs the closing, which currently inherits the same Category 4 problem.

---

## What to do next

- Rewrite the title to remove the two-sentence corrective negation — the opening is where this pattern does the most damage.
- Source or remove the three unsourced statistics (30-40%/15-20%, 200 incidents/day, roughly 60%). If the percentages come from real Improving engagements, say so; if from published research, cite the source.
- Grep the full draft for `, not ` and resolve both remaining hits (lines 85 and 95).
- Vary the "When this works / When it fails" closing structure — keep it in two or three sections, replace it with a direct assertion or consequence in the rest.
- Re-run the smell test before publishing.

---

Scorecard saved at `ai-doesnt-change-business-dna.smell-test.md` — use it as your checklist while you edit.

One note on the claim embedded in the draft's own editor note at the bottom: "The draft is otherwise tight and passes clean on all six steps." That is not accurate. The title is a Category 2 CRITICAL finding, three statistics are Category 4 CRITICAL findings, and the closing callout is a second Category 2 CRITICAL finding — six critical findings total. The earlier edits (removing "leverage," cutting the framing device) were correct moves; they brought Category 1 to 9/10. The remaining problems are in Categories 2, 4, and 6.