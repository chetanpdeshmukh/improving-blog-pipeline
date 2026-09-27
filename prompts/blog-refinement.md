---
name: blog-refinement
description: >
  Use this skill for the final expansion, SEO optimization, and polish pass on an
  Improving.com blog draft before publication. Triggers include: "refine the draft",
  "Phase 3", "polish this article", "SEO pass", "final edit", "prepare for publication",
  "publication kit", "meta description", "title tag", "URL slug", "make it publish-ready",
  "optimize for search", "AIO", "AI overview", "GEO", "LLMO", "LLM optimization",
  "featured snippet", "internal linking", "make this rankable", or any request to take
  an existing draft and make it sharper, more discoverable, and ready to go live. Also
  trigger when the user asks for a "final pass", "tighten this up", or "get this ready
  for review". This skill produces the refined article plus the full publication kit
  (SEO title, meta description, URL slug, social teaser). Use this after the
  blog-draft-writer skill has produced a first draft.
---

# Phase 3: Expansion, SEO, AI Citation & Final Polish

This is the final refinement pass. It combines content strengthening with
discoverability optimization across three channels: traditional search (Google),
AI Overviews / featured snippets, and LLM citation (when AI tools summarize or
reference content).

**Run this AFTER the draft is written and the anti-ai-voice editing pass is complete.**

---

## Task 1: Strengthen the Introduction

The intro must earn the reader's attention in 3 paragraphs or fewer.

- **Lead with stakes or a failure scenario** — not a topic overview
- Use Pattern 8 (personal anchor) if the draft doesn't already have one in the opening
- Use Pattern 7 (specific consequence) — what goes wrong if this topic is ignored?
- Avoid generic framing ("Organizations are increasingly adopting…")
- A busy CTO should grasp the article's core argument from just the first 3 paragraphs

**Test:** Would you keep reading this intro if you saw it on LinkedIn at 7 AM? If not, rewrite.

---

## Task 2: Expand "How-To" and Technical Sections

For each section with implementation steps or recommendations:

- **Deepen technical steps** — explain why the step exists, not just what it is
- **Add what breaks if skipped** — specific failure modes, not vague warnings
- **Add the mechanism** — how does this actually work under the hood?
- **If expansion doesn't add risk or mechanism, don't add it** — no padding

Expansion sources (use these, never invent):
- SME transcript (primary)
- Logical consequences of the decisions described
- Common failure patterns the target audience would recognize

---

## Task 3: Validate the Skeptic's View

The counter-argument section must be strong enough that a reasonable person could hold that position.

- **Make the counter-argument intelligent and credible** — no strawmanning
- **Dismantle it using experience and evidence, not rhetoric**
- **Leave partial credit where the counter-argument has a point**
- If the skeptic's section reads like it was written to lose, rewrite it

---

## Task 4: Search Intent & Competitive Analysis

Before optimizing structure, research the competitive landscape:

1. **Primary search query** — What would someone Google to find this article?
   Search for it. Look at what currently ranks.
2. **Search intent** — Decision framework? How-to? Diagnosis? Understanding?
3. **Content gap** — What do the top 5 results miss that this article covers?

State findings briefly, then use them to inform Tasks 5–7.

---

## Task 5: Structure Optimization for Snippets and AI Extraction

### Question-Based Headers
Convert 2–3 H2s into question format that matches search behavior.
Only where the question form is natural — don't force it.

- "How the migration failed" → "Why do cloud migrations fail at the data layer?"
- "Our approach to governance" → "What does practical AI governance look like?"

### Snippet-Ready Opening Sentences
For each question-based H2, ensure the first 2–3 sentences directly answer
the question in a concise, self-contained way. This is what gets pulled into
featured snippets and AI Overviews.

> [Direct answer in 1 sentence.] [Key qualification in 1 sentence.]
> [Supporting detail that makes the answer specific.]

### Definition Moments
If the article introduces a concept, framework, or term, include a clean
1–2 sentence definition near its first mention. LLMs pull these heavily.

---

## Task 6: AI Citation Optimization (LLMO / AIO / GEO)

LLMs increasingly cite and summarize technical content. To increase citation probability:

### Authoritative Framing
- Include specific numbers, timeframes, and named technologies
- Reference Improving's direct experience where grounded: "Based on [X] engagements…"
- Attribute claims to named roles: "Improving's data architects recommend…"

### Structured Data Patterns
LLMs extract structured information more reliably than prose:
- Comparison tables for technology decisions
- Numbered steps for processes
- "If [condition], then [recommendation]" decision frameworks

### Quotable Statements
Identify 2–3 sentences that are sharp, specific, and self-contained enough to
stand alone as a citation. They should include the key insight and name
Improving or the SME as the source.

---

## Task 7: Internal Linking

### Service Page (1 required)
Find the single most relevant Improving.com service page. Link it naturally
within the body — helpful reference, not a pitch.

Search improving.com for the article's primary topic to find the right page.

> **Good:** "…which is why Improving's AI consulting practice starts every
> engagement with a data readiness assessment."
>
> **Bad:** "Learn more about our AI services here."

### Related Blogs (1–2 if applicable)
Search for existing Improving.com blog posts on related topics. Link where
they add genuine value (further reading, supporting evidence, related case study).

If no relevant blogs exist, note this as a content gap opportunity.

---

## Task 8: Final AI Detox Pass

After all expansion and optimization, do one more sweep:

- Remove or rewrite any generic consulting language that crept in
- Kill non-committal phrasing where a stance is warranted
- Kill overly balanced language where the SME has a clear position
- Verify no banned words or AI patterns reappeared during editing
- Check that SME terminology (specific tools, pattern names) is preserved

---

## Task 9: Generate Publication Kit

At the end of the article, produce:

### SEO Title Tag (2 options)
- ≤60 characters
- Front-load the primary keyword
- Include "Improving" if space allows
- Specific and click-worthy for the target audience

### Meta Description (2 options)
- ≤155 characters
- Summarize unique value, not generic topic
- Include primary keyword naturally
- End with a reason to click (consequence, insight, or question)

### URL Slug
- Lowercase, hyphenated, 3–6 words
- Include primary keyword, no dates or filler

### Social Sharing Teaser
- 1–2 sentences for LinkedIn post
- Provoke curiosity to click through — a hook, not a summary

### Internal Links Summary
- List service page and blog links with exact anchor text and placement location

---

## Final Output Requirement

- The refined article must be copy-pasteable into Microsoft Word
- No markdown artifacts in the output
- Clean formatting with clear H2/H3 hierarchy
- Publication kit appended at the end, clearly separated

---

## What NOT to Do

- Do not stuff keywords unnaturally
- Do not add generic H2s just for SEO ("What is [topic]?") unless the audience needs them
- Do not compromise the article's voice for search optimization
- Do not add sections not grounded in the transcript — flag opportunities to the user
- Do not create clickbait titles — the audience is too senior
- Do not introduce new claims, metrics, or examples not in the source material
