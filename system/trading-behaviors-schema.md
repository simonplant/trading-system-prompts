---
title: Trading Behaviors Schema  
description: Canonical structure for logging, flagging, and resolving trader behaviors across Copilot, Reset, and Journal prompts  
tags: [system, behavior, schema, kb]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.0  
category: system  
usage: Reference when logging behavior flags, scoring trades, or generating KB updates. Produces consistent behavior metadata across prompts. Consumes inputs from trade logs, emotional states, and postmortems.  
status: stable  
requires: []  
linked_outputs: [trading-behaviors-kb.md, generate-kb-update.md, copilot.md, midday-reset.md]  
input_format: markdown  
output_format: markdown  
ai_enabled: false  
---

# TRADING BEHAVIOR FLAGS — CANONICAL SCHEMA

This file defines the standardized format for behavior flagging, mitigation tracking, and behavioral learning updates across the system.

---

## ⚠️ Behavior Flags (Core Set)

| Flag             | Description |
|------------------|-------------|
| `hesitation`     | Missed valid setup due to delay, fear, or uncertainty |
| `chasing`        | Entered too late without structure, after price moved |
| `overconfidence` | Oversized or broke rules after recent success |
| `revenge`        | Took a trade out of frustration after loss or miss |
| `passivity`      | Failed to act on a well-structured, planned setup |
| `tilt`           | Emotional or erratic trading after drawdown or misfire |
| `sloppy-exit`    | Poor exit logic — gave up gains or added risk unnecessarily |
| `impulsive-entry`| Took trade without structure or plan confirmation |
| `attachment`     | Mentally attached to ticker or idea beyond valid setup |
| `distraction`    | Missed trades or managed poorly due to lack of focus |
| `rule-break`     | Violated sizing, entry, or stop rule knowingly |
| `late-cut`       | Held losing trade longer than defined stop allowed |

---

## 🧠 Reset Protocols

Each flag should map to one or more **reset types** for mitigation:

| Reset Type       | Description |
|------------------|-------------|
| `midday-reset`   | Pause + recenter using `midday-reset.md` |
| `copilot-reentry`| Restart flow with smaller size or tighter plan |
| `journal-review` | Full end-of-day reflection and journaling |
| `sop-realignment`| Re-read Charter or SOP before next session |
| `full-stop`      | Cease trading for day (hard rule or discretion) |

---

## 🧩 Behavior Flag Entry Format (in logs or KB updates)

```yaml
- flag: chasing
  trigger: Entered $TSLA breakout late without retest; broke tiering rules
  time: 2025-05-02 08:48 PT
  context: FOMO after watching move without being in position
  reset_applied: midday-reset
  improvement_note: Practice staging alerts + only trigger with full plan
```

---

## 🔁 Integration Points

| File | Interaction |
|------|-------------|
| `copilot.md` | Identifies and logs flags during trade flow or recenter check |
| `midday-reset.md` | Applies resets and captures intentions for mitigation |
| `generate-daily-trade-log.md` | Includes flags + entry tier and outcome |
| `generate-kb-update.md` | Summarizes recurring flags and builds heuristics |
| `trading-behaviors-kb.md` | Stores durable learnings, patterns, and updates |

---

## ✅ Best Practices

- **Every trade** should be reviewed for flag potential — not just red trades  
- Multiple flags can be applied to the same trade or session  
- KB should be updated only after patterns repeat (2–3 similar events)  
- Add `cooldown_required: true` to log if same flag is triggered multiple times  
- Use behavioral logs to inform premarket SOP tone and Copilot resets