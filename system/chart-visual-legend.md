---
title: Chart Visual Legend  
description: Defines visual color coding for MA overlays in Simon’s chart screenshots  
tags: [system, docs]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.0  
category: system  
usage: Reference when interpreting chart screenshots with MA overlays or custom color codings. Produces clarity for AI or human reading of screenshots. Consumes visual color legend.
status: stable  
requires: []  
linked_outputs: []  
input_format: markdown  
output_format: markdown  
ai_enabled: false  
---

# CHART VISUAL LEGEND

This file defines the visual schema used in Simon Plant’s charting layout (primarily on ThinkOrSwim), to ensure consistent interpretation of screenshots and accurate AI analysis.

---

## MOVING AVERAGES (SMA)

| Color        | Period | Notes                                                |
|--------------|--------|------------------------------------------------------|
| **Cyan**     | 8 SMA  | Short-term price momentum; also used for ES OI lines |
| **Traffic Light** | 21 SMA | Custom color logic:  
  - Green: Price > 8 & 21  
  - Yellow: Between  
  - Red: Price < 8 & 21 |
| **Mid Blue** | 34 SMA | Medium-term price trend                              |
| **Navy Blue**| 50 SMA | Classic support/resistance MA                        |
| **Orange**   | 100 SMA| Longer-term MA; structural level                     |
| **Red**      | 200 SMA| Institutional trend level                            |

---

## VWAP + VOLATILITY

- **Thin Yellow Line**: Intraday VWAP  
- **Long-Dashed Yellow Line**: AVWAP anchored to **01/01/2025**

---

## STRUCTURAL INDICATORS

- **Dotted Horizontal Lines**: Pivot Points (S3 – S2 – S1 – **PP** – R1 – R2 – R3)  
- **Grey Bands**: Keltner Channels (volatility envelope)  
- **White Trendlines**: Manually drawn support/resistance or patterns  
- **Short-Dotted White Lines**: Significant price levels (prior highs/lows, gaps, macro SR)

---

## INTERPRETATION TIPS

- **Cyan lines** may also represent Open Interest walls on ES futures.  
- **Traffic Light 21 SMA** helps visualize momentum context at a glance.  
- **Red + Orange = danger zones**; expect reaction at 100/200 SMA.  
- **VWAP + AVWAP intersections** often act as reclaim/flush triggers.

---

## VERSION CONTROL

To update:
1. Modify this file in `/system/chart-visual-legend.md`
2. Update `last_updated` field
3. Push changes to `main` branch

---