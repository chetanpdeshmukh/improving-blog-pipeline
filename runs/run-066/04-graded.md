# AI Smell Test - nearshore-ai-velocity-draft.md

**Date:** 2026-09-27
**Grade:** B   ·   **Word count:** ~1,450   ·   **Threshold:** B (default)
**Document type:** Client-facing deliverable

*(The revision notes appended after the horizontal rule were excluded from word count and scoring -- they are not part of the draft.)*

---

## Scorecard

| Category | Score | Weight | Notes |
|---|---|---|---|
| Voice clichés, hollow affirmations & false authoritative framing | 8/10 | 20% | "honest story" (line 27) and "honest acknowledgment" (line 57) label content as candid rather than letting it speak |
| Contrast negation & em-dash overuse | 8.5/10 | 20% | Em dashes confirmed removed; full-document grep found zero corrective-negation hits; parallel contrasts use "with/without" framing, not the two-sentence corrective template |
| Triadic structures & parallel listing | 7.5/10 | 10% | Five three-item constructions spread across the piece; none concentrated enough to breach the 3-per-500-word threshold |
| Generic content & fake specifics | 7/10 | 25% | Two unresolved [NEEDS SOURCE] tags: 130K STEM graduates (no confirmed source) and 50-60% productivity gains (no confirmed measurement basis) |
| Structural tells | 9/10 | 15% | Headers are specific and argumentative; no tables, no TOC; section lengths vary meaningfully |
| Synonym sprawl, repetition & rhetorical scaffolding | 5/10 | 10% | "Prepared X / unprepared Y" scaffold runs through 6+ sections as the default move; aphoristic mic-drop closers after 5 of 7 sections; "AI [verb]" as sentence subject 4+ times |

**Weighted average: 7.65 --> Grade: B**

---

## Critical findings

- **Line 7:** "Mexico produces roughly 130,000 STEM graduates annually [NEEDS SOURCE: confirm whether this is Sandoval's own estimate or a cited figure]"
  - **Why it's a smell:** An unconfirmed statistic in the second paragraph sets a credibility ceiling for the entire piece. Readers who check and cannot verify it discount everything that follows.
  - **Suggested rewrite:** If the figure is Sandoval's own: "Sandoval puts Mexico's annual STEM graduate output at roughly 130,000." If it's a third-party figure, name the source in-line.

- **Line 27:** "Some team members saw 50-60% productivity gains across their broader workload [NEEDS SOURCE: confirm measurement basis with Sandoval: story points per sprint, DORA metrics, or another tracking method]"
  - **Why it's a smell:** A percentage range without a confirmed denominator reads as invented. The 40-minute-to-4-minute metric directly above it is specific and survives scrutiny; this one does not yet.
  - **Suggested rewrite:** Resolve with Sandoval before publishing. If story points: "Several team members averaged 50-60% more story points per sprint over the pilot period." If it cannot be confirmed, remove it -- the ticket-resolution metric is sufficient on its own.

---

## Major findings

- **Line 27:** "Results were uneven across individuals, which Sandoval presents as the honest story of AI adoption in a real team."
  - **Why it's a smell:** "Honest story" labels the content as candid before the content can demonstrate it -- the false-authority-framing tell. A human giving an honest account just gives it.
  - **Suggested rewrite:** "Results were uneven across individuals. Sandoval names that directly rather than rounding up to a headline number."

- **Line 57:** "Sandoval notes AI gains are currently uneven. That honest acknowledgment matters before making structural decisions."
  - **Why it's a smell:** "Honest acknowledgment" applies the same manufactured-candor label to a Sandoval observation in the closing section.
  - **Suggested rewrite:** "Sandoval notes AI gains are currently uneven -- a point worth sitting with before making structural decisions."

- **Lines 11, 15, 19, 27, 43, 49, 51, 57 (throughout):** "Teams with clear outcome definitions... Teams without mature sprint metrics," "A team with clear process... A team running on ambiguous requirements," "Teams with an existing engineering culture... When licenses land on a team without prompt governance," "Teams with psychological safety... Teams that treat a pilot as a performance evaluation," "Organizations that define... Organizations that skip," "A partner ahead of that curve... A partner building it alongside you... A partner whose AI strategy exists only on slide decks"
  - **Why it's a smell:** The "prepared X / unprepared Y" parallel scaffold is the article's primary rhetorical move -- it appears in six of seven sections. A structure this consistent reads as a template, not as analysis.
  - **Suggested rewrite:** In Sections 6 (partner) and 7 (pendulum), convert at least two instances into direct recommendations. "Ask for a measurement log from a past engagement, not a pitch deck" replaces the partner-comparison frame and delivers the same verdict without the scaffold.

- **Lines 19, 27, 35, 43, 51 (section closers):** "The failure surface grows with adoption speed." / "The dashboard looks strong while the operating model stays unchanged." / "A hiring process built on detection tooling alone will eventually surface teams built on undiscovered gaps." / "The swing becomes unpredictable." / "A partner whose AI strategy exists only on slide decks means inheriting their experiment as your production risk."
  - **Why it's a smell:** Five of seven sections close with a short, punchy aphoristic line. One or two reads as earned punctuation; five in sequence reads as a formatting habit.
  - **Suggested rewrite:** Collapse the two weakest instances -- "The swing becomes unpredictable" and "The failure surface grows with adoption speed" -- into the preceding sentence so they land as conclusions rather than mic drops.

- **Lines 9, 33, 55, 59:** "AI collapsed that framing," "AI lowered the barrier," "AI moves collaboration higher in the value chain," "AI has already reshaped nearshore delivery"
  - **Why it's a smell:** AI as sentence subject doing action appears four times. Once or twice is precise shorthand; four times is a tic where an abstraction is carrying work the author should do.
  - **Suggested rewrite:** At least two should shift to a human or organizational subject. "Every CFO who looks at a team's sprint velocity can now see the cost-arbitrage argument collapse" puts the observation on the person experiencing it rather than on the technology.

---

## Minor findings

- Five three-item constructions across the piece ("what did this team ship, in what timeframe, with what quality signal?" / "clear process, good review habits, and collaborative trust" / "AI spend at scale, zero business alignment, no accountability for outcomes" / "cultural alignment and growth mindset come first, foundational engineering competency second, AI proficiency third" / "prompt governance, token spend observability, and output review before code ships"). None concentrated in a single 500-word stretch, but the pattern is visible.
- "operating model" appears seven times. Topically central, but one synonym substitution (delivery model, operating structure) in Sections 6 or 7 would reduce the density without losing precision.

---

## The one paragraph to rewrite first

**Before** (line 27):
"Results were uneven across individuals, which Sandoval presents as the honest story of AI adoption in a real team. Teams with psychological safety treat that unevenness as signal, surfacing what is working and what is failing in near-real time. Teams that treat a pilot as a performance evaluation will game their individual metrics. The dashboard looks strong while the operating model stays unchanged."

**After:**
"Results were uneven across individuals. Sandoval names that directly rather than rounding up to a headline number. On teams with psychological safety, the unevenness surfaced what was working and what was failing, and the team adjusted. On teams running the pilot as a performance review, engineers gamed individual metrics instead. The dashboard looked strong; nothing changed."

Changes: "honest story" removed and replaced with a direct statement; the "Teams with X / Teams that Y" scaffold broken into asymmetric sentences; the aphoristic mic-drop collapsed into a plain declarative that still lands.

---

## What to do next

- Resolve both [NEEDS SOURCE] tags with Sandoval before the draft ships -- confirm the 130K STEM figure source and nail down the measurement basis for the 50-60% productivity claim.
- Strip "honest story" (line 27) and "honest acknowledgment" (line 57); state both assessments directly using the rewrites above.
- In Sections 6 and 7, convert two of the three "A partner who X / A partner who Y" parallel instances into direct recommendations so the scaffold varies.
- Collapse two of the five mic-drop section closers into the preceding sentence -- "The swing becomes unpredictable" and "The failure surface grows with adoption speed" are the candidates.
- Re-run the smell test after the [NEEDS SOURCE] items are resolved to confirm the Category 4 score.