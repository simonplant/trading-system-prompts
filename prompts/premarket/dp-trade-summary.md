---
title: DP Trade Summary Generator  
description: Generate a human-readable summary of DP's trade ideas from structured JSON data  
tags: [premarket, analysis, dp]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.1  
category: premarket  
usage: Run after dp-trade-analyzer.md produces JSON output. Creates a readable summary of trade ideas and coaching insights. Consumes structured JSON data.  
status: active  
requires: [dp-trade-analyzer.md]  
linked_outputs: [unified-trade-plan-generator.md]  
input_format: json  
output_format: markdown  
ai_enabled: true  
---

## DP TRADE SUMMARY GENERATOR — PROMPT

**Purpose:**  
Convert the structured JSON data from the DP Morning Call Analyzer into a human-readable summary for quick review and trade preparation.

---

### INPUT STRUCTURE

Expected input from the analyzer:

```json
{
  "TRADE_DATA": [...],
  "MARKET_BIAS": {...},
  "COACHING_INSIGHTS": {...}
}
```

Each entry in `TRADE_DATA` must include:

```json
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
  "timing": "optional string",
  "context": "string",
  "earnings": {
    "upcoming": true | false,
    "date": "optional string",
    "strategy": "pre | post"
  }
}
```

---

### OUTPUT FORMAT

Use this exact structure:

```
# DP MORNING CALL SUMMARY — [DATE]

## MARKET BIAS: [OVERALL SENTIMENT]

[1–3 sentence summary of DP's broad view.]

## HIGH CONVICTION TRADES

### [TICKER] — [DIRECTION] — [CONFIDENCE] — [DURATION]
- Entry: [entry zone]
- Targets: [T1, T2, T3]
- Stop: [stop level]
- Size: [position size]
- Context: [why DP likes it]
- Timing: [if specified]

## MEDIUM CONVICTION TRADES

[Same format as above, grouped below HIGH]

## WATCHLIST (LOW CONVICTION)

- [TICKER] [DIRECTION]: [brief context or levels]

## COACHING INSIGHTS

- [risk_management, timing, and other tactical notes]

## DIRECT QUOTES

> "[Quote from DP if available]"

## CATALYSTS

- [Events like CPI, FOMC, earnings to watch]
```

---

### PARSING LOGIC

1. Validate the input JSON.
2. Categorize trades by `confidence`: BIG_IDEA → HIGH → MEDIUM → LOW.
3. Use only fields present — gracefully handle missing `timing`, `earnings`, etc.
4. Summarize all coaching and bias data clearly.
5. Output only the formatted summary in markdown.

---

### ERROR HANDLING

If input is invalid:

```
ERROR: Invalid or missing JSON input.

Please run dp-trade-analyzer.md first and supply valid JSON:
{
  "TRADE_DATA": [...],
  "MARKET_BIAS": {...},
  "COACHING_INSIGHTS": {...}
}
