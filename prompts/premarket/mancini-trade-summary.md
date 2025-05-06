---
title: Mancini Blueprint Summary Generator  
description: Generate a human-readable summary of Mancini's technical analysis from structured JSON data  
tags: [premarket, analysis, technical]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.1  
category: premarket  
usage: Run after mancini-trade-analyzer.md produces JSON output. Creates a concise technical summary with key levels and setups. Consumes structured JSON data.  
status: active  
requires: [mancini-trade-analyzer.md]  
linked_outputs: [unified-trade-plan-generator.md]  
input_format: json  
output_format: markdown  
ai_enabled: true  
---

## MANCINI BLUEPRINT SUMMARY GENERATOR — PROMPT

**Purpose:**  
Convert structured JSON data from the Mancini analyzer into a concise premarket execution plan. Prioritize failed breakdowns, reclaim patterns, and high-probability zones.

---

### INPUT STRUCTURE

```json
{
  "source": "mancini",
  "date": "YYYY-MM-DD",
  "TECHNICAL_DATA": {...},
  "TRADE_SETUPS": {...},
  "MARKET_ANALYSIS": {...}
}
```

---

### OUTPUT FORMAT

```
# MANCINI SPX BLUEPRINT — [DATE]

ES TO SPX CONVERSION: [value from metadata]

## MARKET STRUCTURE
- Regime: [market_structure.regime]
- Pattern: [market_structure.current_pattern]
- Streak: [market_structure.day_streak]
- Control: Bulls above [bull_above], Bears below [bear_below]

## CRITICAL STRUCTURE LEVELS
- [level]: [context]

## SUPPORT ZONES
- Macro: [...]
- Major: [...]
- Minor: [...]

## RESISTANCE ZONES
- Macro: [...]
- Major: [...]
- Minor: [...]

## PRICE MAGNETS
- [level]: [context]

## TRADE SETUPS (Sorted by conviction)

### [SETUP_TYPE]
- Direction: [LONG | SHORT]
- Conviction: [HIGH | MEDIUM | LOW]
- Entry: [entry zone]
- Target: [T1, T2...]
- Stop: [stop level]
- Context: [brief rationale]
- Timing: [optimal session]
- Acceptance: [acceptance.type + pattern]

## TRADE MANAGEMENT
- First Target: [...]
- Second Target: [...]
- Runner Mgmt: [...]
- Trailing Stop: [...]

## EXECUTION WINDOWS
- Primary: [...]
- Secondary: [...]
- Avoid: [...]

## OUTLOOK
- Yesterday: [summary]
- Scenarios:
  - IF [...], THEN [...]
- Focus:
  - [Focus item]
- Invalidation:
  - [Structural or timing invalidation]
