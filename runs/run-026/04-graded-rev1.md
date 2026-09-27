I'll run the smell test on this draft. Starting with the Category 2 grep pass first, then the full six-check scoring.

After analysis, writing the report to a file now.

<function_calls>
<invoke name="Write">
<parameter name="path">/Users/Chetan.Deshmukh/Documents/Claude Cowork Project/blog writing framework/blog-pipeline-stage4/ai-amplify-blog.smell-test.md</parameter>
<parameter name="content"># AI Smell Test — ai-amplify-blog.md (pasted draft)

**Date:** 2026-09-27
**Grade:** C   ·   **Word count:** ~1,050   ·   **Threshold:** B (default)
**Document type:** Client-facing deliverable

🚨 **DO NOT SHIP** — two unfilled content gaps are send-blockers, and recurring structural tells will register with a careful reader.

## Scorecard

| Category | Score | Weight | Notes |
|---|---|---|---|
| Voice clichés, hollow affirmations & false authoritative framing | 9/10 | 20% | No clichés, no candor-labels; clean throughout |
| Contrast negation & em-dash overuse | 5/10 | 20% | Four contrast-negation instances (lines 9, 21, 37, 51); no em-dash issues after prior editing pass |
| Triadic structures & parallel listing | 7/10 | 10% | Four "X, Y, and Z" triads in ~1,050 words; density is moderate |
| Generic content & fake specifics | 6/10 | 25% | Two anonymous case studies with unfilled metric placeholders; one real sourced stat (KPMG 2024) |
| Structural tells | 9/10 | 15% | Clean heading hierarchy, no bleeding markdown, no acronym sprawl |
| Synonym sprawl, repetition & rhetorical scaffolding | 5/10 | 10% | Mic-drop section closers appear in 6 of 7 sections — recurring as a default move, not a choice |

**Weighted score:** (9×0.20) + (5×0.20) + (7×0.10) + (6×0.25) + (9×0.15) + (5×0.10) = **6.85 → C**

---

## Critical findings

- **Line 11:** "One education company Improving worked with had a massive library of video content, presentations, and classroom materials... The business impact was closing the gap between 'we have this' and 'anyone can actually use this.' [Insert metric from transcript: search success rate, adoption numbers, or time-to-find.]"
  - **Why it's a smell:** Anonymous client, no quantified outcome. The blog cannot publish with a placeholder in the body, and two unquantified case studies back-to-back read as illustrative filler, not evidence.
  - **Suggested rewrite:** Pull the number from the transcript and build around it: "After Improving indexed and semantically searched that library using AI, [X% of clients located relevant material within two minutes / search success rate increased from Y% to Z%]. The gap between 'we have this' and 'anyone can actually use this' closed."

- **Line 13:** "A roofing startup makes the same point from a different angle... AI made the targeting faster and more precise. [Insert metric from transcript: lead time reduction, win rate, or market coverage.]"
  - **Why it's a smell:** Second anonymous case study in the same section, also without a quantified outcome. The placeholder is honest, but the result in the published version is a second evidence-free example.
  - **Suggested rewrite:** "The startup reached affected markets [X days / X% faster] than competitors by identifying hailstorm zones within hours of a weather event."

---

## Major findings

- **Line 9:** "AI does not get bored doing this work. Humans do, which is why the work either does not get done or gets done badly."
  - **Why it's a smell:** Two-sentence corrective template: "X does not do Y. [Subject] does." — the same scaffolding structure found in every post in the 2026-09-04 audit.
  - **Suggested rewrite:** "Human indexers deprioritize this work, which is why most large content libraries are technically available and practically unused. AI is indifferent to repetition."

- **Line 21:** "Companies that cannot answer them are not ready to build AI capabilities. They are ready to catalog."
  - **Why it's a smell:** Two-sentence corrective template: "X are not ready for Y. They are ready for Z." Crisp as rhetoric, but structurally identical to the pattern that saturated the prior audit batch.
  - **Suggested rewrite:** "Companies that cannot answer them should start with a data catalog."

- **Line 37:** "The decades of practice around code reviews, credential management, and security scans did not become optional because development accelerated. They became more important because the code surface area expands faster."
  - **Why it's a smell:** Two-sentence corrective template ("X did not become Y. They became Z.") plus a three-item triadic list ("code reviews, credential management, and security scans") in the same sentence — two findings in one paragraph.
  - **Suggested rewrite:** See "The one paragraph to rewrite first" below.

- **Line 51:** "The next step follows from there, not from where you want to be."
  - **Why it's a smell:** Bare mid-sentence tail: "from there, not from where" — the same ", not Y" corrective qualifier caught by the grep pass.
  - **Suggested rewrite:** "The next step follows from where you actually are."

- **Lines 3, 15, 25, 39, 51, 59 (section closers throughout):** "That authorization is a business decision first, a technology decision second." / "Connecting AI to a disorganized, untagged data estate produces confident, wrong answers." / "No amount of perimeter security compensates for missing internal access controls." / "Speed of delivery does not change what a breach costs. Maintain the checkpoints." / "Identify which level you are at. The next step follows from there, not from where you want to be." / "Leaders who can answer that... are building something durable. Leaders who cannot are building something expensive."
  - **Why it's a smell:** Six of seven sections close with a short aphoristic one-liner. One well-placed mic-drop is deliberate style. Six consecutive is a template. The draft reads as if every section was assigned a punchy closer as a rule.
  - **Suggested rewrite:** Keep the two strongest — "Connecting AI to a disorganized, untagged data estate produces confident, wrong answers" and the final "durable / expensive" parallelism are the best two. Let three or four sections end on the substance of their last paragraph instead.

---

## Minor findings

- Four triadic "X, Y, and Z" structures in ~1,050 words: "video content, presentations, and classroom materials" (line 11); "cataloging, tagging, and governing" (line 25); "training exclusion clauses, defined processing boundaries, and contractual accountability" (line 31); "code reviews, credential management, and security scans" (line 37). None is egregious individually. The density warrants varying one or two on a polish pass.

---

## The one paragraph to rewrite first

**Before (line 37):**

> AI coding agents optimize for working code. Security posture is a separate variable they do not prioritize. The decades of practice around code reviews, credential management, and security scans did not become optional because development accelerated. They became more important because the code surface area expands faster.

**After:**

> AI coding agents optimize for working code. Security posture is a different variable and a different responsibility. Faster development expands the code surface area: more code shipped means more exposure, more review required. The practices that caught vulnerabilities before AI still catch them now. Skipping them because the code arrived quickly is exactly how a breach gets built in.

*What changed: removed the two-sentence corrective ("did not become optional... They became more important"), dissolved the triadic list into prose, and split into direct declarative sentences. The substance is unchanged.*

---

## What to do next

- Fill in the metric placeholders for both case studies before any other edits — the blog cannot go live with "[Insert metric from transcript]" in the body, and both case studies need a quantified outcome to function as evidence rather than illustration.
- Grep the full draft for `, not |not a |not the |isn't|doesn't|rather than|not because` and resolve every hit. The four flagged above may not be all of them.
- Read the section-closing lines in order, out loud. Cut or rework any closer that sounds like a pull-quote. Keep the two strongest; let the rest end on the paragraph's final substantive sentence.
- Verify the KPMG citation: confirm the exact stat, survey name, and publication year before the post goes live.
- Re-run the smell test after filling the gaps.
</parameter>
</invoke>
</function_calls>

Scorecard saved at `ai-amplify-blog.smell-test.md`. Use it as your checklist while you edit.

**Grade: C (6.85/10) — DO NOT SHIP**

The two blockers before anything else: the `[Insert metric]` placeholders in both case studies. The blog physically cannot publish with those in the body, and without numbers, two back-to-back anonymous case studies read as AI-generated illustration rather than evidence. Pull the figures from the transcript first.

After that, the two categories that pulled the score down the most:

**Category 2 (contrast negation, score 5/10):** Four instances of the two-sentence corrective template ("X did not become Y. They became Z." / "Companies are not ready for X. They are ready for Y."). The Category 2 grep caught `, not from` at line 51 as a bare tail. None landed in the opening or closing paragraph, so none are CRITICAL — but four in ~1,050 words is a high density.

**Category 6 (rhetorical scaffolding, score 5/10):** Six of seven sections end with a short aphoristic one-liner. Individually each one is good. Together they signal a template. Keep the two strongest ("confident, wrong answers" and the final "durable / expensive" parallelism), let the others close on substance.

The strong spots: Category 1 is nearly clean (no clichés, no candor-labels), and Category 5 is clean (heading hierarchy, no structural issues). The editing pass that removed the em dash and tightened the section enders already improved the draft — the remaining work is filling the content gaps and breaking the mic-drop habit.