# Blog Pipeline — Workflow Definition

**Version:** 1.0  
**Last updated:** 2026-09-26  
**Owner:** Chetan Deshmukh  
**Purpose:** Stage 4 certification — multi-agent blog production pipeline  

---

## Overview

This workflow takes an SME interview transcript and produces a publish-ready blog kit (article + SEO metadata + social teaser) through a six-agent pipeline. Each agent handoff is gated by a deterministic guardrail. The pipeline has a formal punch-out path: any FAIL from the QA gate halts execution and escalates to human review.

```
INPUT: transcript (.txt or .md)
  │
  ▼
[Agent 1] transcript-analysis
  │   GUARDRAIL: outline-check.js
  ▼
[Agent 2] blog-draft-writer
  │   GUARDRAIL: draft-check.js
  ▼
[Agent 3] anti-ai-voice
  │   GUARDRAIL: voice-check.js
  ▼
[Agent 4] ai-smell-test
  │   GUARDRAIL: grade-gate.js
  │     ├─ Grade A/B → continue
  │     └─ Grade C/D/F → revision loop → back to Agent 2
  │           max 2 revision attempts
  │           after 2 failures → PUNCH-OUT
  ▼
[Agent 5] blog-qa-reviewer  ← adversarial gate
  │
  ├─ any FAIL item → PUNCH-OUT to human review
  │
  └─ all PASS/WARN → continue
          GUARDRAIL: qa-gate.js
          │
          ▼
      [Agent 6] blog-refinement
          │
          ▼
      OUTPUT: publish kit
        (refined article + SEO title + meta description + URL slug + social teaser)
```

---

## Step 1 — transcript-analysis

**Prompt file:** `prompts/transcript-analysis.md`  
**Model:** claude-sonnet-4-6  

**Input received:**
- Raw transcript text (string, loaded from test-data/ file)

**Produces:**
- Structured JSON outline with keys:
  ```json
  {
    "title": "string — working title",
    "introduction": "string — hook and framing",
    "problem_statement": "string — what pain this addresses",
    "body_sections": [
      {
        "heading": "string",
        "angle": "string — what this section argues",
        "tradeoff": "string — when this works / when it fails",
        "war_story_beat": "string — optional: Setup / Pressure / Decision / Outcome"
      }
    ],
    "takeaway": "string — practitioner conclusion",
    "gaps": [
      {
        "gap": "string",
        "severity": "CRITICAL | NICE-TO-HAVE",
        "probe": "string — question to ask SME"
      }
    ],
    "controversy": {
      "industry_position": "string",
      "sme_position": "string"
    }
  }
  ```
- Minimum 3 body sections required.

**Guardrail after:** `guardrails/outline-check.js`  
Checks: title present, introduction present, problem_statement present, body_sections array length >= 3, takeaway present. Any missing field = FAIL, step retries once. Second failure = halt with error.

---

## Step 2 — blog-draft-writer

**Prompt file:** `prompts/blog-draft-writer.md`  
**Model:** claude-sonnet-4-6  

**Input received:**
- Outline JSON from Step 1 (stringified)

**Produces:**
- Full article draft in Markdown
- Word count: 800–1,600 words
- Each H2 section must include a stated tradeoff (when this approach works, when it fails)
- At least one war story arc (Setup / Pressure / Decision / Outcome) somewhere in the body
- At least one failure mode per recommendation

**Guardrail after:** `guardrails/draft-check.js`  
Checks:
- Word count: 800–1,600 is clean; within 3% of either boundary (776–800 or 1,600–1,648) is a non-blocking WARN; beyond 3% sends the draft back to blog-draft-writer for a trim/expand pass (up to 2 attempts) before punching out
- At least 3 H2 headings present in Markdown
- No placeholder text ("TBD", "INSERT HERE", "TODO", "[placeholder]")
- Draft does not begin with a generic opener ("In today's", "In the world of", "In recent years")

Any check failure = FAIL, step retries once. Second failure = halt with error.

---

## Step 3 — anti-ai-voice

**Prompt file:** `prompts/anti-ai-voice.md`  
**Model:** claude-sonnet-4-6  

**Input received:**
- Article draft Markdown from Step 2

**Produces:**
- Cleaned article draft with AI-pattern rewrites applied
- No hollow affirmations, contrast negation chains, em-dash overuse, or triadic "X, Y, and Z" filler structures

**Guardrail after:** `guardrails/voice-check.js`  
Checks via regex for critical banned phrases. The list includes:
- "It is important to note"
- "It is worth noting"
- "In conclusion"
- "Delve into"
- "Leverage" (as a verb)
- "Game-changer" / "game changer"
- "Moreover" / "Furthermore" as sentence openers
- "In today's fast-paced"
- "Cutting-edge"

Any banned phrase found = FAIL, logs exact phrase and character position, retries step once. Second failure = halt with error.

---

## Step 4 — ai-smell-test

**Prompt file:** `prompts/ai-smell-test.md`  
**Model:** claude-sonnet-4-6  

**Input received:**
- Cleaned article draft from Step 3

**Produces:**
- Structured assessment with a final grade line in format: `Grade: X` where X is A, B, C, D, or F
- Flags structural tells, fake specifics, synonym sprawl, reused rhetorical scaffolding

**Guardrail after:** `guardrails/grade-gate.js`  
Logic:
```
gradeGate(gradeReport, revisionCount) returns { decision: 'proceed' | 'revise' | 'punch-out', grade, ... }
if decision === 'proceed':
  → proceed to Step 5
if decision === 'revise' and revisionCount < MAX_REVISIONS:
  → increment revision_count
  → send to Step 6's prompt, blog-refinement — scoped to a TARGETED fix only
    (the smell-test's specific flagged findings + the cleaned draft; no SEO,
    no publish kit) — then re-run anti-ai-voice on the result before re-grading
if decision === 'punch-out' or revisionCount >= MAX_REVISIONS:
  → PUNCH-OUT: write punch-out record, halt workflow
```

**Revision loop note (corrected 2026-09-27, session 12 — this previously documented
routing back to Step 2/blog-draft-writer, which was never actually implemented):** a
failing grade routes to **blog-refinement**, not back to blog-draft-writer or
anti-ai-voice. Anti-ai-voice is a lexical filter (banned words/phrases) and cannot
perform the structural rewrites a grader's specific findings require (contrast-
negation, mic-drop closers, triadic parallel structure). blog-refinement is invoked
here with restrictive `userContent` — "fix only the flagged patterns below, return
article only, no publish kit" — so it stays scoped to pattern fixes. The corrected
draft is then re-cleaned through anti-ai-voice for a final lexical pass and re-graded.
See `feedback-pipeline-debugging.md` (Bug 3) for the original bug this fixes.

---

## Step 5 — blog-qa-reviewer (adversarial gate)

**Prompt file:** `prompts/blog-qa-reviewer.md`  
**Model:** claude-sonnet-4-6  

**Role:** Adversarial reviewer. Its job is to find problems, not to confirm quality. It challenges claims, checks for unsupported assertions, incomplete reasoning, and brand risk.

**Input received:**
- Article draft (post-anti-ai-voice, post-smell-test) from Step 3/revision path

**Produces:**
- Structured QA report using PASS / WARN / FAIL notation per check item
- Includes overall recommendation: APPROVED or NEEDS HUMAN REVIEW

**Guardrail after:** `guardrails/qa-gate.js`  
Logic:
```
extract FAIL/WARN table rows from the real checkpoint-table + Verdict-line report
(patterns matching "| ... | FAIL | ... |", "## Verdict: FAIL", etc. — see qa-gate.js)
exclude any FAIL row for checkpoint 4A (word count) from the blocking count —
  word count is never a punch-out condition, see punch-out/punch-out-policy.md §3
if blocking FAIL count > 0:
  → PUNCH-OUT: write punch-out record with list of FAIL items, halt workflow
if blocking FAIL count === 0:
  → proceed to Step 6 (word-count FAILs, if any, are still logged, just non-blocking)
```

This is a hard gate — there is no revision loop at this stage. Any non-word-count
FAIL means the draft needs human judgment, not another AI pass.

---

## Step 6 — blog-refinement

**Prompt file:** (blog-refinement SKILL.md — to be added to prompts/ when needed)  
**Model:** claude-sonnet-4-6  

**Input received:**
- QA-reviewed draft from Step 5

**Produces (publish kit):**
- Refined article in Markdown (final prose polish + depth expansion)
- SEO title (under 60 characters)
- Meta description (under 155 characters)
- URL slug (lowercase, hyphenated)
- Social teaser (LinkedIn post copy, ~200 words)

This is the PASS terminal state. The publish kit is written to `runs/run-NNN/06-publish-kit.md`.

---

## Branching Summary

| Condition | Where | Action |
|---|---|---|
| Outline missing required fields | After Step 1 | `failWorkflow()` (technical, not punch-out) |
| Draft has a structural defect (e.g. `[INSERT ...]` placeholder) | After Step 2 | `punchOut()` |
| Draft out of word count, redraft budget exhausted | After Step 2 | WARN + proceed (never blocks — see `punch-out/punch-out-policy.md` §3) |
| Contrast-negation density too high, retry budget exhausted | After Step 3 pre-check | `punchOut()` |
| Banned word/phrase found | After Step 3 | WARN only, does not block (grade-gate catches quality downstream) |
| ai-smell-test grade C/D/F | After Step 4 | Revise via blog-refinement (max `MAX_REVISIONS`=2 rounds) |
| ai-smell-test still C/D/F after max revisions | After Step 4 revision loop | `punchOut()` |
| blog-qa-reviewer: any FAIL item outside checkpoints 4A/5D | After Step 5 | `punchOut()` |
| blog-qa-reviewer: all PASS/WARN (4A word-count and 5D publication-kit FAILs, if any, are non-blocking — 5D fails structurally since the kit doesn't exist until Step 6) | After Step 5 | Continue to Step 6 |
| Step 6 completes | End | Write `06-publish-kit.md`, PASS result |
| `claude` CLI spawn error / uncaught exception at any step | Any step | `failWorkflow()` (technical, not punch-out) |

---

## Punch-Out Protocol

When a punch-out triggers, `punchOut()` in `run-workflow.js`:

1. Writes `runs/run-NNN/punch-out.json` AND a copy to `punch-out/run-NNN.json`:
   ```json
   {
     "runId": "run-NNN",
     "step": "step name",
     "reason": "human-readable description",
     "timestamp": "ISO 8601"
   }
   ```
2. Appends a final audit JSONL entry with `"status": "punch-out"`
3. Exits with code 1 without running any further steps

A separate, structurally identical `failWorkflow()` handles technical/mechanical
breakage (not a human-judgment call) and writes to `failures/run-NNN.json` instead —
see `punch-out/punch-out-policy.md` §1 for the full distinction. There is no
`workflow-result.json` file; the run's outcome is read from which of these terminal
files exists (`06-publish-kit.md` / `punch-out.json` / `failure.json`) plus the audit
trail — see `results/e2e-success-rate-report.md`'s methodology section.

The punch-out is not a failure of the pipeline — it is a designed safety exit. The end-to-end success rate counts punch-outs as "completed as designed" when they were triggered correctly.

---

## Revision Loop Detail (corrected 2026-09-27, session 12)

The revision loop is driven by the ai-smell-test/grade-gate result (Step 4), but the
revision itself is a **targeted blog-refinement pass**, not a return to Step 2. It
does not apply to the QA gate (Step 5) — that gate's failures require human judgment,
never another AI pass.

```
revision_count = 0

loop:
  if revision_count === 0:
    run Step 3 (anti-ai-voice) on the fresh draft
  else:
    run blog-refinement, scoped to fixing ONLY the flagged findings from the last
    grade report (no SEO, no publish kit), then re-run Step 3 (anti-ai-voice) on
    the result for a final lexical clean
  run Step 4 (ai-smell-test) on the cleaned text

  gradeResult = gradeGate(gradeReport, revision_count)
  if gradeResult.decision === 'proceed':
    break loop → proceed to Step 5

  if gradeResult.decision === 'punch-out' or revision_count >= MAX_REVISIONS:
    PUNCH-OUT
    break

  revision_count += 1
```

Each revision attempt is logged in the audit trail with the attempt number.
`MAX_REVISIONS` is 2 (3 total grading attempts before punch-out).

---

## Handoff Schemas

Each step writes its output as a plain Markdown or JSON file in the run folder,
named for the real files `run-workflow.js` produces (not the placeholder names an
earlier draft of this document used). The orchestrator reads a step's output back
in-memory to pass to the next step — these files are also the durable audit record.

| Step output file | Format | Consumed by |
|---|---|---|
| `01-outline.json` | JSON | Step 2 (skipped when run with `--draft`) |
| `02-draft.md` | Markdown | Step 3 |
| `03-cleaned.md` | Markdown | Step 4 |
| `04-graded.md` (+ `04b-smell-fix-revN.md` per revision attempt) | Markdown (grade + feedback) | grade-gate.js; `04b-*` feeds back into anti-ai-voice on revision |
| `05-qa.md` | Markdown (PASS/WARN/FAIL checkpoint table + Verdict) | qa-gate.js |
| `06-publish-kit.md` | Markdown (article + SEO kit) | End state (PASS only) |
| `punch-out.json` | JSON | Human reviewer (punch-out path only) |
| `failure.json` | JSON | Engineer (technical-failure path only) |
| `audit-trail.jsonl` | JSONL, one line per step/guardrail | Audit trail (§5 of `PRE-SUBMISSION-CHECKLIST.md`) |

---

## Retry and Error Handling

- The `claude` CLI call itself (`callModel()` in `run-workflow.js`) retries once,
  automatically, only on an `ETIMEDOUT` spawn error (a transient condition) — a
  15-minute timeout per step. Any other spawn error (bad binary, non-zero exit) is
  not retried and routes to `failWorkflow()`.
- There is no separate "retry the upstream step once" behavior for guardrail
  failures — a guardrail failure routes directly to `punchOut()` or `failWorkflow()`
  per the branching rules above; the only in-pipeline retries are the grade-gate
  revision loop (content-driven, capped at `MAX_REVISIONS`) and the word-count
  redraft loop (capped at 3 total attempts, then warn-and-proceed — see
  `punch-out/punch-out-policy.md` §3 and §7).
- There is no `workflow-result.json` file (see the Punch-Out Protocol section above)
  and no Anthropic API calls — all AI steps go through the `claude` CLI in
  `--print --tools none` mode, authenticated via the CLI's own session, not an API
  key.

---

## Cost and Token Expectations (per run, estimated)

| Step | Model | Est. Input Tokens | Est. Output Tokens | Est. Cost |
|---|---|---|---|---|
| transcript-analysis | claude-sonnet-4-6 | ~1,200 | ~400 | ~$0.004 |
| blog-draft-writer | claude-sonnet-4-6 | ~1,800 | ~2,100 | ~$0.023 |
| anti-ai-voice | claude-sonnet-4-6 | ~2,300 | ~2,100 | ~$0.026 |
| ai-smell-test | claude-sonnet-4-6 | ~2,200 | ~500 | ~$0.014 |
| blog-qa-reviewer | claude-sonnet-4-6 | ~2,300 | ~600 | ~$0.015 |
| blog-refinement | claude-sonnet-4-6 | ~2,500 | ~2,200 | ~$0.028 |
| **Total (PASS path)** | | **~12,300** | **~7,900** | **~$0.086** |

Guardrail steps have zero cost (plain JS, no API calls).  
Revision loops add approximately one blog-draft-writer + anti-ai-voice + ai-smell-test cycle per attempt (~$0.063/revision).

---

## Required Files per Run Folder (corrected 2026-09-27, session 12 — matches real output, see `run-workflow.js`)

A complete PASS run folder contains:

```
runs/run-NNN/
├── 01-outline.json                       ← absent when run with --draft
├── 02-draft.md                           ← absent when run with --draft
├── 03-cleaned.md
├── 04-graded.md
├── 04b-smell-fix-revN.md                 ← one per revision attempt, if any
├── 05-qa.md
├── 06-publish-kit.md                     ← PASS path only
└── audit-trail.jsonl
```

A punch-out or failure run folder has the same files up through whichever step it
stopped at, plus one of:
```
├── punch-out.json     ← punch-out path only (also copied to punch-out/run-NNN.json)
└── failure.json        ← failure path only (also copied to failures/run-NNN.json)
```

There is no `workflow-result.json` — that file was planned in an earlier draft of
this document but never implemented. A run's outcome is determined by which of the
three terminal files above is present (see `results/e2e-success-rate-report.md`'s
methodology), and full per-step detail (model, tokens, cost, status) lives in
`audit-trail.jsonl`, not a separate summary file.
