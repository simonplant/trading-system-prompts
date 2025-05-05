---
title: System Files Overview  
description: Overview of system files supporting Simon Plant’s structured trading framework  
tags: [system]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.1  
category: system  
usage: Reference structure for charter, SOPs, knowledge bases, and setup guides  
status: stable  
requires: []  
linked_outputs: []  
input_format: markdown  
output_format: markdown  
ai_enabled: true  
---

# SYSTEM FOLDER OVERVIEW

This folder contains core files that define the structure, discipline, and behavioral architecture of Simon Plant’s trading system. These are referenced by multiple prompts across premarket, intraday, and postmarket workflows.

---

## FILES

### `trading-charter.md`
Defines the high-level strategy, execution filters, risk rules, and mindset principles that govern daily operations. Must be followed for all live trades.

### `trading-system-sop.md`
Step-by-step standard operating procedure outlining:
- Daily prep
- Trade validation
- Risk checks
- Execution tiers
- Postmortem workflows

### `trading-behaviors-kb.md`
Living knowledge base of behavioral blindspots, overtrading patterns, emotional leaks, and process violations — derived from real-world trade logs and postmortem reviews.

### `front-matter-template.md`
Reusable YAML block to insert at the top of new `.md` prompt files. Ensures consistent metadata across prompts.

### `chart-visual-legend.md`
Reference guide for interpreting Simon’s ThinkOrSwim chart screenshots. Explains color codes for MAs, VWAP, anchored VWAP, pivot levels, and visual indicators.

---

## HOW THESE FILES ARE USED

- The charter and SOP are referenced in every phase (premarket, intraday, postmarket) for enforcing trade discipline.
- The behavior KB is updated via postmortem prompts and prevents repeat mistakes.
- The chart legend enables accurate parsing of shared screenshots during trade reviews or validation steps.

---

## MAINTAINING THIS FOLDER

- Only edit these files after a significant trading insight or confirmed pattern.
- New behavioral lessons should be appended to `trading-behaviors-kb.md` using the `update-trading-behaviors-kb.md` prompt.
- If visual chart logic changes (e.g. a new color), update `chart-visual-legend.md`.

---