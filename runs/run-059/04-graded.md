I'll run the Category 2 grep pass first, then score all six checks against the pasted draft.

**Category 2 grep pass results:**
- `, not ` — one hit: "before the migration date, not after the first failure ticket came in" (line 32)
- No hits for `isn't | wasn't | doesn't | not a | not the | it's not | that's not | rather than | not because`

No em dashes found in the document.

Now running the full six checks.

**Document type:** Client-facing deliverable (published technical blog post).

**Word count:** ~475 words (body only, excluding editorial note).

**Scores:**
- Category 1 (Voice clichés / false framing): the draft has zero hollow affirmations, no clichés, no false-candor framing. 10/10.
- Category 2 (Contrast negation / em dashes): one bare `, not Y` tail at line 32; zero em dashes. 8/10.
- Category 3 (Triadic structures): no repeated three-item lists, no parallel-bullet monotony. 9/10.
- Category 4 (Generic content / fake specifics): numbers are specific (94 users, 6,000 objects, 5,800+200, 72 hours, 12→1 per day) and internally consistent. Author already removed the unsourced 74% stat. 9/10.
- Category 5 (Structural tells): clean hierarchy and paragraph variation. Minor issue: "Azure AD" in title vs. "Entra ID" in body — same service, two names. 9/10.
- Category 6 (Synonym sprawl / rhetorical scaffolding): clean. No buzzword saturation, no reused rhetorical scaffold, no paragraph-opener monotony. 9/10.

**Weighted average:** (10×0.20) + (8×0.20) + (9×0.10) + (9×0.25) + (9×0.15) + (9×0.10) = **9.00 → Grade A**

Saving the scorecard now.


{"type":"write_file","path":"/private/tmp/claude-502/-Users-Chetan-Deshmukh-Documents-Claude-Cowork-Project-blog-writing-framework-blog-pipeline-stage4/f36cb291-b105-47ca-8c5d-cc50d1fd951d/scratchpad/we-cut-azure-ad-sync-errors.smell-test.md","content":"# AI Smell Test — we-cut-azure-ad-sync-errors-from-40-a-day-to-zero\n\n**Date:** 2026-09-27\n**Grade:** A   ·   **Word count:** ~475   ·   **Threshold:** B\n**Document type:** Client-facing deliverable\n\n## Scorecard\n\n| Category | Score | Weight | Notes |\n|---|---|---|---|\n| Voice clichés, hollow affirmations & false authoritative framing | 10/10 | 20% | Zero instances — no hollow openers, no affirmations, no false-candor framing |\n| Contrast negation & em-dash overuse | 8/10 | 20% | One bare `, not after` tail (line 32); zero em dashes |\n| Triadic structures & parallel listing | 9/10 | 10% | Clean; no repeated three-item lists or parallel-bullet runs |\n| Generic content & fake specifics | 9/10 | 25% | Numbers specific and internally consistent; author already removed one unsourced 74% stat before submission |\n| Structural tells | 9/10 | 15% | Minor naming inconsistency: \"Azure AD\" in title, \"Entra ID\" in body — same service, two names |\n| Synonym sprawl, repetition & rhetorical scaffolding | 9/10 | 10% | Clean; no synonym sprawl, no repeated rhetorical scaffolding |\n\n## Critical findings\n\nNone.\n\n## Major findings\n\n- **Line 32:** \"We should have run a schema audit against the acquired forest before the migration date, not after the first failure ticket came in.\"\n  - **Why it's a smell:** Bare `, not Y` tail appended to a sentence that already stands on its own — the single most common Category 2 pattern from the 2026-09-04 audit. \"Before the migration date\" already implies they ran it late; the tail restates that without adding information.\n  - **Suggested rewrite:** \"We should have run a schema audit against the acquired forest before the migration date. A one-hour PowerShell script comparing both schemas would have caught the missing attribute two weeks earlier and skipped the entire incident.\"\n\n## Minor findings\n\n- **Line 2 vs. line 4:** Title uses \"Azure AD Sync Errors\"; opening paragraph uses \"Entra ID sync failures.\" Same service — Microsoft rebranded Azure AD to Entra ID in 2023. Pick one and apply it consistently. \"Entra ID\" is the current official name; \"Azure AD Connect\" remains the correct product name for the sync engine and should stay as-is.\n- **Line 4:** \"rebuilding the provisioning pipeline from scratch\" — the actual fix was a pre-processing script plus a temporary connector-space split. Accurate in spirit but slightly overstated. \"overhauled\" or \"rebuilt\" without \"from scratch\" would be more precise.\n- **Timeline:** \"Three months ago\" in the opening places the problem in approximately June 2026; \"In January\" places the acquisition in January 2026. If there was a meaningful gap between the acquisition and when sync failures escalated to 40/day, one bridging sentence would help readers track the chronology.\n\n## The one paragraph to rewrite first\n\n**Before (line 32):**\n\n\"We should have run a schema audit against the acquired forest before the migration date, not after the first failure ticket came in. A one-hour PowerShell script comparing both schemas would have caught the missing attribute two weeks earlier and skipped the entire incident.\"\n\n**After:**\n\n\"We should have run a schema audit against the acquired forest before the migration date. A one-hour PowerShell script comparing both schemas would have caught the missing attribute two weeks earlier and skipped the entire incident.\"\n\nThe `, not after the first failure ticket came in` tail adds nothing. \"Before the migration date\" already implies the audit ran too late. Cutting the tail makes the sentence crisper and removes the one contrast-negation smell in an otherwise clean draft.\n\n## What to do next\n\n- Remove the `, not after the first failure ticket came in` tail from line 32 — the sentence is stronger without it.\n- Standardize the service name: use \"Entra ID\" in the title and throughout the body; keep \"Azure AD Connect\" as the sync-tool name because that is still its correct product name.\n- Add one sentence in the opening section bridging the January acquisition to whenever sync failures escalated, if there was a meaningful lag — right now the timeline reads as ambiguous.\n- If the 74% identity migration downtime figure has a source, add it back in \"The problem started with a merge.\" It would strengthen the post. If not, the post stands without it — the existing numbers carry the argument.\n"}


The file was written successfully.


---

# AI Smell Test — we-cut-azure-ad-sync-errors-from-40-a-day-to-zero

**Date:** 2026-09-27
**Grade:** A   ·   **Word count:** ~475   ·   **Threshold:** B
**Document type:** Client-facing deliverable

## Scorecard

| Category | Score | Weight | Notes |
|---|---|---|---|
| Voice clichés, hollow affirmations & false authoritative framing | 10/10 | 20% | Zero instances — no hollow openers, no affirmations, no false-candor framing |
| Contrast negation & em-dash overuse | 8/10 | 20% | One bare `, not after` tail (line 32); zero em dashes |
| Triadic structures & parallel listing | 9/10 | 10% | Clean; no repeated three-item lists or parallel-bullet runs |
| Generic content & fake specifics | 9/10 | 25% | Numbers specific and internally consistent; author already removed one unsourced 74% stat before submission |
| Structural tells | 9/10 | 15% | Minor naming inconsistency: "Azure AD" in title, "Entra ID" in body — same service, two names |
| Synonym sprawl, repetition & rhetorical scaffolding | 9/10 | 10% | Clean; no synonym sprawl, no repeated rhetorical scaffolding |

## Critical findings

None.

## Major findings

- **Line 32:** "We should have run a schema audit against the acquired forest before the migration date, not after the first failure ticket came in."
  - **Why it's a smell:** Bare `, not Y` tail appended to a sentence that already stands on its own. "Before the migration date" already implies they ran it late; the tail restates that without adding information.
  - **Suggested rewrite:** "We should have run a schema audit against the acquired forest before the migration date. A one-hour PowerShell script comparing both schemas would have caught the missing attribute two weeks earlier and skipped the entire incident."

## Minor findings

- **Line 2 vs. line 4:** Title uses "Azure AD Sync Errors"; opening paragraph uses "Entra ID sync failures." Same service — Microsoft rebranded Azure AD to Entra ID in 2023. Pick one and apply it consistently. "Entra ID" is the current official name; "Azure AD Connect" remains the correct product name for the sync engine and should stay as-is.
- **Line 4:** "rebuilding the provisioning pipeline from scratch" is slightly overstated. The actual fix was a pre-processing script plus a temporary connector-space split. "overhauled" or "rebuilt" without "from scratch" would be more precise.
- **Timeline:** "Three months ago" in the opening places the problem in approximately June 2026; "In January" places the acquisition in January 2026. If there was a gap between the acquisition and when failures escalated to 40/day, one bridging sentence would help readers track the chronology.

## The one paragraph to rewrite first

**Before (line 32):**

"We should have run a schema audit against the acquired forest before the migration date, not after the first failure ticket came in. A one-hour PowerShell script comparing both schemas would have caught the missing attribute two weeks earlier and skipped the entire incident."

**After:**

"We should have run a schema audit against the acquired forest before the migration date. A one-hour PowerShell script comparing both schemas would have caught the missing attribute two weeks earlier and skipped the entire incident."

The `, not after the first failure ticket came in` tail adds nothing. Cutting it removes the one contrast-negation smell in an otherwise clean draft.

## What to do next

- Remove the `, not after the first failure ticket came in` tail from line 32.
- Standardize the service name: use "Entra ID" in the title and throughout the body; keep "Azure AD Connect" as the sync-tool name.
- Add one sentence bridging the January acquisition to whenever failures escalated, if there was a meaningful lag.
- If the 74% identity migration downtime figure has a source, add it back. If not, the post stands without it.

---

This is a genuinely strong draft. The specificity is the biggest thing working in its favor: internally consistent numbers (200 + 5,800 = 6,000 total objects), named real consequences (the director locked out for 11 days), and an honest qualification ("that remaining ticket is almost always an unrelated password reset"). The author already caught and removed the one fake specific that was in an earlier version. One line edit on line 32 and two naming/timeline cleanup passes, and this ships.

Scorecard saved at the scratchpad. Let me know if you want to re-run after edits.