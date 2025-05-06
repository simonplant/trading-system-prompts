---
title: Export Journal Entry  
description: Markdown export utility to structure one day’s reflections, trades, and flags for logbook use  
tags: [postmarket, reflection, log]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.0  
category: postmarket  
usage: Run after completing journal entry. Produces a saved markdown version for logbook/archive. Consumes daily journal notes and optionally merges with template formatting.  
status: stable  
requires: [generate-daily-journal.md]  
linked_outputs: []  
input_format: markdown  
output_format: markdown  
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
- Key levels: [complete this section]
- DP / Mancini Calls: [complete this section]
- Big Idea: [complete this section]
- Risk events: [complete this section]

---

### Trades Taken
1. **{{ticker}}**
   - Setup: {{refer to setups-kb.md}}
   - Entry: {{level/time}}, Size: {{tier}}
   - Exit: {{level/time}}, Result: {{gain/loss}}, RR: {{x:1}}
   - Alignment: Go / No-Go Charter / Plan / Setup
   - Behavior tags: [Good entry] [Chased] [Didn’t log] [complete this section]

---

### 🔍 Lessons + Adjustments
- What's working:
- What to avoid:
- Behavior rating (1–5): 
- Edge score (1–5): 
- Next Steps:
---