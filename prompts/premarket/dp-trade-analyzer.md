---
title: DP Morning Call Analyzer  
description: Extract structured trade ideas, conviction signals, and coaching insights from DP's morning calls  
tags: [premarket, analysis, dp]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 2.0  
category: premarket  
usage: Run after the Inner Circle morning call. Produces structured trade data and coaching insights for system integration. Consumes call transcript or live notes.
status: active  
requires: []  
linked_outputs: [unified-trade-plan-generator.md]  
input_format: markdown  
output_format: markdown  
ai_enabled: true  
---

## DP MORNING CALL ANALYZER — PROMPT

**Purpose:**  
Extract structured trade data, conviction signals, and coaching insights from DP's morning call, focusing on actionable trade ideas while filtering out noise like analyst upgrades and background commentary.

---

### EXTRACTION PRIORITIES

1. **TRADE IDEAS**
   - Focus on clear directional calls with levels
   - Filter out all analyst upgrades/downgrades unless DP explicitly endorses them
   - Only include the second half "trade ideas" section, not the market overview

2. **CONVICTION SIGNALS**
   - Note emotional language, repetition, and emphasis patterns
   - Track specific price levels vs. vague commentary
   - Identify DP's personal positioning ("I'm in this" vs "watching")

3. **COACHING INSIGHTS**
   - Capture specific risk management guidance
   - Note market condition warnings (e.g., "after 9 green days...")
   - Extract timing advice (e.g., "take profits at open")

---

### DATA STRUCTURE SPECIFICATION

For each extraction category, maintain this exact structure for downstream system integration:

**TRADE_DATA**: [Array of structured trade objects]
```json
{
  "ticker": "TICKER",
  "direction": "LONG|SHORT",
  "conviction": {
    "level": "BIG_IDEA|HIGH|MEDIUM|LOW",
    "signals": ["emotional language", "repetition", "personal position", etc.] 
  },
  "duration": "CASHFLOW|SWING|LONGTERM|LOTTO",
  "sizing": "FULL_DOUBLE|FULL|HALF|QUARTER|SMALL|TINY",
  "levels": {
    "entry": ["specific price or condition"],
    "targets": ["T1", "T2", "T3"],
    "stops": ["specific invalidation level"]
  },
  "timing": "AT_OPEN|ON_PULLBACK|POST_EVENT|etc.",
  "context": "Direct quote or specific commentary about this idea",
  "earnings": {
    "upcoming": true|false,
    "date": "date if mentioned",
    "strategy": "pre or post earnings approach"
  }
}
```

**MARKET_BIAS**: 
```json
{
  "overall": "BULLISH|BEARISH|NEUTRAL|CAUTIOUS",
  "key_levels": {
    "SPX": ["levels mentioned"],
    "QQQ": ["levels mentioned"],
    "SPY": ["levels mentioned"],
    "VIX": ["levels mentioned"]
  },
  "catalysts": ["FOMC", "CPI", "EARNINGS", etc.],
  "focus_sectors": ["TECH", "FINANCIALS", etc.]
}
```

**COACHING_INSIGHTS**:
```json
{
  "risk_management": ["specific guidance"],
  "timing_advice": ["specific timing elements"],
  "market_condition_warnings": ["specific warnings"],
  "direct_quotes": ["key DP quotes worth preserving"]
}
```

---

### EXTRACTION RULES

1. **Conviction Assessment Logic**:
   - **BIG_IDEA**: Emotional language + Multiple mentions + Clear catalyst. Example signals: "love this," "home run," "exciting," mentioned 3+ times.
   - **HIGH**: Specific levels + Strong conviction without emotion. Example signals: Clear price targets, specific entry/exit, firm stance.
   - **MEDIUM**: Some qualifiers or conditions. Example signals: "if/then" language, some hesitation, moderate specificity.
   - **LOW**: Highly conditional or speculative. Example signals: Very tentative language, many conditions, minimal details.

2. **Duration Classification Logic**:
   - **CASHFLOW**: Intraday focus, immediate action, today's trade. Look for: "today", "this morning", technical levels.
   - **SWING**: Multi-day hold, sector rotation. Look for: "next few days", "this week", fundamental catalysts.
   - **LONGTERM**: Cost-averaging, core position language. Look for: "building a position", "long-term story", fundamental thesis.
   - **LOTTO**: High-risk, short-term options plays. Look for: "lottery ticket", "0DTE", "short-dated options".

3. **Sizing Determination Logic**:
   | Conviction | Cashflow    | Swing       | Long-term   | Lotto     |
   |------------|-------------|-------------|-------------|-----------|
   | BIG_IDEA   | FULL_DOUBLE | FULL_DOUBLE | FULL        | SMALL     |
   | HIGH       | FULL        | FULL        | FULL        | SMALL     |
   | MEDIUM     | HALF        | HALF        | None        | SMALL     |
   | LOW        | QUARTER     | QUARTER     | None        | TINY      |

---

### INSTRUCTIONS TO AI

Process the morning call transcript in these precise steps:

1. First pass: Identify all explicit trade ideas, filtering out analyst mentions unless explicitly endorsed
   
2. Second pass: For each trade idea:
   - Assess conviction level based on language patterns
   - Determine trade duration based on context clues
   - Map to appropriate position sizing
   - Extract specific levels (entry, targets, stops)
   - Note any earnings-related context
   
3. Third pass: Extract overall market bias, key levels, and catalysts
   
4. Fourth pass: Identify coaching insights, risk warnings, and timing advice
   
5. Final pass: Structure all data according to the JSON templates for system integration

---

### OUTPUT FORMAT

Provide the extracted data in two formats:

1. **SYSTEM DATA (FOR INTEGRATION)**:
   ```json
   {
     "TRADE_DATA": [...],
     "MARKET_BIAS": {...},
     "COACHING_INSIGHTS": {...}
   }
   ```

2. **HUMAN-READABLE SUMMARY (FOR REVIEW)**:
   ```
   DP TRADE IDEAS: [DATE]
   
   MARKET CONTEXT:
   [1-2 sentences on overall market stance]
   
   TOP TRADE IDEAS:
   1. TICKER: [Direction] [Conviction/Duration/Size]
      SETUP: [Entry conditions]
      LEVELS: Entry > X, Target Y, Stop Z
      NOTES: [Specific context, earnings, timing]
   
   2. [Continue format for additional ideas]
   
   KEY ADVICE:
   • [Bullet points of DP's coaching insights]
   
   EARNINGS FOCUS:
   • [List any earnings plays specifically mentioned]
   ```

---

### FILTERING RULES
- Exclude all analyst upgrades/downgrades unless DP explicitly says "I agree" or endorses them
- Focus only on tickers DP personally comments on with directional bias
- Ignore general market commentary without specific trade ideas
- Prioritize ideas with clear levels over vague mentions
- Only include earnings plays with specific pre/post earnings strategies

---

### DOWNSTREAM DATA USAGE
This data will feed directly into:
- The unified trade plan generator
- Position sizing automation
- Risk management alerts
- Trading journal systems

The structured JSON data must be exact for system integration to function properly.
