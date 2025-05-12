# Mancini Newsletter Analysis Framework

## Core Principles Extraction

This framework is designed to consistently extract and prioritize the most critical elements of Adam Mancini's trading methodology across multiple newsletters, regardless of specific market conditions or time periods.

## 1. Market Regime Identification

The first step is to identify the current market regime, which determines the primary setup types to prioritize:

- **Buy-Dips Regime**: Failed Breakdowns are the primary setup (e.g., "since the April 6th low one month ago, the buy dips regime")
- **Sell-Rips Regime**: Breakdown Shorts are the primary setup
- **Range-Bound Regime**: Both Failed Breakdowns and Breakdown Shorts at range extremes
- **Mode 1 vs Mode 2 Days**: 
  - Mode 1 (10% of days): Open-to-close trend days
  - Mode 2 (90% of days): Multiple moves with traps and reversals

## 2. Setup Identification & Prioritization

### TIER 0: Failed Breakdowns (Mancini's Core Edge)
- **Definition**: A previously established significant low/shelf that flushes, then recovers with acceptance
- **Components**:
  1. Significant low/shelf (prior day's low, multi-hour V-shaped low, or cluster of lows)
  2. Flush below the low (liquidity grab, stop hunt)
  3. Recovery back above the low
  4. Acceptance patterns (critical before entry)
- **Acceptance Patterns**:
  1. Price back-tests the low, sells off, then returns to the low
  2. Price recovers the low, rips, sells off to back-test, then rallies
- **Variations**:
  - Standard Failed Breakdown
  - Delayed Entry Failed Breakdown (lowest low still holding)
  - Complex Failed Breakdown (multiple acceptance phases)

### TIER 1: Level Reclaims
- **Definition**: Recovery of a previously established support/resistance shelf
- **Components**:
  1. Multi-touch resistance/support shelf
  2. Clear break above/below with momentum
  3. Longer acceptance period than Failed Breakdowns

### TIER 2: Breakdown Shorts (Advanced/Difficult)
- **Definition**: A Failed, Failed Breakdown (a Failed Breakdown that fails)
- **Components**:
  1. Significant level bounce
  2. Failed Breakdown attempt
  3. Failure of the Failed Breakdown (loss of lowest low)
- **Success Rate**: Lower (40% or less)

## 3. Technical Structure Mapping

- **Range Identification**: Current trading range boundaries (e.g., "5600 to 5667")
- **Flags/Patterns**: Consolidation patterns (e.g., "building out a very large flag")
- **Key Levels**: Support/resistance levels categorized by importance
  - Major levels (heavily tested, significant)
  - Minor levels (less significant)
- **Level Clusters**: Groups of adjacent support/resistance levels

## 4. Trade Management Protocol

The "level-to-level" approach is mandatory for all setups:

- **Entry**: Based on setup type with acceptance pattern confirmation
- **First Target**: Lock in 75% profits at first level
- **Second Target**: Lock in more (typically to 10% remaining) at second level
- **Runner Management**: Leave 10% to capture trend legs
- **Stop Management**: Never let entire trade go back red after first target hit
- **Profit Protection Mode**: After winning trade, strict rules about additional trades

## 5. Decision Trees

Map explicit decision logic from the newsletters:

- **IF/THEN Statements**: "If price tests X level, flushes it, and recovers, I long for a level to level move"
- **Level-Based Decisions**: "Above X, target Y; below X, target Z"
- **Conditional Actions**: "If selling into 5665 in a controlled manner I'd consider a bid there, but if it's an aggressive, news-driven sell I'd prefer to see it hold then recover 5672"

## 6. Volatility Context

- **High Volatility**: Clean Failed Breakdowns with minimal acceptance needed
- **Low Volatility**: Choppy Failed Breakdowns requiring extended acceptance
- **Special Event Days**: FOMC, CPI days require special handling (size down, expect even more traps)

## 7. Optimal Trading Windows

- **Primary Windows**: Before 11am, after 3pm
- **Avoid**: 11am-2pm (typically choppy)
- **Overnight Trading**: More trappy, generally avoided

## 8. Golden Rule Implementation

"90% of intraday moves do not follow through to produce a smooth trend day. Most days, price spends the majority of the session playing in various sized ranges."

Key implementations:
- Always manage trades level-to-level
- Don't overtrade (1-2 trades per day)
- Don't predict price paths
- Leave runners to catch the rare trend legs

## 9. Trade Plan Template

For each trading day:

1. **Market Context**:
   - Current regime
   - Mode expectations (1 or 2)
   - Key technical structures

2. **Primary Setups** (TIER 0):
   - Failed Breakdown opportunities
   - Specific levels with acceptance requirements

3. **Secondary Setups** (TIER 1):
   - Level Reclaim opportunities
   - Range boundaries

4. **Advanced Setups** (TIER 2):
   - Breakdown Short opportunities (if applicable)
   - Higher-risk setups

5. **Entry Mechanics**:
   - Acceptance pattern requirements
   - Momentum confirmation signals

6. **Trade Management**:
   - Level-to-level profit targets
   - Runner management
   - Stop management

7. **Invalidation Signals**:
   - What would negate the primary setups
   - When to stand aside

## JSON Schema for Structured Extraction

```json
{
  "market_context": {
    "regime": "buy-dips|sell-rips|range-bound",
    "mode_expectation": "mode_1|mode_2",
    "volatility": "high|medium|low",
    "special_events": ["FOMC", "CPI", etc.],
    "technical_structure": {
      "pattern": "flag|range|breakout|breakdown",
      "range_boundaries": [lower_bound, upper_bound],
      "status": "mature|developing|breaking"
    }
  },
  "key_levels": {
    "major_supports": [level1, level2, ...],
    "minor_supports": [level1, level2, ...],
    "major_resistances": [level1, level2, ...],
    "minor_resistances": [level1, level2, ...]
  },
  "primary_setups": {
    "failed_breakdowns": [
      {
        "level": number,
        "significance": "daily_low|multi-hour_low|cluster",
        "flush_target": number,
        "recovery_level": number,
        "acceptance_required": "yes|no",
        "targets": [level1, level2, ...],
        "stop": number
      }
    ]
  },
  "secondary_setups": {
    "level_reclaims": [
      {
        "level": number,
        "significance": "major|minor",
        "acceptance_required": "yes|no",
        "targets": [level1, level2, ...],
        "stop": number
      }
    ]
  },
  "advanced_setups": {
    "breakdown_shorts": [
      {
        "level": number,
        "bounce_target": number,
        "failed_breakdown_low": number,
        "short_trigger": number,
        "targets": [level1, level2, ...],
        "stop": number
      }
    ]
  },
  "trade_management": {
    "first_target_reduction": "75%",
    "second_target_reduction": "15%",
    "runner_size": "10%",
    "stop_management": "move_to_breakeven|trail",
    "profit_protection_mode": "active|inactive"
  },
  "decision_trees": [
    {
      "condition": "text description of condition",
      "action": "text description of action",
      "target": "text description of target"
    }
  ],
  "optimal_trading_windows": ["pre_market", "open_to_11am", "3pm_to_close"],
  "invalidation_signals": ["text descriptions of what would negate setups"]
}
```

## Analysis Application Process

1. **Read the entire newsletter first** to understand the overall context
2. **Identify the market regime** to determine priority setup focus
3. **Extract all potential Failed Breakdown setups** with precise levels and acceptance patterns
4. **Map the technical structure** (ranges, flags, etc.)
5. **Document decision trees** and conditional logic
6. **Extract level-to-level trade management guidelines**
7. **Identify any special conditions** (FOMC, CPI days, etc.)
8. **Generate structured JSON output**
9. **Create prioritized trade plan** based on the structured data

## Example Application

When analyzing a newsletter:

1. Find statements like "since the April 6th low one month ago, the buy dips regime" to identify regime
2. Look for detailed Failed Breakdown explanations (e.g., "a Failed Breakdown requires price to set, lose, and recover a significant low")
3. Identify acceptance patterns (e.g., "4:30PM we rallied to 5628, then rejected down to 5600. This is acceptance.")
4. Extract all price levels, categorizing them by importance
5. Document trade management protocols (e.g., "Locked in 75% profits at 5636 1st up, left 25% to run")
6. Map decision logic (e.g., "If 5620 fails now, we see 5613, 5600")
7. Note any volatility context (e.g., "volatile markets the Failed Breakdowns are smooth and clean")
