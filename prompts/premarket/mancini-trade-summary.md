---
title: Mancini Blueprint Summary Generator  
description: Generate a human-readable summary of Mancini's technical analysis from structured JSON data with Failed Breakdown priority  
tags: [premarket, analysis, technical]  
author: Simon Plant  
last_updated: 2025-05-12  
version: 3.1  
category: premarket  
usage: Run after mancini-trade-analyzer.md produces JSON output. Creates a concise technical summary with Failed Breakdown prioritization, acceptance patterns, and key levels. Consumes structured JSON data.  
status: active  
requires: [mancini-trade-analyzer.md]  
linked_outputs: [unified-trade-plan-generator.md]  
input_format: json  
output_format: markdown  
ai_enabled: true  
schema_version: 3.0
---

## MANCINI BLUEPRINT SUMMARY GENERATOR — PROMPT

**Purpose:**  
Convert structured JSON data from the Mancini analyzer into a concise premarket execution plan. Prioritize Failed Breakdown setups, acceptance patterns, and level-to-level management protocols.

---

### INPUT STRUCTURE

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

---

### OUTPUT FORMAT

```
# MANCINI SPX BLUEPRINT — [DATE]

ES TO SPX CONVERSION: [value from metadata]

## MARKET CONTEXT
- Regime: [MARKET_CONTEXT.regime] (Established: [MARKET_CONTEXT.regime_established.date] at [MARKET_CONTEXT.regime_established.level])
- Volatility: [MARKET_CONTEXT.volatility_assessment] - [MARKET_CONTEXT.follow_through_expectation] follow-through expected
- Session Character: [MARKET_CONTEXT.session_character]
- Mode: [MARKET_CONTEXT.current_mode] ([MODE_1_TRENDING = Rare 10% Trending | MODE_2_COMPLEX = Common 90% Complex])
- Streak: [MARKET_CONTEXT.consecutive_day_streak]

## BULL/BEAR CONTROL LINES
- Bull Control Above: [TECHNICAL_DATA.control_lines.bull_above.level] - [TECHNICAL_DATA.control_lines.bull_above.context]
- Bear Control Below: [TECHNICAL_DATA.control_lines.bear_below.level] - [TECHNICAL_DATA.control_lines.bear_below.context]
- Critical Decision Point: [TECHNICAL_DATA.control_lines.decision_point.level] - [TECHNICAL_DATA.control_lines.decision_point.context]

## TECHNICAL STRUCTURES
- Current Pattern: [TECHNICAL_DATA.market_structure.current_pattern]
- Key Structures:
  [For each structure in TECHNICAL_DATA.market_structure.key_structures]
  - [pattern_type] ([status]): Range [range.low]-[range.high]
    - Breakout Targets: [breakout_targets]
    - Breakdown Targets: [breakdown_targets]
    - Backtest Level: [backtest_level]

## SUPPORT ZONES
- Macro: [TECHNICAL_DATA.support_resistance.macro_support]
- Major: [TECHNICAL_DATA.support_resistance.major_support]
- Minor: [TECHNICAL_DATA.support_resistance.minor_support]
- Current Range: [TECHNICAL_DATA.support_resistance.trading_range.low] to [TECHNICAL_DATA.support_resistance.trading_range.high]

## RESISTANCE ZONES
- Macro: [TECHNICAL_DATA.support_resistance.macro_resistance]
- Major: [TECHNICAL_DATA.support_resistance.major_resistance]
- Minor: [TECHNICAL_DATA.support_resistance.minor_resistance]

## PRICE MAGNETS
[For each magnet in TECHNICAL_DATA.levels.magnets]
- [level]: [context]

## TIER 0: FAILED BREAKDOWN SETUPS (HIGHEST PRIORITY)
[For each setup in TRADE_SETUPS.failed_breakdowns, sorted by confidence]
### Setup [index]: Failed Breakdown of [significant_low.level] ([significant_low.type])
- Direction: LONG
- Conviction: [confidence]
- Flush To: [flush_details.flush_to] ([flush_details.depth_points] points)
- Acceptance: [acceptance.type] requiring [acceptance.duration_minutes] minutes in [acceptance.volatility_context] volatility
- Entry: [levels.entry] after acceptance
- Targets: [levels.targets]
- Stop: [levels.stop]
- Management: [management.first_target_action], [management.second_target_action], [management.trailing_methodology]
- Timing: [timing]
- Context: [context]

## TIER 1: LEVEL RECLAIM SETUPS
[For each setup in TRADE_SETUPS.level_reclaims, sorted by confidence]
### Setup [index]: Level Reclaim of [level_significance.level]
- Direction: [direction]
- Conviction: [confidence]
- Level Tests: [level_significance.prior_support_tests] as support, [level_significance.prior_resistance_tests] as resistance
- Acceptance: [acceptance.type] requiring [acceptance.duration_minutes] minutes in [acceptance.volatility_context] volatility
- Entry: [levels.entry] after acceptance
- Targets: [levels.targets]
- Stop: [levels.stop]
- Management: [management.first_target_action], [management.second_target_action], [management.trailing_methodology]
- Timing: [timing]
- Context: [context]

## TIER 4: BREAKDOWN TRADES (LOW WIN RATE - 60%+ FAIL)
[For each setup in TRADE_SETUPS.breakdown_trades, sorted by confidence]
### Setup [index]: Breakdown of [levels.key_level]
- Direction: SHORT
- Conviction: [confidence]
- Requirements: [setup_requirements.final_test] in [setup_requirements.volatility_conditions] volatility
- Entry: [levels.entry]
- Targets: [levels.targets]
- Stop: [levels.stop]
- Management: [management.first_target_action], [management.second_target_action], [management.trailing_methodology]
- Timing: [timing]
- Warning: [warning]

## TRADE MANAGEMENT PROTOCOL
- First Target: [TRADING_GUIDELINES.management_protocol.first_target_action]
- Second Target: [TRADING_GUIDELINES.management_protocol.second_target_action]
- Runner Management: [TRADING_GUIDELINES.management_protocol.runner_management]
- Stop Management: [TRADING_GUIDELINES.management_protocol.stop_management]
- Position Sizing: [TRADING_GUIDELINES.management_protocol.position_sizing]

## OPTIMAL EXECUTION WINDOWS
- Primary: [TRADING_GUIDELINES.optimal_windows.primary]
- Secondary: [TRADING_GUIDELINES.optimal_windows.secondary]
- Avoid: [TRADING_GUIDELINES.optimal_windows.avoid]

## DECISION TREE
[For each scenario in MARKET_ANALYSIS.decision_tree.scenarios]
IF [condition] [level]:
  → [For each outcome in scenario.outcomes]
     [outcome.result]
     Targets: [outcome.targets]
     Probability: [outcome.probability]
  [If secondary_conditions exists]
  → [For each sec_condition in scenario.secondary_conditions]
     IF [sec_condition.condition] [sec_condition.level]:
       → [For each sec_outcome in sec_condition.outcomes]
          [sec_outcome.result]
          Targets: [sec_outcome.targets]
          Probability: [sec_outcome.probability]

## PREVIOUS SESSION
- Summary: [MARKET_ANALYSIS.previous_session.summary]
- Key Developments:
  [For each development in MARKET_ANALYSIS.previous_session.key_developments]
  - [development]
- Important Levels Tested:
  [For each level in MARKET_ANALYSIS.previous_session.important_levels_tested]
  - [level]

## NEXT SESSION OUTLOOK
- Bull Case: [MARKET_ANALYSIS.next_session_outlook.bull_case]
- Bear Case: [MARKET_ANALYSIS.next_session_outlook.bear_case]
- Primary Expectation: [MARKET_ANALYSIS.next_session_outlook.primary_expectation]

## INVALIDATION SIGNALS
[For each signal in TRADING_GUIDELINES.invalidation_signals]
- [signal]

## GOLDEN RULE
[TRADING_GUIDELINES.golden_rule]
```

---

### SECTION PRIORITIZATION

1. **FAILED BREAKDOWN SETUPS (TIER 0)** - Always show first as highest priority
2. **LEVEL RECLAIM SETUPS (TIER 1)** - Secondary priority after Failed Breakdowns
3. **BREAKDOWN TRADES (TIER 4)** - Lowest priority with warning about 60%+ failure rate

Note: We deliberately use TIER 4 for breakdown trades (skipping 2-3) to align with the unified template tiers and emphasize their lower priority.

---

### FORMATTING RULES

1. **Conviction Highlighting**:
   - BIG_IDEA: Bold and add 🔥 emoji
   - HIGH: Bold
   - MEDIUM: Normal font
   - LOW: Italics with caution note

2. **Acceptance Pattern Visualization**:
   - BACKTEST_RETURN: "Price back-tests → sells off → returns"
   - RIP_SELLOFF_RECOVER: "Price rips through → sells off → recovers"
   - MIXED: "Complex pattern: multiple tests and recoveries"

3. **Volatility Context Highlighting**:
   - HIGH: Green (clean patterns, minimal acceptance needed)
   - MODERATE: Yellow
   - LOW: Orange (choppy patterns, extended acceptance required)
   - EXTREMELY_LOW: Red (highly choppy, extensive acceptance required)

4. **Decision Tree Formatting**:
   - Use proper indentation for nested conditions
   - Bold critical levels
   - Use arrows (→) to indicate flow
   - Include probability indicators when available

5. **Mode Explanation**:
   - MODE_1_TRENDING: "Rare 10% open-to-close trend days"
   - MODE_2_COMPLEX: "Common 90% days with multiple moves and traps"

---

### OUTPUT EMPHASIS

1. Focus on practical execution information
2. Prioritize Failed Breakdown setups above all others (TIER 0)
3. Include detailed acceptance pattern requirements
4. Highlight level-to-level management protocols
5. Emphasize volatility context and its implications
6. Include clear invalidation signals
7. Present decision tree in easily scannable format

---

### POST-PROCESSING

1. Check all numerical levels for accuracy
2. Ensure ES/SPX conversion is applied consistently
3. Sort setups by confidence within each category
4. Format acceptance patterns consistently
5. Include original quotes for key market regime statements
6. Add clear warnings for Breakdown Trades
7. Ensure the Golden Rule is prominently displayed
