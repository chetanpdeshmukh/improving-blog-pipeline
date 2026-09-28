# Your Data Isn't AI-Ready (And Slapping an Agent on It Won't Help)

Nick Larson, VP of Technology at Improving, has sat across from enough executive teams to recognize the pattern: the AI pilot that underdelivered, the agent that hallucinated on customer records, the CTO who insists the data team just needs to connect a few more sources. The conversation always lands in the same place. "Just adding AI to anything is not going to make it better," Larson says. "It's AI on top of it."

Bad data processed at human speed produces occasional bad outcomes. Bad data processed at AI speed produces bad outcomes continuously, at scale, with no human catching errors in real time. The model is accessible to every competitor at roughly the same price on the same timeline. The data those models run on is the hard part. Most enterprises are further behind on that than they believe.

## What "AI-ready data" actually means

AI-readiness has four dimensions. Availability: latency matched to the decision it supports. Semantic understanding: does the AI know what "customer" means in your specific system? Governance and security: row-level access controls applied to agents the same way they apply to people. Contextual richness: valid values, labels, ownership, and defined schema.

The governance dimension is where most organizations underestimate their exposure. "The AI's harder to trust because you can't see it on an individual basis," Larson notes. Giving an agent system-wide database access instead of scoped, role-appropriate access is how customer PII ends up outside its intended boundary. An agent that encounters a prompt injection attack with database-wide credentials does more damage than one operating within appropriate row-level constraints.

Organizations with streaming data infrastructure, defined ownership, and row-level access controls enforced at the data layer can introduce agents that inherit those constraints automatically. Organizations where governance lives in a policy document rather than enforcement infrastructure (what Larson calls "governance theater") find that agents bypass controls humans would respect, because the controls were never implemented where they matter.

## How to tell if your data is ready: the new analyst test

Larson applies a diagnostic with clients: sit down with the dataset as a new analyst. Take two weeks. Figure out what it means without asking anyone.

In one engagement, those two weeks revealed that "external customers" in the system had no accounts, could not store credit cards, and had no formal relationship with the business. Nothing in the data communicated this. A colleague had to explain it verbally.

An AI agent has seconds to make the same determination, with no colleague available. The gap between what the data contains and what it means is where hallucinations originate. LLMs are designed to return an answer. Missing context produces a confident wrong answer.

Absent data carries the same risk as wrong data. Consider medical claims processing: a claim submitted without a state label may be adjudicated under the wrong state's laws. The AI received a claim with no state field and filled the gap with a plausible but incorrect answer. The downstream consequence is a miscalculated claim, a potential compliance violation, and no audit trail pointing to the missing field.

For any dataset where a domain expert has documented the meaning of every field (valid values, business rules, semantic context) in a structured schema, an agent can consume it reliably. The analyst test surfaces semantic ambiguity. Latency mismatches, security gaps, and missing ownership require a separate governance and infrastructure review.

## The failure modes AI optimism skips over

**Higher accuracy at scale still means thousands of errors per day.** Larson heard an example during a commute: a company processing 100,000 daily transactions at 90% accuracy produces 10,000 errors daily. At 95% accuracy, that's 5,000. Scale the volume and the absolute error count climbs even as the percentage improves. Observability and error-handling infrastructure is load-bearing. Catching and containing errors fast is the actual design goal.

**Agents do the wrong things faster, too.** "We've talked before about how agents, because they can do things faster, they can do the wrong things faster, too." An agent with refund-approval capability and access to bad customer data can approve incorrect refunds around the clock at a rate no human team could match. The speed advantage and the speed risk are the same feature. Kill switches and observability are architectural requirements of any agentic deployment.

**Agentic AI makes systems easier to build. Business velocity is a separate question.** "I don't know that agentic agents are that much faster or going to speed your business up that much faster. Except it's just easier to produce them and build them." The architectural value is real: agents reduce hand-coded wiring between services. Business velocity improvement depends on data readiness, and most enterprises haven't reached that threshold.

Organizations with mature observability, defined kill switches, and human-in-the-loop validation periods can deploy agents in production and absorb failures before they reach customers. Enterprises deploying agents in production-critical contexts (medical claims, financial transactions, fraud) without observability infrastructure are running a live experiment on customer outcomes.

## What a working agentic deployment looks like

A client came to Improving with 400,000 records stuck in a dead letter queue. Leadership was asking why the backlog remained unaddressed. The volume was large enough to be visible at the executive level.

Improving applied an agentic triage process directly to the queue. The agent classified each record (system error, customer error, or other) and routed it accordingly: open a ticket, surface an internal alert, or trigger a personalized outreach email to the customer. What made this deployable was the underlying data structure. The records had enough semantic context for the agent to make meaningful distinctions. Without that structure, the agent classifies noise. Resolution metrics from this engagement are pending client follow-up. The architecture is documented; the outcome data is not yet available for publication.

Every agent action generates an output event, and that event requires traceability. "As soon as you have something agentic evaluate a message or an event, it's usually generating something else." Treat agentic systems the same way you treat microservices: same edge cases, same monitoring requirements, same need for a defined escalation path. The transition from human-in-the-loop to autonomous operation is earned through observation over time.

`[INSERT DIAGRAM: Event flow trace: incoming event → agent evaluation → output event(s) → observability layer, with kill switch and alert threshold indicated]`

Wide-open database access, undocumented fields, and absent monitoring turn an agentic deployment into a liability operating at machine speed. The deployment described here worked because data structure and observability were prerequisites, not afterthoughts.

## Your data is the only moat the models can't commoditize

"The models are pretty much a commodity," Larson says. "Everybody gets it for $200 a month." Open-source models are within a year of frontier capability. Building a proprietary model from scratch is a multi-year, multi-million-dollar investment most enterprises cannot sustain. The data those models run on is where advantage accumulates.

One client held exclusive rights to a licensed photographer's complete body of work. Existing models could approximate the photographer's style from publicly available training data but fell short of replicating it. Improving built and trained a custom model on the exclusive dataset. Any customer wanting images in that specific photographer's style must license and use the client's model, converting a data right into a recurring revenue stream. (This example originated with Improving's leadership team and is cited here as an illustration of the broader principle.)

Data product thinking makes this possible. Legacy architecture: data sits in tables, queried when needed, owned by no one in particular. Data product architecture: every dataset has an owner, an SLA, a schema contract, and a defined access mechanism. A new use case stands up in hours. When data has no owner and no contract, every new use case is a rebuild.

Genuinely proprietary datasets (transaction history, operational telemetry, customer behavior patterns, exclusive data rights) become defensible assets when structured, governed, and exposable. Most enterprise transactional data is structurally similar across competitors. Superior infrastructure over a shared data asset produces operational efficiency. Differentiation requires data that competitors cannot access.

## Where most enterprises actually are

"When we talk to customers, they are maybe overly generous in their self-assessment of where they are in this journey," Larson says. Most organizations have components of a modern data platform in place. Few have refined them to the point where AI can consume the output without introducing hallucinations or governance failures.

The sequence that works: define business outcomes, identify the data requirements those outcomes impose, build or refine the foundation, then introduce AI where the data is ready. Stacking an agent on top of 47 SQL databases and a batch ETL process produces a liability.

Larson frames the current moment with the internet analogy: two years into the web era, organizations were building logo websites. Ordering pizza online was still years away. AI infrastructure is at a comparable point. The companies doing this well have already failed millions of times. They built institutional safeguards that absorbed those failures before customers felt them. "There's time to catch up," Larson says. The foundation (ETL, streaming, governance, data products) is a decade of investment. The organizations building it now will have something durable when AI patterns finish maturing. The ones waiting for the model to solve the data problem will still be waiting.