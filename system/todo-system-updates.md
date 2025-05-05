---
title: System TODO — Core Architecture  
description: Master list of missing, incomplete, or outdated prompt components in the trading-system-prompts repo  
tags: [system, backlog, architecture, refactor]  
author: Simon Plant  
last_updated: 2025-05-05  
category: system  
status: active  
---

# COMPLETED (2025-05)

- `trading-capital-profile.md` created — fully externalized all capital, sizing, and loss thresholds
- `trading-charter.md` rewritten — now variable-driven and structurally synced
- `trading-system-sop.md` refactored — daily flow aligned with tiers, resets, behaviors
- `copilot.md` rebuilt — unified gatekeeper for all trade execution and resets
- `midday-reset.md` created — structured pause/reflect/reframe protocol
- `generate-daily-trade-log.md` rewritten — standardized output for trades, flags, and metrics
- `generate-daily-journal.md` created — for narrative mindset/reflection logs
- `generate-kb-update.md` created — to log behavioral patterns and blindspots
- `log-structure-upgrade.md` added — documents log split system
- `main-controller.md` updated — routing logic synced to all phases and log modules
- `copilot.md`, `midday-reset.md`, `trading-system-sop.md` updated — now cross-reference behavior KB and filename structure

---

# TODO: CORE FILES TO COMPLETE

- `daily-performance-debrief.md`  
  Postmarket review + self-assessment prompt. Should pull in:  
  - Prior day’s trade log  
  - Behavior flags  
  - Execution quality  
  **Tags:** `postmarket`, `behavior`, `function`  
  **Priority:** P0  

---

# TODO: SYSTEM-WIDE ALIGNMENTS (PRIORITIZED)

## P1 – High Leverage & Consistency

- Normalize `tags:` taxonomy  
  Define and apply consistent tagging structure (e.g., `[phase, function, behavior]`) across all prompts.  
  **Tags:** `consistency`, `infra`

- Sharpen `usage:` fields  
  Remove redundancy with `description:` and clarify *when* the prompt should run and *what it produces*.  
  **Tags:** `consistency`, `docs`

- Clean up versioning and `last_updated` inflation  
  Only bump versions if structure or function changes. Treat metadata separately from logic.  
  **Tags:** `consistency`, `docs`

## P2 – Quality & Infra Enhancements

- Add optional `model:` field  
  Useful for distinguishing prompt tuning for GPT-4 vs Claude or future LLMs.  
  **Tags:** `infra`, `docs`

- Review all `description:` fields  
  Improve for clarity, tone, and structural alignment with function and outcome.  
  **Tags:** `docs`

## P3 – Future UX

- Add optional prompt badges or metadata visuals  
  Consider adding visible badges like `[GPT-4] [Intraday]` to prompt headers or rendered documentation.  
  **Tags:** `infra`, `ux`, `docs`
