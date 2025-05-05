---
title: System TODO — Core Architecture  
description: Master list of missing, incomplete, or outdated prompt components in the trading-system-prompts repo  
tags: [system, backlog, architecture, refactor]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.4  
category: system  
usage: Edit during system development or prompt refactor planning. Produces prioritized backlog of tasks. Consumes audit output, architecture changes, and roadmap items.  
status: active  
requires: []  
linked_outputs: []  
input_format: markdown  
output_format: markdown  
ai_enabled: false  
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
- `tags:` standardized across all prompts using `[phase, function, behavior]` taxonomy  
- Front matter normalized for all system and prompt files  
- **All `usage:` fields rewritten and standardized**  
- Fixed front matter and usage for `README.md`, `system/README.md`, `market-regimes.md`, and `main-controller.md`  
- `trading-behaviors-schema.md` created — defines canonical flag structure, reset mapping, and KB entry format  

---

# TODO: CORE FILES TO COMPLETE

- `daily-performance-debrief.md`  
  Postmarket review + self-assessment prompt. Should pull in:  
  - Prior day’s trade log  
  - Behavior flags  
  - Execution quality  
  **Tags:** `postmarket`, `review`, `behavior`  
  **Priority:** P0  

---

# TODO: SYSTEM-WIDE ALIGNMENTS (REPRIORITIZED)

## P0 – Highest Leverage Next

- Add front matter to log files  
  - `/logs/journal/2025-05-05-trading-journal.md`  
  - `/logs/trades/2025-05-05-daily-performance-debrief.md`  
  - `/logs/kb-updates/2025-05-05-kb-update-recommendations.md`  
  Minimal block needed for parsing + archival.  
  **Tags:** `infra`, `logs`, `ai_enabled`

## P1 – Structural Improvements

- Add `writes_to:` field in front matter  
  Clarifies which prompts write to logs or journals  
  **Tags:** `infra`, `clarity`, `structure`

- Add test fixtures  
  Example: `/tests/prompts/copilot-confirm.md`  
  Use markdown format with sample input/output  
  **Tags:** `infra`, `validation`

- Lint `linked_outputs:` and `requires:`  
  Ensure all declared dependencies are actually invoked  
  **Tags:** `infra`, `accuracy`

- Update `requires:` fields in prompts that use behavior flags  
  Add `trading-behaviors-schema.md` to:  
  - `copilot.md`  
  - `midday-reset.md`  
  - `generate-daily-trade-log.md`  
  - `generate-kb-update.md`  
  **Tags:** `infra`, `structure`, `consistency`

## P2 – System Navigation + Templates

- Create `prompt-routing-overview.md`  
  Visualize prompt flow across phases (Mermaid/markdown)  
  **Tags:** `docs`, `routing`, `clarity`

- Add output templates  
  `/templates/trade-log.md`, `/templates/kb-entry.md`, `/templates/journal-entry.md`  
  **Tags:** `structure`, `reference`, `UX`

## P3 – Documentation Polish + Metadata Extensions

- Refine `description:` fields across all prompts  
  Improve clarity and specificity  
  **Tags:** `docs`, `clarity`

- Add optional `model:` and `behavior_mode:` fields  
  For future AI tuning and prompt tone/role  
  **Tags:** `infra`, `meta`, `behavior`