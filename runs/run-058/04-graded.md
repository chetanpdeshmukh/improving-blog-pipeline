Running the smell test on the pasted draft now. I'll do the Category 2 grep pass first, then score all six checks.

**Category 2 grep hits** (case-insensitive scan for `isn't|wasn't|doesn't|not a |not the |it's not|that's not|rather than|, not |not because`):

- Line 9: "The sync engine didn't reject those accounts. It queued them..." — two-sentence corrective structure
- Line 31: "before the migration date, not after the first failure ticket came in" — bare `, not` tail

No em dashes found in the full text.

---

# AI Smell Test — pasted blog draft

**Date:** 2026-09-27
**Grade:** B · **Word count:** ~520 · **Threshold:** B (default)
**Document type:** Client-facing deliverable

Grade meets the default threshold. No DO NOT SHIP banner — but read the critical finding below before queuing this for publication.

---

## Scorecard

| Category | Score | Weight | Notes |
|---|---|---|---|
| Voice clichés, hollow affirmations & false authoritative framing | 10/10 | 20% | No hits anywhere in the draft |
| Contrast negation & em-dash overuse | 8/10 | 20% | Two instances: one borderline two-sentence pattern (line 9), one `, not` tail (line 31); no em dashes |
| Triadic structures & parallel listing | 9/10 | 10% | One factual three-part sequence (line 9); no templated triadic structures |
| Generic content & fake specifics | 7/10 | 25% | Specifics are excellent throughout; one stale relative date is a real send-blocker |
| Structural tells | 10/10 | 15% | Clean hierarchy, varied paragraph length, appropriate technical shorthand |
| Synonym sprawl, repetition & rhetorical scaffolding | 9/10 | 10% | One deliberate mic-drop closer at the end; no sprawl or opener monotony |

---

## Critical findings

- **Lines 3 and 7:** `"Three months ago, our helpdesk logged 40 Entra ID sync failures every single day."` / `"In January, Improving absorbed a 200-person acquisition."`
  - **Why it's a smell (and a send-blocker):** Today is September 27, 2026. "Three months ago" points to late June 2026. "In January" points to January 2026 — nine months ago. A reader doing the arithmetic finds the opening sentence factually wrong before they reach the second section. This requires math to catch, which is exactly why it slips past a read-through.
  - **Suggested rewrite:** Drop the relative opener and anchor to the month directly: "In January, after absorbing a 200-person acquisition, our helpdesk started logging 40 Entra ID sync failures every single day." Then rework the section-two opener so "In January" doesn't appear twice — for example: "The acquisition brought in 200 employees whose on-prem AD forest ran a schema that predated 2016."

---

## Major findings

- **Line 9:** `"The sync engine didn't reject those accounts. It queued them, retried every 30 minutes, and logged a generic 'attribute value empty' error..."`
  - **Why it's a smell:** Structurally matches the two-sentence corrective template ("X didn't Y. It Z."). Both statements are factual, which makes this borderline — but the negation opener adds nothing the affirmative version doesn't already cover.
  - **Suggested rewrite:** "The sync engine queued those accounts, retried every 30 minutes, and logged a generic 'attribute value empty' error that told the on-call engineer nothing about which of the 6,000 total objects had failed."

- **Line 31:** `"We should have run a schema audit against the acquired forest before the migration date, not after the first failure ticket came in."`
  - **Why it's a smell:** The `, not after` clause is the bare mid-sentence contrast form — a qualifier appended to a sentence that already stands without it. The next sentence already explains what skipping it cost.
  - **Suggested rewrite:** "We should have run a schema audit before the migration date." (Stop there. The following sentence — "A one-hour PowerShell script comparing both schemas would have caught the missing attribute two weeks earlier..." — carries the weight on its own.)

---

## Minor findings

None. The closing two-sentence kicker ("It costs an afternoon. Skipping it cost us three weeks and 94 locked-out accounts.") is a single deliberate rhetorical move at the piece's natural end — one instance, not a recurring pattern. Not a smell.

---

## The one paragraph to rewrite first

**Before:**
> Three months ago, our helpdesk logged 40 Entra ID sync failures every single day. Each one meant a new hire couldn't log into Teams on their first morning, or a manager lost access to SharePoint mid-project. We found the root cause and fixed the provisioning pipeline. The fix held.

**After:**
> In January, after absorbing a 200-person acquisition, our helpdesk started logging 40 Entra ID sync failures every single day. Each one meant a new hire couldn't log into Teams on their first morning, or a manager lost access to SharePoint mid-project. We found the root cause and fixed the provisioning pipeline. The fix held.

(The section-two opener also needs a small revision so "In January" doesn't appear twice — see the critical finding above for the suggested replacement.)

---

## What to do next

- Fix the date inconsistency first: replace "Three months ago" with "In January" and adjust the section-two opener so the month isn't repeated.
- Line 9: merge the two-sentence negation into one affirmative sentence (the rewrite above).
- Line 31: cut the `, not after` qualifier — the next sentence already makes the point.
- Re-run the smell test before publishing.

---

This is a genuinely clean draft for a technical blog post. The specifics are strong (94 users, 6,000 objects, 72 hours, 5,800 remaining users), the narrative earns its conclusion, and there are no hollow affirmations or generic case studies. The date inconsistency is the only real blocker. Fix the opener and this is ready.