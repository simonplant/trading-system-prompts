---
title: DP Trade Summary Generator  
description: Generate a human-readable summary of DP's trade ideas from structured JSON data  
tags: [premarket, analysis, dp]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.0  
category: premarket  
usage: Run after dp-trade-analyzer.md produces JSON output. Creates a readable summary of trade ideas and coaching insights. Consumes structured JSON data.
status: active  
requires: [dp-trade-analyzer.md]  
linked_outputs: []  
input_format: json  
output_format: markdown  
ai_enabled: true  
---

## DP TRADE SUMMARY GENERATOR — PROMPT

**Purpose:**  
Convert the structured JSON data from the DP Morning Call Analyzer into a human-readable summary for quick review and trade preparation.

---

### INPUT REQUIREMENTS

This tool requires valid JSON output from the dp-trade-analyzer.md prompt in the following format:

```json
{
  "TRADE_DATA": [...],
  "MARKET_BIAS": {...},
  "COACHING_INSIGHTS": {...}
}
```

If the JSON is invalid or missing, the tool will return an error message and instructions to re-run the analyzer.

---

### OUTPUT FORMAT

Generate a clear, concise summary in the following format:

```
# DP MORNING CALL SUMMARY — [DATE]

## MARKET BIAS: [BULLISH/BEARISH/NEUTRAL/CAUTIOUS]

[2-3 sentence overview of DP's market perspective]

## HIGH CONVICTION TRADE IDEAS

### [TICKER] — [DIRECTION] — [CONVICTION] — [DURATION]
- Entry: [level or condition]
- Targets: [T1, T2, T3]
- Stop: [stop level]
- Context: [brief rationale or catalyst]
- Timing: [specific execution window if mentioned]

[Repeat for each HIGH or BIG_IDEA trade]

## MEDIUM CONVICTION IDEAS

### [TICKER] — [DIRECTION] — [MEDIUM] — [DURATION]
- Entry: [level or condition]
- Targets: [T1, T2, T3]
- Stop: [stop level]
- Context: [brief rationale or catalyst]

[Repeat for each MEDIUM conviction trade]

## WATCHLIST

- [TICKER] [DIRECTION]: [brief context] [levels if available]
- [TICKER] [DIRECTION]: [brief context] [levels if available]

[List all LOW conviction trades with minimal details]

## KEY COACHING INSIGHTS

- [Risk management point]
- [Timing advice]
- [Market condition warning]
- [Other notable advice]

## NOTABLE QUOTES

> [Direct quote from DP with strong emphasis or emotion]
> [Another notable quote if available]

## CATALYST WATCH

- [Key economic data]
- [FOMC, CPI, etc.]
- [Sector catalysts]
- [Notable earnings]
```

---

### FORMATTING GUIDELINES

1. **High Conviction Trades**:
   - Include all BIG_IDEA and HIGH conviction trades
   - Provide full details with entry, targets, stops
   - Bold the ticker symbols

2. **Medium Conviction Trades**:
   - Include all MEDIUM conviction trades
   - Provide most details but less emphasis
   - Group similar trades if appropriate

3. **Watchlist**:
   - List LOW conviction ideas in a concise format
   - Emphasize any with specific catalysts
   - Format as a simple bullet list

4. **Coaching Insights**:
   - Prioritize actionable risk management advice
   - Highlight timing guidance for day structure
   - Include direct quotes for key warnings

5. **Overall Formatting**:
   - Use clear hierarchical headers
   - Bold key levels and signals
   - Maintain consistent structure throughout

---

### INSTRUCTIONS TO AI

1. Parse the input JSON data
2. Validate that all required sections exist
3. Sort trade ideas by conviction level
4. Format each trade according to guidelines
5. Extract and prioritize coaching insights
6. Generate a clean, readable summary using the exact format above
7. Ensure all numerical values (levels, targets, stops) are preserved exactly
8. Include the current date in the header

If the input JSON is missing or malformed, output:

```
ERROR: Invalid or missing JSON input.

Please run dp-trade-analyzer.md first and ensure it outputs valid JSON data in the format:
{
  "TRADE_DATA": [...],
  "MARKET_BIAS": {...},
  "COACHING_INSIGHTS": {...}
}

Then run this summary generator with the JSON output as input.
```

---

### EXAMPLE OUTPUT

```
# DP MORNING CALL SUMMARY — MAY 5, 2025

## MARKET BIAS: CAUTIOUSLY BULLISH

DP notes markets are extended after 9 consecutive green days but still sees upside potential in select names. Emphasizes being selective and taking profits quickly on intraday plays. Watching 5650 on SPX as key resistance.

## HIGH CONVICTION TRADE IDEAS

### **NVDA** — LONG — HIGH — SWING
- Entry: 950-955 zone
- Targets: 975, 1000, 1025
- Stop: Below 940
- Context: AI demand remains strong, pullbacks are buyable
- Timing: Buy on morning weakness if markets open red

### **META** — LONG — HIGH — SWING
- Entry: 580-585 zone
- Targets: 595, 605, 620
- Stop: Below 575
- Context: Strong earnings, highlighted as "cheap" multiple
- Timing: On pullback

## MEDIUM CONVICTION IDEAS

### **XLE** — SHORT — MEDIUM — CASHFLOW
- Entry: On test of 78.50
- Targets: 77.50, 76.80
- Stop: Above 79
- Context: Overbought on daily, fading recent strength

### **TSLA** — LONG — MEDIUM — SWING
- Entry: Above 187
- Targets: 195, 205
- Stop: Below 181
- Context: Basing pattern, looking for continuation

## WATCHLIST

- **CRWD** LONG: Watching for pull to 310 area, buyer there
- **AMZN** LONG: If market strength continues, target 190
- **XLF** SHORT: Potential fade at 42.50 for quick scalp
- **AAPL** LONG: Only on strong market, above 185

## KEY COACHING INSIGHTS

- Take half position size on all intraday trades after 9 green days
- Book profits quickly into strength today, market extended
- First hour likely to be choppy; better setups after 10:30am ET
- Watch VIX for sudden expansion above 16 as warning sign

## NOTABLE QUOTES

> "I'm not chasing anything today. Let things come to you, be patient and selective."
> "NVDA is the one name I'd buy all day on pullbacks. The AI story hasn't changed."

## CATALYST WATCH

- CPI data tomorrow morning - critical for market direction
- FOMC minutes Wednesday at 2pm ET
- Tech earnings continue this week (list provided separately)
- Watch semiconductors for sector leadership
```