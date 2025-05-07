---
title: Main Command Controller
description: Central routing for all trading system commands
tags: [system, routing, controller]
author: Simon Plant
last_updated: 2025-05-07
version: 3.1
category: system
usage: Do not invoke prompts directly; route through here.
---

# SYSTEM COMMAND ROUTES

## premarket
/premarket-sequence: prompts/premarket/unified-trade-plan-generator.md
/analyze-dp: prompts/premarket/dp-trade-analyzer.md
/analyze-mancini: prompts/premarket/mancini-trade-analyzer.md
/get-levels: prompts/premarket/get-premarket-levels.md

## intraday
/copilot: prompts/intraday/copilot.md
/copilot-confirm: prompts/intraday/copilot-confirm.md
/copilot-scout: prompts/intraday/copilot-scout.md
/midday-reset: prompts/intraday/midday-reset.md

## postmarket
/postmarket-sequence: prompts/postmarket/daily-performance-debrief.md
/performance-vs-mancini: prompts/postmarket/analyze-plan-vs-execution.md

## system
/help: prompts/system/help.md
/status: prompts/system/system-status.md
/show-charter: system/trading-charter.md
