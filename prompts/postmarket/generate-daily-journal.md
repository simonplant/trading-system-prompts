---
title: Generate Daily Journal Log  
description: Create the narrative journal entry for a given trading day, focused on regime, mindset, and qualitative reflection  
tags: [postmarket, journal, log, system]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.0  
category: postmarket  
usage: Use this after market close to generate a qualitative journal entry to be saved in `logs/YYYY/journal/YYYY-MM-DD.md`  
---

## JOURNAL ENTRY GENERATOR — PROMPT

**Purpose:** Generate a clean, markdown-format daily journal entry based on:
- Market behavior and context
- Trader’s mental, physical, and emotional state
- Observed themes and self-regulation quality
- Summary of execution quality

---

### INPUT FIELDS
- **Date**: (YYYY-MM-DD)
- **Market Regime**: (trend/chop/vol spike/news/event)
- **Macro Context**: (FOMC, earnings, war, etc.)
- **Bias/Focus**: Bullish/Bearish/Mixed/None
- **Emotional State**: Cautious / Confident / Frantic / Flat / etc.
- **Energy + Focus**: (Low/Medium/High)
- **Intentional Actions Taken**: (e.g., cut size, followed SOP)
- **Key Reflection**: What stood out most about today?

---

### OUTPUT STRUCTURE
```markdown
---
title: Daily Journal — YYYY-MM-DD
description: End-of-day reflection on psychological performance and market behavior  
tags: [journal, log, mindset]
author: Simon Plant
last_updated: YYYY-MM-DD
version: 1.0
category: log-template
status: draft
---

## Market & Regime Context
- Regime: ___
- Context: ___
- SPX / QQQ / VIX: ___

## Emotional State
- Mood: ___
- Focus: ___
- Energy: ___

## Observations
- ___
- ___

## Execution
- What went well: ___
- Where I drifted: ___
- Did I trade my plan? ___

## Daily Lesson
> "___"