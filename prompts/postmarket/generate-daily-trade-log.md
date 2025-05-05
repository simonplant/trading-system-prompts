---
title: Generate Daily Trade Log  
description: Prompt used to scaffold a structured trade log entry for each trading day  
tags: [postmarket, log]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.1  
category: postmarket  
usage: Run at EOD to create a structured markdown entry capturing trades, notes, and emotion ratings  
status: stable  
requires: [trade-log-template.md]  
linked_outputs: [export-journal-entry.md, midday-reset.md]  
input_format: markdown  
output_format: markdown  
ai_enabled: true  
---

## Prompt Role: `generate-daily-trade-log.md`

**⏱ When to Use:**  
Run this **immediately after the market closes** to create a structured summary of your daily trades before running performance analysis or coaching prompts.

**Purpose:**  
To produce a clean, objective record of:
- Trades taken
- Key details (size, timing, trigger)
- Moderator trade context
- Any intraday events or decisions
- Midday reset moments (if triggered)

This file serves as the **input source** for later analysis and feedback (e.g., performance debrief, knowledge base updates).

---

## Postmarket Workflow

**Step 1 — Generate Trade Log**
- Run `generate-daily-trade-log.md`
- Populate trade entries based on your execution and platform data
- Include **Midday Reset Events** if any were triggered and logged during the session
- Save output as a plain text file to:  
  **`/logs/[YYYY]/[YYYY-MM-DD].md`**  
  (e.g., `/logs/2025/2025-05-03.md`)

**Step 2 — Run Performance Debrief**
- Run `daily-performance-debrief.md`
- Attach the log you just created
- Include charts, Unified Trade Plan, moderator trades
- Review adherence to plan and coaching takeaways

**Step 3 — Update Behavior KB**
- If a new learning or blindspot was discovered,
  use `update-trading-behaviors-kb.md` to log it

---

## Structure

Trade logs should include the following sections:

1. Header (date, capital deployed, overall result)
2. Trade-by-trade entries (setup, size, outcome)
3. Behavioral tags (impulse, revenge, deviation, none)
4. Moderator comparison (DP / Mancini)
5. **Midday Reset Events (if any)**
   - Time of reset
   - Capital exposure at time of reset
   - Emotional state (frustrated, anxious, greedy, etc.)
   - Behavior flags observed
   - Market regime context
   - Action taken (pause, reduce, exit, journal)
   - 1-line insight or intention for rest of session

---