# GPU Monitoring Is Not Enough: A Layered Approach to AI Inference Observability

When Aditya, InfraCloud's Senior Developer Advocate, first started working with GenAI infrastructure, he landed on a reasonable conclusion: AI runs on GPUs, so monitoring GPUs covers observability. That assumption is wrong, and the correction requires understanding a stack with eight or more observable layers — of which GPU utilization is exactly one.

## The Observability Triad Still Applies — the Targets Have Changed

Vishal, InfraCloud's founder, frames it plainly: metrics, logs, and traces remain the collection mechanism. What changes is what you point them at. An inference cluster introduces components — DCGM exporters, inference engines, KV caches, serving layers — that standard Kubernetes monitoring was never designed to cover.

**When this works:** Teams with a mature Prometheus/Grafana stack can extend it to AI inference without rebuilding from scratch.  
**When it fails:** Treating AI observability as identical to application observability means missing hardware-layer metrics entirely until a production incident surfaces what was hidden.

## Three Workload Types, Three Different Measurement Strategies

Training, LLM app development, and inference each require different observable signals. This article focuses on inference — performance, reliability, and throughput metrics that live in the engine and hardware layers, below the application entirely.

**When this works:** Teams that identify their workload type before selecting tooling avoid building an observability stack for the wrong problem.  
**When it fails:** Teams that instrument a training pipeline and repurpose it for inference monitoring find the coverage gaps in production, under load.

## Where Physics Shows Up in Your Metrics

InfraCloud's Pune AI lab runs RTX 4090s. A single H100 draws 700W. A DGX box with eight GPUs draws 5-8 kW. A standard rack holds roughly 20 kW — meaning two DGX boxes fill it. When high-load jobs hit the lab, temperature spikes were unpredictable enough that the team wired IR remotes to the AC unit, triggering cooling from real-time GPU temperature readings. That is infrastructure observability with physical consequences.

Beyond thermal management: networking becomes the binding constraint in multi-node deployments. NVLink bandwidth, PCIe latency on older hardware, and InfiniBand RDMA throughput for distributed inference are metrics a GPU utilization dashboard will never surface. Aman, InfraCloud's Principal Engineer, notes that the gap between rated bandwidth and achieved bandwidth is consistently surprising — and only measurable by actually measuring it.

`[INSERT DIAGRAM: Data path from parallel file system → InfiniBand/RDMA → GPU memory, annotated with where latency accumulates without GPU Direct Storage]`

**When this works:** Single-node inference on current Nvidia hardware where thermal and storage I/O are predictable.  
**When it fails:** Multi-node tensor parallelism, where inter-node latency becomes the bottleneck and GPU metrics show nothing.

## Engine Configuration Is Where Inference Performance Is Actually Determined

Aman describes continuous batching and paged attention as "the last mile of performance gains." Static batching — one request, one forward pass — leaves GPU cycles wasted between requests. Continuous batching keeps the GPU fed. The difference is measurable in Time to First Token, decode latency per token, and KV cache hit rate. An operator who over-partitions a GPU using MIG for a model that needed the full device will see degraded performance — and the utilization metrics surface that only after the damage is done.

**When this works:** Inference servers configured for continuous batching on predictable workload shapes.  
**When it fails:** MIG misconfiguration, where partition sizes are based on assumed model footprint before actual VRAM usage is measured.

## The Minimal Viable Stack — and the Discipline to Stop There

For single-node Nvidia inference, DCGM exporter plus Prometheus plus Grafana is sufficient. Aman's closing guidance: identify your workload type before selecting any tooling. Adding exporters without a specific metric gap to fill creates operational overhead with no observability payoff.

**When this works:** A well-defined, single-framework inference stack on Nvidia hardware.  
**When it fails:** Multi-node parallelism, third-party model integrations, or SaaS-facing deployments where the metric surface expands and the minimal stack genuinely under-covers it.

## The Problem AI Observability Hasn't Solved

Vishal names it directly: "How do you know and how do you debug what caused a certain response to be not right? I don't think there is a 100% clear answer today as an industry."

In traditional software, observability closes the feedback loop — find the exception, trace the stack. Model output behavior has no equivalent traceback. Prompt tracing, attention visualization, and human evaluation pipelines are partial approaches, each with limits the field has not resolved. Teams that instrument their full inference stack and still cannot explain a bad model response are experiencing a structural limitation that current tooling cannot bridge.

Build the rest of the stack correctly — GPU metrics, network throughput, engine configuration, and serving-layer performance are all tractable. The output behavior layer is where the industry is still working, and any vendor claiming otherwise is selling something that hasn't been built yet.