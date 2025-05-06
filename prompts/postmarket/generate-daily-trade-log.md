---
title: Generate Daily Trade Log  
description: Creates structured markdown output of trades, flags, and setups for daily journaling and scorekeeping  
tags: [postmarket, log, reflection, review]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.1  
category: postmarket  
usage: Run at session end to document trades and behavior flags. Produces a markdown log of trades, outcomes, scores, and lessons. Consumes entry/exit data and Copilot context.  
status: stable  
requires: [trading-charter.md, trading-behaviors-kb.md]  
linked_outputs: [daily-performance-debrief.md, generate-kb-update.md]  
input_format: markdown  
output_format: markdown  
ai_enabled: true  
---

## TRADE LOG EXPORTER — PROMPT

**Purpose:**  
Generate a Markdown file for structured trade-level data, excluding journal or behavioral KB notes.

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
  "trading_day": { [complete this section] },
  "trades": [ [complete this section] ],
  "daily_performance": { [complete this section] }
}