---
title: Unified Trade Plan Generator  
description: Generate a structured daily trade plan combining DP’s trade ideas and Mancini’s SPX blueprint  
tags: [premarket, plan, execution]  
author: Simon Plant  
last_updated: 2025-05-03  
version: 1.2  
category: premarket  
usage: Run after completing both dp-trade-analysis.md and mancini-trade-analysis.md  
status: active  
requires: [dp-trade-analysis.md, mancini-trade-analysis.md]  
linked_outputs: [copilot.md, generate-daily-trade-log.md]  
input_format: markdown  
output_format: markdown  
ai_enabled: true  
---

## UNIFIED TRADE PLAN GENERATOR — PROMPT

**Purpose:**  
Generate a combined, structured trade plan that integrates David Prince’s (DP) Inner Circle trade ideas and Adam Mancini’s SPX blueprint. The plan must align with Simon’s Trading System Charter, focusing on bias-driven execution, conviction-based sizing, and blindspot avoidance.

---

### INPUTS (REQUIRED)
- DP / Inner Circle trade ideas (verbatim or summarized)
- Mancini’s SPX Blueprint (top 2–3 actionable setups only)
- Current ES Futures level
- Premarket QQQ and SPY levels
- VIX reading (if available)
- Relevant macro news: NFP, CPI, FOMC, major earnings, or geopolitical risks

---

### INSTRUCTIONS TO AI

1. **MARKET BIAS (2–3 sentences):**  
   Combine:
   - DP’s sentiment  
   - Mancini’s structure  
   - Macro / futures / index positioning  
   State:
   - Overall bias: Bullish / Bearish / Neutral  
   - Preferred posture: Aggressive / Defensive / Reactive  
   - Any caution zones

2. **5-MINUTE PRIORITY FOCUS (bullets):**  
   - Top trade setup today  
   - Critical SPX level  
   - Macro event / economic data  
   - Most probable first trade of the session

3. **TRADE IDEAS — ORGANIZE INTO 3 CATEGORIES:**  
   - **BIG IDEAS** → High conviction, directional, structured setups  
   - **CASHFLOW TRADES** → Intraday R/R setups with clean triggers  
   - **LOTTO WATCH** → 0DTE only, must have structure + tight stop

4. **TRADE IDEA FORMAT:**  
   Format each like: