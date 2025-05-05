---
title: Trading Capital Profile  
description: Central source of truth for trading capital, daily loss thresholds, position sizing rules, and exposure limits  
tags: [system, control, capital]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 2.2  
category: system  
usage: Referenced by prompts that evaluate risk, exposure, or trade sizing against capital constraints  
status: stable  
requires: []  
linked_outputs: [capital-exposure-tracker, copilot, generate-daily-trade-log]  
input_format: markdown  
output_format: markdown  
ai_enabled: false  
---

# Trading System Prompts — Unified Execution Framework

This is a modular AI-assisted trading framework designed by Simon Plant to support high-conviction, structure-driven options trading. It integrates David Prince's Inner Circle trade ideas, Adam Mancini’s SPX blueprint, and Simon’s personal SOPs, conviction sizing, and behavioral filters.

---

## System Overview — Visual Flow

The following flow represents the full lifecycle of daily execution:

**Premarket → Intraday → Postmarket**  
Each phase connects via the Copilot, which serves as the execution and validation interface across all modules.

**Premarket**  
- Extract trade ideas (DP, Mancini)
- Map levels, structure plan

**Intraday**  
- Validate trade ideas via Copilot
- Align with setup library, regime, and behavior

**Postmarket**  
- Log trades
- Debrief and update behavioral KB
- Export journal

---

## 1. How to Use This Repo

Start a new assistant session and upload this ZIP. Then run:

> Use `prompts/main-controller.md` as the routing layer. I want to interact with my trading system.

---

## 2. What `main-controller.md` Does

- Routes input to correct phase prompt
- Loads key files like the charter, trade plan, and KB
- Applies guardrails and SOP rules
- Enables phase-to-phase continuity (plan → trade → review)

---

## 3. Supported Workflows

### ➤ Premarket Planning

Prompt:  
`Run premarket prep. Here’s the DP transcript and macro context.`

Workflow:  
- `dp-trade-analysis.md` → Tags DP trade ideas with conviction/duration/sizing
- `mancini-trade-analysis.md` → Translates ES levels to SPX zones
- `unified-trade-plan-generator.md` → Generates daily trade plan

Output:  
- Unified Trade Plan with bias, execution checklist, 5-min focus stack

---

### ➤ Intraday Trade Validation

Prompt:  
`Validate this trade: AAPL reclaiming 170, scalp long, same-day expiration.`

Workflow:  
- `validate-intraday-trade-idea.md` → Applies plan alignment, setup match, behavior check
- `copilot.md` → Real-time agent validation with conviction, regime, and behavior overlay

Output:  
- GO / WAIT / NO GO response, tier sizing, linked Charter clause or blindspot

---

### ➤ Postmarket Debrief + Behavior Update

Prompt:  
`Here’s my trade log and reflection. Help me review and learn.`

Workflow:  
- `daily-performance-debrief.md` → Logs trades and flags behavioral issues
- `update-trading-behaviors-kb.md` → Updates knowledge base of patterns
- `export-journal-entry.md` → Generates end-of-day summary

Output:  
- Structured log, updated KB, journaling template

---

### ➤ Reference + System Utilities

Prompt:  
`Show me my Charter, SOP, or chart legend.`

- `trading-charter.md` → Risk, mindset, structure
- `trading-system-sop.md` → Phase-by-phase checklists
- `chart-visual-legend.md` → Screenshot interpretation key
- `market-regimes.md` → Defines current state and active setup types

---

## 4. New Additions (May 2025)

| File | Description |
|------|-------------|
| `prompts/intraday/copilot.md` | Central AI agent for validating trades and sizing |
| `system/trade-setups-kb.md` | Canonical library of setups (e.g., Failed Reclaim, Scalp, Swing) |
| `system/market-regimes.md` | Classifies market bias and filters valid setups |
| `prompts/postmarket/export-journal-entry.md` | Generates daily Markdown summary for trade logs |

---

## 5. Folder Structure

| Folder            | Purpose                                                   |
|-------------------|------------------------------------------------------------|
| `prompts/`        | Core prompt logic by phase (premarket, intraday, postmarket) |
| `system/`         | Charter, SOP, KBs, setups, market regimes, chart legend     |
| `logs/`           | Structured markdown files for daily trade logs             |
| `README.md`       | This file — primary usage guide and system map             |

---

## 6. Author

Simon Plant  
[GitHub: simonplant](https://github.com/simonplant)

---