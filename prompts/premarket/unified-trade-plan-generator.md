# Enhanced Unified Trade Plan Generator

This document outlines the improved process for generating a unified trade plan based on Adam Mancini's methodology, with a specific focus on prioritizing Failed Breakdowns (his core edge) and implementing the level-to-level approach.

## Trade Plan Structure

The unified trade plan should follow this structure:

```
# SPX/ES UNIFIED TRADE PLAN - [DATE]

## MARKET CONTEXT
- Current Regime: [Buy-Dips/Sell-Rips/Range-Bound]
- Mode Expectation: [Mode 1 (Trend)/Mode 2 (Range)]
- Volatility Context: [High/Medium/Low]
- Technical Structure: [Flag/Range/Breakout/Breakdown]
  - Range Boundaries: [Lower] to [Upper]
  - Structure Status: [Mature/Developing/Breaking]

## KEY LEVELS
### Major Supports
- [Level 1] - [Brief context]
- [Level 2] - [Brief context]

### Major Resistances
- [Level 1] - [Brief context]
- [Level 2] - [Brief context]

## PRIMARY SETUPS (TIER 0)
### Failed Breakdown Opportunities
1. **[Level] Failed Breakdown**
   - Significant Low: [Level]
   - Flush Target: [Level]
   - Recovery Trigger: [Level]
   - Acceptance Required: [Yes/No]
   - Entry: [Level] after acceptance
   - Targets: 
     - 75% off at [Level 1]
     - More off at [Level 2], leave 10% runner
   - Stop: [Level]
   - Notes: [Critical context]

## SECONDARY SETUPS (TIER 1)
### Level Reclaim Opportunities
1. **[Level] Reclaim**
   - Significance: [Context]
   - Entry: [Level] after acceptance
   - Targets: 
     - 75% off at [Level 1]
     - More off at [Level 2], leave 10% runner
   - Stop: [Level]
   - Notes: [Critical context]

## ADVANCED SETUPS (TIER 2)
### Breakdown Short Opportunities
1. **[Level] Breakdown Short**
   - Bounce Level: [Level]
   - Failed Breakdown Setup: [Level to Level]
   - Short Trigger: [Level]
   - Targets:
     - 75% off at [Level 1]
     - More off at [Level 2], leave 10% runner
   - Stop: [Level]
   - Notes: [Critical context]

## TRADE MANAGEMENT PROTOCOL
- First Target: Lock in 75% profits at first level
- Second Target: Lock in more at second level, leave 10% runner
- Stop Management: Never let entire trade go red after first target hit
- Profit Protection: After first green trade, additional trades only if runner stops and new setup emerges

## DECISION TREE
- IF [condition], THEN [action] targeting [target]
- IF [condition], THEN [action] targeting [target]

## OPTIMAL TRADING WINDOWS
- Primary: [Before 11am, After 3pm]
- Avoid: [11am-2pm]

## INVALIDATION SIGNALS
- [What would negate primary setups]
- [When to stand aside]

## GOLDEN RULE REMINDER
90% of intraday moves do not follow through to produce a smooth trend day. This requires:
1. Always manage trades level-to-level
2. Don't overtrade (1-2 trades max)
3. Don't predict price paths
4. Leave runners to catch trend legs
```

## Priority Tiers

The trade plan must clearly prioritize setups in these tiers:

1. **TIER 0 (Highest Priority)**: Failed Breakdown setups
   - Require all three components (significant low, flush, recovery) with acceptance
   - Always list these first and with the most detail

2. **TIER 1 (Secondary Priority)**: Level Reclaim setups
   - Recovery of significant support/resistance shelves
   - Require acceptance and momentum

3. **TIER 2 (Advanced/Difficult)**: Breakdown Short setups
   - Only for experienced traders
   - Lower probability (approx. 40% success rate)
   - Require Failed Breakdown attempt first

## Market Context Section

The Market Context section must clearly identify:

1. **Current Regime**: 
   - Buy-dips (Failed Breakdowns prioritized)
   - Sell-rips (Breakdown Shorts prioritized)
   - Range-bound (both at extremes)

2. **Mode Expectation**:
   - Mode 1: Rare (10%) open-to-close trend days
   - Mode 2: Common (90%) days with multiple moves and traps

3. **Volatility Context**:
   - High: Clean setups, minimal acceptance needed
   - Low: Choppy setups, extended acceptance required

4. **Technical Structure**:
   - Current pattern (flag, range, etc.)
   - Range boundaries
   - Structure status

## Trade Management Protocol

This section must standardize the level-to-level approach:

1. **First Target**: Lock in 75% profits at first level up
2. **Second Target**: Lock in more at second level, leave 10% runner
3. **Stop Management**: Never let entire trade go red after first target hit
4. **Profit Protection Mode**: After first green trade, only additional trades if runner stops and new setup emerges

## Acceptance Patterns

For each Failed Breakdown and Level Reclaim, specify the required acceptance pattern:

1. **Type 1 Acceptance**: Price back-tests the level, sells off, then returns
2. **Type 2 Acceptance**: Price recovers the level, rips, sells off to back-test, then rallies
3. **Time Requirements**: Longer acceptance needed in low volatility

## Optimal Trading Windows

Highlight Mancini's preferred trading windows:

- **Primary Windows**: Before 11am, after 3pm
- **Avoid**: 11am-2pm (typically choppy)
- **Overnight**: More trappy, generally avoided

## Invalidation Signals

Clearly state what would negate each setup:

1. **Failed Breakdown Invalidation**: Loss of the lowest low
2. **Level Reclaim Invalidation**: Failure back below the level
3. **Breakdown Short Invalidation**: Recovery above the entry level

## Golden Rule Implementation

Remind of the Golden Rule's practical implementation:

1. Always manage trades level-to-level
2. Don't overtrade (1-2 trades max)
3. Don't predict price paths
4. Leave runners to catch trend legs

## Process for Generating the Plan

1. Extract structured data using the Mancini Newsletter Analyzer
2. Sort setups into appropriate priority tiers
3. Start with the Market Context section
4. List Key Levels (only major ones for clarity)
5. Detail all TIER 0 setups with acceptance patterns
6. Include TIER 1 and TIER 2 setups with appropriate cautions
7. Standardize the Trade Management Protocol section
8. Include the Decision Tree from extracted conditions
9. Add Optimal Trading Windows and Invalidation Signals
10. Conclude with the Golden Rule Reminder
