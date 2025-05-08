---
title: Trading System TODO — Streamlined Enhancements  
description: Prioritized list of trading system improvements  
tags: [system, backlog, architecture, refactor]  
author: Simon Plant  
last_updated: 2025-05-07  
version: 1.21  
category: system  
usage: Edit during system development or prompt refactor planning.  
status: active  
requires: []  
linked_outputs: []  
input_format: markdown  
output_format: markdown  
ai_enabled: false  
---

# ACTIVE TODO: SYSTEM ENHANCEMENTS

## P0 – Highest Leverage

- **Unify all prompt routing through `main-controller.md`**
  - Enforce routing across ALL prompt types (premarket, intraday, postmarket, system)
  - Reject direct prompt use unless explicitly routed
  - Flag malformed inputs and avoid fallbacks
  - Add explicit error handling to controller

- **Improve `dp-trade-analyzer.md` and `mancini-trade-analyzer.md`**
  - Add tiering and expiry logic for DP
  - Parse sentiment quotes and macro callouts
  - Mancini: Add structured FBD/FBO tree and profit protection guidance

- **Fix unified plan generator**
  - Stack-rank confidence properly
  - Align expiry logic per source
  - Use IF > THEN format uniformly
  - Require trade idea sources + stops/targets/size for validation

- **Align prompt schemas and validation**
  - Use `schema-validator.js` in analyzer output steps
  - Normalize enum capitalization (e.g., CASHFLOW vs. Cashflow)
  - Ensure required fields match schema

- **Rationalize system/ folder**
  - Group files into: /schemas, /templates, /kb, /config
  - Update all references across repo
  - Do not implement now — see "Planned Changes" below

## P1 – Tactical Execution Enhancements

- **Fix broken system routes in `main-controller.md`**
  - Create missing prompt files:
    - `prompts/system/help.md` – explain controller routing, command syntax, and entry phases
    - `prompts/system/system-status.md` – call or alias `/debug-system` report
  - Validate all routed file paths exist on init
  - Prevent broken routes via precheck or fallback

- Create `trade-intent-validator.md`
  - Sanity check for emotional trades or off-plan entries

- Add `intent_vs_outcome:` scoring to trade log

- Add "Missed Setups" section to `daily-performance-debrief.md`

- Add front matter and versioning to logs

## P2 – Infrastructure + Docs

- Add system architecture diagram to `/docs/architecture/`
- Add usage examples to `/docs/usage/` by command
- Move `unified-trade-plan-template.md` into `/system/templates/`
- Refactor `README.md` into 2 sections: Bootstrap + Commands

---

# PLANNED CHANGES (Not Yet Scheduled)

- **System folder restructure**
  - `/system/schemas` → schema files (e.g., trade-idea.schema.json)
  - `/system/templates` → prompt and output templates
  - `/system/kb` → behaviors, setups, regimes
  - `/system/config` → parameters, routing tables
  - Update all paths and references
  - Requires coordination across CLI + JS utilities

- **Confluence logic for SPX/ES levels**
  - Score level overlap between Mancini, DP, MAs
  - Rank level confidence for visual and summary outputs

---

# COMPLETED (2025-05)

- Enforced main-controller routing across premarket flows
- Cleaned up and enforced fallback handling
- Validated JSON output formats in premarket analyzers
- Created visual routing diagram in `/docs/architecture/`
- Added bootstrap instructions to repo root README