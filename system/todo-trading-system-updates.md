---
title: StructuredEdge Trading System Updates
description: Integrated prompt engineering enhancements for the trading-system-prompts architecture
tags: [system, backlog, architecture, refactor, prompt_engineering]
author: Simon Plant
last_updated: 2025-05-05
version: 1.0
category: system
usage: Edit during system development or prompt refactor planning. Produces prioritized backlog of tasks with prompt engineering focus.
status: active
requires: []
linked_outputs: []
input_format: markdown
output_format: markdown
ai_enabled: false
---

# RECENT COMPLETIONS

- `trading-capital-profile.md` created — fully externalized all capital, sizing, and loss thresholds
- `trading-charter.md` rewritten — now variable-driven and structurally synced
- `trading-system-sop.md` refactored — daily flow aligned with tiers, resets, behaviors
- `copilot.md` rebuilt — unified gatekeeper for all trade execution and resets
- `midday-reset.md` created — structured pause/reflect/reframe protocol
- `log-structure-upgrade.md` added — documents log split system
- `main-controller.md` updated — routing logic synced to all phases and log modules
- Front matter normalized for all system and prompt files
- Modularized `copilot.md` into 4 prompts: scout, confirm, recenter, debrief

---

# TODO: PROMPT ENGINEERING FUNDAMENTALS

## P0 – Core Prompt Architecture

- Complete `daily-performance-debrief.md`  
  Postmarket review + self-assessment prompt. Should pull in:  
  - Prior day's trade log  
  - Behavior flags  
  - Execution quality  
  **Tags:** `postmarket`, `review`, `behavior`  
  **Priority:** P0  

- Implement few-shot learning examples in critical prompts  
  Add 3-5 exemplars to each of these prompts:
  - `copilot-confirm.md`
  - `trade-intent-validator.md`
  - `midday-reset.md`  
  **Tags:** `prompt_engineering`, `consistency`, `performance`  
  **Priority:** P0  

- Add front matter to log files  
  - `/logs/journal/2025-05-05-trading-journal.md`  
  - `/logs/trades/2025-05-05-daily-performance-debrief.md`  
  - `/logs/kb-updates/2025-05-05-kb-update-recommendations.md`  
  Minimal block needed for parsing + archival  
  **Tags:** `infra`, `logs`, `ai_enabled`  
  **Priority:** P0  

- Create standardized input templates with JSON schemas  
  Add structured format for:
  - Trade idea submission
  - Market regime assessment
  - Behavior flag triggers  
  **Tags:** `prompt_engineering`, `structure`, `consistency`  
  **Priority:** P0  

- Add `trigger:`, `last_run:`, and `status:` fields to YAML frontmatter across all prompts  
  **Tags:** `infra`, `metadata`, `automation`  
  **Priority:** P0  

- Add multi-pass validation framework to `copilot.md`  
  Create sequential gates:
  1. Technical alignment
  2. Risk/reward calculation
  3. Behavioral check  
  **Tags:** `validation`, `risk_control`, `discipline`  
  **Priority:** P0  

## P1 – Execution & Validation Enhancements

- Create `trade-intent-validator.md`  
  Pre-trade sanity check with:
  - Alignment with daily plan
  - Objective price-based validation
  - Confidence scoring (0-100)  
  **Tags:** `execution`, `risk_filter`, `discipline`  
  **Priority:** P1  

- Add precise capital enforcement logic to `copilot-confirm.md`  
  Enforce tier-based checks using `trading-capital-profile.md` values  
  **Tags:** `risk_control`, `position_sizing`, `capital_discipline`  
  **Priority:** P1  

- Enhance `trading-behaviors-kb.md` with `behavior_trigger:` and `override_action:` logic  
  **Tags:** `behavior`, `discipline`, `execution`  
  **Priority:** P1  

- Add system-level rule for "Avoidance Zones" (e.g., chop, overlapping macro events, Fed days)  
  **Tags:** `discipline`, `structure`, `risk_filter`  
  **Priority:** P1  

- Add prompt performance tracking system
  Log which prompts lead to profitable vs. unprofitable trades
  **Tags:** `analytics`, `prompt_engineering`, `performance`
  **Priority:** P1

- Improve `copilot.md` logic with tactical checks (e.g., "If SPX breaks level with volume, AND confidence was high…")  
  **Tags:** `execution`, `structure`, `risk_control`  
  **Priority:** P1  

- Add logic to downgrade trade ideas with <2R setups in trade plan  
  **Tags:** `risk_control`, `sizing`, `reward:risk`  
  **Priority:** P1  

- Add flip logic for major level failures (e.g., if SPX breaks support with volume, flag short setup)  
  **Tags:** `structure`, `reversal`, `macro`  
  **Priority:** P1  

- Add `stack_rank:` field to premarket trade plan for real-time prioritization  
  **Tags:** `focus`, `conviction`, `structure`  
  **Priority:** P1  

## P2 – Feedback & Learning Systems

- Create fallback prompt mechanisms
  Design alternative prompt strategies when primary prompts produce low-confidence results
  **Tags:** `prompt_engineering`, `resilience`, `robustness`
  **Priority:** P2

- Add A/B testing framework for prompt comparison
  Create system to compare different prompt versions against same market conditions
  **Tags:** `prompt_engineering`, `analytics`, `optimization`
  **Priority:** P2

- Add explicit journaling rules to SOP (e.g., minimum trade count or PnL thresholds)  
  **Tags:** `review`, `logs`, `discipline`  
  **Priority:** P2  

- Add "Missed Setups" section to `daily-performance-debrief.md`  
  **Tags:** `review`, `learning`, `resilience`  
  **Priority:** P2  

- Add PnL Attribution logic (Structure vs. Impulse) to debrief  
  **Tags:** `review`, `psychology`, `meta-learning`  
  **Priority:** P2  

- Add "Next-Day Hypothesis" field to bridge postmarket and premarket logic  
  **Tags:** `structure`, `review`, `continuity`  
  **Priority:** P2  

- Add `intent_vs_outcome:` scoring to trade log and debrief  
  Separates quality of decision from result for clearer learning  
  **Tags:** `review`, `psychology`, `resilience`  
  **Priority:** P2  

- Add counter-factual analysis for rejected trades
  Track what would have happened if executed
  **Tags:** `analytics`, `learning`, `validation`
  **Priority:** P2

- Add tiering decision logic by trade type (e.g., tier early for swings, late for scalps)  
  **Tags:** `position_sizing`, `discipline`, `structure`  
  **Priority:** P2  

- Automate trade tiering into premarket trade idea output based on confidence/sentiment  
  **Tags:** `execution`, `automation`, `sizing`  
  **Priority:** P2  

## P3 – Documentation & Infrastructure

- Create prompt engineering guide
  Document specific techniques used in high-performing prompts
  **Tags:** `documentation`, `prompt_engineering`, `best_practices`
  **Priority:** P3

- Add visual dependency graph or flow diagram to `system/trading-system-sop.md` showing prompt relationships  
  **Tags:** `infra`, `routing`, `docs`  
  **Priority:** P3  

- Create `prompt-routing-overview.md`  
  Visualize prompt flow across phases (Mermaid/markdown)  
  **Tags:** `docs`, `routing`, `clarity`  
  **Priority:** P3  

- Add output templates  
  `/templates/trade-log.md`, `/templates/kb-entry.md`, `/templates/journal-entry.md`  
  **Tags:** `structure`, `reference`, `UX`  
  **Priority:** P3  

- Refine `description:` fields across all prompts  
  Improve clarity and specificity  
  **Tags:** `docs`, `clarity`  
  **Priority:** P3  

- Add optional `model:` and `behavior_mode:` fields  
  For future AI tuning and prompt tone/role  
  **Tags:** `infra`, `meta`, `behavior`  
  **Priority:** P3  

- Add `writes_to:` field in front matter  
  Clarifies which prompts write to logs or journals  
  **Tags:** `infra`, `clarity`, `structure`  
  **Priority:** P3  

- Add test fixtures  
  Example: `/tests/prompts/copilot-confirm.md`  
  Use markdown format with sample input/output  
  **Tags:** `infra`, `validation`  
  **Priority:** P3  

- Update `requires:` fields in prompts that use behavior flags  
  Add `trading-behaviors-schema.md` to:  
  - `copilot.md`  
  - `midday-reset.md`  
  - `generate-daily-trade-log.md`  
  - `generate-kb-update.md`  
  **Tags:** `infra`, `structure`, `consistency`  
  **Priority:** P3  

# TOMORROW'S TRADING EDGE

Implement these five items before tomorrow's market open to immediately improve performance:

1. Create pre-session commitment document
   - Document exactly which setups you're targeting
   - Define clear entry and exit criteria
   - Set position sizing in advance
   **Tags:** `discipline`, `planning`, `focus`

2. Implement multiple validation gates
   - Require 3 independent confirmations before taking any trade
   - Add explicit checklist to `copilot-confirm.md`
   **Tags:** `validation`, `discipline`, `risk_control`

3. Add fixed position sizing calculator
   - Base sizing on account size, not emotion
   - Add to `trading-capital-profile.md`
   **Tags:** `risk_control`, `sizing`, `discipline`

4. Create time-based filters
   - Only take trades during historically optimal market hours
   - Document in `trading-system-sop.md`
   **Tags:** `timing`, `discipline`, `edge`

5. Add post-trade reflection template
   - Document immediate lessons after each trade
   - Add to `/templates/` directory
   **Tags:** `learning`, `psychology`, `improvement`
```