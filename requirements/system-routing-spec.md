---
title: System Routing Specification
description: Official route map for all prompt-based interactions
tags: [controller, routes, architecture]
author: Simon Plant
last_updated: 2025-05-07
version: 1.0
category: requirements
usage: Referenced by main-controller.md and any component that dispatches commands or workflows
status: active
---

# Prompt Routing Rules

All trading system prompts must be routed exclusively through `main-controller.md`.

## Premarket Routing
- Analyze DP Transcript → `prompts/premarket/dp-trade-analyzer.md`
- DP Summary Output → `prompts/premarket/dp-trade-summary.md`
- Analyze Mancini Blueprint → `prompts/premarket/mancini-trade-analyzer.md`
- Mancini Summary → `prompts/premarket/mancini-trade-summary.md`
- Unified Trade Plan → `prompts/premarket/unified-trade-plan-generator.md`

## Intraday Routing
- Activate Copilot → `prompts/intraday/copilot.md`
- Scout for Trades → `prompts/intraday/copilot-scout.md`
- Confirm a Trade Idea → `prompts/intraday/copilot-confirm.md`

## Postmarket Routing
- Log Trades → `prompts/postmarket/generate-daily-trade-log.md`
- Performance Debrief → `prompts/postmarket/daily-performance-debrief.md`