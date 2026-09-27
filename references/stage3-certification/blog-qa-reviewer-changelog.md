# blog-qa-reviewer — Skill Changelog

---

## Change 1 — 2026-09-25

**Checkpoint affected:** 2A (Grounded in Transcript)

**What changed:**
Added an explicit unlinked-statistics sub-rule within checkpoint 2A, including a
four-step fix directive with a competitor-source exclusion.

**Why:**
During a live QA review of "Agentic AI: From Demo to Durable Advantage" (Kevin Jordane,
Technical Director — AI Practice), the skill correctly flagged an unlinked MIT stat as
a FAIL. Review of the fix directive revealed a gap: the original guidance did not account
for the common case where the draft originates from a podcast or video transcript, where
the SME cites stats from memory with no hyperlink in the source material.

The updated rule makes three things explicit that were previously implied:
1. Unlinked stats are always a FAIL regardless of where the draft came from.
2. The fix is to locate and link the original publisher — not a secondary source or
   a competitor consulting firm's blog or research report.
3. If the original source cannot be found, the stat must be replaced with a verifiable
   linked alternative or reframed as an observational pattern.

**Test run used for before/after:**
- Article: "Agentic AI: From Demo to Durable Advantage" (Phase 2 + Anti-AI Voice pass)
- Input source: podcast transcript (The Improving Edge, Episode 1)
- Before: skill issued correct FAIL on the unlinked stat but fix directive was silent on
  transcript context and did not mention competitor-source exclusion.
- After: fix directive gives the reviewer a clear four-step path applicable to both
  transcript-sourced and directly-authored content.

**Verdict change:** None. The FAIL threshold for unlinked stats was already correct.
The change sharpens the fix directive only.
