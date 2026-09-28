# run-065 — mis-routed to publish-kit due to a real qa-gate.js bug

**Date found:** 2026-09-28

This run reached `06-publish-kit.md`, but it should have punched out at
Step 5. `05-qa.md`'s own report says `### Verdict: FAIL`, and checkpoint 3A
(POV consistency) is a genuine content defect: podcast transcript language
leaked into the article ("The host cited a report" instead of "Robin").

`qa-gate.js`'s audit-trail entry for this run reads
`qa-gate | pass | all checks PASS/WARN` — that is wrong. The reviewer bolded
the FAIL cell (`| 3A | POV consistency | **FAIL** | ... |`), and the
FAIL-row regex (`/\|\s*FAIL\s*\|/i`) only matched an unbolded `| FAIL |`
cell, so the `**` markdown emphasis broke the match and this row silently
didn't count. This is the same class of bug flagged in session 10 (n20 in
the KB) — a real blocking FAIL silently passing qa-gate — recurring under a
new formatting variant.

**Fix:** `guardrails/qa-gate.js`'s `FAIL_PATTERNS` (and the informational
WARN pattern) now tolerate `*`/`_` markdown emphasis around the cell value:
`/\|\s*[*_]{0,2}FAIL[*_]{0,2}\s*\|/i`. Added a regression test in
`workflow/test-guardrails-local.js` using this run's exact 3A row. Verified
the fixed `qaGate()` now returns `decision: 'punch-out'` when run directly
against this run's real `05-qa.md` file. Local suite: 40/40 passing.

**Disposition:** this run's `06-publish-kit.md` output is NOT a valid
certification PASS — it is evidence of the bug above, kept (not deleted)
per the project's iteration-evidence policy. The search for a genuine
clean production-length PASS continues on the next transcript.
