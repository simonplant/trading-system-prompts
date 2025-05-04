---
title: Generate Daily Trade Log
description: Template prompt for capturing daily trades, moderator actions, and execution summary after market close
author: Simon Plant
version: 1.0
category: postmarket
last_updated: 2025-05-03
usage: Run immediately after market close. Save output to /logs/[YYYY]/YYYY-MM-DD.md
---

## Prompt Role: `generate-daily-trade-log.md`

**⏱ When to Use:**  
Run this **immediately after the market closes** to create a structured summary of your daily trades before running performance analysis or coaching prompts.

** Purpose:**  
To produce a clean, objective record of:
- Trades taken
- Key details (size, timing, trigger)
- Moderator trade context
- Any intraday events or decisions

This file serves as the **input source** for later analysis and feedback (e.g., performance debrief, knowledge base updates).

---

## Postmarket Workflow

**Step 1 — Generate Trade Log**
- Run `generate-daily-trade-log.md`
- Populate trade entries based on your execution and platform data
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