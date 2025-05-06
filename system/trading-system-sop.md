---
title: Trading System Standard Operating Procedures
description: Comprehensive SOP for operating the AI-assisted trading system
tags: [system, SOP, process]
author: Simon Plant
last_updated: 2025-05-05
version: 2.1
category: system
usage: Reference guide for daily system operation. Follow these procedures exactly to ensure consistent execution and performance tracking.
status: active
requires: [system-parameters.md, trading-behaviors-kb.md]
linked_outputs: []
input_format: markdown
output_format: markdown
ai_enabled: false
---

# Trading System Standard Operating Procedures

## Overview

This document outlines the standard operating procedures for the AI-assisted trading system. These procedures should be followed precisely to ensure consistent execution, proper risk management, and accurate performance tracking.

## System Architecture

The trading system uses a modular architecture with specialized components:

1. **Analyzers** - Process raw data and output structured JSON
2. **Summary Generators** - Convert JSON to human-readable formats
3. **Controllers** - Orchestrate system flow and manage data passing
4. **Knowledge Bases** - Store persistent trading knowledge and behaviors
5. **Executors** - Guide actual trade execution and management

## Data Flow Architecture

The system employs a strict data flow with clear separation between system and human interfaces:

```
Raw Input → Analyzers → [JSON] → Integration Points → Summary Generators → Human Output
                          ↓
                    System Storage
```

## Daily Workflow

### 1. Premarket (6:00 AM - 9:20 AM ET)

#### Data Collection Phase
- [ ] Review overnight market action and futures
- [ ] Note key economic data, earnings, and events
- [ ] Capture current market levels (ES, SPX, QQQ, VIX)
- [ ] Document moving averages for key tickers

#### Analysis Phase
- [ ] Run `dp-trade-analyzer.md` to process DP's morning call
  - This outputs JSON data for system integration
  - Store this JSON for downstream use
- [ ] Run `dp-trade-summary.md` to generate human-readable trade summary
- [ ] Run `mancini-trade-analyzer.md` to process Mancini's blueprint
  - This outputs JSON data for system integration
  - Store this JSON for downstream use
- [ ] Run `mancini-trade-summary.md` to generate human-readable technical summary
- [ ] Run `get-daily-sma-for-tickers.md` to extract key moving averages
- [ ] Run `get-premarket-levels.md` to extract critical price levels

#### Integration Phase
- [ ] Run `unified-trade-plan-generator.md` to create comprehensive trade plan
  - This integrates JSON from both analyzers
  - Produces human-readable trade plan
- [ ] Review unified plan and prioritize trade candidates
- [ ] Set up watchlists and alerts for key levels

### 2. Market Open (9:30 AM - 10:30 AM ET)

- [ ] Observe opening price action for first 5-10 minutes
- [ ] Compare actual price action to anticipated scenarios
- [ ] Execute priority trades identified in premarket if conditions met
- [ ] Avoid chasing opening moves unless part of trade plan
- [ ] Wait for initial volatility to subside before entering new positions

### 3. Morning Session (10:30 AM - 12:00 PM ET)

- [ ] Activate `copilot.md` for trade execution assistance
- [ ] Monitor priority setups and levels from unified plan
- [ ] Use `copilot-confirm.md` before entering any trade
- [ ] Take planned exits at target levels
- [ ] Adjust stops according to market behavior

### 4. Midday Reset (12:00 PM - 1:00 PM ET)

- [ ] Run `midday-reset.md` to reassess market conditions
- [ ] Review morning trades and update open positions
- [ ] Adjust afternoon focus based on market development
- [ ] Reduce size during typical midday chop (11:30 AM - 2:00 PM)

### 5. Afternoon Session (1:00 PM - 3:30 PM ET)

- [ ] Focus on high-probability setups from updated plan
- [ ] Use `copilot-scout.md` to identify new opportunities
- [ ] Run `copilot-debrief.md` after completing each trade
- [ ] Begin reducing overall exposure as appropriate

### 6. Market Close (3:30 PM - 4:00 PM ET)

- [ ] Manage closing positions based on day structure
- [ ] Execute end-of-day trading plan tasks
- [ ] Note any positions held overnight
- [ ] Document final market levels and technical closes

### 7. Postmarket (4:00 PM - 5:30 PM ET)

- [ ] Run `generate-daily-trade-log.md` to record all trades
- [ ] Run `performance-debrief.md` to analyze trading results
- [ ] Run `generate-journal.md` to create reflection entry
- [ ] Run `update-behaviors-kb.md` to refine trading behaviors
- [ ] Run `generate-kb-update.md` for system improvement recommendations

## JSON Data Flow Procedures

### Analyzer Output Validation

For both `dp-trade-analyzer.md` and `mancini-trade-analyzer.md`:

1. Verify the output is valid JSON with proper structure
2. Check for required fields and proper data types
3. Store the JSON output for downstream integration
4. If JSON is invalid or incomplete:
   - Check input data quality
   - Re-run analyzer with corrected input
   - If error persists, report specific validation issues

### Summary Generator Usage

After successful analyzer runs:

1. Pass the JSON output to the corresponding summary generator
   - `dp-trade-summary.md` for DP analysis
   - `mancini-trade-summary.md` for Mancini analysis
2. Review the human-readable summary for completeness
3. Use the summary for trade planning and review
4. Keep both the JSON and the summary for reference

### Unified Plan Generation

When generating the unified trade plan:

1. Ensure both analyzer JSONs are available and valid
2. Run `unified-trade-plan-generator.md` with both data sources
3. Verify the plan contains all priority trade ideas
4. Check that all key levels are correctly integrated
5. Confirm risk management rules are properly applied

## Error Handling Procedures

### Missing or Invalid JSON

If analyzer JSON output is missing or invalid:

1. Check the analyzer input for missing data
2. Verify the format matches expected input
3. Re-run the analyzer with corrected input
4. If error persists, document the specific error
5. Use the last known good configuration as fallback

### Data Integration Failures

If the unified plan generator fails:

1. Validate both input JSON structures
2. Check for missing required fields
3. Ensure conversion values are consistent
4. Re-run with validated inputs
5. If error persists, generate plan manually using summaries

## Performance Tracking

### Trade Logging Requirements

All trades must be logged with:

- Entry and exit prices and times
- Position size and direction
- Planned vs. actual execution
- Reasons for entry and exit
- Technical levels that triggered action
- Profit/loss amount and percentage
- Emotional state during trade
- Adherence to trade plan (scale 1-10)

### System Performance Metrics

Track these metrics daily:

- Win rate (% of profitable trades)
- Profit factor (gross profit / gross loss)
- Average win vs. average loss
- Largest win and largest loss
- Drawdown (intraday and cumulative)
- Adherence to system score (1-10)
- Emotional control score (1-10)
- Number of unplanned trades

## System Maintenance

### Daily Tasks

- [ ] Back up all trade logs and journal entries
- [ ] Update knowledge base with new observations
- [ ] Document any system issues or failures
- [ ] Sync local files with git repository

### Weekly Tasks

- [ ] Review all journal entries for patterns
- [ ] Update trading behaviors knowledge base
- [ ] Assess system performance metrics
- [ ] Refine risk management parameters
- [ ] Clean up data storage

### Monthly Tasks

- [ ] Conduct full system performance review
- [ ] Update system parameters based on market conditions
- [ ] Refine analyzer extraction rules
- [ ] Improve trade plan generation logic
- [ ] Test system with historical data

## JSON Schema Reference

### DP Analysis JSON
```json
{
  "TRADE_DATA": [
    {
      "ticker": "TICKER",
      "direction": "LONG|SHORT",
      "conviction": {
        "level": "BIG_IDEA|HIGH|MEDIUM|LOW",
        "signals": ["signal1", "signal2"]
      },
      "duration": "CASHFLOW|SWING|LONGTERM|LOTTO",
      "sizing": "FULL_DOUBLE|FULL|HALF|QUARTER|SMALL|TINY",
      "trigger_type": "exact|loose-trigger",
      "levels": {
        "entry": ["price or condition"],
        "targets": ["T1", "T2", "T3"],
        "stops": ["stop level"]
      },
      "timing": "AT_OPEN|ON_PULLBACK|POST_EVENT",
      "context": "rationale",
      "earnings": {
        "upcoming": true|false,
        "date": "date string",
        "strategy": "pre|post"
      }
    }
  ],
  "MARKET_BIAS": {
    "overall": "BULLISH|BEARISH|NEUTRAL|CAUTIOUS",
    "key_levels": {
      "SPX": ["level1", "level2"],
      "QQQ": ["level1", "level2"],
      "SPY": ["level1", "level2"],
      "VIX": ["level1", "level2"]
    },
    "catalysts": ["catalyst1", "catalyst2"],
    "focus_sectors": ["sector1", "sector2"]
  },
  "COACHING_INSIGHTS": {
    "risk_management": ["insight1", "insight2"],
    "timing_advice": ["advice1", "advice2"],
    "market_condition_warnings": ["warning1", "warning2"],
    "direct_quotes": ["quote1", "quote2"]
  }
}
```

### Mancini Analysis JSON
```json
{
  "TECHNICAL_DATA": {
    "metadata": {
      "es_to_spx_conversion": "value",
      "date": "analysis date",
      "version": "2.2"
    },
    "market_structure": {
      "regime": "BUY_DIPS|SELL_RIPS|RANGE_BOUND|TRENDING",
      "current_pattern": "pattern description",
      "day_streak": "streak description",
      "key_structures": ["structure1", "structure2"]
    },
    "control_lines": {
      "bull_above": ["level with context"],
      "bear_below": ["level with context"],
      "decision_point": "critical level"
    },
    "levels": {
      "structure_levels": [
        {"level": "SPX level", "context": "significance", "origin": "when"}
      ],
      "historical_levels": [
        {"level": "SPX level", "context": "significance", "timeframe": "when"}
      ],
      "magnets": [
        {"level": "SPX level", "context": "why"}
      ],
      "v_shape_points": [
        {"level": "SPX level", "context": "significance"}
      ]
    },
    "support_resistance": {
      "macro_resistance": [{"level": "SPX level", "context": "significance"}],
      "major_resistance": [{"level": "SPX level", "context": "significance"}],
      "minor_resistance": [{"level": "SPX level", "context": "significance"}],
      "trading_range": {"high": "SPX level", "low": "SPX level"},
      "minor_support": [{"level": "SPX level", "context": "significance"}],
      "major_support": [{"level": "SPX level", "context": "significance"}],
      "macro_support": [{"level": "SPX level", "context": "significance"}]
    }
  },
  "TRADE_SETUPS": {
    "setups": [
      {
        "type": "FAILED_BREAKDOWN|FAILED_BREAKOUT|RANGE_FADE|OTHER",
        "direction": "LONG|SHORT",
        "conviction": "HIGH|MEDIUM|LOW",
        "primary_level": "SPX level",
        "acceptance": {
          "type": "BACKTEST|RECLAIM|BOTH",
          "pattern": "pattern description",
          "example": "example if provided"
        },
        "execution": {
          "entry_trigger": "entry signal",
          "targets": ["T1", "T2", "T3"],
          "stop": "invalidation level",
          "sizing": "sizing recommendation"
        },
        "timing": "execution window",
        "context": "setup background"
      }
    ],
    "management_protocol": {
      "first_target_action": "action at first level",
      "second_target_action": "action at second level",
      "runner_management": "handling remaining position",
      "trailing_stop_methodology": "trailing stop approach"
    },
    "execution_windows": {
      "primary": "optimal window",
      "secondary": "other windows",
      "avoid": "times to avoid"
    }
  },
  "MARKET_ANALYSIS": {
    "previous_session": {
      "summary": "prior day description",
      "key_developments": ["development1", "development2"],
      "important_levels_tested": ["level1", "level2"]
    },
    "next_session_outlook": {
      "scenarios": [
        {
          "condition": "if X happens",
          "outcome": "then Y expected",
          "probability": "probability if indicated"
        }
      ],
      "focus_points": ["focus1", "focus2"],
      "cautions": ["caution1", "caution2"]
    },
    "invalidation_signals": {
      "structural": ["signal1", "signal2"],
      "behavioral": ["signal1", "signal2"],
      "timing": ["signal1", "signal2"]
    }
  }
}
```

## CHANGELOG

- v2.1 (2025-05-05): Updated to reflect JSON-based data flow architecture and separation of analyzer/summary components
- v2.0 (2025-04-01): Initial SOP documentation