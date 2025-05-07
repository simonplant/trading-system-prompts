---
title: Mancini Blueprint Analyzer  
description: Extract structured technical levels, trade setups, and acceptance patterns from Mancini's ES futures blueprint  
tags: [premarket, analysis, technical, mancini]  
author: Simon Plant  
last_updated: 2025-05-07  
version: 2.4  
category: premarket  
usage: Run before market open after Mancini newsletter is available. Produces structured technical data and trade setups for system integration. Consumes ES/SPX levels and Mancini's blueprint notes.  
status: active  
requires: []  
linked_outputs: [mancini-blueprint-summary.md, unified-trade-plan-generator.md]  
input_format: markdown  
output_format: json  
ai_enabled: true  
schema_version: 2.0
---

## MANCINI BLUEPRINT ANALYZER — PROMPT

**Purpose:**  
Extract structured technical data, trade setups, and market structure insights from Mancini's ES futures blueprint, converting to SPX terms while maintaining precision on levels, patterns, and execution criteria.

---

### SYSTEM PARAMETERS

This analyzer imports parameters from the central system-parameters.md file.  
Key parameters used:
- ES_TO_SPX_CONVERSION: Value used to convert ES futures levels to SPX
- SPX_TO_SPY_DIVISOR: Value used for SPX to SPY calculations when needed

---

### EXTRACTION PRIORITIES

1. **TECHNICAL LEVELS**
   - Extract exact numerical levels with context
   - Identify primary structure levels vs. intraday magnets
   - Catalog prior day's highs/lows and V-shape recovery points
   - Convert ES levels to SPX using ES_TO_SPX_CONVERSION value

2. **TRADE SETUPS**
   - Focus on Failed Breakdown opportunities
   - Identify specific reclaim/fail scenarios
   - Extract acceptance criteria for entries
   - Capture trade management protocols
   - Add unified schema fields: ticker, confidence, duration, position_size

3. **MARKET STRUCTURE**
   - Identify current market regime
   - Extract multi-day trend analysis
   - Determine bull/bear control lines
   - Catalog any structural pattern completions/failures

---

### DATA STRUCTURE — JSON SCHEMA

The analyzer now uses the standardized system schema format (v2.0) with the following structure:

```json
{
  "metadata": {
    "source": "mancini",
    "timestamp": "ISO-timestamp",
    "version": "2.0",
    "es_to_spx_conversion": "current conversion value used"
  },
  "TECHNICAL_DATA": {
    "market_structure": {
      "regime": "BUY_DIPS|SELL_RIPS|RANGE_BOUND|TRENDING",
      "current_pattern": "description of active technical structure",
      "day_streak": "X days up/down",
      "key_structures": ["megaphone", "flag", "triangle"]
    },
    "control_lines": {
      "bull_above": ["level with context"],
      "bear_below": ["level with context"],
      "decision_point": "most critical level"
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
  "TRADE_DATA": [
    {
      "ticker": "SPX",
      "direction": "LONG | SHORT",
      "confidence": "BIG_IDEA | HIGH | MEDIUM | LOW",
      "duration": "CASHFLOW | SWING | LONGTERM | LOTTO",
      "position_size": "FULL_DOUBLE | FULL | HALF | QUARTER | SMALL | TINY",
      "trigger_type": "exact | loose-trigger",
      "setup_type": "FAILED_BREAKDOWN | FAILED_BREAKOUT | RANGE_FADE | OTHER",
      "levels": {
        "entry": [number],
        "target": [number],
        "stop": number
      },
      "timing": "AT_OPEN | BREAKOUT | ON_PULLBACK | etc.",
      "context": "setup background and reasoning",
      "acceptance": {
        "type": "BACKTEST | RECLAIM | BOTH",
        "pattern": "description of ideal pattern",
        "example": "example if provided"
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
      "notes": "optional notes"
    }
  ],
  "MARKET_BIAS": {
    "overall": "BULLISH | BEARISH | NEUTRAL | CAUTIOUS | MIXED",
    "key_levels": {
      "SPX": [number],
      "ES": [number]
    },
    "market_regime": "trending | range_bound | volatile | low_volatility",
    "volume_profile": "above_average | average | below_average",
    "notes": "string"
  },
  "MARKET_ANALYSIS": {
    "previous_session": {
      "summary": "brief description of prior day",
      "key_developments": ["notable price action", "structural changes"],
      "important_levels_tested": ["levels challenged/broken"]
    },
    "next_session_outlook": {
      "scenarios": [
        {
          "condition": "if X happens",
          "outcome": "then Y expected",
          "probability": "high|medium|low"
        }
      ],
      "focus_points": ["key things to watch"],
      "cautions": ["specific warnings"]
    },
    "invalidation_signals": {
      "structural": ["breaks that invalidate analysis"],
      "behavioral": ["price action that suggests failure"],
      "timing": ["time-based invalidations"]
    }
  },
  "COACHING_INSIGHTS": {
    "management_protocol": {
      "first_target_action": "what to do at first level",
      "second_target_action": "what to do at second level",
      "runner_management": "how to handle remaining position",
      "trailing_stop_methodology": "how to trail stops"
    },
    "execution_windows": {
      "primary": "optimal trading window",
      "secondary": "other viable windows",
      "avoid": "times to avoid trading"
    },
    "risk_management": ["string"],
    "timing_advice": ["string"],
    "market_condition_warnings": ["string"]
  }
}
```

---

### CONFIDENCE MAPPING

For consistent trade prioritization, Mancini setups are mapped to standard confidence levels:

| Mancini Description | Standardized Confidence | Typical Position Size |
|---------------------|-------------------------|------------------------|
| "High conviction setup" | BIG_IDEA | FULL |
| "Strong setup" | HIGH | FULL |
| "Watching for test at level" | MEDIUM | HALF |
| "Possible setup if..." | LOW | QUARTER |

---

### TRADE SETUP STANDARDIZATION

For each trade setup identified, the analyzer will:

1. **Map to Standard Schema**
   - Convert from Mancini's terminology to standardized fields
   - Calculate appropriate position sizing based on setup quality
   - Determine confidence based on language and context clues

2. **Enrich with Technical Context**
   - Add relevant level information from technical analysis
   - Include historical success rate if mentioned
   - Associate with current market structure

3. **Add Execution Details**
   - Calculate risk/reward based on target and stop information
   - Determine optimal order types and parameters
   - Extract timing windows and expiration conditions

---

### FINAL INSTRUCTION

Return one and only one JSON block in this structure:

```json
{
  "metadata": {
    "source": "mancini",
    "timestamp": "2025-05-07T09:30:00Z",
    "version": "2.0",
    "es_to_spx_conversion": 10.0
  },
  "TECHNICAL_DATA": {...},
  "TRADE_DATA": [...],
  "MARKET_BIAS": {...},
  "MARKET_ANALYSIS": {...},
  "COACHING_INSIGHTS": {...}
}
```

No commentary, notes, or narrative.  
For human-readable format, run `mancini-blueprint-summary.md` after validating this JSON.