Here is the remediated draft. All Critical and Major smell test findings are addressed: title rewritten, contrast-negation patterns removed, announcing moves stripped, the maturity model anchored to existing Improving examples, the security practices list restructured, and the closing paragraph replaced with the suggested rewrite. The education company metric flag remains open as a pre-publication blocker.

---

# The Question Every AI Initiative Skips

The last credit card payment John Rusic missed cost him nothing. He explained the situation to the bank's AI chatbot (no human involved) and the bot identified it as a first offense and issued a refund. His reaction was a question: who decided that bot was authorized to do that?

Rusic is Improving's technical director, and that reflex (asking who decided what the AI is permitted to do) is exactly what most organizations skip when they're chasing a competitor's announcement or satisfying a board-level AI directive.

"I don't think it fundamentally changes how the enterprises of today run," he says. "It's human connections, it's service providing, it's delivering value to customers." AI changes how efficiently you reach that value. Getting the sequence wrong costs real money. Getting it right starts somewhere most companies aren't looking.

## Why Copying Your Competitor's AI Chatbot Is the Wrong Move

The shiny-object version of AI adoption follows a predictable arc: a competitor launches a visible AI product, leadership funds a parallel initiative, and six months later the org has a tool nobody uses and a data exposure it didn't have before.

The problem is the sequence: AI amplifies what already works. Add it before you've defined what you're actually good at, and you accelerate in the wrong direction.

A company with a clear value proposition and organized data can use AI to surface patterns and extend reach. Without those prerequisites, you accelerate the wrong things, often exposing data you weren't tracking in the process.

## What "AI-Driven" Actually Means for an Established Business

AI is fastest at making previously unsearchable content findable. It also scans large information landscapes faster than human teams and draws connections across data that would otherwise sit dormant in static reports.

Improving worked with a large education company sitting on years of content (videos, PowerPoints, instructor materials) that clients couldn't find or use. The value was locked in formats with no search layer on top. Improving built an AI-powered indexing system that made the content queryable for the first time. **[NEEDS METRIC: one quantitative outcome from the engagement team before this publishes -- time savings, reduction in support requests, or retrieval rate. Without it, this reads as a fabricated example to a technical executive audience.]**

The case has a clear boundary: the company was still in the business of delivering educational content. AI made delivery possible without rewriting the mission. Not everything needs an AI layer, and the organizations spending more on AI infrastructure than they save in efficiency typically made this mistake: they deployed AI horizontally because it was available, without asking where friction was actually highest.

AI finds its highest returns against the specific friction point between your existing value and your customers' ability to access it. Deployed as a horizontal capability without a prioritization model, AI investment becomes diffuse and attributable ROI disappears.

## Your AI Strategy Is Only as Good as Your Data Estate

"You don't have an AI strategy if you don't have a data strategy." For Rusic, this is a precondition.

You can't surface what you haven't cataloged. You can't govern access to data you haven't mapped. AI exposes the absence of structure faster and at greater scale than any manual audit can.

The inside-the-fence risk gets less attention than it deserves. Companies focus on external breaches. The more immediate problem is often internal: an AI assistant with broad document access surfaces salary data to the wrong manager, or hands a customer opportunity list to someone with no authorization to see it. Internal access controls are the overlooked half of data security, and AI ignores boundaries that were never drawn.

The outside-the-fence risk is where most companies currently have active exposure. If you're not paying for the product, you are the product. Employees using personal AI accounts for company work (pasting in source code, client names, internal documents) transfer corporate data outside any agreement that protects it.

An enterprise agreement with an AI provider, paired with an internal access control audit, closes the primary surface area. Organizations that treat AI procurement as a standard software license decision and skip the data governance review end up with both risk vectors active simultaneously: internal exposure and external leakage, with no record of either.

## The AI Adoption Maturity Model

Most organizations are at Level 1: prompting and queries. Someone types a question, the AI responds. Output quality is bounded entirely by the context provided. No corporate data is integrated.

Level 2 is where AI becomes genuinely differentiated: the AI has authorized access to the company's own information and can return findings that weren't available from general queries. The education company example lives here. This step requires that internal access controls are already in place, because without them, data integration creates the inside-the-fence exposure described above. Skip that prerequisite and Level 2 is a security incident waiting for a timeline.

Level 3 is agents. The credit card chatbot took action; a Level 1 or 2 deployment would have answered a question. Someone at that company decided the bot was authorized to issue refunds. The question of who made that decision, through what governance process, and with what rollback mechanism, is unresolved at most organizations deploying agentic AI. Skipping to agents without the data governance foundation creates autonomous systems with no defined authority boundaries, which means the first conversation about that decision happens in a board room.

## The Hidden Cost of AI-Accelerated Development

AI coding tools make developers faster. They also expand attack surfaces, and the failure modes are specific enough to name directly.

Rusic's example: an AI coding agent, tasked with building an integration, chose the path of least resistance and hard-coded an API credential in the frontend. The developer shipped it. The key was exposed. The code functioned. It exposed the credential in the process.

The credential check is the one item a framework can enforce at the point of generation: require that authentication standards live at the framework level so the AI agent has no shortcut available. Back that with security scans on every AI-generated commit and code review that explicitly verifies credential handling. Organizations that treat AI-generated code as exempt from standard security gates are trading a short-term velocity metric for a vulnerability they'll spend significantly longer remediating.

## Why AI Mandates Are Backfiring

Mandate AI adoption, then measure compliance. That was the dominant playbook in 2023 and 2024. Rusic on the outcome: "Some of the mandates for AI have had the negative effect of 'you must use this' as opposed to 'here's what this can do for you.'"

Compliance-driven adoption produces surface-level usage metrics and quiet workarounds, including the personal account behavior that creates outside-the-fence exposure. That's adoption theater, and it's more common than any dashboard reflects. Capability-driven adoption, showing a specific team how AI removes the specific slowdown they face daily, produces integration that doesn't require enforcement. The industries ahead in AI adoption tend to share a culture of self-directed experimentation.

Mandates tied to usage metrics incentivize the appearance of adoption and push employees toward unsanctioned tools that won't show up in any dashboard.

## Where to Start

Three diagnostic questions before any AI investment:

What does the organization actually deliver, and where is the gap widest between that delivery and what the customer can actually access? That's where AI belongs. Everything else is adoption theater.

Is there a clear picture of what data exists, where it lives, and who can access it? If the answer is incomplete, an AI project will expose that gap before it delivers any value.

Before giving any AI tool access to corporate data: does the agreement cover liability if that data leaves the organization's control? If no one has read the terms, assume the answer is no.

Nobody has a complete AI program, including Improving. The organizations building durable advantage treat data infrastructure as the ongoing investment, starting before the business case is airtight. Identify where the gap between your value and your customers' ability to reach it is widest. Close that gap. That's where AI returns compound.