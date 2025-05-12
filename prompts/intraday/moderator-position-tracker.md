---
title: Moderator Position Tracker
description: System for tracking and updating moderator positions from chat alerts
tags: [system, positions, tracking, analytics]
author: Simon Plant
created: 2025-05-07
version: 1.0
category: system
usage: Used to maintain accurate moderator position data across the trading day
status: draft
requires: [main-controller.md]
linked_outputs: [unified-trade-plan.md, execution-validator.md]
input_format: chat messages
output_format: structured position data
ai_enabled: true
style:
  use_emojis: false
  text_decoration: false
---

# Moderator Position Tracker

## Purpose
This system component tracks and maintains an accurate record of moderator positions by parsing trade alerts and position updates from the chat system. It provides a single source of truth for current positions that can be referenced by other components of the trading system.

## Command Structure
The tracker will be integrated into the `main-controller.md` routing system with the following commands:

```
!positions update
!positions show [moderator|all]
!positions history [moderator|ticker] [timeframe]
!positions report [format]
!positions align [source_data]
```

## Core Functionality

### Position Parsing Engine
- Analyzes chat messages for position declarations, entry/exit signals
- Recognizes various formats of trade alerts:
  - Position declarations (`long $XYZ`, `short $ABC`)
  - Entries (`added $XYZ`, `bought $XYZ`)
  - Exits (`flat $XYZ`, `out of $XYZ`)
  - Trims (`trimmed $XYZ`, `reduced $XYZ`)
  - Adds (`added to $XYZ`, `increased $XYZ`)
- Maintains a state machine for each position (size, entry points, average price)

### Position Database
- Stores current positions for each moderator
- Tracks historical position changes with timestamps
- Maintains options positions with strikes and expiries
- Records trade metadata (context, conviction, purpose)

### Alignment Process
The position alignment process runs:
1. At start of day (04:00 AM) to capture overnight positions
2. On demand via `!positions align` command
3. Periodically (hourly) to ensure consistency

### Output Formats
- Structured JSON for system components
- Markdown tables for human readability
- CSV export for analysis

## Integration Points

### Inputs
- Chat system messages
- Manual position declarations
- Historical trade logs

### Outputs
- Current position state (used by unified-trade-plan generator)
- Position changes (for execution validation)
- Daily position summary (for performance analysis)

## Implementation

### Message Parser
```javascript
function parseTradeMessage(message, moderator) {
  // Extract ticker symbols (with $ prefix)
  const tickers = message.match(/\$[A-Z]+/g);
  if (!tickers) return null;
  
  // Determine action type
  const action = determineAction(message);
  
  // Process each ticker found
  return tickers.map(ticker => {
    return {
      moderator,
      ticker: ticker.substring(1),  // Remove $ prefix
      action,
      timestamp: new Date(),
      raw_message: message
    };
  });
}

function determineAction(message) {
  // Classify the action based on message content
  if (/\b(flat|out|closed|exited)\b/i.test(message)) return 'EXIT';
  if (/\b(trimmed|reduced|cutting|sold partial)\b/i.test(message)) return 'TRIM';
  if (/\b(added|buying|increased|more)\b/i.test(message)) return 'ADD';
  if (/\b(short|shorting|shorted)\b/i.test(message)) return 'SHORT';
  if (/\b(long|bought|entered|in)\b/i.test(message)) return 'LONG';
  
  // Default case
  return 'UNKNOWN';
}
```

### Position State Manager
```javascript
class PositionManager {
  constructor() {
    this.positions = {
      /* Moderator -> Ticker -> Position Details */
    };
    this.history = [];
  }
  
  updatePosition(tradeAction) {
    const { moderator, ticker, action } = tradeAction;
    
    // Initialize if needed
    if (!this.positions[moderator]) this.positions[moderator] = {};
    
    // Process based on action type
    switch(action) {
      case 'EXIT':
        delete this.positions[moderator][ticker];
        break;
      case 'LONG':
        this.positions[moderator][ticker] = { 
          direction: 'LONG',
          timestamp: new Date(),
          size: 'FULL' // Default assumption
        };
        break;
      case 'SHORT':
        this.positions[moderator][ticker] = {
          direction: 'SHORT',
          timestamp: new Date(),
          size: 'FULL' // Default assumption
        };
        break;
      case 'TRIM':
        if (this.positions[moderator][ticker]) {
          this.positions[moderator][ticker].size = 'PARTIAL';
        }
        break;
      case 'ADD':
        if (this.positions[moderator][ticker]) {
          this.positions[moderator][ticker].size = 'INCREASED';
        } else {
          // New position
          this.positions[moderator][ticker] = {
            direction: 'LONG', // Assume long for 'add' without prior position
            timestamp: new Date(),
            size: 'FULL'
          };
        }
        break;
    }
    
    // Record in history
    this.history.push({
      ...tradeAction,
      timestamp: new Date()
    });
  }
  
  getPositionsForModerator(moderator) {
    return this.positions[moderator] || {};
  }
  
  getAllPositions() {
    return this.positions;
  }
  
  getHistoryForTicker(ticker) {
    return this.history.filter(entry => entry.ticker === ticker);
  }
}
```

### Options Position Tracking
Enhanced parsing for options positions:
```javascript
function parseOptionsPosition(message) {
  // Match patterns like "$XYZ 5/16 100c" or "$ABC 5/9 200 puts"
  const optionsRegex = /\$([A-Z]+)\s+(\d+)\/(\d+)\s+(\d+(?:\.\d+)?)\s*(c|calls|p|puts)/i;
  const matches = message.match(optionsRegex);
  
  if (!matches) return null;
  
  return {
    ticker: matches[1],
    expiry: `${matches[2]}/${matches[3]}`,
    strike: parseFloat(matches[4]),
    type: matches[5].toLowerCase().startsWith('c') ? 'CALL' : 'PUT'
  };
}
```

## Usage Examples

### Tracking a Trading Session
```
// Start of day position declaration
!positions align
Moderator positions aligned from overnight declarations.

// During trading session
[Kira] trimmed $TEM
!positions update
Position update processed: KIRA trimmed TEM

// Querying current positions
!positions show Kira
KIRA's CURRENT POSITIONS:
LONG: AMZN, CAVA, CRWD, HOOD, IMNM, JPM, TEM (partial)
SHORT: TQQQ, NFLX
OPTIONS: NFLX 5/9 1100P, NFLX 5/16 1100P
```

### Integration with Unified Plan
The position data is used to validate and enhance the unified trade plan:
```
// In unified-trade-plan generator
!positions show all
Using current moderator positions to inform unified plan...
```

## Metrics and Monitoring

- **Position Accuracy Rate**: % of positions correctly tracked vs. manual checks
- **Parser Success Rate**: % of messages successfully parsed
- **Update Latency**: Time between trade alert and position database update

## Next Steps

1. Implement core parsing engine
2. Add regex patterns for common message formats
3. Create state management system
4. Build command interface in main-controller
5. Add validation against periodic position declarations
6. Implement reporting views
