---
title: Copilot — Debrief Mode  
description: Post-trade reflection and behavior analysis to reinforce discipline and extract lessons  
tags: [intraday, debrief, review, behavior]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.0  
category: intraday  
usage: Run immediately after a trade exits. Produces a structured behavioral snapshot. Consumes trade size, entry/exit notes, emotion, and structure alignment.  
status: stable  
requires: [trading-behaviors-schema.md, generate-daily-trade-log.md]  
linked_outputs: [generate-kb-update.md, update-trading-behaviors-kb.md]  
input_format: markdown  
output_format: markdown  
ai_enabled: true
style:
  use_emojis: false
  text_decoration: false
---

# Copilot — Debrief Mode

Use this after any trade to review the setup, size, emotion, and behavior outcome. It ensures you **close the loop** on execution quality and psychological alignment.

## Inputs

- Ticker and setup  
- Entry/exit levels  
- Sizing tier and capital used  
- Result (win/loss, magnitude)  
- Emotional state before, during, and after  
- Any Copilot flags active at entry

## Scoring Questions

1. Was this setup in plan or reactive?
2. Did you execute based on structure or emotion?
3. Was sizing appropriate?
4. Were any behavior flags present?
5. Did you stick to your stop and target logic?

## Behavior Flagging

- Use definitions from `trading-behaviors-schema.md`
- List any flags triggered (e.g., chasing, hesitation, tilt)
- Decide if a KB update is needed based on repetition

## Learning Capture

- What worked or didn't?
- If repeated, what will you do differently?
- Single sentence summary of lesson

## Output Format

```yaml
ticker: TSLA
setup: reclaim breakout
result: +22%
sizing_tier: 1/3
entry_reason: "Held level, broad confirmation"
behavior_flags: [chasing, late-cut]
emotional_state: "calm at entry, rushed on exit"
lesson: "When trimmed fast, I stay objective — keep doing that"
kb_update_suggested: true
```