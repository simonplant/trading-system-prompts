---
title: Generate KB Update  
description: Creates a structured knowledge base update from trade flags, journal entries, or debrief insights  
tags: [postmarket, behavior, log]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.0  
category: postmarket  
usage: Run after daily trade log or journal review. Produces structured updates to the behavior knowledge base. Consumes patterns, triggers, and mitigation notes from the session.
status: stable  
requires: [daily-performance-debrief.md, trading-behaviors-kb.md]  
linked_outputs: [trading-behaviors-kb.md]  
input_format: markdown  
output_format: markdown  
ai_enabled: true  
---

## KNOWLEDGE BASE UPDATE — PROMPT

**Purpose:** Log all observed behavioral patterns or rule interactions that should influence future trading, coaching, or system rules.

---

### INPUT FIELDS
- **Date**: (YYYY-MM-DD)
- **Pattern Matches**: Which behavioral patterns were triggered today?
- **Rule Violations**: What rules from the SOP or Charter were broken?
- **Positive Tags**: What did I do well?
- **Negative Tags**: What drifted?
- **Root Cause Hypotheses**: Any drivers behind behavior?
- **Lessons or Adjustments Needed**

---

### OUTPUT STRUCTURE
```markdown
---
title: KB Update — YYYY-MM-DD
description: Summary of recurring behavioral notes and coaching patterns for the day  
tags: [behavior, kb, log]
author: Simon Plant
last_updated: YYYY-MM-DD
version: 1.0
category: log-template
status: draft
---

## Positive Tags
- ___
- ___

## Negative Patterns
- ___
- ___

## Rules Violated
- SOP: ___
- Charter: ___

## Observed Causes
- ___
- ___

## Adjustments
> “___”