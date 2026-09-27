# Remaining Skills to Certify — Stage 3 Work

**Current Status:** 4 of 5 skills certified (95%+)
**Date:** 2026-09-26

---

## What's Done ✅

- **anti-ai-voice**: 95%+ (certified) — All 5 test cases passed
- **blog-qa-reviewer**: 95%+ (certified) — All 5 test cases passed
- **transcript-analysis**: 95%+ (certified 2026-09-26) — All criteria passing after targeted iteration
- **blog-draft-writer**: 95%+ (certified 2026-09-26) — All criteria passing after targeted iteration

---

## transcript-analysis — Iteration Log (2026-09-26)

**Before:** 82% — Gap analysis 3/5, controversy too generic

**Changes made:**
1. Gap Analysis section now requires CRITICAL/NICE-TO-HAVE classification per gap
2. Added probe question: "What assumption does this claim leave unchallenged?" — applied before closing the analysis
3. Aim-for-3-gaps minimum added (forces deeper search)
4. Controversy section now requires named conflict format: "[Industry says X] → [SME says Y]" with transcript evidence + shareable potential rating
5. The "Questions for the SME" output section now explicitly calls out CRITICAL gaps as the filter for follow-up

**After eval test scores:**
- Gap analysis depth: **5/5** — Three classified gaps, probe question surfaced a 4th hidden gap
- Controversy identification: **5/5** — Named conflicts with evidence, not observations

**Status: CERTIFIED**

---

## blog-draft-writer — Iteration Log (2026-09-26)

**Before:** 78% — War story expansion 2/5, tradeoff inclusion 2/5, failure mode missing

**Changes made:**
1. Added "War Story Expansion — Mandatory Checklist" inside Pattern 3: Setup, Pressure, Decision, Outcome — all four beats required per story; if Pressure or Outcome is missing from transcript, flag as gap rather than skip
2. Added "Tradeoff Mandate (Non-Negotiable)" section: every major H2 must contain "When this works / When it fails" framing
3. Added "Failure Mode Requirement": every recommendation must include one sentence on what breaks if ignored or misapplied (Pattern 7 format)
4. Added steps 9 and 10 to Drafting Workflow to enforce both requirements as a checklist
5. Strengthened "What NOT to Do" with explicit war story and tradeoff rules

**After eval test scores:**
- War story expansion: **4/5** — Full four beats present, gap correctly flagged rather than invented
- Tradeoff inclusion: **5/5** — Explicit when/when-not framing per section
- Failure mode framing: **5/5** — Consequential language, not generic warnings
- No-summary-as-conclusion: **PASS** (was borderline, still passing)

**Status: CERTIFIED**

---

## What's Pending ⏳

### 1. ai-smell-test (88% — needs iteration)

**Current issues:**
- Evidence citation not specific enough (naming the finding but not the text it came from)
- Category-2 detection (contrast negation) missing ~10% of instances
- Grade parsing occasionally off by 0.5 points

**Test cases that failed:**
- Evidence grounding check (scoring 3/5 instead of 4/5)
- Category-2 both-shapes detection (scoring 3/5 instead of 4/5)

**Iteration plan:**
1. Read the current skill SKILL.md
2. Enhance the evidence-grounding step to include exact quotes from the draft (not just category names)
3. Improve category-2 detection to catch more contrast negation variations
4. Re-run the failed test cases
5. If now passing, mark as certified

**Estimated effort:** 1.5–2 hours

---

## Total Remaining Effort

**Estimated:** 1.5–2 hours (ai-smell-test only)

---

## How to Proceed

### Next Session:
1. Paste this KB artifact link at the top
2. Load ai-smell-test skill
3. Review the failing test cases (evidence grounding + category-2 detection)
4. Modify the skill prompt to: quote exact source text in evidence, improve contrast-negation detection
5. Re-run the test cases
6. Once passing, all 5 skills are certified — move to Phase 2

### After All 5 Pass:
Phase 2 is 8–12 hours of build work:
- Write run-workflow.js (orchestrator)
- Write guardrails (outline-check, draft-check, voice-check, grade-gate, qa-gate)
- Run 5 end-to-end test runs
- Document audit trail + success rate
- Write README for examiner
- Package ZIP

---

**Checkpoint:** 4/5 skills certified. Only ai-smell-test stands between you and Phase 2.
