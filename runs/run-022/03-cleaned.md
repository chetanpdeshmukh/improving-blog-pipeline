The biggest structural issue is the six identical **When this works / When it fails** blocks — a textbook mirror pattern that signals template-generated content. I've broken that structure and woven the substance into prose. Two other fixes: "surface insights" and "generate insights" are context-banned as vague uses of "insights"; both are replaced with concrete alternatives. The EDITOR NOTE about quantitative outcomes is moved inline next to the education company example, where it's actionable. The trailing editorial meta-note is removed; the flags are now inline.

---

# Your Business Doesn't Need an AI Strategy. It Needs a Data Strategy.

The last credit card payment John Rusic missed cost him nothing. He explained the situation to the bank's AI chatbot — no human involved — and the bot identified it as a first offense and issued a refund. His reaction wasn't relief. It was a question: who decided that bot was authorized to do that?

Rusic is Improving's technical director, and that reflex — asking who decided what the AI is permitted to do — is exactly what most organizations skip when they're chasing a competitor's announcement or satisfying a board-level AI directive.

"I don't think it fundamentally changes how the enterprises of today run," he says. "It's human connections, it's service providing, it's delivering value to customers." AI changes how efficiently you reach that value. Getting the sequence wrong costs real money. Getting it right starts somewhere most companies aren't looking.

## Why Copying Your Competitor's AI Chatbot Is the Wrong Move

The shiny-object version of AI adoption follows a predictable arc: a competitor launches a visible AI product, leadership funds a parallel initiative, and six months later the org has a tool nobody uses and a data exposure it didn't have before.

The problem isn't the ambition. It's the sequence. AI amplifies what already works. Add it before you've defined what you're actually good at, and you accelerate in the wrong direction.

A company with a clear value proposition and organized data can use AI to surface patterns, reduce friction, and extend reach. Without those prerequisites, you accelerate the wrong things — and often expose data you weren't tracking in the process.

## What "AI-Driven" Actually Means for an Established Business

Three things AI genuinely accelerates: surfacing unstructured data that was previously unsearchable, scanning large information landscapes faster than human teams can, and drawing connections across data that would otherwise sit in static reports.

Improving worked with a large education company sitting on years of content — videos, PowerPoints, instructor materials — that clients couldn't find or use. The value was locked in formats with no search layer on top. Improving built an AI-powered indexing system that made the content queryable for the first time. The material was always there. It just wasn't reachable. [EDITOR NOTE: A quantitative outcome here — time savings, reduction in support requests, retrieval rate — would significantly strengthen this example for a technical executive audience.]

That example also illustrates what AI doesn't change: the company was still in the business of delivering educational content. AI made delivery possible. It didn't rewrite the mission. Not everything needs an AI layer, and the organizations spending more on AI infrastructure than they save in efficiency typically made this mistake: they deployed AI horizontally because it was available, not because they identified where friction was highest.

AI finds its highest returns against the specific friction point between your existing value and your customers' ability to access it. Deployed as a horizontal capability without a prioritization model, AI investment becomes diffuse and attributable ROI disappears.

## Your AI Strategy Is Only as Good as Your Data Estate

"You don't have an AI strategy if you don't have a data strategy." Rusic doesn't frame this as advice. He frames it as a precondition.

You can't surface what you haven't cataloged. You can't govern access to data you haven't mapped. AI doesn't create structure where none exists — it exposes the absence of structure faster and at greater scale.

The inside-the-fence risk gets less attention than it deserves. Companies focus on external breaches. The more immediate problem is often internal: an AI assistant with broad document access surfaces salary data to the wrong manager, or hands a customer opportunity list to someone with no authorization to see it. Internal access controls are the overlooked half of data security, and AI ignores boundaries that were never drawn.

The outside-the-fence risk is where most companies currently have active exposure. If you're not paying for the product, you are the product. Employees using personal AI accounts for company work — pasting in source code, client names, internal documents — transfer corporate data outside any agreement that protects it. [EDITOR NOTE: A study cited in the source interview reported approximately 232 incidents per day on average; source attribution is required before this figure can be published. Verify and cite, or remove.]

An enterprise agreement with an AI provider, paired with an internal access control audit, closes the primary surface area. Organizations that treat AI procurement as a standard software license decision and skip the data governance review end up with both risk vectors active simultaneously — internal exposure and external leakage, with no record of either.

## The AI Adoption Maturity Model

Most organizations are at Level 1: prompting and queries. Someone types a question, the AI responds. Output quality is bounded entirely by the context provided — garbage in, garbage out — and no corporate data is integrated.

Level 2 is where AI becomes genuinely differentiated: the AI has authorized access to the company's own information and can return findings that weren't available from general queries. The education company example lives here. This step requires that internal access controls are already in place, because without them, data integration creates the inside-the-fence exposure described above. Skip that prerequisite and Level 2 is a security incident waiting for a timeline.

Level 3 is agents — AI that takes action autonomously, not just AI that answers questions. The credit card chatbot in the opening is a Level 3 deployment. Someone at that company decided the bot was authorized to issue refunds. The question of who made that decision, through what governance process, and with what rollback mechanism, is unresolved at most organizations deploying agentic AI.

Moving through levels with security requirements verified at each step compounds the capability gains. Skipping to agents without the data governance foundation creates autonomous systems with no defined authority boundaries. That's how you end up explaining an AI-initiated action to your board.

## The Hidden Cost of AI-Accelerated Development

AI coding tools make developers faster. They also expand attack surfaces, and the failure modes are specific enough to name directly.

Rusic's example: an AI coding agent, tasked with building an integration, chose the path of least resistance and hard-coded an API credential in the frontend. The developer shipped it. The key was exposed. The AI wasn't wrong in a narrow technical sense — the code functioned. It just opened the most convenient possible security hole.

The practices that matter more now, not less: security scans on every AI-generated commit, code review that explicitly checks for credential handling, and authentication standards enforced at the framework level so the AI agent can't choose a shortcut. Organizations that treat AI-generated code as exempt from standard security gates are trading a short-term velocity metric for a vulnerability they'll spend significantly longer remediating.

## Why AI Mandates Are Backfiring

Mandate AI adoption, then measure compliance. That was the dominant playbook in 2023 and 2024. Rusic's read on the outcome is direct: "Some of the mandates for AI have had the negative effect of 'you must use this' as opposed to 'here's what this can do for you.'"

Compliance-driven adoption produces surface-level usage metrics and quiet workarounds — including the personal account behavior that creates outside-the-fence exposure. Capability-driven adoption, showing a specific team how AI removes the specific friction they face daily, produces integration that doesn't require enforcement. The industries ahead in AI adoption tend to share a culture of self-directed experimentation, not mandate compliance.

Mandates tied to usage metrics incentivize the appearance of adoption — and push employees toward the unsanctioned tools that don't show up in the dashboard.

## Where to Start

Three diagnostic questions before any AI investment:

What does the organization actually deliver, and where is the friction highest between that delivery and the customer? That's where AI belongs. Everything else is adoption theater.

Is there a clear picture of what data exists, where it lives, and who can access it? If the answer is incomplete, an AI project will expose that gap before it delivers any value.

Before giving any AI tool access to corporate data: does the agreement cover liability if that data leaves the organization's control? If no one has read the terms, assume the answer is no.

Nobody has reached AI nirvana — Rusic says this plainly, and it's worth holding as a strategic posture rather than reading it as permission to wait. The organizations that will have a durable advantage in three years are building the data estate now, not shipping a chatbot. Build the foundation. Take the next right step.

---

The edited draft is approximately 1,175 words, down from 1,380. Two items still require SME follow-up before publication and are flagged inline: the 232-incidents-per-day statistic needs a named source, and the education company example needs a quantitative outcome.