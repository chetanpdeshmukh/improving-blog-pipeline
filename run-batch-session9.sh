#!/bin/bash
# run-batch-session9.sh
# Runs the 10 new certification transcripts (5 InfraCloud Webinar --short, 5 Improving Podcast full-length).
# Usage: bash run-batch-session9.sh (from blog-pipeline-stage4/ directory)

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

SHORT_TRANSCRIPTS=(
  "test-data/InfraCloud Webinar - Architecting Modern AI Systems A Microservices Approach.txt"
  "test-data/InfraCloud Webinar - Bringing Observability to Complex AI Platforms and Models - LIVE.txt"
  "test-data/InfraCloud Webinar - Model to Production Optimizing, Deploying, and Scaling ML Inference.txt"
  "test-data/InfraCloud Webinar - The Modern 10x Engineer - Code Generation & Beyond.txt"
  "test-data/InfraCloud Webinar -  Infrastructure Economics Technical Strategies for Cost-Efficient AI Scaling.txt"
)

FULL_TRANSCRIPTS=(
  "test-data/Improving Podcast - AI Strategies Why You Need One for Your Business.txt"
  "test-data/Improving Podcast - AI-Ready Data The New Benchmark of Enterprise Competitiveness.txt"
  "test-data/Improving Podcast - Orchestrating AI Agents The New Scarce Skill.txt"
  "test-data/Improving Podcast - The Clarity Multiplier AI In the Human Loop.txt"
  "test-data/Improving Podcast - The Nearshore Advantage Building Teams That Scale 10x.txt"
)

PASS=0
PUNCHOUT=0
FAIL=0
RESULTS=()

run_one() {
  local transcript="$1"
  local flag="$2"
  local name
  name=$(basename "$transcript" .txt)
  echo ""
  echo "▶ Running: $name  ${flag:+(flag: $flag)}"
  echo "  ──────────────────────────────────────────"

  if node workflow/run-workflow.js "$transcript" $flag; then
    PASS=$((PASS + 1))
    RESULTS+=("PASS     | $name")
    echo "  Result: PASS"
  else
    last_run=$(ls -d runs/run-* 2>/dev/null | sort | tail -1)
    if [ -n "$last_run" ] && [ -f "$last_run/punch-out.json" ]; then
      PUNCHOUT=$((PUNCHOUT + 1))
      reason=$(node -e "const j=require('./$last_run/punch-out.json'); console.log(j.step + ': ' + j.reason.substring(0,120))" 2>/dev/null || echo "see punch-out.json")
      RESULTS+=("PUNCH-OUT | $name | $reason")
      echo "  Result: PUNCH-OUT (see $last_run/punch-out.json)"
    else
      FAIL=$((FAIL + 1))
      RESULTS+=("ERROR    | $name")
      echo "  Result: ERROR (unexpected)"
    fi
  fi
}

echo "════════════════════════════════════════════════"
echo "  Session 9 batch — 5 InfraCloud (--short) + 5 Improving Podcast (full length)"
echo "════════════════════════════════════════════════"

for t in "${SHORT_TRANSCRIPTS[@]}"; do
  run_one "$t" "--short"
done

for t in "${FULL_TRANSCRIPTS[@]}"; do
  run_one "$t" ""
done

echo ""
echo "════════════════════════════════════════════════"
echo "  Results Summary"
echo "════════════════════════════════════════════════"
for r in "${RESULTS[@]}"; do
  echo "  $r"
done
echo ""
echo "  PASS: $PASS   PUNCH-OUT: $PUNCHOUT   ERROR: $FAIL   TOTAL: 10"
