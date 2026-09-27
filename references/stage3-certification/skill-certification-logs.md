# Skill Certification Logs — Stage 4 Submission Evidence
**Candidate:** Chetan Deshmukh (chetan.deshmukh@improving.com)
**Extracted:** 2026-09-26
**Purpose:** Iteration history and usage evidence for each blog pipeline skill, for examiner review alongside the Stage 4 submission.

---

## aeo-services-page-audit

**Status:** Stage 3 formally certified
**Pipeline role:** Not in blog pipeline — Chetan's primary Stage 3 submission skill

### Eval Criteria
1. Reads the target services page and extracts current content accurately
2. Pulls positioning briefs and client objections from SharePoint context
3. Identifies missing structured data / JSON-LD and proposes correct schema
4. Checks AI assistant visibility signals (cited sources, answer-friendly structure)
5. Compares against competitor pages and identifies content gaps
6. Produces full rewrite with JSON-LD schema embedded
7. Outputs prioritized action table (Quick wins vs. Strategic investments)

### Iteration Log
Certified as primary Stage 3 submission. Eval evidence assembled via `stage3-cert-evidence`. Ready for human review.

### Usage Log
Active on Improving.com services pages. Used in ongoing AEO audits.

---

## transcript-analysis

**Status:** Certified 2026-09-26
**Pipeline role:** Step 1 — reads raw SME interview transcript, produces JSON outline

### Eval Criteria
1. Extracts the real problem from transcript (not the surface topic)
2. Identifies non-obvious insights and flags them explicitly
3. Gap analysis: minimum 3 gaps, each classified CRITICAL or NICE-TO-HAVE
4. Applies probe question: "What assumption does this claim leave unchallenged?"
5. Controversy section uses named-conflict format: [Industry says X] → [SME says Y] with transcript evidence + shareable potential rating
6. CRITICAL gaps surface in "Questions for the SME" output section

### Iteration Log
**Before:** 82% — gap analysis 3/5, controversy too generic

**Changes (2026-09-26):**
1. Added CRITICAL/NICE-TO-HAVE classification per gap
2. Added probe question mandate before closing analysis
3. Added aim-for-3-gaps minimum
4. Named-conflict format for controversy with transcript citation and shareable rating
5. CRITICAL gaps drive the follow-up questions section

**After:** Gap analysis 5/5, Controversy 5/5. All criteria passing.

### Usage Log
Used in blog pipeline Step 1. Active in Devlin Liles series and Claudio Lassala series.

---

## blog-draft-writer

**Status:** Certified 2026-09-26
**Pipeline role:** Step 2 — expands outline into full 1,500–3,000 word draft

### Eval Criteria
1. War story expansion uses all 4 beats: Setup / Pressure / Decision / Outcome — missing beats flagged as gaps, not skipped
2. Every major H2 contains "When this works / When it fails" Tradeoff framing
3. Every recommendation includes one Failure Mode sentence (what breaks if ignored or misapplied)
4. No summary-as-conclusion (article ends on a specific insight, not a recap)
5. SME voice maintained — no generic consultant filler or symmetrical structure

### Iteration Log
**Before:** 78% — war story expansion 2/5, tradeoff inclusion 2/5, failure mode missing entirely

**Changes (2026-09-26):**
1. Added "War Story Expansion — Mandatory Checklist" inside Pattern 3: Setup/Pressure/Decision/Outcome — all 4 beats required; if Pressure or Outcome missing from transcript, flag as gap rather than skip
2. Added "Tradeoff Mandate (Non-Negotiable)": every major H2 must contain when/when-not framing
3. Added "Failure Mode Requirement": every recommendation must include one sentence on what breaks if ignored or misapplied (Pattern 7 format)
4. Added steps 9 and 10 to Drafting Workflow to enforce both as a checklist
5. Strengthened "What NOT to Do" with explicit war story and tradeoff rules

**After:** War story 4/5 (gap correctly flagged not invented), Tradeoff 5/5, Failure mode 5/5.

### Usage Log
Used in blog pipeline Step 2. Active for Kevin Jordane, Devlin Liles, and Claudio Lassala series.

---

## anti-ai-voice

**Status:** Certified (2026-09-25 eval run)
**Pipeline role:** Step 3 — strips AI-sounding language, rewrites banned patterns

### Eval Criteria
1. Banned word sweep: removes ~50 specific terms (leverage, seamless, Moreover, Additionally, etc.)
2. Banned opener patterns: removes 5 named openers ("In today's…", "As organizations increasingly…", etc.)
3. Banned rhetorical structures: removes 8 named patterns (Most people/the few who…, Stop X Start Y, Here's the thing…)
4. Banned transition fillers: removes Moreover, Furthermore, That said, and 9 others as sentence openers
5. Banned summary templates: removes 5 wrap-up formulas ("By [doing X], organizations can [achieve Y]", etc.)
6. Anti-symmetry: no decorative lists, no rule-of-three padding, natural uneven flow

### Iteration Log
All 5 manual eval test cases passed at 95%+ (2026-09-25):
- contrast-negation-swap: PASS
- banned-words-sweep: PASS
- banned-opener-patterns: PASS
- em-dash-ban: PASS
- setup-phrase-removal: PASS

**Error caught (C4):** v2 smell test found a regression at Line 43 of Kevin Jordane article — the anti-ai-voice pass introduced "overhead, not oversight" (a bare tail contrast negation), trading one AI tell for another. Caught because the smell test ran after the pass. This is the pipeline's error-catching discipline working as designed.

Supporting files in workspace:
- `anti-ai-voice Stage 3 Certification Evidence.md` — full evidence package
- `anti-ai-voice-evals.json` — 5 test cases with assertions
- `kevin-jordane-agentic-ai-antiaivoice-changelog.md` — before/after edit documentation
- `kevin-jordane-agentic-ai-v2.smell-test.md` — quantified improvement (7.78 → 8.40/10, +8.0%)

### Usage Log
Applied to Kevin Jordane "Agentic AI: From Demo to Durable Advantage" (2026-09-25). Designated pass for Devlin Liles series (5 drafts), Claudio Lassala series (5 drafts), Joshua Holtz draft.

---

## ai-smell-test

**Status:** Certified (after causal negation fix iteration)
**Pipeline role:** Step 4 — grades draft A–F on AI authenticity; triggers revision loop if C or below

### Eval Criteria
1. Evidence citation: names the exact source text, not just the category of finding
2. Category-1 detection: passive voice, abstract subjects, hedge stacking
3. Category-2 detection: contrast negation ("not X, but Y" constructions) — catches bare-tail variants too
4. Grade parsing: outputs "Grade: X" in consistent parseable format (A–F, single letter)

### Iteration Log
**Before:** 88% — evidence citation scoring 3/5, category-2 detection missing ~10% of contrast negation variants (grade occasionally off by 0.5 points)

**Changes (causal negation fix iteration):**
1. Enhanced evidence-grounding step to include exact quotes from the draft, not just category names
2. Improved category-2 detection to catch bare-tail contrast negation variants ("X, not Y" mid-sentence)

**After:** 4/4 criteria passing. Kevin Jordane v2 score: 8.40/10 (Grade B), up from 7.78/10 (Grade C) on v1.

Supporting files in workspace:
- `kevin-jordane-agentic-ai-v2.smell-test.md` — quantified before/after scores
- `ai-smell-test-SKILL.md` — current certified version

### Usage Log
Applied to Kevin Jordane article (v1 and v2). Active in blog pipeline Step 4 — grade A or B proceeds, C or below triggers revision loop in `run-workflow.js` (max 2 rounds before punch-out).

---

## blog-qa-reviewer

**Status:** Certified (7/7 eval criteria, 2026-09-25)
**Pipeline role:** Step 5 — adversarial gate; any FAIL → punch-out to human review

### Eval Criteria
1. Verdict correctness: correctly identifies FAIL for unlinked statistics
2. Verdict correctness: correctly identifies FAIL for vague AI capability claims
3. Verdict correctness: correctly identifies FAIL for missing required sections
4. Fix directive quality: specific, actionable, names the exact fix (not "add more detail")
5. False positive rate: no incorrect FAILs on PASS-quality inputs
6. PASS/WARN/FAIL format: output uses consistent prefix notation (parseable by `qa-gate.js` regex)
7. Escalation discipline: any single FAIL in output means the whole article fails (hard gate, no partial passes)

### Iteration Log
All 5 manual eval test cases passed at 7/7 criteria (2026-09-25):
- unlinked-stats: FAIL correctly identified, fix directive actionable
- vague-capabilities: FAIL correctly identified, specific rewrite suggested
- missing-sections: FAIL correctly identified, section names called out
- specific-examples: PASS correctly given, no false positive
- unsupported-claims: FAIL correctly identified, cited claim flagged

Supporting files in workspace:
- `blog-qa-reviewer-evals.json` — 5 test cases with assertions
- `blog-qa-reviewer-SKILL.md` — current certified version
- `blog-qa-reviewer-changelog.md` — iteration history

### Usage Log
Active as Stage 4 pipeline gate in `blog-pipeline-stage4/guardrails/qa-gate.js`. Any FAIL output routes to `punch-out-record.json`. All PASS/WARN output proceeds to `blog-refinement` (Step 6).

---

*End of certification logs. Supporting eval files, changelogs, and evidence packages are in the blog writing framework workspace folder.*
