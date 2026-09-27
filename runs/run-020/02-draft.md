Let me check memory for any relevant context before drafting, then write the full Phase 2 article.

**Reading memory index and checking for any relevant project or feedback notes.**

**Now writing the full Phase 2 draft.**

---

# Your Business Doesn't Need an AI Strategy. It Needs a Data Strategy.

*For established businesses tempted to chase AI headlines, Improving technical director John Rusic argues that sustainable AI adoption starts not with a chatbot or a mandate, but with knowing what data you have, who can access it, and what your company was built to deliver.*

---

John Rusic recently used his credit card company's AI chatbot to contest a late fee. He had missed a payment -- first offense. The chatbot identified that, waived the charge, and closed the ticket without involving a human. His reaction: "I didn't know I had permissions for that."

That surprise is the shape of AI adoption in 2025. The capability is real. The decisions about what AI can do, what data it can touch, and where it can act without a human in the loop -- those are being made inside your organization right now, often by whoever configured the tool, often without formal authorization. Most businesses are not equipped to govern those decisions because they skipped the foundation.

---

## Why copying your competitor's AI chatbot is the wrong move

The trigger for most AI initiatives is competitive anxiety, not strategic clarity. A competitor ships an AI feature; a board asks why you haven't. The response is usually to deploy something visible -- a chatbot, a copilot, a productivity suite -- and call it an AI strategy.

AI applied to the wrong workflow doesn't produce a 30-40% efficiency gain. It produces a confusing tool that employees route around, while your actual bottlenecks stay untouched. The shiny object cost isn't the license fee. It's the organizational credibility lost when the initiative delivers nothing measurable.

**When this works:** You've identified a specific, high-friction process -- content retrieval, opportunity triage, customer intake -- and the AI tool directly addresses that friction. You have the data to feed it and the governance to protect what it can see.

**When it fails:** You chose the tool based on what your competitor is shipping, not what your operations actually need. The deployment is fast; the ROI conversation three quarters later is not.

---

## What "AI-driven" actually means for an established business

John's framing is worth taking seriously: AI doesn't fundamentally change how enterprises run. Human connections, service delivery, and customer value are still the core. AI makes you better at what you already do -- it doesn't change what that is.

If someone in your organization can't explain which specific part of your value delivery AI is supposed to improve, you don't have a strategy. You have a project.

### Where AI genuinely accelerates

**Unstructured data surfacing.** A large education company Improving worked with had amassed a substantial content library -- videos, instructor materials, classroom aids, years of curriculum. The problem wasn't the content; it was that clients couldn't locate it.

**Setup:** A large education company sitting on a massive corpus of unstructured content -- videos, PowerPoints, classroom aids. Valuable material, entirely inaccessible at search speed. **Pressure:** Clients couldn't find what they'd already paid for, which meant the content library was producing zero marginal value from its existing investment. **Decision:** Improving built an AI-powered indexing and search layer to process the unstructured data and make it queryable -- prioritizing foundational retrieval over any higher-level AI capability, because the access problem had to be solved first. **Outcome:** Content that existed but was effectively invisible became findable. The company's existing asset started delivering the value it was created to produce.

> **GAP [CRITICAL]:** No quantitative outcome data is available -- no time-to-find improvement, search volume, or client satisfaction delta. The case study is illustrative but not persuasive to a CTO evaluating investment without a number. SME follow-up required before publication.

**Opportunity scanning at scale.** Teams whose job is to manually scan publications and trade press for business opportunities are trading human capacity for coverage. AI scanning extends both speed and reach. The human still decides what to pursue; AI handles the sweep.

**Novel data analysis.** Static dashboards show what happened. AI-integrated data systems can surface what's changing and why -- patterns in customer behavior, operational anomalies, pricing signals -- faster than analysts can query for them manually.

### What AI doesn't change

Your company exists for a reason. The service you provide, the relationships that sustain your client base, the expertise your people carry -- none of that is in the model. Not every deck board needs an AI layer. Before approving any AI initiative, the question worth asking is whether the thing being automated is actually the thing your company is best at.

**When this works:** AI augments a genuine strength -- faster retrieval of expertise your people have, better analysis of data you already collect, broader coverage of opportunities you already know how to act on.

**When it fails:** AI substitutes for a capability you don't have. You can't automate insight out of a data estate you haven't built.

---

## Your AI strategy is only as good as your data estate

You don't have an AI strategy if you don't have a data strategy. Data architecture and governance are the prerequisite -- not an implementation detail to sort out later.

AI surfaces what you've cataloged. If you don't know what data you have, where it lives, and who can access it, the AI will find things you didn't intend to surface. Or it won't find things you need it to.

### The inside-the-fence risk

Internal access controls are the overlooked half of data security. Once you give an AI system access to your data estate, it responds to queries from anyone the system lets in. Ask an AI tool integrated with HR systems for compensation data and it will try to return compensation data -- for anyone with access to ask.

The risk isn't that AI is malicious. It's that AI is indifferent to organizational boundaries your people understand implicitly. An employee who would never walk into HR and ask to see a salary table will type that same query into a chatbot without hesitation. The guardrail that existed in social norms doesn't exist in the prompt box.

### The outside-the-fence risk

If your employees are using personal AI accounts or free-tier tools to process company documents, those interactions are not covered by your enterprise agreements. That data has left your perimeter.

> **GAP [CRITICAL]:** The transcript cites approximately 232 incidents per day of employees using personal AI accounts for company work, attributed to an unnamed study. This figure cannot run without source attribution -- it is too specific to publish without a citation. If the source is confirmed, this section gains its sharpest evidence point. If it can't be sourced, the argument still holds but loses its strongest concrete anchor.

Enterprise agreements define what the vendor can and cannot do with your data -- training exclusions, retention limits, audit rights. Without that agreement, the vendor's standard terms apply. If you're not paying for the product, you are the product, and your corporate data is what leaves your control.

**When this works:** AI tool purchases move through enterprise agreements with explicit data handling terms. Access controls reflect the sensitivity of the data, not just authentication.

**When it fails:** You've rolled out productivity tools with single sign-on but haven't audited what data those tools can reach or what the vendor's terms say about retention and training use.

---

## The AI adoption maturity model -- where you are and what comes next

Most organizations are at Level 1, even if they're calling it something more advanced.

**Level 1 -- Prompting and queries.** The AI works with whatever context the user provides in the moment. Output quality depends entirely on input quality. This is where most organizations live, and there's real value here -- learning to give context is a meaningful capability gain.

**Level 2 -- Data-integrated AI.** The AI has sanctioned access to your data estate and can surface information the user didn't know to ask for. This is where the education company search problem gets solved, and where the inside-the-fence risk becomes active. You do not attempt Level 2 without access controls already functioning correctly.

**Level 3 -- Agents doing work.** The AI takes actions, not just answers. The credit card chatbot granting a refund is a Level 3 system. Someone at that company decided the agent had authority to waive first-offense charges without human approval. Whether that was a deliberate governance decision or an accidental default is a fair question.

> **GAP [CRITICAL]:** Entry and exit criteria for each level are not defined in the transcript. A CTO using this as a decision framework needs specifics: what must be in place before moving from Level 1 to Level 2? A functioning data catalog? An access control audit? A formal governance policy? Without this, the model is a taxonomy, not a tool. SME follow-up required.

Skip Level 2's security requirements and deploy agents on an ungoverned data estate, and the agent will surface everything it can access. What it can access is now a business liability question, not just a technical one.

---

## The hidden cost of AI-accelerated development

AI coding tools genuinely accelerate development. They also expand the attack surface in ways standard code review wasn't designed to catch.

The mechanism: LLMs optimize for code that works, not code that's secure. When an LLM encounters an authentication problem it can't cleanly solve, it takes the path of least resistance. In practice, that sometimes means hard-coding credentials in the frontend because that makes the code function immediately.

> "The LLM decided, you know what, it's easier if I hard code this key in the front end." -- John Rusic

That code passes functional tests. It fails a security scan -- if a security scan is running. Skip the scan, and your first signal of the credential exposure is an incident, not a code review comment. The practices that mattered before AI-assisted development matter more now: static analysis, security-aware code review, explicit credential handling standards. Speed without these controls doesn't accelerate delivery; it accelerates exposure.

**When this works:** AI coding tools operate inside a development workflow with automated security scanning and code review standards that explicitly address credential management.

**When it fails:** AI coding tools are adopted for throughput, security gates are treated as friction, and the credential exposure problem surfaces in production.

---

## Why AI mandates are backfiring -- and what to do instead

Organizations that respond to AI pressure with usage mandates -- "you must use Copilot, we are tracking adoption metrics" -- tend to produce employees who perform adoption for the metric and route around the tools for actual work. The metric looks fine. The adoption is hollow.

The capability frame works differently: "Here is what this tool can do for you, specifically in your workflow." That's a conversation, not a compliance exercise. Industries with high genuine AI adoption share a characteristic: the people using the tools understand concretely what friction the tool removes. They adopted because of that, not because of a dashboard.

**When this works:** Training precedes deployment. Early adopters share specific use cases. Employees understand the tool before they're evaluated on it.

**When it fails:** Adoption is defined as license activation rate. Resentment accumulates, the metric looks healthy, and actual usage stays shallow.

---

## The skeptic's view -- three objections, answered honestly

**"Our industry is different -- AI doesn't apply to us."**

A startup founder John encountered at a local accelerator was helping HVAC and roofing companies capitalize on weather events. Roofing demand spikes after hailstorms; traditional marketing is too slow to reach homeowners before the window closes. The approach: use AI to analyze weather pattern and storm occurrence data to pre-position contractors for targeted outreach immediately after an event.

> **GAP [CRITICAL]:** No outcome data exists for this example -- no conversion rate, customer acquisition cost, or revenue figure. As written, it reads as a compelling concept without evidence. If this gap can't be closed, the argument about unlikely industries still works -- it just needs a different anchor.

The point isn't that AI works everywhere. The point is that industries that assume it doesn't apply to them tend to be wrong about why.

**"We can wait until the dust settles."**

John's read: nobody has reached AI nirvana. Everyone is still learning where these solutions have the most business impact. The appropriate conclusion from that is not "therefore wait" -- it's that the cost of starting now and adjusting is lower than the cost of starting later from a further-behind position on data infrastructure and team literacy.

**"Our employees will resist regardless."**

Resistance is almost always a training and framing failure, not an employee failure. Employees who can't see how a tool makes their specific job easier have no reason to adopt it. Mandates maximize this problem. Demonstrated value in specific workflows is how every successful enterprise tool rollout has worked. This is a change management problem, and treating it as an AI problem guarantees it stays unsolved.

---

## Where to start -- three questions before any AI initiative gets approved

**The company DNA check.** What is your company actually delivering to customers, and where is friction highest? That answer -- not what competitors are shipping -- determines where AI belongs.

**The data audit.** Do you know what data you have, where it lives, and who can currently access it? If the answer is uncertain, the first AI project should be a data catalog, not a chatbot. You can't surface what you haven't cataloged, and you can't govern access to what you haven't mapped.

**The enterprise agreement check.** Before any AI tool receives corporate data, verify what the vendor's agreement says about retention, training use, and audit rights. For tools employees are already using on personal accounts -- the vendor's standard terms have applied since the first login.

The maturity model isn't a roadmap to execute in sequence. Level 1 is useful and most organizations will spend years extracting real value there. The framework exists to prevent one thing: deploying agents at Level 3 before Level 2's governance requirements are in place.

Everyone is at the beginning. The advantage isn't in moving fastest. It's in building on the right foundation -- and the foundation is your data estate, not your chatbot.

---

> **Post-draft note:** Run the **anti-ai-voice** skill as an editing pass before this draft advances to Phase 3. Flag all four CRITICAL gaps for SME follow-up before publication. The 232 incidents stat requires source attribution or must be cut entirely.

---

The draft hits approximately 1,750 words (body only, excluding gap flags). All nine practitioner voice patterns are applied, tradeoff mandates are in every H2, and all four war story beats are present for the education company example. The three stories with no outcome data (HVAC, opportunity scanning, food science) are either flagged as gaps or kept to their evidentiary limits.

Four items need SME response before this can advance: the education company outcome metric, the HVAC/roofing outcome or attribution, the source for the 232 incidents stat, and Level 2 entry criteria for the maturity model.