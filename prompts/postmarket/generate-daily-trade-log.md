---
title: Generate Daily Trade Log  
description: Output only structured trade execution data for the day, to be saved under /logs/YYYY/trades/YYYY-MM-DD.md  
tags: [postmarket, trade-log, export, json-aligned]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 2.0  
category: postmarket  
usage: Use after each session to structure all trade entries, exits, and metadata into a JSON-compatible Markdown log.  
---

## TRADE LOG EXPORTER — PROMPT

**Purpose:** Generate a Markdown file for structured trade-level data, excluding journal or behavioral KB notes.

---

### INPUT FIELDS
- Date (YYYY-MM-DD)
- List of trades with entries, exits, instrument, sizing, rationale
- Realized/unrealized PnL
- Time in trade, stop levels, patterns hit

---

### OUTPUT FORMAT
JSON-style embedded log in Markdown file:
```json
{
  "trading_day": { ... },
  "trades": [ ... ],
  "daily_performance": { ... }
}