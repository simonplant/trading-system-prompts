---
title: Mancini Blueprint Analyzer  
description: Extract structured technical levels, trade setups, and acceptance patterns from Mancini's ES futures blueprint  
tags: [premarket, analysis, technical, mancini]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 2.3  
category: premarket  
usage: Run before market open after Mancini newsletter is available. Produces structured technical data and trade setups for system integration. Consumes ES/SPX levels and Mancini's blueprint notes.  
status: active  
requires: []  
linked_outputs: [mancini-blueprint-summary.md, unified-trade-plan-generator.md]  
input_format: markdown  
output_format: json  
ai_enabled: true  
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

### FINAL OUTPUT — SYSTEM JSON

Please output only the following JSON object:

```json
{
  "source": "mancini",
  "date": "YYYY-MM-DD",
  "TECHNICAL_DATA": {
    "metadata": {
      "es_to_spx_conversion": "current conversion value used",
      "version": "2.3"
    },
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

  "TRADE_SETUPS": {
    "setups": [
      {
        "ticker": "SPX",
        "type": "FAILED_BREAKDOWN|FAILED_BREAKOUT|RANGE_FADE|OTHER",
        "direction": "LONG|SHORT",
        "confidence": "HIGH|MEDIUM|LOW",
        "duration": "SCALP|DAY|SWING",
        "position_size": "1/4|1/3|1/2|FULL",
        "trigger_type": "exact|loose-trigger",
        "levels": {
          "entry": [number],
          "target": [number],
          "stop": number
        },
        "timing": "AT_OPEN|BREAKOUT|ON_PULLBACK|etc.",
        "acceptance": {
          "type": "BACKTEST|RECLAIM|BOTH",
          "pattern": "description of ideal pattern",
          "example": "example if provided"
        },
        "context": "setup background and reasoning",
        "notes": "optional notes"
      }
    ],
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
    }
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
  }
}