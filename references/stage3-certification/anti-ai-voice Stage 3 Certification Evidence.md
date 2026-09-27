---
candidate: Chetan Deshmukh chetan.deshmukh@improving.com
skill_name: anti-ai-voice
skill_path: /var/folders/6q/lb549n914bld35d_7vds3zhm0000gp/T/claude-hostloop-plugins/836ca2f073db2bac/defa63e7-a35c-42c1-9025-18b40b7ade11/skills/anti-ai-voice/SKILL.md
project_path: /Users/Chetan.Deshmukh/Documents/Claude Cowork Project/blog writing framework/
rubric_version: "embedded-2026-08-30"
generated: 2026-09-25
observation_window: 2026-09-21 to 2026-09-25
mode: harvest-only
evidence_status:
  criterion_1_real_recurring_task: PARTIAL
  criterion_2_documented_eval_criteria: PARTIAL
  criterion_3_before_after_evidence: PARTIAL
  criterion_4_error_catching: FOUND
  criterion_5_reusable_artifact: PARTIAL
  criterion_6_health_gauge: SUPPORTING_EVIDENCE_ONLY
  criterion_7_independent_standard: SUPPORTING_EVIDENCE_ONLY
ready_for_human_review: false
---

# Stage 3 Certification Evidence — anti-ai-voice

## 1. Real, recurring task — PARTIAL

The skill's declared purpose is explicit and job-specific:

> "Use this skill whenever writing, editing, or refining blog articles, thought leadership content, or any long-form written content for Improving.com. This skill strips AI-sounding language, enforces banned word/phrase removal, and rewrites content so it reads like a sharp senior practitioner wrote it."
> — `SKILL.md` frontmatter, modified 2026-09-21

One documented application is observable in the Project:
- **2026-09-25** — applied to Kevin Jordane's "Agentic AI: From Demo to Durable Advantage" (`kevin-jordane-agentic-ai-antiaivoice-changelog.md`)

The candidate's KB memory notes active blog workstreams across multiple authors (Devlin Liles series — 5 drafts; Claudio Lassala series — 5 drafts; Joshua Holtz draft) where this skill is the designated editorial pass, but **no dated log of prior anti-ai-voice invocations exists in the Project folder**. A session-history search tool was not available in this environment to check across separate weeks.

**What's missing for FOUND:** a dated usage log showing invocations across at least three separate weeks, or reviewer confirmation in conversation.

---

## 2. Documented evaluation criteria — PARTIAL

The skill has two explicit, checkable criterion sources:

**`SKILL.md` — 6-step process with specific pass/fail checks:**
1. Banned word sweep against `references/banned-words.md` — ~50 specific terms (e.g., "leverage," "seamless," "Moreover," "Additionally")
2. Banned opener patterns — 5 named openers ("In today's…", "As organizations increasingly…", etc.)
3. Banned rhetorical structures — 8 named patterns ("Most people… the few who…", "Stop X. Start Y.", "Here's the thing…", etc.)
4. Banned transition fillers — 12 named fillers ("Moreover," "Furthermore," "That said," etc.)
5. Banned summary/wrap patterns — 5 named templates ("By [doing X], organizations can [achieve Y]", etc.)
6. Anti-symmetry, no decorative lists, no rule-of-three padding

**`references/banned-words.md`** — 50+ specific banned adjectives, nouns, verbs, and full phrases. Each is checkable: either the word appears or it doesn't.

These criteria are specific and checkable — they name the exact condition of failure. They are not vibes.

**What's missing for FOUND:** no `evals.json` with formal test case descriptions. The criteria live in the skill's instructions, not in a structured eval file. Fewer than 3 criteria are documented in the standard eval format (count: 0 in evals.json — file does not exist).

---

## 3. Quantified before/after evidence — PARTIAL

Real quantified output comparison exists, cited to two files in the Project:

**Source 1:** `kevin-jordane-agentic-ai-antiaivoice-changelog.md` (2026-09-25)
Documents 7 specific before/after edits with exact quoted text, e.g.:
- Before: "The failure patterns are not random. They are predictable" → After: "The failure patterns are predictable." (contrast negation removed)
- Before: "The two employees did not lose their jobs. They became managers" → After: "Both employees became managers" (negation opener removed)

**Source 2:** `kevin-jordane-agentic-ai-v2.smell-test.md` (2026-09-25)
| Metric | v1 (before pass) | v2 (after pass) | Delta |
|---|---|---|---|
| Weighted smell-test score | 7.78/10 | 8.40/10 | +0.62 (+8.0%) |
| Category 2 (contrast negation) | 7/10 | 8.5/10 | +1.5 |
| Grep hits (contrast negation) | 4 | 3 | −1 |
| Real contrast-negation tells | 2 | 1 | −1 |
| Em dashes | 0 | 0 | 0 |

The deliberate change is named: application of the anti-ai-voice skill pass (contrast negation sweep, banned pattern removal, sentence tightening). Same article used before and after.

**What's missing for FOUND:** this is an output-quality comparison (article before/after the skill was applied), not a skill-creator test-and-improve cycle (the same test examples run against two versions of the skill itself). The skill was not modified between the before and after. A formal skill-creator loop — fixed test inputs, run against the skill, then run again after a skill improvement — does not yet exist.

**Note for reviewer:** the candidate has real quantified evidence of the skill doing measurable work on a real article. Whether an editorial before/after satisfies this criterion in lieu of a skill-creator eval loop is a judgment call for the reviewer.

---

## 4. Error-catching discipline — FOUND

The v2 smell test caught a regression introduced by the anti-ai-voice pass itself.

Verbatim from `kevin-jordane-agentic-ai-v2.smell-test.md`, Major findings:

> "Line 43: 'Blanket approval of every agent action is overhead, not oversight.'
> Why it's a smell: Bare mid-sentence tail '..., not Y' — introduced during the anti-ai-voice pass itself when replacing 'That is not the same as approving every agent action.' Traded one contrast negation for another."

**Specificity test result: PASSES.** A reviewer can open the article at Line 43 and verify the exact pattern. The failure is named ("bare tail contrast negation"), the mechanism is named ("introduced by the pass itself"), and the source sentence is quoted exactly. This is not "it wasn't quite right."

---

## 5. Reusable artifact — PARTIAL

**In the Project folder** (`/Users/Chetan.Deshmukh/Documents/Claude Cowork Project/blog writing framework/`):
- `kevin-jordane-agentic-ai-antiaivoice-changelog.md` ✓ (2026-09-25)
- `kevin-jordane-agentic-ai-v2.smell-test.md` ✓ (2026-09-25)
- This evidence file ✓

**Not in the Project folder:**
- `SKILL.md` — lives in a plugin-provided, read-only folder (`/var/folders/…/skills/anti-ai-voice/`). A teammate opening the Project cannot access the skill itself without the same plugin installed.
- `references/banned-words.md` — same location, same access constraint.
- `evals.json` — does not exist anywhere.

**What's missing for FOUND:** the skill file (or a copy of it) and at least one formal test case in `evals.json` need to be present in the Project folder for a teammate to fully use and evaluate this skill independently.

---

## 6. Health-gauge awareness (reviewer judgment — supporting evidence only)

One data point from today's run:
- Smell-test score: 7.78 → 8.40 (+8.0%) across one application
- Category 2 (the skill's primary target): 7/10 → 8.5/10
- One regression introduced and caught (see Criterion 4)

Not enough iterations to establish a correction rate or a trend. The reviewer should ask: "How often does the article need to go back for a second pass after you've run anti-ai-voice? And when it passes cleanly, do you read it again more slowly to make sure?"

---

## 7. Independent standard, not borrowed opinion (reviewer judgment — supporting evidence only)

The `banned-words.md` file and the 6-step SKILL.md process predate the test run — they are not reverse-engineered from the article's outputs. The criteria were written as a standard before being applied. The smell-test scoring (the before/after measurement) uses a separate skill (`ai-smell-test`) as a third-party check, not self-grading.

No `evals.json` `expected_output` entries exist to check for the classic Stage 2 counterfeit (criteria that just restate the model's own first answer). The reviewer should ask: "How did you decide what goes on the banned-words list? Did any of those come from seeing the model make that mistake in a real draft, or did you start from a general idea of what AI writing sounds like?"

---

## Candidate input still required

Before this can go to human review, four items are needed:

1. **Criterion 1** — Provide a dated log of prior anti-ai-voice applications (e.g., confirm which Devlin or Claudio drafts received this pass and on which dates), OR be ready to answer "how often does this come up in a normal month?" directly with the reviewer.

2. **Criterion 3** — Either: (a) run the skill-creator eval loop using the changelog's before/after pairs as the fixed test examples and produce `evals.json` + `iteration-1/` artifacts, OR (b) discuss with reviewer whether the changelog + smell-test scores qualify as the formal before/after under the embedded rubric.

3. **Criterion 5** — Copy `SKILL.md` and `banned-words.md` into the Project folder so a teammate can access the full skill without the plugin. Optionally add 2–3 formal test cases to `evals.json`.

4. **Criterion 4 / Reflection (candidate must write — do not delegate)** — Write 3–5 sentences in your own words describing the "overhead, not oversight" miss: what the skill produced, what caught it, and what it revealed about where the skill's pattern-matching breaks down. Suggested prompt: *"On 2026-09-25, while running anti-ai-voice on Kevin Jordane's article, the pass replaced one contrast-negation pattern with another. The follow-up smell test caught it at Line 43. What that told me about the skill's edge cases is…"*
