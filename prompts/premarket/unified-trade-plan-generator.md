---
title: Unified Trade Plan Generator
description: Generate an actionable daily trading plan integrating DP and Mancini insights
tags: [premarket, plan, execution]
author: Simon Plant
last_updated: 2025-05-05
version: 2.2
category: premarket
usage: Run after analyzing both DP and Mancini sources. Produces a comprehensive trade plan with execution rules. Consumes structured trade data, technical levels, and market bias.
status: active
requires: [dp-trade-analyzer.md, mancini-trade-analyzer.md, system-parameters.md]
linked_outputs: [copilot.md, generate-daily-trade-log.md]
input_format: json
output_format: markdown
ai_enabled: true
---

## UNIFIED TRADE PLAN GENERATOR — PROMPT

**Purpose:**
Generate a comprehensive, execution-ready trade plan by integrating structured data from DP's morning call analysis and Mancini's SPX blueprint. Prioritize trade ideas based on conviction, technical alignment, and risk management parameters.

---

### SYSTEM PARAMETERS

This generator imports parameters from the central system-parameters.md file.
Key parameters used:

* ES_TO_SPX_CONVERSION: Value used to convert ES futures levels to SPX
* SPX_TO_SPY_DIVISOR: Value used for SPX to SPY calculations
* CONFIDENCE_THRESHOLD: Minimum confidence required for trade inclusion
* MAX_POSITION_SIZE: Maximum position size as percentage of portfolio
* DAILY_RISK_LIMIT: Maximum daily risk allowed

---

### DATA VALIDATION

Before processing, validate the incoming JSON data:

```javascript
// Check for minimum required data
if (!input.DP_DATA || !input.DP_DATA.TRADE_DATA || !Array.isArray(input.DP_DATA.TRADE_DATA) || 
    !input.MANCINI_DATA || !input.MANCINI_DATA.TECHNICAL_DATA || !input.MANCINI_DATA.TRADE_SETUPS) {
    
    return {
        error: "ERROR: Missing required upstream JSON. Check DP and Mancini analyzers.",
        details: "The unified trade plan generator requires valid TRADE_DATA from DP and TECHNICAL_DATA/TRADE_SETUPS from Mancini."
    };
}
```

---

### DATA INPUTS

1. **DP STRUCTURED DATA**

   ```json
   {
     "DP_DATA": {
       "TRADE_DATA": [...],
       "MARKET_BIAS": {...},
       "COACHING_INSIGHTS": {...}
     }
   }
   ```

2. **MANCINI TECHNICAL DATA**

   ```json
   {
     "MANCINI_DATA": {
       "TECHNICAL_DATA": {...},
       "TRADE_SETUPS": {...},
       "MARKET_ANALYSIS": {...}
     }
   }
   ```

3. **MARKET CONTEXT**

   ```json
   {
     "MARKET_CONTEXT": {
       "current_levels": {
         "ES": 0.0,
         "SPX": 0.0,
         "QQQ": 0.0,
         "SPY": 0.0,
         "VIX": 0.0
       },
       "economic_events": [...],
       "earnings_reports": [...]
     }
   }
   ```

---

### INTEGRATION LOGIC

Follow this precise decision tree to determine trade prioritization:

1. **PRIORITY TIER 1: Technical + Conviction Alignment**

   * DP BIG_IDEA/HIGH trades that align with Mancini key levels
   * Must have precise entry, target, and stop levels
   * Technical structure must support directional bias

2. **PRIORITY TIER 2: Strong Single-Source Setups**

   * DP BIG_IDEA/HIGH trades without clear technical alignment
   * Mancini high-confidence setups without corresponding DP ideas
   * Must have clear trigger conditions and risk parameters

3. **PRIORITY TIER 3: Medium-Conviction Opportunities**

   * DP MEDIUM conviction trades with some technical support
   * Secondary Mancini setups
   * Situational opportunities (earnings, event-driven)

4. **PRIORITY TIER 4: Watchlist Only**

   * DP LOW conviction ideas
   * Unclear technical structure
   * Setups requiring multiple conditions
   * Ideas without clear risk parameters

---

### PLAN GENERATION RULES

1. **Market Bias Determination:**

   * If DP and Mancini align on direction: Strong bias
   * If mixed signals: Cautious bias toward higher-conviction source
   * If contradictory: Neutral bias with conditional scenarios

2. **Trade Categorization:**

   * **Core Positions**: BIG_IDEA + LONGTERM + technical alignment
   * **Directional Trades**: HIGH/MEDIUM + SWING + clear structure
   * **Intraday Setups**: HIGH/MEDIUM + CASHFLOW + specific triggers
   * **Spec Plays**: Any conviction + LOTTO + tight risk control

3. **Risk Management Rules:**

   * Never exceed 2 tier-1 positions simultaneously
   * Size all positions according to conviction matrix
   * Reduce all sizing by 25% during high-volatility or event-driven sessions
   * Combine similar directional exposures when calculating total risk

4. **Execution Timing:**

   * Respect Mancini's execution windows (7:30–11:00, after 3:00)
   * Prioritize DP's specific timing instructions (e.g., "at open")
   * Avoid new positions during 11:00–2:00 chop window
   * Honor event timing (pre/post FOMC, earnings, economic data)

---

### LEVEL INTEGRATION

1. **Technical Level Alignment**

   * Harmonize levels across sources using system ES_TO_SPX_CONVERSION parameter
   * Convert all ES futures levels to SPX equivalents
   * Convert SPX levels to SPY using system SPX_TO_SPY_DIVISOR parameter when needed
   * Ensure consistency in all numerical values

2. **Level Prioritization**

   * Consensus levels (mentioned by both DP and Mancini): Highest priority
   * Structure levels (identified by Mancini): Secondary priority
   * Indicator levels (from DP): Tertiary priority

3. **Level Context**

   * Preserve original context from source data
   * Add cross-reference when level appears in multiple sources
   * Include confidence rating based on source agreement

---

### OUTPUT STRUCTURE

Generate the unified plan in this exact format:

```
UNIFIED TRADE PLAN — [DAY], [DATE]

MARKET BIAS: [BULLISH/BEARISH/NEUTRAL/CAUTIOUS]
[2-3 sentences integrating DP's market view and Mancini's technical structure]

5-MINUTE PRIORITY FOCUS:
• Critical Level: [Key price point with immediate significance]
• First Action: [Most time-sensitive trade execution]
• Event Focus: [Primary macro/catalyst to monitor]
• Risk Alert: [Key warning or invalidation condition]

TRADE EXECUTION PLAN:

CORE POSITIONS:
1. [TICKER] [DIRECTION] [CONVICTION/DURATION/SIZE]
   SETUP: [Entry conditions]
   TRIGGER: [Precise execution signal]
   LEVELS: Entry [X] → Targets [Y1, Y2, Y3] → Stop [Z]
   NOTES: [Integration context, DP/Mancini alignment]

DIRECTIONAL TRADES:
1. [TICKER] [DIRECTION] [CONVICTION/DURATION/SIZE]
   SETUP: [Entry conditions]
   TRIGGER: [Precise execution signal]
   LEVELS: Entry [X] → Targets [Y1, Y2, Y3] → Stop [Z]
   NOTES: [Integration context, DP/Mancini alignment]

INTRADAY SETUPS:
1. [TICKER] [DIRECTION] [CONVICTION/DURATION/SIZE]
   SETUP: [Entry conditions]
   TRIGGER: [Precise execution signal]
   LEVELS: Entry [X] → Targets [Y1, Y2, Y3] → Stop [Z]
   TIMING: [Specific execution window]
   NOTES: [Integration context, DP/Mancini alignment]

SPEC PLAYS:
1. [TICKER] [DIRECTION] [CONVICTION/DURATION/SIZE]
   SETUP: [Entry conditions]
   TRIGGER: [Precise execution signal]
   LEVELS: Entry [X] → Targets [Y1, Y2, Y3] → Stop [Z]
   NOTES: [Risk warning, max allocation]

RISK MANAGEMENT PROTOCOL:
• [Position sizing rules for the day]
• [Sector exposure limitations]
• [Specific warnings from DP or Mancini]
• [Current portfolio heat constraints]

KEY EVENTS:
• [Time]: [Event] – [Trading implications]
• Earnings After Close: [Tickers]
• Tomorrow Pre-Market: [Tickers]

TRADE MANAGEMENT RULES:
• [DP's specific exit guidance]
• [Mancini's level-to-level management protocol]
• [Runner management instructions]
• [Profit-taking parameters]
```

---

### ERROR HANDLING

If the script encounters errors, output a specific error message:

```
ERROR GENERATING UNIFIED TRADE PLAN

Missing or invalid input data:
- [Specific error message]

Required JSON structure:
{
  "DP_DATA": {
    "TRADE_DATA": [...],
    "MARKET_BIAS": {...},
    "COACHING_INSIGHTS": {...}
  },
  "MANCINI_DATA": {
    "TECHNICAL_DATA": {...},
    "TRADE_SETUPS": {...},
    "MARKET_ANALYSIS": {...}
  }
}

Please re-run the DP and Mancini analyzers with the corrected JSON output format.
```

---

### EXAMPLE TRADE INTEGRATION

To illustrate proper integration, here's an example:

**DP Data:**

```json
{
  "ticker": "META",
  "direction": "LONG",
  "conviction": {"level": "HIGH", "signals": ["specific levels", "fundamental support"]},
  "duration": "SWING",
  "sizing": "FULL",
  "levels": {"entry": ["580-585"], "targets": ["595", "605", "620"], "stops": ["below 575"]},
  "timing": "ON_PULLBACK",
  "context": "Strong earnings, DP highlights as 'cheap'",
  "earnings": {"upcoming": false}
}
```

**Mancini Data:**

* No specific META mention
* General market structure supports sector
* Key SPX level at 5642 must hold for bullish trades

**Integrated Output:**

```
DIRECTIONAL TRADES:
1. META LONG [HIGH/SWING/FULL]
   SETUP: Buy pullback to 580 (convergence of 50-day/200-day MAs)
   TRIGGER: Price reclaims 585 after testing 580
   LEVELS: Entry 585 → Targets 595, 605, 620 → Stop 575
   NOTES: DP high conviction call, conditional on SPX holding 5642 support
```

---

### CHANGELOG

* v2.2 (2025-05-05): Added JSON validation check and error handling
* v2.1 (2025-05-05): Added support for system parameters reference
* v2.0 (2025-05-01): Initial template design
