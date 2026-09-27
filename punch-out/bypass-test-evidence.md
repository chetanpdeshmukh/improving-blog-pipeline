# Punch-Out Bypass Test — Evidence

Per the Stage 4 framework: "Punch-out points that exist on paper but were never
tested do NOT qualify." This document is the active test — someone (this session)
attempted to defeat the `qa-gate` punch-out and confirmed it was actually blocked,
per the reference shape in Aishwarya G's certified submission.

## 1. Setup

**Defect draft:** `test-data/bypass-test-draft.md` — the known-good, previously
Grade-A `clean-500-word-draft.md` fixture with one real content defect inserted: an
unlinked statistic ("74% of enterprise identity migrations experience unplanned
downtime in the first 90 days after a merger") with no source or hyperlink.
`blog-qa-reviewer`'s checkpoint 2A states explicitly: "Unlinked statistics — always
FAIL, regardless of source."

**Bypass mechanism:** `guardrails/qa-gate.js`'s decision was still computed and
logged as normal; only the enforcement line in `workflow/run-workflow.js` (the
`punchOut()` call after `qa-gate`) was commented out, so a detected FAIL would be
visible in the audit trail but would no longer stop the pipeline. This isolates
exactly one variable — does the enforcement line matter — rather than disabling the
whole guardrail, which would prove less.

```js
// BYPASS-TEST (2026-09-27, session 12): qa-gate's punch-out temporarily
// disabled to prove the gate is load-bearing. See punch-out/bypass-test-evidence.md.
// if (qaPunchOut) {
//   punchOut(runId, runDir, 'qa-gate',
//     `QA reviewer found ${qaResult.failItems.length} FAIL item(s): ${qaResult.failItems.join('; ')}`);
// }
```

Both runs below used `node workflow/run-workflow.js --draft test-data/bypass-test-draft.md`
— real `claude` CLI calls (no mock), same draft, same code except the one line above.

## 2. Run A — `run-058`, guard disabled: unsafe pass-through

**Result: the pipeline produced a full `06-publish-kit.md` despite `qa-gate`
detecting real FAIL items.** The inserted unlinked-stat defect was actually caught
and removed one step earlier by `anti-ai-voice` (its own note in `03-cleaned.md`:
*"The sentence containing the unattributed 74% statistic was cut entirely since
there's no source and the story doesn't need it"*) — a good sign for that guardrail,
but it means this run's proof point shifted to whatever `qa-gate` itself flagged
downstream, which is exactly the data needed: **`qa-gate` still computed
`decision: 'punch-out'`** independent of the bypass, based on real remaining issues.

Audit trail (`runs/run-058/audit-trail.jsonl`), the `qa-gate` line:
```
qa-gate | punch-out | 2 FAIL item(s): ### Verdict: FAIL; | 5D | Publication kit | FAIL | SEO title tag, meta description, and URL slug all absent; internal link absent |
```

Despite `qa-gate` logging `punch-out`, the very next line in the same audit trail is:
```
blog-refinement | pass | 06-publish-kit.md produced
```

`runs/run-058/06-publish-kit.md` exists on disk — a full, SEO-kitted, publish-ready
article produced from a draft that the adversarial reviewer had already flagged.
**This is the unsafe pass-through**: with the enforcement line disabled, a real
guardrail detection had no effect on what reached the terminal PASS state.

(Note: at the time this run executed, `qa-gate.js` still counted 5D — publication
kit — as a blocking checkpoint, before the fix described in §4 below. That doesn't
change what this run demonstrates: the point being tested is "does a detected FAIL
actually stop the pipeline," and here it demonstrably did not.)

## 3. Run B — `run-059`, guard restored: correct punch-out

The commented-out lines were restored exactly (`git diff workflow/run-workflow.js`
showed zero delta from the committed version before rerunning). Same draft, same
command, unmodified code:

```
node workflow/run-workflow.js --draft test-data/bypass-test-draft.md
```

Console output:
```
[PUNCH-OUT] run-059 → step "qa-gate": QA reviewer found 3 FAIL item(s): ### Verdict: FAIL; | 4C | War stories expanded | FAIL | Director's 11-day Exchange lockout compressed to one sentence |; | 5D | Publication kit | FAIL | No title tag, meta description, or URL slug present; no internal link |
```

- `runs/run-059/punch-out.json` was written (and copied to `punch-out/run-059.json`).
- `runs/run-059/06-publish-kit.md` was **not** written — `blog-refinement` (Step 6)
  never ran.
- The run stopped at exactly the same gate the disabled version passed through.

**This confirms the gate is load-bearing**: identical input, identical code except
the one guard line, and the outcome flips from "unsafe pass-through to a publish-
ready kit" to "correctly escalated to a human reviewer, nothing further produced."

## 4. A second, unplanned finding from the same investigation

While building this test, checking `qa-gate.js`'s behavior against saved reports from
the certification's existing "PASS" runs turned up something more consequential than
the deliberate bypass test above: **the 5 runs previously logged as clean PASS
(`run-033`, `035`, `037`, `038`, `040`) all executed before a same-day fix to
`qa-gate.js` (commit `67eb667`, 16:44) that corrected the FAIL-detection regex.**
Before that fix, `qa-gate.js`'s patterns "never matched a real report" (the commit's
own description) — meaning every one of those 5 runs passed only because the gate
was silently non-functional at the time, not because the content was clean. This is,
in effect, the same failure mode as the deliberate bypass test above — a disabled
gate letting content through — except it happened for real, unintentionally, during
actual certification-run history.

Re-running today's `qaGate()` directly against each run's saved `05-qa.md`:

| Run | Result under current `qa-gate.js` | Real issue found |
|---|---|---|
| run-033 | **proceed** (genuinely clean) | none — reconfirmed as a real PASS |
| run-035 | punch-out | banned word ("empower") |
| run-037 | **proceed** (genuinely clean) | none — reconfirmed as a real PASS |
| run-038 | punch-out | unlinked statistic (2A), `[INSERT DIAGRAM]` placeholder (2C), AI rule-of-three pattern (3C) |
| run-040 | punch-out | banned phrase ("table stakes"), restated filler (4D) |

Three of the five (035, 038, 040) had real, checkpoint-specific content defects that
the broken gate let through at the time; two (033, 037) hold up as genuinely clean
under the fixed gate. `results/e2e-success-rate-report.md` has been corrected to
reflect this — see its §1 for the updated methodology and headline number.

## 5. Follow-on fix, decided with Chetan (2026-09-27, session 12)

All five re-checks above also surfaced a structural issue: checkpoint 5D
(publication kit present) FAILs on essentially every run, because `blog-qa-reviewer`
(Step 5) reviews the article *before* `blog-refinement` (Step 6) generates the SEO
kit — so the kit cannot exist yet at review time regardless of content quality. This
mirrors the checkpoint-4A (word count) policy call Chetan made in session 11, so it
was brought to him directly rather than decided unilaterally:

> Checkpoint 5D FAILs on every real run because blog-qa-reviewer (step 5) reviews the
> article before blog-refinement (step 6) generates the kit. How should the pipeline
> handle this? — **Chetan's answer: make 5D non-blocking, same treatment as 4A.**

Implemented in `guardrails/qa-gate.js` (5D FAIL rows excluded from the blocking count,
surfaced separately via `publicationKitFailItems`) and `prompts/blog-qa-reviewer.md`
(5D explicitly excluded from the Verdict line, mirroring the existing 4A note). A
second issue surfaced while implementing this: the reviewer's own `## Verdict: FAIL`
summary line aggregates every checkpoint including excluded ones, so a report that
fails *only* on 4A/5D still prints "Verdict: FAIL" — fixed by gating on the real
per-checkpoint table rows only, never the standalone Verdict line on its own (see
`punch-out/punch-out-policy.md` §3 for the full mechanism). Verified via 3 new
regression assertions added to `workflow/test-guardrails-local.js` (36/36 passing,
up from 33), plus a re-check of runs 033–040 against the updated code (§4 table
above still holds — the fix doesn't change which runs have *real* defects, only
correctly ignores the always-fails-by-design 5D row).

## 6. Restore confirmation

`git diff workflow/run-workflow.js` after restoring the bypass line showed no
difference from the last commit, confirming the temporary edit left no residue. The
5D-exclusion change in `guardrails/qa-gate.js` and `prompts/blog-qa-reviewer.md` is a
real, intentional, permanent fix (not part of the bypass mechanism) and remains in
place going forward.
