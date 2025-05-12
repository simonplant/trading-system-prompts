---
title: DP Morning Call Analyzer  
description: Extract structured trade ideas with enhanced emphasis detection and position context
tags: [premarket, analysis, dp]  
author: Simon Plant  
last_updated: 2025-05-07  
version: 3.1  
category: premarket  
usage: Run after the Inner Circle morning call with improved focus detection and position awareness
status: active  
input_format: markdown  
output_format: json  
ai_enabled: true  
linked_outputs: [dp-trade-summary.md, unified-trade-plan-generator.md]  
schema_version: 2.0  
requires: [system-parameters.json, trade-data-schema.json, trading-behaviors-kb.md, moderator-position-tracker.md]
style:
  use_emojis: false
  text_decoration: false
---

# DP MORNING CALL ANALYZER

## Purpose
Extract structured trade ideas, conviction signals, and coaching insights from DP's morning calls with enhanced emphasis detection and position awareness.

## ENHANCED EMPHASIS & FOCUS DETECTION

This analyzer prioritizes detecting DP's specific emphasis patterns that signal high-conviction trade ideas:

### Primary Emphasis Signals (Automatic BIG_IDEA Classification)
- "gonna be my focus today" / "my focus today"
- "most definitely" (especially when answering a direct question about what to focus on)
- "I'm a big fan" combined with long-term outlook
- "gaga" / "oh my god" (positive emotional response)
- "monster" / "monstrous" (describing potential or performance)
- "beautiful story" (especially with "long-term")

### Secondary Emphasis Signals (HIGH Conviction)
- "buy on dips" / "buyer on dips"
- "crushing" / "crushed" (when describing performance)
- "viable" / "not going anywhere" 

### Tempering Signals (Lower Conviction)
- "am I excited about it? No" (explicit low conviction)
- "not as bad as feared" (damning with faint praise)
- "wouldn't be shocked" (mild expectation)
- "doubt" (uncertainty marker)

## POSITION CONTEXT INTEGRATION

### Position Context Indicators
- "I trimmed some at X and added back at Y" = ACTIVE_SWING with trading around core
- "I'm still in this" = ACTIVE_SWING, elevate confidence
- "I'm adding more today" = ACTIVE_POSITION with INCREASING size
- "I'm out of all today's adds" = Managing around CORE_POSITION

### Position Management Language
- "Added back to" = BULLISH_PULLBACK add to existing
- "Trimmed into strength" = MANAGING_POSITION, not decreasing conviction
- "I'm flat" = CLOSED_POSITION
- "Down to a trailer" = REDUCED_SIZE but still ACTIVE

### Context Detection
When DP discusses a ticker where moderators have active positions:
1. Classify as "POSITION_MANAGEMENT" if discussing adds/trims
2. Tag as "CATCHUP_OPPORTUNITY" if suggesting entry zone
3. Add "MOD_ALIGNMENT" tag if multiple moderators hold position

## DP-SPECIFIC LANGUAGE PARSER

DP uses distinctive language patterns that signal conviction and trade duration:

### Long-Term/Swing Indicators
- "beautiful story long-term"
- "viable company for the long term"
- "monster capex play for years"
- "leader and is not going anywhere"

### Intraday/Cashflow Indicators
- "simple day after trade"
- "probably just a"
- "just a reminder"
- "isn't as bad as feared"

### Directional Strength Indicators
- For strong bullish: "gaga", "crushed", "monster", "big fan"
- For strong bearish: "ugly", "pretty ugly", "more bearish than bullish", "would look to short"
- For neutral/uncertain: "Am I excited? No", "I wouldn't be shocked"

## DECISION LOGGING

For each trade idea identified or rejected, log the decision process:

### Pattern Detection Logs
- Log emphasis phrases detected ("focus", "most definitely", etc.)
- Log conviction signals and their scores
- Log pattern matches and their weights in classification

### Classification Decision Logs
- Log the final classification decision (BIG_IDEA, HIGH, etc.)
- Record evidence text that supported the classification
- Log alternative classifications considered
- Record exact rule patterns that matched

### Exclusion Logs
- When analyst upgrades or mentions are filtered out
- When tickers are recognized but lack actionable context
- When conflicting signals cause classification uncertainty

## DATA STRUCTURE — JSON SCHEMA

The analyzer uses the standardized system schema format (v2.0) with the following structure:

```json
{
  "metadata": {
    "source": "dp",
    "timestamp": "ISO-timestamp",
    "version": "2.0"
  },
  "TRADE_DATA": [
    {
      "ticker": "string",
      "direction": "LONG | SHORT",
      "confidence": "BIG_IDEA | HIGH | MEDIUM | LOW",
      "duration": "CASHFLOW | SWING | LONGTERM | LOTTO",
      "position_size": "FULL_DOUBLE | FULL | HALF | QUARTER | SMALL | TINY",
      "trigger_type": "exact | loose-trigger",
      "levels": {
        "entry": [number or string],
        "target": [number or string],
        "stop": number or string
      },
      "timing": "AT_OPEN | ON_PULLBACK | POST_EVENT | etc.",
      "context": "string — quote or rationale",
      "earnings": {
        "upcoming": true | false,
        "date": "optional string",
        "strategy": "pre | post"
      },
      "risk_reward": {
        "ratio": number,
        "calculation": "string"
      },
      "execution_priority": {
        "rank": number,
        "reason": "string"
      },
      "order_suggestion": {
        "type": "market | limit | stop | stop limit | trailing stop",
        "price": number | null,
        "stop_trigger": number | null,
        "notes": "string"
      },
      "timing_details": {
        "optimal_entry_window": "string",
        "setup_duration": "string",
        "expiration": "string"
      },
      "behavioral_flags": {
        "potential_flags": ["string"],
        "historical_patterns": ["string"],
        "mitigation_suggestions": ["string"]
      },
      "position_context": {
        "status": "NEW_IDEA | ACTIVE_POSITION | CORE_SWING | MONITORING",
        "moderators": ["string"],
        "activity": "INCREASING | HOLDING | REDUCING | TRAILING",
        "management_type": "POSITION_MANAGEMENT | CATCHUP_OPPORTUNITY | MOD_ALIGNMENT",
        "last_action": {"moderator": "string", "action": "string", "time": "timestamp"}
      }
    }
  ],
  "MARKET_BIAS": {
    "overall": "BULLISH | BEARISH | NEUTRAL | CAUTIOUS | MIXED",
    "key_levels": {
      "SPX": [number],
      "QQQ": [number],
      "SPY": [number],
      "VIX": [number]
    },
    "catalysts": ["string"],
    "focus_sectors": ["string"],
    "market_regime": "trending | range_bound | volatile | low_volatility",
    "volume_profile": "above_average | average | below_average",
    "notes": "string"
  },
  "COACHING_INSIGHTS": {
    "risk_management": ["string"],
    "timing_advice": ["string"],
    "market_condition_warnings": ["string"],
    "direct_quotes": ["string"]
  },
  "DECISION_LOGS": {
    "pattern_matches": [
      {
        "ticker": "string",
        "pattern_type": "PRIMARY_EMPHASIS | SECONDARY_EMPHASIS | TEMPERING | DURATION",
        "matched_text": "string",
        "score_impact": number,
        "timestamp": "ISO-timestamp"
      }
    ],
    "classification_decisions": [
      {
        "ticker": "string",
        "final_classification": "BIG_IDEA | HIGH | MEDIUM | LOW",
        "evidence": "string",
        "alternatives_considered": ["string"],
        "deciding_factors": ["string"],
        "timestamp": "ISO-timestamp"
      }
    ],
    "exclusions": [
      {
        "ticker": "string",
        "reason": "ANALYST_MENTION | NO_ACTIONABLE_CONTEXT | CONFLICTING_SIGNALS | OTHER",
        "details": "string",
        "timestamp": "ISO-timestamp"
      }
    ]
  }
}
```

## LOGIC RULES

### Conviction Classification

| Level     | Description | Criteria |
|-----------|-------------|----------|
| BIG_IDEA  | Absolute highest conviction | Primary emphasis phrase + strong emotion or multiple mentions |
| HIGH      | Strong conviction but not focus | Secondary emphasis phrase or clearly positive language |
| MEDIUM    | Moderate conviction with qualifiers | Mixed signals or if/then language |
| LOW       | Minimal conviction, uncertain | Tempering signals or vague, soft language |

### Duration Classification

| Type       | Description           | Identifying Patterns |
|------------|-----------------------|----------------------|
| CASHFLOW   | Intraday only         | "day trade", "today", "few hours" |
| SWING      | 1–5 day hold          | "swing", "few days", "this week" |
| LONGTERM   | Position trade        | "long-term", "story", "thesis", "years" |
| LOTTO      | Speculative short-term| "lotto", "speculative", "high risk", "fun trade" |

### Position Size Mapping

| Confidence | CASHFLOW    | SWING        | LONGTERM     | LOTTO  |
|------------|-------------|--------------|--------------|--------|
| BIG_IDEA   | FULL_DOUBLE | FULL_DOUBLE  | FULL         | SMALL  |
| HIGH       | FULL        | FULL         | FULL         | SMALL  |
| MEDIUM     | HALF        | HALF         | QUARTER      | SMALL  |
| LOW        | QUARTER     | QUARTER      | QUARTER      | TINY   |

## EXECUTION INSTRUCTIONS

1. Parse DP's morning call transcript
2. Extract all trade ideas with pattern matching
3. Classify each idea using the conviction and duration rules
4. Integrate with position tracker data
5. Generate detailed decision logs
6. Format output as JSON according to schema
7. Validate output for completeness

## CHANGELOG
- v3.1 (2025-05-07): Added enhanced emphasis detection, position context integration, and decision logging
- v3.0 (2025-05-01): Updated to schema version 2.0, added position management detection
- v2.5 (2025-04-15): Added behavioral flag detection and enhanced validation
- v2.0 (2025-04-01): Initial implementation with basic pattern matching