I'll run the smell test on the pasted draft. Starting with the Category 2 mechanical grep pass, then scoring all six checks.

The source was pasted without a filename, so I'll save the report as `blog-bottleneck-isnt-code.smell-test.md`.

**Category 2 grep pass (contrast negation) — before scoring anything else:**

Hitting the full text for `isn't|wasn't|doesn't|not a |not the |it's not|that's not|rather than|, not |not because` (case-insensitive):

- Line 1 (title): "The Bottleneck **Isn't** Code" — `isn't` hit, CRITICAL position
- Line 27: "Writing code faster has **never been** the bottleneck. The bottleneck **has been** clarity..." — two-sentence corrective template
- Line 37: "We are good at telling people what we want. We are **not** as good at telling people what we need" — two-sentence corrective
- Line 59: "Consistency and correctness are different things." — implicit negation mic-drop closer

Four hits. No em dashes anywhere in the draft.

Now running full six-category scoring, then writing the file.

**Scoring summary before writing:**
- Cat 1: 9/10 — No clichés, no false-authority framing. Very clean.
- Cat 2: 6/10 — 4 contrast-negation instances (title CRITICAL + 3 MAJOR), no em dashes.
- Cat 3: 6/10 — Six three-item triadic structures across ~1,500 words; multiple cluster within 500-word windows.
- Cat 4: 8/10 — Named person, named city, specific hardware. Minor: "week three/day two" is illustrative, not empirical.
- Cat 5: 9/10 — Clean hierarchy, no tables, no markdown bleed, no acronym sprawl.
- Cat 6: 7/10 — Five mic-drop closers across seven sections (threshold: 3); "This" as paragraph opener at lines 43, 47, 59 (at threshold).

Weighted average: (9×0.20) + (6×0.20) + (6×0.10) + (8×0.25) + (9×0.15) + (7×0.10) = **7.65 → B**

Writing the report file now.

```
/Users/Chetan.Deshmukh/Documents/Claude Cowork Project/blog writing framework/blog-pipeline-stage4/blog-bottleneck-isnt-code.smell-test.md
```

# AI Smell Test — blog-bottleneck-isnt-code (pasted draft)

**Date:** 2026-09-27
**Grade:** B   ·   **Word count:** ~1,500   ·   **Threshold:** B
**Document type:** Client-facing deliverable

## Scorecard

| Category | Score | Weight | Notes |
|---|---|---|---|
| Voice clichés, hollow affirmations & false authoritative framing | 9/10 | 20% | No clichés; no false-authority framing; register is direct and grounded throughout |
| Contrast negation & em-dash overuse | 6/10 | 20% | Title is a contrast-negation (CRITICAL); two-sentence corrective template at lines 27 and 37; implicit negation mic-drop at line 59; no em dashes |
| Triadic structures & parallel listing | 6/10 | 10% | Six three-item triadic structures in ~1,500 words; multiple cluster within 500-word windows |
| Generic content & fake specifics | 8/10 | 25% | Named person, named city, named role, specific hardware (HP12C); "week three/day two" comparison is illustrative not empirical but acceptable at this scale |
| Structural tells | 9/10 | 15% | Clean hierarchy; no tables; no acronym sprawl; diagram placeholders clearly marked as placeholders |
| Synonym sprawl, repetition & rhetorical scaffolding | 7/10 | 10% | Five mic-drop section closers across seven sections (threshold: 3); "This" as paragraph opener at lines 43, 47, 59 (at threshold) |

---

## Critical findings

- **Line 1 (title):** "The Bottleneck **Isn't** Code"
  - **Why it's a smell:** Contrast-negation in the title, the highest-visibility position in the piece. The reader's first two content words are a correction template, not a claim.
  - **Suggested rewrite:** "Human Intent Is the Real Constraint on AI-Assisted Teams" — the subtitle already says the thing. Use it as the standalone title.

---

## Major findings

- **Line 27:** "Writing code faster has never been the bottleneck. The bottleneck has been clarity of human intent."
  - **Why it's a smell:** Classic two-sentence corrective template inside an attribution — "X is not the issue. Y is." The structure is the tell, regardless of who is quoted.
  - **Suggested rewrite:** Restructure the attribution: "Clauddio's diagnosis: clarity of human intent has always been the constraint. Making code generation faster just gets teams to the wrong thing faster."

- **Line 37:** "We are good at telling people what we want. We are not as good at telling people what we need, or even if we need it."
  - **Why it's a smell:** Two-sentence corrective template: "We are good at X. We are not as good at Y." Verbatim Clauddio quote, so don't rewrite his words — but the surrounding framing can absorb the contrast instead of leaving it as a standalone two-beat structure.
  - **Suggested rewrite:** "Clauddio draws a sharp line: articulating wants comes naturally. Surfacing the underlying need — or questioning whether the need exists at all — is where teams consistently underinvest."

- **Line 59:** "Consistency and correctness are different things."
  - **Why it's a smell:** Implicit contrast-negation mic-drop closer ("consistent" ≠ "correct"), and the fifth section to end on a short aphoristic kicker (see Category 6 finding below). Two smells in one sentence.
  - **Suggested rewrite:** Absorb the insight into the preceding sentence rather than leaving it as a dangling epigram: "Borrowing Clauddio's markdown file produces output shaped by his accumulated coaching judgment — consistent with his standards, not automatically with yours. The recipe is only as good as the practitioner's instinct for when the output is wrong."

- **Lines 19, 15, 65, 77 (×2), 53:** Six three-item triadic structures
  - "the override switch, the quality gate, the exception handler" (line 11)
  - "Scrum sprints, decision cycles, daily work rhythms" (line 15)
  - "transcript synthesis after a stakeholder call, story drafting after a facilitated conversation, documentation generation after a sprint" (line 19)
  - "incomplete instructions, unconscious assumptions, 'just do it' without context" (line 65)
  - "daily scrums, stakeholder conversations, everything" (line 77)
  - "decision logs, challenge summaries, and onboarding guides" (line 77)
  - **Why it's a smell:** Six instances in ~1,500 words is a rhythmic tic. Line 77 has two back-to-back in the same paragraph. The handoff points at line 19 are the most visible — three items, same grammatical shape, same cadence.
  - **Suggested rewrite (line 19):** "The handoff points that actually work are the ones with a clean input: a transcript after a stakeholder call, a story draft after a facilitated conversation, generated documentation after a sprint." (Flatten two of the six across the draft to prose — pick the weakest two triads and break them up.)

- **Sections 1, 2, 4, 6, and 7 closers:** Five section-closing mic-drop lines across seven sections
  - "A broken loop runs faster, and the breakage compounds." (section 1)
  - "The clarity investment pays highest at cycle start." (section 2)
  - "Consistency and correctness are different things." (section 4)
  - "The outcome is proportional to the upstream discipline." (section 6)
  - "If you're leading the first team, your problem is upstream of the tools." (section 7)
  - **Why it's a smell:** One or two aphoristic closers is rhetoric. Five out of seven sections is a structural tic — the piece is using the same device as its default exit move.
  - **Suggested rewrite:** Keep the two most earned: the opening section's "A broken loop runs faster, and the breakage compounds" and the final "your problem is upstream of the tools." Let sections 2, 4, and 6 close on functional conclusions rather than kickers.

- **Lines 43, 47, 59:** "This" as paragraph opener three times in sequence
  - "This connects to his reframe of user stories." (line 43)
  - "This approach earns its keep at discovery..." (line 47)
  - "This scales when the practitioner..." (line 59)
  - **Why it's a smell:** Three consecutive section paragraphs opening with "This" makes the transitions feel formulaic — the same connective word doing all the bridging work.
  - **Suggested rewrite:** Lead with the noun each paragraph is actually about: "The user-story reframe extends to facilitation..." / "Discovery is where this investment pays..." / "Scaling requires the practitioner to have..."

---

## Minor findings

- "Week three / day two" at line 31 — presented as a general observation rather than measured data. Acceptable for a thought leadership piece at this scale; would need a source or caveat if the audience will probe the empirics.
- The two diagram placeholders (lines 17, 57) are clearly marked — no smell, but confirm both get fulfilled before publication. A missing diagram on a shipped post is a credibility hit independent of the writing.

---

## The one paragraph to rewrite first

**Before (line 59):**
> This scales when the practitioner has accumulated enough judgment about story quality to encode it in agent instructions. Borrowing someone else's markdown file produces consistent output shaped by someone else's judgment. Consistency and correctness are different things.

**After:**
> The approach scales with accumulated judgment, not independently of it. Borrowing Clauddio's markdown file produces output shaped by his years of coaching and blogging — consistent with his standards, not automatically with yours. Before importing someone else's recipe, build enough story-quality instinct to recognize when the output is wrong.

What changed: the contrast-negation mic-drop closer is gone; the "consistent ≠ correct" insight is absorbed into a concrete action sentence; the "This" opener is replaced with a noun; one triadic close is broken up.

---

## What to do next

- **Retitle:** Drop "Isn't" from the title. "Human Intent Is the Real Constraint on AI-Assisted Teams" is already in the subtitle — use it.
- **Grep the full draft** for `isn't|wasn't|doesn't|not a |not the |it's not|that's not|rather than|, not |not because` and resolve each hit. Four are flagged here — confirm the grep catches nothing the manual pass missed.
- **Audit all seven section closers.** Keep two aphoristic kickers maximum. Let the other five close on a functional point.
- **Vary the three "This" paragraph openers** at lines 43, 47, and 59 — each can lead with the noun it's pointing to.
- **Re-run the smell test** before publishing.

---

Scorecard saved at `blog-bottleneck-isnt-code.smell-test.md` — use it as your checklist while you edit.

**Grade: B.** The draft meets the default shipping threshold, but the title contrast-negation and the mic-drop tic are both in visible positions. The title fix alone is a two-minute change that removes the CRITICAL finding entirely.