---
title: Trading System Standard Operating Procedures
description: Comprehensive SOP for operating the AI-assisted trading system
tags: [system, SOP, process, workflow]
author: Simon Plant
last_updated: 2025-05-08
version: 2.2
category: system
usage: Reference guide for daily system operation. Follow these procedures exactly to ensure consistent execution and performance tracking.
status: active
requires: [system-parameters.md, trading-behaviors-kb.md, main-controller.md]
linked_outputs: []
input_format: markdown
output_format: markdown
ai_enabled: false
---

# Trading System Standard Operating Procedures

## Overview

This document outlines the standard operating procedures for the AI-assisted trading system. These procedures should be followed precisely to ensure consistent execution, proper risk management, and accurate performance tracking. **All commands must be routed through the main controller.**

## System Architecture

The trading system employs a modular architecture with these specialized components:

1. **Controller** - Central command router and EXCLUSIVE entry point (main-controller.md)
2. **Analyzers** - Process raw data and output structured JSON
3. **Summary Generators** - Convert JSON to human-readable formats
4. **Knowledge Bases** - Store persistent trading knowledge and behaviors
5. **Executors** - Guide actual trade execution and management

## Data Flow Architecture

The system employs a strict two-tier data flow architecture:

```
Raw Input → Analyzers → [JSON] → Integration Points → Summary Generators → Human Output
                          ↓
                    System Storage
```

### System Tier (JSON)
- Structured data for machine processing
- Strict schema enforcement
- Used for downstream processing

### Human Tier (Summaries)
- Generated from system tier data
- Optimized for readability
- Does not feed back into system processes

## Daily Workflow

### 1. Premarket (6:00 AM - 9:20 AM ET)

#### System Setup
- [ ] Check system status: `/system-status`
- [ ] Ensure all system components are available
- [ ] Review parameters: `/show-charter`

#### Data Collection & Analysis
- [ ] Process DP's morning call: `/analyze-dp`
  ```
  /analyze-dp
  Transcript:
  [paste transcript here]
  ```
- [ ] Generate human-readable DP summary: `/dp-summary`
- [ ] Process Mancini's blueprint: `/analyze-mancini`
  ```
  /analyze-mancini
  Content:
  [paste Mancini content here]
  ```
- [ ] Generate human-readable Mancini summary: `/mancini-summary`
- [ ] Extract key moving averages: `/get-sma`
  ```
  /get-sma
  Tickers: SPY,QQQ,IWM,AAPL,MSFT,NVDA,TSLA
  ```
- [ ] Extract critical price levels: `/get-levels`
  ```
  /get-levels
  Indices: ES,SPX,NDX,QQQ,VIX
  ```

#### Integration & Trade Planning
- [ ] Generate unified trade plan: `/premarket-sequence` or `/generate-trade-plan`
  ```
  /generate-trade-plan
  DP: [reference DP JSON]
  Mancini: [reference Mancini JSON]
  Levels: [reference levels data]
  SMA: [reference SMA data]
  ```
- [ ] Review complete trade plan: `/show-trade-plan`
- [ ] Set up watchlists and alerts for key levels

### 2. Market Open (9:30 AM - 10:30 AM ET)

- [ ] Observe opening price action for first 5-15 minutes
- [ ] Compare actual price action to anticipated scenarios
- [ ] Execute priority trades identified in premarket if conditions met
  ```
  /copilot-confirm
  Ticker: [symbol]
  Direction: [LONG/SHORT]
  Entry: [price or condition]
  Setup: [setup type]
  Context: [current market context]
  ```
- [ ] Apply the confirmation requirements (from Addendum) before entering puts
- [ ] Implement the Macro Headline Risk Protocol if relevant

### 3. Morning Session (10:30 AM - 12:00 PM ET)

- [ ] Activate trading copilot: `/copilot`
- [ ] Monitor priority setups and levels from unified plan
- [ ] Scan for setups matching criteria: `/copilot-scout`
  ```
  /copilot-scout
  Setup: [setup type]
  Bias: [directional bias]
  Sector: [optional sector focus]
  ```
- [ ] Validate potential trades against plan: `/copilot-confirm`
- [ ] Take planned exits at target levels
- [ ] Adjust stops according to market behavior
- [ ] Review completed trades: `/copilot-debrief`
  ```
  /copilot-debrief
  Trade: [ticker and direction]
  Entry: [entry price]
  Exit: [exit price]
  Result: [profit/loss]
  Observations: [brief notes]
  ```

### 4. Midday Reset (12:00 PM - 1:00 PM ET)

- [ ] Run midday review and plan adjustment: `/midday-reset`
  ```
  /midday-reset
  Morning Trades: [brief summary]
  Open Positions: [current positions]
  Market Development: [how market evolved]
  ```
- [ ] Reduce size during typical midday chop (11:30 AM - 2:00 PM)
- [ ] Monitor for moderator sentiment flips (apply Sentiment Flip Rule)

### 5. Afternoon Session (1:00 PM - 3:30 PM ET)

- [ ] Focus on high-probability setups from updated plan
- [ ] Apply stricter confirmation criteria for new positions
- [ ] Adjust for changes in market regime or volatility
- [ ] Re-focus trading priorities: `/copilot-recenter`
  ```
  /copilot-recenter
  Current State: [brief assessment]
  Priority Shifts: [what to focus on]
  Risk Adjustments: [size changes]
  ```
- [ ] Begin reducing overall exposure as appropriate

### 6. Market Close (3:30 PM - 4:00 PM ET)

- [ ] Manage closing positions based on day structure
- [ ] Document final market levels and technical closes
- [ ] Run quick review of completed trades: `/copilot-debrief`
- [ ] Prepare for postmarket analysis

### 7. Postmarket (4:00 PM - 6:00 PM ET)

- [ ] Record all trades: `/generate-trade-log`
  ```
  /generate-trade-log
  Date: [YYYY-MM-DD]
  Trades: [list of executed trades]
  Notes: [additional observations]
  ```
- [ ] Analyze trading results: `/performance-debrief`
- [ ] Compare execution against plan: `/performance-vs-mancini`
  ```
  /performance-vs-mancini
  Plan: [reference to day's trade plan]
  Actual: [reference to trade log]
  ```
- [ ] Create journal entry: `/generate-journal`
  ```
  /generate-journal
  Emotional State: [honest assessment]
  Market Summary: [brief market description]
  Behavioral Flags: [any triggers noticed]
  Key Lesson: [main takeaway]
  ```
- [ ] Log behavioral patterns or insights: `/log-kb`
  ```
  /log-kb
  Pattern: [behavior observed]
  Category: [type of pattern]
  Mitigation: [how to address]
  ```
- [ ] Generate knowledge base updates: `/generate-kb-update`
- [ ] Export journal entry to markdown: `/export-journal`

## Command Workflow Reference

### Premarket Command Sequence

| Phase | Command | Purpose |
|-------|---------|---------|
| 1 | `/system-status` | Verify system readiness |
| 2 | `/analyze-dp` | Process DP Morning Call transcript |
| 3 | `/dp-summary` | Generate human-readable DP summary |
| 4 | `/analyze-mancini` | Process Mancini Blueprint data |
| 5 | `/mancini-summary` | Generate human-readable Mancini summary |
| 6 | `/get-sma` | Get daily SMA data for key tickers |
| 7 | `/get-levels` | Extract market levels for indices |
| 8 | `/generate-trade-plan` | Generate unified plan from all sources |
| Alt | `/premarket-sequence` | Run complete premarket workflow in one step |

### Intraday Command Sequence

| Phase | Command | Purpose |
|-------|---------|---------|
| 1 | `/copilot` | Activate intraday trading copilot |
| 2 | `/copilot-scout` | Scan for setups matching criteria |
| 3 | `/copilot-confirm` | Validate potential trade against plan |
| 4 | `/copilot-debrief` | Quick review of completed trade |
| 5 | `/midday-reset` | Mid-session review and plan adjustment |
| 6 | `/copilot-recenter` | Reset focus during trading day |

### Postmarket Command Sequence

| Phase | Command | Purpose |
|-------|---------|---------|
| 1 | `/generate-trade-log` | Create structured log of today's trades |
| 2 | `/performance-debrief` | Analyze today's trading performance |
| 3 | `/performance-vs-mancini` | Compare execution vs plan and Mancini |
| 4 | `/generate-journal` | Create trading journal entry |
| 5 | `/log-kb` | Log a behavioral pattern or insight |
| 6 | `/generate-kb-update` | Generate KB update recommendations |
| 7 | `/update-behaviors` | Update trading behaviors knowledge base |
| 8 | `/export-journal` | Export journal entry to markdown |
| Alt | `/postmarket-sequence` | Run complete postmarket workflow in one step |

## JSON Data Flow Requirements

### Analyzer Output Validation

When using analyzer commands (e.g., `/analyze-dp`, `/analyze-mancini`):

1. Verify the output is valid JSON with proper structure
2. Check for required fields and proper data types 
3. If JSON is invalid or incomplete:
   - Check input data quality
   - Re-run analyzer with corrected input
   - If error persists, use `/debug-system` to diagnose issues

### Summary Generator Usage

After successful analyzer runs:

1. Use summary generators to create human-readable reports
   - `/dp-summary` for DP analysis
   - `/mancini-summary` for Mancini analysis
2. Review summaries for completeness and accuracy
3. Use these summaries for human decision-making only

### Unified Plan Generation

When generating the unified trade plan:

1. Ensure both analyzer JSONs are available and valid
2. Run `/generate-trade-plan` with all data sources or use `/premarket-sequence`
3. Verify the plan contains all priority trade ideas
4. Check that key levels are correctly integrated
5. Confirm risk management rules are properly applied

## Error Handling Procedures

### Missing or Invalid JSON

If analyzer JSON output is missing or invalid:

1. Check analyzer input for missing data or formatting issues
2. Re-run the analyzer with corrected input
3. If error persists, run `/debug-system` for detailed diagnostics
4. Use last known good configuration as fallback
5. Do not hallucinate missing data - explicitly note missing components

### Data Integration Failures

If the unified plan generator fails:

1. Use `/debug-system` to identify the specific issue
2. Validate input JSON structures
3. Re-run with validated inputs
4. If unresolvable, manually document trade ideas from summaries
5. Flag this as a system failure in logs

## Risk Management Protocols

### Confirmation Requirements Before Entering Puts

- Do not initiate short-biased trades (especially puts) without one of these confirmations:
  - Rejection candle off a planned resistance zone on the 15m or 34 EMA
  - Failed breakout (wick above level with full reversal close)
  - Moderator confirmation (DP actively trimming or flipping)

- Use tiered entries: no full-size entry until confirmation + retest
- If market behavior shifts due to macro headline or political speech, suspend execution until a new technical level is validated

### Macro Headline Risk Protocol

On days with active macro headlines (Fed speakers, geopolitical events, presidential statements):

- Cap initial size at 1/3 normal risk
- Require confirmation before any directional bias trades
- Monitor DP/Kira sentiment shift carefully — if DP flips, flatten
- Do not hold trades initiated on macro thesis through key speech windows

### Sentiment Flip Rule (Moderator-Reversal Protocol)

If Inner Circle leaders (DP, Rickman, Kira) flip sentiment intraday:

- Log exact time, instrument, and price
- If you are on the opposite side:
  - Flatten, reduce, or hedge within 15 minutes
  - Document rationale if staying in trade against the flip

Rationale: These flips often signal end-of-move or trap setups.

## Performance Tracking

### Trade Logging Requirements

All trades must be logged with:

- Entry and exit prices and times
- Position size and direction
- Planned vs. actual execution
- Reasons for entry and exit
- Technical levels that triggered action
- Profit/loss amount and percentage
- Emotional state during trade
- Adherence to trade plan (scale 1-10)

### System Performance Metrics

Track these metrics daily:

- Win rate (% of profitable trades)
- Profit factor (gross profit / gross loss)
- Average win vs. average loss
- Largest win and largest loss
- Drawdown (intraday and cumulative)
- Adherence to system score (1-10)
- Emotional control score (1-10)
- Number of unplanned trades

## System Maintenance

### Daily Tasks

- [ ] Back up all trade logs and journal entries
- [ ] Update knowledge base with new observations
- [ ] Document any system issues or failures
- [ ] Sync local files with git repository

### Weekly Tasks

- [ ] Review all journal entries for patterns
- [ ] Update trading behaviors knowledge base
- [ ] Assess system performance metrics
- [ ] Refine risk management parameters
- [ ] Clean up data storage

### Monthly Tasks

- [ ] Conduct full system performance review
- [ ] Update system parameters based on market conditions
- [ ] Refine analyzer extraction rules
- [ ] Improve trade plan generation logic
- [ ] Test system with historical data using `/replay-day`

## CHANGELOG

- v2.2 (2025-05-08): Integrated controller-based command structure, added command sequence tables, incorporated risk protocols from addendum, updated JSON validation procedures
- v2.1 (2025-05-05): Updated to reflect JSON-based data flow architecture and separation of analyzer/summary components
- v2.0 (2025-04-01): Initial SOP documentation
