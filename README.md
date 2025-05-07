---
title: Trading System Prompt Library
description: Master index and usage guide for Simon Plant's AI-assisted trading framework
tags: [readme, index, overview]
author: Simon Plant
last_updated: 2025-05-07
version: 1.6
category: root
usage: Start here when opening the repo. Describes architecture, file roles, workflows, and LLM routing.
status: stable
requires: []
linked_outputs: []
input_format: markdown
output_format: markdown
ai_enabled: false
---

# Trading System Prompts — Unified Execution Framework

## QUICK START

1. **Upload the system:**
   - ChatGPT: Download and upload [this ZIP file](https://github.com/simonplant/trading-system-prompts/archive/refs/heads/main.zip)
   - Claude: Share this URL: `https://github.com/simonplant/trading-system-prompts`

2. **Initialize the system:**
   ```
   Please read and load ALL files from this repository.
   Start with README.md, then load all files from /prompts, /system, and /logs.
   Once loaded, use prompts/main-controller.md as the EXCLUSIVE routing layer for ALL commands.
   I want to interact with my trading system.
   ```

3. **Check system status:**
   ```
   /system-status
   ```

4. **Start using premarket workflow:**
   ```
   /pre-sequence
   Transcript:
   [paste DP transcript here]
   ```

**CRITICAL: ALL interactions MUST go through the main-controller.md**

---

## System Overview

This is a modular AI-assisted trading framework designed by Simon Plant to support high-conviction, structure-driven options trading. It integrates David Prince's Inner Circle trade ideas, Adam Mancini's SPX blueprint, and Simon's personal SOPs, conviction sizing, and behavioral filters.

### System Architecture

The system uses a controller-based architecture where all interactions must go through the main controller:

- **Main Controller** - Central command router and EXCLUSIVE entry point
  
- **Premarket Phase**
  - DP Morning Call Analyzer - Processes transcripts into trade data
  - Mancini Blueprint Analyzer - Extracts levels and setups
  - Level Processor - Processes market levels
  - Unified Trade Plan Generator - Creates the daily plan

- **Intraday Phase**
  - Trade Validation - GO/WAIT/NO GO decisions
  - Copilot - Real-time assistance
  - Risk Management - Position sizing and limits

- **Postmarket Phase**
  - Performance Debrief - Analyzes the day's trades
  - KB Updates - Updates behavior knowledge base
  - Journal Generator - Creates trading journal entries

## Command Reference

All commands follow the standardized format:
```
/command-name [required-parameter] [optional-parameter]
```

### Available Commands by Phase

#### Premarket Workflow

- `/premarket-sequence` - Run the complete premarket workflow in the proper sequence
- `/analyze-dp` - Run DP Morning Call Analyzer (outputs JSON)
- `/dp-summary` - Generate human-readable summary from DP analysis JSON
- `/analyze-mancini` - Run Mancini Blueprint Analyzer (outputs JSON)
- `/mancini-summary` - Generate human-readable summary from Mancini analysis JSON
- `/get-sma` - Get daily SMA data for key tickers
- `/get-levels` - Extract premarket levels for indices
- `/generate-trade-plan` - Generate unified trade plan from all sources

#### Intraday Workflow

- `/copilot` - Activate the intraday trading copilot
- `/copilot-scout` - Scan for setups matching your criteria
- `/copilot-confirm` - Validate a potential trade against your plan
- `/copilot-recenter` - Reset focus during the trading day
- `/copilot-debrief` - Quick review of a completed trade
- `/midday-reset` - Mid-session review and plan adjustment

#### Postmarket Workflow

- `/postmarket-sequence` - Run the complete postmarket workflow
- `/generate-trade-log` - Create a structured log of today's trades
- `/performance-debrief` - Analyze today's trading performance
- `/generate-journal` - Create a trading journal entry
- `/update-behaviors` - Update your trading behaviors knowledge base
- `/generate-kb-update` - Generate knowledge base update recommendations

#### System Management

- `/system-parameters` - View or update system parameters
- `/help` - Show available commands and documentation
- `/status` - Show current system status and active processes

## MANDATORY CONTROLLER ENFORCEMENT POLICY

ALL system interactions MUST be routed through main-controller.md without exception.

Enforcement Mechanisms:
- Component validation checks
- Phase-appropriate access control
- Input validation and sanitization
- Execution logging and auditing

WARNING: Bypassing the controller will trigger security measures including session termination.

## Workflow Examples

### Premarket Workflow

Command: `/premarket-sequence`

Example:
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
2. Processes Mancini blueprint for technical levels
3. Integrates market levels and structures
4. Generates a unified trade plan with:
   - Market bias and key levels
   - 5-minute focus stack
   - SPX decision tree
   - Execution checklist

### Intraday Workflow

Command: `/copilot-confirm` (or `/trade-validate`)

Example:
```
/copilot-confirm
Ticker: AAPL
Direction: Long
Entry: Above 170 reclaim
Type: Cashflow
Context: SPX reclaiming 5606, sector strength in tech
```

This workflow:
1. Validates trade idea against your plan
2. Checks against setup library and regime compatibility
3. Applies risk parameters from charter
4. Runs blindspot detection for potential biases
5. Produces GO/WAIT/NO GO decision with:
   - Conviction and sizing recommendation
   - Charter rule references
   - Potential blindspots or cautions

### Postmarket Workflow

Command: `/postmarket-sequence`

Example:
```
/postmarket-sequence
Trades:
1. AAPL Long 170.50 -> 173.25, Profit: $275
2. QQQ Put 420 Strike, -30% loss, stopped out

Notes:
Got shaken out of QQQ puts during the fake breakdown.
AAPL entry was good but took profits too early.
```

This workflow:
1. Logs trades into structured format
2. Analyzes performance metrics
3. Identifies behavioral patterns
4. Updates knowledge base with new observations
5. Generates structured journal entry with:
   - Performance analysis
   - Pattern identification
   - Learning points
   - Next-day focus areas

## Prompt Routing Rules (Strictly Enforced)

All prompt flows must be routed through the controller:
- DP transcript → dp-trade-analyzer.md
- Mancini newsletter → mancini-trade-analyzer.md
- Levels data → get-daily-sma-for-tickers.md + get-premarket-levels.md
- Final unification → unified-trade-plan-generator.md
- Intraday validation → copilot-confirm.md
- Postmarket debrief → daily-performance-debrief.md

If any source fails (e.g., malformed input, missing level logic), the controller will flag it and skip that integration without hallucinating fallback content.

## Troubleshooting

### Status Codes

| Code | Meaning | Action |
|------|---------|--------|
| `READY` | System operational | Proceed with commands |
| `INITIALIZING` | Bootstrap in progress | Wait for completion |
| `ERROR` | System error | See error details |
| `SECURITY-ALERT` | Security violation | Restart session |

### Common Issues

| Issue | Code | Resolution |
|-------|------|------------|
| Files not found | `FILE-404` | Re-upload ZIP or use alternate URL |
| Invalid command | `CMD-400` | Check command syntax reference |
| Unauthorized access | `SEC-403` | Route through controller only |
| Phase mismatch | `PHASE-409` | Verify current trading phase |
| Missing parameters | `PARAM-422` | Include all required parameters |
| JSON parsing error | `JSON-500` | Check input format |

For all security alerts, restart the session with proper initialization.

## System Components

### File Structure

```
trading-system-prompts/
├── README.md                 # This file - master guide
├── prompts/                  # Command prompt files
│   ├── main-controller.md    # EXCLUSIVE entry point
│   ├── premarket/            # Morning preparation
│   │   ├── dp-analyzer.md    # Process DP transcript
│   │   └── ...
│   ├── intraday/             # Trade execution
│   │   ├── copilot.md        # Trade validation
│   │   └── ...
│   └── postmarket/           # End-of-day review
│       ├── debrief.md        # Performance analysis
│       └── ...
├── system/                   # System configuration
│   ├── trading-charter.md    # Trading rules
│   ├── trading-behaviors-kb.md # Behavior knowledge
│   └── ...
└── logs/                     # Trading records
    ├── trades/               # Trade logs
    └── journal/              # Journal entries
```

### Core Components

| Component | Purpose | Access Method |
|-----------|---------|--------------|
| `main-controller.md` | Central command router | Direct - primary entry point |
| `trading-charter.md` | Trading rules and principles | Via `/show-charter` |
| `trading-system-sop.md` | Standard operating procedures | Via `/show-sop` |
| `trading-behaviors-kb.md` | Behavior knowledge base | Via `/show-kb` |
| `market-regimes.md` | Market condition classifier | Via `/show-regime` |

## Changelog

### 1.6 — May 7, 2025
- Reorganized README to prioritize immediate usage instructions
- Added Quick Start section at the top
- Balanced user-friendliness with comprehensive documentation
- Added detailed workflow examples
- Restored complete command reference from controller

### 1.5 — May 7, 2025
- Implemented standardized command structure
- Added tabular format for commands and parameters
- Created visual system architecture diagram

### 1.4 — May 7, 2025
- Added controller enforcement policy
- Strengthened exclusive routing requirements
- Enhanced troubleshooting section

### 1.3 and earlier
- Various improvements to documentation and structure