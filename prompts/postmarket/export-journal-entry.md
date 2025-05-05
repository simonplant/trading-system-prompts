---
title: Export Journal Entry  
description: Generate structured markdown summary for each trading day, suitable for long-term review and journaling  
tags: [postmarket, log, export]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.0  
category: postmarket  
usage: Run after daily performance debrief to create a clean daily log output  
status: stable  
requires: [daily-performance-debrief.md]  
linked_outputs: [trading-behaviors-kb.md]  
input_format: markdown  
output_format: Obsidian  
ai_enabled: true  
---
## DAILY JOURNAL EXPORT — TEMPLATE

**Date:** {{insert_date_here}}  
**Market Regime:** {{from market-regimes.md}}  
**SPX Close:** {{value}}  
**VIX Close:** {{value}}  
**Bias:** {{Long / Short / Neutral}}

---

### Premarket Plan Summary
- Key levels: ...
- DP / Mancini Calls: ...
- Big Idea: ...
- Risk events: ...

---

### Trades Taken
1. **{{ticker}}**
   - Setup: {{refer to setups-kb.md}}
   - Entry: {{level/time}}, Size: {{tier}}
   - Exit: {{level/time}}, Result: {{gain/loss}}, RR: {{x:1}}
   - Alignment: Go / No-Go Charter / Plan / Setup
   - Behavior tags: [Good entry] [Chased] [Didn’t log] ...

---

### 🔍 Lessons + Adjustments
- What's working:
- What to avoid:
- Behavior rating (1–5): 
- Edge score (1–5): 
- Next Steps:

---