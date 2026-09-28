# Blog Pipeline — Stage 4 Certification Submission

A 6-step agentic workflow that turns a raw podcast/webinar transcript into a
publication-ready blog article with an SEO kit, gated end-to-end by
deterministic guardrails and adversarial review agents. Every AI step is a
Stage 3-certified skill; the orchestration itself is evaluated as its own
Stage 3 prompt (see `workflow/orchestration-eval.md`).

## Workflow at a glance

```
transcript.txt
     |
     v
[1] transcript-analysis  --outline-check-->  01-outline.json
     |
     v
[2] blog-draft-writer  --draft-check, contrast-negation-check-->  02-draft.md
     |                        ^ redraft loop (max 3 attempts) on structural
     |                          defects: placeholders, word count, contrast
     |                          negation
     v
[3] anti-ai-voice  --voice-check, contrast-negation-check-->  03-cleaned.md
     |
     v
[4] ai-smell-test  --grade-gate-->  04-graded.md   (Grade A-F)
     |                  ^ revision loop (max 2) via blog-refinement on a
     |                    failing grade (C/D/F) -- the one gate that stays
     |                    a hard block; word count is never a punch-out
     |                    reason anywhere in the pipeline
     v
[5] blog-qa-reviewer  --qa-gate-->  05-qa.md   (adversarial checkpoint review)
     |                  ^ one targeted revision (via anti-ai-voice) on
     |                    banned-word overuse (checkpoint 3B); any OTHER
     |                    real FAIL escalates straight to a human
     v
[6] blog-refinement  -->  06-publish-kit.md   (final article + SEO kit)
```

Any guardrail that can't be resolved by its one allotted revision attempt
escalates to `punch-out/<run-id>.json` — a terminal state for human review,
not a crash. A genuine technical/mechanical break (a CLI spawn error, malformed
JSON) instead writes to `failures/<run-id>.json`. These are deliberately kept
separate — see `punch-out/punch-out-policy.md`.

## Folder map

| Path | What it is |
|---|---|
| `workflow/run-workflow.js` | The orchestrator. Spawns the real `claude` CLI for each AI step, calls guardrails between steps, writes audit trail. |
| `workflow/workflow-definition.md` | Full step-by-step spec: schemas, branching table, revision-loop detail, cost estimates, Stage 3 certification evidence per skill. |
| `workflow/orchestration-eval.md` | The workflow's own Stage 3-style evaluation (the SharePoint framework requires this — "this workflow is itself a Stage 3 prompt"). |
| `workflow/test-guardrails-local.js` | No-CLI regression suite (40 assertions) covering every guardrail and text-parsing helper. Run this before spending a real CLI call on any guardrail change. |
| `workflow/mock-claude-cli.js` | A stand-in for the real `claude` binary, used to validate orchestration control-flow at zero API cost. |
| `guardrails/*.js` | Deterministic, zero-AI-call gates: `outline-check`, `draft-check`, `contrast-negation-check`, `voice-check`, `grade-gate`, `qa-gate`. |
| `prompts/*.md` | The 6 Stage 3-certified skill prompts driving each AI step. |
| `monitoring/audit-logger.js` | Writes `runs/<run-id>/audit-trail.jsonl` after every AI step and every guardrail call. |
| `runs/` | Every run's full artifact trail (outline through publish kit) plus its audit trail. Kept in full, including failed/punched-out runs — this is the iteration evidence. |
| `punch-out/` | One JSON per punched-out run, plus `bypass-test-evidence.md` (the active punch-out bypass test) and `punch-out-policy.md`. |
| `results/e2e-success-rate-report.md` | The end-to-end success-rate report — the headline number, full run-by-run table, and the trend narrative across sessions. |
| `test-data/` | Real podcast/webinar transcripts used across all runs, plus two hand-written fixtures for fast guardrail iteration. |
| `references/stage3-certification/` | Verbatim Stage 3 eval evidence for each of the 5 skills, copied in so a reviewer doesn't need the original project folder. |
| `scripts/` | Batch-run helper scripts used during validation (not part of the pipeline itself). |
| `logs/` | Raw stdout logs from early batch validation runs (session 9-10), kept as iteration evidence. |

## How to run the workflow

Requires the `claude` CLI (Claude Code >= 2.0), authenticated — no
`ANTHROPIC_API_KEY` needed; the pipeline shells out to the CLI's own
subscription auth via `spawnSync`.

```bash
# Full production run against a real transcript (800-1,600 words, all 6 steps)
node workflow/run-workflow.js "test-data/<transcript>.txt"

# Fast iteration: real transcript-analysis + blog-draft-writer, but targets
# 500-800 words so every downstream CLI call is cheaper/faster. Never use
# this for a certification-representative run.
node workflow/run-workflow.js --short "test-data/<transcript>.txt"

# Fastest iteration: skip steps 1-2 entirely and feed a pre-written draft
# straight into anti-ai-voice -> ai-smell-test -> blog-qa-reviewer.
node workflow/run-workflow.js --draft test-data/clean-500-word-draft.md
```

Output lands in `runs/<run-id>/`, with `06-publish-kit.md` on a clean pass,
`punch-out/<run-id>.json` if a guardrail escalates, or `failures/<run-id>.json`
on a technical failure.

## How to run the evals

```bash
# Deterministic guardrail + parsing regression suite (zero cost, <1s)
node workflow/test-guardrails-local.js

# Orchestration control-flow, against a canned model (zero cost)
node workflow/mock-claude-cli.js   # see workflow/orchestration-eval.md for how this batch is used
```

`workflow/orchestration-eval.md` documents all three evaluation methods used
on the orchestrator itself (the local guardrail suite, the mock-CLI batch,
and the punch-out bypass test) with explicit pass criteria.

## A note on token/cost accounting

Costs in `audit-trail.jsonl` and `results/e2e-success-rate-report.md` are
**estimated**, not billed API cost: the pipeline runs through the `claude`
CLI's own subscription auth (not a metered API key), so `monitoring/audit-
logger.js` estimates tokens with a 1-token≈4-character heuristic rather than
reading real usage metadata, which the CLI doesn't return in this mode.

## Stage 4 artifact checklist

Full detail and evidence pointers in `PRE-SUBMISSION-CHECKLIST.md`. Summary:

| # | Required artifact | Status | Where |
|---|---|---|---|
| 1 | Workflow definition | Done | `workflow/workflow-definition.md`, `workflow/orchestration-eval.md` |
| 2 | Guardrails (deterministic, between steps) | Done | `guardrails/*.js` |
| 3 | Punch-out evidence (incl. an active bypass test) | Done | `punch-out/bypass-test-evidence.md`, `punch-out/punch-out-policy.md` |
| 4 | End-to-end success rate | Done | `results/e2e-success-rate-report.md` — 29/36 substantive real runs (80.6%) reach a correct terminal state; 3 confirmed clean PASS, including one genuine full production-length first-attempt pass (`run-066`) |
| 5 | Audit trail | Done | `runs/<run-id>/audit-trail.jsonl`, one per run |

## Iteration history, in brief

This pipeline was built and hardened across 14 working sessions and 66 run
attempts (`run-001` through `run-066`), not landed on in one pass. The full
narrative — every real bug found, the run that exposed it, and the fix — is
in `results/e2e-success-rate-report.md` §5 and §10, and in each run's own
`audit-trail.jsonl`. Highlights:

- **Sessions 1-2:** built the orchestrator and all 5 guardrails; found and
  fixed the `gradeGate()` field-name mismatch that let every grade through
  unchecked, and a missing position-aware contrast-negation check.
- **Sessions 9-11:** ran real transcript batches, found and fixed an
  `ETIMEDOUT` root cause (a hardcoded 10-minute spawn timeout, not a
  parallelism issue), added a word-count tolerance band, and — on Chetan's
  direction — made word count a non-blocking signal everywhere rather than a
  punch-out condition.
- **Session 12:** ran the active punch-out bypass test (`run-058`/`059`);
  in the process, found that a same-day `qa-gate.js` regex fix had never
  been re-verified against 3 historically-logged "PASS" runs, which turned
  out to have real undetected defects. Reclassified them, corrected the
  headline number, and made checkpoint 5D non-blocking (it fails by
  design, since the article is reviewed before the SEO kit exists).
- **Session 13:** added source-discipline and contrast-negation-avoidance
  guidance directly into `blog-draft-writer.md` after two runs punched out
  on the same root causes; added a sanctioned `[NEEDS SOURCE: ...]` tag for
  stats with no citable source; added the first-ever revision loop at
  `qa-gate` for banned-word overuse.
- **Session 14:** `run-065` (full production length) reached the publish-kit
  step despite a real, reviewer-flagged FAIL — exposed a second instance of
  the same bug class as session 12 (a bolded `**FAIL**` table cell the
  regex didn't match). Fixed and regression-tested the same session;
  `run-066`, run immediately after, is the project's first genuine full
  production-length, first-attempt clean PASS.

Both PASS and PUNCH-OUT runs are kept in `runs/` deliberately, including the
ones that exposed bugs later fixed — that record is the evidence this
workflow was iterated on, not written once and left alone.
