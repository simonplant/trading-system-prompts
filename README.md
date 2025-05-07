---

title: Trading System Prompt Library
description: Master index and usage guide for Simon Plant’s AI-assisted trading framework
tags: \[readme, index, overview]
author: Simon Plant
last\_updated: 2025-05-06
version: 1.1
category: root
usage: Start here when opening the repo. Describes architecture, file roles, workflows, and LLM routing.
status: stable
requires: \[]
linked\_outputs: \[]
input\_format: markdown
output\_format: markdown
ai\_enabled: false
------------------

# Trading System Prompts — Unified Execution Framework

This is a modular AI-assisted trading framework designed by Simon Plant to support high-conviction, structure-driven options trading. It integrates David Prince's Inner Circle trade ideas, Adam Mancini’s SPX blueprint, and Simon’s personal SOPs, conviction sizing, and behavioral filters.

---

## System Overview — Visual Flow

The following flow represents the full lifecycle of daily execution:

Premarket → Intraday → Postmarket
Each phase connects via the Copilot, which serves as the execution and validation interface across all modules.

Premarket

* Extract trade ideas (DP, Mancini)
* Map levels, structure plan

Intraday

* Validate trade ideas via Copilot
* Align with setup library, regime, and behavior

Postmarket

* Log trades
* Debrief and update behavioral KB
* Export journal

---

## 1. How to Use This Repo

You have two options:

**Option 1: ZIP Upload (ChatGPT)**
Download and upload the zipped version of this repo into your assistant. Then type:

> Use `prompts/main-controller.md` as the routing layer. I want to interact with my trading system.

**Option 2: GitHub Link (Claude or other LLMs)**
Use the repo URL below when prompted for the system location:

Primary: [https://github.com/simonplant/trading-system-prompts/tree/main/](https://github.com/simonplant/trading-system-prompts/tree/main/)
Alternative (fallback if needed): [https://github.com/simonplant/trading-system-prompts](https://github.com/simonplant/trading-system-prompts)

Then say:

> Load the full repo and use `main-controller.md` as the routing layer for all commands.

Once loaded, the system will reference:

* `trading-system-sop.md` to determine execution phase
* `main-controller.md` to route requests to correct handlers
* `trading-charter.md` for risk and behavior enforcement

---

## 2. What `main-controller.md` Does

* Routes input to correct phase prompt
* Loads key files like the charter, trade plan, and KB
* Applies guardrails and SOP rules
* Enables phase-to-phase continuity (plan → trade → review)

---

## 3. Supported Workflows

### ➤ Premarket Planning

Prompt:
Run premarket prep. Here’s the DP transcript and macro context.

Workflow:

* `dp-trade-analysis.md` → Tags DP trade ideas with conviction/duration/sizing
* `mancini-trade-analysis.md` → Translates ES levels to SPX zones
* `unified-trade-plan-generator.md` → Generates daily trade plan

Output:

* Unified Trade Plan with bias, execution checklist, 5-min focus stack

### ➤ Intraday Trade Validation

Prompt:
Validate this trade: AAPL reclaiming 170, scalp long, same-day expiration.

Workflow:

* `validate-intraday-trade-idea.md` → Applies plan alignment, setup match, behavior check
* `copilot.md` → Real-time agent validation with conviction, regime, and behavior overlay

Output:

* GO / WAIT / NO GO response, tier sizing, linked Charter clause or blindspot

### ➤ Postmarket Debrief + Behavior Update

Prompt:
Here’s my trade log and reflection. Help me review and learn.

Workflow:

* `daily-performance-debrief.md` → Logs trades and flags behavioral issues
* `update-trading-behaviors-kb.md` → Updates knowledge base of patterns
* `export-journal-entry.md` → Generates end-of-day summary

Output:

* Structured log, updated KB, journaling template

### ➤ Reference + System Utilities

Prompt:
Show me my Charter, SOP, or chart legend.

* `trading-charter.md` → Risk, mindset, structure
* `trading-system-sop.md` → Phase-by-phase checklists
* `chart-visual-legend.md` → Screenshot interpretation key
* `market-regimes.md` → Defines current state and active setup types

---

## 4. New Additions (May 2025)

| File                                         | Description                                                      |
| -------------------------------------------- | ---------------------------------------------------------------- |
| `prompts/intraday/copilot.md`                | Central AI agent for validating trades and sizing                |
| `system/trade-setups-kb.md`                  | Canonical library of setups (e.g., Failed Reclaim, Scalp, Swing) |
| `system/market-regimes.md`                   | Classifies market bias and filters valid setups                  |
| `prompts/postmarket/export-journal-entry.md` | Generates daily Markdown summary for trade logs                  |

---

## 5. Folder Structure

| Folder      | Purpose                                                      |
| ----------- | ------------------------------------------------------------ |
| `prompts/`  | Core prompt logic by phase (premarket, intraday, postmarket) |
| `system/`   | Charter, SOP, KBs, setups, market regimes, chart legend      |
| `logs/`     | Structured markdown files for daily trade logs               |
| `README.md` | This file — primary usage guide and system map               |

---

## 5a. File-Level Index

Detailed list of all files by phase and system role. Helps search, indexing, and LLM compatibility (e.g., Claude).

### Prompts

prompts/premarket/

* dp-trade-analysis.md — Extracts DP's morning call trade ideas, sentiment, and sizing
* mancini-trade-analysis.md — Converts Mancini ES blueprint into actionable SPX levels
* get-daily-sma-for-tickers.md — Surfaces daily SMAs likely to act as S/R
* get-premarket-levels.md — Gathers SPX/ES/QQQ key levels for staging
* unified-trade-plan-generator.md — Merges all premarket data into a single daily plan

prompts/intraday/

* copilot.md — Primary interface for validating and managing intraday trades
* copilot-scout.md — Identifies new setups intraday
* copilot-confirm.md — Validates if a trade is actionable
* copilot-reset.md — Clears mental tilt or indecision
* copilot-recenter.md — Returns focus to charter
* midday-reset.md — Midday clarity check
* copilot-debrief.md — Post-trade intra-session reflection

prompts/postmarket/

* generate-daily-trade-log.md
* generate-daily-journal.md
* daily-performance-debrief.md
* generate-kb-update.md
* update-trading-behaviors-kb.md

### System

* trading-system-sop.md — Master standard operating procedures
* trading-charter.md — Your personal trading constitution
* trading-capital-profile.md — Account size, sizing rules, tiers
* market-regimes.md — Framework for adjusting strategy by macro regime
* trading-behaviors-schema.md — Mental performance model
* trade-setups-kb.md — Your library of validated setups
* trading-behaviors-kb.md — Specific mental errors, corrections, affirmations
* chart-visual-legend.md — Color key for interpreting screenshots
* todo-system-updates.md — Pending changes to the system

### Logs

logs/trades/

* 2025-05-05-daily-performance-debrief.md

logs/journal/

* 2025-05-05-trading-journal.md

logs/kb-updates/

* 2025-05-05-kb-update-recommendations.md

---

## 6. Author

Simon Plant
GitHub: [https://github.com/simonplant](https://github.com/simonplant)

---

## Changelog

### 1.1 — May 6, 2025
- Added bootstrap instructions for ZIP and GitHub repo loading
- Included secondary GitHub URL for Claude compatibility
- Clarified `main-controller.md` role in prompt routing
- Refined section on premarket startup process using SOP and routing layers
- Removed references to Claude rate limits (resolved)
- Improved formatting consistency and index granularity

### 1.0 — Initial Release
- Structured the README by workflow phase
- Added prompt folder index and usage summaries
- Defined system overview and visual flow