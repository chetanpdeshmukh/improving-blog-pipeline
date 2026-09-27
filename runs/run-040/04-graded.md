The draft came in as pasted text, so there's no file path to save next to. I'll present the report inline. Running the Category 2 grep pass first, then scoring all six categories.

---

# AI Smell Test — "Why Your Microservices Playbook Won't Save Your AI System"

**Date:** 2026-09-27
**Grade:** B   ·   **Word count:** ~830   ·   **Threshold:** B (default)
**Document type:** Client-facing deliverable (blog post)

## Scorecard

| Category | Score | Weight | Notes |
|---|---|---|---|
| Voice clichés, hollow affirmations & false authoritative framing | 9/10 | 20% | One mild business-jargon cliché ("table stakes"); no hollow openers, no false-candor framing |
| Contrast negation & em-dash overuse | 9/10 | 20% | Grep pass produced zero hits; no em dashes present in the submitted text |
| Triadic structures & parallel listing | 8/10 | 10% | Two three-item lists, one four-item list; density is within range for an 830-word post |
| Generic content & fake specifics | 8/10 | 25% | Anthropic traffic-routing claim stated as fact without source or attribution to Amon's words; Amon identified by first name only |
| Structural tells | 8/10 | 15% | All four requirements subsections follow an identical formula: bold declarative header → context → expert quote → actionable takeaway |
| Synonym sprawl, repetition & rhetorical scaffolding | 8/10 | 10% | "Category jump" used twice for different referents; opening and closing are both mic-drop style |

**Weighted average:** 8.40 → **B**

## Critical findings

None.

## Major findings

- **Line 29:** "A fallback hierarchy of primary model, lower-capability fallback, and cached response is table stakes for any deployment where load can spike."
  - **Why it's a smell:** "Table stakes" is a jargon placeholder that signals generic authority rather than a real claim. It's not in the canonical list but it reads like one.
  - **Suggested rewrite:** "A fallback hierarchy of primary model, lower-capability fallback, and cached response is the minimum a production deployment needs to handle load spikes without a single point of failure."

- **Line 29:** "even Anthropic routes Claude traffic to alternative models when primary capacity is overloaded."
  - **Why it's a smell:** Stated as observable fact, attributed to "visible evidence" rather than to Amon's direct words or a citable source. If this is Amon's firsthand observation, quote it as such. If it's the author's claim, it needs a link.
  - **Suggested rewrite:** "Amon points to visible evidence: 'Even Anthropic routes Claude traffic to alternative models when primary capacity fills up.'" (then cite the source if one exists)

- **Lines 19, 21, 23, 25 (four requirements subsections):** Every subsection follows the exact same structure — bold declarative header, two to three context sentences, expert quote, single-sentence takeaway.
  - **Why it's a smell:** Perfect structural parallelism across four consecutive subsections is a composition template, not a writing rhythm. A human drafting four subsections in sequence naturally varies the order at least once.
  - **Suggested rewrite:** In at least one subsection, lead with the expert quote or open with the concrete action rather than the bolded claim. The "Stateless APIs" section is the best candidate since Craig's quote is vivid enough to open the paragraph directly.

## Minor findings

- "Category jump" appears on line 11 ("a category jump from what most distributed systems teams have encountered") and again on line 37 ("a category jump from standard data center design") for two different referents. Two instances is below the flag threshold but worth varying in revision.
- The opening ("Twelve years of cloud-native experience. The math still surprised him.") and the closing ("Teams that catch these gaps early spend a week redesigning. Teams that catch them six months in spend a quarter rebuilding.") are both aphoristic mic-drop sentences. Two is legitimate style; if revision adds similar closers to other sections, revisit Category 6.

## The one paragraph to rewrite first

**Before:**
> Circuit breakers apply at any scale. Amon points to visible evidence: even Anthropic routes Claude traffic to alternative models when primary capacity is overloaded. A fallback hierarchy of primary model, lower-capability fallback, and cached response is table stakes for any deployment where load can spike.

**After:**
> Circuit breakers apply at any scale. Amon's evidence: "Even Anthropic routes Claude traffic to alternative models when primary capacity fills up." A production deployment without a fallback hierarchy — primary model, lower-capability fallback, cached response — has a single failure mode it cannot route around when load spikes.

## What to do next

- Source or re-attribute the Anthropic traffic-routing claim. If it came from Amon, quote him saying it; if it's a verifiable public behavior, link to it.
- Replace "table stakes" with a concrete minimum requirement.
- Vary the structure of at least one of the four requirements subsections — the identical bold-header formula is the most visible template tell in the draft.
- Replace one of the two "category jump" instances with different phrasing.
- Read the draft aloud once before shipping — at B grade, the remaining issues are rhythm-level and an ear catches them faster than another grep.

---

Overall the draft is genuinely clean. The Category 2 pass found nothing, the opening avoids every common AI-opener cliché, and the quotes from Amon and Craig are specific and grounded. The three issues worth fixing before ship are the unsourced Anthropic claim, "table stakes," and the requirements-section template uniformity.