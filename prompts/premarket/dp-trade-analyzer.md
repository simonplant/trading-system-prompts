---
title: DP Morning Call Analyzer  
description: Extract structured trade ideas, conviction signals, and coaching insights from DP's morning calls  
tags: [premarket, analysis, dp]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 2.2  
category: premarket  
usage: Run after the Inner Circle morning call. Produces structured trade data and coaching insights for system integration. Consumes call transcript or live notes.
status: active  
requires: []  
linked_outputs: [dp-trade-summary.md, unified-trade-plan-generator.md]  
input_format: markdown  
output_format: json  
ai_enabled: true  
---

## DP MORNING CALL ANALYZER — PROMPT

**Purpose:**  
Extract structured trade data, conviction signals, and coaching insights from DP's morning call, focusing on actionable trade ideas while filtering out noise like analyst upgrades and background commentary.

---

### EXTRACTION PRIORITIES

1. TRADE IDEAS  
   - Focus on clear directional calls with levels  
   - Also include directionally biased ideas without specific entry if intent is actionable — tag as `trigger_type: loose-trigger`  
   - Filter out all analyst upgrades/downgrades unless DP explicitly endorses them  
   - Only include the second half "trade ideas" section, not the market overview  

2. CONVICTION SIGNALS  
   - Note emotional language, repetition, and emphasis patterns  
   - Track specific price levels vs. vague commentary  
   - Identify DP's personal positioning ("I'm in this" vs "watching")  

3. COACHING INSIGHTS  
   - Capture specific risk management guidance  
   - Note market condition warnings (e.g., "after 9 green days...")  
   - Extract timing advice (e.g., "take profits at open")  

---

### DATA STRUCTURE SPECIFICATION

For each extraction category, maintain this exact structure for downstream system integration:

TRADE_DATA: [Array of structured trade objects]  
Fields:
- ticker: TICKER  
- direction: LONG | SHORT  
- conviction:  
  - level: BIG_IDEA | HIGH | MEDIUM | LOW  
  - signals: [emotional language, repetition, personal position, etc.]  
- duration: CASHFLOW | SWING | LONGTERM | LOTTO  
- sizing: FULL_DOUBLE | FULL | HALF | QUARTER | SMALL | TINY  
- trigger_type: exact | loose-trigger  
- levels:  
  - entry: [price or condition]  
  - targets: [T1, T2, T3]  
  - stops: [stop level]  
- timing: AT_OPEN | ON_PULLBACK | POST_EVENT | etc.  
- context: direct quote or rationale  
- earnings:  
  - upcoming: true | false  
  - date: optional string  
  - strategy: pre | post earnings  

MARKET_BIAS:  
Fields:
- overall: BULLISH | BEARISH | NEUTRAL | CAUTIOUS  
- key_levels:  
  - SPX: [...]  
  - QQQ: [...]  
  - SPY: [...]  
  - VIX: [...]  
- catalysts: [FOMC, CPI, EARNINGS, etc.]  
- focus_sectors: [TECH, FINANCIALS, etc.]  

COACHING_INSIGHTS:  
Fields:
- risk_management: [list]  
- timing_advice: [list]  
- market_condition_warnings: [list]  
- direct_quotes: [list]  

---

### EXTRACTION RULES

1. Conviction Assessment Logic:  
   - BIG_IDEA: Emotional language + Multiple mentions + Clear catalyst  
   - HIGH: Specific levels + Strong conviction  
   - MEDIUM: Some qualifiers or if/then structure  
   - LOW: Tentative or vague  

2. Duration Classification Logic:  
   - CASHFLOW: Intraday/Today  
   - SWING: 1–5 day hold  
   - LONGTERM: Position trade or macro thesis  
   - LOTTO: Short-term, high-risk options  

3. Sizing Determination Logic:  
   | Conviction | Cashflow    | Swing       | Long-term   | Lotto     |  
   |------------|-------------|-------------|-------------|-----------|  
   | BIG_IDEA   | FULL_DOUBLE | FULL_DOUBLE | FULL        | SMALL     |  
   | HIGH       | FULL        | FULL        | FULL        | SMALL     |  
   | MEDIUM     | HALF        | HALF        | None        | SMALL     |  
   | LOW        | QUARTER     | QUARTER     | None        | TINY      |  

4. Trigger Type Classification:  
   - exact: Specific price, range, or MA cited  
   - loose-trigger: Directional idea without hard level  
     Examples:  
     - "I'd buy that on a dip"  
     - "Looks good post earnings"  
     - "Buyer if this fades"  

---

### INSTRUCTIONS TO AI

Step 1: Identify trade ideas with LONG or SHORT bias  
Step 2: Classify conviction, duration, sizing  
Step 3: Tag trigger_type as `exact` or `loose-trigger`  
Step 4: Parse key levels and DP language cues  
Step 5: Capture market bias and coaching separately  
Step 6: Format everything according to JSON spec  

---

### FINAL OUTPUT — SYSTEM JSON

Please now output ONLY the following valid JSON object:
```json
{
  "TRADE_DATA": [...],
  "MARKET_BIAS": {...},
  "COACHING_INSIGHTS": {...}
}
```

Do not output any summaries, notes, or comments outside this JSON block.

To generate a human-readable version of the trade ideas, run `dp-trade-summary.md` separately after confirming JSON output integrity.