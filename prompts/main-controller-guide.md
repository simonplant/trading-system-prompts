---
title: Main Controller Guide
description: How to engage and operate the full trading prompt system in AI assistant using the main-controller prompt
category: system
author: Simon Plant
version: 1.0
last_updated: 2025-05-03
usage: Read before using this system; describes how to run prompts in sequence with the zipped repo
---

# MAIN CONTROLLER GUIDE — TRADING SYSTEM

This file explains how to use the `main-controller.md` prompt and interact with the zipped trading prompt system in AI assistant.

## OVERVIEW

Your prompt system is structured by trading phase:

- `prompts/premarket/` — DP, Mancini, and Unified Plan generation
- `prompts/intraday/` — Validate new trade ideas in real time
- `prompts/postmarket/` — Debrief performance and update behavior KB
- `system/` — Your Charter, SOP, Behavioral KB, and metadata
- `logs/YYYY/YYYY-MM-DD.md` — Daily trading journal entries

## STARTING A SESSION IN AI assistant

1. Start a new chat session  
2. Upload the full `.zip` file of your repo  
3. Say: “Let’s run the main controller.”  
   - AI assistant will load the `main-controller.md` prompt  
   - You’ll be presented with a structured menu

## MAIN USE CASES (Run from main-controller)

### 1. Premarket Prep
- Run DP morning call analysis
- Run Mancini ES to SPX blueprint
- Generate Unified Trade Plan
- Output: Market bias, trade ideas, SPX decision tree

**Inputs Required:**
- DP call notes (verbatim or summary)
- Mancini blueprint or levels
- Premarket SPX/QQQ/ES/VIX levels
- Any key macro news

### 2. Intraday Updates & Checks
- Validate a trade before entering
- Submit trade idea to run the polymorphic validator
- Confirm: structure, plan alignment, blindspots, risk level

**Inputs Required:**
- Ticker, direction, entry/stop, trade type
- SPX context and timestamp
- Emotions present, if any

### 3. Postmarket Review
- Run the daily performance debrief
- Update the trading behaviors knowledge base
- Generate daily trade log

**Inputs Required:**
- List of trades taken (log or plain text)
- Screenshots (optional)
- Observations or regrets

### 4. System Management
- Reference your Charter and SOP
- Review behavioral patterns and blindspots
- Add new insights to `trading-behaviors-kb.md`

## TIP: LOGGING A SESSION

After completing your workflow for the day:
1. Generate your `/logs/YYYY/YYYY-MM-DD.md` file
2. Copy results from prompts (plan, validator, debrief)
3. Paste into that log to build a running archive

## ADVANCED IDEAS

- Mirror IC trades in a new `mirror-log.md` file
- Create a `friday-lotto-rules.md` checklist for disciplined 0DTE Fridays
- Build a weekly dashboard in Notion, Obsidian, or Excel

## AUTHOR

Simon Plant  
https://github.com/simonplant