---
title: Unified Trade Plan for {{DATE}}
description: Combined analysis from DP and Mancini with executable trade ideas
tags: [trade-plan, premarket, unified]
author: Trading System AI
last_updated: {{DATE}}
version: 1.0
category: trade-plan
usage: Daily trading blueprint combining DP and Mancini analysis
status: active
requires: [dp-trade-analyzer.md, mancini-trade-analyzer.md, get-premarket-levels.md]
linked_outputs: []
input_format: json
output_format: markdown
ai_enabled: true
---

# UNIFIED TRADE PLAN FOR {{DATE}}

## MARKET BIAS
{{MARKET_BIAS_PARAGRAPH}}

## 5-MINUTE PRIORITY FOCUS
- {{FOCUS_POINT_1}}
- {{FOCUS_POINT_2}}
- {{FOCUS_POINT_3}}
- {{FOCUS_POINT_4}}

## BIG IDEAS
{{#each BIG_IDEAS}}
{{INDEX}}. **{{TICKER}}**: {{DIRECTION}} {{SETUP_TYPE}} at {{PRIMARY_LEVEL}}
   - **Targets**: {{TARGET_1}} → {{TARGET_2}} → {{TARGET_3}}
   - **Stop**: {{STOP_RULE}}
   - **Size**: {{POSITION_SIZE}}
   - **Context**: {{RATIONALE}}
   - **Source**: {{SOURCE}} | **Conviction**: {{CONVICTION}}

{{/each}}

## CASHFLOW TRADES
{{#each CASHFLOW_TRADES}}
{{INDEX}}. **{{TICKER}}**: {{DIRECTION}} {{SETUP_TYPE}} at {{PRIMARY_LEVEL}}
   - **Targets**: {{TARGET_1}} → {{TARGET_2}} → {{TARGET_3}}
   - **Stop**: {{STOP_RULE}}
   - **Size**: {{POSITION_SIZE}}
   - **Context**: {{RATIONALE}}
   - **Source**: {{SOURCE}} | **Conviction**: {{CONVICTION}}

{{/each}}

## LOTTO WATCH
{{#each LOTTO_TRADES}}
{{INDEX}}. **{{TICKER}}**: {{DIRECTION}} {{SETUP_TYPE}} at {{PRIMARY_LEVEL}}
   - **Targets**: {{TARGET_1}} → {{TARGET_2}} → {{TARGET_3}}
   - **Stop**: {{STOP_RULE}}
   - **Size**: {{POSITION_SIZE}}
   - **Context**: {{RATIONALE}}
   - **Source**: {{SOURCE}} | **Conviction**: {{CONVICTION}}

{{/each}}

## SPX DECISION TREE (MANCINI STRUCTURE)
IF SPX {{CONDITION_1}} → {{ACTION_1}} → Targets: {{TARGET_1_1}}, {{TARGET_1_2}}, {{TARGET_1_3}} → Stop: {{STOP_1}}  
IF SPX {{CONDITION_2}} → {{ACTION_2}} → Targets: {{TARGET_2_1}}, {{TARGET_2_2}}, {{TARGET_2_3}} → Stop: {{STOP_2}}  
IF SPX {{CONDITION_3}} → {{ACTION_3}} → Targets: {{TARGET_3_1}}, {{TARGET_3_2}}, {{TARGET_3_3}} → Stop: {{STOP_3}}  
IF SPX {{CONDITION_4}} → {{ACTION_4}} → Targets: {{TARGET_4_1}}, {{TARGET_4_2}}, {{TARGET_4_3}} → Stop: {{STOP_4}}  

## EXECUTION CHECKLIST
- Trade only within Big Ideas / Cashflow / Lotto categories
- Confirm setup: pattern + level + volume
- Match expiry to source: 0DTE (Mancini/SPX), next week (DP swing ideas)
- Size per plan: {{LOTTO_SIZE}} (lotto), {{CASHFLOW_SIZE}} (cashflow), {{BIG_IDEA_SIZE}} (big idea)
- Exit half at +20-30%, trail or stop the rest
- {{SPECIAL_INSTRUCTION_1}}
- {{SPECIAL_INSTRUCTION_2}}
- {{SPECIAL_INSTRUCTION_3}}

## KEY LEVELS
### SPX
- Macro Resistance: {{SPX_MACRO_RESISTANCE}}
- Major Resistance: {{SPX_MAJOR_RESISTANCE}}
- Minor Resistance: {{SPX_MINOR_RESISTANCE}}
- Current Range: {{SPX_CURRENT_RANGE}}
- Minor Support: {{SPX_MINOR_SUPPORT}}
- Major Support: {{SPX_MAJOR_SUPPORT}}
- Macro Support: {{SPX_MACRO_SUPPORT}}

### ES (Futures)
- Major Resistance: {{ES_MAJOR_RESISTANCE}}
- Minor Resistance: {{ES_MINOR_RESISTANCE}}
- Current Range: {{ES_CURRENT_RANGE}}
- Minor Support: {{ES_MINOR_SUPPORT}}
- Major Support: {{ES_MAJOR_SUPPORT}}

### SECTOR FOCUS
- Strongest: {{STRONGEST_SECTORS}}
- Weakest: {{WEAKEST_SECTORS}}
- Watch: {{WATCH_SECTORS}}

## CATALYST WATCH
- {{CATALYST_1}}
- {{CATALYST_2}}
- {{CATALYST_3}}
- {{CATALYST_4}}
