# run-066 — artifact cleanup (session 14 audit)

**Date:** 2026-09-28

While auditing the repo before submission, found that every real run's
`04-graded.md`, `05-qa.md`, and `06-publish-kit.md` (steps 4/5/6) had model
self-narration or a literal, unparsed `{"type":"write_file",...}` tool-call
blob leaked into the saved artifact — steps 2/3 already had this stripped
(`stripDraftMetaCommentary()`), but 4/5/6 never did. This did **not** affect
gate correctness (`grade-gate.js`/`qa-gate.js` were independently re-verified
to parse the same decision from both the raw and cleaned text), but it made
the saved evidence — including the actual client-facing deliverable,
`06-publish-kit.md` — messier than it should be for a human reader.

Fixed in `workflow/run-workflow.js` (new `extractCleanContent()`, generalizing
the existing XML-tag extraction to also handle the JSON blob variant and to
trim any leading narration before the first real heading). Regression-tested
in `workflow/test-guardrails-local.js` (4 new assertions, 44/44 passing).

For this run specifically, applied the fix retroactively to the two affected
files:

- `04-graded.md` — was the raw output (leading narration + a literal JSON
  `write_file` blob); replaced with the extracted, clean smell-test report.
  Original preserved as `04-graded.raw.md`.
- `06-publish-kit.md` — was the raw output (leading narration: "I'll run the
  full Phase 3 refinement pass on this draft..."); replaced with the article
  starting at its first real section. Original preserved as
  `06-publish-kit.raw.md`.

`05-qa.md` needed no change — this run's QA output happened to come back
clean already.

Re-verified after the swap: `gradeGate()` still returns `decision: 'proceed'`
on the cleaned `04-graded.md`; `draftCheck`/`voiceCheck`/`contrastNegationCheck`
against `02-draft.md`/`03-cleaned.md` are unaffected (this cleanup didn't
touch those files). This run's PASS status is unchanged — only the saved
artifact text was cleaned up, not the underlying gate decision.

Other real runs (022–065) still have this same historical leak in their own
04/05/06 files — left as-is, both because that's the authentic historical
record and because 65 files across dozens of runs isn't worth touching for
a formatting nit that never changed a gate's decision. The code fix applies
to every run going forward.
