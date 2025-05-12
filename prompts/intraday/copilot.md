---
title: Trading Copilot  
description: Intraday decision interface — routes execution through scout, confirm, reset, and debrief phases  
tags: [intraday, execution, assistant, routing]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 3.0  
category: intraday  
usage: Use as a quick reference to Copilot execution phases. Produces routing logic and unified state awareness. Consumes trade ideas, trigger readiness, and emotional state.  
status: stable  
requires: [copilot-scout.md, copilot-confirm.md, copilot-recenter.md, copilot-debrief.md]  
linked_outputs: [generate-daily-trade-log.md]  
input_format: markdown  
output_format: markdown  
ai_enabled: false
style:
  use_emojis: false
  text_decoration: false 
---

# Trading Copilot — Modular Intraday Interface

This prompt is now a **router and usage guide** for executing trades with discipline across 4 distinct phases:

## Copilot Phases

| Phase | Prompt | When to Run | Purpose |
|-------|--------|-------------|---------|
| Scout | `copilot-scout.md` | Before entry | Validate setup, size, structure, emotion |
| Confirm | `copilot-confirm.md` | At trigger | Final check on risk and behavior |
| Recenter | `copilot-recenter.md` | Midday/tilt | Reset discipline after clarity breaks |
| Debrief | `copilot-debrief.md` | After exit | Score trade, flag behavior, log lesson |

## Suggested Flow

1. Use `copilot-scout.md` before any new entry idea  
2. At the moment of trigger, run `copilot-confirm.md`  
3. If emotional clarity degrades, run `copilot-recenter.md`  
4. After each trade, run `copilot-debrief.md` and log outcome

Each sub-prompt supports structured logs and behavior alignment across your system.