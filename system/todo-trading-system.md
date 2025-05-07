---
title: Trading System TODO — Canonical Backlog
description: Unified priority backlog for refactor, accuracy, and execution enhancements
tags: [todo, system, refactor, roadmap, prompt_engineering]
author: Simon Plant
last_updated: 2025-05-07
version: 3.0
category: system
usage: Use as the single source of truth for planned upgrades. All prior TODOs now merged here.
status: active
requires: []
linked_outputs: []
input_format: markdown
output_format: markdown
ai_enabled: false
---

# RECENT COMPLETIONS

- `trading-capital-profile.md` created — capital and tier logic externalized
- `copilot.md` modularized into scout, confirm, recenter, and debrief prompts
- `midday-reset.md` launched — tactical mid-session decision prompt
- `main-controller.md` now governs prompt routing across all workflows
- `trading-system-sop.md` refactored to align tiering, resets, behaviors
- JSON schemas validated across analyzers and plan generator

---

# P0 — CRITICAL UPGRADES

## ⛓️ Routing + Structure

- **Enforce `main-controller.md` routing globally**  
  Every prompt should route through controller, fallback to ChatGPT logic only if unrecognized  
  Tags: `routing`, `control`, `discipline`

- **Fix `system-parameters.json` path mismatches**  
  Standardize path templates (remove slashes, fix kb/log paths)  
  Tags: `infra`, `routing`, `structure`

## 📊 Accuracy + Trade Intelligence

- **Upgrade `dp-trade-analyzer.md` to capture lifecycle**  
  Include entries, exits, tiers, trims, stop updates, runner management  
  Tags: `execution`, `mirror_mods`, `discipline`

- **Refactor `mancini-trade-analyzer.md` for decision tree logic**  
  Explicit IF-THEN level logic for Failed Breakdown, reclaim, backtest setups  
  Tags: `structure`, `levels`, `execution`

- **Add flip logic and <2R downgrade logic to plan generator**  
  Automatically downgrade trades lacking risk/reward edge  
  Tags: `sizing`, `reward:risk`, `discipline`

- **Standardize SPX level conversion and FBD structure logic**  
  Tags: `mancini`, `accuracy`, `structure`

## 📁 Logging + Templates

- **Auto-save output to `/logs/premarket/YYYY-MM-DD/`**  
  Store analyzer + trade plan outputs with standard front matter  
  Tags: `infra`, `logging`, `consistency`

- **Create Handlebars templates for trade logs, KB, and journal entries**  
  Move all formatting logic out of prompts  
  Tags: `UX`, `consistency`, `structure`

## 🧠 Prompt Design + Validation

- **Few-shot exemplars for key prompts**  
  Add 3+ examples to:
  - `copilot-confirm.md`
  - `trade-intent-validator.md`
  - `midday-reset.md`  
  Tags: `prompt_engineering`, `consistency`, `performance`

- **Implement multi-pass validation for `copilot.md`**  
  1. Setup alignment  
  2. R/R check  
  3. Behavioral sanity gate  
  Tags: `discipline`, `risk_control`, `psychology`

---

# P1 — STRUCTURE, RESILIENCE, EXECUTION

- Add `stack_rank:` to unified plan for trade prioritization  
- Create `trade-intent-validator.md` (pre-trade sanity gate)  
- Enhance `trading-behaviors-kb.md` with `trigger:` and `override_action:` logic  
- Add rules for "Avoidance Zones" (macro overlap, Fed events, chop)  
- Track prompt performance by trade outcome (meta-analytics)  
- Add post-trade “intent vs outcome” field to logs  
- Add “missed setups” and “next-day hypothesis” to debrief  
- Add flip logic for major level failures (Mancini + DP zones)  
- Add PnL attribution: structure vs. impulse  
- Implement prompt fallbacks and A/B test harness

---

# P2 — AUTOMATION, METRICS, BEHAVIORAL INSIGHT

- Add trade tiering automation to plan generator  
- Add real-time MA fetch by ticker in premarket prep  
- Create dashboard for behavioral flags across sessions  
- Track level accuracy vs. price action (Mancini/DP vs. reality)  
- Implement journaling thresholds (min # trades or pnl)  
- Create counterfactual analysis prompt (“What if I’d taken that?”)

---

# P3 — DOCUMENTATION, VISUALS, FINAL POLISH

- Update all `description:` fields across prompt files  
- Add `writes_to:` to YAML frontmatter for log-generating prompts  
- Add test fixtures (`tests/prompts/XYZ.md`) with sample input/output  
- Visualize full system routing and dependencies (`prompt-routing-overview.md`)  
- Create prompt engineering guide (system prompt patterns, meta tags)  
- Refactor `requires:` fields to accurately reflect prompt dependencies  
- Add chart template to generate TOS-friendly level list  
- Visual dependency graph for SOP

---

# DAILY EXECUTION PRIORITY (NEXT SESSION)

> Implement before next session:

1. Upgrade copilot-confirm.md with 3 few-shot examples
2. Create trade-intent-validator.md with sanity checklist
3. Auto-save DP, Mancini, and plan outputs to logs
4. Enforce routing via main-controller.md
5. Finalize trade-plan downgrade + flip logic