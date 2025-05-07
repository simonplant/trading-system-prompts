---

title: Trading System Prompt Library
description: Master index and usage guide for Simon Plant's AI-assisted trading framework
tags: [readme, index, overview]
author: Simon Plant
last_updated: 2025-05-06
version: 1.2
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

This is a modular AI-assisted trading framework designed by Simon Plant to support high-conviction, structure-driven options trading. It integrates David Prince's Inner Circle trade ideas, Adam Mancini's SPX blueprint, and Simon's personal SOPs, conviction sizing, and behavioral filters.

## Quick Command Reference

All commands follow the slash command format defined in main-controller.md:

```
# Bootstrap System (Always first command)
"Load the full repo and use prompts/main-controller.md as the routing layer for all commands."

# Premarket Commands
/premarket-sequence - Run complete premarket workflow
/analyze-dp - Process DP Morning Call transcript
/analyze-mancini - Process Mancini blueprint
/generate-trade-plan - Create unified plan from all sources

# Intraday Commands
/copilot - Activate intraday trading assistant
/copilot-confirm - Validate a specific trade idea
/copilot-recenter - Reset focus during trading
/midday-reset - Mid-session review and adjustment

# Postmarket Commands
/postmarket-sequence - Run complete postmarket workflow
/performance-debrief - Analyze today's trading
/generate-journal - Create trading journal entry
/update-behaviors - Update trading behaviors KB

# System Commands
/system-parameters - View/update system settings
/help - Show available commands
/status - View system status
```

---

## System Overview — Visual Flow

The following flow represents the full lifecycle of daily execution:

**Premarket** → **Intraday** → **Postmarket**

Each phase connects via the Copilot, which serves as the execution and validation interface across all modules.

- **Premarket**: Extract trade ideas (DP, Mancini) → Map levels → Structure plan
- **Intraday**: Validate trade ideas → Align with setup library, regime, and behavior
- **Postmarket**: Log trades → Debrief → Update behavioral KB → Export journal

---

## 1. System Bootstrap Instructions

Following the main-controller.md specifications:

### Option A: ZIP Upload (For ChatGPT and Similar)
1. Download [the zipped version](https://github.com/simonplant/trading-system-prompts/archive/refs/heads/main.zip)
2. Upload the ZIP file to your AI assistant chat
3. Enter this exact command:
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

2. Enter this exact command:
   ```
   Please read and load ALL files from this repository.
   Start with README.md to understand the structure, then load all files from /prompts, /system, and /logs.
   Once loaded, use prompts/main-controller.md as the EXCLUSIVE routing layer for ALL commands.
   I want to interact with my trading system.
   ```

---

## !MANDATORY CONTROLLER ENFORCEMENT POLICY!

**ALL interactions with the trading system MUST be routed through main-controller.md without any exceptions.** 
Direct access to individual component files is strictly prohibited. The controller is the ONLY authorized 
entry point to any system functionality.

### Critical Safety Reasons:

1. **Risk Management**: The controller enforces position sizing limits, risk parameters, and behavioral 
   guardrails that protect your trading capital.

2. **Data Consistency**: Bypassing the controller creates data fragmentation leading to contradictory 
   analysis and potentially harmful trade signals.

3. **Validation Chain**: The controller performs essential input validation to prevent execution of 
   incomplete or malformed commands.

4. **System Integrity**: The controller maintains phase awareness (pre/intra/post-market) to prevent 
   inappropriate actions at the wrong trading time.

### System Safeguards:

- Each component verifies it was properly called through the controller
- All valid commands are documented only in the controller
- Components will terminate execution if accessed directly
- The controller validates inputs before routing to prevent data corruption

### Session Initialization Protocol:

At the start of EVERY new trading session:
1. Upload repository (ZIP) or provide GitHub URL 
2. Issue bootstrap command with EXCLUSIVE routing language
3. Verify system readiness with: `/status`
4. Proceed ONLY when the status confirms controller is active

**WARNING: Bypassing these safeguards may result in corrupted analysis, invalid trade signals, or risk management failures. Never attempt to directly access individual prompt files.**

### System Readiness Check
The system should confirm access to these critical files:
- ✓ prompts/main-controller.md (routing layer)
- ✓ system/trading-charter.md (risk parameters)
- ✓ system/trading-system-sop.md (procedures)
- ✓ system/trading-behaviors-kb.md (behavior knowledge base)

---

## 2. System Architecture & Operation

The `main-controller.md` serves as the central command router and orchestration layer:

### Controller Functions
* Acts as the **EXCLUSIVE entry point** for ALL system functionality
* Orchestrates various system components through slash commands
* Routes user input to appropriate specialized prompts
* Maintains data consistency across the system
* Enforces prompt routing rules and dependency handling
* Manages JSON-based data flow between components
* Prevents direct access to individual component files
* Implements system-wide risk management and validation

### System Organization
The trading system is organized into these functional areas:
1. **Premarket Analysis** - Market context, technical levels, trade ideas
2. **Intraday Execution** - Trade validation, risk management, real-time analysis
3. **Postmarket Review** - Performance analysis, journaling, system improvement

### Data Architecture
* JSON-based data flow between components
* Separation of analyzer and summary components
* Structured prompt chaining and context tracking
* Fallback handling for missing or malformed inputs
* Session state management for multi-phase operations
* Validation checkpoints to ensure data integrity

** CRITICAL: NEVER attempt to access individual components directly. ALL commands MUST be routed through main-controller.md using the slash command format. The controller provides essential risk management and data validation that cannot be bypassed under any circumstances.**

---

## 3. Supported Workflows

### Premarket Planning

**Command Format:**
```
/premarket-sequence
[paste DP transcript text here]
[paste Mancini newsletter if available]
[include key ES/QQQ/SPY levels if available]
```

**Individual Commands:**
- `/analyze-dp` - Process DP Morning Call (outputs JSON)
- `/dp-summary` - Generate readable summary from DP analysis
- `/analyze-mancini` - Process Mancini Blueprint (outputs JSON)
- `/mancini-summary` - Generate readable summary from Mancini analysis
- `/get-sma` - Retrieve daily SMA data for key tickers
- `/get-levels` - Extract premarket levels for indices
- `/generate-trade-plan` - Create unified plan from all sources

**What Happens:**
* System processes inputs through JSON-based data flow
* DP and Mancini analyzers extract structured data
* Separate summary components generate human-readable outputs
* Final unified trade plan integrates all sources

**Expected Output:**
* Structured Trade Plan with:
  - Market context and bias determination
  - Technical level identification
  - Trade idea prioritization
  - 5-minute focus stack
  - SPX decision tree
  - Execution checklist

### ⚡ Intraday Trade Validation

**Command Format:**
```
/copilot-confirm
[asset] [direction] [entry criteria], [trade type].
Market context: [current conditions, levels, etc.]
```

**Example:**
```
/copilot-confirm
AAPL long above 170 reclaim, cashflow.
Market context: SPX reclaiming 5606, sector strength in tech.
```

**Available Intraday Commands:**
- `/copilot` - Activate the full intraday trading assistant
- `/copilot-scout` - Scan for setups matching your criteria
- `/copilot-confirm` - Validate a potential trade against your plan
- `/copilot-recenter` - Reset focus during the trading day
- `/copilot-debrief` - Quick review of a completed trade
- `/midday-reset` - Mid-session review and plan adjustment

**What Happens:**
* Trading copilot validates idea against your plan and risk parameters
* System checks setup library, regime compatibility, and behavior patterns
* Risk management rules from charter are enforced
* Blindspot detection runs to identify potential biases

**Expected Output:**
* GO / WAIT / NO GO decision
* Conviction and sizing recommendation
* Specific charter or behavior reference
* Potential blindspots or cautions

### Postmarket Debrief

**Command Format:**
```
/postmarket-sequence
[paste trade log and notes]
```

**Individual Commands:**
- `/generate-trade-log` - Create structured log of today's trades
- `/performance-debrief` - Analyze today's trading performance
- `/generate-journal` - Create a trading journal entry
- `/update-behaviors` - Update your trading behaviors knowledge base
- `/generate-kb-update` - Generate knowledge base update recommendations

**What Happens:**
* System processes trade data into structured formats
* Performance metrics are calculated and analyzed
* Behavioral patterns are identified and flagged
* Knowledge base is updated with new observations
* Structured journal entry is generated

**Expected Output:**
* Comprehensive performance analysis
* Pattern recognition across trades
* Behavioral blindspot identification
* Updated knowledge base entries
* Formatted journal template for the day

### System Reference & Management

**Command Formats:**
```
/system-parameters - View or update system parameters
/help - Show available commands and documentation
/status - Show current system status and active processes
```

**Additional Reference Commands:**
```
/show-charter - Display Trading Charter
/show-regime - Display current Market Regime
/show-kb - Display Behavioral Knowledge Base
/show-legend - Display Chart Legend
```

**Expected Output:**
* Requested system information or documentation
* Relevant sections highlighted based on context
* System status and active process information when applicable

---

## 4. System Requirements & Troubleshooting

### Mandatory Controller Usage
The controller-only policy is strictly enforced:
* ALL commands must go through the main-controller.md
* NO direct access to component files is permitted
* NO exceptions to routing policy under any circumstance
* System will reject commands not issued through the controller

### Bootstrap Process
Follow the exact bootstrap process in the main-controller.md:
1. Upload the ZIP archive or provide the GitHub repository link
2. Use the main controller as the EXCLUSIVE entry point for all interactions
3. Follow the slash command format for all system interactions
4. Verify system initialization with `/status` before proceeding
5. If status shows any error, restart the bootstrap procedure

### Token Limits
* **Claude**: May hit token limits in very long sessions. If this happens, restart with a fresh chat and re-bootstrap.
* **ChatGPT**: Works best with GPT-4 or later. GPT-3.5 may not handle the full system effectively.

### Common Issues

| Problem | Solution |
|---------|----------|
| System can't find files | Try the alternative GitHub URL or re-upload ZIP |
| "I don't have access to..." | Make sure to use the exact bootstrap command |
| Unable to read markdown | Ensure ZIP file wasn't corrupted during download |
| "Command not authorized" | Ensure you're routing through the controller |
| Missing context from previous phase | Reference specific log files from earlier phase |
| JSON parsing errors | Ensure analyzer outputs proper structured data |
| Command not recognized | Check command syntax against main-controller.md |
| "Controller validation failed" | Reset the session and re-bootstrap properly |

### Security Warnings
* If you get "WARNING: Direct access attempt blocked" - you're trying to bypass the controller
* If you get "VALIDATION FAILED" - the system detected improper routing
* If you see "SESSION TERMINATED" - a critical safety rule was violated

---

## 5. What's New (May 2025)

### Latest Features
* **Enhanced Copilot**: Real-time validation with conviction scoring
* **Market Regime Awareness**: Adapts trade filtering by market conditions
* **Setup Library Integration**: Matches trade ideas to canonical patterns
* **Journal Export**: Automated Markdown trade logs and summaries

| File | Description |
|------|-------------|
| `prompts/intraday/copilot.md` | Central AI agent for validating trades and sizing |
| `system/trade-setups-kb.md` | Canonical library of setups (e.g., Failed Reclaim, Scalp, Swing) |
| `system/market-regimes.md` | Classifies market bias and filters valid setups |
| `prompts/postmarket/export-journal-entry.md` | Generates daily Markdown summary for trade logs |

---

## 6. System Architecture

### Functional Groups

#### Command & Control
* `prompts/main-controller.md` - Central routing system
* `system/trading-system-sop.md` - Standard Operating Procedures
* `system/trading-charter.md` - Core trading rules and principles

#### Trade Planning (Premarket)
* `prompts/premarket/dp-trade-analysis.md` - DP ideas parser
* `prompts/premarket/mancini-trade-analysis.md` - ES level translator
* `prompts/premarket/unified-trade-plan-generator.md` - Plan creator

#### Trade Execution (Intraday)
* `prompts/intraday/copilot.md` - Real-time validation agent
* `prompts/intraday/copilot-scout.md` - Setup identifier
* `prompts/intraday/copilot-confirm.md` - Final trade validator

#### Performance Analysis (Postmarket)
* `prompts/postmarket/daily-performance-debrief.md` - Trade review
* `prompts/postmarket/update-trading-behaviors-kb.md` - Pattern updater
* `prompts/postmarket/export-journal-entry.md` - Journal generator

#### Knowledge Bases
* `system/trading-behaviors-kb.md` - Mental patterns and corrections
* `system/trade-setups-kb.md` - Setup library and characteristics
* `system/market-regimes.md` - Market condition classifier

### Directory Structure

| Folder | Purpose |
|--------|---------|
| `prompts/` | Core prompt logic by phase (premarket, intraday, postmarket) |
| `system/` | Charter, SOP, KBs, setups, market regimes, chart legend |
| `logs/` | Structured markdown files for daily trade logs |
| `README.md` | This file — primary usage guide and system map |

---

## 7. Complete File Index

Detailed list of all files by phase and system role. Helps search, indexing, and LLM compatibility (e.g., Claude).

### Prompts

**prompts/premarket/**
* dp-trade-analysis.md — Extracts DP's morning call trade ideas, sentiment, and sizing
* mancini-trade-analysis.md — Converts Mancini ES blueprint into actionable SPX levels
* get-daily-sma-for-tickers.md — Surfaces daily SMAs likely to act as S/R
* get-premarket-levels.md — Gathers SPX/ES/QQQ key levels for staging
* unified-trade-plan-generator.md — Merges all premarket data into a single daily plan

**prompts/intraday/**
* copilot.md — Primary interface for validating and managing intraday trades
* copilot-scout.md — Identifies new setups intraday
* copilot-confirm.md — Validates if a trade is actionable
* copilot-reset.md — Clears mental tilt or indecision
* copilot-recenter.md — Returns focus to charter
* midday-reset.md — Midday clarity check
* copilot-debrief.md — Post-trade intra-session reflection

**prompts/postmarket/**
* generate-daily-trade-log.md
* generate-daily-journal.md
* daily-performance-debrief.md
* generate-kb-update.md
* update-trading-behaviors-kb.md

### System

* trading-system-sop.md — Master standard operating procedures
* trading-charter.md — Your personal trading constitution
* trading-capital-profile.md — Account size, sizing rules, tiers
* market-regimes.md — Framework for adjusting strategy by macro regime
* trading-behaviors-schema.md — Mental performance model
* trade-setups-kb.md — Your library of validated setups
* trading-behaviors-kb.md — Specific mental errors, corrections, affirmations
* chart-visual-legend.md — Color key for interpreting screenshots
* todo-system-updates.md — Pending changes to the system

### Logs

**logs/trades/**
* 2025-05-05-daily-performance-debrief.md

**logs/journal/**
* 2025-05-05-trading-journal.md

**logs/kb-updates/**
* 2025-05-05-kb-update-recommendations.md

---

## 8. 👤 Author

Simon Plant  
GitHub: [https://github.com/simonplant](https://github.com/simonplant)

---

## Changelog

### 1.4 — May 7, 2025
- Added MANDATORY CONTROLLER ENFORCEMENT POLICY section
- Strengthened language around exclusive controller usage
- Added security warnings and validation failure messages
- Enhanced troubleshooting section with controller-specific errors
- Updated bootstrap instructions to emphasize EXCLUSIVE routing
- Added critical warning banners throughout the document
- Updated version number and metadata

### 1.3 — May 7, 2025
- Synchronized with main-controller.md v2.4 updates
- Updated all commands to use slash format (/command)
- Added JSON-based data flow architecture details
- Enhanced command documentation to match controller
- Added additional troubleshooting for JSON parsing errors
- Updated system architecture section with controller functions
- Separated analyzer and summary components in workflow descriptions

### 1.2 — May 6, 2025
- Added Quick Command Reference for faster system usage
- Improved bootstrap instructions with clearer formatting
- Added system requirements and troubleshooting section
- Enhanced visual organization with icons and better spacing
- Reorganized file structure by function rather than just location
- Added example command formats with expected outputs
- Highlighted newest features more prominently

### 1.1 — May 6, 2025
- Added bootstrap instructions for ZIP and GitHub repo loading
- Included secondary GitHub URL for Claude compatibility
- Clarified `main-controller.md` role in prompt routing
- Refined section on premarket startup process using SOP and routing layers
- Removed references to Claude rate limits (resolved)
- Improved formatting consistency and index granularity

### 1.0 — Initial Release
- Structured the README by workflow phase
- Added prompt folder index and usage summaries
- Defined system overview and visual flow