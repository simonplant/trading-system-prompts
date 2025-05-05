---
title: Copilot — Confirm Mode  
description: Final check before entering a trade. Validates level, capital risk, behavior flags, and execution discipline  
tags: [intraday, execution, confirm, risk]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.0  
category: intraday  
usage: Run at trade trigger to confirm structure, emotion, and capital alignment. Produces go/no-go output with tier and behavioral clarity. Consumes live chart context, capital exposure, and Copilot-scout output.  
status: stable  
requires: [trading-charter.md, trading-capital-profile.md, trading-behaviors-schema.md]  
linked_outputs: [generate-daily-trade-log.md, copilot-debrief.md]  
input_format: markdown  
output_format: markdown  
ai_enabled: true  
---

# Copilot — Confirm Mode

Use this right before hitting the button. This is your final gate to confirm that **structure, size, and behavior** all support execution.

## Inputs

- Ticker and trigger setup  
- Confirmed level (e.g. reclaim, breakout, retest)  
- Planned size/tier  
- Current exposure (from capital tracker)  
- Emotional state (clarity, fear, greed)  
- Output from `copilot-scout.md` if run  
- Prior trade flags (if any)

## Final Validation Checklist

### 1. Structural Confirmation

- Has the level triggered cleanly? (reclaim, hold, breakout)
- Are broader markets confirming?
- Is this a **planned setup**, or a **reaction trade**?
- Time of day logic valid?

### 2. Sizing and Risk

- Does planned size obey `trading-capital-profile.md` thresholds?
  - Soft max = 1/3 base
  - Full = 2/3 with high conviction
  - Scalp = tier 1 or 1/4
- Are you already exposed to this theme?
- Is this trade chasing or layered logically?

### 3. Emotional and Behavior Readiness

- Are you:
  - Clear-headed?
  - Not tilted?
  - Not revenge trading?
- Any red flags from `trading-behaviors-schema.md`?

## Output Format

```yaml
confirm_result: "go"  # or "no-go"
reason: "Trigger confirmed, capital safe, behavior clean"
adjusted_tier: "1/3"
behavior_risk_flags: []
final_intention: "Trim fast if stretched — confirm on 2m reclaim"
execution_clear: true
```
