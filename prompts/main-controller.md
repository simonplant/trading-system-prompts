---
title: Main Command Controller
description: Central routing for all trading system commands
tags: [system, routing, controller]
author: Simon Plant
last_updated: 2025-05-08
version: 3.4
category: system
usage: Do not invoke prompts directly; route all commands through here.
status: stable
requires: []
linked_outputs: []
input_format: markdown
output_format: markdown
ai_enabled: true
style:
  use_emojis: false
  text_decoration: false
---

# TRADING SYSTEM COMMAND ROUTER

This is the EXCLUSIVE entry point for all command routing in the trading system. All interactions must go through this controller.

## Premarket Commands

| Command | Route | Description |
|---------|-------|-------------|
| `/premarket-sequence` | prompts/premarket/unified-trade-plan-generator.md | Run complete premarket workflow |
| `/analyze-dp` | prompts/premarket/dp-trade-analyzer.md | Process DP Morning Call transcript |
| `/dp-summary` | prompts/premarket/dp-trade-summary.md | Generate human-readable DP summary |
| `/analyze-mancini` | prompts/premarket/mancini-trade-analyzer.md | Process Mancini Blueprint data |
| `/mancini-summary` | prompts/premarket/mancini-trade-summary.md | Generate human-readable Mancini summary |
| `/get-levels` | prompts/premarket/get-premarket-levels.md | Extract market levels for indices |
| `/get-sma` | prompts/premarket/get-daily-sma-for-tickers.md | Get daily SMA data for key tickers |
| `/generate-trade-plan` | prompts/premarket/unified-trade-plan-generator.md | Generate unified plan from all sources |

## Intraday Commands

| Command | Route | Description |
|---------|-------|-------------|
| `/copilot` | prompts/intraday/copilot.md | Activate intraday trading copilot |
| `/copilot-confirm` | prompts/intraday/copilot-confirm.md | Validate potential trade against plan |
| `/copilot-scout` | prompts/intraday/copilot-scout.md | Scan for setups matching criteria |
| `/copilot-recenter` | prompts/intraday/copilot-recenter.md | Reset focus during trading day |
| `/copilot-debrief` | prompts/intraday/copilot-debrief.md | Quick review of completed trade |
| `/midday-reset` | prompts/intraday/midday-reset.md | Mid-session review and plan adjustment |

## Postmarket Commands

| Command | Route | Description |
|---------|-------|-------------|
| `/postmarket-sequence` | prompts/postmarket/daily-performance-debrief.md | Run complete postmarket workflow |
| `/generate-trade-log` | prompts/postmarket/generate-daily-trade-log.md | Create structured log of today's trades |
| `/performance-debrief` | prompts/postmarket/daily-performance-debrief.md | Analyze today's trading performance |
| `/generate-journal` | prompts/postmarket/generate-daily-journal.md | Create trading journal entry |
| `/update-behaviors` | prompts/postmarket/update-trading-behaviors-kb.md | Update trading behaviors knowledge base |
| `/generate-kb-update` | prompts/postmarket/generate-kb-update.md | Generate KB update recommendations |
| `/performance-vs-mancini` | prompts/postmarket/analyze-plan-vs-execution.md | Compare execution vs plan and Mancini |
| `/export-journal` | prompts/postmarket/export-journal-entry.md | Export journal entry to markdown |
| `/show-behaviors` | prompts/postmarket/show-trading-behaviors-kb.md | Display stored trading behaviors and patterns |

## Utility Commands

| Command | Route | Description |
|---------|-------|-------------|
| `/system-status` | prompts/system/system-status.md | Show current system status |
| `/help` | prompts/system/help.md | Show available commands and documentation |
| `/list-commands` | prompts/system/help.md | Alias to `/help` for CLI-style listing |
| `/show-charter` | system/trading-charter.md | Display trading rules and principles |
| `/show-trade-plan` | system/templates/unified-trade-plan-template.md | View the current day's unified trade plan |
| `/show-dp-ideas` | prompts/premarket/dp-trade-summary.md | Show analyzed trade ideas from DP |
| `/show-mancini` | prompts/premarket/mancini-trade-summary.md | Display SPX/ES structure and Mancini blueprint |
| `/load-plan` | prompts/system/load-plan-by-date.md | Load a prior plan by specifying a valid date |
| `/log-trade` | prompts/postmarket/generate-daily-trade-log.md | Log a manual trade entry |
| `/log-kb` | prompts/postmarket/update-trading-behaviors-kb.md | Log a behavioral pattern or insight |
| `/replay-day` | prompts/system/replay-day.md | Run system playback for past trading days |
| `/debug-system` | prompts/system/debug-system.md | Diagnostic trace of system components |

## SECURITY NOTICE

⚠️ **MANDATORY CONTROLLER ENFORCEMENT POLICY** ⚠️

ALL system interactions MUST be routed through main-controller.md without exception.

Enforcement Mechanisms:
- Component validation checks
- Phase-appropriate access control
- Input validation and sanitization
- Execution logging and auditing

WARNING: Bypassing the controller will break the application.