# AI Smell Test — kevin-jordane-agentic-ai-v2

**Date:** 2026-09-25  
**Grade:** B   ·   **Word count:** ~985   ·   **Threshold:** B  
**Document type:** Client-facing deliverable  
**vs. v1:** Was B (7.78) → Now B (8.40) · **+0.62 points · +8.0% improvement**

✅ **PASSES threshold** — one polish pass before handing to blog-qa-reviewer.

---

## Scorecard

| Category | Score | Weight | Notes |
|---|---|---|---|
| Voice clichés, hollow affirmations & false authoritative framing | 9/10 | 20% | Zero banned vocab; "Here is the math most agent architecture discussions skip" is a mild false-authority frame, immediately earned by specific numbers |
| Contrast negation & em-dash overuse | 8.5/10 | 20% | 3 grep hits; 1 real tell (Line 43, introduced in anti-ai-voice pass); 1 borderline (Line 3); zero em dashes confirmed |
| Triadic structures & parallel listing | 8.5/10 | 10% | One triadic closer in final paragraph (understood / redesigned / put humans); no systemic formula |
| Generic content & fake specifics | 7.5/10 | 25% | BDR story well-grounded (41%, 3 months); construction story still missing outcome metric; two unattributed claims ("LLM quality threshold", "AI projects stall") |
| Structural tells | 8.5/10 | 15% | H2s specific and varied; section lengths uneven (good); two H2s use "Is Not" construction (minor) |
| Synonym sprawl, repetition & rhetorical scaffolding | 9/10 | 10% | Single closing mic-drop ("They moved right.") — one instance, acceptable; no sprawl, no opener monotony |

---

## vs. v1 delta by category

| Category | v1 | v2 | Change |
|---|---|---|---|
| Voice clichés | 8/10 | 9/10 | +1.0 |
| Contrast negation | 7/10 | 8.5/10 | +1.5 |
| Triadic structures | 8.5/10 | 8.5/10 | 0 |
| Generic content | 7.5/10 | 7.5/10 | 0 |
| Structural tells | 8/10 | 8.5/10 | +0.5 |
| Synonym sprawl | 8.5/10 | 9/10 | +0.5 |
| **Weighted total** | **7.78** | **8.40** | **+0.62 (+8.0%)** |

Biggest gain: Category 2 (+1.5). Six contrast negation instances removed. One new bare tail introduced ("overhead, not oversight") — see Major finding below.

---

## Major findings

- **Line 43:** "Blanket approval of every agent action is overhead, not oversight."
  - **Why it's a smell:** Bare mid-sentence tail "..., not Y" — introduced during the anti-ai-voice pass itself when replacing "That is not the same as approving every agent action." Traded one contrast negation for another.
  - **Suggested rewrite:** "Blanket approval of every agent action is overhead. The goal is coverage of the decisions that actually matter." Or: "Placing a human at decision points that matter is oversight. Approving every action is just overhead."

- **Line 3:** "Not because the technology is overhyped, but because the mental model most executives carry into agent deployment is wrong..."
  - **Why it's a smell:** "Not because X, but because Y" — borderline contrast negation shape not caught by grep. Lean toward flagging per skill rules. Second paragraph is an exposed position.
  - **Suggested rewrite:** "The cause is the mental model most executives carry into agent deployment — wrong in ways that are hard to see until a project is already six months in."

---

## Minor findings

- **Line 47:** "Most enterprise AI projects stall before delivering measurable value at scale." — Previously attributed to MIT (95% figure) in the smell panel but rendered unattributed in article body. Needs either a hyperlinked citation or the claim softened to a general observation.
- **Line 49:** "LLM quality has crossed a meaningful threshold in the past 12 months." — No citation, no specificity. Acceptable as opinion from an SME author if framed that way; borderline if read as stated fact.
- **H2s:** "Demo Speed Is Not Enterprise Readiness" and "Starting Is Not Optional Anymore" both use "Is Not" structure. Two in six headers is a minor tell. Consider reframing one: "Production Readiness Is an Architecture Problem" or "The Cost of Waiting."
- **Construction story:** Still no quantified outcome metric from the client. Tagged as pending SME follow-up in prior passes. Remains a Cat 4 gap.

---

## The one paragraph to rewrite first

**Line 43 (HITL closer):**

> Before: "Human-in-the-loop in production means placing a human at the decision points where variability is high and the cost of a wrong answer is real. Blanket approval of every agent action is overhead, not oversight. Getting there requires understanding the workflow before you automate it."

> After: "Human-in-the-loop in production means placing a human at the decision points where variability is high and the cost of a wrong answer is real. Blanket approval of every agent action is overhead. Getting there requires understanding the workflow well enough to know which decisions actually carry risk."

---

## What to do next

- Fix Line 43 ("overhead, not oversight" tail) — 90-second surgical rewrite above.
- Consider reframing Line 3 to drop the "Not because X" structure.
- Source the MIT/AI-projects-stall citation or soften to attributed SME opinion.
- Get outcome metric from Kevin for the construction software story before Phase 3 expansion.
- Re-run smell test after Line 43 fix — that single change likely pushes Cat 2 to 9/10 and the overall score to ~8.65.

---

*Scorecard retained for remediation. Delete after Kevin confirms draft is ready for Phase 3.*
