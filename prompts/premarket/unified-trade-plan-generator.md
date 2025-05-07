---
title: Unified Trade Plan Generator
description: Generate daily trading plan with position context and improved classification
tags: [premarket, plan, execution]
author: Simon Plant
last_updated: 2025-05-07
version: 2.4
category: premarket
usage: Produces comprehensive trade plan with position awareness
status: active
requires: [dp-trade-analyzer.md, mancini-trade-analyzer.md, system-parameters.json, moderator-position-tracker.md]
linked_outputs: [copilot.md, generate-daily-trade-log.md]
input_format: json
output_format: markdown
ai_enabled: true
schema_version: 2.0
---

# UNIFIED TRADE PLAN GENERATOR

## Purpose
Generate a comprehensive, execution-ready trade plan by integrating structured data from DP's morning call analysis, Mancini's SPX blueprint, and current moderator position data.

## REVISED INTEGRATION LOGIC WITH POSITION AWARENESS

Follow this enhanced decision tree to determine trade prioritization:

### PRIORITY TIER 1: DP Focus & Active Mod Positions
* Any trade DP mentions as his "focus" for the day
* CORE_SWING positions held by multiple moderators with add signals
* Tickers with explicit emphasis phrases ("gonna be my focus", "most definitely")
* ACTIVE moderator swings with increasing conviction signals

### PRIORITY TIER 2: Technical + Conviction Alignment
* DP HIGH trades that align with Mancini key levels
* ACTIVE_TRADE positions with today's technical confirmation
* Must have precise entry, target, and stop levels
* Technical structure must support directional bias

### PRIORITY TIER 3: Single-Source Setups & Catchup Opportunities
* DP MEDIUM trades without clear technical alignment
* MONITORING positions with re-entry signals
* Catchup opportunities in active moderator positions
* Mancini HIGH confidence setups without corresponding DP ideas

### PRIORITY TIER 4: Watchlist Only
* DP LOW conviction ideas
* Unclear technical structure
* Setups requiring multiple conditions
* Ideas without clear risk parameters

## PRIORITY TIER CONFLICT RESOLUTION

When a trade appears in multiple priority tiers, use these resolution rules:

### Primary Resolution Rule 
If a trade appears in both Tier 1 and Tier 2 conditions:
- Classify as Tier 1 if DP mentions explicitly with emphasis language
- Else rank by composite score = position_significance_score + conviction_score

### Composite Scoring
```
conviction_score = 
  100 if BIG_IDEA
  75 if HIGH
  50 if MEDIUM
  25 if LOW

total_priority_score = position_significance_score + conviction_score
```

### Tiebreaker Rules
If total_priority_score is equal:
- Prioritize trades mentioned first in DP's call
- Prioritize trades with active moderator adds today
- Prioritize trades with clearer technical levels

## ENHANCED MIRROR STRATEGY GENERATION

For each active moderator position, generate personalized mirror strategies:

### CORE_SWING Positions
- If moderators adding: "Add alongside moderators at support"
- If moderators trimming: "Consider reducing exposure into strength"
- If moderators holding: "Maintain core position, watch for add opportunities"

### ACTIVE_TRADE Positions
- If not in position: "Initial entry opportunity with smaller size than moderators"
- If smaller position: "Consider adding to match moderator exposure"
- If risk concerns: "Smaller position size with tighter stop recommended"

### MONITORING Positions
- If re-entry signals: "Watch for moderator re-entry signals"
- If continued exit: "Remain sidelined until confirmation"

### CATCHUP SCENARIOS
- If mod is trimming, but you're initiating:
  "Smaller initial size recommended with tighter stop due to mod profit-taking."
- If mod added aggressively and you missed:
  "High-risk entry—only if reclaim above key support."
- If mod has been in long-term:
  "Consider starter position with intent to add on pullbacks."

## MODERATOR DIVERGENCE DETECTION

When moderators show conflicting behavior on the same position:

### Detection Rules
- One moderator adding while another trims
- Conflicting sentiment expressions (bullish vs. bearish)
- Significantly different implied size signals

### Mirror Strategy Adjustment
- Flag position with "moderator_divergence": true
- Add cautionary note: "Moderators currently showing divergent behavior - review context carefully"
- Default to more conservative stance: smaller size, tighter stops

### Resolution Path
- Prioritize DP's guidance if explicit
- Otherwise defer to majority moderator sentiment
- In extreme divergence, classify as "MONITORING" until reconciliation

## ENHANCED ES/SPX LEVEL INTEGRATION

### Level Conversion Process
* Use the EXACT ES_TO_SPX_CONVERSION value from system-parameters.json
* DO NOT use arbitrary conversion values
* Apply conversion factor consistently to all ES/SPX level mappings
* Validate that level relationships remain constant after conversion

## IDEA FILTERING LOGS

For each trade idea from source analyzers:

### Inclusion/Exclusion Decisions
- Log the comparisons against inclusion thresholds
- Record exact scores that led to tier placement
- Log conflicts between sources and resolution paths

### Priority Tier Assignment Logs
- Record composite scores for each tier consideration
- Log tiebreaker applications
- Record position context influence on classification

### Source Conflict Resolution
- When DP and Mancini conflict on direction or conviction
- When position context overrides source classification
- When technical alignment fails despite verbal conviction

## DATA STRUCTURE — JSON SCHEMA

The generator accepts data in the standardized schema format (v2.0):

### DP Analyzer Input
```json
{
  "metadata": { 
    "source": "dp", 
    "timestamp": "ISO-timestamp", 
    "version": "2.0" 
  },
  "TRADE_DATA": [...],
  "MARKET_BIAS": {...},
  "COACHING_INSIGHTS": {...},
  "DECISION_LOGS": {...}
}
```

### Mancini Analyzer Input
```json
{
  "metadata": {
    "source": "mancini",
    "timestamp": "ISO-timestamp",
    "version": "2.0",
    "es_to_spx_conversion": number
  },
  "TECHNICAL_DATA": {...},
  "TRADE_DATA": [...],
  "MARKET_BIAS": {...},
  "MARKET_ANALYSIS": {...},
  "COACHING_INSIGHTS": {...}
}
```

### Position Tracker Input
```json
{
  "positions": [
    {
      "ticker": "string",
      "direction": "LONG | SHORT",
      "implied_size": "CORE | FULL | PARTIAL | STARTER | TRAILER", 
      "moderators": ["string"],
      "duration": "SWING | CASHFLOW | LONGTERM | LOTTO",
      "conviction": "HIGH | MEDIUM | LOW",
      "status": "ACTIVE | MONITORING | CLOSED",
      "entry_zone_type": "PULLBACK | BREAKOUT | VWAP_RECLAIM | SCALP_BOUNCE",
      "risk_bias": "LOWER | EQUAL | HIGHER",
      "moderator_divergence": true | false,
      "drift_warning": true | false,
      "activity": [
        {
          "action": "ADD | TRIM | ADD_BACK | EXIT",
          "size_signal": "INCREASING | PARTIAL | CORE | TRAILER",
          "context": "string",
          "moderator": "string",
          "timestamp": "ISO-timestamp"
        }
      ],
      "position_metrics": {
        "significance_score": number,
        "moderator_alignment": "HIGH | MEDIUM | LOW",
        "management_activity": "ACTIVE | PASSIVE | CLOSED",
        "conviction_trend": "INCREASING | STABLE | DECREASING",
        "last_seen": "ISO-timestamp"
      },
      "position_source": ["string"],
      "context": "string",
      "mirror_strategy": "string",
      "average_cost_range": "string",
      "current_risk_setup": "string"
    }
  ],
  "last_updated": "ISO-timestamp"
}
```

## OUTPUT STRUCTURE

Generate the unified plan in this exact format:

```
# UNIFIED TRADE PLAN — [DAY], [DATE]

## MARKET BIAS: [BULLISH/BEARISH/NEUTRAL/CAUTIOUS]
[2-3 sentences integrating DP's market view and Mancini's technical structure]

## 5-MINUTE PRIORITY FOCUS
• Critical Level: [Key price point with immediate significance]
• First Action: [Most time-sensitive trade execution]
• Event Focus: [Primary macro/catalyst to monitor]
• Risk Alert: [Key warning or invalidation condition]

## TRADE EXECUTION PLAN

### TIER 1: FOCUS TRADES & CORE POSITIONS
1. [TICKER] [DIRECTION] [CONVICTION/DURATION/SIZE]
   **SETUP**: [Entry conditions]
   **TRIGGER**: [Precise execution signal]
   **LEVELS**: Entry [X] → Targets [Y1, Y2, Y3] → Stop [Z]
   **NOTES**: [Integration context, DP/Mancini alignment]
   **POSITION STATUS**: [Core/Active/New - Moderator context]

### TIER 2: TECHNICAL ALIGNMENT TRADES
1. [TICKER] [DIRECTION] [CONVICTION/DURATION/SIZE]
   **SETUP**: [Entry conditions]
   **TRIGGER**: [Precise execution signal]
   **LEVELS**: Entry [X] → Targets [Y1, Y2, Y3] → Stop [Z]
   **NOTES**: [Integration context, DP/Mancini alignment]
   **POSITION STATUS**: [Core/Active/New - Moderator context]

### TIER 3: SINGLE-SOURCE & CATCHUP OPPORTUNITIES
1. [TICKER] [DIRECTION] [CONVICTION/DURATION/SIZE]
   **SETUP**: [Entry conditions]
   **TRIGGER**: [Precise execution signal]
   **LEVELS**: Entry [X] → Targets [Y1, Y2, Y3] → Stop [Z]
   **TIMING**: [Specific execution window]
   **NOTES**: [Integration context, DP/Mancini alignment]
   **POSITION STATUS**: [Core/Active/New - Moderator context]

### TIER 4: WATCHLIST
1. [TICKER] [DIRECTION] [CONVICTION/DURATION/SIZE]
   **SETUP**: [Entry conditions]
   **TRIGGER**: [Precise execution signal]
   **LEVELS**: Entry [X] → Targets [Y1, Y2, Y3] → Stop [Z]
   **NOTES**: [Risk warning, max allocation]
   **POSITION STATUS**: [Core/Active/New - Moderator context]

## MIRROR STRATEGIES
• [TICKER]: [Personalized mirror strategy based on position status]
• [TICKER]: [Personalized mirror strategy based on position status]
• [TICKER]: [Personalized mirror strategy based on position status]

## RISK MANAGEMENT PROTOCOL
• [Position sizing rules for the day]
• [Sector exposure limitations]
• [Specific warnings from DP or Mancini]
• [Current portfolio heat constraints]

## KEY EVENTS
• [Time]: [Event] – [Trading implications]
• Earnings After Close: [Tickers]
• Tomorrow Pre-Market: [Tickers]

## TRADE MANAGEMENT RULES
• [DP's specific exit guidance]
• [Mancini's level-to-level management protocol]
• [Runner management instructions]
• [Profit-taking parameters]

## ACTIVE POSITION DIGEST
[Import and render active position digest]

## ES/SPX KEY LEVELS
[Table of key levels using consistent conversion]

## DECISION LOGS
[Structured summary of key classification decisions]
```

## IMPLEMENTATION NOTES

### Decision Log Integration
- Import decision logs from DP analyzer
- Add tier assignment decision logs
- Create consistent log format for all decisions
- Highlight key conflicts and resolutions

### Position Context Integration
- Link each trade to any existing position context
- Import relevant position metrics
- Reference latest moderator activity
- Generate appropriate mirror strategies

### Preference Rules
1. Position awareness takes precedence over raw conviction scores
2. Focus phrases trump all other priorities
3. DP + Mancini alignment beats higher conviction without alignment
4. Active management beats passive monitoring
5. Risk context should be reflected in position sizing

## LOGGING CONFIGURATION

The generator will log all decisions asynchronously to minimize impact on generation speed. Logs will be stored in a structured format in the decision-logs directory, with the current date as the filename.

Logging levels can be controlled via system-parameters.json:
- minimal: Basic tier assignment only
- normal: Standard decision traces with key evidence
- verbose: Complete decision traces with all evidence and alternatives

## CHANGELOG
- v2.4 (2025-05-07): Added position awareness, improved tier logic, enhanced mirror strategies
- v2.3 (2025-05-05): Updated ES/SPX conversion to use system parameters
- v2.2 (2025-05-01): Added decision logging system
- v2.1 (2025-04-15): Enhanced conflict resolution logic
- v2.0 (2025-04-01): Initial implementation of unified plan generation