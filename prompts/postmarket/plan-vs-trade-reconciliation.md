---
title: Plan vs. Trade Reconciliation
description: Compare planned trades vs. actual trades to assess alignment, discipline, and improvement areas
version: 1.0
category: postmarket
usage: Auto-invoked via `/postmarket-sequence` or manually run with trade log + trade plan context
---

# Trade Plan vs. Execution Reconciliation

## Inputs Required
- Parsed trade plan (planned setups, triggers, zones)
- Logged executed trades (symbol, strike, entry/exit, P&L)
- Moderator calls and system alignment flags (optional)

## Output Sections

### 1. Planned Trades Recap
List trade setups from the morning trade plan in priority order.

### 2. Actual Executions
Summarize trades taken, including:
- Strike, expiry, sizing
- Entry/exit pricing
- Realized or open P&L

### 3. Scoring Alignment
Evaluate across:
- Plan Match
- Entry Timing
- Confirmation Discipline
- Sizing
- Adaptability
- Opportunity Usage
- Emotional Discipline

Use ✅ / ❌ or 1–5 scoring to quantify alignment.

### 4. Coaching Notes
Provide honest feedback:
- Did the trader execute what they planned?
- Did they size and adapt correctly?
- Were they reactive or proactive?

### 5. Adjustments & Learnings
Suggest concrete improvements:
- Entry rules or size caps
- Stop management logic
- Confirmation protocols

---

This output becomes `logs/reconciliation/YYYY-MM-DD-reconciliation.md` and complements the trade log + daily debrief.
