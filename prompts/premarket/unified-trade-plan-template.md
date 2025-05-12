---
title: Unified Trade Plan for {{DATE}}
description: Combined analysis from DP and Mancini with executable trade ideas and Failed Breakdown priority
tags: [trade-plan, premarket, unified]
author: Trading System AI
last_updated: {{DATE}}
version: 3.1
category: trade-plan
usage: Daily trading blueprint combining DP and Mancini analysis with Failed Breakdown prioritization
status: active
requires: [dp-trade-analyzer.md, mancini-trade-analyzer.md, get-premarket-levels.md, get-daily-sma-for-tickers.md]
linked_outputs: []
input_format: json
output_format: markdown
ai_enabled: true
schema_version: 3.0
---

# UNIFIED TRADE PLAN FOR {{DATE}}

## MARKET CONTEXT
- Current Regime: {{MARKET_CONTEXT.regime}} (Established: {{MARKET_CONTEXT.regime_established.date}} at {{MARKET_CONTEXT.regime_established.level}})
- Mode Expectation: {{MARKET_CONTEXT.current_mode}} ({{#if MARKET_CONTEXT.current_mode == "MODE_1_TRENDING"}}Rare 10% Trending{{else}}Common 90% Complex with Traps{{/if}})
- Volatility Assessment: {{MARKET_CONTEXT.volatility_assessment}}
- Follow Through Expectation: {{MARKET_CONTEXT.follow_through_expectation}}
- Session Character: {{MARKET_CONTEXT.session_character}}
- Technical Structure: {{TECHNICAL_DATA.market_structure.current_pattern}}
- Range: {{TECHNICAL_DATA.support_resistance.trading_range.low}} to {{TECHNICAL_DATA.support_resistance.trading_range.high}}

## BULL/BEAR CONTROL LINES
- Bull Control Above: {{TECHNICAL_DATA.control_lines.bull_above.level}} - {{TECHNICAL_DATA.control_lines.bull_above.context}}
- Bear Control Below: {{TECHNICAL_DATA.control_lines.bear_below.level}} - {{TECHNICAL_DATA.control_lines.bear_below.context}}
- Critical Decision Point: {{TECHNICAL_DATA.control_lines.decision_point.level}} - {{TECHNICAL_DATA.control_lines.decision_point.context}}

## 5-MINUTE PRIORITY FOCUS
- Critical Level: {{TECHNICAL_DATA.control_lines.decision_point.level}}
- First Action: {{#if MARKET_CONTEXT.regime == "BUY_DIPS"}}Look for Failed Breakdowns{{else if MARKET_CONTEXT.regime == "SELL_RIPS"}}Look for failed rallies{{else}}Wait for range extremes{{/if}}
- Risk Alert: {{#if MARKET_CONTEXT.volatility_assessment == "HIGH"}}High volatility - reduce size{{else if MARKET_CONTEXT.volatility_assessment == "EXTREMELY_LOW"}}Extremely low volatility - expect traps{{else}}Normal risk profile{{/if}}
- Volatility Note: {{MARKET_CONTEXT.volatility_assessment}} volatility - {{#if MARKET_CONTEXT.volatility_assessment == "HIGH"}}minimal acceptance needed (2-5 min){{else if MARKET_CONTEXT.volatility_assessment == "MODERATE"}}moderate acceptance needed (5-15 min){{else if MARKET_CONTEXT.volatility_assessment == "LOW"}}extended acceptance required (30+ min){{else}}extensive acceptance required (hours){{/if}}

## KEY SMA LEVELS
{{#each SMA_LEVELS}}
- {{TICKER}}: {{SMA_DETAILS}}
{{/each}}

## TRADE EXECUTION PLAN

### TIER 0: FAILED BREAKDOWN SETUPS (HIGHEST PRIORITY)
{{#each TRADE_SETUPS.failed_breakdowns}}
{{@index+1}}. **Failed Breakdown of {{significant_low.level}} ({{significant_low.type}})**
   - Direction: LONG
   - Conviction: {{confidence}}
   - Flush Target: {{flush_details.flush_to}} ({{flush_details.depth_points}} points)
   - Acceptance: {{acceptance.type}} requiring {{acceptance.duration_minutes}} minutes in {{acceptance.volatility_context}} volatility
   - Entry: {{levels.entry}} after acceptance
   - Targets: 
     - 75% off at {{levels.targets.[0]}}
     - More off at {{levels.targets.[1]}}, leave 10% runner
   - Stop: {{levels.stop}}
   - Management: {{management.first_target_action}}, {{management.second_target_action}}
   - Context: {{context}}

{{/each}}

### TIER 1: LEVEL RECLAIM SETUPS
{{#each TRADE_SETUPS.level_reclaims}}
{{@index+1}}. **Level Reclaim of {{level_significance.level}}**
   - Direction: {{direction}}
   - Conviction: {{confidence}}
   - Acceptance: {{acceptance.type}} requiring {{acceptance.duration_minutes}} minutes in {{acceptance.volatility_context}} volatility
   - Entry: {{levels.entry}} after acceptance
   - Targets: 
     - 75% off at {{levels.targets.[0]}}
     - More off at {{levels.targets.[1]}}, leave 10% runner
   - Stop: {{levels.stop}}
   - Management: {{management.first_target_action}}, {{management.second_target_action}}
   - Context: {{context}}

{{/each}}

### TIER 2: DP FOCUS & ACTIVE POSITIONS
{{#each DP_TRADES}}
{{@index+1}}. **{{TICKER}}**: {{DIRECTION}} {{CONVICTION}}/{{DURATION}}/{{POSITION_SIZE}}
   - Setup: {{SETUP_TYPE}}
   - Trigger: {{ENTRY_CONDITION}}
   - Levels: Entry {{ENTRY}} → Targets {{TARGET_1}} → {{TARGET_2}} → {{TARGET_3}} → Stop {{STOP}}
   - SMA Context: {{SMA_CONTEXT}}
   - Notes: {{NOTES}}
   - Position Status: {{POSITION_STATUS}}

{{/each}}

### TIER 3: TECHNICAL ALIGNMENT OPPORTUNITIES
{{#each TIER_3_TRADES}}
{{@index+1}}. **{{TICKER}}**: {{DIRECTION}} {{CONVICTION}}/{{DURATION}}/{{POSITION_SIZE}}
   - Setup: {{SETUP_TYPE}}
   - Trigger: {{ENTRY_CONDITION}}
   - Levels: Entry {{ENTRY}} → Targets {{TARGET_1}} → {{TARGET_2}} → {{TARGET_3}} → Stop {{STOP}}
   - SMA Context: {{SMA_CONTEXT}}
   - Timing: {{TIMING}}
   - Notes: {{NOTES}}

{{/each}}

### TIER 4: BREAKDOWN TRADES (LOW WIN RATE - 60%+ FAIL)
{{#each TRADE_SETUPS.breakdown_trades}}
{{@index+1}}. **Breakdown Short of {{levels.key_level}}**
   - Direction: SHORT
   - Conviction: {{confidence}}
   - Requirements: {{setup_requirements.final_test}} in {{setup_requirements.volatility_conditions}} volatility
   - Entry: {{levels.entry}}
   - Targets: 
     - 75% off at {{levels.targets.[0]}}
     - More off at {{levels.targets.[1]}}, leave 10% runner
   - Stop: {{levels.stop}}
   - Management: {{management.first_target_action}}, {{management.second_target_action}}
   - Warning: {{warning}}
   - Context: {{context}}

{{/each}}

## DECISION TREE
Current price at {{MARKET_ANALYSIS.decision_tree.current_price}}

{{#each MARKET_ANALYSIS.decision_tree.scenarios}}
- IF {{condition}} {{level}}:
  {{#each outcomes}}
  → {{result}}
    → Targets: {{targets}}
    → Probability: {{probability}}
  {{/each}}
  {{#if secondary_conditions}}
  {{#each secondary_conditions}}
    → IF {{condition}} {{level}}:
      {{#each outcomes}}
      → {{result}}
        → Targets: {{targets}}
        → Probability: {{probability}}
      {{/each}}
  {{/each}}
  {{/if}}
{{/each}}

## OPTIMAL EXECUTION WINDOWS
- Primary: {{TRADING_GUIDELINES.optimal_windows.primary}}
- Secondary: {{TRADING_GUIDELINES.optimal_windows.secondary}}
- Avoid: {{TRADING_GUIDELINES.optimal_windows.avoid}}

## TRADE MANAGEMENT PROTOCOL
- First Target: {{TRADING_GUIDELINES.management_protocol.first_target_action}}
- Second Target: {{TRADING_GUIDELINES.management_protocol.second_target_action}}
- Runner Management: {{TRADING_GUIDELINES.management_protocol.runner_management}}
- Stop Management: {{TRADING_GUIDELINES.management_protocol.stop_management}}
- Position Sizing: {{TRADING_GUIDELINES.management_protocol.position_sizing}}

## INVALIDATION SIGNALS
{{#each TRADING_GUIDELINES.invalidation_signals}}
- {{this}}
{{/each}}

## KEY EVENTS
{{#each KEY_EVENTS}}
- {{TIME}}: {{EVENT}} – {{IMPLICATIONS}}
{{/each}}

## KEY LEVELS
### Major Supports
{{#each TECHNICAL_DATA.support_resistance.major_support}}
- {{level}}: {{context}}
{{/each}}

### Major Resistances
{{#each TECHNICAL_DATA.support_resistance.major_resistance}}
- {{level}}: {{context}}
{{/each}}

### Price Magnets
{{#each TECHNICAL_DATA.levels.magnets}}
- {{level}}: {{context}}
{{/each}}

## PREVIOUS SESSION ANALYSIS
- Summary: {{MARKET_ANALYSIS.previous_session.summary}}
- Key Developments:
{{#each MARKET_ANALYSIS.previous_session.key_developments}}
  - {{this}}
{{/each}}

## NEXT SESSION OUTLOOK
- Bull Case: {{MARKET_ANALYSIS.next_session_outlook.bull_case}}
- Bear Case: {{MARKET_ANALYSIS.next_session_outlook.bear_case}}
- Primary Expectation: {{MARKET_ANALYSIS.next_session_outlook.primary_expectation}}

## SMA SIGNIFICANCE LEGEND
- ⭐⭐⭐ - Critical level (high historical significance)
- ⭐⭐ - Important level (medium historical significance)
- ⭐ - Notable level (low historical significance)

## GOLDEN RULE REMINDER
{{TRADING_GUIDELINES.golden_rule}}
