/**
 * audit-logger.js
 * Append-only JSONL audit trail writer.
 * One line per step — AI steps include model/token/cost data, guardrail steps have nulls.
 * Written to: runs/run-NNN/audit-trail.jsonl
 */

'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Append one audit entry to the run's audit-trail.jsonl file.
 *
 * @param {string} runDir - Absolute path to the run folder (e.g. .../runs/run-001)
 * @param {object} entry
 * @param {string} entry.run_id           - e.g. "run-001"
 * @param {string} entry.step             - e.g. "transcript-analysis" | "outline-check"
 * @param {number} [entry.attempt]        - Revision attempt number (1-based). Default 1.
 * @param {string|null} [entry.model]     - Model string or null for guardrails
 * @param {number} [entry.input_tokens]   - Token count (AI steps only)
 * @param {number} [entry.output_tokens]  - Token count (AI steps only)
 * @param {number} [entry.total_tokens]   - Sum (AI steps only)
 * @param {number} [entry.cost_usd]       - Calculated cost (AI steps only). Default 0.
 * @param {string} entry.status           - "pass" | "fail" | "punch-out" | "error"
 * @param {string} entry.outcome          - Human-readable description of what happened
 */
function logStep(runDir, entry) {
  const record = {
    run_id:        entry.run_id,
    step:          entry.step,
    attempt:       entry.attempt ?? 1,
    timestamp:     new Date().toISOString(),
    model:         entry.model ?? null,
    input_tokens:  entry.input_tokens ?? null,
    output_tokens: entry.output_tokens ?? null,
    total_tokens:  entry.total_tokens ?? null,
    cost_usd:      entry.cost_usd ?? 0,
    status:        entry.status,
    outcome:       entry.outcome,
  };

  const logPath = path.join(runDir, 'audit-trail.jsonl');
  fs.appendFileSync(logPath, JSON.stringify(record) + '\n', 'utf8');
}

/**
 * Calculate cost in USD from token counts using Sonnet 4.6 pricing.
 * Update these rates if Anthropic changes pricing.
 *
 * Sonnet 4.6 pricing (as of 2026):
 *   Input:  $3.00 per 1M tokens
 *   Output: $15.00 per 1M tokens
 *
 * @param {number} inputTokens
 * @param {number} outputTokens
 * @returns {number} cost in USD, rounded to 6 decimal places
 */
function calculateCost(inputTokens, outputTokens) {
  const inputCost  = (inputTokens  / 1_000_000) * 3.00;
  const outputCost = (outputTokens / 1_000_000) * 15.00;
  return Math.round((inputCost + outputCost) * 1_000_000) / 1_000_000;
}

/**
 * Build a guardrail log entry (no model, no tokens, zero cost).
 * @param {string} runId
 * @param {string} stepName
 * @param {'pass'|'fail'|'warn'|'punch-out'} status
 * @param {string} outcome
 * @returns {object}
 */
function guardrailEntry(runId, stepName, status, outcome) {
  return { run_id: runId, step: stepName, model: null, cost_usd: 0, status, outcome };
}

/**
 * Build an AI step log entry.
 * @param {string} runId
 * @param {string} stepName
 * @param {string} model
 * @param {number} inputTokens
 * @param {number} outputTokens
 * @param {'pass'|'fail'|'punch-out'|'error'} status
 * @param {string} outcome
 * @param {number} [attempt]
 * @returns {object}
 */
function aiStepEntry(runId, stepName, model, inputTokens, outputTokens, status, outcome, attempt = 1) {
  const totalTokens = inputTokens + outputTokens;
  return {
    run_id:        runId,
    step:          stepName,
    attempt,
    model,
    input_tokens:  inputTokens,
    output_tokens: outputTokens,
    total_tokens:  totalTokens,
    cost_usd:      calculateCost(inputTokens, outputTokens),
    status,
    outcome,
  };
}

module.exports = { logStep, calculateCost, guardrailEntry, aiStepEntry };
