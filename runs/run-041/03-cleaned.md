# Why GPU Monitoring Is Not AI Observability

Aditya Todkar, Senior Developer Advocate at InfraCloud, described his starting assumption: a high-VRAM GPU plus a capable model produces a working system. Most infrastructure engineers building AI platforms start from the same place and carry the same blind spots. GPU dashboards cover one of three independent failure surfaces in a self-hosted inference stack. Model engine optimization and serving-layer throughput each have failure modes invisible to hardware metrics.

## Three Layers, Three Debugging Domains

A self-hosted AI inference stack has three layers: infrastructure hardware, model backend/engine, and model serving. Problems cascade across layers in non-obvious directions. A KV cache misconfiguration produces poor throughput at high GPU utilization. A serving-layer autoscaling gap generates latency spikes while hardware metrics look healthy. Watching one layer surfaces little about the other two.

`[INSERT DIAGRAM: Three-layer AI inference observability stack, Infrastructure → Model Backend/Engine → Model Serving, with failure modes labeled]`

## Layer 1: Infrastructure, Physical Limits Software Metrics Cannot Surface

InfraCloud's GPU lab in Pune runs three worker nodes with RTX 4090s. The team wired IR controllers to the office air conditioning, automating AC state based on GPU temperature thresholds. Manual management was too slow for the thermal swings of sustained inference workloads.

The metrics that matter at this layer: GPU temperature and power draw (H100s consume approximately 700W each; two DGX boxes at 8 KW apiece fill a standard 20 KW rack), VRAM utilization as a deployment baseline (Llama 3.1 8B quantized measured 23.2 GB on InfraCloud's live deployment against a 24 GB ceiling), and network throughput for any deployment using parallelism across nodes.

**When this works:** Single-node inference on Kubernetes with Nvidia hardware. The DCGM exporter covers temperature, power, VRAM, and utilization alongside Kubernetes-level allocation from one tool, paired with Prometheus and Grafana.

**When it fails:** Multi-node inference with parallelism. InfiniBand and RDMA throughput become critical-path metrics. A 400 Gbps InfiniBand spec is a paper number; measured throughput under real parallelism load is the operational one.

## Layer 2: Model Backends, Where Latency Is Actually Determined

The model engine handles all performance optimization: batching strategy, KV caching, attention mechanism selection, kernel fusions. The serving layer handles HTTP/gRPC, routing, and autoscaling hooks. A latency problem can originate in either, and without that distinction you cannot localize the cause.

**Time to first token (TTFT)** measures the Prefill phase, processing the input prompt before any output generates. High TTFT at normal GPU utilization is an engine-level problem; the hardware is available but the Prefill computation itself is slow.

**KV cache utilization** is the most under-monitored metric in inference setups. LLMs generate tokens autoregressively; the KV cache avoids recomputing prior context on every step. Aman Jain, Principal Engineer at InfraCloud, measured this directly in their GPU lab: past a certain VRAM saturation point, inference performance is governed by cache hit rate and batching configuration. High GPU utilization alongside a low KV cache hit rate means the engine is doing redundant computation. Continuous, dynamic, and static batching each produce different throughput profiles on identical hardware.

For inference servers with native Prometheus endpoints, TGI and vLLM expose engine and serving metrics out of the box. The instrumentation is there; the question is whether anyone is reading it.

For models embedded directly in application code, TTFT and KV cache metrics require custom instrumentation, and most teams skip it.

**The limit infrastructure observability cannot cross:** A wrong LLM response has no stack trace equivalent. Vishal Biyani, InfraCloud's founder: "How do you debug what caused a certain response to be not right? I don't think there is a right answer today as an industry." When infrastructure metrics are normal and the response is still wrong, the cause is in the model. Evals and prompt analysis are the appropriate tools, and they come from a different discipline.

## Match Observability Scope to Your Deployment Model

Teams consuming inference via managed API (OpenAI, Azure OpenAI, Anthropic) have access to latency, token counts, and error rates. Infrastructure and engine metrics are inaccessible in that model, and that scope is appropriate.

For self-hosted inference on Kubernetes: deploy DCGM exporter with Prometheus and Grafana, add your inference server's Prometheus endpoint, and establish baselines before setting alert thresholds. No published TTFT value applies universally. Instrument under normal load, then calibrate from your own data.

Add InfiniBand monitoring when you scale to multi-node parallelism. Add distributed tracing when retrieval pipelines enter the stack. Aman Jain's point holds: "Identify the space you are in, the stack that you have, and then don't over-engineer it." Add a metric when you have a question your baseline stack cannot answer.