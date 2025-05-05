---
title: Mancini Trade Analysis  
description: Extract actionable setups from Adam Mancini’s SPX futures blueprint and translate into SPX terms  
tags: [premarket, analysis, macro]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.2  
category: premarket  
usage: Run before market open after Mancini newsletter is available. Produces 2–3 top SPX setups converted to options terms. Consumes ES/SPX levels and Mancini's blueprint notes.
status: stable  
requires: []  
linked_outputs: [unified-trade-plan-generator.md]  
input_format: markdown  
output_format: markdown  
ai_enabled: true  
---

## MANCINI ES TO SPX BLUEPRINT — PROMPT

TASK:
Extract ultra-specific trade setups, level ranges, invalidation zones, and structure logic from Mancini’s ES futures blueprint and convert into a full-format SPX plan using a -30 offset.

---

### OUTPUT STRUCTURE:

**TITLE:**  
SPX BLUEPRINT FOR [DAY], [DATE]

---

### MULTI-DAY TREND ANALYSIS  
[Brief (max 100 words) summary of the key multi-day patterns identified in the newsletter - focus on day streaks, dip-buying behavior, and major trend structures mentioned.]

---

### PREVIOUS SESSION REVIEW  
[Concise 100–150 word summary of the most recent completed trading day. Include key failed breakdowns, level-to-level price moves, clean reclaims/fails, and overall trend control transitions.]

---

### CRITICAL TECHNICAL STRUCTURES  
[List all specific structures called out: megaphones, flags, triangle breaks, wedges, rising support, etc. Use exact terms.]

---

### SUPPORT/RESISTANCE MAP (SPX ADJUSTED)  
- Macro resistance: [Level] – [context]  
- Major resistance: [Level] – [context]  
- Minor resistance: [Level] – [context]  
- Current trading range: [Level–Level]  
- Minor support: [Level] – [context]  
- Major support: [Level] – [context]  
- Macro support: [Level] – [context]  

---

### NEXT SESSION GAME PLAN  
[Summarize what Mancini suggests doing in the next session. Include preferred scenario (e.g., reclaim at X → buy to Y), level-based logic, and if/then caveats.]

---

### BULL/BEAR CONTROL LINES  
- Bull control above: [Level]  
- Bear control below: [Level]  
- Critical decision point: [Most significant directional level]

---

### MARKET SCENARIOS DECISION TREE  
[ASCII format decision tree — follow logic from the newsletter and adjust ES levels to SPX (-30 pts).]

Example:  
IF SPX reclaims 5606        → LONG  → Targets: 5620, 5628       → Stop: 5598  
IF SPX fails 5642           → SHORT → Targets: 5620, 5606       → Stop: 5646  
IF backtest 5620 holds      → LONG  → Targets: 5635, 5642       → Stop: 5612  

---

### PRIORITIZED SETUPS  
1. [Primary setup with exact entry criteria] → Targets: [T1], [T2], [T3]; Stop: [Level]; Size: [Full/Half/Quarter]; Visual: [pattern]; Context: [trigger]; Confidence: [High/Medium/Low]  
2. [Etc...]

---

### INVALIDATION SIGNALS  
- [Quote or paraphrase specific invalidation conditions]  
- [What structure breaks, reclaim failures, or levels to avoid trading around]

---

### FORMAT INSTRUCTIONS FOR AI OUTPUT  
- Convert ES to SPX using -30 pts  
- Use exact terms from Mancini’s post (Failed Breakdown, Acceptance, Backtest, etc.)  
- Prioritize setups involving reclaim/fails and reaction-based levels  
- Do not editorialize or “guess” the plan — translate only what’s written  
- Keep formatting clean, using headings and markdown structure

---

### BONUS: ES-TO-SPX PROMPT (RUN SECOND)

“Create an SPX Blueprint for [DAY] [DATE]  
Based on the ES Futures Blueprint above, create an SPX-specific blueprint using a -30 point offset. This should:  
1. Convert all ES price levels to SPX by subtracting 30 points  
2. Maintain the same market structure and logic  
3. Adjust the ASCII tree to new SPX price levels  
4. Recalculate all price targets, stop losses, and trading ranges  
5. Retain the same setups but use SPX values  
Output should exactly match the format above.”