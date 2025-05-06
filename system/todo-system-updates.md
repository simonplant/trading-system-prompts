---
title: Trading System TODO — Streamlined Enhancements
description: Prioritized list of trading system tweaks and improvements
tags: [system, backlog, architecture, refactor]
author: Simon Plant
last_updated: 2025-05-06
version: 1.7
category: system
usage: Edit during system development or prompt refactor planning.
status: active
requires: []
linked_outputs: []
input_format: markdown
output_format: markdown
ai_enabled: false
---

# RECENTLY COMPLETED (2025-05)

- `copilot-confirm.md` enhanced — added multi-pass validation framework
- Position sizing calculator implemented — dynamic tier-based risk
- Time-based trading filters added — optimal execution windows
- Strict decision logic implemented — enforcing all validation gates

---

# TODO: SYSTEM ENHANCEMENTS

## P0 – Highest Leverage Next

- Complete `daily-performance-debrief.md`  
  Postmarket review + self-assessment prompt. Should pull in:  
  - Prior day's trade log  
  - Behavior flags  
  - Execution quality  
  **Tags:** `postmarket`, `review`, `behavior`  

- Add few-shot examples to `copilot-confirm.md`  
  Include 3-5 validation examples with varied outcomes  
  **Tags:** `prompt_engineering`, `consistency`

- Add front matter to log files  
  - `/logs/journal/2025-05-05-trading-journal.md`  
  - `/logs/trades/2025-05-05-daily-performance-debrief.md`  
  - `/logs/kb-updates/2025-05-05-kb-update-recommendations.md`  
  **Tags:** `infra`, `logs`, `ai_enabled`

- Create basic TOS level template for premarket prep  
  Format key levels for platform input  
  **Tags:** `premarket`, `execution`

- Improve `copilot.md` logic with tactical checks  
  Add conditional logic for key technical events  
  **Tags:** `execution`, `structure`, `risk_control`

- Add logic to downgrade trade ideas with <2R setups  
  **Tags:** `risk_control`, `sizing`, `reward:risk`

- Add flip logic for major level failures  
  **Tags:** `structure`, `reversal`, `macro`

## P1 – Tactical Execution Enhancements

- Create `trade-intent-validator.md`  
  Pre-trade sanity check to prevent off-plan entries  
  **Tags:** `execution`, `risk_filter`, `discipline`

- Enhance `trading-behaviors-kb.md` with `behavior_trigger:` logic  
  Define specific conditions that trigger behavioral flags  
  **Tags:** `behavior`, `discipline`, `execution`

- Add system-level rule for "Avoidance Zones"  
  **Tags:** `discipline`, `structure`, `risk_filter`

- Add `stack_rank:` field to premarket trade plan  
  **Tags:** `focus`, `conviction`, `structure`

- Add "Missed Setups" section to `daily-performance-debrief.md`  
  **Tags:** `review`, `learning`, `resilience`

- Add PnL Attribution logic to debrief  
  **Tags:** `review`, `psychology`, `meta-learning`

- Add "Next-Day Hypothesis" field  
  **Tags:** `structure`, `review`, `continuity`

- Add `intent_vs_outcome:` scoring to trade log  
  **Tags:** `review`, `psychology`, `resilience`

## P2 – System Navigation + Tiering + Templates

- Add tiering decision logic by trade type  
  **Tags:** `position_sizing`, `discipline`, `structure`

- Create `prompt-routing-overview.md`  
  Visualize prompt flow across phases  
  **Tags:** `docs`, `routing`, `clarity`

- Add output templates  
  `/templates/trade-log.md`, `/templates/kb-entry.md`  
  **Tags:** `structure`, `reference`, `UX`

- Add visual dependency graph to `trading-system-sop.md`  
  **Tags:** `infra`, `routing`, `docs`

## P3 – Documentation + Infrastructure

- Refine `description:` fields across all prompts  
  **Tags:** `docs`, `clarity`

- Add optional `model:` and `behavior_mode:` fields  
  **Tags:** `infra`, `meta`, `behavior`

- Auto-fetch relevant MAs for each ticker  
  **Tags:** `automation`, `levels`, `prep`

- Add daily "no trade" check logic  
  **Tags:** `psychology`, `discipline`, `meta-awareness`

---

# TOMORROW'S TRADING EDGE

Implement these three items before tomorrow's market open:

1. **Add few-shot examples to copilot-confirm.md**
   - 3 short examples of the validation process
   - Include one GO and one NO GO decision

2. **Create simple TOS level template**
   - Basic format for quick level entry
   - Support/resistance with labels

3. **Implement tactical logic for key breaks**
   - Add condition: "If level breaks with volume, then..."
   - Add downgrade logic for <2R setups
