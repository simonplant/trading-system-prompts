# Intent Trader System Specification

## 1. Purpose & Philosophy

To build a real-world, high-performance AI system for:

* Synthesizing chaotic trading data into edge-aligned actions
* Filtering, ranking, and validating day and swing trade setups
* Enforcing disciplined execution based on DP/Mancini principles
* Preserving capital while scaling into asymmetric opportunities
* Delivering outcome-based performance via adaptive coaching

> *Trade like water. Execute like a machine. Learn like a human.*

## 2. System Identity

* **Name**: Intent Trader System
* **Repo**: `intent-trader`
* **Role Model**: Not a chatbot or prompt stack—a real-time, outcome-bound, role-based agent:

  * **Scout**: Scans transcripts, charts, alerts, news
  * **Strategist**: Aligns setups with market regime and capital allocation
  * **Risk Manager**: Enforces size, cooldown, and stop logic
  * **Coach**: Tracks behavior, reviews execution, demands discipline
  * **Profit Hunter**: Finds asymmetric R opportunities and pings when to act

## 3. Execution Model: 80/20 Trading Philosophy

**Baseline**: Daily Mancini-style edge exploitation (level-to-level) **Breakout**: DP-style big trades sized aggressively (2x)

* Consistency > Prediction
* Confidence > Frequency
* Logs > Emotions

## 4. Trade Types

| Type          | Size    | Purpose                   | Notes                         |
| ------------- | ------- | ------------------------- | ----------------------------- |
| `big-idea`    | \$66K   | DP-tier, double-sized     | 1–2 per week, swing/day       |
| `breadwinner` | \$33K   | Core setups, edge-aligned | 3–5 per week, managed tightly |
| `cashflow`    | \$5–15K | Fast scalps               | Optional, only if clean       |

## 5. Workflow by Phase

### Premarket

* `/dp-analysis` + `/mancini-analysis`
* `/unified-plan` for overlapping setups
* `/levels-ma-check` for 8d–200d MAs
* `/plan-orders` with tiered sizing

### Intraday

* `/validate-trade` before submission
* `/log-trade` logs reason and plan
* `/check-alerts` for any triggered edge

### Postmarket

* `/compare-execution` plan vs fills
* `/performance-coach` behavioral review
* `/missed-trades` A+ setups skipped

## 6. Prompt Metadata Standard

```yaml
---
title: Validate Trade Entry
description: Validates a proposed trade against system edge and risk rules
phase: intraday
route: /validate-trade
output: raw
style:
  decorate: false
  emojis: false
  tone: direct
  format: text/plain
tags: [validation, execution, behavioral, trade]
version: 2.0
---
```

> ✅ Enforced globally via controller and metadata validator

## 7. Behavioral Coaching Engine

* **Red Tags**: Oversize, revenge, FOMO, hesitation, unplanned trades
* **Green Tags**: Took best setup, sized correctly, honored plan
* **Metrics**:

  * Win rate by setup
  * Size efficiency
  * Plan adherence
  * Behavior tags

## 8. Analytics & Performance

| Metric                  | Purpose                                              |
| ----------------------- | ---------------------------------------------------- |
| Daily P\&L, R-multiple  | Validate strategy                                    |
| Tag breakdown           | Behavior tracking                                    |
| Missed A+ opportunities | Core KPI                                             |
| Trade type distribution | Balance across `big-idea`, `breadwinner`, `cashflow` |

## 9. Repository Structure (Refactor Plan)

```plaintext
intent-trader/
├── prompts/
│   ├── premarket/
│   ├── intraday/
│   ├── postmarket/
│   └── system/
├── system/
│   ├── controller.md
│   ├── spec.md
│   ├── config.json
│   └── metadata-style.md
├── data/
├── logs/
├── README.md
```

## 10. Roadmap

### Phase 1

* Rename and refactor to `intent-trader`
* Update prompt metadata and controller routing
* Enforce no decoration / emoji rule globally

### Phase 2

* Add visual dashboards
* Swing tracker with add/trim levels
* Alerting engine for level breaches, DP/VTF/Mancini

### Phase 3

* Integrate chat summarizers
* AI-based missed trade classifier
* Behavior model auto-tagging

> You don’t need more information. You need better **outcomes**. Intent Trader gets you there.
