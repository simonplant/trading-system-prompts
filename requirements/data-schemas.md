---
title: Trade Data JSON Schemas
description: Master reference for all JSON data structures used in the trading system
tags: [requirements, schema, json, api]
author: Simon Plant
last_updated: 2025-05-07
version: 1.0
category: requirements
usage: Reference for all prompts or scripts that validate, parse, or consume trade data
status: active
---

# Trade Data JSON Schemas

This file documents the expected structure of all trade-related JSON formats across analyzers, summaries, and trade plan generators.

## DP Analyzer JSON
```json
{
  "TRADE_DATA": [...],
  "MARKET_BIAS": {...},
  "COACHING_INSIGHTS": {...}
}
```

## Mancini Analyzer JSON
```json
{
  "TECHNICAL_DATA": {...},
  "TRADE_SETUPS": {...},
  "MARKET_ANALYSIS": {...}
}
```

## Unified Trade Plan JSON
```json
{
  "DP_DATA": {...},
  "MANCINI_DATA": {...},
  "MARKET_CONTEXT": {...}
}
```

## Schema Validation
Use the `json-validation-utility.js` and `schema-validator.js` for enforcement.