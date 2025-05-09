---
title: Unified Trade Plan Generator
description: Generate daily trading plan with position context, improved classification, and SMA integration
tags: [premarket, plan, execution]
author: Simon Plant
last_updated: 2025-05-08
version: 2.5
category: premarket
usage: Produces comprehensive trade plan with position awareness and SMA support/resistance
status: active
requires: [dp-trade-analyzer.md, mancini-trade-analyzer.md, system-parameters.json, moderator-position-tracker.md, get-daily-sma-for-tickers.md]
linked_outputs: [copilot.md, generate-daily-trade-log.md]
input_format: json
output_format: markdown
ai_enabled: true
schema_version: 2.0
---

# UNIFIED TRADE PLAN GENERATOR

## Purpose
Generate a comprehensive, execution-ready trade plan by integrating structured data from DP's morning call analysis, Mancini's SPX blueprint, current moderator position data, and key SMA levels for enhanced technical context.

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
* **NEW: Trades with strong SMA support/resistance confluence**

### PRIORITY TIER 3: Single-Source Setups & Catchup Opportunities
* DP MEDIUM trades without clear technical alignment
* MONITORING positions with re-entry signals
* Catchup opportunities in active moderator positions
* Mancini HIGH confidence setups without corresponding DP ideas
* **NEW: Trades with clear SMA context but weaker overall conviction**

### PRIORITY TIER 4: Watchlist Only
* DP LOW conviction ideas
* Unclear technical structure
* Setups requiring multiple conditions
* Ideas without clear risk parameters
* **NEW: Trades without relevant SMA context**

## PRIORITY TIER CONFLICT RESOLUTION

When a trade appears in multiple priority tiers, use these resolution rules:

### Primary Resolution Rule 
If a trade appears in both Tier 1 and Tier 2 conditions:
- Classify as Tier 1 if DP mentions explicitly with emphasis language
- Else rank by composite score = position_significance_score + conviction_score + **sma_confluence_score**

### Composite Scoring
```
conviction_score = 
  100 if BIG_IDEA
  75 if HIGH
  50 if MEDIUM
  25 if LOW

sma_confluence_score =
  25 if price within 0.5% of multiple SMAs (cluster)
  15 if price within 1% of significant SMA
  10 if relevant SMA provides clear support/resistance
  0 if no relevant SMA context

total_priority_score = position_significance_score + conviction_score + sma_confluence_score
```

### Tiebreaker Rules
If total_priority_score is equal:
- Prioritize trades mentioned first in DP's call
- Prioritize trades with active moderator adds today
- Prioritize trades with clearer technical levels
- **NEW: Prioritize trades with stronger SMA confluence**

## ENHANCED MIRROR STRATEGY GENERATION

For each active moderator position, generate personalized mirror strategies:

### CORE_SWING Positions
- If moderators adding: "Add alongside moderators at support"
- If moderators trimming: "Consider reducing exposure into strength"
- If moderators holding: "Maintain core position, watch for add opportunities"
- **NEW: If near significant SMA support: "Potential add opportunity at [SMA level]"**

### ACTIVE_TRADE Positions
- If not in position: "Initial entry opportunity with smaller size than moderators"
- If smaller position: "Consider adding to match moderator exposure"
- If risk concerns: "Smaller position size with tighter stop recommended"
- **NEW: If approaching SMA resistance: "Consider partial profit at [SMA level]"**

### MONITORING Positions
- If re-entry signals: "Watch for moderator re-entry signals"
- If continued exit: "Remain sidelined until confirmation"
- **NEW: If reclaiming key SMA: "Potential re-entry on confirmation above [SMA level]"**

### CATCHUP SCENARIOS
- If mod is trimming, but you're initiating:
  "Smaller initial size recommended with tighter stop due to mod profit-taking."
- If mod added aggressively and you missed:
  "High-risk entry—only if reclaim above key support."
- If mod has been in long-term:
  "Consider starter position with intent to add on pullbacks."
- **NEW: If price reclaiming key SMA that mods referenced: "Potential entry on SMA reclaim confirmation"**

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
- **NEW: Reference SMA levels as objective technical validation**

### Resolution Path
- Prioritize DP's guidance if explicit
- Otherwise defer to majority moderator sentiment
- In extreme divergence, classify as "MONITORING" until reconciliation
- **NEW: Use SMA interactions as objective confirmation triggers**

## ENHANCED ES/SPX LEVEL INTEGRATION

### Level Conversion Process
* Use the EXACT ES_TO_SPX_CONVERSION value from system-parameters.json
* DO NOT use arbitrary conversion values
* Apply conversion factor consistently to all ES/SPX level mappings
* Validate that level relationships remain constant after conversion
* **NEW: Map SMA levels to corresponding ES/SPX values for consistency**

## SMA INTEGRATION PROCESS

### SMA Data Acquisition
* Pull SMA data from get-daily-sma-for-tickers.md component
* Focus on 8d, 21d, 34d, 50d, 100d, 200d SMAs for key tickers
* Filter SMAs based on proximity to current price and historical significance
* Identify clusters where multiple SMAs converge

### SMA Context Enhancement
For each trade idea:
* Identify nearest SMA support below current price
* Identify nearest SMA resistance above current price
* Note when price is testing, reclaiming, or violating key SMAs
* Flag trades with entry/target/stop near significant SMAs
* Highlight SMA-based setups (crosses, reclaims, tests)

### SMA-Enhanced Decision Framework
* Include SMA levels in market structure decision trees
* Use SMA relationships for bias confirmation
* Identify potential reversal zones based on SMA interactions
* Flag significant SMA clusters as key decision zones

### SMA for Risk Management
* Use SMAs to refine stop placement (e.g., "stop just below 50d SMA")
* Identify natural targets at key SMA resistance levels
* Suggest partial profit-taking at significant SMA resistance
* Use SMA support for potential add opportunities

## IDEA FILTERING LOGS

For each trade idea from source analyzers:

### Inclusion/Exclusion Decisions
- Log the comparisons against inclusion thresholds
- Record exact scores that led to tier placement
- Log conflicts between sources and resolution paths
- **NEW: Log SMA confluence considerations**

### Priority Tier Assignment Logs
- Record composite scores for each tier consideration
- Log tiebreaker applications
- Record position context influence on classification
- **NEW: Log SMA confluence scores and their impact**

### Source Conflict Resolution
- When DP and Mancini conflict on direction or conviction
- When position context overrides source classification
- When technical alignment fails despite verbal conviction
- **NEW: When SMA context conflicts with other signals**

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

### SMA Data Input
```json
{
  "SMA_DATA": {
    "metadata": {
      "date": "YYYY-MM-DD",
      "generated_at": "timestamp",
      "tickers_requested": ["TICK1", "TICK2"],
      "periods_requested": [8, 21, 50, 100, 200],
      "market_regime": "TRENDING_UP|TRENDING_DOWN|RANGE_BOUND|VOLATILE",
      "version": "1.1"
    },
    "tickers": [
      {
        "ticker": "TICKER_SYMBOL",
        "current_price": 123.45,
        "sma_values": [
          {
            "period": 8,
            "value": 123.78,
            "distance_pct": 0.27,
            "distance_points": 0.33,
            "crossed_recently": true,
            "last_cross_date": "YYYY-MM-DD",
            "cross_direction": "ABOVE_TO_BELOW|BELOW_TO_ABOVE",
            "historical_significance": "HIGH|MEDIUM|LOW",
            "historical_function": "SUPPORT|RESISTANCE|BOTH",
            "recent_interactions": [
              {
                "date": "YYYY-MM-DD",
                "type": "CROSS|TEST|BOUNCE",
                "result": "RESPECTED|VIOLATED"
              }
            ],
            "likely_function": "RESISTANCE|SUPPORT",
            "significance_score": 85,
            "nearest_price_point": true
          }
        ],
        "sma_clusters": [
          {
            "zone_start": 122.50,
            "zone_end": 123.00,
            "smas_in_zone": ["8d", "21d"],
            "significance": "HIGH|MEDIUM|LOW"
          }
        ]
      }
    ],
    "significant_levels": [
      {
        "ticker": "TICKER",
        "level": 123.45,
        "smas": ["8d", "21d"],
        "likely_function": "RESISTANCE|SUPPORT",
        "significance": "HIGH|MEDIUM|LOW"
      }
    ]
  }
}
```

## ENHANCED OUTPUT STRUCTURE

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
• SMA Watch: [Critical SMA interaction to monitor] (NEW)

## KEY SMA LEVELS (NEW SECTION)
• SPX: 21d @ 5580 (Support ⭐⭐⭐), 8d @ 5624 (Resistance ⭐), 50d @ 5527 (Support ⭐⭐)
• ES: 21d @ 5577 (Support ⭐⭐⭐), 8d @ 5621 (Resistance ⭐), 50d @ 5524 (Support ⭐⭐)
• TSLA: 8d @ 174.26 (Resistance ⭐), 21d @ 176.42 (Resistance ⭐⭐), 50d @ 172.15 (Support ⭐⭐)
• AAPL: 21d @ 176.42 (Support ⭐⭐), 50d @ 172.15 (Support ⭐⭐)
• QQQ: 8d @ 432.51 (Resistance ⭐), 21d @ 428.76 (Support ⭐⭐⭐)

## SMA CLUSTERS (NEW SECTION)
• SPX 5620-5625: 8d, 13d SMAs (Resistance Zone ⭐⭐)
• QQQ 428-430: 21d, 34d SMAs (Support Zone ⭐⭐⭐)
• TSLA 175-176: 8d, 21d SMAs (Resistance Zone ⭐⭐)

## TRADE EXECUTION PLAN

### TIER 1: FOCUS TRADES & CORE POSITIONS
1. [TICKER] [DIRECTION] [CONVICTION/DURATION/SIZE]
   **SETUP**: [Entry conditions]
   **TRIGGER**: [Precise execution signal]
   **LEVELS**: Entry [X] → Targets [Y1, Y2, Y3] → Stop [Z]
   **SMA CONTEXT**: [Relevant SMA levels and interactions] (NEW)
   **NOTES**: [Integration context, DP/Mancini alignment]
   **POSITION STATUS**: [Core/Active/New - Moderator context]

### TIER 2: TECHNICAL ALIGNMENT TRADES
1. [TICKER] [DIRECTION] [CONVICTION/DURATION/SIZE]
   **SETUP**: [Entry conditions]
   **TRIGGER**: [Precise execution signal]
   **LEVELS**: Entry [X] → Targets [Y1, Y2, Y3] → Stop [Z]
   **SMA CONTEXT**: [Relevant SMA levels and interactions] (NEW)
   **NOTES**: [Integration context, DP/Mancini alignment]
   **POSITION STATUS**: [Core/Active/New - Moderator context]

### TIER 3: SINGLE-SOURCE & CATCHUP OPPORTUNITIES
1. [TICKER] [DIRECTION] [CONVICTION/DURATION/SIZE]
   **SETUP**: [Entry conditions]
   **TRIGGER**: [Precise execution signal]
   **LEVELS**: Entry [X] → Targets [Y1, Y2, Y3] → Stop [Z]
   **SMA CONTEXT**: [Relevant SMA levels and interactions] (NEW)
   **TIMING**: [Specific execution window]
   **NOTES**: [Integration context, DP/Mancini alignment]
   **POSITION STATUS**: [Core/Active/New - Moderator context]

### TIER 4: WATCHLIST
1. [TICKER] [DIRECTION] [CONVICTION/DURATION/SIZE]
   **SETUP**: [Entry conditions]
   **TRIGGER**: [Precise execution signal]
   **LEVELS**: Entry [X] → Targets [Y1, Y2, Y3] → Stop [Z]
   **SMA CONTEXT**: [Relevant SMA levels and interactions] (NEW)
   **NOTES**: [Risk warning, max allocation]
   **POSITION STATUS**: [Core/Active/New - Moderator context]

## MIRROR STRATEGIES
• [TICKER]: [Personalized mirror strategy based on position status and SMA context]
• [TICKER]: [Personalized mirror strategy based on position status and SMA context]
• [TICKER]: [Personalized mirror strategy based on position status and SMA context]

## RISK MANAGEMENT PROTOCOL
• [Position sizing rules for the day]
• [Sector exposure limitations]
• [Specific warnings from DP or Mancini]
• [Current portfolio heat constraints]
• [SMA-based stop placement guidelines] (NEW)

## KEY EVENTS
• [Time]: [Event] – [Trading implications]
• Earnings After Close: [Tickers]
• Tomorrow Pre-Market: [Tickers]

## TRADE MANAGEMENT RULES
• [DP's specific exit guidance]
• [Mancini's level-to-level management protocol]
• [Runner management instructions]
• [Profit-taking parameters]
• [SMA-based management rules] (NEW)

## ACTIVE POSITION DIGEST
[Import and render active position digest]

## ES/SPX KEY LEVELS
[Table of key levels using consistent conversion]

## SMA SIGNIFICANCE LEGEND (NEW)
⭐⭐⭐ - Critical level (high historical significance)
⭐⭐ - Important level (medium historical significance)
⭐ - Notable level (low historical significance)

## DECISION LOGS
[Structured summary of key classification decisions]
```

## IMPLEMENTATION NOTES

### SMA Data Integration
- Pull SMA data from get-daily-sma-for-tickers.md
- Filter for most relevant SMAs based on proximity and historical significance
- Match SMAs to trade ideas for enhanced context
- Use SMA clusters to identify potential reversal zones

### Decision Log Integration
- Import decision logs from DP analyzer
- Add tier assignment decision logs
- Create consistent log format for all decisions
- Highlight key conflicts and resolutions
- **NEW: Log SMA integration decisions**

### Position Context Integration
- Link each trade to any existing position context
- Import relevant position metrics
- Reference latest moderator activity
- Generate appropriate mirror strategies
- **NEW: Enhance with SMA support/resistance context**

### SMA-Enhanced Risk Management
- Use SMAs for more precise stop placement
- Identify natural targets at key SMA resistance levels
- Suggest partial profit-taking at significant SMA resistance
- Use SMA support for potential add opportunities

### Preference Rules
1. Position awareness takes precedence over raw conviction scores
2. Focus phrases trump all other priorities
3. DP + Mancini alignment beats higher conviction without alignment
4. Active management beats passive monitoring
5. Risk context should be reflected in position sizing
6. **NEW: SMA confluence increases trade priority**

## LOGGING CONFIGURATION

The generator will log all decisions asynchronously to minimize impact on generation speed. Logs will be stored in a structured format in the decision-logs directory, with the current date as the filename.

Logging levels can be controlled via system-parameters.json:
- minimal: Basic tier assignment only
- normal: Standard decision traces with key evidence
- verbose: Complete decision traces with all evidence and alternatives
- **NEW: sma_verbose: Adds detailed SMA integration decision logs**

## CHANGELOG
- v2.5 (2025-05-08): Added SMA integration for enhanced technical context and support/resistance
- v2.4 (2025-05-07): Added position awareness, improved tier logic, enhanced mirror strategies
- v2.3 (2025-05-05): Updated ES/SPX conversion to use system parameters
- v2.2 (2025-05-01): Added decision logging system
- v2.1 (2025-04-15): Enhanced conflict resolution logic
- v2.0 (2025-04-01): Initial implementation of unified plan generation