---
title: Trading System TODO — Rationalized Logging and Analysis Refactor
description: Refactored backlog aligned to logging, optimization, ingestion, and coaching workflows
tags: [system, backlog, architecture, refactor]
author: Simon Plant
last_updated: 2025-05-09
version: 1.22
category: system
---

# ✅ ACTIVE TODO: ENHANCEMENTS FOR NEXT 7 DAYS

## 🔴 P0 – JSON Log Refactor + Controller Simplification

- [ ] Migrate all logs to strict JSON:
  - `logs/trades/*.json`
  - `logs/performance/*.json`
  - `logs/plan-performance/*.json`
- [ ] Implement schema validation (`schema-validator.js`)
- [ ] Add `/summarize-log` command:
  - Input: `.json` file
  - Output: human-readable markdown
- [ ] Deprecate `copilot-*` prompts
  - Replace with: `/validate-trade`, `/watch-trade`

## 🟠 P1 – Ingestion + Optimizer Tools

- [ ] Build `/inner-circle-ingest` prompt:
  - Extract DP, Rickman, Kira ideas + trader chat reactions
- [ ] Build `/optimize-trade` prompt:
  - Compares actual trade vs. idealized execution
- [ ] Add `/missed-setup` to flag untraded but valid ideas
- [ ] Create SPX-proxy OCO logic for Mancini FBD setups

## 🟡 P2 – Weekly and Historical Insights

- [ ] Add `/weekly-review` to roll up:
  - Best/worst trades
  - Common behavioral issues
  - Setup win rates
- [ ] Add `retrospectives/` folder
- [ ] Tag `behavioral_violations` from optimizer into KB
- [ ] Implement `trade_id` and `plan_id` linking across logs

## 🟢 P3 – Schema and Infra Improvements

- [ ] Create new schemas:
  - `trade-log.schema.json`
  - `plan-performance.schema.json`
  - `inner-circle.schema.json`
  - `retrospective.schema.json`
- [ ] Add schema versioning and log versioning
- [ ] Add auto-validation script for daily schema compliance

# ✅ COMPLETED

- [x] Premarket pipeline implemented
- [x] Central controller routing active
- [x] Inner Circle DP levels captured manually
