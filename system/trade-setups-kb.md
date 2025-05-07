---
title: Trade Setups Knowledge Base  
description: Canonical list of setups and triggers used by Simon Plant across swing, scalp, and macro trades  
tags: [system, behavior, execution, structure]  
author: Simon Plant  
last_updated: 2025-05-07  
version: 1.5  
category: system  
usage: Reference and refine trigger criteria, expected structure, and trade lifecycle for each setup  
status: stable  
requires: []  
linked_outputs: []  
input_format: markdown  
output_format: markdown  
ai_enabled: true  
---

# TRADE SETUPS KNOWLEDGE BASE

This document defines all canonical trade setups used in Simon Plant's trading system, including entry criteria, confirmation signals, execution rules, and expected behavior.

---

## 1. FAILED BREAKDOWN / FAILED BREAKOUT (MANCINI CORE)

### Definition
A price pattern where a significant support/resistance level is briefly violated, but price quickly recovers and reclaims the level, causing a squeeze in the opposite direction.

### Criteria
- **Support/Resistance**: Must be significant (daily pivot, prior day's high/low, major MA)
- **Violation**: Clear break of the level with price acceptance below/above
- **Recovery**: Full reclamation of the level with acceptance
- **Volume**: Typically shows increased volume on the recovery

### Execution
- **Entry Trigger**: First candle that reclaims and closes above/below the violated level
- **Confirmation**: Price showing acceptance above/below the level (usually 1-3 candles)
- **Stop Placement**: Below/above the low/high of the breakdown/breakout candle
- **Targets**: 
  - T1: First structural level (⅓ position)
  - T2: Second structural level (⅓ position)
  - T3: Extended target for runner (⅓ position)

### Expected Behavior
- Squeeze is usually proportional to the significance of the violated level
- More powerful when it occurs at the end of a directional move
- Often represents institutional accumulation/distribution

### Management Protocol
- Exit ⅓ at first target and raise stop to breakeven
- Exit ⅓ at second target and trail stop for remainder
- If price stalls after reclaim, tighten stop to protect gains

---

## 2. RANGE RECLAIM (TIER 1 SETUP)

### Definition
Price reclaims a significant level within an established range after a failed breakout/breakdown attempt.

### Criteria
- **Range Definition**: Clear upper and lower boundaries with multiple touches
- **Level Violation**: One boundary of the range is briefly violated
- **Reclaim**: Price fully reclaims the range boundary
- **Context**: Typically occurs with divergence on technical indicators

### Execution
- **Entry Trigger**: Confirmation candle closing back inside the range
- **Confirmation**: Price acceptance within range (2+ candles)
- **Stop Placement**: Beyond the recent extreme that occurred outside the range
- **Targets**:
  - T1: Mid-range level (½ position)
  - T2: Opposite boundary of the range (runner)

### Expected Behavior
- Often moves to test the opposite boundary of the range
- Requires patience as price may consolidate after reclaim
- Frequent occurrence during low-volatility periods

### Management Protocol
- Scale out half position at mid-range
- Trail stop based on minor swing levels for remainder
- Exit full position if opposite boundary tested

---

## 3. TREND CONTINUATION PULLBACK (DP FAVORITE)

### Definition
A retracement to key support/resistance within an established trend that offers advantageous risk-reward entry.

### Criteria
- **Trend Identification**: Clear directionality with higher highs/lows (uptrend) or lower highs/lows (downtrend)
- **Key Level**: Pullback to significant technical level (MA, prior breakout, Fibonacci)
- **Depth Control**: Pullback should not exceed 50-61.8% of prior swing
- **Structure Preservation**: Trend structure must remain intact

### Execution
- **Entry Trigger**: First candle showing rejection at support/resistance
- **Confirmation**: Momentum shift at level (hammer, engulfing, inside bar breakout)
- **Stop Placement**: Below/above the pullback extreme
- **Targets**:
  - T1: Prior swing high/low (⅓ position)
  - T2: 1:1 extension of prior swing (⅓ position)
  - T3: 1.618 extension (⅓ position)

### Expected Behavior
- Strongest setups occur on third pullback in new trend
- Higher probability when pullback respects key MAs (21/50/200)
- Often presents consolidation before continuation

### Management Protocol
- First target exit is non-negotiable
- After T1 hit, move stop to breakeven
- Use 8 EMA as trail guide after T2

---

## 4. VOLUME CLIMAX REVERSAL (SPX 0DTE)

### Definition
A significant intraday reversal following extreme volume and momentum exhaustion at key technical levels.

### Criteria
- **Volume Spike**: Volume at least 150% of 10-period average
- **Momentum Extreme**: RSI reaching overbought/oversold (above 80/below 20)
- **Key Level**: Occurring at significant support/resistance
- **Candle Pattern**: Large range candle with reversal characteristics

### Execution
- **Entry Trigger**: First counter-trend candle with strong close
- **Confirmation**: Follow-through in reversal direction on next candle
- **Stop Placement**: Beyond the extreme point (with buffer)
- **Targets**:
  - T1: First significant resistance/support level (½ position)
  - T2: VWAP or prior significant level (½ position)

### Expected Behavior
- Often presents "V" or inverted "V" pattern on chart
- Most reliable in final hour of trading (3:00-4:00 PM)
- Typically retraces at least 50% of the prior move

### Management Protocol
- Very tight management required (0DTE specific)
- Half position exit at first target is mandatory
- Consider full exit into strong counter-moves

---

## 5. EARNINGS GAP PLAY (DP SIGNAL REQUIRED)

### Definition
Trading post-earnings price gaps based on technical levels and gap fill probability.

### Criteria
- **Gap Size**: At least 3% for small caps, 1.5% for large caps
- **DP Signal**: Must have explicit DP confirmation/signal
- **Level Alignment**: Gap must interact with significant technical level
- **Volume Confirmation**: Opening volume must be significantly above average

### Execution
- **Gap Up Fade Entry**: First significant rejection at resistance within first 30 minutes
- **Gap Down Buy Entry**: First significant support test and hold within first 30 minutes
- **Gap Continuation Entry**: Breakout above first 30-minute high (for gaps up) or breakdown below first 30-minute low (for gaps down)
- **Stop Placement**: Beyond the first 30-minute candle range
- **Targets**:
  - Fade Targets: Prior day close (gap fill)
  - Continuation Targets: 1:1 move from gap size

### Expected Behavior
- Small to mid gaps (2-5%) have higher fill probability than larger gaps
- First 30-minute range often defines the day's trading range
- Multiple timeframe alignment increases probability

### Management Protocol
- Avoid holding overnight unless explicitly planned
- Scale out ⅓ position at each target level
- Honor predetermined stop regardless of conviction

---

## 6. INNER CIRCLE TRADE MIRROR (DP/MANCINI ALIGNMENT)

### Definition
High-conviction trade that aligns with specific signals from DP and/or Mancini with emphasis on exact execution parameters.

### Criteria
- **Source Clarity**: Specific call-out in DP morning brief or Mancini blueprint
- **Multiple Confirmation**: At least two IC sources aligned on direction
- **Technical Alignment**: Must align with independent technical criteria
- **Clear Parameters**: Defined entry, stop, and target levels

### Execution
- **Entry Trigger**: Exact conditions specified by IC source
- **Position Sizing**: Use defined sizing from trading-capital-profile.md
- **Stop Placement**: Exactly as specified in IC recommendation
- **Targets**: Mirror IC targets precisely

### Expected Behavior
- Often outperforms pure technical setups
- May have catalyst or institutional insight component
- Typically involves stronger trending behavior

### Management Protocol
- Follow IC management instructions exactly
- If instructions absent, apply standard tiering:
  - ⅓ at first target
  - ⅓ at second target
  - Let runner work with trailing stop
- Document any deviation from IC guidance

---

## 7. OPENING RANGE BREAKOUT/BREAKDOWN (ORB)

### Definition
Trading breakouts or breakdowns from the initial trading range established in the first 15-30 minutes of the session.

### Criteria
- **Clear Range**: Defined high and low within first 15-30 minutes
- **Volume Pattern**: Volume contraction during range, expansion on breakout
- **Context**: Alignment with daily trend and market bias
- **Trigger**: Decisive breach of range with momentum

### Execution
- **Entry Trigger**: Breakout/breakdown of opening range with confirmation
- **Confirmation**: Candle close beyond range + momentum indicator alignment
- **Stop Placement**: Opposite side of opening range
- **Targets**:
  - T1: Range height projected from breakout point (full position exit for scalp)
  - T2: Prior day significant level (for swing)

### Expected Behavior
- Higher success rate on trend days
- Often fails on inside days or when major economic reports pending
- More reliable on 30-minute ranges than 15-minute on SPX

### Management Protocol
- Quick exit if price returns into range (failed breakout)
- Scale half position at 1:1 risk-reward
- Trail remainder with 8 EMA

---

## 8. VWAP BOULEVARD (INTRADAY CASH FLOW)

### Definition
Trading price movements along the VWAP as support/resistance during trending intraday sessions.

### Criteria
- **Clear Trend Day**: Price consistently respecting VWAP as support/resistance
- **VWAP Test**: Clean test of VWAP with rejection
- **Confirmation Candle**: Strong momentum candle after test
- **Macro Alignment**: Setup direction must align with larger market bias

### Execution
- **Long Entry**: First strong bullish candle after VWAP test from above
- **Short Entry**: First strong bearish candle after VWAP test from below
- **Stop Placement**: Beyond the test candle's high/low
- **Targets**:
  - T1: Prior swing high/low (full position for cashflow)
  - T2: Daily range extension (for swing trades only)

### Expected Behavior
- Works best on directional trend days
- Higher probability when combined with key MAs (21, 50)
- Usually presents 1-3 times per trend day

### Management Protocol
- Strict stop enforcement if VWAP is breached
- Full position exit at first target for cash flow objective
- If holding for swing, move stop to breakeven after first target

---

## SETUP TAGGING SYSTEM

Each setup in the trade log should be tagged using this standardized system:

### Primary Type
- FB: Failed Breakdown/Breakout
- RR: Range Reclaim
- TC: Trend Continuation
- VC: Volume Climax
- EG: Earnings Gap
- IC: Inner Circle Mirror
- ORB: Opening Range Breakout
- VB: VWAP Boulevard

### Subtype (Direction-Duration)
- L-CF: Long Cashflow (intraday)
- S-CF: Short Cashflow (intraday)
- L-SW: Long Swing (1-5 days)
- S-SW: Short Swing (1-5 days)
- L-LT: Long Long-term (5+ days)
- S-LT: Short Long-term (5+ days)
- L-0D: Long 0DTE (same day expiry)
- S-0D: Short 0DTE (same day expiry)

### Conviction
- BI: Big Idea (highest)
- HC: High Conviction
- MC: Medium Conviction
- LC: Low Conviction

### Complete Tag Example
`FB-L-CF-HC` = Failed Breakdown Long Cashflow High Conviction

---

## SETUP COMPATIBILITY MATRIX

| Setup Type | Cash Flow | Swing | Long-term | 0DTE | Best Market Regime |
|------------|-----------|-------|-----------|------|------------------|
| FB         | ✓✓✓      | ✓✓   | ✓        | ✓✓  | Range/Trend Reversal |
| RR         | ✓✓       | ✓✓✓ | ✓✓      | ✓   | Range Bound      |
| TC         | ✓✓       | ✓✓✓ | ✓✓✓    | ✓   | Trending         |
| VC         | ✓        | ✓    | ✗        | ✓✓✓ | Volatile/Event Driven |
| EG         | ✓✓✓     | ✓✓   | ✓        | ✓✓  | Event Driven      |
| IC         | ✓✓       | ✓✓✓ | ✓✓✓    | ✓   | Any (DP/Mancini guided) |
| ORB        | ✓✓✓     | ✓    | ✗        | ✓✓  | Trending         |
| VB         | ✓✓✓     | ✓    | ✗        | ✓   | Trending         |

Legend: ✓✓✓ = Ideal, ✓✓ = Good, ✓ = Acceptable, ✗ = Not Recommended

---

## ADVANCED SETUP SEQUENCING (MULTI-SETUP STACKING)

The highest probability trades occur when multiple setup types align at the same level/time. Priority should be given to trades with at least two setup types in alignment.

### High-Probability Combinations:
1. **FB + IC**: Failed Breakdown with Inner Circle confirmation
2. **TC + VB**: Trend Continuation at VWAP test
3. **ORB + FB**: Opening Range Breakout that recovers a key prior level
4. **RR + VC**: Range Reclaim after volume climax
5. **EG + TC**: Earnings Gap that aligns with prevailing trend direction

### Setup Scoring System:
- Primary Setup: 3 points
- Secondary Aligned Setup: 2 points
- Tertiary Aligned Setup: 1 point
- Setup Conflicts: -1 point per conflict

Trades scoring 5+ points should receive sizing priority, with 7+ qualifying for "Big Idea" conviction level when other criteria are met.

---

## CHANGELOG

- v1.5 (2025-05-07): Added Advanced Setup Sequencing, Setup Tagging System, and Setup Compatibility Matrix
- v1.2 (2025-05-01): Added VWAP Boulevard and Opening Range Breakout setups
- v1.1 (2025-04-15): Added Earnings Gap Play and Inner Circle Trade Mirror setups
- v1.0 (2025-04-01): Initial documentation of core setup types