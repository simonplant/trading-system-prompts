---
title: Trading Capital Profile  
description: Central source of truth for trading capital, daily loss thresholds, position sizing rules, and exposure limits  
tags: [system, control, capital]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 2.2  
category: system  
usage: Referenced by prompts that evaluate risk, exposure, or trade sizing against capital constraints  
status: stable  
requires: []  
linked_outputs: [capital-exposure-tracker, copilot, generate-daily-trade-log]  
input_format: markdown  
output_format: markdown  
ai_enabled: false  
---

## BASE CAPITAL

- `base_capital`: $100,000  
- `max_exposure_dollars`: $50,000  
- `min_buffer_required_dollars`: $10,000  
- `risk_alert_threshold_dollars`: $45,000  

---

## DAILY LOSS LIMITS

- `daily_loss_soft_dollars`: $2,000  
- `daily_loss_hard_dollars`: $3,500  
- `max_daily_r_loss`: 3.0R  
- `trading_lockout_on_hard_loss`: true  

---

## POSITION SIZING GUIDELINES

- `default_trade_size_dollars`: $33,000  
- `max_single_trade_size_dollars`: $66,000  
- `max_options_trade_dollars`: $5,000  
- `swing_trade_risk_budget_dollars`: $2,500  
- `scalp_trade_risk_budget_dollars`: $1,000  
- `big_idea_override_allowed`: true  
- `position_building_rule`: Tier in to full position unless scalping or trimming fast intraday  

---

## NOTES

- No calculations here — all thresholds are manually set  
- Prompts and SOPs must refer to these keys  