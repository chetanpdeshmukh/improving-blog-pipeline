# The Bottleneck Isn't Code: Why Human Intent Is the Real Constraint on AI-Assisted Teams

Thirty-five years ago in Brazil, during hyperinflation, workers crowded into Clauddio Lasala's office every lunch hour to make mortgage payments manually. Miss the window, miss the payment. He built software to automate the amortization calculations they were running on HP12C calculators. The human need was time and financial security. The technology was a consequence of that need. That ordering, where human need comes first and technology serves it, has shaped how Clauddio, now Technical Director at Improving's AI practice, thinks about every AI adoption conversation he has.

Most of those conversations start from the wrong premise.

---

## The Framing That's Been Setting Your Team Up to Fail

"Human in the loop" has become the organizing principle of AI governance, positioning humans as checkpoint reviewers in an AI pipeline: the override switch, the quality gate, the exception handler. The language came from AI safety research and organizations adopted it wholesale as an org design philosophy.

Clauddio pushes back directly: "When I hear people putting too much emphasis on human in the loop, I say: let's have AI in the human loop."

Teams already have their own loops. Scrum sprints, decision cycles, daily work rhythms. Those loops existed before AI and will define how work gets done regardless of what tools get added. AI should enter selectively where it helps, then feed its output back into the human process.

`[INSERT DIAGRAM: A Scrum loop with AI entry and exit points, including conversation extraction, story synthesis, and documentation, versus the sections the human owns exclusively]`

The handoff points that work: transcript synthesis after a stakeholder call, story drafting after a facilitated conversation, documentation generation after a sprint. Teams with undefined or chaotic processes plug AI in everywhere and get noise at high velocity. AI amplifies whatever process exists. A broken loop runs faster, and the breakage compounds.

---

## The Bottleneck You've Never Been Measuring

The software industry has been running the same experiment for forty years: build a faster tool, measure output, declare productivity improvement. CASE tools. IDEs. Code generators. Frameworks. Each iteration produced more code faster. Sprint reviews still ended with stakeholders saying "that's not what we meant."

Clauddio's diagnosis: "Writing code faster has never been the bottleneck. The bottleneck has been clarity of human intent."

When a stakeholder is surprised at sprint review, the failure happened upstream of execution. The team followed their instructions and delivered exactly what was specified. The specification was wrong because the humans on both sides had never achieved clarity about what was actually needed. AI applied to output generation gets to that sprint review faster.

The right measurement is earlier discovery. Teams using AI for output answer "are we solving the right problem" in week three. Teams using AI for intent clarification answer it in day two. Early-stage discovery conversations, stakeholder interviews, and requirement workshops are where AI-assisted synthesis surfaces misalignment before it compounds. Mid-execution teams with locked scope gain little from restarting at intent clarification. The clarity investment pays highest at cycle start.

---

## Need, Problem, Solution: In That Order

Clauddio names a precise failure mode: "We are good at telling people what we want. We are not as good at telling people what we need, or even if we need it."

The practiced instinct is to stop before the solution and ask what the underlying need actually is. Needs connect to values and operational reality. Wants connect to a specific mental model of how the need should be met, and that model is often wrong.

His facilitation approach: "Tell me a typical day. Tell me the typical pain points. Tell me what makes you frustrated. Just say it out loud." Those stories contain the need. The AI synthesizes problems and solutions from the raw material of those stories.

This connects to his reframe of user stories. A "user" is a person at a computer performing a function. That framing misses everything else happening to that person: the loud environment, the customers demanding attention, the cognitive load they're already carrying. A UX optimized for the user-at-computer can still fail the human whose full context was never captured.

The practical test: a human story produces acceptance criteria like "there will be a way to place a purchase order." A user story produces "there will be a button and a dropdown." The human story leaves implementation open; the user story encodes assumptions that may be wrong.

This approach earns its keep at discovery, where the primary risk is building the wrong thing and implementation assumptions are premature. AI synthesizes what the conversation contained. If facilitation never surfaced the real need, the story carries that gap forward with better formatting. Human validation of synthesized stories is mandatory.

---

## The Story-Writing Agent: Where This Comes Together

About two years ago, Clauddio wrote a markdown file encoding how he thinks through stories: how to identify value, establish persona and context, and structure acceptance criteria using given/when/then. He fed his blog posts to AI with one instruction: build me the recipe from this material. That file became his agent. Every stakeholder transcript goes through it. The recipe encodes his accumulated coaching judgment, making it reusable by anyone on his team.

When a fellow Improver agile coach in Houston asked for his prompt file, Clauddio did something different. He walked the coach through building a Copilot agent using only natural language description and links to blog posts. The coach then had a second, specific problem. Clauddio's instruction: describe it via voice dictation, let the story agent write the stories, then feed those stories into Copilot to create a new agent. The coach's intention, articulated as a human story, became the agent specification. No prompt engineering. No markdown files written from scratch.

`[INSERT DIAGRAM: Flow from stakeholder conversation to transcript to AI story agent to user stories to agent specification to new agent]`

This scales when the practitioner has accumulated enough judgment about story quality to encode it in agent instructions. Borrowing someone else's markdown file produces consistent output shaped by someone else's judgment. Consistency and correctness are different things.

---

## Leading AI the Same Way You Lead People

Using AI is delegation. Most people are bad at delegating. The same failure modes appear in both contexts: incomplete instructions, unconscious assumptions, "just do it" without context. With a human junior, body language and social pressure fill some gaps. AI has none of that. Every gap in the instruction surfaces immediately as a wrong output. The instinct is to rewrite the prompt.

Clauddio on why that falls short: "If you just rewrite the prompt, everything stays in your head. You need to externalize that into the AI."

His practice: give an instruction, watch where the AI goes, ask why it took that path, redirect with reasoning, then have the AI restate its own instructions in its own words. That restatement is the diagnostic. What the AI says it's doing reveals whether the intent transferred. A senior leader who cannot specify a goal clearly, enable an agent to pursue it, observe where it diverges, and fill the gap will have the same problem with AI as with a junior engineer.

Technical leads who have already identified delegation as a growth area develop faster with AI, because AI compresses the feedback loop to seconds. Leaders who blame the model when output is wrong will never surface their own delegation gap. The diagnostic works only when the leader treats wrong output as a signal to improve the instruction.

---

## When New Team Members Onboard Themselves

For eight months, Clauddio's team recorded every interaction: daily scrums, stakeholder conversations, everything. Transcripts went to AI, which produced decision logs, challenge summaries, and onboarding guides. When a team member who had helped build the AI tools rolled off, two new people joined with no knowledge of the tools, the process, or the mindset. They used the AI-generated documentation to self-onboard. When they came to Clauddio with questions, they had already done the work. By sprint review that Friday, stakeholders said "wow" about contributions from people who had just joined.

The precondition was the recording habit, established eight months earlier. Teams that start recording specifically to onboard new members get thin documentation: it covers what was said recently and misses the accumulated context of how the project actually evolved. Teams that record sporadically get sporadic benefit. The outcome is proportional to the upstream discipline.

---

## What This Approach Doesn't Solve

Clauddio's story-writing recipe encodes years of coaching practice and blogging. A team that downloads a markdown file and runs it through Copilot gets outputs shaped by their own judgment. The agent is a vessel; the practitioner's accumulated thinking is what makes it valuable.

The harder limitation: AI-generated clarity is synthesis. The story agent produces well-organized output from whatever the conversation contained. When facilitation fails to surface the real need, the agent surfaces the same gap with better formatting.

If your team already has clarity, locked scope and aligned stakeholders, starting from human story facilitation adds overhead. Apply the need-problem-solution framework at discovery. Treat execution like execution.

A CTO who has measured no productivity lift from Copilot licenses should consider whether the metric is the problem. Two teams can have identical output metrics and opposite sprint review results. One used AI to build faster. One used AI to find out faster whether they were building the right thing. Only one of those teams compounded advantage. If you're leading the first team, your problem is upstream of the tools.