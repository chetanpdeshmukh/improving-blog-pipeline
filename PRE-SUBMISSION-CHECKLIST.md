# Stage 4 Pre-Submission Checklist

Master audit doc — work through this before zipping and submitting. Sourced directly
from Improving's Stage 4 Certification SharePoint page ("What We Examine" + the
accompanying narrative), not inferred from precedent. Every item below is either
✅ **done** (with the exact file/path that proves it), ⚠ **partial** (something exists
but doesn't fully meet the bar), or ❌ **missing**.

Do not submit while any item below is ❌. Re-run this checklist any time the pipeline
changes materially, and update the status markers — this file should reflect the
repo's real state at submission time, not a snapshot from when it was written.

Last audited: 2026-09-27 (session 11).

---

## 1. Workflow Definition

> "A file describing the multi-step workflow connecting validated Stage 3 agents."

- [x] **Multiple Stage 3 agents wired into an end-to-end workflow** — `workflow/workflow-definition.md` documents all 6 steps (transcript-analysis → blog-draft-writer → anti-ai-voice → ai-smell-test → blog-qa-reviewer → blog-refinement), each backed by a certified Stage 3 skill in `prompts/`.
- [x] **Handoffs and branching logic documented** — `workflow-definition.md` §"Branching Summary" and §"Handoff Schemas".
- [ ] **Every agent passes its Stage 3 quality bar (95%+ on real work)** — ⚠ **PARTIAL.** All 5 skills (anti-ai-voice, blog-qa-reviewer, ai-smell-test, transcript-analysis, blog-draft-writer) are Stage 3 certified per prior session work, but the workflow-definition doc does not currently **cite** each skill's actual pass rate/certification evidence inline. Action: add a table to `workflow-definition.md` (or this doc) listing each of the 5 skills with its certification date and measured pass rate, linking to the Stage 3 evidence files (`anti-ai-voice Stage 3 Certification Evidence.md`, `blog-qa-reviewer-evals.json`, `anti-ai-voice-evals.json`, `skill-certification-logs.md` — all in the parent folder, not yet copied into this repo).
- [ ] **No agents that still require regular manual correction** — ⚠ **PARTIAL.** True in the sense that no step currently requires a human to hand-edit output before the next step runs. But this needs to be stated explicitly and backed by evidence (the run history) rather than left implicit — add a line to workflow-definition.md or the README asserting this and pointing at the run history / audit trail as proof.
- [ ] **The workflow itself is a Stage 3 prompt and needs to be evaluated individually** — ❌ **MISSING.** This is a specific, separate requirement from "each step's own Stage 3 eval" — it's asking whether the *orchestration/branching logic itself* has been evaluated as its own artifact. We have `workflow/test-guardrails-local.js` (33 assertions on the deterministic guardrail *functions*) and the mock-CLI batches (`workflow/mock-claude-cli.js`, run-051 through run-057) that exercise the *orchestrator's* branching/redraft/escalation behavior specifically. **Action: write this up explicitly as the workflow's own evaluation** — a short doc or section describing what was tested (redraft loop convergence, word-count exception routing, punch-out vs. failure routing, grade-gate/qa-gate branching) and the pass criteria, framed as "this is the Stage 3-style eval of the orchestration prompt/logic itself," not just "we ran some tests."

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
- [ ] **Actively tested — someone attempted to bypass and was blocked** — ❌ **MISSING.** This is the single highest-priority gap. None of the ~20 real punch-out records in `punch-out/` currently document an intentional bypass attempt. **Action (before submission):** comment out `qa-gate`'s (or `grade-gate`'s) check in `run-workflow.js`, run a real transcript through the full pipeline, document that it produced an unsafe pass-through (a bad draft reaching `06-publish-kit.md` despite a real content defect), restore the guard, run the same transcript again, confirm punch-out fires correctly. Write both outcomes up in `punch-out/bypass-test-evidence.md`. Aishwarya's certified submission is the reference shape for this.
- [ ] **`punch-out/punch-out-policy.md`** — ❌ **MISSING.** Needs to state: which checks can punch out (contrast-negation exhaustion, draft-check structural defects, grade-gate C/D/F, qa-gate FAILs) vs. which are failures instead (outline-check schema errors, CLI/tooling errors — see `failures/`); that punch-out output is written for a human reviewer, never surfaced raw to whoever requested the blog; and that word count is deliberately excluded from ever triggering either state (session 11 policy decision — see `workflow/run-workflow.js` and `guardrails/qa-gate.js`'s `WORD_COUNT_ROW_PATTERN` exclusion).
- [x] **Clear separation of "fail workflow" (automated) vs "punch to human" (manual)** — implemented this session: `failures/` vs. `punch-out/`, see `workflow/run-workflow.js`'s `punchOut()`/`failWorkflow()` doc comments for the exact routing rule.

## 4. End-to-End Success Rate

> "A report showing the end-to-end success rate across the full workflow. The
> end-to-end number — not just per-step accuracy. If you don't know your end-to-end
> number, you haven't reached Stage 4."

- [ ] **`results/e2e-success-rate-report.md` (or equivalent)** — ❌ **MISSING.** `results/` is currently empty. **Action:** compile the full run history (`runs/run-001` through the latest) into a table: run ID, transcript, outcome (PASS / PUNCH-OUT / FAIL / revision-loop), grade, cost. Compute the headline end-to-end number (e.g. "N of M runs reached a correct terminal state — X% — of which Y% were clean PASS and Z% were correct PUNCH-OUT/FAIL escalations").
- [ ] **The end-to-end number specifically, not just per-step** — tie directly to the above: the report's headline metric must be "did the run reach the RIGHT terminal state end-to-end," not "did each individual guardrail pass in isolation."
- [ ] **Trend showing stability or improvement over time** — the run history already has this shape naturally (run-022 dummy → run-023 first real punch-out → ... → run-057 clean); the report should present it as a trend, not just a final tally, matching what the KB's own session notes already narrate.

## 5. Audit Trail

> "An artifact demonstrating any failure can be traced to its origin step. Structured
> logs identifying which step produced which output. Per-step model and token/cost
> data. Coverage of all workflow steps, not just some."

- [x] **Structured logs identifying which step produced which output** — `monitoring/audit-logger.js`, writing `runs/<runId>/audit-trail.jsonl`.
- [x] **Trace a specific failure to its exact origin step** — every `logStep()` call records a `step` field; verified directly (e.g. `runs/run-046/audit-trail.jsonl` line 1: `"step":"transcript-analysis"`).
- [x] **Per-step model and token/cost data** — verified: `{"model":"claude-sonnet-4-6","input_tokens":17063,"output_tokens":5998,"total_tokens":23061,"cost_usd":0.141159,...}` for AI steps; guardrail-only steps correctly log `model: null, cost_usd: 0` rather than omitting the fields.
- [x] **Coverage of all workflow steps, not just some** — confirmed every step (all 6 AI steps + every guardrail, including redraft/revision-loop attempts) gets its own audit-trail line, not just the terminal outcome.

## 6. Repo hygiene (not a scored artifact, but affects how ready the submission looks)

- [ ] Move loose top-level scripts (`run-all-tests.sh`, `run-batch-session9*.sh`) into a `scripts/` folder or wire as `npm run` targets.
- [ ] Move or delete loose session log files at root (`session9-*.log`, `session10-*.log`).
- [ ] Fix the drift between `workflow/workflow-definition.md`'s documented run-folder filenames (`step-1-outline.md`, `punch-out-record.json`, etc.) and the real ones on disk (`01-outline.json`, `punch-out.json`, `failure.json`, etc.) — pick one and make them match.
- [ ] `README.md` — **optional per the official framework**, but still worth writing: workflow diagram, folder map, run instructions, and — modeled on the strongest reference submissions — an artifact-checklist table mirroring this file's structure, so "Tim" doesn't have to open this whole doc to see the headline status.

---

## How to use this doc

Before zipping: walk every unchecked box top to bottom. Each ❌/⚠ item names the exact
action needed and the file it produces. Don't check a box until the file actually
exists and is committed — this doc is an audit gate, not a to-do list to feel good
about.
