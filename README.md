---
title: Trading System Prompt Library
description: Master index and usage guide for Simon Plant's AI-assisted trading framework
tags: [readme, index, overview, unified]
author: Simon Plant
last_updated: 2025-05-12
version: 3.0
category: root
usage: Start here when opening the repo. Describes architecture, file roles, and unified trading approach.
status: active
requires: []
linked_outputs: []
input_format: markdown
output_format: markdown
ai_enabled: false
---

# Trading System Prompts — Unified Execution Framework v3.0

## 1. System Bootstrap Instructions

### Option A: ZIP Upload (For ChatGPT and Similar)
1. Download [the zipped version](https://github.com/simonplant/trading-system-prompts/archive/refs/heads/main.zip)
2. Upload the ZIP file to your AI assistant chat
3. Enter this exact command (hover over code block and click the copy button that appears):
   ```
   Please read and load ALL files from this ZIP archive.
   Start with README.md, then load all files in the /prompts, /system, and /logs directories.
   Once loaded, use prompts/main-controller.md as the EXCLUSIVE routing layer for ALL commands.
   I want to interact with my trading system.
   ```

### Option B: GitHub Direct (For Claude and Similar)
1. Share this repo URL:
   ```
   https://github.com/simonplant/trading-system-prompts
   ```

2. Enter this exact command (hover over code block and click the copy button that appears):
   ```
   Please read and load ALL files from this repository.
   Start with README.md to understand the structure, then load all files from /prompts, /system, and /logs.
   Once loaded, use prompts/main-controller.md as the EXCLUSIVE routing layer for ALL commands.
   I want to interact with my trading system.
   ```

### First Commands After Initialization

1. Check system status:
   ```
   /system-status
   ```

2. Start using premarket workflow:
   ```
   /premarket-sequence
   Transcript:
   [paste DP transcript here]
   
   Mancini:
   [paste Mancini content here]
   
   Levels:
   ES: 5600, 5625, 5650
   ```

**CRITICAL: ALL interactions MUST go through the main-controller.md**

---

## System Overview

This is a unified trading framework designed to optimize trade idea identification and execution across multiple sources. The system integrates DP's Inner Circle trade ideas, Mancini's SPX methodology, and proprietary trading structures into a single coherent workflow.

### Core Design Philosophy

1. **Source Integration Not Separation**: All trade ideas are evaluated on the same conviction scale regardless of source
2. **Classification Without Filtering**: Setups are classified for tracking without rejecting valid opportunities
3. **Position Tracking Centralization**: Consistent tracking across sessions for proper risk management
4. **Validation Without Rejection**: Issues are highlighted without blocking workflow
5. **Controller-Based Architecture**: All interactions route through a central controller for consistency

### System Architecture

The system uses a controller-based architecture with three main phases:

- **Premarket Phase**
  - DP Analysis: Extract structured trade ideas from DP
  - Mancini Analysis: Extract structured setups from Mancini
  - Market Context: Establish regime and technical levels
  - Unified Plan: Integrate all sources into one prioritized plan

- **Intraday Phase**
  - Trade Validation: Confirm trades align with plan
  - Position Management: Track and manage open positions
  - Plan Adherence: Ensure execution matches intentions
  - Midday Reset: Re-evaluate as conditions change

- **Postmarket Phase**
  - Performance Analysis: Track results by setup type
  - Behavioral Insights: Identify pattern recognition
  - System Optimization: Refine based on actual results
  - Knowledge Base Updates: Continuously improve

## Command Reference

All commands follow this standardized format:
```
/command-name [required-parameter] [optional-parameter]
```

### Core Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `/premarket-sequence` | Run complete premarket workflow | Daily first action |
| `/copilot-confirm` | Validate potential trade | Before each trade entry |
| `/copilot-debrief` | Log completed trade | After each trade exit |
| `/midday-reset` | Re-evaluate plan mid-session | If conditions change |
| `/postmarket-sequence` | Run complete postmarket workflow | End of trading day |

### Premarket Commands

| Command | Description | Parameters | 
|---------|-------------|------------|
| `/analyze-dp` | Process DP transcript | Transcript | 
| `/analyze-mancini` | Process Mancini content | Content | 
| `/get-sma` | Get SMA data | Tickers | 
| `/get-levels` | Extract market levels | Indices | 
| `/classify-regime` | Classify market regime | Market data |
| `/generate-trade-plan` | Create unified plan | Source refs | 

### Intraday Commands

| Command | Description | Parameters | 
|---------|-------------|------------|
| `/copilot` | Activate trading copilot | None | 
| `/copilot-scout` | Scan for setups | Setup, Tag, Bias | 
| `/copilot-confirm` | Validate potential trade | Trade details | 
| `/copilot-debrief` | Log completed trade | Trade results | 
| `/midday-reset` | Reassess plan | Trading context | 
| `/copilot-recenter` | Reset focus | Current state | 

### Postmarket Commands

| Command | Description | Parameters | 
|---------|-------------|------------|
| `/generate-trade-log` | Create trade log | Trades, Notes | 
| `/performance-debrief` | Analyze performance | Analysis dimensions | 
| `/performance-vs-plan` | Compare execution vs plan | Trade log | 
| `/generate-journal` | Create journal entry | Journal metadata | 
| `/update-behaviors` | Update knowledge base | Update details | 

## Unified Setup Classification

All trade opportunities use a standardized classification system:

### Setup Type Tags
- FB: Failed Breakdown/Breakout (Mancini primary, DP "shakeout and go")
- RR: Range/Level Reclaim (Mancini secondary, DP "reclaim")
- TC: Trend Continuation (DP primary, Mancini "dip buy")
- BS: Breakdown Short (Mancini tier 2, DP "failure fade")
- ORB: Opening Range Breakout (both sources)

### Direction-Duration Tags
- L-CF: Long Cashflow (intraday)
- S-CF: Short Cashflow (intraday)
- L-SW: Long Swing (1-5 days)
- S-SW: Short Swing (1-5 days)
- L-0D: Long 0DTE (same day)
- S-0D: Short 0DTE (same day)

### Conviction Tags
- BI: Big Idea (highest)
- HC: High Conviction
- MC: Medium Conviction
- LC: Low Conviction

### Complete Tag Example
`FB-L-CF-HC` = Failed Breakdown Long Cashflow High Conviction

This unified tagging system enables:
- Consistent classification across sources
- Setup-specific performance tracking
- Pattern recognition across different sources
- Clear communication about trade ideas

## Unified Conviction Scoring System

All trade ideas across all sources are evaluated on a unified conviction scale:

| DP Conviction | Mancini Equivalent | Combined Score |
|---------------|---------------------|---------------|
| BIG_IDEA | Primary Failed Breakdown | 10/10 |
| HIGH | Strong Failed Breakdown/Level Reclaim | 8/10 |
| MEDIUM | Standard/Good Setup | 6/10 |
| LOW | Possible/Lower Probability | 4/10 |
| MONITORING | Watching/Potential Setup | 2/10 |

This unified scale ensures the best trades rise to the top regardless of source.

## Position Tracking System

The system maintains centralized position tracking across sessions:

1. **Active Positions** - Current open positions with entry prices and sizes
2. **Daily P&L Status** - Current profit/loss for the day
3. **Risk Utilization** - Percentage of daily risk already deployed
4. **Position Correlation Check** - Identifies correlations with potential new trades

This tracking ensures consistent risk management and avoids overexposure.

## Workflow Examples

### Premarket Workflow

```
/premarket-sequence
Transcript:
[paste DP transcript here]

Mancini:
[paste Mancini content here]

Levels:
ES: 5600, 5625, 5650
```

This workflow:
1. Analyzes DP transcript for trade ideas
2. Processes Mancini content for SPX setups
3. Establishes current market regime
4. Integrates technical levels and structures
5. Generates a unified trade plan with:
   - Trades organized by true conviction (not source)
   - Standardized setup classification tags
   - Complete trade management guidelines
   - Current position context and risk status

### Intraday Workflow

```
/copilot-confirm
Ticker: AAPL
Direction: Long
Entry: Above 184.50 reclaim
Setup: Range Reclaim
Tag: RR-L-CF-MC
Context: SPX reclaiming 5606, sector strength in tech
```

This workflow:
1. Validates trade against the unified plan
2. Checks setup classification and compatibility
3. Evaluates position in context of existing trades
4. Applies appropriate risk parameters
5. Produces GO/WAIT/NO GO decision with:
   - Position size recommendation
   - Entry trigger confirmation
   - Stop placement guidance
   - Target structure recommendation

### Postmarket Workflow

```
/postmarket-sequence
Trades:
1. AAPL Long 184.50->186.75, +1.2%, Tag: RR-L-CF-MC, Adherence: 8/10
2. QQQ Put 434 Strike, -30% loss, Tag: FB-S-0D-LC, Adherence: 5/10

Notes:
Got shaken out of QQQ puts during the fake breakdown.
AAPL entry was good but took profits too early.
```

This workflow:
1. Logs trades with standardized tags
2. Analyzes performance by setup type
3. Tracks adherence to trade plan
4. Identifies behavioral patterns
5. Updates setup performance metrics
6. Generates structured journal entry
7. Provides system optimization suggestions

## Troubleshooting

If you encounter issues with the system:

1. Ensure all commands route through main-controller.md
2. Check that files are properly loaded
3. Verify premarket data is properly formatted
4. If a command fails, use `/system-status` to check system state
5. For trade validation issues, verify the setup tag format is correct

## System Components

### Core Components

| Component | Purpose | Access Method |
|-----------|---------|--------------|
| `prompts/main-controller.md` | Central command router | Direct - primary entry point |
| `prompts/premarket/unified-trade-plan-generator.md` | Integrates all trade sources | Via commands only |
| `system/trade-setups-kb.md` | Unified setup taxonomy | Via `/show-kb setups` |
| `system/trading-system-sop.md` | Operating procedures | Via `/show-sop` |
| `system/market-regimes.md` | Market condition classifier | Via `/show-regime` |

### File Structure

```
trading-system-prompts/
├── README.md                      # This file - master guide
├── prompts/                       # Command prompt files
│   ├── main-controller.md         # EXCLUSIVE entry point
│   ├── premarket/                 # Morning preparation
│   │   ├── dp-trade-analyzer.md   # Process DP transcript
│   │   ├── mancini-trade-analyzer.md  # Process Mancini newsletter
│   │   ├── get-daily-sma-for-tickers.md  # Get SMA data
│   │   ├── get-premarket-levels.md  # Extract market levels
│   │   └── unified-trade-plan-generator.md  # Create plan
│   ├── intraday/                  # Trade execution
│   │   ├── copilot.md             # Main trading assistant
│   │   ├── copilot-scout.md       # Setup scanner
│   │   ├── copilot-confirm.md     # Trade validator
│   │   ├── copilot-recenter.md    # Focus reset
│   │   ├── copilot-debrief.md     # Quick review
│   │   └── midday-reset.md        # Mid-session review
│   └── postmarket/                # End-of-day review
│       ├── generate-trade-log.md           # Log creation
│       ├── daily-performance-debrief.md    # Analysis
│       ├── generate-journal.md             # Journal creation
│       ├── update-trading-behaviors-kb.md  # KB update
│       └── generate-kb-update.md           # KB recommendations
├── system/                        # System configuration
│   ├── trading-charter.md         # Trading rules
│   ├── trading-behaviors-kb.md    # Behavior knowledge
│   ├── trade-setups-kb.md         # Setup taxonomy
│   ├── trading-system-sop.md      # Standard procedures
│   ├── market-regimes.md          # Market classifier
│   └── chart-visual-legend.md     # Chart legend
└── logs/                          # Trading records
    ├── trades/                    # Trade logs
    └── journal/                   # Journal entries
```

## Changelog

### 3.0 — May 12, 2025
- Complete system optimization with unified setup classification and conviction scoring
- Implemented position tracking centralization
- Created source-agnostic trade prioritization
- Enhanced workflow with validation without rejection
- Improved documentation clarity and organization

### 2.0 — May 7, 2025
- Implemented standardized command structure
- Enhanced controller enforcement policy
- Added tabular format for commands and parameters
- Created visual system architecture diagram
- Reinforced exclusive routing requirements

### 1.0 — April 1, 2025
- Initial system implementation
- Basic command routing
- Simple workflow design
