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

---

# TODO: CORE FILES TO COMPLETE

- **`daily-performance-debrief.md`**  
  Postmarket review + self-assessment prompt. Should pull in:  
  - Prior day’s trade log  
  - Behavior flags  
  - Execution quality  
  - Missed opportunities  
  - Score summary: Setup / Execution / Emotion  

- **`update-trading-behaviors-kb.md`**  
  Lightweight template to capture new behavioral patterns or blindspots.  
  Used post-trade or after reset. Should append/update `trading-behaviors-kb.md`.

- **`capital-exposure-tracker.md`**  
  Runtime prompt or logic to track live exposure against:  
  - `max_exposure_dollars`  
  - Open tier slots  
  - Risk alerts  
  Integrated with `copilot.md` and pre-trade validation.

- **`unified-trade-plan-generator.md`**  
  Prompt to combine DP and Mancini morning calls into one plan.  
  Outputs planned bias, levels, conviction setups, and trade filters.  
  Must align with capital constraints and system tiers.

---

# OPTIONAL / LATER

- **`system-map.md`**  
  Visual/structured markdown of all prompt dependencies and process flow  
  Useful for onboarding, refactoring, and future automation

---

# MAINTENANCE / WATCHLIST

- Ensure no future prompts hardcode dollar values — all must reference `trading-capital-profile.md`  
- All behavioral logic must update or reference `trading-behaviors-kb.md`  
- Loss triggers must always reference `daily_loss_soft_dollars` or `daily_loss_hard_dollars`  
- Validate each prompt has clean front matter and `ai_enabled` set correctly  