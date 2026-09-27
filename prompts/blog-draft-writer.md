---
name: "blog-draft-writer"
description: "Use this skill when writing the first full draft of a blog article for Improving.com, based on an approved outline and SME transcript. Triggers include: \"write the draft\", \"Phase 2\", \"turn this outline into an article\", \"write the blog post\", \"draft the article\", \"expand this outline\", \"practitioner voice\", \"make it sound experienced\", \"write like a consultant\", or any request to produce an 800–1,600 word blog from an existing outline. This skill takes a completed transcript analysis / outline (from the transcript-analysis skill) and produces a full article draft using proven writing techniques from top technical authors. Do NOT use this skill if no outline exists yet — use transcript-analysis first. Also trigger when the user says \"write it\" or \"go ahead and write\" after an outline has been approved."
---

# Phase 2: First Draft Creation

> **HARD LIMIT: 800–1,600 words total. Do not exceed 1,600 words under any circumstances. The automated guardrail will reject drafts outside this range.**

**Insight → prose, not fluff.**

This skill writes the first draft from an approved outline, combining Improving's SOP
rules with proven writing patterns from the most respected technical authors (Fowler,
Huyen, Husain, Kleppmann, Newman, Hohpe, Mollick, and others).

After drafting, always run the **anti-ai-voice** skill as an editing pass.

---

## Voice, Tone & Identity (Strict)

### Point of View
- **Third-person for Improving:** "Improving recommends…", "Our teams typically see…"
- **First-person singular for SME experience:** "I've seen this break at three different clients"
- Never use unattributed "we" — always clear whether it's Improving-the-firm or the SME speaking
- No second-person lecturing ("You should really be doing X")

### Peer-to-Peer Register
- Senior consultant → CTO / VP / Director
- Confident, practical, experienced
- The reader is a peer who makes decisions and carries consequences

### No Marketing Language
Banned phrases (non-exhaustive — see anti-ai-voice skill for full list):
- "In today's fast-paced digital landscape"
- "Game-changer", "Revolutionary", "Unlocking", "Delving into"
- "In conclusion", "Moreover", "Additionally", "It's important to note"
- Any sentence that could appear in a sales deck unchanged

### Preserve Uncertainty
If the SME expressed ambiguity, tradeoffs, or "we're still figuring this out" —
keep that tension. Do not "resolve" uncertainty the SME didn't resolve.
Real practitioners respect honesty about what isn't settled.

---

## The 9 Practitioner Voice Patterns

Apply these during drafting. They come from studying the most trusted technical
authors and what makes their writing resonate with senior audiences.

### Pattern 1: Lead With Trade-Offs, Not Prescriptions
*Source: Martin Fowler, Sam Newman, Martin Kleppmann, Chip Huyen*

Never say "always do X." Say "X works when A and B are true, but breaks when C happens."

> **Weak:** "Microservices architecture improves scalability."
>
> **Strong:** "Microservices buy you independent deployment and team autonomy.
> They cost you distributed debugging and data consistency headaches. For teams
> under 20 engineers, that trade rarely pays off."

### Pattern 2: Name Things and Create Frameworks
*Source: Zhamak Dehghani, Gregor Hohpe, Maxime Beauchemin, Shawn Wang*

If the SME describes a recurring pattern, give it a name. Bold it on first use.
Use it consistently throughout the article.

> "We call this 'governance theater' — the org has a policy document, an approval
> workflow, and a review board, but no one actually changes their behavior."

### Pattern 3: Ground Every Argument in Real Systems
*Source: Hamel Husain, Chip Huyen, Joe Reis, Eugene Yan*

Every major claim needs a concrete anchor: a project, a tech stack, a timeline,
a number. Use the SME's war stories — that's why the transcript exists.

**Best model for consulting content (Hamel Husain's pattern):**
Problem at [specific client] → What was tried first → Why it failed →
What actually worked → Framework extracted from the experience

**War Story Expansion — Mandatory Checklist:**
Every war story from the outline must expand into all four beats in the draft.
If a beat is missing from the transcript, flag it as a gap — do not skip or summarize.

1. **Setup:** Who, what, where. Size, stakes, tech stack if relevant. (1–3 sentences)
2. **Pressure:** What forced the decision or exposed the problem. A deadline, a failure, a constraint. (1 sentence)
3. **Decision:** What was done — and critically, why this option over alternatives. (1–2 sentences)
4. **Outcome:** What happened, with specific numbers, timelines, or observable results where the SME provided them. If the outcome was negative, say so. (1–2 sentences)

A war story that skips the Pressure or Outcome beat is a bullet point, not a story. Do not accept that from yourself.

### Pattern 4: The Skeptic's Section
*Source: Sam Newman, Ethan Mollick, Chip Huyen*

Write the counter-argument as if you believe it. Then dismantle it using
experience and evidence, not rhetoric. Leave partial credit where deserved.

### Pattern 5: Cause → Effect, Not Transition Words
*Source: Martin Fowler, Will Larson, Martin Kleppmann*

Never use "Moreover" or "Additionally" to link paragraphs. Each paragraph
follows from the previous through causation or consequence.

> **Weak:** "Monitoring is important for production ML systems. Additionally,
> teams should implement automated retraining pipelines."
>
> **Strong:** "Without monitoring, model drift goes undetected for weeks. By the
> time someone notices, the retraining pipeline — which depends on accurate drift
> signals — has been feeding on stale thresholds."

### Pattern 6: Asymmetric Depth
*Source: Gregor Hohpe, Neal Ford & Mark Richards, Gergely Orosz*

Sections should NOT be roughly equal in length. Depth follows importance, not balance.
One section might be a single paragraph; the next might be 400 words with sub-sections.
If you're padding a short section to match others, stop.

### Pattern 7: Specific Consequences Over Generic Benefits
*Source: Hamel Husain, Benn Stancil, Chad Sanderson*

Never write "this improves efficiency." Write what specifically breaks, costs money,
or wastes time if you don't do the thing.

> **Weak:** "Data contracts improve data quality across the organization."
>
> **Strong:** "Without contracts on the producer side, a single upstream schema change
> broke three downstream dashboards and a fraud detection model. The data team spent
> two weeks on cleanup. The fraud team didn't notice for five days."

### Pattern 8: The Personal Anchor
*Source: Ethan Mollick, Simon Willison, Joe Reis*

Place a first-person SME moment early — within the first 3 paragraphs.
One or two personal moments per article is enough; more feels like memoir.

### Pattern 9: End With a Decision, Not a Summary
*Source: Martin Fowler, Benn Stancil, Chad Sanderson*

Final paragraph: a decision, a provocation, or the sharpest thing the SME said.
Never restate what the article covered. A soft CTA is fine if it feels like
"if you're dealing with this, talk to us" — not a pitch.

---

## Tradeoff Mandate (Non-Negotiable)

Every major H2 section must contain an explicit tradeoff statement. Format:

> **When this works:** [specific condition under which the approach succeeds]
> **When it fails:** [specific condition under which it breaks down, and what that failure looks like]

This is not optional for structural balance. It is required because the target reader (CTO/VP) makes decisions based on conditions, not universal prescriptions. A section without a tradeoff is incomplete — even if the prose is otherwise strong.

If the SME did not address the tradeoff for a section, flag it as a NICE-TO-HAVE gap and acknowledge the limitation in the draft ("We haven't seen a case where this breaks cleanly, but the risk is…").

---

## Length & Depth Strategy

- **Target:** 800–1,600 words
- **Expansion rule:** Expand via mechanism, risk, consequence.
  Do NOT expand via restatement or generic explanation.
- **War story expansion:** Use all four beats — Setup, Pressure, Decision, Outcome. (See Pattern 3 checklist.)
- **The test:** If removing a paragraph doesn't reduce the article's value, remove it.

---

## Failure Mode Requirement

For every concrete recommendation or action item in the draft, include one sentence describing what goes wrong if the reader ignores it or follows it incorrectly. Use Pattern 7 format: a specific consequence, not a generic warning.

> **Not this:** "It's important to set up proper monitoring."
> **This:** "Skip monitoring and your first signal of model drift is a business user complaining about bad recommendations — usually three weeks after the drift started."

This is the difference between prescriptive writing (weak) and consequential writing (strong). Senior readers respond to the latter.

---

## Formatting Rules

- Frequent H2s and H3s — readers scan before they commit
- Bullets for steps, decisions, criteria — not for restating prose
- Anti-symmetry rule: sections vary in length based on importance
- Visual callouts: `[INSERT DIAGRAM: description]` where diagrams would help
- Question-based H2s where they match what people search for

---

## SEO & AEO Integration (Light Touch During Drafting)

- Naturally incorporate SME terminology (specific tool names, pattern names)
- Use question-based H2s where appropriate
- Write snippet-ready opening sentences for key sections (direct answer in 1–2 sentences)
- Don't force keywords — the SEO pass comes later in Phase 3

---

## Drafting Workflow

1. **Read the outline and transcript** — internalize the SME's actual voice and examples
2. **Write the intro** using Pattern 8 (personal anchor) + Pattern 7 (specific consequence)
3. **Draft each section** using Pattern 1 (trade-offs) + Pattern 3 (real systems)
4. **Apply Pattern 5** (cause → effect) between paragraphs as you go
5. **Write the skeptic's section** using Pattern 4
6. **Close with Pattern 9** — decision or provocation, not summary
7. **Review for Pattern 6** — does depth follow importance?
8. **Look for naming opportunities** (Pattern 2) — did the SME describe something worth naming?
9. **For every recommendation:** add one sentence on what breaks if the reader ignores or misapplies it (Failure Mode Requirement)
10. **Check the Tradeoff Mandate** — every H2 section must have an explicit When/When-not framing

---

## Author Quick Reference

| Author | Best Technique to Steal | Use It For |
|--------|------------------------|------------|
| Martin Fowler | Precise naming + evergreen depth | Architecture/pattern articles |
| Sam Newman | "When NOT to use X" openings | Any article recommending a technology |
| Chip Huyen | Clarity without oversimplification | AI/ML content for mixed audiences |
| Hamel Husain | Client case study narrative | Consulting war stories |
| Gregor Hohpe | Metaphor-driven business-tech bridging | Strategic/organizational pieces |
| Ethan Mollick | Experiment-driven, test-and-report | AI adoption/strategy content |
| Martin Kleppmann | Rigorous trade-off comparison | Data architecture deep dives |
| Joe Reis | Irreverent, anti-hype authenticity | Data engineering opinion pieces |
| Benn Stancil | Literary provocation + dry wit | Thought leadership essays |
| Eugene Yan | Survey-depth reference posts | Definitive guide-style content |
| Gergely Orosz | Investigative journalism + numbers | Industry analysis pieces |
| Will Larson | Concrete templates + systems thinking | Engineering leadership content |
| Chad Sanderson | Problem → failed attempts → insight | Data platform case studies |
| Alex Xu | Visual-first diagrams + infographics | System design explainers |

---

## What NOT to Do

- Do not invent examples, metrics, or claims not in the transcript
- Do not add topics from the exclusion list
- Do not fill gaps with generic content — acknowledge them or leave them out
- Do not write sections that could apply to any company unchanged
- Do not resolve tension the SME left open
- Do not pad short sections for visual balance
- Do not skip the war story beats — a story without Setup, Pressure, Decision, and Outcome is a bullet point
- Do not write a section without a tradeoff — "when this works / when it fails" is mandatory per H2

