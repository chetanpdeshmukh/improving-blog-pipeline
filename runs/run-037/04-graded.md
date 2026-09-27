I'll run the Category 2 grep pass first, then score all six checks and write the report.

**Category 2 grep pass** (scanning for: `isn't|wasn't|doesn't|not a |not the |it's not|that's not|rather than|, not |not because`):

Going line by line through the draft... zero hits. Confirmed by a manual read-through — no "X is not Y, it is Z" corrective templates, no bare ", not Y" tail qualifiers, no em dashes anywhere. This is genuinely clean on the highest-frequency category. Treating the zero-hit result with the required suspicion and confirming by eye: the draft uses parallel conditionals ("Done well... Done poorly...") and contrast is implicit rather than negation-structured. Not flagging.

Now running the full six checks, then writing the report to file.

**Wordcount estimate:** ~870 words.

**Category scores:**
- Cat 1 (Voice clichés): 9/10 — body is clean; "The Honest Limits" heading pre-labels the content as candid
- Cat 2 (Contrast negation): 10/10 — zero instances, zero em dashes
- Cat 3 (Triadic structures): 6/10 — five "X, Y, and Z" triplets in ~870 words; two are formulaically parallel
- Cat 4 (Generic content): 8/10 — named source with concrete anecdote; broad assertions appropriate for thought-leadership register
- Cat 5 (Structural tells): 9/10 — clean hierarchy, varied paragraph lengths, no markdown bleed
- Cat 6 (Synonym sprawl/scaffolding): 6/10 — "The [noun]..." opens 5 of ~15 paragraphs; two sections close with mic-drop lines

**Weighted average:** (9×0.20) + (10×0.20) + (6×0.10) + (8×0.25) + (9×0.15) + (6×0.10) = 1.80 + 2.00 + 0.60 + 2.00 + 1.35 + 0.60 = **8.35 → Grade B**

Writing the report now.


{"type":"write_file","path":"/Users/Chetan.Deshmukh/Documents/Claude Cowork Project/blog writing framework/blog-pipeline-stage4/stop-compressing-your-people.smell-test.md","content":"# AI Smell Test — stop-compressing-your-people.md\n\n**Date:** 2026-09-27\n**Grade:** B   ·   **Word count:** ~870   ·   **Threshold:** B\n**Document type:** Client-facing deliverable\n\n## Scorecard\n\n| Category | Score | Weight | Notes |\n|---|---|---|---|\n| Voice clichés, hollow affirmations & false authoritative framing | 9/10 | 20% | Body is clean; \"The Honest Limits\" heading pre-labels the section as candid |\n| Contrast negation & em-dash overuse | 10/10 | 20% | Zero contrast-negation instances, zero em dashes — exceptional |\n| Triadic structures & parallel listing | 6/10 | 10% | Five \"X, Y, and Z\" triplets in ~870 words; two are formulaically parallel |\n| Generic content & fake specifics | 8/10 | 25% | Named source (Blake McMillan), concrete workshop anecdote; broad assertions unquantified but appropriate for thought-leadership register |\n| Structural tells | 9/10 | 15% | Clean hierarchy, varied paragraph lengths, no markdown bleed |\n| Synonym sprawl, repetition & rhetorical scaffolding | 6/10 | 10% | \"The [noun]...\" opens 5 of ~15 paragraphs; two sections close with aphoristic mic-drop lines |\n\n## Critical findings\n\nNone.\n\n## Major findings\n\n- **Lines 9, 11, 27, 29, 37 (five instances across ~870 words):** `\"which work matters, why it matters, and where the edge cases live\"` / `\"client relationships, institutional memory, and judgment\"` / `\"validating ideas, praising drafts, confirming the plan is sound\"` / `\"what to reject, what to redirect, and what to keep\"` / `\"in judgment, in relationships, in accumulated understanding\"`\n  - **Why it's a smell:** Five \"X, Y, and Z\" triplets in under 900 words puts the piece above one per 175 words. The last two — \"what to reject, what to redirect, and what to keep\" and \"in judgment, in relationships, in accumulated understanding\" — are formulaically parallel: identical grammatical slot, same syllabic rhythm, generated feel.\n  - **Suggested rewrite (line 29, most formulaic):** \"The skill worth developing is the interrogation: knowing what to reject, what to redirect, and what to keep.\" → \"The skill worth developing is interrogation — learning to spot a wrong answer, redirect a misaligned one, and recognize when output is worth keeping. That's not a prompt skill. It's a judgment skill.\"\n\n- **Lines 3, 9, 29, 35, 37 (five paragraphs):** Opening words: `\"The instinct when...\"` / `\"The person doing...\"` / `\"The irreducible human...\"` / `\"The skeptic's objection...\"` / `\"The displacement narrative...\"`\n  - **Why it's a smell:** Five of approximately fifteen paragraphs open with \"The [noun/phrase]...\" as their first two words. Used once or twice this is invisible; at five instances across a single post it creates a monotonous drumbeat — the same default sentence-launch in place of varied transitions.\n  - **Suggested rewrite (line 37):** \"The displacement narrative misses where people's value actually lives: in judgment, in relationships, in accumulated understanding of how the business works.\" → \"Judgment, relationships, and accumulated context are where people's value lives. The displacement narrative doesn't look there.\"\n\n## Minor findings\n\n- **Line 33 (section heading):** \"The Honest Limits and the Choice That Remains\" — the word \"Honest\" pre-labels the content as candid before stating the limits. A human just states the limits. Consider \"Where It Actually Breaks Down\" or \"The Real Limits\" as alternatives.\n- **Line 31 (section 3 closing sentence):** \"That's a talent development failure that surfaces as an AI problem.\" — aphoristic mic-drop. Effective once; paired with the closing line (line 39), it establishes a pattern.\n- **Line 39 (closing):** \"AI creates capacity. Filling it deliberately is the work.\" — second mic-drop closer in the piece. One of these is a legitimate stylistic choice; two is a tic. Keep this one (it's the stronger line), and rewrite the section 3 closer as a substantive sentence instead.\n- **Lines 21 and 31:** Two consecutive section paragraphs open with \"Teams\" (\"Teams trained with...\" / \"Teams that build...\"). Not above threshold independently, but compounds the paragraph-opener monotony finding.\n\n## The one paragraph to rewrite first\n\n**Before (line 29):**\n> The irreducible human contribution is evaluation. Ask AI for one option and you'll defend it; ask for five and you'll interrogate all of them. The skill worth developing is the interrogation: knowing what to reject, what to redirect, and what to keep.\n\n**After:**\n> Evaluation is the irreducible human contribution. Ask AI for one option and you'll defend it; ask for five and you'll interrogate all of them. The distinguishing skill is knowing when an answer is wrong, when the direction is off, and when to take what you got and move. That's not a prompting skill. It's judgment.\n\n*Why this paragraph first:* It carries two of the Major findings simultaneously — the \"The [noun]...\" opener and the most formulaic triplet in the draft — and it's in the section making the piece's strongest claim. Fixing it sharpens the argument and removes both patterns in one edit.\n\n## What to do next\n\n- Rewrite the paragraph at line 29 per the suggestion above — it resolves two Major findings at once.\n- Do a find-replace pass on paragraph openers: wherever a paragraph begins with \"The [noun]...\", try inverting the sentence so the noun becomes a predicate rather than a subject.\n- Cut one of the two mic-drop section closers (line 31 is the weaker one; replace it with a substantive sentence that earns the transition to section 4).\n- Reduce triadic triplets from five to two or three: the triplets at lines 9 and 11 are the most natural; the ones at lines 27, 29, and 37 are the most formulaic — target those first.\n- Re-run the smell test after edits if desired; delete this scorecard once the draft ships.\n"}


{"type":"write_file_result","path":"/Users/Chetan.Deshmukh/Documents/Claude Cowork Project/blog writing framework/blog-pipeline-stage4/stop-compressing-your-people.smell-test.md"}


---

# AI Smell Test — stop-compressing-your-people.md

**Date:** 2026-09-27
**Grade:** B   ·   **Word count:** ~870   ·   **Threshold:** B
**Document type:** Client-facing deliverable

## Scorecard

| Category | Score | Weight | Notes |
|---|---|---|---|
| Voice clichés, hollow affirmations & false authoritative framing | 9/10 | 20% | Body is clean; "The Honest Limits" heading pre-labels the section as candid |
| Contrast negation & em-dash overuse | 10/10 | 20% | Zero contrast-negation instances, zero em dashes — exceptional |
| Triadic structures & parallel listing | 6/10 | 10% | Five "X, Y, and Z" triplets in ~870 words; two are formulaically parallel |
| Generic content & fake specifics | 8/10 | 25% | Named source (Blake McMillan), concrete workshop anecdote; broad assertions unquantified but appropriate for thought-leadership register |
| Structural tells | 9/10 | 15% | Clean hierarchy, varied paragraph lengths, no markdown bleed |
| Synonym sprawl, repetition & rhetorical scaffolding | 6/10 | 10% | "The [noun]..." opens 5 of ~15 paragraphs; two sections close with aphoristic mic-drop lines |

## Critical findings

None.

## Major findings

- **Lines 9, 11, 27, 29, 37 (five instances across ~870 words):** `"which work matters, why it matters, and where the edge cases live"` / `"client relationships, institutional memory, and judgment"` / `"validating ideas, praising drafts, confirming the plan is sound"` / `"what to reject, what to redirect, and what to keep"` / `"in judgment, in relationships, in accumulated understanding"`
  - **Why it's a smell:** Five "X, Y, and Z" triplets in under 900 words puts the piece above one per 175 words. The last two are formulaically parallel: identical grammatical slot, same syllabic rhythm, generated feel.
  - **Suggested rewrite (line 29, most formulaic):** "The skill worth developing is the interrogation: knowing what to reject, what to redirect, and what to keep." → "The skill worth developing is interrogation — learning to spot a wrong answer, redirect a misaligned one, and recognize when output is worth keeping. That's not a prompt skill. It's a judgment skill."

- **Lines 3, 9, 29, 35, 37 (five paragraphs):** Opening words: `"The instinct when..."` / `"The person doing..."` / `"The irreducible human..."` / `"The skeptic's objection..."` / `"The displacement narrative..."`
  - **Why it's a smell:** Five of approximately fifteen paragraphs open with "The [noun/phrase]..." as their first two words. Used once or twice this is invisible; at five instances it creates a monotonous drumbeat — the same default sentence-launch in place of varied transitions.
  - **Suggested rewrite (line 37):** "The displacement narrative misses where people's value actually lives: in judgment, in relationships, in accumulated understanding..." → "Judgment, relationships, and accumulated context are where people's value lives. The displacement narrative doesn't look there."

## Minor findings

- **Line 33 (heading):** "The Honest Limits and the Choice That Remains" — "Honest" pre-labels the content as candid before stating the limits. Consider "Where It Actually Breaks Down" or "The Real Limits."
- **Line 31 (section 3 closer):** "That's a talent development failure that surfaces as an AI problem." — aphoristic mic-drop. Paired with line 39, it establishes a pattern.
- **Line 39 (closing):** "AI creates capacity. Filling it deliberately is the work." — second mic-drop in the piece. Keep this one (it's stronger); rewrite the section 3 closer as a substantive sentence instead.
- **Lines 21 and 31:** Two consecutive section paragraphs open with "Teams" ("Teams trained with..." / "Teams that build..."). Compounds the opener-monotony finding.

## The one paragraph to rewrite first

**Before (line 29):**
> The irreducible human contribution is evaluation. Ask AI for one option and you'll defend it; ask for five and you'll interrogate all of them. The skill worth developing is the interrogation: knowing what to reject, what to redirect, and what to keep.

**After:**
> Evaluation is the irreducible human contribution. Ask AI for one option and you'll defend it; ask for five and you'll interrogate all of them. The distinguishing skill is knowing when an answer is wrong, when the direction is off, and when to take what you got and move. That's not a prompting skill. It's judgment.

*This paragraph carries two Major findings simultaneously — the "The [noun]..." opener and the most formulaic triplet in the draft — and it anchors the piece's strongest claim.*

## What to do next

- Rewrite line 29 per the suggestion above — resolves two Major findings in one edit.
- Do a pass on paragraph openers: wherever a paragraph begins with "The [noun]...", try inverting the sentence so the noun becomes a predicate rather than a subject.
- Cut one of the two mic-drop closers (line 31 is the weaker one; replace it with a substantive sentence that earns the transition to section 4).
- Reduce triadic triplets from five to two or three: lines 9 and 11 are the most natural; lines 27, 29, and 37 are the most formulaic — target those.
- Re-run the smell test after edits if desired.

---

**The headline:** this draft is in genuinely good shape. Category 2 — historically the highest-frequency finding in this pipeline — scored a perfect 10. No AI clichés, no false authority in the body text, no fake specifics, no structural bloat. The two issues dragging the score from A to B are mechanical: triplet overuse and a repeated paragraph-opener structure. Both are fixable in under an hour. Scorecard saved at `stop-compressing-your-people.smell-test.md`.