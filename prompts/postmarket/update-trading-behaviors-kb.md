---
title: Update Trading Behaviors KB  
description: Review and update the behavioral knowledge base based on the day’s performance and patterns  
tags: [postmarket, behavioral]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.0  
category: postmarket  
usage: Run to capture new patterns, blindspots, and behavioral improvements into the KB  
status: stable  
requires: [daily-performance-debrief.md]  
linked_outputs: [trading-behaviors-kb.md]  
input_format: markdown  
output_format: markdown  
ai_enabled: true  
---

## KNOWLEDGE BASE UPDATE — PROMPT

**Purpose:**  
Capture one new behavioral pattern, blind spot, habit, or best practice observed in today's session and log it for future live trading reference. This becomes part of a persistent coaching KB used across prompts.

---

### INPUTS

- Describe the **new insight**:
  - A new habit, rule, mistake, trigger, emotional pattern, or best practice
- Determine:
  - Is this a **new** behavior or a **repeat** of an existing one?

---

### CATEGORIZE
Choose one:

- Behavioral Tendencies  
- Blind Spots & Mistakes  
- Setup Filters  
- Entry/Exit Disciplines  
- Intraday Mindset Flags  
- Best Practices & Lessons  

---

### OUTPUT FORMAT

CATEGORY: [Selected category]  
KNOWLEDGE BASE ENTRY:  
- [Write 1–2 clear, scannable bullet points optimized for live reference]

---

**Example:**

CATEGORY: Blind Spots & Mistakes  
KNOWLEDGE BASE ENTRY:  
- Do not short into support just because a name is red — wait for confirmation of breakdown + volume.

---

**Note:** Append this insight to `system/trading-behaviors-kb.md` and reference it in all intraday validation prompts.