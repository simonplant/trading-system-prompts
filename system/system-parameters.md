---
title: System Parameters
description: Central configuration for trading system components
tags: [system, configuration]
author: Simon Plant
last_updated: 2025-05-07
version: 1.1
category: system
usage: Imported by all system components
status: active
requires: []
linked_outputs: []
input_format: markdown
output_format: json
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

ES_TO_SPX_CONVERSION: Currently set to -20. This value typically ranges from -40 (start of quarter) to -20 (mid-quarter) and may approach -10 or less near quarterly options expiration.

### SYSTEM THRESHOLDS

```json
{
  "CONFIDENCE_THRESHOLD": 0.70,
  "MAX_POSITION_SIZE": 0.05,
  "DAILY_RISK_LIMIT": 0.02,
  "SECURITY_VERIFICATION_TIMEOUT": 300,
  "SESSION_TOKEN_EXPIRY": 86400
}
```

### TIMING PARAMETERS

```json
{
  "PRIMARY_TRADING_WINDOW_START": "09:45:00",
  "PRIMARY_TRADING_WINDOW_END": "15:30:00",
  "AVOID_TRADING_WINDOWS": [
    ["11:30:00", "13:30:00"],
    ["14:00:00", "14:15:00"],
    ["15:45:00", "16:00:00"]
  ]
}
```

### POSITION SIZING MATRIX

```json
{
  "POSITION_SIZE_MATRIX": {
    "BIG_IDEA": {
      "CASHFLOW": "FULL_DOUBLE",
      "SWING": "FULL_DOUBLE",
      "LONGTERM": "FULL",
      "LOTTO": "SMALL"
    },
    "HIGH": {
      "CASHFLOW": "FULL",
      "SWING": "FULL",
      "LONGTERM": "FULL",
      "LOTTO": "SMALL"
    },
    "MEDIUM": {
      "CASHFLOW": "HALF",
      "SWING": "HALF",
      "LONGTERM": "QUARTER",
      "LOTTO": "SMALL"
    },
    "LOW": {
      "CASHFLOW": "QUARTER",
      "SWING": "QUARTER",
      "LONGTERM": "QUARTER",
      "LOTTO": "TINY"
    }
  }
}
```

### PATH TEMPLATES

```json
{
  "TRADE_LOG_PATH_TEMPLATE": "/logs/trades/%YYYY%/%YYYY%-%MM%-%DD%.md",
  "JOURNAL_PATH_TEMPLATE": "/logs/journal/%YYYY%/%YYYY%-%MM%-%DD%.md",
  "KB_UPDATE_PATH_TEMPLATE": "/system/kb-updates/%YYYY%-%MM%-%DD%.md"
}
```

### SCHEMA VERSIONS

```json
{
  "TRADE_DATA_SCHEMA_VERSION": "2.0",
  "SYSTEM_PARAMETERS_VERSION": "1.1",
  "CONTROLLER_VERSION": "2.5"
}
```

### UTILITY PATHS

```json
{
  "UTILITY_PATHS": {
    "SCHEMA_VALIDATOR": "js/schema-validator.js",
    "PATH_RESOLVER": "js/path-resolver.js"
  }
}
```

### FILE PATHS

```json
{
  "ANALYZER_PATHS": {
    "DP": "prompts/premarket/dp-trade-analyzer.md",
    "MANCINI": "prompts/premarket/mancini-trade-analyzer.md",
    "LEVELS": "prompts/premarket/get-premarket-levels.md",
    "SMA": "prompts/premarket/get-daily-sma-for-tickers.md"
  },
  "SUMMARY_PATHS": {
    "DP": "prompts/premarket/dp-trade-summary.md",
    "MANCINI": "prompts/premarket/mancini-trade-summary.md",
    "UNIFIED": "prompts/premarket/unified-trade-plan-generator.md"
  },
  "SYSTEM_PATHS": {
    "CONTROLLER": "prompts/main-controller.md",
    "CHARTER": "system/trading-charter.md",
    "BEHAVIORS_KB": "system/trading-behaviors-kb.md",
    "SOP": "system/trading-system-sop.md"
  },
  "SCHEMA_PATHS": {
    "TRADE_DATA": "trade-data-schema.json",
    "TRADE_IDEA": "trade-idea.schema.json"
  }
}
```

### COMMAND ROUTING TABLE

```json
{
  "PREMARKET_COMMANDS": {
    "premarket-sequence": "CONTROLLER.premarket_sequence",
    "analyze-dp": "ANALYZER_PATHS.DP",
    "dp-summary": "SUMMARY_PATHS.DP",
    "analyze-mancini": "ANALYZER_PATHS.MANCINI",
    "mancini-summary": "SUMMARY_PATHS.MANCINI",
    "get-sma": "ANALYZER_PATHS.SMA",
    "get-levels": "ANALYZER_PATHS.LEVELS",
    "generate-trade-plan": "SUMMARY_PATHS.UNIFIED"
  },
  "INTRADAY_COMMANDS": {
    "copilot": "prompts/intraday/copilot.md",
    "copilot-scout": "prompts/intraday/copilot-scout.md",
    "copilot-confirm": "prompts/intraday/copilot-confirm.md",
    "copilot-recenter": "prompts/intraday/copilot-recenter.md",
    "copilot-debrief": "prompts/intraday/copilot-debrief.md",
    "midday-reset": "prompts/intraday/midday-reset.md"
  },
  "POSTMARKET_COMMANDS": {
    "postmarket-sequence": "CONTROLLER.postmarket_sequence",
    "generate-trade-log": "prompts/postmarket/generate-trade-log.md",
    "performance-debrief": "prompts/postmarket/daily-performance-debrief.md",
    "generate-journal": "prompts/postmarket/generate-journal.md",
    "update-behaviors": "prompts/postmarket/update-trading-behaviors-kb.md",
    "generate-kb-update": "prompts/postmarket/generate-kb-update.md"
  },
  "SYSTEM_COMMANDS": {
    "system-parameters": "CONTROLLER.show_parameters",
    "help": "CONTROLLER.show_help",
    "status": "CONTROLLER.show_status",
    "system-check": "CONTROLLER.system_check",
    "security-verification": "CONTROLLER.security_verification"
  }
}
```

### VALIDATION PARAMETERS

```json
{
  "MAX_JSON_SIZE": 100000,
  "REQUIRED_SCHEMA_FIELDS": {
    "DP": ["metadata", "TRADE_DATA", "MARKET_BIAS", "COACHING_INSIGHTS"],
    "MANCINI": ["metadata", "TECHNICAL_DATA", "TRADE_DATA", "MARKET_BIAS", "MARKET_ANALYSIS"]
  },
  "VALIDATION_TIMEOUT": 30
}
```

### CHANGELOG
- v1.1 (2025-05-07): Added utility paths for JS folder, position sizing matrix, path templates, schema versions, security parameters, file paths, command routing, and validation parameters
- v1.0 (2025-05-05): Initial parameters file