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

**25 of 31 substantive real runs (80.6%) reached a terminal state as-recorded at the
time** — either a PASS or a guardrail escalating to PUNCH-OUT. **After a
reproducibility check against today's fixed `qa-gate.js`, the confirmed-correct
figure is 24/31 (77.4%): 2 confirmed clean PASS (6.5%), 22 correct PUNCH-OUT (71.0%),
and 6 INTERRUPTED (19.4%, unchanged).**

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

Total estimated real-run cost across these 31 runs: **~$6.87** (token-estimate based,
per `monitoring/audit-logger.js`'s 1-token≈4-char heuristic — not billed API cost,
since these runs used the `claude` CLI's own subscription auth, not a metered key).

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
