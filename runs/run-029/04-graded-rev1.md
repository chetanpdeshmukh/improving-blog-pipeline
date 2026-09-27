Running the smell test on the pasted draft. Starting with the Category 2 mechanical grep pass, then scoring all six categories.

**Category 2 grep hits found:**
- Title: "Doesn't" -- two-sentence corrective template
- Line 78: ", not competitive advantage" -- bare mid-sentence tail
- Line 88: ", not whether the business model feels preserved" -- bare mid-sentence tail in closing

Now writing and saving the report.

```markdown
# AI Smell Test — "AI Doesn't Change Your Business DNA. It Amplifies It."

**Date:** 2026-09-27
**Grade:** C   ·   **Word count:** ~1,300   ·   **Threshold:** B
**Document type:** Client-facing deliverable

🚨 **DO NOT SHIP** — this draft reads as AI-generated.

## Scorecard

| Category | Score | Weight | Notes |
|---|---|---|---|
| Voice clichés, hollow affirmations & false authoritative framing | 8/10 | 20% | Clean — no hollow affirmations, no buzzwords, no false-authority labels |
| Contrast negation & em-dash overuse | 5/10 | 20% | Two-sentence corrective template in the title (CRITICAL); bare tail in the closing paragraph (CRITICAL); one additional instance mid-document |
| Triadic structures & parallel listing | 6/10 | 10% | Three three-item lists clustered in one paragraph; three consecutive imperative sentences in Section 5 |
| Generic content & fake specifics | 6/10 | 25% | "30-40% productivity gain" and "15-20% loss" with no source or baseline; two additional unsourced statistics |
| Structural tells | 8/10 | 15% | Clean heading hierarchy; no broken tables; no markdown bleed |
| Synonym sprawl, repetition & rhetorical scaffolding | 5/10 | 10% | "When this works / When it fails" template closes four sections — above the 3× threshold; confirmed in the author's own edit notes to have started as a 7-section template |

## Critical findings

- **Line 2 (title):** "AI Doesn't Change Your Business DNA. It Amplifies It."
  - **Why it's a smell:** The title is the two-sentence corrective template — "X doesn't do Y. It does Z." — the highest-frequency AI tell found in the 2026-09-04 audit, placed at the most visible position in the piece.
  - **Suggested rewrite:** "Your AI Results Depend on What You Were Already Good At" — or anchor to the concrete opening claim: "The Companies Winning with AI Started with the Right Question"

- **Line 84:** "The 30-40% productivity gain and the 15-20% loss trace back to one first decision: whether the team started with the customer problem or with the technology."
  - **Why it's a smell:** Two round-number ranges used as the closing, most-convincing claim in the piece, with no source, no baseline, and no description of what was measured. Reads as invented.
  - **Suggested rewrite:** Cite the source, or replace with internal evidence: "In our engagements, teams that started with a named customer problem reported outcomes they could measure. Teams that started with a technology selection are still writing post-mortems."

- **Line 88:** "The test is whether customers benefit, not whether the business model feels preserved."
  - **Why it's a smell:** Bare mid-sentence tail ("..., not whether...") in the closing paragraph — the highest-severity placement for this pattern.
  - **Suggested rewrite:** "The test is whether customers benefit. That is the only question worth asking."

## Major findings

- **Line 12:** "...the knowledge, relationships, and processes that customers pay for ... faster, with better information, at greater scale ... AI analyzes weather patterns, identifies hailstorm zones, and generates targeted marketing lists."
  - **Why it's a smell:** Three three-item lists appear within a single paragraph — the X, Y, and Z rhythm fires three times in under 150 words.
  - **Suggested rewrite:** Collapse one: "AI analyzes weather patterns to identify affected neighborhoods and generates the outreach list."

- **Line 40:** "The average organization reportedly experiences over 200 data exposure incidents per day through consumer AI tool use, and given how rarely these incidents are detected, that figure likely understates the actual rate."
  - **Why it's a smell:** "Reportedly" with no citation — a specific number used as evidence without a named source.
  - **Suggested rewrite:** Add the citation, or reframe: "Research suggests organizations experience hundreds of AI-related data exposure incidents daily, with most going undetected."

- **Line 44:** "The roughly 60% of organizations without one are carrying a risk that compounds every week their employees use AI tools to be productive."
  - **Why it's a smell:** Round-number statistic ("roughly 60%") with no source.
  - **Suggested rewrite:** Cite the source, or reframe: "Most organizations still lack a formal AI tool policy, and the exposure compounds each week employees keep working around that gap."

- **Lines 34/36, 56/58, 72/74, 86/88:** "**When this works:** ... **When it fails:** ..." closes four consecutive sections.
  - **Why it's a smell:** Identical rhetorical scaffolding 4 times as section endings, above the 3× threshold. The author's own edit notes confirm this was a 7-section template before partial remediation — the residue is visible.
  - **Suggested rewrite:** Retain the two blocks where conditions are genuinely distinct (Section 3: Foundation; Section 6: Maturity Ladder). End Sections 5 and 7 with direct consequence sentences instead.

- **Line 52:** "Give people a curated set of approved tools. Show them what those tools make possible in their specific work context. Let them find where AI reduces friction in what they already do well."
  - **Why it's a smell:** Three consecutive imperative sentences, same grammatical form, same approximate length — the bullet-list pattern in prose.
  - **Suggested rewrite:** "Give people a curated set of approved tools and show them what's possible in their specific work. Let them find the friction."

- **Line 78:** "A company that protects customer service processes because 'that is how we have always done it' is protecting friction, not competitive advantage."
  - **Why it's a smell:** Bare mid-sentence tail ("..., not competitive advantage") in a mid-document paragraph.
  - **Suggested rewrite:** "A company that protects customer service processes because 'that is how we have always done it' is protecting friction at the customer's expense."

## Minor findings

- Lines 64-68: "Level 1 is... Level 2 is... Level 3 is..." — three consecutive paragraphs opening identically. Intentional for a maturity-model section, but mechanical. Low severity.
- Line 12: "The business DNA is unchanged. The productivity gain is real." — short parallel kicker echoes the corrective-template rhythm. Grounded in the specific roofing example here, so not flagged at MAJOR; worth watching if the pattern accumulates in revision.

## The one paragraph to rewrite first

**Before (lines 84-88):**

> Companies that treat this shift as a temporary disruption to wait out will fall behind. The 30-40% productivity gain and the 15-20% loss trace back to one first decision: whether the team started with the customer problem or with the technology.
>
> **When this works:** AI investment is grounded in a specific customer problem and evaluated against a measurable outcome. The DNA being amplified is the DNA customers actually value.
>
> **When it fails:** The amplification frame becomes a shield for organizational inertia. The test is whether customers benefit, not whether the business model feels preserved.

**After:**

> Companies that treat this shift as a temporary disruption to wait out will fall behind. The teams that started by naming a specific customer problem saw outcomes they could measure and explain. The teams that started by selecting a technology are still writing post-mortems.
>
> AI investment earns its cost when it is grounded in a named customer constraint. When the framework becomes a reason to protect existing practices rather than test them, you have amplified the wrong thing. The question is always whether customers are better off.

## What to do next

- Source or replace the three unsourced statistics before publishing: the "30-40% productivity gain," the "15-20% loss," and the "over 200 incidents per day" are the three load-bearing claims with no citation.
- Retitle the post — the current title is the two-sentence corrective template at the highest-visibility position in the piece.
- Cut two of the four "When this works / When it fails" blocks: keep Foundation (Section 3) and Maturity Ladder (Section 6), replace Sections 5 and 7 with direct consequence sentences.
- Grep for `, not ` and resolve the two remaining bare mid-sentence tails (lines 78 and 88).
- Re-run the smell test before publishing.
```

Saving to `runs/run-030/`.

```python
import os

report_dir = "/Users/Chetan.Deshmukh/Documents/Claude Cowork Project/blog writing framework/blog-pipeline-stage4/runs/run-030"
os.makedirs(report_dir, exist_ok=True)
```