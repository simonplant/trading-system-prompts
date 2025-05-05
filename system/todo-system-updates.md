---
title: System TODO — Core Architecture  
description: Master list of missing, incomplete, or outdated prompt components in the trading-system-prompts repo  
tags: [system, backlog, architecture, refactor]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.2  
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
- Front matter normalized for all system and prompt files (`version`, `last_updated`, `status`, etc.)

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

# TODO: SYSTEM-WIDE ALIGNMENTS (PRIORITIZED)

## P0 – Must Fix Immediately

- ⛔  Add front matter to log files  
  - `/logs/journal/2025-05-05-trading-journal.md`  
  - `/logs/trades/2025-05-05-daily-performance-debrief.md`  
  - `/logs/kb-updates/2025-05-05-kb-update-recommendations.md`  
  These cannot be AI-processed or indexed without `title`, `category`, and `ai_enabled`.  
  **Tags:** `infra`, `parsing`, `logs`

- 🧠 Create `trading-behaviors-schema.md`  
  Document canonical behavior flags, formats, triggers, and resolution patterns.  
  Enables consistent updates from Copilot, Reset, Debrief.  
  **Tags:** `behavior`, `structure`, `docs`

- 🧼 Lint and validate `linked_outputs:` and `requires:` across all prompt files  
  Prevents missing or broken prompt references during prompt execution.  
  **Tags:** `infra`, `accuracy`

## P1 – High Leverage Consistency

- 🔍 Standardize all `usage:` fields  
  Adopt structured format:  
  `Run [when]. Produces [output]. Consumes [inputs or context].`  
  15+ files affected.  
  **Tags:** `consistency`, `docs`

- 📤 Add `writes_to:` field in front matter  
  Clarifies prompt output targets (e.g. logs, journals, exports)  
  Example:  
  ```yaml
  writes_to: logs/trades/YYYY-MM-DD-daily-trade-log.md
  ```  
  **Tags:** `infra`, `clarity`, `structure`

- 🧪 Add test fixtures for prompts  
  Add `/tests/prompts/copilot-confirm.md` with input/output examples  
  Use markdown format for validation cases.  
  **Tags:** `infra`, `quality`

## P2 – Structure + UX Clarity

- 🧩 (Optional) Modularize `copilot.md` into atomic prompt files  
  Split `scout`, `confirm`, `debrief`, `recenter`, `lockout` into modular prompts  
  Update router logic inside `copilot.md`.  
  **Tags:** `reuse`, `routing`, `clarity`

- 📈 Create `prompt-routing-overview.md`  
  Mermaid diagram showing flow across Unified Plan → Copilot → Reset → Debrief → KB  
  Adds architectural transparency.  
  **Tags:** `docs`, `structure`, `clarity`

- 📎 Add output templates to `/templates/`  
  - `trade-log.md`, `kb-entry.md`, `journal-entry.md`  
  Improves output consistency and reference for generation prompts  
  **Tags:** `consistency`, `UX`, `docs`

## P3 – Documentation Polish + Futureproofing

- 🎯 Rewrite weak `description:` fields  
  Ensure every prompt has a crisp, useful, informative purpose line  
  **Tags:** `docs`, `clarity`

- 🧠 Add `model:` (optional field) to prompts  
  Specify LLM compatibility or prompt tuning if needed (`gpt-4`, `claude`, etc.)  
  **Tags:** `infra`, `futureproof`

- 🧠 Add `behavior_mode:` field for future experiments  
  Values: `strict`, `reflective`, `coaching` — to change tone or role of LLM assistant  
  **Tags:** `AI meta`, `behavior`, `customization`