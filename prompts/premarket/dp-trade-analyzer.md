---
title: DP Morning Call Analyzer  
description: Extract structured trade ideas, conviction signals, and coaching insights from DP's morning calls with enhanced validation and accuracy  
tags: [premarket, analysis, dp]  
author: Simon Plant  
last_updated: 2025-05-10  
version: 3.0  
category: premarket  
usage: Run after the Inner Circle morning call. Produces structured trade data and coaching insights for system integration. Now includes enhanced pattern recognition and validation.
status: active  
input_format: markdown  
output_format: json  
ai_enabled: true  
linked_outputs: [dp-trade-summary.md, unified-trade-plan-generator.md]  
schema_version: 2.0  
requires: [system-parameters.json, trade-data-schema.json, trading-behaviors-kb.md]
---

## DP MORNING CALL ANALYZER — PROMPT

**Purpose:**  
Extract structured trade data, conviction signals, and coaching insights from DP's morning call with enhanced accuracy, validation, and behavioral awareness. Focus on actionable trade ideas while filtering out noise like analyst upgrades and background commentary.

---

### EXTRACTION PRIORITIES

1. **TRADE IDEAS**  
   - Focus on clear directional calls with precise levels
   - Include directional biases without specific entries if actionable (tag as `trigger_type: loose-trigger`)
   - Exclude all analyst upgrades unless explicitly endorsed by DP
   - Only extract from the "second half" trade ideas section
   - Match levels to current market structure for validation

2. **CONVICTION SIGNALS**  
   - Emotional language, repetition, personal position ("I'm in this")
   - Specific price levels vs. vague commentary
   - Check for behavioral flags against `trading-behaviors-kb.md`
   - Verify against recent trade outcomes and patterns

3. **COACHING INSIGHTS**  
   - Risk management guidance
   - Market condition warnings
   - Timing advice ("take profits at open")
   - Cross-reference with behavioral patterns

---

### ENHANCED PATTERN RECOGNITION

This updated analyzer now uses advanced pattern recognition to:

1. **Extract Numerical Values**: Identify price levels with precision including:
   - Exact entry levels vs. ranges
   - Multiple target levels in sequence
   - Stop parameters with reasoning
   - Volatility-based adjustments

2. **Match Ticker Patterns**: Accurately identify tickers and symbols with format validation:
   - Standard equity tickers (AAPL, MSFT)
   - Index references (SPX, NDX)
   - Futures contracts (ES, NQ)
   - Option specifications

3. **Detect Conviction Signals**: Parse language patterns for:
   - Conviction level markers ("This is my favorite setup")
   - Time horizon indicators ("This is for a quick scalp")
   - Risk assessment indicators ("Risk is defined")
   - Position sizing clues ("This is a full size trade for me")

4. **Structure Recognition**: Identify technical patterns mentioned:
   - Support/resistance levels
   - Chart patterns (flags, pennants, etc.)
   - Moving average relationships
   - Volume significance

---

### DATA STRUCTURE — JSON SCHEMA

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
  }
}
```

---

### LOGIC RULES

#### Conviction

| Level     | Description |
|-----------|-------------|
| BIG_IDEA  | Strong emotion + multiple mentions + catalyst |
| HIGH      | Specific levels + clear language |
| MEDIUM    | Qualifiers or if/then language |
| LOW       | Vague, soft language |

#### Duration

| Type       | Description           |
|------------|-----------------------|
| CASHFLOW   | Intraday only         |
| SWING      | 1–5 day hold          |
| LONGTERM   | Position trade        |
| LOTTO      | Speculative short-term|

#### Position Size

| Confidence | CASHFLOW    | SWING        | LONGTERM     | LOTTO  |
|------------|-------------|--------------|--------------|--------|
| BIG_IDEA   | FULL_DOUBLE | FULL_DOUBLE  | FULL         | SMALL  |
| HIGH       | FULL        | FULL         | FULL         | SMALL  |
| MEDIUM     | HALF        | HALF         | —            | SMALL  |
| LOW        | QUARTER     | QUARTER      | —            | TINY   |

#### Trigger Type

- `exact`: Numerical level or range given  
- `loose-trigger`: Idea expressed with soft entry

---

### TRADE IDEA AUGMENTATION

The analyzer will automatically augment trade ideas with the following calculations:

1. **Risk/Reward Calculation**
   - Calculate ratio based on primary target vs stop distance
   - Include notes on calculation methodology
   - Verify mathematical accuracy of calculations
   - Handle asymmetric risk profiles appropriately

2. **Execution Priority**
   - Rank based on conviction, clarity, and catalyst presence
   - Include reasoning for the priority assignment
   - Consider market structure when assigning priority
   - Account for inner circle alignment

3. **Order Suggestion**
   - Recommend appropriate order type based on setup description
   - Include any needed price/trigger parameters
   - Add execution notes for ThinkorSwim platform
   - Verify price accuracy with current market data

4. **Timing Details**
   - Extract optimal entry window information if available
   - Estimate setup duration based on context
   - Add expiration guidance if applicable
   - Align with behavioral window preferences

5. **Behavioral Flag Detection**
   - Check for potential behavioral flags from trading-behaviors-kb.md
   - Identify historical patterns that may be repeating
   - Suggest mitigation approaches for flagged behaviors
   - Map to reset protocols when appropriate

---

### VALIDATION CHECKS

The analyzer now performs these additional validation checks:

1. **Level Consistency**: Verify that:
   - Entry < Target for LONG trades, Entry > Target for SHORT trades
   - Stops are appropriately placed (below entry for LONG, above for SHORT)
   - Multiple targets are in logical sequence
   - Levels align with known technical levels when possible

2. **Market Context Alignment**: Check that:
   - Trade direction aligns with stated market bias
   - Levels correspond to known support/resistance zones
   - Time horizon matches current market regime
   - Catalysts are relevant to the specific ticker

3. **Behavioral Pattern Check**: Scan for:
   - Setups that match previously flagged behavioral patterns
   - Tickers with historical attachment or overtrading flags
   - Sizing that might trigger overconfidence flags
   - Time-of-day patterns that have led to issues

4. **Data Integrity**: Ensure:
   - All required fields are present and properly formatted
   - Numerical values are within realistic ranges
   - Enumerations match allowed values
   - Contextual information is relevant and specific

---

### FINAL INSTRUCTION

Return one and only one JSON block in this structure:

```json
{
  "metadata": {
    "source": "dp",
    "timestamp": "2025-05-10T09:30:00Z",
    "version": "2.0"
  },
  "TRADE_DATA": [...],
  "MARKET_BIAS": {...},
  "COACHING_INSIGHTS": {...}
}
```

This JSON must be:
- Strictly schema-compliant
- Mathematically consistent 
- Contextually accurate
- Validated against behavioral patterns

No commentary, notes, or narrative.  
For human-readable format, run `dp-trade-summary.md` after validating this JSON.

---

### CHANGELOG
- v3.0 (2025-05-10): Added enhanced pattern recognition, validation checks, behavioral flag detection
- v2.4 (2025-05-07): Updated to reflect JSON-based data flow architecture
- v2.3 (2025-05-01): Added trade idea augmentation logic
- v2.2 (2025-04-15): Integrated with trading behaviors knowledge base
- v2.0 (2025-04-01): Initial implementation with basic extraction