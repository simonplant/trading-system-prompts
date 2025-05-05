---
title: Copilot Reset  
description: Triggered by Copilot when capital or behavior flags require a reset before continuing  
tags: [intraday, reset, behavior]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.0  
category: intraday  
usage: Run immediately if trade lockout or reset triggered in Copilot  
status: active  
requires: [copilot.md, trading-behaviors-kb.md]  
linked_outputs: [midday-reset.md, update-trading-behaviors-kb.md]  
input_format: prompt  
output_format: markdown  
ai_enabled: true  
---

## COPILOT RESET — MENTAL CLARITY PROMPT

**Purpose:** Center the mind during trading overwhelm. Break loops. Reestablish clarity.

---

### RESET SEQUENCE
1. **Label It**
   - “Right now, I’m feeling: ___”
   - “The story I’m telling myself is: ___”

2. **Drop Into Breath (3-count)**
   - Breathe in… 2… 3…
   - Hold… 2…
   - Breathe out… 2… 3…
   - Repeat x3

3. **Refocus Clarity Questions**
   - What setups are *still valid* right now?
   - Is my edge still present?
   - What’s my job *this hour*?

4. **Reaffirm Structure**
   - “I am not here to prove anything.”
   - “I don’t need this trade to work.”
   - “I am following *my system* — that is enough.”

5. **Behavioral Anchor Reminder**
   - Pull in today's behavioral cue: 
     - e.g. *“Respect exits.”* or *“Don’t build into chop.”*

---

### OUTPUT
- Mental state: [Grounded | Shaky | Still FOMO]
- Plan alignment restored? [Yes / Needs further pause]
- Action: [Observe only | Set alert | Step away for 15m]