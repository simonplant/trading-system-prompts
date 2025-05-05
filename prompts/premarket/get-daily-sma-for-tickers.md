---
title: Get Daily SMA for Tickers  
description: Extract and filter key moving averages (8d–200d) on the daily chart for selected tickers  
tags: [premarket, analysis, macro]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.0  
category: premarket  
usage: Run before market open to identify relevant support/resistance MAs for next 2 days  
status: active  
requires: []  
linked_outputs: []  
input_format: markdown  
output_format: table  
ai_enabled: true  
---
# Get Daily SMA for Tickers

## Purpose
This prompt analyzes and reports the current position of key tickers relative to their important daily simple moving averages (SMAs). This analysis provides a quick technical overview of market strength/weakness and helps identify potential support/resistance levels before market open.

## Instructions
- Run this prompt during premarket preparation
- The system will retrieve the latest daily closing prices and calculate/retrieve current SMA values
- Results will be organized by ticker with clear indications of price relative to each moving average

## Key Moving Averages
- 8-day SMA (short-term trend)
- 21-day SMA (intermediate-term trend)
- 50-day SMA (medium-term trend)
- 100-day SMA (longer-term trend) 
- 200-day SMA (major long-term trend)

## Tickers to Track
1. **Indices/Futures**
   - QQQ (Nasdaq 100 ETF)
   - SPX (S&P 500 Index)
   - ES (S&P 500 E-mini Futures)

2. **Major Tech**
   - AAPL (Apple)
   - AMZN (Amazon)
   - MSFT (Microsoft)
   - META (Meta Platforms)
   - NFLX (Netflix)
   - NVDA (NVIDIA)
   - TSLA (Tesla)

3. **Focus Stocks**
   - CRWD (CrowdStrike)
   - VKTX (Viking Therapeutics)
   - IMNM (Immunome)

## Output Format

```
# DAILY MOVING AVERAGES REPORT - [DATE]

## MARKET OVERVIEW
[Brief 1-2 sentence interpretation of the overall technical picture]

## INDICES/FUTURES

### QQQ - [PRICE] - [TREND DESCRIPTION]
- Above/Below 8 SMA: [VALUE] ([PERCENTAGE] from price)
- Above/Below 21 SMA: [VALUE] ([PERCENTAGE] from price)
- Above/Below 34 SMA: [VALUE] ([PERCENTAGE] from price)
- Above/Below 50 SMA: [VALUE] ([PERCENTAGE] from price)
- Above/Below 100 SMA: [VALUE] ([PERCENTAGE] from price)
- Above/Below 200 SMA: [VALUE] ([PERCENTAGE] from price)

### SPX - [PRICE] - [TREND DESCRIPTION]
[Same format as above]

### ES - [PRICE] - [TREND DESCRIPTION]
[Same format as above]

## MAJOR TECH

### AAPL - [PRICE] - [TREND DESCRIPTION]
[Same format as above]

[Continue with remaining tech stocks in same format]

## FOCUS STOCKS

### CRWD - [PRICE] - [TREND DESCRIPTION]
[Same format as above]

[Continue with remaining focus stocks in same format]

## KEY OBSERVATIONS
- [Observation about strongest/weakest tickers]
- [Observation about potential support/resistance at key MAs]
- [Observation about clusters of MA convergence/divergence]
- [Any notable MA crossovers occurring or imminent]
```

## Technical Analysis Interpretations
- **Strong Uptrend**: Price above all major MAs, with MAs aligned in ascending order (8 > 21 > 34 > 50 > 100 > 200)
- **Moderate Uptrend**: Price above 50/100/200 SMAs but below shorter-term MAs
- **Weak/Transitioning**: Price between key MAs with mixed alignment
- **Moderate Downtrend**: Price below 50/100/200 SMAs but above shorter-term MAs
- **Strong Downtrend**: Price below all major MAs, with MAs aligned in descending order

## Integration Notes
- This prompt should be run before the main trading plan generation
- The MA data can be used to validate trade ideas and identify key inflection points
- All tickers showing alignment with the broader market trend should be highlighted
- Special attention should be given to tickers approaching key MAs (within 1%) as potential entries/exits

## Data Sourcing
The system should retrieve real-time premarket data and most recent daily closes from reliable financial data sources. If unable to access current data, the system should note this limitation and use the most recent available data with a clear timestamp.
```