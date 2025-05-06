---
title: System Parameters
description: Central configuration for trading system components
tags: [system, configuration]
author: Simon Plant
last_updated: 2025-05-05
version: 1.0
category: system
usage: Imported by all system components
status: active
requires: []
linked_outputs: []
input_format: markdown
output_format: markdown
ai_enabled: false
---

## SYSTEM PARAMETERS

This file contains centralized parameters used across the trading system. 
Update these values as market conditions change.

### MARKET CONVERSION FACTORS

```json
{
  "ES_TO_SPX_CONVERSION": -20,
  "SPX_TO_SPY_DIVISOR": 10,
  "ES_TO_SPY_CONVERSION": -3
}
```

### COMMENTARY

ES_TO_SPX_CONVERSION: Currently set to -10. This value typically ranges from -40 (start of quarter) to -20 (mid-quarter) and may approach -10 or less near quarterly options expiration.

### SYSTEM THRESHOLDS

```json
{
  "CONFIDENCE_THRESHOLD": 0.70,
  "MAX_POSITION_SIZE": 0.05,
  "DAILY_RISK_LIMIT": 0.02
}
```

### TIMING PARAMETERS

```json
{
  "PRIMARY_TRADING_WINDOW_START": "09:45:00",
  "PRIMARY_TRADING_WINDOW_END": "15:30:00",
  "AVOID_TRADING_WINDOWS": [
    ["14:00:00", "14:15:00"],
    ["15:45:00", "16:00:00"]
  ]
}
```

### CHANGELOG
- v1.0 (2025-05-05): Initial parameters file