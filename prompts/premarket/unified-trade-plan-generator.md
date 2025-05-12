---
title: Optimized Unified Trade Plan Generator
description: Comprehensive process for generating a unified trade plan integrating DP's trade ideas and Mancini's methodology with balanced prioritization
tags: [intraday, setup, trading, Mancini, DP, integration, trade-plan, SPX, ES]
author: Simon Plant
last_updated: 2025-05-12
version: 3.0
category: intraday
usage: Use to generate structured daily trade plans incorporating DP Inner Circle insights and Mancini methodology with true conviction-based prioritization
status: active
requires: [
  dp-trade-analyzer.md,
  get-daily-sma-for-tickers.md,
  get-premarket-levels.md,
  mancini-analysis-framework.md,
  final-json-schema.json,
  system-parameters.json,
  market-regimes.md,
  trade-setups-kb.md,
  trading-system-sop.md,
  trading-behaviors-kb.md
]
linked_outputs: [daily-trade-plan, trade-journal, trading-dashboard]
input_format: markdown
output_format: markdown
ai_enabled: true
schema_version: 3.0
---

# Optimized Unified Trade Plan Generator

This document outlines the comprehensive process for generating a unified trade plan that properly balances DP's trade ideas and Mancini's methodology, with true conviction-based prioritization across all sources.

## Process for Generating the Plan

1. **Market Regime Classification**:
   - Process current market data to establish overall context
   - Identify regime (Trending Up/Down, Choppy, Event-Driven, Squeeze) 
   - This informs trade evaluation but doesn't filter out valid setups
   - Apply appropriate position sizing guidelines for the regime

2. **Data Processing**:
   - Process DP Morning Call through dp-trade-analyzer.md
   - Process Mancini content through mancini-analysis-framework.md
   - Extract technical level data (SMA, market levels)
   - All sources are treated with equal weight - no source has priority

3. **Trade Classification**:
   - Apply standardized taxonomy from trade-setups-kb.md
   - Generate standard classification tags for organization
   - Apply setup scoring for additional insight
   - Classification informs but doesn't reject valid trade ideas

4. **Trade Prioritization**:
   - Rate ALL trades on the same unified conviction scale
   - Consider both DP emphasis signals and Mancini pattern strength
   - Evaluate setup quality and historical performance
   - Apply risk/reward considerations
   - Sources are equally respected - true conviction determines priority

5. **Risk Protocol Application**:
   - Apply risk protocols based on setup type and market conditions
   - Implement position sizing based on conviction and regime
   - Document any behavioral flags related to setups
   - Provide risk guidance without restricting trade potential

6. **Trade Plan Generation**:
   - Organize by true conviction (not by source)
   - Present trades in a unified structure regardless of origin
   - Include all required data for execution
   - Ensure consistent formatting and organization

## Trade Plan Structure

The unified trade plan follows this structure, organizing ALL trades by true conviction:

```
# UNIFIED TRADE PLAN - [DATE]

## MARKET CONTEXT
- Current Regime: [Trending Up/Down/Choppy/Event-Driven/Squeeze]
- Key Characteristics: [Relevant indicators and conditions]
- SPX/ES Current: [Level] ([+/-] [Change])
- QQQ Current: [Level] ([+/-] [Change])
- VIX: [Level] ([+/-] [Change]) - [Context]
- Overnight Range: [Low] to [High]
- Gap Context: [Open gap analysis]
- Key Catalysts: [Major news/events]

## PRIMARY WATCHLIST (HIGHEST CONVICTION)
[Combined best opportunities regardless of source, ranked by true conviction]

1. **[Ticker/SPX Level] - [Setup Type] - [Direction] - [Tag]**
   - Source: [DP/Mancini]
   - Conviction: [BIG_IDEA/HIGH/FAILED BREAKDOWN]
   - Setup Score: [Points/10]
   - Regime Alignment: [Strong/Moderate/Limited]
   - Entry Trigger: [Precise entry condition]
   - Entry Zone: [Price level or range]
   - Position Size: [Based on conviction/regime matrix]
   - Targets: 
     - T1: [Level] - [Exit size]
     - T2: [Level] - [Exit size]
     - T3: [Level] - [Exit size if applicable]
   - Stop: [Exact level] ([Risk amount/percentage])
   - Rationale: "[Direct quote or technical reasoning]"
   - Confirmation Required: [Specific confirmation pattern]
   - Time Window: [Optimal execution window]
   - Notes: [Critical context or management instructions]

2. **[Next highest priority trade...]**

3. **[Next highest priority trade...]**

## SECONDARY WATCHLIST (MEDIUM CONVICTION)
[Next tier of opportunities, still actionable but lower priority]

1. **[Ticker/SPX Level] - [Setup Type] - [Direction] - [Tag]**
   - Source: [DP/Mancini]
   - Conviction: [MEDIUM/LEVEL RECLAIM]
   - Setup Score: [Points/10]
   - [Same structure as primary watchlist...]

2. **[Next secondary priority trade...]**

## MONITORING OPPORTUNITIES (SPECULATIVE/CONDITIONAL)
[Lower conviction trades that require significant confirmation]

1. **[Ticker/SPX Level] - [Setup Type] - [Direction] - [Tag]**
   - Source: [DP/Mancini]
   - Conviction: [LOW/BREAKDOWN SHORT]
   - Setup Score: [Points/10]
   - Trigger Condition: [Specific condition required]
   - [Abbreviated details...]

## KEY TECHNICAL LEVELS
[Integrated from all sources]

### SPX/ES Levels
- Major Resistance: [Levels with context]
- Minor Resistance: [Levels with context]
- Major Support: [Levels with context]
- Minor Support: [Levels with context]
- SMA Clusters: [Areas with multiple SMAs]

### Decision Points
- Bullish Above: [Level] - [What it confirms]
- Bearish Below: [Level] - [What it confirms]
- Key Inflection: [Level] - [What to watch for]

## RISK MANAGEMENT PROTOCOLS

### Confirmation Requirements
- Rejection candle off resistance for short setups
- Failed breakout patterns for reversals
- Moderator confirmation for high-risk entries
- Tiered entries for higher-risk positions

### Current Position Context
- Active Positions: [Any open positions]
- Daily P&L Status: [Current P&L]
- Risk Utilization: [% of daily risk used]
- Position Correlation Check: [Any closely correlated setups]

## TRADE MANAGEMENT GUIDELINES
- Scaling Rules: [Based on setup types]
- Stop Management: [Specific to today's setups]
- Runner Management: [When and how to let winners run]
- Multiple Setup Rules: [How to manage when setups trigger simultaneously]

## DECISION TREE
- Current SPX Price: [Level]
- IF [condition], THEN [action] targeting [target]
- IF [condition], THEN [action] targeting [target]
- Focus Points: [Key things to watch]

## OPTIMAL TRADING WINDOWS
- Primary: [Before 11am, After 3pm]
- Avoid: [11am-2pm]
- Setup-Specific Windows: [Based on setup types]
```

## Position Tracking Integration

The unified trade plan now incorporates current position context:

1. **Active Positions** - Current open positions with entry prices and sizes
2. **Daily P&L Status** - Current profit/loss for the day
3. **Risk Utilization** - Percentage of daily risk already deployed
4. **Position Correlation Check** - Identifies correlations with potential new trades

This tracking ensures consistency across multiple trading sessions.

## True Conviction Scoring System

All trades are evaluated on the same unified conviction scale:

1. **DP BIG_IDEA** = Mancini FAILED BREAKDOWN (primary setup with clear confidence)
2. **DP HIGH** = Mancini LEVEL RECLAIM (high confidence but secondary)
3. **DP MEDIUM** = Mancini "good potential" setup (moderate confidence)
4. **DP LOW** = Mancini BREAKDOWN SHORT (more speculative, lower probability)

This unified scale ensures the best trades rise to the top regardless of source.

## Behavioral Flag Integration

Each setup receives a behavioral flag check that:
1. Identifies potential behavioral risks without rejecting the trade
2. Notes historical triggers or patterns with this setup type
3. Provides mitigation suggestions when appropriate
4. Creates awareness without limiting potential

## Changelog

- v3.0 (2025-05-12): Complete optimization with unified conviction scoring, position tracking, and behavioral integration
- v2.0 (2025-05-01): Enhanced balance between DP and Mancini sources
- v1.0 (2025-04-15): Initial version with separated trade idea sections
