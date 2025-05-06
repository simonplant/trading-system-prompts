---
title: Trading System Controller Guide
description: Guide to operating the main controller interface for the trading system
tags: [system, guide, operations]
author: Simon Plant
last_updated: 2025-05-05
version: 2.1
category: system
usage: Reference guide for using the main controller. Use this to understand how to navigate the system and execute workflows properly.
status: active
requires: [main-controller.md]
linked_outputs: []
input_format: markdown
output_format: markdown
ai_enabled: false
---

# Trading System Controller Guide

## Introduction

This guide explains how to operate the main controller for the AI-assisted trading system. The controller serves as the primary interface for accessing all system functions and executing workflows. Understanding how to use the controller effectively is essential for proper system operation.

## Key Concepts

### System Architecture

The trading system employs a modular architecture with separate components for different functions:

1. **Analyzers**: Process raw inputs and produce structured JSON data
2. **Summary Generators**: Convert JSON to human-readable formats
3. **Controllers**: Coordinate workflow and manage data passing
4. **Knowledge Bases**: Store persistent information
5. **Executors**: Guide actual trade actions

### Data Flow Architecture

The system now uses a two-tier data architecture:

1. **System Tier (JSON)**: Structured data for machine processing
   - Strict schema enforcement
   - Validation at integration points
   - Used for downstream processing

2. **Human Tier (Summaries)**: Readable formats for human consumption
   - Generated from system tier data
   - Optimized for readability and decision-making
   - Does not feed back into system processes

## Workflow Operation

### Premarket Sequence

The premarket sequence should be executed in this specific order:

1. **Run DP Analyzer**
   - Input: DP morning call notes
   - Command: `/analyze-dp`
   - Output: JSON data structure

2. **Generate DP Summary (if needed)**
   - Input: DP analyzer JSON
   - Command: `/dp-summary`
   - Output: Human-readable summary

3. **Run Mancini Analyzer**
   - Input: Mancini blueprint notes
   - Command: `/analyze-mancini`
   - Output: JSON data structure

4. **Generate Mancini Summary (if needed)**
   - Input: Mancini analyzer JSON
   - Command: `/mancini-summary`
   - Output: Human-readable summary

5. **Get SMA Data**
   - Input: Ticker list
   - Command: `/get-sma`
   - Output: Table of moving averages

6. **Get Premarket Levels**
   - Input: Current market data
   - Command: `/get-levels`
   - Output: Table of key levels

7. **Generate Unified Trade Plan**
   - Input: All previous JSON outputs
   - Command: `/generate-trade-plan`
   - Output: Comprehensive trade plan

### Intraday Sequence

During market hours, use these commands as needed:

- `/copilot` - Activate intraday assistant
- `/copilot-scout` - Scan for matching setups
- `/copilot-confirm` - Validate potential trade
- `/copilot-recenter` - Reset trading focus
- `/copilot-debrief` - Review completed trade
- `/midday-reset` - Readjust plan mid-session

### Postmarket Sequence

Execute this sequence after market close:

1. `/generate-trade-log` - Log all trades
2. `/performance-debrief` - Analyze performance
3. `/generate-journal` - Create journal entry
4. `/update-behaviors` - Update behavior DB
5. `/generate-kb-update` - Generate KB recommendations

## JSON Data Management

### Understanding the New JSON Workflow

The system now strictly separates data processing from human presentation:

1. **Analyzer Outputs**: Pure JSON, no human-readable elements
   - Used for system integration and downstream processing
   - Must be validated before use in subsequent steps
   - Contains all structured trade and technical data

2. **Summary Generators**: Convert JSON to human-readable format
   - Only used when human needs to review information
   - Do not modify or extend the underlying data
   - Format information for optimal comprehension

### JSON Validation

Always verify JSON output from analyzers:

1. **Check Structure**: Ensure all expected fields are present
2. **Validate Data Types**: Confirm values match expected types
3. **Verify Completeness**: Check that all trade ideas are captured
4. **Preserve Precision**: Ensure numerical values maintain exact precision

### Handling JSON Errors

If a component produces invalid JSON:

1. **Identify Error Type**:
   - Syntax errors (missing brackets, commas)
   - Schema errors (missing required fields)
   - Type errors (wrong data types)

2. **Troubleshooting Steps**:
   - Check input data quality
   - Verify prompt instructions were followed
   - Re-run analyzer with corrections
   - If persistent, use last known good configuration

## Common Tasks

### Adding a New Trade Idea

To add a trade idea not captured in the automated analysis:

1. Run `/analyze-dp` to process existing ideas
2. Modify the resulting JSON to add the new trade
3. Run `/dp-summary` to generate an updated summary
4. Include the modified JSON when running `/generate-trade-plan`

### Adjusting Risk Parameters

To adjust risk management parameters:

1. Update the system parameters in `system-parameters.md`
2. Re-run the unified plan generator with updated parameters
3. Verify that new risk rules are properly applied

### Handling Missing Data

If essential data is unavailable:

1. Use the controller's `/status` command to identify missing components
2. Run relevant analyzers with available information
3. Use manual overrides for missing values
4. Document any assumptions or fallbacks used

## Troubleshooting

### Common Issues

#### 1. JSON Validation Failures

**Symptoms**:
- Error message indicating invalid JSON
- Missing or malformed data structure
- Downstream components failing to process input

**Solutions**:
- Check analyzer input format
- Verify AI followed exactly the output template
- Re-run analyzer with explicit instructions
- Check for syntax errors in the JSON output

#### 2. Data Integration Errors

**Symptoms**:
- Unified plan missing expected trade ideas
- Inconsistent level references
- Missing context or details

**Solutions**:
- Verify both analyzer JSONs are complete
- Check that conversion values are consistent
- Ensure format matches expected schema
- Manually check integration points

#### 3. Summary Generation Issues

**Symptoms**:
- Summary missing key information
- Formatting issues in human-readable output
- Inconsistent with JSON data

**Solutions**:
- Verify input JSON is complete
- Check summary generator instructions
- Re-run with explicit format instructions
- Manually create summary if necessary

## Best Practices

1. **Always Run in Sequence**
   - Follow the prescribed workflow order
   - Verify each step before proceeding
   - Document any deviations

2. **Validate JSON Outputs**
   - Check for completeness
   - Verify all fields are present
   - Ensure proper data types
   - Maintain numerical precision

3. **Separate System and Human Needs**
   - Use JSON for system integration
   - Use summaries for human decision-making
   - Don't modify JSON based on summary preferences
   - Keep data flow one-directional

4. **Document System Changes**
   - Record any ad hoc modifications
   - Note workarounds or fixes applied
   - Update documentation as needed

5. **Regular Backup**
   - Save JSON outputs for all critical steps
   - Archive daily workflow artifacts
   - Maintain a version history of changes

## JSON Schema Reference

For quick reference, here are the key JSON schemas:

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
- v2.0 (2025-04-01): Initial guide documentation