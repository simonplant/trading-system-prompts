---
title: Copilot — Scout Mode  
description: Evaluate a trade idea before entry based on structure, plan alignment, capital exposure, and emotional clarity  
tags: [intraday, execution, scout, risk]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.0  
category: intraday  
usage: Run before trade entry to validate the idea’s quality, structure, and size. Produces a go/no-go recommendation and entry plan refinement. Consumes ticker, level, sizing tier, capital profile, and behavior context.  
status: stable  
requires: [trading-charter.md, trading-capital-profile.md, trading-behaviors-schema.md]  
linked_outputs: [copilot-confirm.md, generate-daily-trade-log.md]  
input_format: markdown  
output_format: markdown  
ai_enabled: true  
---

# Copilot — Scout Mode

Use this prompt to validate any potential trade **before entering**. It acts as your structural and emotional filter, ensuring alignment with plan, risk, and rules.

## Inputs

- Ticker or setup name  
- Entry level and rationale  
- Sizing tier (1/4, 1/3, 1/2, full, double)  
- Planned stop and target  
- Emotional clarity (yes/no)  
- Prior trade context (win/loss, behavior flags)

## Validation Checklist

### 1. Alignment with Plan

- Is this setup in the **Unified Trade Plan** or **DP call**?
- Is the thesis **visually staged** and supported by structure?
- Are we **buying support** or **chasing motion**?

### 2. Structure and Trigger

- Is price near a **valid level or breakout**?
- Are SPX/QQQ aligned?
- Time of day — early scalp vs. high-quality move?
- Optional: What’s the signal confirmation (e.g., failed breakdown, reclaim)?

### 3. Capital and Sizing Guardrails

- Does the selected tier match size constraints from `trading-capital-profile.md`?  
  - Tier 1: default trade size  
  - Tier 2: scalp risk budget  
  - Tier 3: max options size  
- Are we under max exposure?
- Are soft or hard loss limits triggered?

### 4. Emotional and Behavioral Check

- Is emotional clarity present (y/n)?
- Any recent behavior flags that apply (e.g., tilt, chasing, revenge)?
- Should we reduce tier or wait?

## Output Format

```yaml
scout_result: "go"  # or "no-go"
reason: "Aligned with plan, clean structure at level, low exposure"
suggested_tier: "1/3"
reasons_to_wait: []
behavior_risk_flags: []
ready_for_confirm: true
```