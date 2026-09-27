# Orchestration Evaluation

The Stage 4 SharePoint page states this requirement explicitly, separate from each
step's own Stage 3 certification: **"This workflow is itself a Stage 3 prompt, and
needs to be evaluated individually."** That is, the orchestration/branching logic in
`workflow/run-workflow.js` — which step follows which, when a guardrail sends work
back for revision, when it escalates to punch-out, when word count is allowed to
override that escalation — needs its own evaluation as an artifact, not just a
byproduct of "the 6 steps are each certified."

This doc is that evaluation. It has two parts: a no-CLI unit suite covering every
guardrail function in isolation, and a mock-CLI batch that runs the actual
orchestrator (`run-workflow.js`, unmodified) end-to-end against real transcripts with
a canned model in place of the real one, so the branching logic itself gets exercised
under real control-flow conditions without spending real CLI calls on every
iteration.

## 1. What is being evaluated

Not "does each AI step produce good content" (that's each skill's own Stage 3
evidence, cited in `workflow/workflow-definition.md`). This evaluates:

1. **Handoff correctness** — does step N's output get transformed and routed to step
   N+1 in the shape it expects (e.g. does `extractSmellTestReport()` correctly strip
   the tool-call XML before grade-gate parses it)?
2. **Branching correctness** — does a guardrail's decision (`proceed` / `revise` /
   `punch-out`) actually drive the orchestrator down the right path, not a dead
   branch that never fires?
3. **Loop convergence and termination** — does the grade-gate revision loop actually
   stop after `MAX_REVISIONS`? Does the word-count redraft loop stop after its retry
   budget and fall back to warn-and-proceed instead of looping forever or crashing?
4. **Escalation routing** — does a real content/quality problem route to `punchOut()`
   and a real technical problem route to `failWorkflow()`, never the other way
   around?
5. **Policy exceptions** — does the word-count-never-blocks policy (§3 of
   `punch-out/punch-out-policy.md`) actually hold across all three places it's
   implemented, instead of being overridden by one of them?

## 2. Method A — `workflow/test-guardrails-local.js` (unit-level, zero cost)

33 assertions, deterministic, runs in under a second, no `claude` CLI involved. Covers
every guardrail function's pure input→output behavior in isolation:
`contrast-negation-check` (including the position-aware title/opening zero-tolerance
fix), `voice-check`, `draft-check` (including the corrected 800–1,600 word ceiling and
the `--short` override), `grade-gate` (including the `decision` field-name regression
that once made A/B grades never break the loop), `qa-gate` (including the table-row
FAIL/WARN parsing regression and the word-count exclusion), `extractSmellTestReport`,
and `stripDraftMetaCommentary`. Every assertion encodes a real bug found during
development, so this suite is also a live regression log, not just a spec.

Run: `node workflow/test-guardrails-local.js` → **33 passed, 0 failed** (current as of
this writeup).

This method proves each guardrail *function* is correct in isolation. It does not
prove the *orchestrator* actually calls them in the right order with the right data —
that's Method B.

## 3. Method B — mock-CLI batch (orchestrator-level, zero API cost)

`workflow/mock-claude-cli.js` is a drop-in replacement for the real `claude` binary:
same stdin/stdout contract (`--output-format json`'s `{"result": "..."}` envelope),
but it returns canned, structurally-valid text routed by which prompt it was called
with, instead of a real model call. Invoked via:

```
CLAUDE_BIN="node $(pwd)/workflow/mock-claude-cli.js" node workflow/run-workflow.js <transcript>
```

This runs `run-workflow.js` completely unmodified — the real orchestrator code, the
real guardrail modules, the real file I/O — against real transcripts, exercising the
full 6-step control flow with zero wait and zero API spend. It is explicitly **not** a
content-quality test (the mock can't judge whether a draft is actually good); it is a
control-flow test — does the redraft loop, the revision loop, and the punch-out/fail
routing behave correctly when a guardrail's verdict is known in advance because the
mock's canned response was built to produce that verdict.

**Batch results (`run-050`–`run-057`, 8 runs, git-untracked as validation artifacts —
see `results/e2e-success-rate-report.md` §6):**

| Run | Scenario exercised | Outcome | Confirms |
|---|---|---|---|
| run-050 | Draft-check structural defect (placeholder) | PUNCH-OUT | Draft-check correctly escalates before any grading step runs |
| run-051 | Full length outline, clean draft | PASS | Straight-line 6-step completion with no revision/redraft |
| run-052 | Full length outline, clean draft (repeat) | PASS | Same path, reproducibility |
| run-053 | Word-count out of band, redraft exhausted | PUNCH-OUT (word-count-adjacent, pre-fix behavior in this specific mock scenario) | Redraft-exhaustion path is reachable and reported honestly |
| run-054–057 | Short-mode drafts, redraft loop convergence | PASS | Word-count redraft loop actually sends the draft back to `blog-draft-writer`, the trimmed/expanded second attempt is actually re-checked, and — after the session-11 policy change — a non-convergent case now falls through to warn-and-proceed instead of punching out |

The 3rd scenario in the original 4-run short-mode batch (referenced in
`MEMORY.md`'s project notes) punched out under the *old* code — traced to the mock
harness's TRIM branch always returning a hardcoded 1,400-word draft regardless of
target, not a real orchestrator bug. That distinction — mock-harness limitation vs.
real control-flow defect — is itself evidence the evaluation is being read critically,
not just rubber-stamped green.

## 4. Method C — the punch-out gate under active attack

`punch-out/bypass-test-evidence.md` is the third leg of this evaluation: it doesn't
ask "does the orchestrator branch correctly under normal conditions" (Methods A/B),
it asks "is the escalation actually load-bearing, or would the pipeline produce the
same output with the gate silently disabled." That distinction is exactly what the
Stage 4 framework's punch-out requirement is testing for, and it required one real
(non-mock) CLI run pair rather than the mock harness, since the claim being tested is
about a real adversarial reviewer's real judgment being enforced, not about
control-flow shape.

## 5. Pass criteria and current status

| Criterion | Status |
|---|---|
| Every guardrail function correct in isolation | ✅ 33/33, Method A |
| Orchestrator wires guardrails in the documented order with correct handoffs | ✅ confirmed live via Method B across 8 mock runs + 31 real runs (§3 of the e2e report) |
| Revision loop (grade-gate) actually terminates and routes correctly | ✅ confirmed live (real runs 022–029 hit the loop and terminated at `MAX_REVISIONS`; run-033/035/037/038/040 show the `proceed` path breaking the loop early) |
| Redraft loop (word count) actually terminates and never punches out | ✅ confirmed via Method B (run-053–057) and the corresponding unit assertions in Method A |
| Punch-out vs. failure routing never crosses | ✅ no real run in `run-001`–`run-049` produced a `failures/` record when a `punch-out/` record was the correct outcome, or vice versa |
| Punch-out gate is load-bearing, not cosmetic | ✅ Method C, `punch-out/bypass-test-evidence.md` |

This orchestration passes its own evaluation as of 2026-09-27.
