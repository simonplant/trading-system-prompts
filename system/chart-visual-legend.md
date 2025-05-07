---
title: Chart Visual Legend  
description: Defines visual color coding for MA overlays and technical indicators in Simon's chart screenshots  
tags: [system, docs, technical]  
author: Simon Plant  
last_updated: 2025-05-10  
version: 2.0  
category: system  
usage: Reference when interpreting chart screenshots with MA overlays or custom color codings. Produces clarity for AI or human reading of screenshots. Consumes visual color legend.
status: stable  
requires: []  
linked_outputs: [dp-trade-analyzer.md, mancini-trade-analyzer.md, copilot-confirm.md]  
input_format: markdown  
output_format: markdown  
ai_enabled: false  
---

# CHART VISUAL LEGEND

This file defines the visual schema used in Simon Plant's charting layout (primarily on ThinkOrSwim), to ensure consistent interpretation of screenshots and accurate AI analysis.

---

## MOVING AVERAGES (SMA)

| Color        | Period | Notes                                                |
|--------------|--------|------------------------------------------------------|
| **Cyan**     | 8 SMA  | Short-term price momentum; also used for ES OI lines |
| **Traffic Light** | 21 SMA | Custom color logic:<br>- Green: Price > 8 & 21<br>- Yellow: Between<br>- Red: Price < 8 & 21 |
| **Mid Blue** | 34 SMA | Medium-term price trend                              |
| **Navy Blue**| 50 SMA | Classic support/resistance MA                        |
| **Orange**   | 100 SMA| Longer-term MA; structural level                     |
| **Red**      | 200 SMA| Institutional trend level                            |

---

## VWAP + VOLATILITY

- **Thin Yellow Line**: Intraday VWAP  
- **Long-Dashed Yellow Line**: AVWAP anchored to **01/01/2025**
- **Grey Bands**: Keltner Channels (volatility envelope)

---

## STRUCTURAL INDICATORS

- **Dotted Horizontal Lines**: Pivot Points (S3 – S2 – S1 – **PP** – R1 – R2 – R3)  
- **White Trendlines**: Manually drawn support/resistance or patterns  
- **Short-Dotted White Lines**: Significant price levels (prior highs/lows, gaps, macro SR)
- **Cyan Bars/Lines**: May represent Open Interest walls on ES futures

---

## MA ALIGNMENT PATTERNS

| Pattern | Configuration | Indication |
|---------|--------------|------------|
| **Stacked Bullish** | 8 > 21 > 34 > 50 > 100 > 200 | Strong uptrend |
| **Stacked Bearish** | 8 < 21 < 34 < 50 < 100 < 200 | Strong downtrend |
| **Bull Cross** | Faster MA crosses above slower MA | Bullish signal strength varies with MA pair |
| **Bear Cross** | Faster MA crosses below slower MA | Bearish signal strength varies with MA pair |
| **Death Cross** | 50 SMA crosses below 200 SMA | Major bearish signal |
| **Golden Cross** | 50 SMA crosses above 200 SMA | Major bullish signal |

---

## PRICE-MA RELATIONSHIPS

| Relationship | Description | Interpretation |
|--------------|-------------|----------------|
| **Price > All MAs** | Price trading above all moving averages | Strong bullish momentum |
| **Price < All MAs** | Price trading below all moving averages | Strong bearish momentum |
| **Price between MAs** | Price between fast and slow MAs | Transitional or consolidation phase |
| **MA Compression** | Multiple MAs converging | Directional uncertainty, pending resolution |
| **MA Expansion** | MAs spreading apart | Trending environment, clear direction |

---

## VWAP RELATIONSHIPS

| Relationship | Description | Interpretation |
|--------------|-------------|----------------|
| **Price > VWAP** | Price above daily VWAP | Bullish intraday bias |
| **Price < VWAP** | Price below daily VWAP | Bearish intraday bias |
| **Price = VWAP** | Price testing VWAP | Fair value reversion point |
| **AVWAP Test** | Price approaching anchored VWAP | Key historical reference test |
| **VWAP + AVWAP intersections** | VWAP crosses AVWAP | Often act as reclaim/flush triggers |

---

## INTERPRETATION TIPS

- **Traffic Light 21 SMA** helps visualize momentum context at a glance.
- **Red + Orange = danger zones**; expect reaction at 100/200 SMA.
- **VWAP + AVWAP intersections** often act as reclaim/flush triggers.
- **Trending Price Over 8 & 21** indicates strong short-term momentum.
- **Price Between Multiple MAs** often signals consolidation phase.

---

## LEVEL HIERARCHY

When evaluating support and resistance levels, use this priority hierarchy:

1. **Major Pivots**: Significant swing highs/lows on daily+ timeframes
2. **200 SMA**: Strongest institutional reference
3. **Anchored VWAP**: Long-term fair value from key date
4. **100/50 SMAs**: Strong institutional references
5. **Daily VWAP**: Intraday fair value
6. **34/21/8 SMAs**: Short-term trend indicators
7. **Pivot Points**: Mathematical reference levels
8. **Round Numbers**: Psychological levels (e.g., 4500, 4550)

---

## CHART TIME FRAMES

| TimeFrame | Bar Period | Primary Use |
|-----------|------------|-------------|
| **5-Minute** | 5m | Intraday entries and precise sizing |
| **15-Minute** | 15m | Intraday trend identification |
| **1-Hour** | 1h | Intraday support/resistance |
| **4-Hour** | 4h | Multi-day swings |
| **Daily** | D | Position trades and major levels |

---

## VERSION CONTROL

To update:
1. Modify this file in `/system/chart-visual-legend.md`
2. Update `last_updated` field and increment version number
3. Push changes to `main` branch

---

## CHANGELOG

- v2.0 (2025-05-10): Added MA alignment patterns, price-MA relationships, VWAP relationships, level hierarchy, and chart timeframes
- v1.0 (2025-05-05): Initial implementation of the chart visual legend