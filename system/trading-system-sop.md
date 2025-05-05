---
title: Trading System SOP  
description: Daily operational playbook for Simon Plant’s structured trading workflow  
tags: [system, control, execution]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.3  
category: system  
usage: Run every trading day before market open to align mindset, review exposure, and guide structured execution. Produces setup awareness and operating frame. Consumes trade plan, behaviors, and system capital profile.
status: stable  
requires: [trading-charter.md, trading-capital-profile.md]  
linked_outputs: [copilot, generate-daily-trade-log, update-trading-behaviors-kb]  
input_format: markdown  
output_format: markdown  
ai_enabled: true  
---

# TRADING SYSTEM SOP — SIMON PLANT

## I. DAILY WORKFLOW OVERVIEW

This SOP governs the trading day across four phases:
1. **Premarket Setup**  
2. **Morning Execution**  
3. **Midday Reset / Trade Management**  
4. **Postmarket Debrief**

All capital, risk, and behavioral references are defined in `trading-capital-profile.md`.

---

## II. MORNING EXECUTION (6:30–9:00 AM PT)

- Focus on highest-conviction swing ideas and fast-moving cashflow trades  
- Do not trade until Setup + Trigger + Risk Plan are confirmed  
- Start with Tier 1 or Tier 2 sizing only if buffer and conditions allow  
- Use [`copilot.md`](../prompts/intraday/copilot.md) in `scout` or `confirm` mode for each potential entry  

**Sizing Rules (from `trading-capital-profile.md`)**
- Tier 1 (Big Idea): `default_trade_size_dollars`  
- Tier 2 (Structured/Cashflow): use `scalp_trade_risk_budget_dollars` as stop-based risk  
- Tier 3 (Lotto): max `max_options_trade_dollars` allocation only  
- Do not exceed `max_single_trade_size_dollars` without full conviction and proper buffer  

---

## III. TRADE FILTERS AND ENTRY CHECKS

- Confirm:
  - Aligned with Unified Trade Plan or DP/Mancini level  
  - Inside allowed sizing rules  
  - No capital or behavioral rule violations  
- Confirm capital status using `capital-exposure-tracker.md`  

---

## IV. MIDDAY MANAGEMENT (9:00–11:30 AM PT)

- Review active trades for:
  - Structure validation  
  - Exposure alignment  
  - Trim or tighten stop if profit seen  
- If drawdown exceeds `daily_loss_soft_dollars`, trigger [`midday-reset.md`](../prompts/intraday/midday-reset.md)  
- Do not open new trades after 11:30 AM PT unless part of a big idea swing or macro-driven  

---

## V. RISK AND BEHAVIORAL GUARDRAILS

- Max exposure: `max_exposure_dollars`  
- Maintain buffer: `min_buffer_required_dollars`  
- Lockout: triggered if drawdown hits `daily_loss_hard_dollars` or `max_daily_r_loss`  
- Midday reset required if soft loss (`daily_loss_soft_dollars`) breached  
- Behavior flags (see [`trading-behaviors-kb.md`](../system/trading-behaviors-kb.md)) override trade logic  

---

## VI. POSTMARKET REVIEW

- Run [`generate-daily-trade-log.md`](../prompts/postmarket/generate-daily-trade-log.md) and save to `/logs/YYYY/MM-DD.md`  
- Score each trade:  
  - Setup quality: A/B/C  
  - Execution: A/B/C  
- If behavior issues occurred:  
  - Log update to [`trading-behaviors-kb.md`](../system/trading-behaviors-kb.md)  
  - Review in performance debrief  

---

## VII. WEEKLY CYCLE

- Sunday PM: Weekly reset and level prep  
- Wednesday PM: Journal midweek reflection  
- Friday PM: Full week review + behavior scorecard  

---

## VIII. NO EXCEPTIONS

- SOP overrides emotion  
- If any capital or behavior rule is breached:
  - Pause all trading  
  - Journal the event  
  - Resume only after review  

---