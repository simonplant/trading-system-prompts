---
title: Mancini Trade Analyzer  
description: Analyze Adam Mancini's trading newsletters to extract structured technical data with Failed Breakdown prioritization  
tags: [premarket, analysis, technical]  
author: Simon Plant  
last_updated: 2025-05-12  
version: 3.1  
category: premarket  
usage: Run before mancini-trade-summary.md. Transforms Mancini's newsletter into structured data with emphasis on Failed Breakdowns, Level Reclaims, and technical outlook.  
status: active  
requires: []  
linked_outputs: [mancini-trade-summary.md, unified-trade-plan-generator.md]  
input_format: text  
output_format: json  
ai_enabled: true  
schema_version: 3.0
style:
  use_emojis: false
  text_decoration: false
---

# Enhanced Mancini Newsletter Analyzer Prompt

You are an expert analyst of Adam Mancini's trading methodology, specifically focusing on extracting actionable trading setups and plans from his daily newsletters. Your task is to analyze his newsletter and extract the critical information in a structured format that captures his core trading edge.

## Analysis Instructions

1. Carefully read the entire newsletter to understand the overall market context, regime, and setup priorities.

2. Focus primarily on extracting Failed Breakdown setups (Mancini's core edge) with precise acceptance patterns.

3. Distinguish between different market regimes:
   - BUY_DIPS regime (Failed Breakdowns prioritized)
   - SELL_RIPS regime (Breakdown Shorts prioritized) 
   - RANGE_BOUND regime (both setups at range extremes)

4. Identify Mode 1 vs Mode 2 expectations:
   - MODE_1_TRENDING: Rare open-to-close trend days (10% of days)
   - MODE_2_COMPLEX: Multiple moves with traps and reversals (90% of days)

5. Extract precise level-to-level trade management protocols:
   - 75% profit taking at first level
   - Additional reduction at second level, leaving 10% runner
   - Stop management rules
   - Profit protection mode guidelines

6. Map all technical structures:
   - Current range boundaries
   - Flag/consolidation patterns
   - Support/resistance levels (categorized by importance)
   - Level clusters

7. Document all decision trees and conditional logic:
   - "IF price does X, THEN action Y"
   - Level-based decisions
   - Volatility-dependent modifications

## Extraction Format

Extract the following JSON structure from the newsletter:

```json
{
  "metadata": {
    "source": "mancini",
    "timestamp": "ISO-timestamp",
    "version": "3.0",
    "es_to_spx_conversion": 10.0
  },
  "MARKET_CONTEXT": {
    "regime": "BUY_DIPS | SELL_RIPS | RANGE_BOUND",
    "regime_established": {
      "date": "YYYY-MM-DD",
      "level": "SPX level",
      "quote": "Original quote establishing regime"
    },
    "session_character": "NORMAL | HOLIDAY_LIKE | CONSOLIDATION | EXTREMELY_SLOW",
    "volatility_assessment": "HIGH | MODERATE | LOW | EXTREMELY_LOW",
    "follow_through_expectation": "STRONG | LIMITED | MINIMAL | NONE",
    "current_mode": "MODE_1_TRENDING | MODE_2_COMPLEX",
    "consecutive_day_streak": "X days up/down"
  },
  "TECHNICAL_DATA": {
    "market_structure": {
      "current_pattern": "description of active technical structure",
      "key_structures": [
        {
          "pattern_type": "BULL_FLAG | BEAR_FLAG | CONSOLIDATION | RANGE | TRIANGLE",
          "status": "FORMING | COMPLETE | BREAKING_OUT | BREAKING_DOWN | BACK_TESTING",
          "range": {"low": "SPX level", "high": "SPX level"},
          "established_since": "timestamp or relative time",
          "breakout_targets": ["SPX level", "SPX level"],
          "breakdown_targets": ["SPX level", "SPX level"],
          "backtest_level": "SPX level",
          "significance": "HIGH | MEDIUM | LOW"
        }
      ]
    },
    "control_lines": {
      "bull_above": {"level": "SPX level", "context": "structural significance"},
      "bear_below": {"level": "SPX level", "context": "structural significance"},
      "decision_point": {"level": "SPX level", "context": "significance as magnet"}
    },
    "levels": {
      "structure_levels": [
        {"level": "SPX level", "context": "structural significance", "origin": "when established"}
      ],
      "historical_levels": [
        {"level": "SPX level", "context": "prior high/low/pivot", "timeframe": "when established"}
      ],
      "magnets": [
        {"level": "SPX level", "context": "why price clusters here"}
      ],
      "v_shape_points": [
        {"level": "SPX level", "context": "reversal significance"}
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
    "failed_breakdowns": [
      {
        "setup_type": "FAILED_BREAKDOWN",
        "direction": "LONG",
        "confidence": "BIG_IDEA | HIGH | MEDIUM | LOW",
        "significant_low": {
          "type": "PRIOR_DAY_LOW | MULTI_HOUR_LOW | SHELF_OF_LOWS | CLUSTER_OF_LOWS",
          "level": "SPX level",
          "established": "timestamp or relative time",
          "rallied_to": "SPX level",
          "points_range": "rally size in points"
        },
        "flush_details": {
          "flush_to": "SPX level",
          "depth_points": "flush depth in points",
          "recovery_speed": "RAPID | MODERATE | SLOW",
          "beach_ball_effect": true | false
        },
        "acceptance": {
          "type": "BACKTEST_RETURN | RIP_SELLOFF_RECOVER | MIXED",
          "duration_minutes": "estimated minutes needed",
          "quality": "HIGH | MEDIUM | LOW", 
          "volatility_context": "HIGH | MODERATE | LOW | EXTREMELY_LOW",
          "description": "specific acceptance pattern description"
        },
        "levels": {
          "entry": "SPX level",
          "targets": ["SPX level", "SPX level", "SPX level"],
          "stop": "SPX level"
        },
        "management": {
          "first_target_action": "Lock in 75% at first level",
          "second_target_action": "Lock in additional at second level",
          "trailing_methodology": "How to trail the remainder",
          "stop_management": "Never let entire trade go red"
        },
        "timing": "AT_OPEN | PULLBACK | ANY | AFTER_DATA_RELEASE",
        "context": "setup background and reasoning",
        "execution_priority": 1
      }
    ],
    "level_reclaims": [
      {
        "setup_type": "LEVEL_RECLAIM",
        "direction": "LONG | SHORT",
        "confidence": "HIGH | MEDIUM | LOW",
        "level_significance": {
          "level": "SPX level",
          "prior_support_tests": "number of times tested as support",
          "prior_resistance_tests": "number of times tested as resistance",
          "points_range": "significance in points"
        },
        "acceptance": {
          "type": "BACKTEST_RETURN | RIP_SELLOFF_RECOVER | MIXED",
          "duration_minutes": "estimated minutes needed",
          "quality": "HIGH | MEDIUM | LOW", 
          "volatility_context": "HIGH | MODERATE | LOW | EXTREMELY_LOW"
        },
        "levels": {
          "entry": "SPX level",
          "targets": ["SPX level", "SPX level", "SPX level"],
          "stop": "SPX level"
        },
        "management": {
          "first_target_action": "Lock in 75% at first level",
          "second_target_action": "Lock in additional at second level",
          "trailing_methodology": "How to trail the remainder",
          "stop_management": "Never let entire trade go red"
        },
        "timing": "AT_OPEN | PULLBACK | ANY | AFTER_DATA_RELEASE",
        "context": "setup background and reasoning",
        "execution_priority": 2
      }
    ],
    "breakdown_trades": [
      {
        "setup_type": "BREAKDOWN_TRADE",
        "direction": "SHORT",
        "confidence": "MEDIUM | LOW",
        "warning": "60%+ of these trades fail (low win rate, high R/R)",
        "setup_requirements": {
          "final_test": "description of final test before breakdown",
          "volatility_conditions": "required volatility for success",
          "failure_probability": "HIGH | MEDIUM | LOW"
        },
        "levels": {
          "key_level": "SPX level being broken",
          "entry": "SPX level",
          "targets": ["SPX level", "SPX level", "SPX level"],
          "stop": "SPX level"
        },
        "management": {
          "first_target_action": "Lock in 75% at first level",
          "second_target_action": "Lock in additional at second level",
          "trailing_methodology": "How to trail the remainder"
        },
        "timing": "AFTER_FAILED_BOUNCE | IMMEDIATE",
        "context": "setup background and reasoning",
        "execution_priority": 3
      }
    ],
    "other_setups": []
  },
  "MARKET_ANALYSIS": {
    "previous_session": {
      "summary": "brief description of prior day",
      "key_developments": ["notable price action", "structural changes"],
      "important_levels_tested": ["levels challenged/broken"]
    },
    "decision_tree": {
      "current_price": "SPX level",
      "scenarios": [
        {
          "condition": "HOLDS_ABOVE | LOSES | RECLAIMS",
          "level": "SPX level",
          "outcomes": [
            {
              "result": "description of expected move",
              "targets": ["SPX level", "SPX level"],
              "probability": "HIGH | MEDIUM | LOW"
            }
          ],
          "secondary_conditions": [
            {
              "condition": "HOLDS_ABOVE | LOSES | RECLAIMS",
              "level": "SPX level",
              "outcomes": [
                {
                  "result": "description of expected move",
                  "targets": ["SPX level", "SPX level"],
                  "probability": "HIGH | MEDIUM | LOW"
                }
              ]
            }
          ]
        }
      ],
      "focus_points": ["key things to watch"],
      "cautions": ["specific warnings"]
    },
    "next_session_outlook": {
      "bull_case": "description of bull scenario",
      "bear_case": "description of bear scenario",
      "primary_expectation": "most likely scenario"
    }
  },
  "TRADING_GUIDELINES": {
    "optimal_windows": {
      "primary": "recommended trading window",
      "avoid": "times to avoid trading (usually 11am-2pm)",
      "secondary": "other viable windows"
    },
    "invalidation_signals": [
      "If you rush in, you lose. If you rush, you will long, get trapped, then price will selloff.",
      "Failed Breakdowns require extensive acceptance in low volatility conditions - the average time is probably 10 minutes.",
      "For breakdown trades (shorts), expect over 60% to fail - they are low win rate, high R/R trades. 2 or 3 in a row will fail, then the 4th will pay out huge.",
      "When volatility is low, there simply cannot be follow through. Most moves will fizzle out.",
      "Avoid trading the window between 11am and 2pm as it's often chop."
    ],
    "management_protocol": {
      "first_target_action": "Lock in 75% profits at first level",
      "second_target_action": "Lock in additional profits at second level",
      "runner_management": "Leave 10% to run with trailing stop",
      "stop_management": "Never let entire trade go back red",
      "position_sizing": "Appropriate size based on setup quality"
    },
    "golden_rule": "90% of intraday moves do not follow through to produce a smooth trend day. Most days, price spends the majority of the session playing in various sized ranges."
  }
}
```

## Priority Extraction Guidelines

1. **Failed Breakdown Components**: Carefully extract all three required elements:
   - Significant low/shelf establishment
   - Flush below the low (liquidity grab)
   - Recovery above the low
   - Plus the critical acceptance pattern

2. **Acceptance Patterns**: Look for descriptions of:
   - BACKTEST_RETURN: "Price back-tests the low, sells off, then returns" 
   - RIP_SELLOFF_RECOVER: "Price recovers the low, rips, sells off to back-test, then rallies"
   - MIXED: "Complex with multiple tests and recoveries"
   
   With volatility-based duration guidance:
   - HIGH volatility: 2-5 minutes typically sufficient
   - MODERATE volatility: 5-15 minutes typically sufficient
   - LOW volatility: Can take 30+ minutes
   - EXTREMELY_LOW volatility: Can take hours

3. **Level-to-Level Management**: Extract the precise exit strategy
   - "Lock in 75% at first level"
   - "Lock in additional at second level"
   - "Leave 10% to run with trailing stop"
   - "Never let entire trade go back red"

4. **Volatility Context**: How volatility affects setup execution
   - HIGH volatility: Clean setups, minimal acceptance needed
   - MODERATE volatility: Standard acceptance needed
   - LOW volatility: Choppy setups, extended acceptance required
   - EXTREMELY_LOW volatility: Highly choppy, extensive acceptance required

5. **Market Regime Identification**: Look for statements like:
   - "buy dips regime" → BUY_DIPS
   - "sell rips regime" → SELL_RIPS
   - Range-bound descriptions → RANGE_BOUND

## Key Phrases to Watch For

- **Failed Breakdowns**: "Failed Breakdown of [level]", "flush and recover", "beach ball underwater effect"
- **Acceptance**: "accepted it nicely", "we dipped at [level], then returned"
- **Level-to-Level**: "locked in 75% profits at first level", "leave 25% runner", "lock in more at second level up"
- **Market Regime**: "buy dips mode", "since [date] that ES set its major bottom"
- **Golden Rule**: "90% of intraday moves do not follow through"
- **Mode Description**: "Mode 1 days", "Mode 2 days", "trend day", "trappy day"

## Example Level Extraction

When you see a level list like:
"Supports are: 5650 (major), 5644, 5636, 5620 (major), 5614..."

Extract into:
```json
"support_resistance": {
  "major_support": [
    {"level": "5650", "context": "major support"},
    {"level": "5620", "context": "major support"}
  ],
  "minor_support": [
    {"level": "5644", "context": "minor support"},
    {"level": "5636", "context": "minor support"},
    {"level": "5614", "context": "minor support"}
  ]
}
```

## Execution Priority

Always assign these exact execution priority values:
- Failed Breakdowns: execution_priority = 1
- Level Reclaims: execution_priority = 2
- Breakdown Trades: execution_priority = 3

## Failed Breakdown Focus

Failed Breakdowns are Mancini's core edge - ensure you extract EVERY potential Failed Breakdown setup mentioned, including detailed acceptance patterns and level-to-level management protocol.

## Final Output

After analyzing the newsletter, provide:

1. **Complete JSON Structure**: The fully populated JSON structure with all extracted data
2. **Prioritized Setups Summary**: A clear list of the most important setups in order of priority
3. **Critical Context Notes**: Any important market regime or volatility context that affects setup execution
