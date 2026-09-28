# Stage 4 Pre-Submission Checklist

Master audit doc — work through this before zipping and submitting. Sourced directly
from Improving's Stage 4 Certification SharePoint page ("What We Examine" + the
accompanying narrative), not inferred from precedent. Every item below is either
✅ **done** (with the exact file/path that proves it), ⚠ **partial** (something exists
but doesn't fully meet the bar), or ❌ **missing**.

Do not submit while any item below is ❌. Re-run this checklist any time the pipeline
changes materially, and update the status markers — this file should reflect the
repo's real state at submission time, not a snapshot from when it was written.

Last audited: 2026-09-27 (session 13; §1's two partial items closed this session).

---

## 1. Workflow Definition

> "A file describing the multi-step workflow connecting validated Stage 3 agents."

- [x] **Multiple Stage 3 agents wired into an end-to-end workflow** — `workflow/workflow-definition.md` documents all 6 steps (transcript-analysis → blog-draft-writer → anti-ai-voice → ai-smell-test → blog-qa-reviewer → blog-refinement), each backed by a certified Stage 3 skill in `prompts/`.
- [x] **Handoffs and branching logic documented** — `workflow-definition.md` §"Branching Summary" and §"Handoff Schemas".
- [x] **Every agent passes its Stage 3 quality bar (95%+ on real work)** — done session 13. `workflow/workflow-definition.md`'s new "Stage 3 Certification Evidence Per Skill" section cites each of the 5 skills' certification date and measured pass rate inline, with an honest caveat noted on `anti-ai-voice` (a separate, more rigorous evidence doc scores it PARTIAL on 4/7 formal criteria despite passing pipeline-use eval). Source evidence files copied verbatim into `references/stage3-certification/` so a reviewer doesn't need the original Cowork project folder.
- [x] **No agents that still require regular manual correction** — done session 13. `workflow-definition.md`'s new section states this explicitly, backed by the run history: every run proceeds AI-step-output → guardrail with no human edit in between; the only human-in-the-loop point is the terminal punch-out escalation, not a correction.
- [x] **The workflow itself is a Stage 3 prompt and needs to be evaluated individually** — `workflow/orchestration-eval.md` (added session 12). Covers `workflow/test-guardrails-local.js` (36 assertions on the deterministic guardrail functions), the mock-CLI batch (`run-050`–`057`, orchestrator control-flow under a canned model), and the punch-out bypass test (`punch-out/bypass-test-evidence.md`, is the gate itself load-bearing) as three distinct evaluation methods with explicit pass criteria.

## 2. Guardrails

> "Deterministic validation checks positioned between workflow steps."

- [x] **Adversarial review agents that challenge prior step outputs** — `prompts/blog-qa-reviewer.md`, gated by `guardrails/qa-gate.js`.
- [x] **Hooks & sentinel files for deterministic runtime checks** — `guardrails/outline-check.js`, `draft-check.js`, `voice-check.js`, `contrast-negation-check.js`, `grade-gate.js`, `qa-gate.js`. Each is plain JS, zero AI calls, positioned between steps in `workflow/run-workflow.js`.
- [x] **Guardrails sit BETWEEN steps, not inside them** — confirmed by reading `run-workflow.js`: every guardrail call happens after a step's `runStep()` call returns and before the next step is invoked.
- [x] **Must be automated — human review between steps is Stage 2, not Stage 4** — no step waits on human input; only genuine punch-out (§3 below) stops for a human, and that's a terminal state, not an inline review gate.

## 3. Punch-Out Evidence

> "Documentation of human escalation points with active bypass testing. Punch-out points
> that exist on paper but were never tested do NOT qualify."

- [x] **Explicit human decision points where the workflow must stop for sign-off** — `punch-out/` (grade stuck at C/D/F, real QA content-quality FAILs, contrast-negation exhaustion, draft-check structural defects). As of this session, cleanly separated from `failures/` (technical/mechanical breakage — CLI errors, malformed outline JSON) per the framework's explicit "fail workflow (automated) vs. punch to human (manual)" distinction — see `workflow/run-workflow.js`'s `punchOut()` vs. `failWorkflow()`.
- [x] **Actively tested — someone attempted to bypass and was blocked** — `punch-out/bypass-test-evidence.md` (added session 12). `qa-gate`'s punch-out call was commented out in `run-workflow.js`, a defective draft was run through the real pipeline (`run-058`) and reached `06-publish-kit.md` despite `qa-gate` detecting real FAIL items (logged but not enforced) — the unsafe pass-through. The guard was restored (confirmed via `git diff` showing zero delta), the same draft rerun unmodified (`run-059`), and it correctly punched out at `qa-gate` with no `06-publish-kit.md` produced. The same investigation also caught and fixed a real, unintentional bypass in the run history — see below.
- [x] **`punch-out/punch-out-policy.md`** — added session 12. States which checks can punch out vs. which are failures instead (see `failures/`); that punch-out output is written for a human reviewer, never surfaced raw to whoever requested the blog; and that word count (4A) and publication-kit-presence (5D) are both deliberately excluded from ever triggering either state.
- [x] **(Bonus finding, not an official checklist item)** The bypass-test investigation found that 3 of the previously-recorded PASS runs (`035`, `038`, `040`) rode a real, un-noticed `qa-gate.js` bug (fixed same day, pre-session-12, but never re-verified against those runs) that let real content defects through undetected — effectively an unintentional version of the same failure mode the bypass test checks for. Documented and corrected in `results/e2e-success-rate-report.md` and `punch-out/bypass-test-evidence.md` §4. A second structural issue (checkpoint 5D always failing by design) was found and fixed with Chetan's direction in the same pass — see `punch-out/bypass-test-evidence.md` §5.
- [x] **Clear separation of "fail workflow" (automated) vs "punch to human" (manual)** — implemented this session: `failures/` vs. `punch-out/`, see `workflow/run-workflow.js`'s `punchOut()`/`failWorkflow()` doc comments for the exact routing rule.

## 4. End-to-End Success Rate

> "A report showing the end-to-end success rate across the full workflow. The
> end-to-end number — not just per-step accuracy. If you don't know your end-to-end
> number, you haven't reached Stage 4."

- [x] **`results/e2e-success-rate-report.md` (or equivalent)** — added session 12, updated through session 14. Full run-by-run table (`run-001` through `run-066`), outcome, grade, cost, plus a reproducibility re-check of every run that reached `qa-gate` against today's fixed code.
- [x] **The end-to-end number specifically, not just per-step** — headline: **29/36 substantive real runs (80.6%) reached the correct terminal state**, including 3 confirmed clean PASS (`033`, `037`, `066`) — see the report's Headline and §10 for the full reasoning.
- [x] **Trend showing stability or improvement over time** — report §5 narrates the pre-fix era (run-013→030, zero clean passes, mostly code-bug punch-outs) vs. post-fix era (run-033→040, real content-quality punch-outs), the second fix layer found during the bypass test (session 12), and (§10, session 14) a real `qa-gate.js` bug found live on `run-065`, fixed same-session, with `run-066` — a genuine full production-length, first-attempt clean PASS — landing on the very next real run.

**Session 14 update (2026-09-28): the genuine full production-length clean PASS is now in hand.** `run-066` cleared every step on the first attempt with zero revision loops (Grade B, QA verdict CONDITIONAL PASS, 0 blocking FAILs), independently reconfirmed against the fixed `qaGate()`. This was the last real evidence gap this checklist was tracking (previously only 2 confirmed-clean PASSes existed, both non-production-length shortcuts). All 5 required Stage 4 artifacts are now substantively complete with a genuinely representative PASS backing them.

## 5. Audit Trail

> "An artifact demonstrating any failure can be traced to its origin step. Structured
> logs identifying which step produced which output. Per-step model and token/cost
> data. Coverage of all workflow steps, not just some."

- [x] **Structured logs identifying which step produced which output** — `monitoring/audit-logger.js`, writing `runs/<runId>/audit-trail.jsonl`.
- [x] **Trace a specific failure to its exact origin step** — every `logStep()` call records a `step` field; verified directly (e.g. `runs/run-046/audit-trail.jsonl` line 1: `"step":"transcript-analysis"`).
- [x] **Per-step model and token/cost data** — verified: `{"model":"claude-sonnet-4-6","input_tokens":17063,"output_tokens":5998,"total_tokens":23061,"cost_usd":0.141159,...}` for AI steps; guardrail-only steps correctly log `model: null, cost_usd: 0` rather than omitting the fields.
- [x] **Coverage of all workflow steps, not just some** — confirmed every step (all 6 AI steps + every guardrail, including redraft/revision-loop attempts) gets its own audit-trail line, not just the terminal outcome.

## 6. Repo hygiene (not a scored artifact, but affects how ready the submission looks)

- [x] Move loose top-level scripts (`run-all-tests.sh`, `run-batch-session9*.sh`) into a `scripts/` folder or wire as `npm run` targets. Done session 14 — moved to `scripts/`, fixed their `cd` logic (they used to `cd` into their own directory, which was fine at root but would have broken relative `test-data/` paths once moved) to resolve to the repo root instead.
- [x] Move or delete loose session log files at root (`session9-*.log`, `session10-*.log`). Done session 14 — moved to `logs/` (kept, not deleted, per the project's iteration-evidence policy).
- [x] Fix the drift between `workflow/workflow-definition.md`'s documented run-folder filenames (`step-1-outline.md`, `punch-out-record.json`, etc.) and the real ones on disk (`01-outline.json`, `punch-out.json`, `failure.json`, etc.) — corrected session 12, along with the stale revision-loop routing (blog-draft-writer → now correctly documented as blog-refinement) and the phantom `workflow-result.json` file that was never implemented.
- [x] `README.md` — **optional per the official framework**, but still worth writing. Done session 14: workflow diagram, folder map, run instructions, eval instructions, and an artifact-checklist table mirroring this file's structure.

---

## How to use this doc

Before zipping: walk every unchecked box top to bottom. Each ❌/⚠ item names the exact
action needed and the file it produces. Don't check a box until the file actually
exists and is committed — this doc is an audit gate, not a to-do list to feel good
about.
