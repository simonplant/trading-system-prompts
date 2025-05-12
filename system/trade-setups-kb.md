---
title: Trade Setups Knowledge Base  
description: Unified setup taxonomy used across all trade sources with enhanced scoring system
tags: [system, setup, taxonomy, execution, structure]  
author: Simon Plant  
last_updated: 2025-05-12  
version: 2.0  
category: system  
usage: Reference for classifying all trade setups regardless of source (DP, Mancini, or custom)
status: active  
requires: []  
linked_outputs: [unified-trade-plan-generator.md]  
input_format: markdown  
output_format: markdown  
ai_enabled: true  
---

# UNIFIED TRADE SETUPS KNOWLEDGE BASE

This document defines the unified setup taxonomy used across all trade sources in Simon Plant's trading system, providing classification without excessive filtering.

---

## 1. FAILED BREAKDOWN / FAILED BREAKOUT (CORE SETUP)

### Definition
A price pattern where a significant support/resistance level is briefly violated, but price quickly recovers and reclaims the level, causing a squeeze in the opposite direction.

### Sources 
- **Mancini:** Primary setup (highest priority)
- **DP:** Often mentioned as "retest and hold" or "shakeout and go"

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

### Classification Tag
`FB-L-CF-HC` = Failed Breakdown Long Cashflow High Conviction

### Conviction Translation
- Mancini "Beautiful Breakdown" = DP "BIG_IDEA"
- Mancini "Standard Breakdown" = DP "HIGH"
- Mancini "Possible Breakdown" = DP "MEDIUM"

---

## 2. RANGE RECLAIM / LEVEL RECLAIM (TIER 1 SETUP)

### Definition
Price reclaims a significant level within an established range after a failed breakout/breakdown attempt.

### Sources
- **Mancini:** Secondary setup (Tier 1 priority)
- **DP:** Often labeled as "reclaim" or "dip buy at support"

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

### Classification Tag
`RR-L-CF-MC` = Range Reclaim Long Cashflow Medium Conviction

### Conviction Translation
- Mancini "Strong Reclaim" = DP "HIGH"
- Mancini "Standard Reclaim" = DP "MEDIUM"
- Mancini "Possible Reclaim" = DP "LOW"

---

## 3. TREND CONTINUATION PULLBACK (DP FAVORITE)

### Definition
A retracement to key support/resistance within an established trend that offers advantageous risk-reward entry.

### Sources
- **DP:** Primary setup (frequently highest conviction)
- **Mancini:** Often mentioned as "dip to buy" in uptrend

### Criteria
- **Trend Identification**: Clear directionality with higher highs/lows (uptrend) or lower highs/lows (downtrend)
- **Key Level**: Pullback to significant technical level (MA, prior breakout, Fibonacci)
- **Depth Control**: Pullback should not exceed 50-61.8% of prior swing
- **Structure Preservation**: Trend structure must remain intact

### Execution
- **Entry Trigger**: First strong candle showing rejection at support/resistance
- **Confirmation**: Momentum shift at level (hammer, engulfing, inside bar breakout)
- **Stop Placement**: Below/above the pullback extreme
- **Targets**:
  - T1: Prior swing high/low (⅓ position)
  - T2: 1:1 extension of prior swing (⅓ position)
  - T3: 1.618 extension (⅓ position)

### Classification Tag
`TC-L-SW-HC` = Trend Continuation Long Swing High Conviction

### Conviction Translation
- DP "BIG_IDEA continuation" = Mancini "Primary Buy"
- DP "HIGH continuation" = Mancini "Secondary Buy"
- DP "MEDIUM continuation" = Mancini "Possible Buy"

---

## 4. BREAKDOWN SHORT / BREAKDOWN FADE (ADVANCED)

### Definition
A high risk-reward short entry after a significant level breakdown with follow-through.

### Sources
- **Mancini:** Tier 2 setup (advanced, lower probability)
- **DP:** Sometimes mentioned as "breakdown short" or "failure fade"

### Criteria
- **Support Break**: Clear breakdown below significant support
- **Follow-through**: Initial confirmation of the breakdown direction
- **Retest Setup**: A retest of the breakdown level from below
- **Rejection**: Clear rejection at the previously broken level

### Execution
- **Entry Trigger**: Rejection candle at retested level
- **Confirmation**: Momentum shift down from level
- **Stop Placement**: Above recent swing high or breakdown level
- **Targets**:
  - T1: First downstream support (50% position)
  - T2: Extended target (50% position)

### Classification Tag
`BS-S-CF-LC` = Breakdown Short Cashflow Low Conviction

### Conviction Translation
- Mancini "Breakdown Short" = DP "MEDIUM"
- Mancini "Possible Breakdown Short" = DP "LOW"

---

## 5. OPENING RANGE BREAKOUT (SPX FAVORITE)

### Definition
Trading breakouts or breakdowns from the initial trading range established in the first 15-30 minutes of the session.

### Sources
- Both DP and Mancini reference regularly
- Particularly effective for SPX/ES trading

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

### Classification Tag
`ORB-L-CF-MC` = Opening Range Breakout Long Cashflow Medium Conviction

### Conviction Translation
- Strong volume breakout = "HIGH"
- Normal breakout = "MEDIUM"
- Marginal breakout = "LOW"

---

## UNIFIED SETUP TAGGING SYSTEM

Each setup in the trade plan uses this standardized tagging system regardless of source:

### Primary Type
- FB: Failed Breakdown/Breakout
- RR: Range/Level Reclaim
- TC: Trend Continuation
- BS: Breakdown Short
- ORB: Opening Range Breakout
- EG: Earnings Gap
- IC: Inner Circle Mirror
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

## UNIFIED CONVICTION SCORING

All trade ideas across sources are rated on a unified conviction scale:

| DP Conviction | Mancini Equivalent | Combined Score | Position Size |
|---------------|---------------------|---------------|---------------|
| BIG_IDEA | Primary Failed Breakdown | 10/10 | 100% |
| HIGH | Strong Failed Breakdown/Level Reclaim | 8/10 | 75-100% |
| MEDIUM | Standard/Good Setup | 6/10 | 50-75% |
| LOW | Possible/Lower Probability | 4/10 | 25-50% |
| MONITORING | Watching/Potential Setup | 2/10 | 0-25% |

### Conviction Amplifiers
- Multiple source agreement: +2 points
- Setup score 7+: +1 point
- Strong risk/reward (3:1+): +1 point
- Perfect regime alignment: +1 point

### Conviction Reducers
- Contradictory source signals: -2 points
- Poor risk/reward (<1:1): -2 points
- Regime misalignment: -1 point
- Behavioral flag match: -1 point

---

## SETUP COMPATIBILITY MATRIX

| Setup Type | Trending Up | Trending Down | Choppy/Range | Event-Driven | Squeeze |
|------------|-------------|--------------|--------------|--------------|---------|
| FB (Failed Breakdown) | ✓✓✓ | ✓ | ✓✓ | ✓ | ✓✓✓ |
| RR (Range Reclaim) | ✓ | ✓ | ✓✓✓ | ✓ | ✓✓ |
| TC (Trend Continuation) | ✓✓✓ | ✓✓✓ | ✗ | ✓ | ✓✓ |
| BS (Breakdown Short) | ✗ | ✓✓✓ | ✓ | ✓ | ✗ |
| ORB (Opening Range B/O) | ✓✓✓ | ✓✓✓ | ✗ | ✓ | ✓✓ |

Legend: ✓✓✓ = Ideal, ✓✓ = Good, ✓ = Acceptable, ✗ = Not Recommended

---

## MULTI-SETUP SCORING SYSTEM

The setup scoring system provides additional insight but doesn't override true conviction:

### Individual Setup Scoring
- Primary Setup: 3 points
- Secondary Aligned Setup: 2 points
- Tertiary Aligned Setup: 1 point
- Setup Conflicts: -1 point per conflict

### Total Score Interpretation
- 7-10 points: Exceptional setup alignment (potential conviction boost)
- 5-6 points: Strong setup alignment (potential size increase)
- 3-4 points: Average setup quality (standard sizing)
- 0-2 points: Weak setup alignment (reduced sizing suggested)
- Negative: Conflicting setups (extreme caution warranted)

---

## KNOWLEDGE BASE USAGE

This knowledge base serves to:
1. Provide consistent classification across all trade sources
2. Enable setup-specific performance tracking
3. Support true conviction scoring regardless of source
4. Inform position sizing without rigid restrictions
5. Create shared language across trading methodology

It is designed to inform and enhance trades, not filter or reject valid opportunities.

## CHANGELOG

- v2.0 (2025-05-12): Completely revised with unified conviction scoring, source translations, and combined taxonomy
- v1.5 (2025-05-07): Added Setup Scoring System and Compatibility Matrix
- v1.0 (2025-04-01): Initial documentation of core setup types
