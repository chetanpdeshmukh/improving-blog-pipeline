#!/bin/bash
# run-all-tests.sh
# Runs all 5 test transcripts through the blog pipeline sequentially.
# Usage: bash run-all-tests.sh (from blog-pipeline-stage4/ directory)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

TRANSCRIPTS=(
  "test-data/AI ROI and Business Value Measuring What Actually Matters.txt"
  "test-data/AI Strategy for 2026 Economic Responsibility and ROI.txt"
  "test-data/Architecting the AI-Driven Business Model.txt"
  "test-data/Human-in-the-Loop Growing Talent in the Age of AI Agents.txt"
  "test-data/The Evolution of AI Where It Started and Where We Are Now.txt"
)

PASS=0
PUNCHOUT=0
FAIL=0
RESULTS=()

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║   Blog Pipeline — Stage 4 Test Suite         ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

for transcript in "${TRANSCRIPTS[@]}"; do
  name=$(basename "$transcript" .txt)
  echo "▶ Running: $name"
  echo "  ──────────────────────────────────────────"

  if node workflow/run-workflow.js "$transcript"; then
    PASS=$((PASS + 1))
    RESULTS+=("✅ PASS     | $name")
    echo "  Result: PASS"
  else
    exit_code=$?
    # Check if it was a designed punch-out (exit 1) vs unexpected crash
    last_run=$(ls -d runs/run-* 2>/dev/null | sort | tail -1)
    if [ -n "$last_run" ] && [ -f "$last_run/punch-out.json" ]; then
      PUNCHOUT=$((PUNCHOUT + 1))
      reason=$(node -e "const j=require('./$last_run/punch-out.json'); console.log(j.step + ': ' + j.reason.substring(0,80))" 2>/dev/null || echo "see punch-out.json")
      RESULTS+=("⚠️  PUNCH-OUT | $name | $reason")
      echo "  Result: PUNCH-OUT (designed exit — see $last_run/punch-out.json)"
    else
      FAIL=$((FAIL + 1))
      RESULTS+=("❌ ERROR    | $name")
      echo "  Result: ERROR (unexpected)"
    fi
  fi
  echo ""
done

echo "╔══════════════════════════════════════════════╗"
echo "║   Results Summary                            ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
for r in "${RESULTS[@]}"; do
  echo "  $r"
done
echo ""
echo "  PASS: $PASS   PUNCH-OUT: $PUNCHOUT   ERROR: $FAIL   TOTAL: 5"
echo ""
echo "Note: PUNCH-OUTs are designed behavior — they count as 'completed correctly'"
echo "      for the examiner when triggered at a guardrail (not a crash)."
echo ""
