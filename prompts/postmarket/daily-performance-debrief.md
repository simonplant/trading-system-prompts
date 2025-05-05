---
title: Daily Performance Debrief  
description: End-of-day review prompt to log trade outcomes, emotional state, and execution score  
tags: [postmarket, behavioral]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.1  
category: postmarket  
usage: Run after market close to document and review trade performance  
status: stable  
requires: [trade-log-template.md]  
linked_outputs: [export-journal-entry.md, update-trading-behaviors-kb.md]  
input_format: markdown  
output_format: markdown  
ai_enabled: true  
---

## DAILY PERFORMANCE DEBRIEF — PROMPT

**Purpose:**
Structured end-of-day evaluation and coaching to improve future performance. Analyzes execution vs. plan, identifies behavioral blindspots, and integrates learnings into the system.

---

### INPUTS (REQUIRED)
- Unified Daily Trade Plan (PDF or pasted text)
- Trade log or screenshots (including entries, exits, sizes, timestamps)
- Screenshots of relevant charts (5-minute, daily)
- Inner Circle moderator trade callouts
- Any surprises, pivots, or macro events
- Current version of Trading Behaviors Knowledge Base (optional)

---

### INSTRUCTIONS TO AI
1. **Plan vs. Execution**
   - Which planned trades were taken, skipped, or mistimed?
   - Were any unplanned trades taken? Why?

2. **Blind Spot Triggers**
   - Identify behaviors that violated the Trading Charter or Knowledge Base
   - Flag late entries, oversized positions, reactive trades, chasing, etc.

3. **Trade-by-Trade Coaching**
   - Give feedback on setup, entry quality, exit timing, and size
   - Note risk/reward, market alignment, and emotional cues

4. **Coaching Summary**
   - What worked well today?
   - What must be fixed or avoided going forward?
   - What is improving or showing progress?

5. **Flag New Insights**
   - Generate 1 insight to feed into `update-trading-behaviors-kb`
   - Format it as a clear bullet point with appropriate category

---

### OUTPUT FORMAT
**DAILY REVIEW — [YYYY-MM-DD]**

**1. Plan vs Execution:**  
- [Which trades followed the plan? Which didn’t?]  
- [Any surprise trades or deviations?]  

**2. Blind Spot Summary:**  
- [List any charter or behavioral KB violations]  

**3. Trade Coaching (by ticker):**  
- **[TICKER]**: [Entry, exit, sizing, timing, what was done well, what to fix]

**4. Coaching Summary:**  
- What I did well: [ ]  
- What I must fix: [ ]  
- What’s improving: [ ]  

**5. Knowledge Base Insight Suggestion:**  
CATEGORY: [Category]  
ENTRY: - [Insight to feed into update-trading-behaviors-kb.md]