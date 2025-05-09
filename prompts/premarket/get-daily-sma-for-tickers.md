---
title: Daily SMA Extractor for Key Tickers
description: Extracts and formats Simple Moving Averages for specified tickers
tags: [premarket, technical, SMA, levels]
author: Simon Plant
last_updated: 2025-05-08
version: 1.1
category: premarket
usage: Extracts SMA values for key tickers with filtering for potential support/resistance levels.
status: active
requires: [market-regimes.md, system-parameters.md]
linked_outputs: []
input_format: markdown
output_format: json+markdown
ai_enabled: true
---

# Daily SMA Extractor for Key Tickers

## Purpose

This component extracts Simple Moving Averages (SMAs) for a predefined list of key tickers, with a focus on identifying those that are likely to act as support or resistance in the next 1-2 trading sessions.

## Input Format

```
/get-sma [date=YYYY-MM-DD] [tickers=comma-separated-list] [periods=comma-separated-list]
```

### Default Parameters
- **Tickers**: ES, SPX, TSLA, MSFT, NFLX, RDDT, META, AAPL, AMZN
- **SMA Periods**: 8, 21, 34, 50, 100, 200
- **Date**: Current trading day

## Example Usage

```
/get-sma
```

or with explicit parameters:

```
/get-sma date=2025-05-08 tickers=SPX,ES,AAPL,TSLA periods=8,21,50,200
```

## Overview

This component:
1. Accepts a list of tickers and SMA periods
2. Calculates the SMAs for each ticker/period combination
3. Identifies which SMAs are likely to act as support or resistance
4. Outputs both structured JSON and human-readable markdown

## Processing Steps

1. Parse input parameters (date, tickers, periods)
2. For each ticker:
   a. Retrieve daily price data for the specified period
   b. Calculate each SMA using the formula: sum(closing_prices) / period_length
   c. Determine the current price relative to each SMA
   d. Calculate the percentage distance from current price to each SMA
   e. Analyze recent interactions (crossovers, tests, bounces)
   f. Assess historical significance as support/resistance
3. Filter SMAs based on proximity and significance
4. Format results as JSON and markdown

## Filtering Logic

The system applies the following filters to identify potentially significant SMAs:

### 1. Proximity Filter
- Primary: SMAs within 2% of current price
- Secondary: SMAs within 3-5% if historically significant

### 2. Recent Interaction Filter
- Crossovers: Price crossed SMA within last 5 sessions
- Tests: Price approached within 0.5% but didn't cross
- Bounces: Price reversed direction after touching SMA

### 3. Historical Significance Filter
- High: Acted as S/R in 3+ instances in past 3 months
- Medium: Acted as S/R in 1-2 instances in past 3 months
- Low: Limited historical significance

### 4. Market Regime Adjustment
Significance weights are adjusted based on current market regime:
- Trending Up: Emphasize 8d, 21d as support
- Trending Down: Emphasize 8d, 21d as resistance
- Range-Bound: Emphasize 50d, 100d, 200d
- Volatile: Consider all SMAs equally

## Output Format

### JSON Structure

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
          },
          // Additional periods...
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
      // Additional tickers...
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

### Markdown Format

```markdown
# SMA Support/Resistance Analysis for YYYY-MM-DD
Market Regime: [Current Market Regime]

## Key SMA Levels by Ticker

### [TICKER] (Current: [Current Price])
- [Period]d SMA: [Value] ([Distance]% [above/below]) - [Function] [Significance Stars]
- [Period]d SMA: [Value] ([Distance]% [above/below]) - [Function] [Significance Stars]
...

### SMA Clusters (Multiple SMAs in Same Area)
- [Price Range]: [List of SMAs] - [Significance]

## Most Significant SMA Levels for Today
1. [Ticker] [Period]d SMA at [Value] - [Function] [Significance Stars]
2. [Ticker] [Period]d SMA at [Value] - [Function] [Significance Stars]
...

## SMA Interactions to Watch
- [Ticker] approaching [Period]d SMA from [above/below]
- [Ticker] recently [crossed/tested/bounced off] [Period]d SMA

## Significance Key
⭐⭐⭐ - Critical level (high historical significance)
⭐⭐ - Important level (medium historical significance)
⭐ - Notable level (low historical significance)
```

## Integration with Trade Plan

The output of this component is designed to integrate with the unified trade plan in several ways:

1. **Market Context**: Key SMA levels provide additional support/resistance zones
2. **Trade Idea Enhancement**: Each trade can reference relevant SMA levels
3. **Decision Points**: SMA interactions can serve as entry/exit triggers
4. **Risk Management**: SMA levels can inform stop placement

## Notes

- Historical data is retrieved from the configured data provider
- Current market regime is determined from `market-regimes.md`
- Default parameters can be overridden in `system-parameters.md`
- Significance scoring uses the algorithm defined in `position-significance-score.yaml`

## Error Handling

If data for a specific ticker or date is unavailable, the system will:
1. Log a warning
2. Skip the problematic ticker
3. Continue processing remaining tickers
4. Note the missing data in the output

## Changelog

- v1.1 (2025-05-08): Added SMA cluster detection and improved integration with unified plan
- v1.0 (2025-04-30): Initial implementation of SMA extractor