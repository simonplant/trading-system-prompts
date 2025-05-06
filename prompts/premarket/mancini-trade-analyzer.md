---
title: Mancini Blueprint Analyzer  
description: Extract structured technical levels, trade setups, and acceptance patterns from Mancini's ES futures blueprint  
tags: [premarket, analysis, technical]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 2.1  
category: premarket  
usage: Run before market open after Mancini newsletter is available. Produces structured technical data and trade setups for system integration. Consumes ES/SPX levels and Mancini's blueprint notes.
status: active  
requires: []  
linked_outputs: [unified-trade-plan-generator.md]  
input_format: markdown  
output_format: markdown  
ai_enabled: true  
---

## MANCINI BLUEPRINT ANALYZER — PROMPT

**Purpose:**  
Extract structured technical data, trade setups, and market structure insights from Mancini's ES futures blueprint, converting to SPX terms while maintaining precision on levels, patterns, and execution criteria.

---

### CONFIGURATION PARAMETERS

ES_TO_SPX_CONVERSION: -30  # Update this value regularly as quarter progresses
                           # Typical range: -40 (start of quarter) to -20 (mid-quarter)
                           # May approach -10 or less near quarterly options expiration

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

3. **MARKET STRUCTURE**
   - Identify current market regime
   - Extract multi-day trend analysis
   - Determine bull/bear control lines
   - Catalog any structural pattern completions/failures

---

### DATA STRUCTURE SPECIFICATION

For each extraction category, maintain this exact structure for downstream system integration:

**TECHNICAL_DATA**: 
```json
{
  "metadata": {
    "es_to_spx_conversion": "current conversion value used",
    "date": "analysis date"
  },
  "market_structure": {
    "regime": "BUY_DIPS|SELL_RIPS|RANGE_BOUND|TRENDING",
    "current_pattern": "description of active technical structure",
    "day_streak": "X days up/down",
    "key_structures": ["megaphone", "flag", "triangle", etc.]
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
}
```

**TRADE_SETUPS**:
```json
{
  "setups": [
    {
      "type": "FAILED_BREAKDOWN|FAILED_BREAKOUT|RANGE_FADE|OTHER",
      "direction": "LONG|SHORT",
      "conviction": "HIGH|MEDIUM|LOW",
      "primary_level": "SPX level",
      "acceptance": {
        "type": "BACKTEST|RECLAIM|BOTH",
        "pattern": "description of ideal pattern",
        "example": "specific example if provided"
      },
      "execution": {
        "entry_trigger": "precise signal for entry",
        "targets": ["T1", "T2", "T3"],
        "stop": "precise invalidation level",
        "sizing": "recommendation if provided"
      },
      "timing": "specific timing window if mentioned",
      "context": "setup background and reasoning"
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
}
```

**MARKET_ANALYSIS**: 
```json
{
  "previous_session": {
    "summary": "brief description of prior day",
    "key_developments": ["notable price action", "structural changes", etc.],
    "important_levels_tested": ["levels that were challenged/broken"]
  },
  "next_session_outlook": {
    "scenarios": [
      {
        "condition": "if X happens",
        "outcome": "then Y expected",
        "probability": "high/medium/low if indicated"
      }
    ],
    "focus_points": ["key things to watch"],
    "cautions": ["specific warnings"]
  },
  "invalidation_signals": {
    "structural": ["breaks that invalidate the analysis"],
    "behavioral": ["price action that suggests failure"],
    "timing": ["time-based invalidations"]
  }
}
```

---

### EXTRACTION RULES

1. **Level Processing Logic**:
   - Convert all ES levels to SPX by subtracting ${ES_TO_SPX_CONVERSION} points
   - Note: This conversion factor varies throughout the quarter
   - Document the current conversion factor used in the output
   - Maintain level precision (e.g., 5642 not 5640)
   - Identify level significance from context
   - Differentiate between strict levels and zones

2. **Setup Classification Logic**:
   - **FAILED_BREAKDOWN**: Price loses support, flushes lower, then recovers
   - **FAILED_BREAKOUT**: Price breaks above resistance, fails, then drops
   - **RANGE_FADE**: Price tests range extreme, shows rejection
   - **OTHER**: Any other setup type with specific description

3. **Conviction Assessment**:
   - **HIGH**: Clear, explicit setup with multiple references
   - **MEDIUM**: Conditional setup with some emphasis
   - **LOW**: Mentioned but with limited detail/emphasis

4. **Acceptance Pattern Recognition**:
   - **BACKTEST**: Price back-tests level from above/below, rejects, returns
   - **RECLAIM**: Price recovers level after flushing below
   - **BOTH**: Requires both patterns in sequence

5. **Conversion Validation**:
   - Verify ES_TO_SPX_CONVERSION against previous day's close in both indices
   - Include validation in metadata section of output

---

### INSTRUCTIONS TO AI

Process the Mancini blueprint in these precise steps:

1. First pass: Identify all technical structures and market regime
   
2. Second pass: Extract and convert all price levels to SPX terms using the ES_TO_SPX_CONVERSION parameter
   
3. Third pass: Identify all trade setups with acceptance criteria
   
4. Fourth pass: Extract trade management protocols and execution windows
   
5. Fifth pass: Build scenarios and invalidation conditions
   
6. Final pass: Structure all data according to the JSON templates for system integration

---

### OUTPUT FORMAT

Provide the extracted data in two formats:

1. **SYSTEM DATA (FOR INTEGRATION)**:
```
{
  "TECHNICAL_DATA": {...},
  "TRADE_SETUPS": {...},
  "MARKET_ANALYSIS": {...}
}
```

2. **HUMAN-READABLE SUMMARY (FOR REVIEW)**:
```
MANCINI SPX BLUEPRINT: [DATE]

ES TO SPX CONVERSION: [CURRENT VALUE USED]

MARKET STRUCTURE:
[1-2 sentences on current regime and pattern]

KEY TECHNICAL LEVELS:
• Structure: [Critical technical pattern levels]
• Historical: [Prior day's high/low, significant pivots]
• Magnets: [Price clustering zones]
• Current Range: [Active trading range]

PRIORITIZED SETUPS:
1. [SETUP TYPE]: [Direction] [Conviction]
   LEVEL: [Primary level]
   ACCEPTANCE: [Required pattern]
   EXECUTION: Entry [X] → Targets [Y1, Y2, Y3] → Stop [Z]
   NOTES: [Context and reasoning]

2. [Continue format for additional setups]

EXECUTION GUIDELINES:
• Windows: [Optimal timing]
• Management: [Profit-taking protocol]
• Runners: [Trailing methodology]

INVALIDATION SIGNALS:
• [Conditions that would invalidate setups]
```

---

### FILTERING RULES
- Focus on actionable setups with clear levels
- Prioritize Failed Breakdowns (Mancini's core setup)
- Extract exact timestamps when provided
- Maintain Mancini's exact terminology for technical patterns
- Include all specific warnings and cautions

---

### DOWNSTREAM DATA USAGE
This data will feed directly into:
- The unified trade plan generator
- SPX/SPY options strategy selection
- Trade execution protocols
- Risk management systems

The structured JSON data must be exact for system integration to function properly.

---

### CHANGELOG
- v2.1 (2025-05-05): Added ES_TO_SPX_CONVERSION parameter to account for dynamic conversion ratio throughout quarter
- v2.0 (2025-05-01): Initial template design