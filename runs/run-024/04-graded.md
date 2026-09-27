I'm running the full AI Smell Test on the pasted blog draft. Starting with the mandatory Category 2 grep pass before scoring anything else.

The contrast-negation pass finds 15 hits including the headline. Let me compile the full report and save it.

<function_calls>
<invoke name="Write">
<parameter name="path">/Users/Chetan.Deshmukh/Documents/Claude Cowork Project/blog writing framework/blog-pipeline-stage4/blog-draft-ai-dna.smell-test.md</parameter>
<parameter name="content"># AI Smell Test — blog-draft-ai-dna (pasted)

**Date:** 2026-09-27
**Grade:** D   ·   **Word count:** ~1,750   ·   **Threshold:** B (default)
**Document type:** Client-facing deliverable

🚨 **DO NOT SHIP** — this draft reads as AI-generated.

---

## Scorecard

| Category | Score | Weight | Notes |
|---|---|---|---|
| Voice clichés, hollow affirmations & false authoritative framing | 8/10 | 20% | One "worth naming directly" instance; all classic clichés and buzzwords appear already removed |
| Contrast negation & em-dash overuse | 2/10 | 20% | 15 contrast-negation hits including the headline and opening paragraph; 10+ em-dashes across the piece |
| Triadic structures & parallel listing | 6/10 | 10% | Several three-item constructions; "The terms of service are different. The data handling is different. The contractual accountability is different." is a notable triadic parallel |
| Generic content & fake specifics | 4/10 | 25% | Two anonymous case studies with no quantified outcomes; three unsourced statistics (30–40%/15–20%, 60%, "hundreds per day"); [GAP] flags confirm the gaps |
| Structural tells | 7/10 | 15% | Three in-text [GAP] and [NOTE] editorial markers still present; otherwise clean hierarchy and structure |
| Synonym sprawl, repetition & rhetorical scaffolding | 5/10 | 10% | Aphoristic mic-drop closers in at least 4 sections; "That" as paragraph opener 4+ times; abstractions as active subjects 3+ times |

**Weighted score: 5.15 → D**

---

## Critical findings

- **Line 1 (headline):** "AI Doesn't Change Your Business DNA. It Amplifies It."
  - **Why it's a smell:** The headline is the two-sentence corrective template — "X doesn't Y. It Z." — which is the single most common AI-writing tell in the 26-draft audit. A reader lands here first.
  - **Suggested rewrite:** "AI Is How Fast Companies Get Better at What They're Already Good At" or lead with the specific anecdote claim and make the headline earn it rather than correcting a straw position.

- **Line 8:** "That company did not reinvent its customer service model. It moved faster on what it was already trying to do."
  - **Why it's a smell:** Two-sentence corrective template in the opening paragraph — the second CRITICAL contrast-negation hit in the first ten lines.
  - **Suggested rewrite:** "That company moved faster on what it was already trying to do — the AI just cleared the permission structure that was slowing it down."

- **Line 14:** "Organizations landing in the top quartile of AI implementation see productivity gains in the 30–40% range; those in the bottom quartile see losses of 15–20%."
  - **Why it's a smell:** Two round-number statistics with no source, no methodology, no baseline. These are the kind of figures AI generates to fill a credibility gap. If the source is real, cite it by name.
  - **Suggested rewrite:** Find the study. Name it — "[McKinsey 2024 / BCG / Gartner] found top-quartile AI adopters saw 30–40% productivity gains against a 15–20% productivity loss for bottom-quartile firms." Without the source this line should be cut.

- **Lines 26–28:** "Improving worked with an education company sitting on a massive library of videos, presentations, and classroom materials... [**GAP:** Measurable outcome — usage increase, time saved — was not captured in the SME interview. This requires follow-up before publication.]"
  - **Why it's a smell:** A case study with no named client, no industry specification, and no quantified outcome is the canonical generic-content tell. The [GAP] flag confirms the author knows this is incomplete. Do not publish until the outcome is captured.
  - **Suggested rewrite:** Get the number from the SME. "Usage of the content library increased [X]% within [Y] weeks of launch" or "Self-serve resolution rate rose from [baseline]% to [outcome]%" — whatever actually happened.

- **Lines 50, 52:** "Estimates suggest enterprises see hundreds of incidents per day..." / "roughly 60% currently do not [have an AI use policy]"
  - **Why it's a smell:** "Estimates suggest" is a hedge for a figure the writer cannot attribute; "roughly 60%" is a round number without a source. The [NOTE] flag on the 232 figure confirms the attribution gap. Both statistics need sourcing or removal before publication.
  - **Suggested rewrite:** Source them. "A 2025 Cyberhaven analysis tracked 232 AI data exposure incidents per day across enterprise users" (if that's the real source). The 60% figure needs the same treatment — name the survey, name the date.

---

## Major findings

**Category 2 — Contrast negation (body, outside opening paragraph):**

- **Line 14:** "The distinction sounds trivial. It is not."
  - **Why it's a smell:** Two-sentence corrective template used as a paragraph pivot — the setup/payoff structure is machine-rhythmic.
  - **Suggested rewrite:** Cut the first sentence. Start with the second and make it earn its place: "The distinction matters more than it sounds."

- **Line 14:** "The difference is almost never the technology. It is whether the AI initiative was anchored to a business problem that mattered."
  - **Why it's a smell:** Second contrast-negation instance in the same paragraph as the one above — two hits in four sentences.
  - **Suggested rewrite:** "The companies in the bottom quartile almost all chose their AI tool before they chose their problem."

- **Line 24:** "The strongest demonstrated ROI from AI right now is not automation. It is retrieval."
  - **Why it's a smell:** Two-sentence corrective template opening a section — announces the insight rather than demonstrating it.
  - **Suggested rewrite:** "The strongest demonstrated ROI from AI right now is retrieval: surfacing knowledge from content libraries that were previously unsearchable."

- **Line 30:** "Roofing is not an obvious AI use case. It becomes obvious the moment you frame it as: 'we have data we cannot process fast enough.'"
  - **Why it's a smell:** Two-sentence corrective template. The second sentence does all the work; the first only exists to set up a fake contrast.
  - **Suggested rewrite:** "Roofing becomes an obvious AI use case the moment you frame it as a data-processing problem — one that humans are too slow and too expensive to run at storm scale."

- **Line 40:** "That is not a hypothetical. It is the predictable outcome of connecting AI to a data estate that was never classified by sensitivity or access tier."
  - **Why it's a smell:** Two-sentence corrective template; the "not a hypothetical" setup is a hollow amplifier — the second sentence already does the work without it.
  - **Suggested rewrite:** "Connect AI to an unclassified data estate and sensitive records will surface in unexpected contexts. That outcome is predictable, not hypothetical."

- **Line 42:** "this is not an IT project. It is a prerequisite for any AI investment worth making."
  - **Why it's a smell:** Two-sentence corrective template embedded mid-paragraph.
  - **Suggested rewrite:** "This is a prerequisite for any AI investment worth making."

- **Line 44:** "Treat data governance as a precondition, not a follow-up cleanup project."
  - **Why it's a smell:** Bare mid-sentence tail — ", not a follow-up cleanup project" is a throwaway qualifier appended to a statement that stands on its own.
  - **Suggested rewrite:** "Treat data governance as the first build, not the last one."

- **Line 50:** "That is the business model, not a bug."
  - **Why it's a smell:** Bare mid-sentence tail — ", not a bug" is the exact reflexive qualifier the 2026-09-04 audit flagged as the most common variant in real drafts.
  - **Suggested rewrite:** "That is the business model." Full stop.

- **Line 52:** "That is a liability, not a gap you can close after an incident."
  - **Why it's a smell:** Bare mid-sentence tail — ", not a gap" adds nothing the preceding clause hasn't already established.
  - **Suggested rewrite:** "That is a liability you cannot retrofit your way out of after the first incident."

- **Line 56:** "Employees read mandatory usage metrics as performance monitoring, not capability investment."
  - **Why it's a smell:** Bare tail — ", not capability investment" is a throwaway contrast appended to a claim that already lands without it.
  - **Suggested rewrite:** "Employees read mandatory usage metrics as surveillance."

- **Line 58:** "Adoption follows because the value is visible, not because it is required."
  - **Why it's a smell:** Causal negation form — "not because X, but because Y" (abbreviated here as "visible, not because it is required") — the same corrective structure as the two-sentence template, just compressed.
  - **Suggested rewrite:** "Adoption follows because the value is visible." Cut the causal hedge.

- **Line 80:** "Protecting customer service processes that frustrate customers because 'that is how we have always done it' is not preservation. It is stagnation."
  - **Why it's a smell:** Two-sentence corrective template in the second-to-last section, near closing.
  - **Suggested rewrite:** "Protecting customer service processes that frustrate customers is stagnation, regardless of how long they've been in place."

- **Line 82:** "The thesis is not 'move slow.' It is 'move with intention.'"
  - **Why it's a smell:** Two-sentence corrective template in the closing section, restating the article's central argument in exactly the format most flagged as AI-generated.
  - **Suggested rewrite:** "The thesis is move with intention — and intention means starting with a problem, not a demo."

**Category 1 — False authoritative framing:**

- **Line 34:** "One constraint worth naming directly:"
  - **Why it's a smell:** "Worth naming directly" announces candor rather than demonstrating it — the client-facing version of "worth being direct that." A human just names the constraint.
  - **Suggested rewrite:** "One constraint: AI retrieval systems still generate incorrect outputs."

**Category 5 — Structural tells:**

- **Lines 28, 52, 74:** In-text [GAP] and [NOTE] editorial markers are still present in the draft body. These must be resolved or removed before this piece leaves the building. The [GAP] on the education case study is a send-blocker independently (see Critical findings, above).

**Category 6 — Rhetorical scaffolding:**

- **Aphoristic section closers (4+ instances):** "The behavior you get is compliance theater" (line 62), "The only wrong move is treating your current level as permanent" (line 76), "Start with that question. The technology will not be hard to find." (line 86), and "Remove that reviewer and you are trusting a system that will, eventually, get something wrong" (line 34). Each of these works in isolation; recurring after nearly every section is a tell.
  - **Suggested action:** Keep one. Cut or restructure the rest so section endings vary — some should just stop where the argument stops.

- **"That" as paragraph opener (4 instances):** "That is what AI-enabled customer service looks like...", "That company did not reinvent...", "That asymmetry — humans get bored...", "That is not a hypothetical..." — all paragraph openers.
  - **Suggested action:** Vary the opener. Start with the subject of the claim, not a demonstrative pronoun pointing back at the previous sentence.

- **Abstractions as active subjects (3 instances):** "The productivity math does not work in your favor" (line 20), "The error risk does not disappear" (line 34), "the political cost of the initiative rises faster than the technical remediation" (line 44). The author is hiding behind the abstraction instead of just making the claim.
  - **Suggested rewrite examples:** "The math doesn't favor you here" → "You will not recover this investment if the problem wasn't real." "The error risk does not disappear" → "The system will still get things wrong."

---

## Minor findings

- Line 48: "The terms of service are different. The data handling is different. The contractual accountability is different." — Triadic parallel structure (three sentences, same grammatical form, same ending word "different"). Works rhetorically but reads as generated when paired with the other triadic instances in this piece.
- Line 6: "trusted with something real, connected to systems that matter, given permission to resolve problems rather than route them" — three parallel participial phrases. Low severity in isolation.
- Line 20: "a clear picture of the capabilities that differentiate you, specific workflows where those capabilities are constrained by human time or attention, and a willingness to measure AI's impact" — three-item parallel list, expected in business prose but contributes to the triadic count.
- Em-dash count: approximately 10–11 across the full piece. The three em-dashes in the Level definitions (Level 1 —, Level 2 —, Level 3 —) are stylistic and defensible, but the prose em-dashes in the Consumer AI and Mandates sections push the count above the 3-per-page threshold in those sections.

---

## The one paragraph to rewrite first

**Before:**

> The distinction sounds trivial. It is not. Organizations landing in the top quartile of AI implementation see productivity gains in the 30–40% range; those in the bottom quartile see losses of 15–20%. The difference is almost never the technology. It is whether the AI initiative was anchored to a business problem that mattered.

This paragraph has three separate smells: two contrast-negation hits and two unsourced statistics.

**After:**

> The distinction matters more than it sounds. [Source] found top-quartile AI adopters saw 30–40% productivity gains; bottom-quartile firms saw 15–20% losses. The companies in the top group almost all chose their problem before they chose their tool. The companies at the bottom did it the other way around.

---

## What to do next

- **Get the two missing numbers first, before any prose edits.** The education case study outcome and the source for both statistics (the productivity quartile figures and the 60% AI policy gap) are the only things that take this draft from D to C territory on Category 4 alone. Without them, the rest of the edits are cosmetic.
- **Grep the full draft for `isn't|wasn't|doesn't|not a |not the |it's not|that's not|rather than|, not |not because` and fix every hit.** This report found 15 contrast-negation instances. Work through all of them, not just the ones quoted here, before considering the pattern resolved.
- **Rewrite the headline.** The title is the most visible contrast-negation hit in the document. A reader who recognizes the "X doesn't Y. It Z." template stops there.
- **Cut or vary three of the four aphoristic section closers.** Pick one to keep. Let the other sections end on the argument rather than a pull-quote.
- **Remove or resolve all three [GAP] and [NOTE] markers before sharing externally.** At minimum, the education case study must have a quantified outcome before publication.
- Re-run the smell test before shipping.
</parameter>
</invoke>
</function_calls>
<parameter name="result">File written successfully</parameter>
</invoke>
</function_calls>

Report saved to `blog-draft-ai-dna.smell-test.md`. Here is the summary:

---

**Grade: D. DO NOT SHIP.**

The draft shows evidence of a genuine editing pass -- classic buzzwords are gone, hollow affirmations are gone, the banned-word list was worked through. But the contrast-negation pattern survived entirely untouched and saturates the piece at 15 hits, including the headline itself.

**The three things driving the D:**

**Category 2 (score: 2/10)** is the primary problem. "AI Doesn't Change Your Business DNA. It Amplifies It." is the two-sentence corrective template as the title. The opening paragraph closes with another: "That company did not reinvent its customer service model. It moved faster on what it was already trying to do." From there, the pattern repeats 13 more times in every section -- the bare ", not Y" tail, the causal "not because," and the full "X is not Y. It is Z." template. The anti-AI editing pass appears to have addressed vocabulary but not structure.

**Category 4 (score: 4/10)** carries the heaviest weight at 25%. The 30--40%/15--20% productivity quartile statistics have no source. The education case study has no named client and no outcome (the [GAP] flag confirms this is known). The 60% AI policy gap figure has no source. The "three years into AI initiatives" closing claim is dressed as a fact with no referent.

**Category 6 (score: 5/10)** has three patterns each clearing the 3-instance threshold: aphoristic mic-drop section closers (at least 4), "That" as a paragraph opener (4 times), and abstractions as active subjects in place of direct claims (3 times).

**What to fix first:** Get the education case study outcome from the SME and source both statistics. That single step lifts Category 4 from 4/10 to something shippable. Then run the contrast-negation grep and work through all 15 hits. Everything else in the report is secondary to those two actions.