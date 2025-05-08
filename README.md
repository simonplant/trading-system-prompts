---
title: Trading System Prompt Library
description: Master index and usage guide for Simon Plant's AI-assisted trading framework
tags: [readme, index, overview]
author: Simon Plant
last_updated: 2025-05-07
version: 1.7
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
   Alternative (if needed): `https://github.com/simonplant/trading-system-prompts/tree/main`

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

#### Utility and Log Commands

- `/show-trade-plan` – View the current day’s unified trade plan
- `/show-dp-ideas` – Show analyzed trade ideas from DP
- `/show-mancini` – Display SPX/ES structure and Mancini blueprint
- `/load-plan YYYY-MM-DD` – Load a prior plan for review or replay
- `/log-trade` – Log a manual trade entry for performance review
- `/log-kb` – Log a behavioral pattern or insight
- `/replay-day` – Run a system playback for past trading days
- `/debug-system` – Diagnostic trace of system components and status

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

#### Postmarket Workflow

- `/postmarket-sequence` – Run the complete postmarket workflow
- `/generate-trade-log` – Create a structured log of today's trades
- `/performance-debrief` – Analyze today's trading performance
- `/generate-journal` – Create a trading journal entry
- `/update-behaviors` – Update your trading behaviors knowledge base
- `/generate-kb-update` – Generate knowledge base update recommendations
- `/performance-vs-mancini` – Compare your trade plan and actual execution against Mancini’s published setups and DP’s intent. Identify missed setups, execution errors, and PnL impact to improve next-day readiness.

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
- DP transcript → prompts/premarket/dp-trade-analyzer.md
- Mancini newsletter → prompts/premarket/mancini-trade-analyzer.md
- Levels data → prompts/premarket/get-daily-sma-for-tickers.md + prompts/premarket/get-premarket-levels.md
- Final unification → prompts/premarket/unified-trade-plan-generator.md
- Intraday validation → prompts/intraday/copilot-confirm.md
- Postmarket debrief → prompts/postmarket/daily-performance-debrief.md

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
│   ├── trading-system-sop.md      # Standard procedures
│   ├── market-regimes.md          # Market classifier
│   └── chart-visual-legend.md     # Chart legend
└── logs/                          # Trading records
    ├── trades/                    # Trade logs
    └── journal/                   # Journal entries
```

### Core Components

| Component | Purpose | Access Method |
|-----------|---------|--------------|
| `prompts/main-controller.md` | Central command router | Direct - primary entry point |
| `system/trading-charter.md` | Trading rules and principles | Via `/show-charter` |
| `system/trading-system-sop.md` | Standard operating procedures | Via `/show-sop` |
| `system/trading-behaviors-kb.md` | Behavior knowledge base | Via `/show-kb` |
| `system/market-regimes.md` | Market condition classifier | Via `/show-regime` |

## Changelog

### 1.6 — May 7, 2025
- Reorganized README to prioritize immediate usage instructions
- Removed duplication between Quick Start and Bootstrap sections
- Updated bootstrap instructions with precise Claude command format
- Added hover-over copy button instructions
- Corrected all file paths for consistency
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
