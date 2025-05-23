---
title: Get Premarket Levels  
description: Extract premarket QQQ, SPY, VIX, and ES levels for trade prep and sentiment  
tags: [premarket, plan, macro]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.0  
category: premarket  
usage: Run premarket between 6:00–6:20 AM PT. Produces SPY, QQQ, ES, and VIX levels to frame the session. Consumes futures data and macro headlines.  
status: active  
requires: []  
linked_outputs: [unified-trade-plan-generator.md]  
input_format: prompt  
output_format: table  
ai_enabled: true  
---

## GET PREMARKET LEVELS — PROMPT

**Purpose:**  
Extract the most relevant daily price levels and macro context for SPX, QQQ, and ES Futures to drive your Unified Trade Plan and platform preparation.

---

### INPUTS  
Provide the following:  
- Current ES futures level  
- QQQ / SPY premarket prices  
- VIX reading  
- Key moving averages (8d, 21d, 50d, 100d, 200d) for SPX and QQQ  
- Previous day’s high/low/close for SPX and QQQ  
- Overnight high/low (if available)  
- Any macro headlines: CPI, FOMC, earnings, geopolitical risk  

---

### INSTRUCTIONS TO AI

1. SPX LEVEL SUMMARY  
Return a clean list of support/resistance levels and moving averages. Include:  
- Yesterday’s high, low, and close  
- Overnight high/low (if provided)  
- Current ES → SPX equivalent (ES - 30 rule)  
- Support + resistance zones likely to matter  
- Daily MAs currently “in-play”  

2. QQQ LEVEL SUMMARY  
Same as SPX above. Emphasize levels that align with current price.  

3. MARKET CONTEXT  
- Note VIX value and whether it’s elevated/collapsing/stable  
- Summarize any macro events that could move markets today  
- Give market posture (bullish, bearish, chop) based on price action and structure  

---

### OUTPUT FORMAT

PREMARKET LEVELS — [DAY], [DATE]

SPX  
- Yday High/Low/Close: [###] / [###] / [###]  
- Overnight H/L: [###] / [###]  
- ES ref: [###] → SPX = [###]  
- Support: [###], [###]  
- Resistance: [###], [###]  
- MAs in play: 8d = [###], 21d = [###], etc.

QQQ  
- Yday High/Low/Close: [###] / [###] / [###]  
- Overnight H/L: [###] / [###]  
- Support: [###], [###]  
- Resistance: [###], [###]  
- MAs in play: 8d = [###], 21d = [###], etc.

MACRO CONTEXT  
- VIX: [###]  
- Events: [###]  
- Posture: [bullish / bearish / rangebound]