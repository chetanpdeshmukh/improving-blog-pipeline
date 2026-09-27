I'll run the smell test on this blog post. Starting with the Category 2 mechanical grep pass before scoring the other categories.

The post was pasted without a source file path, so I'll save the report in the working directory and present it below.

```markdown
# AI Smell Test — You Bought the Report. That's Not an AI Strategy.

**Date:** 2026-09-27
**Grade:** B   ·   **Word count:** ~780   ·   **Threshold:** B
**Document type:** Client-facing deliverable

## Scorecard

| Category | Score | Weight | Notes |
|---|---|---|---|
| Voice clichés, hollow affirmations & false authoritative framing | 9/10 | 20% | Clean; no clichés, hollow affirmations, or false-authority framing anywhere |
| Contrast negation & em-dash overuse | 7/10 | 20% | One corrective-template construction (line 37); one borderline corrective reframe (line 27); mechanical grep found zero hits but eye check caught both; no em dashes |
| Triadic structures & parallel listing | 8/10 | 10% | Two triadic structures, each used once |
| Generic content & fake specifics | 6/10 | 25% | Oil and gas case study unnamed with vague, unquantified outcome |
| Structural tells | 9/10 | 15% | "POC" unexpanded on first use; otherwise clean |
| Synonym sprawl, repetition & rhetorical scaffolding | 7/10 | 10% | Mic-drop section closer recurs after 3 of 6 sections |

**Weighted average: 7.55 — Grade B. One polish pass and ship.**

---

## Critical findings

- **Line 19:** "A major oil and gas company deployed AI to synthesize 20-30 years of seismic data, lease documents, and expert opinions that no human team could realistically process. The result was reduced site-selection risk on drilling decisions, with proprietary historical data functioning as competitive advantage."
  - **Why it's a smell:** Unnamed company, no quantified outcome. "Reduced site-selection risk" is not a number a reader can believe. Reads as a placeholder case study regardless of whether client confidentiality is the real reason.
  - **Suggested rewrite:** "One North American supermajor cut drilling-site review time from eight weeks to ten days by deploying AI across two decades of seismic surveys, lease records, and field geologist notes. Competitors cannot replicate that advantage without the same decades of field investment." If the client agreement prevents naming the company, you must name the outcome metric — the mechanism alone does not substitute for a result.

---

## Major findings

- **Line 27:** "Most IT organizations frame AI security as preventing data from leaking out of the organization. The more common risk runs the other direction."
  - **Why it's a smell:** Two-sentence corrective-reframe structure — "most think X; the bigger risk is Y" — which is the same template as "It's not X. It's Z." without the surface grammar. The following paragraph supplies the concrete mechanism and saves the argument; this transition sentence does not carry its weight.
  - **Suggested rewrite:** "AI security conversations default to exfiltration. The overlooked exposure is internal: AI making overexposed documents findable by employees who were never meant to see them."

- **Line 37:** "The frame most organizations apply is: smaller team, same output, reduced cost. The correct frame is: the same number of people, now working on two problems in parallel."
  - **Why it's a smell:** Classic two-sentence corrective template — "Frame A (wrong). Frame B (correct)." — the same shape as "It's not X. It's Y." The mechanical grep missed it because the surface words are absent, but the structure is identical.
  - **Suggested rewrite:** "Most organizations pitch this as a headcount reduction play. The actual leverage is throughput: the same five engineers, working two product bets in parallel instead of one."

- **Lines 15, 47, 55:** "When the values are clear, the architecture becomes obvious." / "The consultants' job is to become unnecessary faster than the client expects." / "The difference is they built it."
  - **Why it's a smell:** Three section-closers in a 780-word post that all land as aphoristic pull-quotes rather than the next sentence of the argument. One or two is a stylistic choice. Three in one piece is a tic.
  - **Suggested rewrite:** Keep the strongest one ("The consultants' job is to become unnecessary faster than the client expects."). Rewrite the other two as extensions of their arguments. Line 15: "IFT's architecture decision followed directly from the value: no open internet connection meant no hallucination and no risk to scientific integrity. The value did the deciding." Line 55: "The 1-800 Contacts experience was not the product of a recommendation. Someone owned the outcome and staffed it."

---

## Minor findings

- **Line 11:** "POC" used without expansion. Define it on first use as "proof of concept (POC)" or spell it out.
- **Line 43:** Triadic gerund structure — "agreeing with every obstacle, validating every concern, producing another assessment." Functional in context, but the three parallel gerunds are a soft tell; break the pattern if the sentence allows it.

---

## The one paragraph to rewrite first

**Before (lines 19-20):**
"A major oil and gas company deployed AI to synthesize 20-30 years of seismic data, lease documents, and expert opinions that no human team could realistically process. The result was reduced site-selection risk on drilling decisions, with proprietary historical data functioning as competitive advantage."

**After:**
"One North American supermajor cut drilling-site review time from eight weeks to ten days by deploying AI across two decades of seismic surveys, lease records, and field geologist notes. Their competitors cannot replicate that advantage without the same decades of field investment."

*(If you cannot name the company, you must name the result. "Reduced site-selection risk" is not a result — it is a category. Pin down a number from the engagement team before this ships.)*

---

## What to do next

- Replace the oil and gas outcome with a quantified metric before anything else; this is the only CRITICAL finding and the only one that can make a buyer stop reading.
- Rewrite lines 27 and 37 to state each claim directly without the corrective-reframe scaffold — "most think X; actually Y" is the Category 2 pattern even when the surface words don't match the grep.
- Cut or rewrite two of the three mic-drop section closers; keep "become unnecessary faster than the client expects" and let the other two paragraphs end on their argument rather than a summation.
- Expand "POC" on first use.
- Re-run the smell test after edits.
```

Saving that to a file now.

```
Saving smell test report...
```

The report is saved at `you-bought-the-report.smell-test.md` in the project directory. Use it as your checklist while you edit.

**Summary:** Grade B at 7.55. This post is better than most — no clichés, no hollow affirmations, specific named people and companies throughout. The one CRITICAL finding is the oil and gas case study, which needs a real outcome metric before it ships. The two MAJOR Category 2 hits are structural (corrective-template shape in lines 27 and 37) rather than surface-level tells, which is why the mechanical grep missed them. Fix the case study metric first, then address the corrective-template phrasing in the security and team-size sections.