---
title: DP Trade Analysis  
description: Extract, analyze, and stack-rank trade ideas from David Prince’s morning call  
tags: [premarket, analysis, plan]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.1  
category: premarket  
usage: Run every morning after the Inner Circle call to extract all trade ideas  
status: stable  
requires: []  
linked_outputs: [unified-trade-plan-generator.md]  
input_format: markdown  
output_format: markdown  
ai_enabled: true  
---

## DP TRADE ANALYSIS — PROMPT

**Purpose:**  
Extract ultra-concise, actionable insights and trade ideas from the transcript, combining key macro themes, DP’s core insights, and explicit trade setups sorted by confidence. Ignore speculation, background commentary, and all analyst upgrades unless DP explicitly calls them out as trade ideas.

---

### INPUTS
- Full or summarized DP morning call notes
- Macro premarket context (optional): ES/QQQ/SPY futures, earnings, etc.

---

### INSTRUCTIONS TO AI

1. **Set Title**: "Trading Plan for [Day], [Date]" — ensure the correct day and date.

2. **Market Overview**: 
   - 1–2 ultra-concise sentences summarizing market direction, key catalysts, and DP’s macro stance.
   - Include major index levels if relevant.

3. **Trade Ideas**: 
   - Extract every trade idea with actionable levels and structure.
   - Sort by confidence: Highest → Lowest.
   - Use the format:

```
1. TICKER: [Setup] > X, trim; < Y, buy (support level). [Confidence, Sentiment]
```

   - Avoid full sentences. Keep it ultra-concise.
   - Ensure each idea uses the IF > THEN format (no vague narratives).
   - Strictly ignore analyst upgrades unless DP explicitly endorses them as trades.

4. **DP’s Advice**:
   - 1 sentence summarizing his key market guidance or warning.
   - Include relevant index levels (e.g. “QQQ 523, 511 downside still in play”).

---

### OUTPUT FORMAT

```
Trading Plan for Monday, February 26, 2025

Market Overview:
Futures green; DJIA +275, Nasdaq +75. Key focus: NVDA earnings Wednesday. Financials leading; tech showing weakness.

Trade Ideas [Confidence, Sentiment]:
1. PLTR: Short pops or buy puts. > 109, short; < 85, buy (50D MA). [High, Bearish]
2. SNOW: Calls into earnings. Re-rating in play. > 161, breakout; < 150, buy calls. [High, Bullish]
3. AMZN: Buy 212-213 pullback, trim into 215+. > 215, trim; < 212, buy (100D MA). [Bullish, High]
4. BABA: Buy 129-131 pullback, trim into 135+. > 135, trim; < 131, buy (8D MA). [Bullish, Medium]
5. HOOD: Short if fails 50, buy near 47. > 50, fade; < 47, buy (50D MA). [Bearish, Medium]
6. APP: Buy weakness on $500M convert, watch 28 resistance. > 28, trim; < 25, buy on dip. [Bullish, Medium]
7. CELH: Buy 30 earnings gap support, watch 35 breakout. > 35, breakout; < 30, buy (gap support). [Bullish, Medium]
8. HIMS: Watch 45.16 (21D MA), potential buy post-earnings if reaction strong. > 48, breakout; < 45.16, buy (21D MA). [Neutral, Low]
9. TEM: Owns cheap, no strong call to action pre-earnings. No trade setup yet. [Neutral]

DP’s Advice:
Tech weak; PLTR 85 likely, QQQ downside 523, 511. SNOW earnings most actionable. NVDA key for market direction.
```
