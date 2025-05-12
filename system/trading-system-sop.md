---
title: Optimized Trading System Standard Operating Procedures  
description: Enhanced comprehensive SOP for operating the AI-assisted trading system with improved validation, integration, and feedback mechanisms
tags: [system, SOP, process, workflow, optimization]  
author: Simon Plant  
last_updated: 2025-05-12  
version: 3.0  
category: system  
usage: Reference guide for daily system operation. Follow these procedures exactly to ensure consistent execution and performance tracking. Enhanced with improved validation, integration, and feedback mechanisms.
status: active  
requires: [system-parameters.json, trading-behaviors-kb.md, trade-setups-kb.md, market-regimes.md, main-controller.md]  
linked_outputs: [daily-trade-plan, trade-journal, performance-dashboard]  
input_format: markdown  
output_format: markdown  
ai_enabled: false
---

# Optimized Trading System Standard Operating Procedures

## Overview

This document outlines the enhanced standard operating procedures for the AI-assisted trading system. These procedures should be followed precisely to ensure consistent execution, proper risk management, and accurate performance tracking. **All commands must be routed through the main controller.**

## System Architecture

The trading system employs a modular architecture with these specialized components:

1. **Controller** - Central command router and EXCLUSIVE entry point (main-controller.md)
2. **Analyzers** - Process raw data and output structured JSON
3. **Summary Generators** - Convert JSON to human-readable formats
4. **Knowledge Bases** - Store persistent trading knowledge and behaviors
5. **Executors** - Guide actual trade execution and management

## Data Flow Architecture

The system employs a strict two-tier data flow architecture with formal validation:

```
Raw Input → Analyzers → [JSON Validation] → [JSON Storage] → Integration Points → Summary Generators → Human Output
                                              ↓                                     ↑
                                        System Storage                        Validation Check
```

### System Tier (JSON)
- Structured data for machine processing
- Strict schema enforcement and validation
- Used for downstream processing
- Schema version tracking and compatibility checks

### Human Tier (Summaries)
- Generated from system tier data
- Optimized for readability
- Cross-validated with system tier data
- Does not feed back into system processes

## Daily Workflow

### 1. System Initialization (5:30 AM - 6:00 AM ET)

#### System Status Verification
- [ ] Check system status: `/system-status`
- [ ] Ensure all system components are available
- [ ] Verify all data sources are accessible
- [ ] Review charter and parameters: `/show-charter`
- [ ] Check for any overnight system updates
- [ ] Verify JSON schema compatibility

#### Market Regime Classification
- [ ] Determine current market regime: `/classify-regime`
  ```
  /classify-regime
  Indices: [current index levels]
  VIX: [current VIX]
  Breadth: [advance/decline ratio]
  Context: [major news/events]
  ```
- [ ] Review allowed setup types for this regime
- [ ] Set appropriate position sizing limits based on regime
- [ ] Document regime-specific risk protocols to apply

### 2. Premarket Data Collection & Analysis (6:00 AM - 8:00 AM ET)

#### DP Analysis
- [ ] Process DP's morning call: `/analyze-dp`
  ```
  /analyze-dp
  Transcript:
  [paste transcript here]
  ```
- [ ] Validate DP JSON output for completeness and structure
- [ ] Flag any data quality issues or ambiguities
- [ ] Generate human-readable DP summary: `/dp-summary`
- [ ] Cross-check emphasis patterns and conviction classifications
- [ ] Document behavioral flags and position context

#### Mancini Analysis
- [ ] Process Mancini's blueprint: `/analyze-mancini`
  ```
  /analyze-mancini
  Content:
  [paste Mancini content here]
  ```
- [ ] Validate Mancini JSON output for required fields
- [ ] Check for acceptance pattern details and time requirements
- [ ] Generate human-readable Mancini summary: `/mancini-summary`
- [ ] Verify Failed Breakdown components are complete
- [ ] Ensure decision tree logic is properly structured

#### Technical Level Collection
- [ ] Extract key moving averages: `/get-sma`
  ```
  /get-sma
  Tickers: SPY,QQQ,IWM,AAPL,MSFT,NVDA,TSLA
  ```
- [ ] Validate SMA data for accuracy and completeness
- [ ] Identify SMA clusters for potential support/resistance
- [ ] Extract critical price levels: `/get-levels`
  ```
  /get-levels
  Indices: ES,SPX,NDX,QQQ,VIX
  ```
- [ ] Document premarket ranges and gap conditions
- [ ] Flag any unusual technical conditions

### 3. Trade Plan Generation & Validation (8:00 AM - 9:00 AM ET)

#### Individual Setup Classification & Scoring
- [ ] Classify each potential trade using standard taxonomy
- [ ] Score each setup using the official scoring system:
  - Primary Setup: 3 points
  - Secondary Aligned Setup: 2 points
  - Tertiary Aligned Setup: 1 point
  - Setup Conflicts: -1 point per conflict
- [ ] Verify regime compatibility for each setup
- [ ] Flag setups scoring 5+ points for priority

#### Risk Protocol Application
- [ ] Apply Confirmation Requirements for puts/shorts
- [ ] Implement Macro Headline Risk Protocol if applicable
- [ ] Incorporate Sentiment Flip Rule instructions
- [ ] Cross-reference trades against behavioral flags
- [ ] Apply position sizing matrix based on setup/regime/conviction

#### Interaction Effects Analysis
- [ ] Identify correlated trade opportunities
- [ ] Check for potential sector concentration
- [ ] Assess portfolio impact of concurrent trades
- [ ] Document potential hedge relationships
- [ ] Flag potentially conflicting directional exposure

#### Unified Plan Generation
- [ ] Generate unified trade plan: `/generate-trade-plan`
  ```
  /generate-trade-plan
  Regime: [reference to regime JSON]
  DP: [reference to DP JSON]
  Mancini: [reference to Mancini JSON]
  Levels: [reference to levels data]
  SMA: [reference to SMA data]
  ```
- [ ] Validate plan against JSON schema
- [ ] Verify all risk protocols are properly applied
- [ ] Ensure explicit setup classification tagging
- [ ] Check for proper position sizing guidance
- [ ] Perform final cross-validation with source data

#### Plan Review & Preparation
- [ ] Review complete trade plan: `/show-trade-plan`
- [ ] Verify primary watchlist prioritization logic
- [ ] Set up watchlists and alerts for key levels
- [ ] Prepare logging templates for planned trades
- [ ] Document any known potential behavioral triggers
- [ ] Schedule any planned order entries/exits based on optimal windows

### 4. Market Open (9:30 AM - 10:30 AM ET)

- [ ] Observe opening price action for first 5-15 minutes
- [ ] Compare actual price action to anticipated scenarios
- [ ] Check for any pre-open news or catalysts
- [ ] Execute priority trades identified in premarket if conditions met
  ```
  /copilot-confirm
  Ticker: [symbol]
  Direction: [LONG/SHORT]
  Entry: [price or condition]
  Setup: [setup type]
  Tag: [standardized tag]
  Regime: [current regime]
  Context: [current market context]
  ```
- [ ] Apply the confirmation requirements (from Risk Protocols) before entering puts
- [ ] Implement the Macro Headline Risk Protocol if relevant
- [ ] Document all trade executions with standardized tags
- [ ] Log emotional state at time of execution (1-10 scale)

### 5. Morning Session (10:30 AM - 12:00 PM ET)

- [ ] Activate trading copilot: `/copilot`
- [ ] Monitor priority setups and levels from unified plan
- [ ] Scan for setups matching criteria: `/copilot-scout`
  ```
  /copilot-scout
  Setup: [setup type]
  Tag: [standardized tag]
  Bias: [directional bias]
  Sector: [optional sector focus]
  ```
- [ ] Validate potential trades against plan: `/copilot-confirm`
- [ ] Take planned exits at target levels
- [ ] Apply tiered exit strategy based on setup type
- [ ] Adjust stops according to market behavior
- [ ] Document any plan deviations with rationale
- [ ] Review completed trades: `/copilot-debrief`
  ```
  /copilot-debrief
  Trade: [ticker and direction]
  Entry: [entry price]
  Exit: [exit price]
  Result: [profit/loss]
  Setup: [standardized tag]
  Plan Adherence: [1-10 scale]
  Emotional State: [1-10 scale]
  Observations: [brief notes]
  ```

### 6. Midday Reset (12:00 PM - 1:00 PM ET)

#### Plan Invalidation Check
- [ ] Check for plan invalidation triggers:
  - SPX breaking key decision point level
  - VIX moving +/- 10% from open
  - Macro headline during session
  - Inner Circle moderator sentiment flip
  - Two consecutive failed setups
- [ ] Run midday review if any triggers hit: `/midday-reset`
  ```
  /midday-reset
  Morning Trades: [brief summary with tags]
  Open Positions: [current positions]
  Market Development: [how market evolved]
  Invalidation Triggers: [which triggers were hit]
  ```

#### Midday Adjustments
- [ ] Reduce size during typical midday chop (11:30 AM - 2:00 PM)
- [ ] Monitor for moderator sentiment flips (apply Sentiment Flip Rule)
- [ ] Update watchlists based on developing setups
- [ ] Reassess risk parameters based on morning performance
- [ ] Document any behavioral flags triggered in morning session

### 7. Afternoon Session (1:00 PM - 3:30 PM ET)

- [ ] Focus on high-probability setups from updated plan
- [ ] Apply stricter confirmation criteria for new positions
- [ ] Adjust for changes in market regime or volatility
- [ ] Re-focus trading priorities: `/copilot-recenter`
  ```
  /copilot-recenter
  Current State: [brief assessment]
  Priority Shifts: [what to focus on]
  Risk Adjustments: [size changes]
  Setup Performance: [which setups are working]
  ```
- [ ] Track setup-specific performance during the session
- [ ] Begin reducing overall exposure as appropriate
- [ ] Apply proper scale-out rules for afternoon trades
- [ ] Document any pattern recognition insights

### 8. Market Close (3:30 PM - 4:00 PM ET)

- [ ] Manage closing positions based on day structure
- [ ] Document final market levels and technical closes
- [ ] Run quick review of completed trades: `/copilot-debrief`
- [ ] Flag any overnight position considerations
- [ ] Note any discrepancies between actual vs. planned execution
- [ ] Record final emotional state and plan adherence metrics
- [ ] Document any trades being held overnight with rationale

### 9. Postmarket Analysis (4:00 PM - 6:00 PM ET)

#### Trade Documentation
- [ ] Record all trades with complete metadata: `/generate-trade-log`
  ```
  /generate-trade-log
  Date: [YYYY-MM-DD]
  Trades: [list of executed trades with standardized tags]
  Setup Types: [list of setup types used]
  Plan Adherence: [overall score 1-10]
  Emotional Control: [overall score 1-10]
  Notes: [additional observations]
  ```

#### Performance Analysis
- [ ] Analyze trading results by setup type: `/performance-debrief`
  ```
  /performance-debrief
  BySetup: true
  ByTimeOfDay: true
  ByMarketRegime: true
  ByConvictionLevel: true
  ```
- [ ] Compare execution against plan: `/performance-vs-mancini`
  ```
  /performance-vs-mancini
  Plan: [reference to day's trade plan]
  Actual: [reference to trade log]
  MissedOpportunities: true
  ExecutionQuality: true
  ```
- [ ] Identify setup-specific win rates and R:R ratios
- [ ] Document time-of-day performance patterns
- [ ] Analyze behavioral pattern correlations

#### Knowledge Base Updates
- [ ] Create detailed journal entry: `/generate-journal`
  ```
  /generate-journal
  Emotional State: [honest assessment]
  Market Summary: [brief market description]
  Behavioral Flags: [any triggers noticed]
  Key Lesson: [main takeaway]
  Setup Performance: [which setups worked/failed]
  ```
- [ ] Log behavioral patterns or insights: `/log-kb`
  ```
  /log-kb
  Pattern: [behavior observed]
  Category: [type of pattern]
  Triggers: [what caused the behavior]
  Impact: [how it affected trading]
  Mitigation: [how to address]
  ```
- [ ] Generate knowledge base updates: `/generate-kb-update`
- [ ] Update setup performance statistics
- [ ] Refine risk parameters based on performance
- [ ] Export journal entry to markdown: `/export-journal`

#### System Feedback Loop
- [ ] Update setup win rates and expectancy values
- [ ] Refine position sizing parameters based on performance
- [ ] Adjust regime detection sensitivity if needed
- [ ] Document emerging patterns for future reference
- [ ] Schedule any system parameter updates

## Command Workflow Reference

### Premarket Command Sequence

| Phase | Command | Purpose | Validation |
|-------|---------|---------|------------|
| 1 | `/system-status` | Verify system readiness | Check all components |
| 2 | `/classify-regime` | Establish market regime | Validate regime characteristics |
| 3 | `/analyze-dp` | Process DP Morning Call transcript | Validate JSON structure |
| 4 | `/dp-summary` | Generate human-readable DP summary | Cross-check with JSON |
| 5 | `/analyze-mancini` | Process Mancini Blueprint data | Validate JSON structure |
| 6 | `/mancini-summary` | Generate human-readable Mancini summary | Cross-check with JSON |
| 7 | `/get-sma` | Get daily SMA data for key tickers | Verify completeness |
| 8 | `/get-levels` | Extract market levels for indices | Validate against external sources |
| 9 | `/generate-trade-plan` | Generate unified plan from all sources | Verify setup classifications |
| Alt | `/premarket-sequence` | Run complete premarket workflow in one step | Validate all outputs |

### Intraday Command Sequence

| Phase | Command | Purpose | Validation |
|-------|---------|---------|------------|
| 1 | `/copilot` | Activate intraday trading copilot | Verify activation |
| 2 | `/copilot-scout` | Scan for setups matching criteria | Validate against setup KB |
| 3 | `/copilot-confirm` | Validate potential trade against plan | Check regime compatibility |
| 4 | `/copilot-debrief` | Log and review completed trade | Verify standardized logging |
| 5 | `/midday-reset` | Mid-session review and plan adjustment | Check invalidation triggers |
| 6 | `/copilot-recenter` | Reset focus during trading day | Validate priority shift logic |

### Postmarket Command Sequence

| Phase | Command | Purpose | Validation |
|-------|---------|---------|------------|
| 1 | `/generate-trade-log` | Create structured log of today's trades | Verify complete metadata |
| 2 | `/performance-debrief` | Analyze trading performance by multiple dimensions | Check setup-specific metrics |
| 3 | `/performance-vs-mancini` | Compare execution vs plan | Validate opportunity capture rate |
| 4 | `/generate-journal` | Create trading journal entry | Ensure key lesson identification |
| 5 | `/log-kb` | Log a behavioral pattern or insight | Validate categorization |
| 6 | `/generate-kb-update` | Generate KB update recommendations | Check for actionable insights |
| 7 | `/update-behaviors` | Update trading behaviors knowledge base | Verify updates applied |
| 8 | `/export-journal` | Export journal entry to markdown | Validate export format |
| Alt | `/postmarket-sequence` | Run complete postmarket workflow in one step | Verify all outputs |

## Enhanced Data Validation Requirements

### Analyzer Output Validation

When using analyzer commands (e.g., `/analyze-dp`, `/analyze-mancini`):

1. Validate JSON structure against formal schema requirements:
   - Required fields: Check that all mandatory fields are present
   - Data types: Verify all fields have correct data types
   - Format validation: Ensure dates, numbers, etc. follow required formats
   - Relationship integrity: Verify related data is consistent

2. Validate data quality and completeness:
   - Conviction classifications: Check emphasis patterns match classifications
   - Level specification: Ensure all price levels have proper context
   - Setup components: Verify all required components for each setup type
   - Decision tree logic: Check for logical consistency

3. Handle validation failures:
   - Document specific validation errors
   - Attempt to repair data if possible
   - Re-run analyzer with corrected input
   - If unresolvable, document limitations and proceed with available data

### Two-Phase Trade Evaluation

For all potential trades:

1. **Individual Evaluation Phase**:
   - Apply setup classification based on trade-setups-kb.md
   - Score each setup using the official scoring system
   - Verify regime compatibility
   - Apply behavioral flag review
   - Assign initial conviction rating

2. **Interaction Effects Analysis**:
   - Identify correlated setup opportunities
   - Check for sector/asset concentration
   - Assess directional exposure balance
   - Evaluate overall risk distribution
   - Adjust priorities based on portfolio effects

3. **Final Prioritization**:
   - Rank by conviction level
   - Consider setup score
   - Factor in regime compatibility
   - Weigh risk/reward ratio
   - Account for interaction effects

## Enhanced Risk Management Protocols

### Confirmation Requirements Before Entering Puts/Shorts

- **Trigger Conditions**: Do not initiate short-biased trades (especially puts) without one of these confirmations:
  - Clear rejection candle off a planned resistance zone on the 15m or 34 EMA
  - Failed breakout (wick above level with full reversal close)
  - Moderator confirmation (DP actively trimming or flipping)

- **Enhanced Implementation**:
  - Use tiered entries: 25% initial size → 75% after confirmation + retest
  - Apply time-based validation: confirmation must occur within 15 minutes of level test
  - Document specific confirmation pattern observed
  - Require stronger confirmation in trending up regime

### Macro Headline Risk Protocol

When any of these conditions exist:
- Fed speakers scheduled during session
- Major economic releases during session
- Geopolitical developments actively unfolding
- Presidential/government statements expected

Apply these enhanced controls:
- Cap initial position size at 1/3 normal risk
- Require TWO confirmation signals before directional bias trades
- Monitor DP/Kira sentiment shift with 5-minute checks
- Do not hold trades through speech/release window
- Set hard circuit breakers (time or price) for all positions
- Document specific macro catalyst being managed

### Sentiment Flip Rule (Moderator-Reversal Protocol)

When Inner Circle leaders (DP, Rickman, Kira) flip sentiment intraday:

1. **Detection Requirements**:
   - Document exact time, instrument, direction, and original statement
   - Verify the flip is explicit, not ambiguous
   - Note price level at time of flip

2. **Response Protocol**:
   - If positioned opposite to new sentiment: Reduce position by at least 50% within 15 minutes
   - Re-evaluate remaining position using stricter criteria
   - Document rationale if staying in trade against the flip
   - Set tighter stop parameters (50% of original risk)

3. **Re-Entry Rules**:
   - Wait for technical confirmation of new sentiment
   - Require clear price acceptance in new direction
   - Start with 50% of normal size
   - Document specific confirmation pattern observed

## Setup Compatibility Matrix

This enhanced compatibility matrix must be applied during trade evaluation:

| Setup Type | Trending Up | Trending Down | Choppy/Range | Event-Driven | Squeeze |
|------------|-------------|--------------|--------------|--------------|---------|
| FB (Failed Breakdown) | ✓✓✓ | ✓ | ✓✓ | ✓ | ✓✓✓ |
| RR (Range Reclaim) | ✓ | ✓ | ✓✓✓ | ✓ | ✓✓ |
| TC (Trend Continuation) | ✓✓✓ | ✓✓✓ | ✗ | ✓ | ✓✓ |
| VC (Volume Climax) | ✓ | ✓ | ✓ | ✓✓✓ | ✓✓ |
| EG (Earnings Gap) | ✓✓ | ✓✓ | ✓ | ✓✓✓ | ✓ |
| IC (Inner Circle) | ✓✓✓ | ✓✓✓ | ✓✓ | ✓✓ | ✓✓✓ |
| ORB (Opening Range B/O) | ✓✓✓ | ✓✓ | ✗ | ✓ | ✓✓ |
| VB (VWAP Boulevard) | ✓✓✓ | ✓✓ | ✗ | ✓ | ✓ |

Legend: ✓✓✓ = Ideal (Full Size), ✓✓ = Good (75% Size), ✓ = Acceptable (50% Size), ✗ = Avoid

## Position Sizing Matrix

Apply this enhanced matrix to determine position size:

| Conviction | Regime: Trending | Regime: Choppy | Regime: Event-Driven | Setup Score 7+ | Current Drawdown |
|------------|------------------|----------------|----------------------|----------------|------------------|
| BIG_IDEA | 100% | 75% | 50% | +25% | -25% if >2% DD |
| HIGH | 75% | 50% | 33% | +25% | -25% if >2% DD |
| MEDIUM | 50% | 33% | 25% | No change | -50% if >2% DD |
| LOW | 33% | 25% | 15% | No change | Avoid if >2% DD |

Notes:
- Base percentages are of your maximum allowable position size per charter
- Adjustments are cumulative but cannot exceed 100% or fall below 10%
- "Setup Score 7+" means the setup scores 7 or higher on the multi-setup stacking system
- Current Drawdown refers to today's P&L, not overall account drawdown

## Plan Invalidation Triggers

The trade plan must be reassessed via `/midday-reset` if ANY of these occur:

1. **Price Action Triggers**:
   - SPX/ES moves more than 1% from opening price
   - Key decision point level in plan is broken with acceptance
   - Two consecutive failed setups from primary watchlist

2. **Volatility Triggers**:
   - VIX moves +/- 10% from open
   - Average true range expands more than 25% from 5-day average
   - Unusual tick or breadth readings outside 2 standard deviations

3. **External Triggers**:
   - Unscheduled macro headline during session
   - Fed official comments that impact markets
   - Significant sector rotation (>2% sector divergence)

4. **Inner Circle Triggers**:
   - DP/Kira/Rickman sentiment flip
   - New high-conviction call from DP
   - Explicit "be careful here" warnings from moderators

## Performance Tracking Enhancement

### Trade Logging Requirements

All trades must be logged with this enhanced metadata:

- **Basic Data**:
  - Entry and exit prices and times
  - Position size and direction
  - P&L amount and percentage

- **Classification Data**:
  - Standard setup tag (e.g., "FB-L-CF-HC")
  - Conviction level (BIG_IDEA, HIGH, MEDIUM, LOW)
  - Regime during execution
  - Source (DP, Mancini, Own, etc.)

- **Execution Quality**:
  - Planned vs. actual entry (% deviation)
  - Planned vs. actual exit (% deviation)
  - Timing quality score (1-10)
  - Plan adherence score (1-10)

- **Behavioral Data**:
  - Emotional state during entry (1-10)
  - Emotional state during exit (1-10)
  - Behavioral flags triggered
  - Decision quality score (1-10)

- **Context Data**:
  - Key technical levels that triggered action
  - Market conditions during trade
  - Specific confirmation patterns observed
  - Any relevant volatility context

### Setup-Specific Performance Tracking

Track these metrics by setup type:

- Win rate percentage
- Average R:R ratio
- Expectancy (win% × avg win) - (loss% × avg loss)
- Average hold time
- Best time-of-day performance
- Regime-specific win rates
- Size-adjusted performance

### Feedback Loop Protocol

After each trading day:

1. Calculate setup-specific performance metrics
2. Update historical performance database
3. Adjust setup priorities based on recent performance
4. Refine position sizing parameters
5. Update confirmation requirement thresholds
6. Document behavioral insights for future reference

## System Maintenance

### Daily Tasks

- [ ] Back up all trade logs and journal entries
- [ ] Update knowledge base with new observations
- [ ] Document any system issues or failures
- [ ] Sync local files with git repository
- [ ] Update setup performance statistics
- [ ] Check and validate all JSON data

### Weekly Tasks

- [ ] Review all journal entries for patterns
- [ ] Update trading behaviors knowledge base
- [ ] Assess system performance metrics by setup
- [ ] Refine risk management parameters
- [ ] Clean up data storage
- [ ] Review underperforming setups
- [ ] Update position sizing matrix if needed

### Monthly Tasks

- [ ] Conduct full system performance review by setup type
- [ ] Update system parameters based on market conditions
- [ ] Refine analyzer extraction rules
- [ ] Improve trade plan generation logic
- [ ] Test system with historical data using `/replay-day`
- [ ] Perform regime-specific performance analysis
- [ ] Re-evaluate all behavioral flags

## CHANGELOG

- v3.0 (2025-05-12): Major revision with enhanced validation, two-phase trade evaluation, improved risk protocols, setup-specific tracking, position sizing matrix, plan invalidation triggers, and formal feedback loop
- v2.2 (2025-05-08): Integrated controller-based command structure, added command sequence tables, incorporated risk protocols from addendum, updated JSON validation procedures
- v2.1 (2025-05-05): Updated to reflect JSON-based data flow architecture and separation of analyzer/summary components
- v2.0 (2025-04-01): Initial SOP documentation
