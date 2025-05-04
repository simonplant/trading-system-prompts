---
title: Trading System Prompts
description: Structured GPT-based prompt library to support disciplined options trading alongside Inner Circle and Mancini
author: Simon Plant
version: 1.0
last_updated: 2025-05-03
category: system
usage: Upload this repo as a ZIP and use `prompts/main-controller.md` as the command router
---

# Trading System Prompts — Usage Guide

## 1. How to Use This ZIP + Main Controller

Start a fresh ChatGPT session and upload the zipped folder containing this repo. Then run:

> Use `prompts/main-controller.md` as the routing layer. I want to interact with my trading system.

This engages the structured routing logic across all phases: premarket, intraday, postmarket, and system reference.

---

## 2. Purpose of `main-controller.md`

The main controller serves as the system’s command router. It:

- Directs inputs to the appropriate prompts by phase
- Runs multi-step workflows across DP, Mancini, and execution prompts
- Enforces trading charter rules, blindspot filters, and SOP structure
- Centralizes interaction with the system through a single entry point

---

## 3. Primary Use Cases

### ➤ Premarket Prep

**Prompt:**  
`Run premarket prep. Here’s the DP transcript. Also use today’s ES/QQQ/SPY levels.`

**Workflow:**  
- `dp-trade-analysis.md` → parses and tags DP trades
- `mancini-trade-analysis.md` → extracts ES blueprint and converts to SPX
- `unified-trade-plan-generator.md` → generates full daily trade plan

**Output:**  
Unified Trade Plan including: Market Bias, 5-Min Focus, Trade Stack, SPX Decision Tree, Execution Checklist.

---

### ➤ Intraday Trade Validation

**Prompt:**  
`Validate this intraday trade idea: TSLA long above 180 reclaim, cashflow. SPX reclaiming 5606.`

**Workflow:**  
- `validate-intraday-trade-idea.md` → tests against technicals, plan, and behavioral risks

**Output:**  
GO / WAIT / NO GO assessment, with rationale, blindspots, and plan compliance check.

---

### ➤ Postmarket Review & Behavior Logging

**Prompt:**  
`Here’s my trade log and notes. Help me debrief and update my trading behavior KB.`

**Workflow:**  
- `daily-performance-debrief.md` → processes execution, notes, trade outcomes  
- `update-trading-behaviors-kb.md` → updates blindspot patterns, discipline rules

**Output:**  
- Daily postmortem log saved to `/logs/YYYY/YYYY-MM-DD.md`  
- Updated `system/trading-behaviors-kb.md`

---

### ➤ System Reference

**Prompt:**  
`Show me my Trading Charter and Behavior KB.`

**Workflow:**  
Displays the latest versions of:

- `system/trading-charter.md`
- `system/trading-behaviors-kb.md`
- `system/trading-system-sop.md` (if needed)

---

## 4. Folder Structure

| Folder           | Purpose                                                 |
|------------------|----------------------------------------------------------|
| `prompts/`       | Phase-specific prompts (premarket, intraday, postmarket) |
| `logs/`          | Structured daily trade logs and reviews                  |
| `system/`        | Charter, SOP, behavioral KB                              |
| `README.md`      | Usage guide and reference instructions                   |

---

## 5. Optional TODOs

- Add `friday-lotto-rules.md` checklist
- Create `mirror-log-template.md` to compare IC trades vs own
- Add `main-controller-guide.md` with prompt examples for all workflows
- Optional: automation to create `/logs/YYYY-MM-DD.md` daily template

---

## Author

Simon Plant  
[GitHub: simonplant](https://github.com/simonplant)