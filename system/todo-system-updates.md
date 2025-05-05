---
title: Trading System TODO Tracker  
description: Central checklist of tasks, cleanups, and integrations to bring the trading system into sync across all modules.  
tags: [system, todo, cleanup, refactor]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.0  
category: system  
usage: Track implementation of all major system changes, prompt updates, and cleanup actions  
---

## SYSTEM TODO TRACKER

### ✅ Copilot Refactor
- [x] Replace `copilot.md` with unified v2 structure
- [x] Merge `validate-intraday-trade-idea.md` into Copilot v2
- [x] Update `main-controller.md` to support `mode` routing
- [ ] Review Copilot reset sequence integration — inline vs. modular

### 📁 File Cleanup
- [x] Delete `prompts/intraday/validate-intraday-trade-idea.md`
- [x] Remove all decorative characters from prompts and markdown
- [ ] Confirm all references to old Copilot logic are removed

### 📄 Template Integration
- [ ] Add `logs/template-trade-log.md` with JSON schema block
- [ ] Reference template in `copilot.md`, `export-journal-entry.md`, and controller
- [ ] Create `log-schema-reference.md` (optional: schema definitions)

### 🧠 Prompt Enhancements
- [ ] Add carryover lesson injection to Copilot debrief
- [ ] Add export toggle to Copilot to save directly into JSON format
- [ ] Link `market-regimes.md` directly in trade validation logic

### 🗂 File Index + Docs
- [ ] Update `README.md` to reflect template log structure
- [ ] Add summary of `copilot-reset.md` to `/system/README.md`
- [ ] Consider glossary or `system/index.md` of all modules

### ✨ Future Ideas
- [ ] Add Alfred/Apple Shortcut for morning launch (loads trade plan + opens Copilot)
- [ ] Add journaling automation for Obsidian using daily log template
- [ ] Create standalone `setup-validator.md` prompt for reviewing KB alignment
