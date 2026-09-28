# Punch-Out Policy

Governs when this pipeline stops and hands a run to a human, versus when it treats
something as an automated failure, versus when it is required to keep going. Written
against Improving's Stage 4 framework wording: "Punching out to a human is... a
decision which should not be left to an AI alone," which the framework treats as
distinct from a prompt or step simply failing.

## 1. Punch-out vs. failure vs. non-blocking

Three different things can happen when a guardrail finds a problem, and this pipeline
keeps them in three different places on disk:

| Category | Meaning | Where it's written | Who acts on it |
|---|---|---|---|
| **Punch-out** (`punch-out/`) | A real content or quality judgment call that needs a human, because an AI should not be the final word on it | `punch-out/run-NNN.json` + `runs/run-NNN/punch-out.json` | A human reviewer |
| **Failure** (`failures/`) | Mechanical/technical breakage — nothing for a human to weigh in on, just something broken to fix and rerun | `failures/run-NNN.json` (or `unknown.json` if the run never got a folder) + `runs/run-NNN/failure.json` | An engineer |
| **Non-blocking** (WARN) | A real issue, logged for visibility, that never halts the run | Audit trail only (`status: "warn"` or a `wordCountFailItems`-style side list) | Nobody — informational |

`workflow/run-workflow.js` implements this as two distinct terminal functions,
`punchOut()` and `failWorkflow()`, so the two categories can never be conflated in the
same output folder. See the doc comments directly above each function for the exact
routing rule.

## 2. What triggers punch-out (human review)

- **`draft-check` structural defects** — an `[INSERT ...]`-style placeholder left in
  the draft, or other structural problems a human should look at before a rewrite is
  attempted.
- **`contrast-negation-check` exhaustion** — the "not X, but Y" AI-tell pattern is
  still present at zero-tolerance density (title/opening) or above the body-text
  threshold after the guardrail's retry budget is spent.
- **`grade-gate`: C/D/F after the revision loop's max attempts** — `ai-smell-test`
  keeps scoring the draft as not publish-quality even after the blog-refinement
  revision loop (max 2 rounds) has had its shot at the flagged patterns. This reflects
  a genuine quality/AI-voice problem, not a mechanical number — confirmed by Chetan's
  explicit direction not to relax this gate.
- **`qa-gate`: any FAIL item from `blog-qa-reviewer`** — the adversarial reviewer
  found at least one checkpoint-level FAIL (ungrounded claim, unlinked statistic,
  invented example, banned word/phrase, voice violation, missing disclosure, etc.),
  excluding word count (see §3). Any single FAIL is enough; `qa-gate.js` does not
  average or discount FAILs against WARNs.

Punch-out is a **designed safety exit, not a bug**. A run that punches out correctly
is a successful run from the pipeline's perspective — it means a guardrail did its job.
`results/e2e-success-rate-report.md` treats a correct punch-out as a valid terminal
state alongside a clean PASS.

## 3. What is explicitly excluded from ever triggering punch-out (or failure)

**Word count is never a punch-out (or failure) condition, anywhere in the pipeline.**
This was an explicit policy decision from Chetan (2026-09-27, session 11): the person
who requested the blog expects a blog as the end result, and a mechanical word-count
miss is not "a concrete technical issue" that justifies withholding one. This is
implemented in three places:
- `draft-check`'s redraft-exhaustion path logs a WARN and proceeds instead of calling
  `punchOut()`.
- `guardrails/qa-gate.js` strips checkpoint-4A (word count) FAIL rows out of the count
  that drives its punch-out decision, while still surfacing them separately via
  `wordCountFailItems` so they aren't silently dropped from the audit trail.
- `prompts/blog-qa-reviewer.md`'s Verdict rules state explicitly that a 4A FAIL never
  affects the overall Verdict.

**Checkpoint 5D (publication kit present) is also never a punch-out condition.** This
was found and confirmed with Chetan during the bypass-test investigation (2026-09-27,
session 12): `blog-qa-reviewer` (Step 5) reviews the article *before*
`blog-refinement` (Step 6) generates the SEO title/meta/URL-slug/internal-link kit —
so 5D fails structurally on every real run, independent of content quality. It is a
pipeline-sequencing artifact, not something a human needs to weigh in on, since
blog-refinement adds the kit unconditionally on the very next step regardless. Same
implementation shape as 4A: `qa-gate.js` excludes 5D FAIL rows from the blocking
count (surfaced separately via `publicationKitFailItems`), and
`prompts/blog-qa-reviewer.md`'s Verdict rules exclude 5D from the overall Verdict the
same way they already excluded 4A. See `punch-out/bypass-test-evidence.md` for the
real QA reports (runs 033–040) that first surfaced this.

One additional wrinkle specific to this exclusion: the reviewer's own top-line
`## Verdict: FAIL` summary line aggregates every checkpoint, including 4A/5D — so a
report that fails *only* on excluded checkpoints still prints "Verdict: FAIL". Fixed
by having `qa-gate.js` gate on the real per-checkpoint table rows only and never count
the standalone Verdict line on its own; otherwise the exclusion would be silently
overridden by that summary line on every single run.

Every checkpoint *other than 4A and 5D* is unaffected by these exclusions and still
punches out normally on a real FAIL.

**Checkpoint 3B (banned words) gets one bounded automated revision instead of an
immediate punch-out (added 2026-09-27, session 13, Chetan's direction).** Unlike
4A/5D, this is not an exclusion — a real 3B FAIL still matters — but it is
mechanically fixable (a find-and-replace on the overused word), unlike the content
and factual judgment calls the other checkpoints exist to catch, so it doesn't need
a human on the first miss. The rule:
- `prompts/blog-qa-reviewer.md` now scores 3B per word/phrase, not per document: 1–3
  occurrences of a given banned word is a WARN (an editing slip, not a pattern);
  more than 3 occurrences of the same word is a FAIL (e.g. "stakeholders" used 6
  times in `run-062`).
- A 3B FAIL, with no other blocking checkpoint FAIL in the same report, routes back
  to `anti-ai-voice` exactly once — the skill whose actual job is lexical
  banned-word removal, not a full redraft from `blog-draft-writer` — with the
  specific overused word(s) called out. `blog-qa-reviewer` then re-reviews the
  fixed draft.
- If 3B is still FAIL after that one revision (`MAX_BANNED_WORD_REVISIONS` in
  `guardrails/qa-gate.js`), it punches out like any other checkpoint — this is not
  an infinite retry loop, and a 3B FAIL alongside any other real (non-4A/5D)
  checkpoint FAIL in the same report still punches out immediately without
  attempting the revision, since that other FAIL needs human judgment regardless.
- Implementation: `qa-gate.js`'s `qaGate(qaOutput, bannedWordRevisionCount)` returns
  a new `'revise'` decision (in addition to `'proceed'`/`'punch-out'`), mirroring
  `grade-gate.js`'s existing revision-counter pattern. `run-workflow.js` wires the
  loop between Step 5 (`blog-qa-reviewer`) and the targeted `anti-ai-voice` fix.

## 4. What triggers a failure (not punch-out)

Reserved for breakage with no content judgment involved:
- `outline-check` schema failures (the transcript-analysis step returned outline JSON
  missing required fields — nothing for a human to review, the output is just
  malformed).
- `claude` CLI spawn errors (binary not found, non-zero exit, timeout after retry).
- Any other uncaught exception in the orchestrator.

These write to `failures/run-NNN.json` (or `failures/unknown.json` when the crash
happens before a run folder exists) and are an engineering bug to fix, not evidence
for a human reviewer.

## 5. What punch-out output is for

Punch-out artifacts (`punch-out/run-NNN.json`, plus the run's own
`runs/run-NNN/punch-out.json` and its partial artifacts up to the punch-out point) are
written **for a human reviewer** — an engineer or editor deciding whether to fix the
transcript/draft and rerun, override the gate with justification, or discard the
attempt. This output is never surfaced raw to whoever originally requested the blog;
punch-out is a stop for internal review, not a customer-facing error message.

## 6. Active bypass testing (this policy has been tested, not just written)

Per the Stage 4 framework: "Punch-out points that exist on paper but were never
tested do NOT qualify." This policy's `qa-gate` punch-out was actively bypassed and
confirmed load-bearing — see `punch-out/bypass-test-evidence.md` for the full
before/after: a defective draft with a real, unlinked-statistic content violation was
run once with the punch-out call commented out (it reached `06-publish-kit.md`
anyway, an unsafe pass-through, while the guardrail's own detection was still logged),
then rerun unmodified with the guard restored (it punched out correctly on the same
defect).

## 7. Retry budget (context for §2's "after max attempts" language)

`MAX_REVISIONS` in `run-workflow.js` caps the grade-gate revision loop at 2 rounds (3
total grading attempts) before punch-out. Word-count redraft attempts are capped at 3
total (1 initial + 2 redrafts) before falling back to warn-and-proceed per §3 — not
punch-out, since word count is excluded entirely.
