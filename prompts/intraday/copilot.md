---
title: Trading Copilot  
description: Real-time execution and validation assistant for trade entries, resets, and behavioral postmortems  
tags: [intraday, copilot, execution, reset, validation]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 2.1  
category: intraday  
usage: Run before entering trades, when emotional clarity is lost, or after a trade fails  
status: stable  
requires: [trading-charter.md, trading-capital-profile.md, trading-behaviors-kb.md]  
linked_outputs: [midday-reset.md, generate-daily-trade-log.md]  
input_format: markdown  
output_format: markdown  
ai_enabled: true  
---

# TRADING COPILOT — UNIFIED INTRADAY INTERFACE

## PURPOSE

To validate each trade against capital, behavior, and structure rules before entry or continuation. Also used for resets and postmortem review.

---

## MODES

| Mode       | Function                                    |
|------------|---------------------------------------------|
| `scout`    | Evaluate a potential idea before entry      |
| `confirm`  | Revalidate structure and sizing at trigger  |
| `recenter` | Pause and reset emotional clarity           |
| `debrief`  | Log trade behavior and carry forward lessons|

---

## INPUTS

- **mode**: `scout`, `confirm`, `recenter`, or `debrief`  
- **ticker / idea**: Contract, setup type, conviction level  
- **entry context**: Planned level, stop, target, tier  
- **capital status**: Live output from `capital-exposure-tracker.md`  
- **emotional state**: Clarity, tilt, frustration, overconfidence  
- **prior trade(s)**: Recent win/loss, behavior flags  

---

## SCOUT MODE

1. **Trade Plan Alignment**  
   - Does this setup match the Unified Trade Plan or IC call?  
   - Has it been visualized + staged?

2. **Structure Confirmation**  
   - Is there a valid trigger near level?  
   - Is SPX/QQQ aligned? Time of day valid?

3. **Sizing Validation**  
   - Does this tier obey sizing rules from `trading-capital-profile.md`?
     - Tier 1: `default_trade_size_dollars`  
     - Tier 2: `scalp_trade_risk_budget_dollars`  
     - Tier 3: `max_options_trade_dollars`

4. **Capital Guardrails**  
   - Are we below `max_exposure_dollars`?  
   - Is buffer above `min_buffer_required_dollars`?  
   - Is this trade justified after prior loss?

---

## CONFIRM MODE

1. **Final Check Before Entry**  
   - Has anything changed in level, structure, macro?

2. **Double Check Behavior State**  
   - Any flags present in `trading-behaviors-kb.md`?  
   - Recent trades logged properly?

3. **Capital + Risk Sync**  
   - Exposure level still safe?  
   - Loss limits respected (`daily_loss_soft_dollars`, `daily_loss_hard_dollars`)?  
   - Are we chasing?

4. **Execution Trigger**  
   - Only execute if sizing, emotion, and structure all align

---

## RECENTER MODE

Trigger anytime emotional clarity is degraded or after two red trades.

- Pause  
- Run `midday-reset.md`  
- Breathe + write the one thing you need to remember  
- Set an intention (e.g. “Trade only structure,” “Don’t force,” “Let the trade come”)  
- Decide: Stop or continue with reduced size

---

## DEBRIEF MODE

Used after each trade to score and extract learning.

- Was this trade aligned with plan?  
- What did you feel before / during / after?  
- What tier was this? Did it match?  
- What would you do differently?  
- Update `trading-behaviors-kb.md` if needed  
- Log in `generate-daily-trade-log.md`

---

## LOCKOUT ENFORCEMENT

Trading must stop immediately if:

- Capital loss hits `daily_loss_hard_dollars`  
- Behavior threshold violated repeatedly  
- Two major flags within one session  