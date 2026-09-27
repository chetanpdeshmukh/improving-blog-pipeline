Running the six-category smell test on the pasted draft. No source file was provided, so I'm presenting the report inline rather than saving a `.smell-test.md` file next to it.

---

# AI Smell Test — The AI Trap (blog draft, pasted)

**Date:** 2026-09-27
**Grade:** C   ·   **Word count:** ~1,750   ·   **Threshold:** B
**Document type:** Client-facing deliverable

🚨 **DO NOT SHIP** — prior editing passes removed the most visible tells, but contrast-negation and rhetorical scaffolding patterns remain at a density that reads as AI-generated.

---

## Scorecard

| Category | Score | Weight | Notes |
|---|---|---|---|
| Voice clichés, hollow affirmations & false authoritative framing | 8/10 | 20% | One false-authority-framing instance ("One honest note on this engagement"); no buzzwords, no hollow affirmations |
| Contrast negation & em-dash overuse | 4/10 | 20% | 7 bare-tail ", not Y" instances across 5 sections; em dashes fully cleared |
| Triadic structures & parallel listing | 6/10 | 10% | Level 1/2/3 paragraphs structurally identical; three-item lists in 4 sections |
| Generic content & fake specifics | 6/10 | 25% | "the productivity research" (30-40%, 15-20%) unnamed; two case studies with no quantified outcome; one vague-source stat |
| Structural tells | 9/10 | 15% | No tables, no markdown bleed, clean heading hierarchy, varied section lengths |
| Synonym sprawl, repetition & rhetorical scaffolding | 4/10 | 10% | 5 mic-drop section closers across 6 sections; 7+ paragraphs opening with "The" |

---

## Critical findings

- **Line 6:** "The productivity research on AI is specific in a way most strategy coverage ignores. AI tools produce roughly a 30-40% improvement in tasks well-suited to AI assistance. For tasks poorly matched to AI, performance drops 15-20%."
  - **Why it's a smell:** Two round-number ranges attributed to "the productivity research" — no study, author, or institution named. A buyer who tries to verify this paragraph will find nothing to verify. This is a Category 4 send-blocker.
  - **Suggested rewrite:** Name the source. If it is the MIT/BCG 2023 knowledge-worker study, say so: "A 2023 MIT study of knowledge workers found a 37% productivity gain for AI-matched tasks and a 19% drop when workers used AI outside that range. The selection decision matters more than the implementation decision." If the actual source differs, sub it in — but name it.

---

## Major findings

- **Line 8:** "That is a predictable consequence, not a hypothetical risk."
  - **Why it's a smell:** Bare-tail contrast negation as a section closer — the most common pattern in this audit; easy to leave because the sentence reads as punchy.
  - **Suggested rewrite:** "That consequence arrives within one budget cycle. It is not a hypothetical." Or simply: "That consequence is predictable and arrives within one budget cycle."

- **Line 12:** "One honest note on this engagement:"
  - **Why it's a smell:** Announces honesty before delivering it. A human just makes the observation; the "honest" label is the tell.
  - **Suggested rewrite:** "One gap in this engagement:" or "A note worth flagging:"

- **Line 18:** "This is a configuration outcome, not a breach in the traditional sense, which makes it easier to overlook and harder to audit after the fact."
  - **Why it's a smell:** Bare-tail contrast negation embedded mid-sentence. The claim about it being easy to overlook stands on its own without the "not a breach" qualifier.
  - **Suggested rewrite:** "This is a configuration outcome — easy to overlook, outside most breach-response frameworks, and harder to audit once data has already moved."

- **Line 18:** "governance follows the data to your vendors, not just your own walls."
  - **Why it's a smell:** Second bare-tail contrast negation in the same paragraph, compounding the pattern.
  - **Suggested rewrite:** "Governance follows the data wherever it goes, including to your vendors."

- **Line 19:** "The cost is materially higher at that point and the reputational exposure is real."
  - **Why it's a smell:** Aphoristic mic-drop section closer. One or two across an article reads as rhythm. This is the second of five, which is where it becomes a structural tell.
  - **Suggested rewrite:** Extend the argument rather than closing it: "That remediation cost is higher not just in dollars but in the audit trail a client may eventually see."

- **Line 23:** "Communication and enforcement matter as much as the policy content."
  - **Why it's a smell:** Third mic-drop section closer in the same pattern — concise, aphoristic, and detached from the specific argument of the section.
  - **Suggested rewrite:** Fold into the prior sentence: "A policy document that employees have never seen provides no protection, which means the rollout and enforcement plan deserve the same investment as the policy language itself."

- **Line 27:** "Mandate-driven adoption produces compliance, not capability."
  - **Why it's a smell:** Category 2 bare-tail contrast negation and Category 6 mic-drop in the same sentence. The sentence is well-constructed, which is why it survived prior passes — but it carries both patterns simultaneously.
  - **Suggested rewrite:** "Mandate-driven adoption produces compliance. The metrics look fine. Whether that compliance generates actual business value is invisible to both."

- **Line 30:** "Return at this level comes from prompt quality and context provided, not from AI sophistication."
  - **Why it's a smell:** Bare-tail contrast negation closing the Level 1 paragraph.
  - **Suggested rewrite:** "At this level, prompt quality and context ceiling your results more than the model does."

- **Line 32:** "Level 3 is agentic: AI that executes tasks, not just answers questions."
  - **Why it's a smell:** Bare-tail contrast negation in the Level 3 definition, and the seventh instance in the document.
  - **Suggested rewrite:** "Level 3 is agentic: AI that executes tasks independently across a workflow, rather than responding to individual prompts."

- **Lines 30-32 (Level 1/2/3 paragraphs):** All three follow the same structural shape — "[Level N] is [adjective label]: [definition sentence]. [One sentence on who is here or an example]. [One sentence on what matters or what's non-negotiable at this level]." — at nearly identical length.
  - **Why it's a smell:** Triadic parallel structure where the paragraph shape is the template, not the content.
  - **Suggested rewrite:** Break the pattern for Level 3, which is qualitatively different from the other two. "Level 3 is a different category entirely. Agentic AI does not answer questions — it executes tasks. Operational models for this are still being worked out across the industry, and Improving is in that process alongside our clients, not ahead of it."

- **Line 33:** "some business DNA includes inefficiencies that AI should disrupt, not protect."
  - **Why it's a smell:** Seventh bare-tail contrast negation, in the penultimate paragraph.
  - **Suggested rewrite:** "Some business DNA is inefficiency with brand equity attached, and AI that amplifies it just scales the wrong thing faster."

- **Lines 4, 6, 7, 10, 13, 17, 26, 33, 34:** Nine paragraphs open with "The" or "This" as the first word, with "The" accounting for seven of them.
  - **Why it's a smell:** Paragraph-opener monotony — "The" is doing all the connective work across the piece. The Category 6 threshold is 3 or more; this is more than double that.
  - **Suggested rewrite:** Vary at least four. "The organizations generating genuine ROI..." → "Organizations generating genuine ROI..."; "The most durable early ROI..." → "Durable early ROI from AI..."; "The principle transfers..." → "This transfers across industries..."; "The leaders building durable advantage..." → "Leaders building durable advantage..."

- **Line 34:** "The only position that does not recover is deciding not to start."
  - **Why it's a smell:** Fifth mic-drop section closer. As a standalone sentence it is strong; as the fifth in a recurring pattern across six sections it is a structural tell rather than a rhetorical choice.
  - **Suggested rewrite:** Carry the argument through rather than closing with an aphorism: "The maturity ladder is not a competitive ranking — it's a map. Most organizations are at Level 1 and have room to move. The ones building durable advantage are taking the next step deliberately, with a clear problem in hand."

---

## Minor findings

- **Line 22:** "One published estimate puts employee data leakage incidents at 232 per day per organization." The specific number (232, not 200 or 250) reads as credible, but the source is anonymous. Add a footnote or inline link — the stat is worth keeping, but "one published estimate" will not survive a skeptical reader.
- **Line 26:** Two triadic structures in the same paragraph ("provide access to the right tools, define the data boundaries clearly, and let practitioners discover" and "employees who understand the tools, know the rules, and find high-value applications"). Each works individually; their proximity in one paragraph makes the pattern visible.

---

## The one paragraph to rewrite first

**Before:**
> The strongest counter-argument to the "amplify your DNA" thesis deserves a direct answer: some business DNA includes inefficiencies that AI should disrupt, not protect. Moving slowly under cover of this thesis is avoidance dressed as strategy. The distinction is whether you are asking "what problem does this solve for our customers" or "how do we protect what we have always done." The first question produces focused AI investment. The second produces inertia with a rationale attached.

This paragraph carries a contrast-negation instance ("disrupt, not protect"), two parallel "The [first/second] question produces..." sentences that read as templated, and "avoidance dressed as strategy" as a mic-drop-adjacent phrase mid-paragraph rather than at the end.

**After:**
> The "amplify your DNA" thesis has a real counter: some business DNA is inefficiency with brand equity attached, and AI that reinforces it scales the wrong thing faster. The diagnostic question is whether you are building on something customers value or on something your organization has simply always done. Companies that start from the customer problem find that question easy to answer and their AI investments follow quickly. Companies that start from protecting existing processes tend to take longer and spend more to get to the same place.

---

## What to do next

- Grep the full draft for `, not ` (case-insensitive) and resolve all 7 remaining hits — this is the single highest-frequency pattern in the piece and the reason the draft scores below threshold.
- Name the source for the 30-40% / 15-20% productivity stats or cut them. An unnamed "productivity research" reference is a Category 4 send-blocker.
- Identify the 5 mic-drop section closers and convert at least 3 into closing sentences that carry the section's argument forward instead of punctuating it.
- Replace "The" at the start of at least 4 paragraph openers with a concrete subject or a transitional phrase.
- Re-run the smell test before publishing.