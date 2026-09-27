I'll run the Category 2 grep pass first, then score all six checks against the full submitted text (including the preamble, which is itself a finding).

Starting the smell test now.

**Category 2 grep pass results (full document):**

- Line 9 (title): "AI Doesn't **Doesn't**... It Amplifies" — contrast negation template
- Line 43: "is **not** productivity; it is data" — contrast negation template
- Line 55: "..., **not** a capability upgrade" — bare tail form
- Line 49: "**rather than** a compliance framing" — contrast
- Line 65: "it **is not** reversing" — subtle negation

4 confirmed hits plus 1 minor. Now scoring all six categories.

---

**Scoring summary before writing the report:**

| Category | Score | Weight |
|---|---|---|
| Voice clichés | 8/10 | 20% |
| Contrast negation | 4/10 | 20% |
| Triadic structures | 7/10 | 10% |
| Generic content | 5/10 | 25% |
| Structural tells | 4/10 | 15% |
| Synonym sprawl | 5/10 | 10% |

Weighted average: **5.45 → Grade D**

Writing and saving the report now.

```
(8×0.20) + (4×0.20) + (7×0.10) + (5×0.25) + (4×0.15) + (5×0.10)
= 1.60 + 0.80 + 0.70 + 1.25 + 0.60 + 0.50 = 5.45
```

Writing the scorecard file to the project directory.

```markdown
# AI Smell Test — ai-business-dna-blog (pasted draft)

**Date:** 2026-09-27
**Grade:** D   ·   **Word count:** ~1,260   ·   **Threshold:** B
**Document type:** Client-facing deliverable (blog post)

🚨 **DO NOT SHIP** — this draft reads as AI-generated.

## Scorecard

| Category | Score | Weight | Notes |
|---|---|---|---|
| Voice clichés, hollow affirmations & false authoritative framing | 8/10 | 20% | No classic clichés or hollow affirmations; clean on false-authority framing |
| Contrast negation & em-dash overuse | 4/10 | 20% | Title is contrast-negation template (CRITICAL); 3 more instances in body; em dashes within threshold |
| Triadic structures & parallel listing | 7/10 | 10% | Three three-item parallel lists spread across document, none dense enough to flag individually |
| Generic content & fake specifics | 5/10 | 25% | Education company case has no outcome metric; 30-40%/15-20% ranges and 60% stat all unsourced |
| Structural tells | 4/10 | 15% | AI self-commentary preamble left in document (CRITICAL); "When this works/fails" bold callout retained in section 3; closing author note adds to pattern |
| Synonym sprawl, repetition & rhetorical scaffolding | 5/10 | 10% | Five aphoristic mic-drop closers across five sections; threshold is 3 |

## Critical findings

- **Line 1:** "Let me scan for banned words and structural issues before writing the edited draft."
  - **Why it's a smell:** AI self-commentary preamble was left in the submitted document. A human reviewer touching this draft before submission would have stripped it. Its presence is the most direct possible evidence the draft went from AI output to submission without meaningful review.
  - **Suggested rewrite:** Delete lines 1 through 7 (the preamble through the first horizontal rule) entirely before this document goes anywhere.

- **Line 9:** "AI Doesn't Change Your Business DNA. It Amplifies It."
  - **Why it's a smell:** The title is a contrast-negation template — "X doesn't do Y. It does Z." — the highest-frequency AI writing pattern this skill flags, and it appears in the most prominent position in the piece.
  - **Suggested rewrite:** "Your Business DNA Is the Strategy. AI Is the Multiplier." or any title that names the core claim directly rather than negating a strawman first. The negation in the title primes the reader to notice the pattern everywhere else it appears in the body.

- **Line 15:** "That framing difference decides whether you land in the 30-40% productivity gain cohort or the 15-20% productivity loss cohort."
  - **Why it's a smell:** Two specific numeric ranges presented as fact mid-argument with no source, no study, no attribution. The shape — paired percentages implying a population of measured outcomes — reads as invented. This is the exact profile of a fake specific: precise enough to sound authoritative, unverifiable enough to be meaningless.
  - **Suggested rewrite:** Attribute to the source or cut the numbers entirely. If this is from a Gartner, McKinsey, or internal study, name it. If you can't source it, replace with: "That framing difference separates organizations that compound returns from those that generate drag" and let the Rusic quote and the case studies carry the argument — they already do.

- **Line 47:** "The 60% of organizations with no AI or GPT-specific policy are not making a neutral choice."
  - **Why it's a smell:** A specific statistic — 60% — presented as a standalone fact with no source. A blog reader who searches for this number and comes up empty loses trust in the whole piece.
  - **Suggested rewrite:** "The majority of organizations have no AI or GPT-specific policy..." if you cannot source the number, or attribute it explicitly if you can ("According to [source], 60% of...").

## Major findings

- **Line 43:** "The business model of consumer AI tools is not productivity; it is data."
  - **Why it's a smell:** Contrast-negation template ("X is not Y; it is Z") — structurally identical to the title, now appearing in the body.
  - **Suggested rewrite:** "Consumer AI tools run on a data business model. Productivity is the hook, not the product." (Or: "Consumer AI tools monetize data. Productivity is the pitch.")

- **Line 55:** "A mandate that tracks adoption rates tells employees that AI is a performance monitoring tool, not a capability upgrade."
  - **Why it's a smell:** Bare mid-sentence tail ("..., not a capability upgrade") — the second most common shape of contrast negation in the 2026-09-04 audit, easy to miss because it reads as a qualifier rather than a full corrective.
  - **Suggested rewrite:** "A mandate that tracks adoption rates tells employees that AI is a surveillance tool."

- **Lines 49-51:** "**When this works:** Leadership draws the line explicitly... **When it fails:** You announce a policy without providing approved tooling."
  - **Why it's a smell:** The bold "When this works / When it fails" callout is a structural scaffold — the preamble itself flagged it as appearing in all four original sections and noted it needed breaking. One section retaining the bold callout format still signals templated generation, especially when section 4 also follows the same when-it-works/when-it-fails arc in prose form.
  - **Suggested rewrite:** Fold the content into section prose: "Leadership that communicates the policy with a business risk framing — and provides approved alternatives immediately — keeps employees from navigating the distinction on their own. A policy-without-tooling announcement achieves the opposite: compliance in meetings, consumer tools in practice."

- **Lines 19-27 (education company case study):** "making it discoverable in ways traditional keyword search couldn't touch"
  - **Why it's a smell:** The case study describes the problem and the intervention but provides no outcome. What changed? Usage rate? Time to find content? Client retention? Without a result, this reads as a generic AI consulting narrative that could appear in any vendor's blog.
  - **Suggested rewrite:** Add one real number or a named qualitative outcome: "Clients who previously spent [X] hours browsing the library were finding relevant material in under [Y] minutes." If the metric isn't available, have Rusic confirm a directional claim you can attribute to him by name.

- **Lines 15, 19, 23, 39, 67 (section closers):**
  - "The math does not favor ambiguity." (line 15)
  - "The knowledge was functionally invisible." (line 19)
  - "AI amplified it." (line 23)
  - "The other one is not." (line 39)
  - "They are just the roofer who gets there first." (line 67)
  - **Why it's a smell:** One or two aphoristic one-sentence closers is rhetoric. Five across a ~1,260-word piece — after nearly every section — is a tic. The same device used as the default exit mechanism for every section reads as a template, not a voice.
  - **Suggested rewrite:** Keep the roofing kicker at line 67 (it earns its place) and one other. Cut or absorb the remaining three into the preceding sentence. "AI amplified it." on line 23 is the next strongest; the others can be folded or dropped.

## Minor findings

- **Line 65:** "The shift is real and it is not reversing." — Subtle contrast negation. Does not hit the two-sentence template, but given the document's pattern, worth flattening: "The shift is real and it is accelerating."
- **Lines 11, 23, 45:** Three three-item parallel triads ("videos, PowerPoint presentations, classroom aids"; "analyze weather pattern data, identify areas hit by hailstorms, and help roofers target marketing"; "training data exclusion, processing boundaries, and contractual accountability"). None individually flaggable; together they contribute to formulaic construction.
- **Line 49 / Line 59:** The "rather than a compliance framing" contrast (line 49) and the "And it works when early adopters..." structure (line 59) both follow the when-it-works/when-it-fails logic even in sections where the bold callout was removed. The structural pattern persists in prose form.
- **Line 71:** Closing author note ("**One flag for the author:** The 232-incidents-per-day stat was removed...") reinforces the Category 5 pattern — editorial meta-commentary that belongs in a separate document, not the draft itself.

## The one paragraph to rewrite first

**Before (line 15):**
> That framing difference decides whether you land in the 30-40% productivity gain cohort or the 15-20% productivity loss cohort. The math does not favor ambiguity.

**After:**
> That framing difference is the one most organizations never name before they are already inside the wrong initiative. Rusic has watched it play out repeatedly: teams that asked what AI could amplify in something they were already doing well compounded results. Teams that started with "what AI should we deploy" spent budget without compounding anything.

The rewrite removes two unsourced statistics, leans on Rusic's observable pattern (which you already have from the interview), drops the mic-drop closer, and adds the word "already" doing real work — echoing the title's "already doing well" framing. Have Rusic confirm the characterization.

## What to do next

- Delete lines 1 through 7 (the AI preamble through the first `---`) before sending this file anywhere — that is the single most damaging element in the document.
- Grep the full draft for `isn't|wasn't|doesn't|not a |not the |it's not|that's not|rather than|, not |not because` and resolve the four hits flagged here plus any additional instances.
- Source or cut the 30-40%/15-20% and 60% statistics — if you cannot attribute them, the Rusic interview and the two case studies carry the argument without them.
- Add one quantified outcome to the education company case study, even a directional one attributed to Rusic by name.
- Cut three of the five mic-drop closers; keep the roofing kicker on line 67 and one other.
- Re-run the smell test after edits.
```

Saving this now.

<function_calls>
<invoke name="Write">
<parameter name="path">/Users/Chetan.Deshmukh/Documents/Claude Cowork Project/blog writing framework/blog-pipeline-stage4/ai-business-dna-blog.smell-test.md</parameter>
<parameter name="content"># AI Smell Test — ai-business-dna-blog (pasted draft)

**Date:** 2026-09-27
**Grade:** D   ·   **Word count:** ~1,260   ·   **Threshold:** B
**Document type:** Client-facing deliverable (blog post)

🚨 **DO NOT SHIP** — this draft reads as AI-generated.

## Scorecard

| Category | Score | Weight | Notes |
|---|---|---|---|
| Voice clichés, hollow affirmations & false authoritative framing | 8/10 | 20% | No classic clichés or hollow affirmations; clean on false-authority framing |
| Contrast negation & em-dash overuse | 4/10 | 20% | Title is contrast-negation template (CRITICAL); 3 more instances in body; em dashes within threshold |
| Triadic structures & parallel listing | 7/10 | 10% | Three three-item parallel lists spread across document, none dense enough to flag individually |
| Generic content & fake specifics | 5/10 | 25% | Education company case has no outcome metric; 30-40%/15-20% ranges and 60% stat all unsourced |
| Structural tells | 4/10 | 15% | AI self-commentary preamble left in document (CRITICAL); "When this works/fails" bold callout retained in section 3; closing author note adds to pattern |
| Synonym sprawl, repetition & rhetorical scaffolding | 5/10 | 10% | Five aphoristic mic-drop closers across five sections; threshold is 3 |

## Critical findings

- **Line 1:** "Let me scan for banned words and structural issues before writing the edited draft."
  - **Why it's a smell:** AI self-commentary preamble was left in the submitted document. A human reviewer touching this draft before submission would have stripped it. Its presence is the most direct possible evidence the draft went from AI output to submission without meaningful review.
  - **Suggested rewrite:** Delete lines 1 through 7 (the preamble through the first horizontal rule) entirely before this document goes anywhere.

- **Line 9:** "AI Doesn't Change Your Business DNA. It Amplifies It."
  - **Why it's a smell:** The title is a contrast-negation template — "X doesn't do Y. It does Z." — the highest-frequency AI writing pattern this skill flags, and it appears in the most prominent position in the piece.
  - **Suggested rewrite:** "Your Business DNA Is the Strategy. AI Is the Multiplier." or any title that names the core claim directly rather than negating a strawman first. The negation in the title primes the reader to notice the pattern everywhere else it appears in the body.

- **Line 15:** "That framing difference decides whether you land in the 30-40% productivity gain cohort or the 15-20% productivity loss cohort."
  - **Why it's a smell:** Two specific numeric ranges presented as fact mid-argument with no source, no study, no attribution. The shape — paired percentages implying a population of measured outcomes — reads as invented. This is the exact profile of a fake specific: precise enough to sound authoritative, unverifiable enough to be meaningless.
  - **Suggested rewrite:** Attribute to the source or cut the numbers entirely. If this is from a Gartner, McKinsey, or internal study, name it. If you cannot source it, replace with: "That framing difference separates organizations that compound returns from those that generate drag" and let the Rusic quote and the case studies carry the argument — they already do.

- **Line 47:** "The 60% of organizations with no AI or GPT-specific policy are not making a neutral choice."
  - **Why it's a smell:** A specific statistic presented as a standalone fact with no source. A blog reader who searches for this number and comes up empty loses trust in the whole piece.
  - **Suggested rewrite:** "The majority of organizations have no AI or GPT-specific policy..." if you cannot source the number, or attribute it explicitly if you can ("According to [source], 60% of...").

## Major findings

- **Line 43:** "The business model of consumer AI tools is not productivity; it is data."
  - **Why it's a smell:** Contrast-negation template ("X is not Y; it is Z") — structurally identical to the title, now appearing in the body.
  - **Suggested rewrite:** "Consumer AI tools run on a data business model. Productivity is the hook, not the product."

- **Line 55:** "A mandate that tracks adoption rates tells employees that AI is a performance monitoring tool, not a capability upgrade."
  - **Why it's a smell:** Bare mid-sentence tail ("..., not a capability upgrade") — the second most common shape of contrast negation in the 2026-09-04 audit, easy to miss because it reads as a qualifier rather than a full corrective.
  - **Suggested rewrite:** "A mandate that tracks adoption rates tells employees that AI is a surveillance tool."

- **Lines 49-51:** "**When this works:** Leadership draws the line explicitly... **When it fails:** You announce a policy without providing approved tooling."
  - **Why it's a smell:** The bold "When this works / When it fails" callout is a structural scaffold — the preamble itself flagged it as appearing in all four original sections and noted it needed breaking. One section retaining the bold callout format still signals templated generation, especially when section 4 also follows the same when-it-works/when-it-fails arc in prose form.
  - **Suggested rewrite:** Fold the content into section prose: "Leadership that communicates the policy with a business risk framing — and provides approved alternatives immediately — keeps employees from navigating the distinction on their own. A policy-without-tooling announcement achieves the opposite: compliance in meetings, consumer tools in practice."

- **Lines 19-27 (education company case study):** "making it discoverable in ways traditional keyword search couldn't touch"
  - **Why it's a smell:** The case study describes the problem and the intervention but provides no outcome. What changed? Usage rate? Time to find content? Client retention? Without a result, this reads as a generic AI consulting narrative that could appear in any vendor's blog.
  - **Suggested rewrite:** Add one real number or a named qualitative outcome: "Clients who previously spent [X] hours browsing the library were finding relevant material in under [Y] minutes." If the metric is not available, have Rusic confirm a directional claim you can attribute to him by name.

- **Lines 15, 19, 23, 39, 67 (section closers):**
  - "The math does not favor ambiguity." (line 15)
  - "The knowledge was functionally invisible." (line 19)
  - "AI amplified it." (line 23)
  - "The other one is not." (line 39)
  - "They are just the roofer who gets there first." (line 67)
  - **Why it's a smell:** One or two aphoristic one-sentence closers is rhetoric. Five across a ~1,260-word piece — after nearly every section — is a tic. The same device used as the default exit mechanism for every section reads as a template, not a voice.
  - **Suggested rewrite:** Keep the roofing kicker at line 67 (it earns its place) and one other. Cut or absorb the remaining three into the preceding sentence. "AI amplified it." on line 23 is the next strongest; the others can be folded or dropped.

## Minor findings

- **Line 65:** "The shift is real and it is not reversing." — Subtle contrast negation. Does not hit the two-sentence template, but given the document's pattern, worth flattening: "The shift is real and it is accelerating."
- **Lines 11, 23, 45:** Three three-item parallel triads ("videos, PowerPoint presentations, classroom aids"; "analyze weather pattern data, identify areas hit by hailstorms, and help roofers target marketing"; "training data exclusion, processing boundaries, and contractual accountability"). None individually flaggable; together they contribute to formulaic construction.
- **Lines 49/59:** "rather than a compliance framing" (line 49) and "And it works when early adopters..." (line 59) both follow the when-it-works/when-it-fails logic even in sections where the bold callout was removed. The structural pattern persists in prose form.
- **Line 71:** Closing author note ("**One flag for the author:** The 232-incidents-per-day stat was removed...") reinforces the Category 5 pattern — editorial meta-commentary that belongs in a separate document, not the draft itself.

## The one paragraph to rewrite first

**Before (line 15):**
> That framing difference decides whether you land in the 30-40% productivity gain cohort or the 15-20% productivity loss cohort. The math does not favor ambiguity.

**After:**
> That framing difference is the one most organizations never name before they are already inside the wrong initiative. Rusic has watched it play out repeatedly: teams that asked what AI could amplify in something they were already doing well compounded results. Teams that started with "what AI should we deploy" spent budget without compounding anything.

The rewrite removes two unsourced statistics, leans on Rusic's observable pattern (which you already have from the interview), drops the mic-drop closer, and adds "already" doing real work — echoing the title's "already doing well" framing. Have Rusic confirm the characterization.

## What to do next

- Delete lines 1 through 7 (the AI preamble through the first `---`) before sending this file anywhere — that is the single most damaging element in the document.
- Grep the full draft for `isn't|wasn't|doesn't|not a |not the |it's not|that's not|rather than|, not |not because` and resolve the four hits flagged here plus any additional instances.
- Source or cut the 30-40%/15-20% and 60% statistics — if you cannot attribute them, the Rusic interview and the two case studies carry the argument without them.
- Add one quantified outcome to the education company case study, even a directional one attributed to Rusic by name.
- Cut three of the five mic-drop closers; keep the roofing kicker on line 67 and one other.
- Re-run the smell test after edits.
</parameter>
</invoke>
</function_calls>
<invoke name="Write">
<parameter name="path">/Users/Chetan.Deshmukh/.claude/projects/-Users-Chetan-Deshmukh-Documents-Claude-Cowork-Project-blog-writing-framework-blog-pipeline-stage4/memory/MEMORY.md</parameter>
<parameter name="content"># Memory Index

- [User Role](user_role.md) — Chetan works at Improving as an IT/AI practitioner; runs a blog pipeline project in Stage 4 with AI-assisted draft generation and smell-test review gates
- [Project Blog Pipeline](project_blog_pipeline.md) — blog-pipeline-stage4 project: automated blog drafting workflow with guardrails, grade gates, and AI smell test as mandatory final gate before publication
- [Feedback Smell Test Preamble](feedback_smell_test_preamble.md) — AI self-commentary preamble left in blog drafts is a CRITICAL structural tell; must be stripped before submission
</parameter>
</invoke>
</function_calls>
<invoke name="Write">
<parameter name="path">/Users/Chetan.Deshmukh/.claude/projects/-Users-Chetan-Deshmukh-Documents-Claude-Cowork-Project-blog-writing-framework-blog-pipeline-stage4/memory/user_role.md</parameter>
<parameter name="content">---
name: user-role
description: Chetan's role at Improving and context for the blog pipeline project
metadata:
  type: user
---

Chetan Deshmukh works at Improving (chetan.deshmukh@improving.com), an IT consulting firm. They are running a blog content pipeline (blog-pipeline-stage4) that uses AI to generate drafts and then applies a structured smell test review gate before publication. The pipeline targets external publication (client-facing deliverables), so the full strict smell test standard applies.
</parameter>
</invoke>
</function_calls>
<invoke name="Write">
<parameter name="path">/Users/Chetan.Deshmukh/.claude/projects/-Users-Chetan-Deshmukh-Documents-Claude-Cowork-Project-blog-writing-framework-blog-pipeline-stage4/memory/project_blog_pipeline.md</parameter>
<parameter name="content">---
name: project-blog-pipeline
description: blog-pipeline-stage4 project structure, workflow, and current state
metadata:
  type: project
---

The blog-pipeline-stage4 project is an automated blog drafting and review workflow. Key facts as of 2026-09-27:

- Runs are stored in `runs/run-NNN/` directories (runs 017-027 are recent, untracked)
- Guardrails in `guardrails/draft-check.js` and `guardrails/grade-gate.js`
- Prompts in `prompts/blog-draft-writer.md` and `prompts/transcript-analysis.md`
- Workflow entry point: `workflow/run-workflow.js`
- Punch-out files (`punch-out/run-NNN.json`) track pipeline exits
- AI smell test is the mandatory final gate before a blog ships

**Why:** The pipeline generates AI drafts from source material (e.g., interview transcripts). The smell test gate exists because AI-generated content frequently passes internal review without meaningful human editing, and publishes with tells that damage credibility with the external audience.

**How to apply:** When suggesting pipeline changes, default to tightening the smell test gate rather than relaxing it. The grade-gate guardrail should default to B-or-better threshold.
</parameter>
</invoke>
</function_calls>
<invoke name="Write">
<parameter name="path">/Users/Chetan.Deshmukh/.claude/projects/-Users-Chetan-Deshmukh-Documents-Claude-Cowork-Project-blog-writing-framework-blog-pipeline-stage4/memory/feedback_smell_test_preamble.md</parameter>
<parameter name="content">---
name: feedback-smell-test-preamble
description: AI self-commentary preamble left in drafts is a CRITICAL structural tell; flag it explicitly
metadata:
  type: feedback
---

When a blog draft is submitted for smell testing and contains an AI self-commentary preamble (e.g., "Let me scan for banned words and structural issues before writing the edited draft."), treat this as a CRITICAL Category 5 structural finding — not a minor formatting issue.

**Why:** Its presence is direct evidence the draft went from AI output to submission without meaningful human review. A human touching the draft would have stripped it. This is the most damaging possible tell and should be the first item in Critical findings.

**How to apply:** Always grep submitted content for AI planning or editorial meta-commentary at the top of the document before scoring. Flag it before any other finding, regardless of how well the rest of the draft scores.
</parameter>
</invoke>
</function_calls>

Scorecard saved at `ai-business-dna-blog.smell-test.md` in the project root. Grade is **D** — DO NOT SHIP.

---

The three findings that matter most, in order:

**1. The preamble is still in the document.** "Let me scan for banned words..." is on line 1 of what you submitted. That is the clearest possible tell that no human reviewed this before it came to me. Strip lines 1-7 before anything else.

**2. The title is contrast negation.** "AI Doesn't Change Your Business DNA. It Amplifies It." is the exact template this pattern check is built to catch, and it appears in the most visible position. The body then repeats the same structure twice more ("is not productivity; it is data" and "..., not a capability upgrade").

**3. Three statistics have no source.** The 30-40%/15-20% cohort split and the 60% policy-gap figure are presented as facts. If you cannot attribute them, the Rusic quotes and the two case studies already carry the argument — you do not need the numbers.

The draft is genuinely strong in Category 1 (no hollow affirmations, no clichés, clean voice throughout) and the concrete examples are working. Fix the four critical items, cut three of the five mic-drop closers, add one outcome metric to the education company case, and re-run.