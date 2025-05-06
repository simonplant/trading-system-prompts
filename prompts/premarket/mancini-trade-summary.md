---
title: Mancini Blueprint Summary Generator  
description: Generate a human-readable summary of Mancini's technical analysis from structured JSON data  
tags: [premarket, analysis, technical]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.0  
category: premarket  
usage: Run after mancini-trade-analyzer.md produces JSON output. Creates a concise technical summary with key levels and setups. Consumes structured JSON data.
status: active  
requires: [mancini-trade-analyzer.md]  
linked_outputs: []  
input_format: json  
output_format: markdown  
ai_enabled: true  
---

## MANCINI BLUEPRINT SUMMARY GENERATOR — PROMPT

**Purpose:**  
Convert the structured JSON data from the Mancini Blueprint Analyzer into a concise, actionable technical summary for quick reference and trade execution.

---

### INPUT REQUIREMENTS

This tool requires valid JSON output from the mancini-trade-analyzer.md prompt in the following format:

```json
{
  "TECHNICAL_DATA": {...},
  "TRADE_SETUPS": {...},
  "MARKET_ANALYSIS": {...}
}
```

If the JSON is invalid or missing, the tool will return an error message and instructions to re-run the analyzer.

---

### OUTPUT FORMAT

Generate a clear, technical summary in the following format:

```
# MANCINI SPX BLUEPRINT — [DATE]

ES TO SPX CONVERSION: [CURRENT VALUE USED]

## MARKET STRUCTURE
- Regime: [BUY_DIPS | SELL_RIPS | RANGE_BOUND | TRENDING]
- Pattern: [Current technical pattern]
- Streak: [X consecutive days up/down]
- Control: Bulls above [level], Bears below [level]

## KEY TECHNICAL LEVELS

### CRITICAL STRUCTURE
- [SPX Level]: [Context/Significance]
- [SPX Level]: [Context/Significance]
- [SPX Level]: [Context/Significance]

### SUPPORT ZONES
- Macro: [SPX Level(s)]
- Major: [SPX Level(s)]
- Minor: [SPX Level(s)]

### RESISTANCE ZONES
- Macro: [SPX Level(s)]
- Major: [SPX Level(s)]
- Minor: [SPX Level(s)]

### PRICE MAGNETS
- [SPX Level]: [Why price clusters here]
- [SPX Level]: [Why price clusters here]

## PRIORITIZED SETUPS

### SETUP 1: [FAILED_BREAKDOWN | FAILED_BREAKOUT | RANGE_FADE | OTHER]
- Direction: [LONG | SHORT]
- Conviction: [HIGH | MEDIUM | LOW]
- Primary Level: [SPX level]
- Acceptance Pattern:
  * [Description of required behavior]
- Execution:
  * Entry: [Precise trigger]
  * Targets: [T1, T2, T3]
  * Stop: [Invalidation level]
- Timing: [Optimal execution window]
- Context: [Setup background]

### SETUP 2: [SETUP TYPE]
[Same format as above]

## TRADE MANAGEMENT
- First Target: [Action to take]
- Second Target: [Action to take]
- Runner Management: [How to handle remainder]
- Trailing Methodology: [How to trail stops]

## EXECUTION WINDOWS
- Primary: [Optimal trading window]
- Secondary: [Other viable windows]
- Avoid: [Times to avoid trading]

## SESSION OUTLOOK
- Previous Session: [Brief recap]
- Scenarios:
  1. IF [condition], THEN [expected outcome]
  2. IF [condition], THEN [expected outcome]
- Focus Points:
  * [Key thing to watch]
  * [Key thing to watch]
- Warning Signs:
  * [Structural invalidation]
  * [Behavioral red flag]
  * [Timing concern]
```

---

### FORMATTING GUIDELINES

1. **Level Presentation**:
   - Always include exact numerical values
   - Maintain precision (e.g., 5642 not 5640)
   - Bold key decision points and primary levels
   - Include brief context for each significant level

2. **Setup Prioritization**:
   - List setups in order of conviction (HIGH → MEDIUM → LOW)
   - Give FAILED_BREAKDOWN setups (Mancini's specialty) priority
   - Include all execution details for HIGH conviction setups
   - Summarize lower conviction setups more briefly

3. **Visual Clarity**:
   - Use hierarchical headers for easy scanning
   - Employ bullet points for list-based information
   - Bold critical numbers and decision points
   - Maintain consistent formatting throughout

4. **Technical Emphasis**:
   - Focus on precise levels and patterns
   - Highlight acceptance criteria for entries
   - Specify exact execution parameters
   - Include context but prioritize actionable data

5. **Warning Integration**:
   - Emphasize invalidation conditions
   - Highlight timing concerns
   - Note any specific cautions from Mancini

---

### INSTRUCTIONS TO AI

1. Parse the input JSON data
2. Validate that all required sections exist
3. Sort trade setups by conviction level
4. Format critical levels with context
5. Organize support/resistance into clear zones
6. Structure setups with full execution parameters
7. Generate the summary using the exact format above
8. Ensure all numerical values (levels, targets, stops) are preserved exactly
9. Include the current date and conversion factor in the header

If the input JSON is missing or malformed, output:

```
ERROR: Invalid or missing JSON input.

Please run mancini-trade-analyzer.md first and ensure it outputs valid JSON data in the format:
{
  "TECHNICAL_DATA": {...},
  "TRADE_SETUPS": {...},
  "MARKET_ANALYSIS": {...}
}

Then run this summary generator with the JSON output as input.
```

---

### EXAMPLE OUTPUT

```
# MANCINI SPX BLUEPRINT — MAY 5, 2025

ES TO SPX CONVERSION: 30

## MARKET STRUCTURE
- Regime: BUY_DIPS
- Pattern: Bull flag consolidation after breakout
- Streak: 9 consecutive days up
- Control: Bulls above 5642, Bears below 5580

## KEY TECHNICAL LEVELS

### CRITICAL STRUCTURE
- **5642**: Critical reclaim level, conversion from support to resistance
- 5615: Prior high from April 15
- 5595: Overnight low, potential support on pullback

### SUPPORT ZONES
- Macro: 5550-5555
- Major: 5580-5585, 5595-5600
- Minor: 5615-5620, 5630-5635

### RESISTANCE ZONES
- Macro: 5700-5710
- Major: 5665-5670
- Minor: 5650-5652, 5642-5645

### PRICE MAGNETS
- 5625: Major VPOC from last week's range
- 5650: Psychological round number, option gamma cluster

## PRIORITIZED SETUPS

### SETUP 1: FAILED_BREAKDOWN
- Direction: LONG
- Conviction: HIGH
- Primary Level: **5642**
- Acceptance Pattern:
  * Price must break below 5642, flush lower, then reclaim
  * Ideal flush is 8-12 points below break
  * Must reclaim with volume and hold for 2 candles
- Execution:
  * Entry: On reclaim of 5642 after flush
  * Targets: 5655, 5665, 5680
  * Stop: Below flush low (typically 5-8 points)
- Timing: Best in first 90 minutes or after 3:00pm
- Context: Critical level that previously reversed the market

### SETUP 2: RANGE_FADE
- Direction: SHORT
- Conviction: MEDIUM
- Primary Level: 5665
- Acceptance Pattern:
  * Price tests recent high with declining momentum
  * Volume decreases on approach
- Execution:
  * Entry: Rejection candle at 5665
  * Targets: 5650, 5642, 5630
  * Stop: Above 5670
- Timing: Avoid between 11:30-2:00
- Context: Previously identified resistance, bearish scenario trigger

## TRADE MANAGEMENT
- First Target: Take 1/3 position off
- Second Target: Take 1/3 position off, move stop to breakeven
- Runner Management: Trail with 8-point stop
- Trailing Methodology: Use 15-minute candle closes

## EXECUTION WINDOWS
- Primary: 9:30-11:00am ET
- Secondary: 3:00-4:00pm ET
- Avoid: 11:30am-2:00pm ET (typical midday chop)

## SESSION OUTLOOK
- Previous Session: Strong trend day that closed at highs
- Scenarios:
  1. IF 5642 holds as support, THEN likely test of 5665-5670 range
  2. IF 5642 breaks and holds below, THEN retest of 5615 likely
- Focus Points:
  * Volume pattern at opening test of 5642
  * VIX expansion/contraction at key levels
- Warning Signs:
  * Failure to reclaim 5642 within 30 minutes of breakdown
  * Morning rally that fades by 11am
  * Inability to hold gains after positive news
```