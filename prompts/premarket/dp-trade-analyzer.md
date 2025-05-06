---
title: DP Morning Call Analyzer  
description: Extract structured trade ideas, conviction signals, and coaching insights from DP's morning calls  
tags: [premarket, analysis, dp]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 2.3  
category: premarket  
usage: Run after the Inner Circle morning call. Produces structured trade data and coaching insights for system integration.  
status: active  
input_format: markdown  
output_format: json  
ai_enabled: true  
linked_outputs: [dp-trade-summary.md, unified-trade-plan-generator.md]  
schema_version: 1.0  
---

## DP MORNING CALL ANALYZER — PROMPT

**Purpose:**  
Extract structured trade data, conviction signals, and coaching insights from DP's morning call, focusing on actionable trade ideas while filtering out noise like analyst upgrades and background commentary.

---

### EXTRACTION PRIORITIES

1. **TRADE IDEAS**  
   - Focus on clear directional calls with levels  
   - Include directional biases without specific entries if actionable (tag as `trigger_type: loose-trigger`)  
   - Exclude all analyst upgrades unless explicitly endorsed by DP  
   - Only extract from the "second half" trade ideas section  

2. **CONVICTION SIGNALS**  
   - Emotional language, repetition, personal position (“I’m in this”)  
   - Specific price levels vs. vague commentary  

3. **COACHING INSIGHTS**  
   - Risk management guidance  
   - Market condition warnings  
   - Timing advice (“take profits at open”)  

---

### DATA STRUCTURE — JSON SCHEMA

#### TRADE_DATA (array)

\`\`\`json
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
  }
}
\`\`\`

#### MARKET_BIAS (object)

\`\`\`json
{
  "overall": "BULLISH | BEARISH | NEUTRAL | CAUTIOUS",
  "key_levels": {
    "SPX": [number],
    "QQQ": [number],
    "SPY": [number],
    "VIX": [number]
  },
  "catalysts": [string],
  "focus_sectors": [string]
}
\`\`\`

#### COACHING_INSIGHTS (object)

\`\`\`json
{
  "risk_management": [string],
  "timing_advice": [string],
  "market_condition_warnings": [string],
  "direct_quotes": [string]
}
\`\`\`

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

### FINAL INSTRUCTION

Return one and only one JSON block in this structure:

\`\`\`json
{
  "TRADE_DATA": [...],
  "MARKET_BIAS": {...},
  "COACHING_INSIGHTS": {...}
}
\`\`\`

No commentary, notes, or narrative.  
For human-readable format, run `dp-trade-summary.md` after validating this JSON.