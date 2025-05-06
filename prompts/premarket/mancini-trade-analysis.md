---
title: Mancini Trade Analysis  
description: Extract precise trade setups, critical levels, and acceptance patterns from Adam Mancini's SPX futures blueprint  
tags: [premarket, analysis, macro]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.4  
category: premarket  
usage: Run before market open after Mancini newsletter is available. Produces 2–3 top SPX setups converted to options terms with exact level magnets and acceptance criteria. Consumes ES/SPX levels and Mancini's blueprint notes.  
status: stable  
requires: []  
linked_outputs: [unified-trade-plan-generator.md]  
input_format: markdown  
output_format: markdown  
ai_enabled: true  
---

## MANCINI ES TO SPX BLUEPRINT — PROMPT

TASK:  
Extract ultra-specific trade setups, precise level magnets, acceptance patterns, and structural logic from Mancini's ES futures blueprint and convert into a full-format SPX plan using a -30 offset.

---

### OUTPUT STRUCTURE:

**TITLE:**  
SPX BLUEPRINT FOR [DAY], [DATE]

---

### MULTI-DAY TREND ANALYSIS  
[Brief (max 100 words) summary of the key multi-day patterns identified in the newsletter - focus on day streaks, dip-buying behavior, and major trend structures mentioned.]

---

### PREVIOUS SESSION REVIEW  
[Concise 100–150 word summary of the most recent completed trading day. Include key failed breakdowns, level-to-level price moves, clean reclaims/fails, and overall trend control transitions. Highlight exact timestamp references if Mancini provides them.]

---

### CRITICAL TECHNICAL STRUCTURES  
[List all specific structures called out: megaphones, flags, triangle breaks, wedges, rising support, etc. Use exact terms with precise price levels and timeframes.]

---

### CRITICAL LEVELS IDENTIFICATION  
**Primary Structure Levels:**  
- [Level] – [Exact structural significance - megaphone, triangle, etc.]

**Historical Significance Levels:**  
- [Level] – [Prior day's high/low, multi-day pivot point, etc.]

**Intraday Magnets:**  
- [Level] – [Price clustering, acceptance zones, etc.]

**V-Shape Recovery Points:**  
- [Level] – [Potential reversal points from significant lows]

---

### SUPPORT/RESISTANCE MAP (SPX ADJUSTED)  
- Macro resistance: [Exact Level] – [Specific context]  
- Major resistance: [Exact Level] – [Specific context]  
- Minor resistance: [Exact Level] – [Specific context]  
- Current trading range: [Precise Range Level–Level]  
- Minor support: [Exact Level] – [Specific context]  
- Major support: [Exact Level] – [Specific context]  
- Macro support: [Exact Level] – [Specific context]  

---

### NEXT SESSION GAME PLAN  
[Summarize what Mancini suggests doing in the next session. Include preferred scenario (e.g., reclaim at X → buy to Y), level-based logic, and if/then caveats. Focus on extracting any specific timing windows Mancini mentions (e.g., before 11AM, after 3PM).]

---

### OPTIMAL EXECUTION WINDOWS  
- Primary window: 7:30 AM - 11:00 AM (highest quality setups)  
- Secondary window: After 3:00 PM (potential afternoon setups)  
- Avoid: 11:00 AM - 2:00 PM (typically choppy, low-edge trading)

---

### ACCEPTANCE CRITERIA  
- **Type 1 (Back-test & Rejection):** [Describe pattern where price back-tests a level, sells off, then returns]  
- **Type 2 (Reclaim & Acceptance):** [Describe pattern where price recovers a level, shows it can hold above it]  
- **Example Level(s):** [Specific level(s) where Mancini mentions acceptance being important]

---

### BULL/BEAR CONTROL LINES  
- Bull control above: [Exact Level with context]  
- Bear control below: [Exact Level with context]  
- Critical decision point: [Most significant directional level with structural context]

---

### MARKET SCENARIOS DECISION TREE  
[ASCII format decision tree — follow logic from the newsletter and adjust ES levels to SPX (-30 pts). Include both price action and timing elements if specified.]

IF SPX reclaims [Level]        → LONG  → Targets: [T1], [T2], [T3]       → Stop: [Level]  
IF SPX fails [Level]           → SHORT → Targets: [T1], [T2], [T3]       → Stop: [Level]  
IF backtest [Level] holds      → LONG  → Targets: [T1], [T2], [T3]       → Stop: [Level]  

---

### TRADE MANAGEMENT PROTOCOL  
- First target: Take 75% profits, leave 25% runner  
- Second target: Take more profits, leave 10% runner  
- Runner management: Trail stop based on recent higher lows  
- Never let winning trades go red (move stop to breakeven after first target)

---

### PRIORITIZED SETUPS  
1. [Primary setup with exact entry criteria] → Acceptance: [Required pattern]; Targets: [T1], [T2], [T3]; Stop: [Exact Level]; Size: [Full/Half/Quarter]; Visual: [pattern]; Context: [trigger]; Confidence: [High/Medium/Low]  
2. [Secondary setup with same formatting]

---

### RUNNER MANAGEMENT  
- Trailing stop strategy: Move stop several points below most recent higher low visible on 15-minute chart  
- Give runners space to work (don't trail too tightly)  
- Accept that all runners will eventually stop out by design  
- Consider a 10% runner as a "free lotto ticket" for trend days

---

### INVALIDATION SIGNALS  
- [Quote or paraphrase specific invalidation conditions]  
- [What structure breaks, reclaim failures, or levels to avoid trading around]  
- [Timing-based invalidations (e.g. "if no recovery by X time")]

---

### FORMAT INSTRUCTIONS FOR AI OUTPUT  
- Convert ES to SPX using -30 pts  
- Use exact terms from Mancini's post (Failed Breakdown, Acceptance, Backtest, etc.)  
- Prioritize setups involving reclaim/fails and reaction-based levels  
- Be ultra-precise with level identification (single points, not ranges where possible)  
- Highlight any "magnet" levels where price tends to cluster  
- Capture any timing-based elements (morning setups, avoid midday, etc.)  
- Extract exact acceptance criteria patterns for entries  
- Document profit-taking and runner management strategies  
- Do not editorialize or "guess" the plan — translate only what's written  
- Keep formatting clean, using headings and markdown structure

---

### BONUS: ES-TO-SPX PROMPT (RUN SECOND)

"Create an SPX Blueprint for [DAY] [DATE]  
Based on the ES Futures Blueprint above, create an SPX-specific blueprint using a -30 point offset. This should:  
1. Convert all ES price levels to SPX by subtracting 20 points  
2. Maintain the same market structure and logic  
3. Adjust the ASCII tree to new SPX price levels  
4. Recalculate all price targets, stop losses, and trading ranges  
5. Retain the same setups but use SPX values  
Output should exactly match the format above."