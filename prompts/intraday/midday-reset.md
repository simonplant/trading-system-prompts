---
title: Midday Reset Prompt  
description: Intraday reflection and decision support tool to recalibrate when off-balance, overexposed, or deviating from plan  
tags: [intraday, behavior, regime, exposure, overwhelm]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.0  
category: intraday  
usage: Run during market hours when focus slips, drawdowns occur, or impulse risk rises  
status: stable  
requires: [trading-charter, trading-behaviors-kb, market-regimes]  
linked_outputs: [copilot, update-trading-behaviors-kb, export-journal-entry]  
input_format: prompt  
output_format: markdown  
ai_enabled: true  
---

## MIDDAY RESET — PROMPT

**Purpose:**  
Interrupt negative momentum and emotional drift with structured reflection, behavioral resets, and clarity on next steps. Used to prevent overtrading, revenge trades, or execution drift during the trading session.

---

### INPUTS

- **capital_state**: capital at risk, win/loss streak, available buffer  
- **emotional_state**: frustration, fatigue, FOMO, fear, urgency  
- **behavior_flags**: patterns observed (e.g., impulse, size creep, no plan)  
- **market_regime**: current ES/SPX structure, news, volatility  
- **open_positions**: summary of active trades and exposure  
- **recent_journal**: optional prior note, behavioral KB tag, or mantra  

---

### PROMPT TASKS

1. **Reground**  
   - What’s happening emotionally right now?  
   - Is this a familiar behavioral pattern?  
   - Is my body tight, breath shallow, or pacing fast?

2. **Reset**  
   - Run internal checklist: charter alignment, trade plan, exposure  
   - Step away from the screen briefly if impulse is rising  
   - Hydrate, breathe, close eyes for 30 seconds  

3. **Reassess**  
   - Are open positions aligned with regime and structure?  
   - Is further trading today likely to improve results or compound damage?  
   - What would my best trading self do right now?

4. **Refocus**  
   - Recommit to daily goal: capital preservation, 1 good setup, staying sharp  
   - Review current plan: watchlist, DP/Mancini levels, structure  
   - Capture 1 behavioral insight or mantra to guide remainder of day  

---

### OUTPUT FORMAT

```text
Midday Reset Triggered  
Capital: [$ risk / max], [net P&L], [streak]  
Emotional State: [frustrated, greedy, avoidant, reactive, clear]  
Behavioral Flags: [impulse, plan deviation, size creep, none]  
Open Trades: [summary]  
Regime: [trend, chop, squeeze, news]  

Insight: [1-line reflection or new intention]  
Next Action: [exit, reduce size, pause, refocus, journal]