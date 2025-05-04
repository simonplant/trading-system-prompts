---
title: Trade Idea Validator Prompt
description: Polymorphic real-time validation prompt for intraday trading decisions
tags: [intraday, trade-validation, decision-support]
author: Simon Plant
last_updated: 2025-05-03
version: 1.0
category: intraday
usage: Use to evaluate any active trade idea before entry. Run interactively in ChatGPT or equivalent assistant.
---

## TRADE IDEA VALIDATOR — PROMPT

**Purpose:**
This prompt provides real-time feedback and decision-making guidance on any intraday trade idea, whether planned, spontaneous, or sourced from a moderator. It integrates:
- Unified Trade Plan (structure + focus list)
- SPX levels + market structure
- Trading System Charter rules
- Behavioral Knowledge Base (blindspots, tendencies)
- Coaching insight

---

### INPUTS (REQUIRED)
Please provide the following in plain text:
- **Ticker**
- **Direction** (long/short)
- **Entry level(s)** + context (VWAP, MAs, reclaim/fail)
- **Trade type** (Big Idea, Cashflow, Lotto, FOMO, Urge, Moderator Callout)
- **Trigger & stop level(s)**
- **Time of day**
- **SPX posture** (trend, reclaim, fail, chop)
- **Plan status**: Is this in your Unified Trade Plan? If not, why are you considering it?
- **Any emotions or urgency present**

---

### INSTRUCTIONS TO AI

1. **Validate Technical Setup**
   - Does the trade align with a clean structural setup?
   - Are triggers and stops well-defined?
   - Is it early in the move or chasing?
   - Does the SPX context support the trade?

2. **Check Against Trade Plan + Charter**
   - Is this a Focus List ticker or explicitly planned setup?
   - Does it violate any Charter rules (e.g., chasing, late entries, shorting strength at support)?

3. **Check Against Behavioral Knowledge Base**
   - Does this trade match any known blindspots (e.g., momo short at support, sizing without confirmation)?
   - Highlight any mindset flags (FOMO, revenge, overconfidence).

4. **Decision Engine**
   Return one of:
   - **GO**: Valid setup. Risk-managed. In plan or structurally sound.
   - **WAIT**: Needs confirmation or better location.
   - **NO GO**: Violates process, structure, or psychology.

Include a brief rationale for your verdict.

5. **Coaching Layer (Optional)**
   If the trade is not ideal, suggest what a cleaner setup would look like, or how Simon should wait for a better entry.

---

### OUTPUT FORMAT
TRADE DECISION: [GO / WAIT / NO GO]

RATIONALE:
- [1–2 lines summarizing setup quality, plan alignment, SPX structure]
- [Highlight any blindspot or charter conflict]

SUGGESTED IMPROVEMENT:
- [How to improve setup or manage risk]

---

**Tip:** You can paste multiple trade ideas at once and receive structured analysis on each. Use this prompt inside intraday chat threads to gut-check setups before execution.