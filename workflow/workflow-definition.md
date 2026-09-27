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
parse grade from output (regex: /Grade:\s*([A-F])/i)
if grade is A or B:
  → proceed to Step 5
if grade is C, D, or F:
  → increment revision_count
  → if revision_count < 2:
      → return to Step 2 (blog-draft-writer) with original outline + smell-test feedback appended
  → if revision_count >= 2:
      → PUNCH-OUT: write punch-out record, halt workflow
```

**Revision loop note:** When returning to Step 2 for revision, the orchestrator appends the ai-smell-test output to the outline context so the draft writer has explicit failure feedback. The revision attempt counter resets to 0 only at the start of each new run — it does not reset between revision rounds.

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
count FAIL items in output (regex: /^FAIL:/m or /\bFAIL\b/)
if FAIL count > 0:
  → PUNCH-OUT: write punch-out record with list of FAIL items, halt workflow
if FAIL count === 0:
  → proceed to Step 6
```

This is a hard gate — there is no revision loop at this stage. Any FAIL means the draft needs human judgment, not another AI pass.

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

This is the PASS terminal state. The publish kit is written to `runs/run-NNN/step-6-publishkit.md` and `runs/run-NNN/workflow-result.json` is written with `"outcome": "pass"`.

---

## Branching Summary

| Condition | Where | Action |
|---|---|---|
| Outline missing required fields (x2) | After Step 1 | Halt with error |
| Draft out of word count / placeholder text (x2) | After Step 2 | Halt with error |
| Banned AI phrase found (x2) | After Step 3 | Halt with error |
| ai-smell-test grade C/D/F | After Step 4 | Revise (max 2 rounds) |
| ai-smell-test still C/D/F after 2 rounds | After Step 4 revision loop | **PUNCH-OUT** |
| blog-qa-reviewer: any FAIL item | After Step 5 | **PUNCH-OUT** |
| blog-qa-reviewer: all PASS/WARN | After Step 5 | Continue to Step 6 |
| Step 6 completes | End | Write publish kit, PASS result |

---

## Punch-Out Protocol

When a punch-out triggers, the orchestrator:

1. Writes `runs/run-NNN/punch-out-record.json`:
   ```json
   {
     "run_id": "run-NNN",
     "triggered_at_step": "step name",
     "reason": "human-readable description",
     "fail_items": ["list of specific FAIL items if from QA gate"],
     "revision_attempts": 0,
     "timestamp": "ISO 8601"
   }
   ```
2. Writes `runs/run-NNN/workflow-result.json` with `"outcome": "punch-out:human-review-required"`
3. Appends final audit JSONL entry with `"status": "punch-out"`
4. Exits without running any further steps

The punch-out is not a failure of the pipeline — it is a designed safety exit. The end-to-end success rate counts punch-outs as "completed as designed" when they were triggered correctly.

---

## Revision Loop Detail

The revision loop applies only to the ai-smell-test gate (Step 4). It does not apply to the QA gate (Step 5) — that gate's failures require human judgment.

```
revision_count = 0

loop:
  run Step 2 (blog-draft-writer) with [outline + smell-test-feedback if revision > 0]
  run Step 3 (anti-ai-voice)
  run Step 4 (ai-smell-test)
  
  if grade A or B:
    break loop → proceed to Step 5
  
  revision_count += 1
  
  if revision_count >= 2:
    PUNCH-OUT
    break
```

Each revision attempt is logged in the audit trail with the attempt number.

---

## Handoff Schemas

Each step writes its output as a plain Markdown or JSON file in the run folder. The orchestrator reads it back to pass to the next step. No streaming between steps — each step is a complete Anthropic API call.

| Step output file | Format | Consumed by |
|---|---|---|
| `step-1-outline.md` | JSON (stringified in .md) | Step 2 |
| `step-2-draft.md` | Markdown | Step 3 |
| `step-3-antiaivoice.md` | Markdown | Step 4 |
| `step-4-smelltest.md` | Markdown (grade + feedback) | grade-gate.js + Step 2 if revision |
| `step-5-qareview.md` | Markdown (PASS/WARN/FAIL items) | qa-gate.js |
| `step-6-publishkit.md` | Markdown (article + SEO kit) | End state |

---

## Retry and Error Handling

- Each guardrail that fails retries its **upstream step** once before halting.
- Network errors or API timeouts on any Anthropic call are retried once with a 5-second delay.
- After any two consecutive failures (guardrail or network), the run halts with `"status": "error"` in the audit trail. This is distinct from a punch-out.
- The orchestrator always writes a `workflow-result.json` before exiting, even on error.

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

## Required Files per Run Folder

A complete run folder contains:

```
runs/run-NNN/
├── step-1-outline.md
├── step-2-draft.md
├── step-3-antiaivoice.md
├── step-4-smelltest.md
├── step-5-qareview.md
├── step-6-publishkit.md      ← PASS path only
├── punch-out-record.json     ← punch-out path only
├── audit-trail.jsonl
└── workflow-result.json
```

`workflow-result.json` always present, always contains:
```json
{
  "run_id": "run-NNN",
  "input_file": "test-data/transcript-NN-name.txt",
  "outcome": "pass | punch-out:human-review-required | error",
  "total_tokens": 0,
  "total_cost_usd": 0.00,
  "revision_attempts": 0,
  "timestamp_start": "ISO 8601",
  "timestamp_end": "ISO 8601"
}
```
