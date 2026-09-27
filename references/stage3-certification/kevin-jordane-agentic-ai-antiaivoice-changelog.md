# Anti-AI Voice Pass — Changelog
**Article:** Agentic AI: From Demo to Durable Advantage  
**Author:** Kevin Jordane  
**Pass date:** 2026-09-25  
**Skill:** anti-ai-voice  

---

## What Changed

### Contrast negation kills

These are the highest-frequency AI writing tell. All instances removed or restructured.

| Location | Before | After | Pattern |
|---|---|---|---|
| Intro, para 3 | "The failure patterns are not random. They are predictable" | "The failure patterns are predictable." | X / not-X flip |
| Agent section, para 2 | "This distinction matters because the failure modes..." | "The failure modes of a single model interaction..." | Setup tell ("This distinction matters because") |
| Telephone Game, para 1 | "This is compounding probability, not a model quality problem." | "This is compounding probability. Swapping in a better model does not change the arithmetic." | X not Y → two positive statements |
| HITL section, para 2 | "The two employees did not lose their jobs. They became managers of the agents" | "Both employees became managers of the agents" | Negation opener killed |
| HITL section, para 3 | "That is not the same as approving every agent action." | "Blanket approval of every agent action is overhead, not oversight." | Contrast negation → concrete positive claim |
| Final section, para 1 | "Executives...are not wrong to hesitate." | "Executives...have reasons to hesitate." | Double negative |

### Weak setup phrases removed

| Location | Before | After |
|---|---|---|
| Agent section, para 1 | "An agentic system is different: multiple agents working in sequence or in parallel..." | "An agentic system chains multiple agents in sequence or in parallel..." |
| Agent section, para 2 | "This distinction matters because the failure modes..." | "The failure modes..." |
| Agent section, para 2 | "Most executives, when they approve an 'AI deployment,' are thinking" | "Most executives who approve an 'AI deployment' are thinking" |

### Sentence tightening

| Location | Before | After |
|---|---|---|
| Demo Speed section, para 2 | "The context required to reason about a deeply integrated system is often too large for a single context window, and handling it requires architectural decisions that have nothing to do with model capability." | "Reasoning about a deeply integrated system often exceeds a single context window, and the workarounds require architectural decisions that have nothing to do with model capability." |
| 13-Step Trap, para 1 | "produced by a more complex and more brittle system" | "now running on a more complex and more brittle system" |

---

## Em Dash Status

**Confirmed zero em dashes** in source and in rewrite. No em dashes introduced.  
(KB rule: em dashes banned as AI writing tell.)

---

## What Was NOT Changed

- All facts, numbers, and examples preserved intact (compounding math, 41% stat, construction co. example, BDR team story)
- SME voice and first-person "I" passages unchanged
- Internal links preserved
- Closing line "They moved right." kept as-is (standalone positive; smell test approved after "They did not move fastest." was already removed in prior pass)
- Word count note: still ~990 words, below 1,500-word target. Phase 3 expansion still pending.

---

## Remaining open items (not in scope for this pass)

- Word count below 1,500-word Improving target (needs Phase 3 expansion)
- Construction company example still missing outcome metric (pending SME follow-up)
- MIT citation needs hyperlink
- 2 QA FAILs from prior review still open
