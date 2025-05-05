---
title: Generate Daily Journal  
description: End-of-day reflection to clarify mindset, emotional state, behavioral patterns, and tomorrow's intention  
tags: [postmarket, journal, behavior, psychology]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 2.0  
category: postmarket  
usage: Run after market close or before bed. Produces a narrative snapshot of mindset, emotion, and behavioral themes. Consumes memory of trade flow, emotional highs/lows, and reset signals.  
status: stable  
requires: [trading-behaviors-kb.md, trading-behaviors-schema.md]  
linked_outputs: [generate-kb-update.md, update-trading-behaviors-kb.md]  
input_format: markdown  
output_format: markdown  
ai_enabled: true  
---

# Daily Trading Journal — Reflection and Reset

Use this prompt at the end of each trading day to reconnect with your internal state, clarify key lessons, and build emotional resilience.

## 1. Emotional Snapshot

- How do you feel right now (honestly)?  
- What stuck with you emotionally from today’s session?  
- Any lingering frustration, regret, fear, pride, or confidence?

## 2. What Actually Happened?

- One sentence summary of the market today  
  (trend? chop? gamma-driven? event overhang?)

- One sentence summary of your behavior today  
  (aligned? erratic? controlled? hesitant? overly aggressive?)

## 3. Behavioral Flags or Themes

- Did any of the behavior flags from `trading-behaviors-schema.md` show up?  
  (e.g. chasing, tilt, hesitation, passivity)

- Were there multiple trades with the same mistake or emotional pattern?

- Was there a reset moment? If so, what triggered it and how did you respond?

## 4. Lessons and Adjustments

- What lesson do you want to remember tomorrow morning?  
- If this pattern repeats, what would you do differently?

- Should this be added to the behavior KB?

## 5. Intention for Tomorrow

Write a single, clear intention — a behavioral or structural mantra to carry into the next session:

INTENTION: ___________________________________

## Output Format (for archival)

```yaml
date: 2025-05-05
emotion: "fatigued but grounded"
market_summary: "Gap-up open, range-bound, strong SPX close above resistance"
self_summary: "Hesitant on first trigger, better structure mid-session, cut size appropriately after miss"
flags_triggered: [hesitation, late-cut]
reset_triggered: midday-reset
lesson: "When in doubt, trim fast and revisit structure. Price can reoffer — you can’t reenter discipline."
intention: "Trade only levels with full prep — no half-ready setups"
kb_update_suggested: true
```