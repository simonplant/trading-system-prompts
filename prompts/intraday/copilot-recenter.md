---
title: Copilot — Recenter Mode  
description: Protocol to reset emotional clarity and regain execution discipline mid-session  
tags: [intraday, reset, emotion, clarity]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.0  
category: intraday  
usage: Run any time emotional clarity is lost or after two red trades. Produces reset log and new behavioral intention. Consumes tilt signals, frustration notes, or behavior flag triggers.  
status: stable  
requires: [midday-reset.md, trading-behaviors-schema.md, trading-charter.md]  
linked_outputs: [generate-daily-trade-log.md, copilot-debrief.md]  
input_format: markdown  
output_format: markdown  
ai_enabled: true  
---

# Copilot — Recenter Mode

This mode is for **resetting mindset** when clarity, discipline, or presence has broken down. Use it proactively before major damage occurs.

## When to Use

- After 2 red trades in a row  
- After any behavior flag (tilt, chasing, revenge)  
- If you notice emotional fog, frustration, or “need to make it back”  
- When you're unsure if you should keep trading

## Recenter Protocol

1. Stop what you're doing  
2. Take 3 breaths, long exhale  
3. Answer the following:

### Reset Log

- What emotion is present right now?
- What triggered it? (loss, miss, tilt, noise)
- What behavior flag is active?

### Reset Intention

- What rule or behavior needs to be restored?
- What intention will guide your next decision?

### Decision Gate

- Will you stop for the day?
- Or continue with reduced size and strict structure?

## Output Format

```yaml
recenter_triggered: true
emotion: "frustration after back-to-back stopouts"
flag_active: "revenge"
reset_applied: "midday-reset"
intention: "Only trade reclaim structure with tier 1 size"
continue_trading: false
next_step: "Close terminal and reset bias"
```

---

Would you like me to create `copilot-debrief.md` now — for logging behavior flags and learnings after a trade completes?