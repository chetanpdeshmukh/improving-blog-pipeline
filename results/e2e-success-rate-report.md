# End-to-End Success Rate Report

Per the Stage 4 framework: "A report showing the end-to-end success rate across the
full workflow. The end-to-end number — not just per-step accuracy. If you don't know
your end-to-end number, you haven't reached Stage 4." This report leads with that
number, then breaks it down.

Compiled by reading every run folder's terminal artifact (`06-publish-kit.md` = PASS,
`punch-out.json` = PUNCH-OUT, `failure.json` = FAIL) and audit-trail.jsonl directly
from `runs/`, not from memory or session notes. Regenerate this report from scratch
any time new runs are added — do not hand-edit the numbers below.

## Headline number

**run-066 is the project's first genuine, full production-length, first-attempt
clean PASS** (2026-09-28, session 14) — see §10. Combined with the run history
below, this closes the last real evidence gap the pre-submission checklist was
waiting on (c12).

**25 of 31 substantive real runs (80.6%) reached a terminal state as-recorded at the
time** — either a PASS or a guardrail escalating to PUNCH-OUT. **After a
reproducibility check against today's fixed `qa-gate.js`, the confirmed-correct
figure is 24/31 (77.4%): 2 confirmed clean PASS (6.5%), 22 correct PUNCH-OUT (71.0%),
and 6 INTERRUPTED (19.4%, unchanged).**

**Updated 2026-09-27/28 (session 13) with `run-061`, `run-062`, and `run-063`** —
three real, full production-length (no `--draft`/`--short`) runs: **27 of 34
(79.4%)** reach a confirmed-correct terminal state. `run-061` correctly PUNCHED OUT
at `grade-gate` (Grade C, unsourced stats + uncredentialed expert). `run-062` and
`run-063` — both run against the same-session `blog-draft-writer.md` fixes for
exactly those two issues — cleared `ai-smell-test` clean on the first pass (Grade B,
no revision) each time, then each correctly PUNCHED OUT at `qa-gate` on different,
unrelated real issues (banned-word overuse + near-verbatim restatement in `062`;
banned-word overuse + mirror-structure repetition in `063`). None of the three is
the genuine production-length PASS the project still needs as its
certification-representative run; see §8–§9.

**Updated 2026-09-28 (session 14) with `run-065` and `run-066`** — `run-065`
(`test-data/Improving Podcast - Orchestrating AI Agents The New Scarce Skill.txt`,
full production length) exposed and confirmed a real `qa-gate.js` bug: the
reviewer bolded a genuine FAIL cell (`| 3A | POV consistency | **FAIL** | ... |`)
and the FAIL-row regex only matched an unbolded `| FAIL |` cell, so the run was
incorrectly waved through to `06-publish-kit.md` when it should have punched out.
Fixed same-session (commit `295aa7a`), regression-tested, and confirmed against
the real saved report. `run-065`'s publish-kit output is NOT a valid PASS — see
`runs/run-065/BUG-NOTE.md`. **`run-066`**, run immediately after with the fix
live (`test-data/Improving Podcast - The Nearshore Advantage Building Teams That
Scale 10x.txt`), is a genuine clean PASS: every step passed on the first attempt
with zero revision loops, Grade B, QA verdict CONDITIONAL PASS with 0 blocking
FAILs, independently reconfirmed against the fixed `qaGate()`. **36 substantive
real runs total; the confirmed-correct terminal-state count rises to 29/36
(80.6%), and confirmed clean PASS rises to 3 (`033`, `037`, `066`) — the first of
those three at genuine, unshortened production length.**

The gap between those two numbers is itself a real finding, not rounding: 3 of the
5 historically-logged PASSes (`run-035`, `run-038`, `run-040`) ran before a same-day
`qa-gate.js` regex fix (commit `67eb667`) that corrected FAIL detection — under that
bug, real content defects (a banned word, an unlinked statistic, a literal
`[INSERT DIAGRAM]` placeholder) went undetected and those runs reached
`06-publish-kit.md` incorrectly. Re-running today's `qaGate()` against their saved
`05-qa.md` reports shows all 3 would now correctly punch out — see
`punch-out/bypass-test-evidence.md` §4 for the full re-check and the fix. Only
`run-033` and `run-037` hold up as genuinely clean under the current, fixed gate.

This counts only real, real-cost `claude` CLI runs against real or hand-written
drafts (`runs/run-001` through `run-049`, the folders that exist in that range). It
excludes the zero-cost mock-CLI validation batch (`run-050`–`run-057`, §6) and the
deliberate bypass-test runs (`run-058`–`059`, documented separately in
`punch-out/bypass-test-evidence.md`), since those exist to test the orchestrator's
control flow and the punch-out gate itself, not to certify real content quality.

## 1. Methodology and exclusions

Real run folders in the `run-001`–`run-049` range: 48 exist on disk (`run-039` was
never created — a gap in the auto-incrementing ID, not a deleted run).

Of those 48, **17 are empty folders with zero audit-trail entries** — no
`audit-trail.jsonl`, no draft, nothing. These predate a working guardrail chain
entirely (0 logged steps means not even `outline-check`, the very first guardrail,
ever fired) and are excluded from the denominator below as dead stubs from early
pipeline scaffolding, not real attempts with a knowable outcome. They are: run-001
through run-012, run-015, run-016, run-019, run-047, run-049.

The remaining **31 runs have real recorded activity** (at least one audit-trail
entry, most with saved drafts/artifacts) and form the denominator for the headline
number above.

## 2. Outcome breakdown (31 substantive real runs)

**As historically recorded** (what each run's own terminal file says, unmodified):

| Outcome | Count | % | What it means |
|---|---|---|---|
| PASS | 5 | 16.1% | Reached `06-publish-kit.md` at the time it ran |
| PUNCH-OUT | 20 | 64.5% | A guardrail caught a problem and escalated to human review |
| INTERRUPTED | 6 | 19.4% | Process killed/crashed mid-run (timeout, manual kill, or unlogged stall) — no terminal state reached |
| FAIL (`failWorkflow`) | 0 | 0% | No real run in this range hit a technical/mechanical failure (`failures/` is empty for this range) |

**Reconfirmed under today's fixed `qa-gate.js`** (re-running `qaGate()` against the 6
saved `05-qa.md` reports from runs that reached Step 5 — `033`, `035`, `037`, `038`,
`040`, `046` — plus `041`, which reached qa-gate before being interrupted at Step 6):

| Outcome | Count | % | What it means |
|---|---|---|---|
| Confirmed clean PASS | 2 (`033`, `037`) | 6.5% | Genuinely clean — 0 blocking FAIL items under current code |
| Correct PUNCH-OUT (including 3 reclassified) | 22 | 71.0% | 20 historical + `035`/`038`/`040`, which the pre-fix gate incorrectly let through |
| INTERRUPTED (unchanged) | 6 | 19.4% | Not re-checkable — no terminal artifact to re-run the gate against for 5 of these; `041`'s saved QA report was re-checked and would also correctly punch out today |

**Correct-terminal-state rate (reconfirmed) = (2 + 22) / 31 = 24/31 = 77.4%.**
**Confirmed clean-PASS rate = 2/31 = 6.5%.**
**Correct-escalation rate (reconfirmed) = 22/31 = 71.0%.**

Full detail on the reclassified 3 runs and the fix that corrects `qa-gate.js` going
forward: `punch-out/bypass-test-evidence.md` §4–§5.

## 3. Run-by-run detail

| Run | Outcome | Grade | Last step reached | Cost (USD, estimated) |
|---|---|---|---|---|
| run-013 | PUNCH-OUT | — | outline-check | 0.09 |
| run-014 | PUNCH-OUT | — | outline-check | 0.09 |
| run-017 | INTERRUPTED | — | outline-check | 0.15 |
| run-018 | PUNCH-OUT | — | draft-check | 0.14 |
| run-020 | PUNCH-OUT | — | draft-check | 0.09 |
| run-021 | PUNCH-OUT | — | draft-check | 0.08 |
| run-022 | PUNCH-OUT | B | grade-gate | 0.49 |
| run-023 | PUNCH-OUT | — | draft-check | 0.23 |
| run-024 | PUNCH-OUT | ? (null-grade parse bug, since fixed) | grade-gate | 0.31 |
| run-025 | PUNCH-OUT | C | grade-gate | 0.31 |
| run-026 | PUNCH-OUT | C | grade-gate | 0.34 |
| run-027 | PUNCH-OUT | C | grade-gate | 0.47 |
| run-028 | PUNCH-OUT | C | grade-gate | 0.40 |
| run-029 | PUNCH-OUT | C | grade-gate | 0.38 |
| run-030 | PUNCH-OUT | — | draft-check | 0.07 |
| run-031 | INTERRUPTED | C (mid-loop) | voice-check | 0.49 |
| run-032 | PUNCH-OUT | — | draft-check | 0.16 |
| **run-033** | **PASS (confirmed)** | **A** | blog-refinement | 0.20 |
| run-034 | PUNCH-OUT | D | grade-gate | 0.37 |
| run-035 | ~~PASS~~ → **PUNCH-OUT on re-check** | B | blog-refinement (historically); banned word "empower" missed by pre-fix gate | 0.39 |
| run-036 | PUNCH-OUT | — | draft-check | 0.17 |
| **run-037** | **PASS (confirmed)** | B | blog-refinement | 0.25 |
| run-038 | ~~PASS~~ → **PUNCH-OUT on re-check** | B | blog-refinement (historically); unlinked stat + `[INSERT DIAGRAM]` placeholder missed by pre-fix gate | 0.25 |
| run-040 | ~~PASS~~ → **PUNCH-OUT on re-check** | B | blog-refinement (historically); banned phrase "table stakes" missed by pre-fix gate | 0.41 |
| run-041 | INTERRUPTED | B | qa-gate (reached, but no terminal file written) | 0.38 |
| run-042 | INTERRUPTED | — | outline-check | 0.12 |
| run-043 | PUNCH-OUT | — | draft-check | 0.21 |
| run-044 | INTERRUPTED | — | outline-check | 0.12 |
| run-045 | PUNCH-OUT | — | draft-check | 0.21 |
| run-046 | PUNCH-OUT | B | qa-gate | 0.33 |
| run-048 | INTERRUPTED | — | outline-check | 0.00 |
| run-061 | PUNCH-OUT | C | grade-gate | ~0.45 |
| run-062 | PUNCH-OUT | B | qa-gate | ~0.60 |
| run-063 | PUNCH-OUT | B | qa-gate | ~0.65 |
| run-065 | PUNCH-OUT (mis-routed to publish-kit by a since-fixed bug — see §10) | B | qa-gate (real terminal state) | ~0.70 |
| **run-066** | **PASS (confirmed, genuine production-length)** | **B** | blog-refinement | 0.46 |

Total estimated real-run cost across the original 31 runs: **~$6.87** (token-estimate
based, per `monitoring/audit-logger.js`'s 1-token≈4-char heuristic — not billed API
cost, since these runs used the `claude` CLI's own subscription auth, not a metered
key). `run-061`/`062`/`063`/`065`/`066` (session 13–14, full production-length runs,
added above) bring the running total across all 36 substantive real runs to
**~$9.73**.

## 4. On the INTERRUPTED category

Six runs (017, 031, 041, 042, 044, 048) show real logged activity but no terminal
file. These are not counted as PASS or PUNCH-OUT because the pipeline did not
actually reach a decision — they are process-level interruptions (a `claude` CLI
timeout, a manual kill during a 30+ minute run, or a stall that predates today's
`failWorkflow()` split). Per the session notes, run-026 and run-031 are documented
examples of exactly this — a process interruption, not a guardrail or grading bug.
They are deliberately kept in `runs/` as iteration evidence (see the "show iteration
over time" requirement) but excluded from the success-rate denominator because they
don't represent a completed attempt to evaluate.

## 5. Trend: iteration over time, not just a final PASS

The run history shows a clear before/after around the session-2 (2026-09-27) bug
fixes documented in `feedback-pipeline-debugging.md` and the KB:

- **run-013 → run-030** (pre-fix era): 15 of 16 substantive runs punch out, mostly at
  `draft-check` or `grade-gate`, including three real bugs later fixed — the
  `gradeGate()` field-name mismatch (run-024's null-grade parse), the missing
  position-aware contrast-negation check, and the XML tool-call wrapper leaking into
  grading input. Zero clean PASSes in this window.
- **run-033 → run-040** (post-fix era, first pass): 5 runs logged PASS at the time
  (033, 035, 037, 038, 040) against 3 punch-outs (034, 036, plus 043/045/046 slightly
  later) — the punch-outs in this window are real content/quality catches (grade D,
  missing-placeholder drafts, a real QA FAIL), not code bugs. This is the shift the
  certification framework asks to see: same guardrails, but the failures move from
  "our own bugs" to "the gate correctly catching real problems." **However**, 3 of
  those 5 PASSes (035, 038, 040) turned out to still be riding a second, un-noticed
  `qa-gate.js` bug — see §1's headline correction and `punch-out/bypass-test-
  evidence.md` §4 — leaving only 033 and 037 as genuinely clean under today's code.
- **Second fix layer (2026-09-27, session 12):** the bypass-test investigation
  found and fixed the `qa-gate.js` regex bug above, discovered that checkpoint 5D
  (publication kit) fails structurally on every run by design (Step 5 reviews the
  article before Step 6 generates the kit), and — with Chetan's direction — made 5D
  non-blocking the same way 4A (word count) already was. This is the kind of
  iteration the certification framework is asking to see evidence of: not just "the
  gate works," but "we found where it didn't, understood why, and fixed it with a
  documented before/after."

## 6. Mock-CLI validation batch (excluded from the headline number, documented for completeness)

`run-050` through `run-057` (8 runs, git-untracked, zero real API cost) used
`workflow/mock-claude-cli.js` to exercise the orchestrator's branching logic itself
(redraft-loop convergence, punch-out vs. failure routing, word-count exception
handling) without spending real CLI calls. Outcomes: 2 PUNCH-OUT (050, 053), 6 PASS
(051, 052, 054–057). These validate the **orchestration logic**, not content quality —
see the workflow's own evaluation writeup for how this batch is used as evidence
there. They are excluded from §2's real-content success rate because a mock CLI
returns canned text, not a real model's judgment.

## 7. Bypass-test runs (excluded from the headline number, documented separately)

`run-058` (guard disabled) and `run-059` (guard restored) are the active punch-out
bypass test required by the Stage 4 framework ("punch-out points that exist on paper
but were never tested do NOT qualify"). Full before/after writeup, including the
specific defect used, the unsafe pass-through in `058`, the correct punch-out in
`059`, and the `qa-gate.js` findings/fixes this test uncovered (§4–§5 above), is in
`punch-out/bypass-test-evidence.md`.

## 8. First real production-length run post-fixes (session 13)

`run-061` — `test-data/AI ROI and Business Value Measuring What Actually Matters.txt`,
full production word count (800–1,600, no `--draft`/`--short` shortcut) — is the
first attempt at the genuine certification-representative run this project has been
missing since session 12's wrap-up. Result: **PUNCH-OUT at `grade-gate`**, Grade C
on the first pass, one revision through `blog-refinement` (targeted smell-fix),
still Grade C, correctly stopped at the 2-attempt cap. `ai-smell-test`'s own report
(`runs/run-061/04-graded.md`) names concrete, real content defects — four unsourced
statistics (including the headline "70%" claim), the named expert (Marcus Velez)
never credentialed, and two unresolved `[INSERT DIAGRAM]` placeholders — not a
guardrail or parsing bug. This is a correct, valid terminal state and real evidence
the pipeline works end-to-end on production-length content, but it is a PUNCH-OUT,
not the PASS still needed. Next attempt should try a different transcript from the
still-pending validation batch (3 of 5 InfraCloud webinars, 4 of 5 Improving Podcast
transcripts never run — see the KB's session-12 note) rather than retrying this one,
since this transcript's source material itself (unattributed stats, uncredentialed
expert) is the likely root cause, not something a redraft can fix without editing
the transcript.

## 9. First run against the blog-draft-writer prompt fixes (session 13)

`run-062` — `test-data/Improving Podcast - The Clarity Multiplier AI In the Human
Loop.txt`, full production length, run against the same-session `blog-draft-writer.md`
changes (Statistic & Attribution Discipline, Contrast-Negation Avoidance, `[NEEDS
SOURCE: ...]` tag). Result: **cleared `ai-smell-test` on the first pass (Grade B, no
revision loop)** — checkpoints 2A/2B/2C (grounded in transcript, no invented examples,
gaps acknowledged) all PASS, with the two `[INSERT DIAGRAM]` placeholders explicitly
called out as legitimate rather than penalized. This is the first run where neither
category the prompt changes targeted (unsourced stats, uncredentialed experts,
contrast negation) shows up as a finding. Still **PUNCH-OUT**, at `qa-gate` — on two
unrelated, real issues the prompt change didn't target: "stakeholders" used 6 times
(a banned vague noun) and a near-verbatim restated point across two sections. A
legitimate content-quality catch, not a bug.

`run-063` — `test-data/Improving Podcast - AI-Ready Data The New Benchmark of
Enterprise Competitiveness.txt`, same prompt fixes — repeats the pattern. Grade B on
`ai-smell-test` (contrast negation 8/10, one minor bare tail — clean relative to
audit history); checkpoint 2A only WARN (an unattributed technical claim, not a
FAIL), 2B/2C PASS. Still **PUNCH-OUT** at `qa-gate`, again on two different,
unrelated real issues: "journey" (a banned vague word) in the closing section, and
the Failure Modes section's three subsections all following an identical mirror
structure (Category 3C, AI patterns). Two runs in a row now clear the targeted
categories cleanly and punch out on other real content issues each time —
consistent with the pipeline working as designed rather than a fluke. Net read: the
targeted fix appears to be working; the still-missing genuine PASS may need either a
cleaner source transcript or a next round of draft-writer instructions targeting
banned-word density and structural mirroring specifically.

## 10. A real qa-gate bug found live, fixed, and the first genuine production-length PASS (session 14, 2026-09-28)

`run-065` — `test-data/Improving Podcast - Orchestrating AI Agents The New Scarce
Skill.txt`, full production length, banned-word tiered revision fix (`bf0288e`)
live for its first real test. Took the full 3-attempt draft budget (contrast-negation,
then word count), one grade-gate revision (contrast negation reintroduced during
`blog-refinement`, fixed via a second targeted pass), then cleared `grade-gate`
at Grade B. Reached `06-publish-kit.md` — but this was wrong. `05-qa.md`'s own
report says `### Verdict: FAIL`, with a real checkpoint 3A (POV consistency) FAIL:
podcast transcript language ("the host cited a report") leaked into the article
instead of the SME's name. `qa-gate.js`'s audit-trail entry read
`qa-gate | pass | all checks PASS/WARN` — wrong, because the reviewer bolded that
row's FAIL cell (`| 3A | POV consistency | **FAIL** | ... |`) and the FAIL-row
regex only matched an unbolded `| FAIL |` cell. Same class of bug as the session-10
finding (n20), recurring under a new markdown-formatting variant the reviewer had
never used before.

**Fixed same session** (`guardrails/qa-gate.js`, commit `295aa7a`): FAIL_PATTERNS
(and the informational WARN pattern) now tolerate `*`/`_` emphasis around the cell
value. Added a regression test using `run-065`'s exact row; independently verified
by running the fixed `qaGate()` directly against `runs/run-065/05-qa.md` — now
correctly returns `decision: 'punch-out'`. Local suite: 40/40. `run-065`'s
`06-publish-kit.md` is kept as evidence but is **not a valid PASS** — see
`runs/run-065/BUG-NOTE.md`.

`run-066` — `test-data/Improving Podcast - The Nearshore Advantage Building Teams
That Scale 10x.txt`, run immediately after with the fix live. Every step passed on
the **first attempt with zero revision loops**: draft-check, contrast-negation,
voice-check, and grade-gate (Grade B, 7.65 weighted) all clean on attempt 1. Word
count 1,617 (within the 3% tolerance band above the 1,600 ceiling). QA verdict:
**CONDITIONAL PASS**, 0 blocking FAIL items, 7 non-blocking WARNs (two `[NEEDS
SOURCE]`-flagged stats, some rhetorical-pattern notes — none of them defects the
gate needs to block on). Independently reconfirmed by running the fixed
`qaGate()` directly against the real `05-qa.md`: `decision: 'proceed'`,
`failCount: 0` — confirming this is a genuine pass under the just-fixed gate, not
a repeat of the `run-065` bug. Reached `06-publish-kit.md` with a real refined
article and SEO kit. Total cost: $0.46.

**This is the certification-representative run the project has been missing since
session 12.** It is the first genuinely clean, full production-length, no
`--draft`/`--short` pass in the project's history, obtained on the very next
attempt after fixing a real bug the previous attempt exposed — itself exactly the
kind of "found a real problem, fixed it, proved the fix" iteration evidence the
Stage 4 framework asks to see.
