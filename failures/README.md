# failures/

Where `workflow/run-workflow.js`'s `failWorkflow()` writes a record for a
genuine technical/mechanical break (a malformed outline JSON, a `claude` CLI
spawn error, an uncaught exception) — as distinct from `punch-out/`, which is
for a real content/quality defect that needs a human decision. See
`punch-out/punch-out-policy.md` for the full distinction.

This folder is empty by design, not by omission: across all 66 real run
attempts (`run-001`–`run-066`), zero hit a genuine technical failure — every
non-PASS outcome was either a correct guardrail escalation (`punch-out/`) or a
process-level interruption (a killed/timed-out CLI call, documented in
`results/e2e-success-rate-report.md` §4), not a code-level crash. The
directory is created automatically (`fs.mkdirSync(..., {recursive: true})`)
the first time `failWorkflow()` actually fires; this file exists so the
folder — and its zero-count — is visible in the repo rather than silently
absent.
