---
title: Daily Performance Debrief  
description: End-of-day prompt to review trades, behavior, discipline, and outcomes  
tags: [postmarket, debrief, review, behavior]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.1  
category: postmarket  
usage: Run after trade log and Copilot debrief are complete. Produces a self-assessed scorecard and lesson summary. Consumes trade outcomes, execution quality, and behavior history.
status: active  
requires: [generate-daily-trade-log.md, trading-behaviors-kb.md]  
linked_outputs: [generate-kb-update.md, generate-daily-journal.md]  
input_format: markdown  
output_format: markdown  
ai_enabled: true
style:
  use_emojis: false
  text_decoration: false
---

## DAILY PERFORMANCE DEBRIEF — PROMPT

**When to Use:**  
Run at the end of the day, after completing `generate-daily-trade-log.md` and saving your log to `/logs/YYYY/YYYY-MM-DD.md`.

**Purpose:**  
- Evaluate trade execution quality against your plan and charter  
- Identify behavioral patterns or blindspots  
- Surface adjustments for sizing, selection, or process  
- Document any required updates to `trading-behaviors-kb.md`

---

## INPUTS

- Full daily trade log (structured via `trade-log-template.md`)  
- Trades executed and not taken  
- Capital outcome and streaks  
- Midday reset events (if any)  
- Moderator calls from DP and Mancini  
- Journal reflections and emotional patterns  

---

## DEBRIEF STRUCTURE

### 1. Execution Summary

- Number of trades taken  
- Percent aligned with Unified Trade Plan  
- Any deviation from levels, size, or trigger logic?  
- Most profitable trade vs. most damaging  
- Slippage, fill issues, or mismanagement?

---

### 2. Behavioral Review

- Were any behavioral flags noted in the log?  
- How well did you recognize and respond to risk patterns?  
- Did emotion (fear, greed, frustration) affect decisions?  
- Any mistakes repeated from prior sessions?

---

### 3. Midday Reset Event Review

- Were any resets triggered? [Yes / No]  
- What emotional or behavioral patterns led to the reset?  
- Did the action taken help stabilize decision quality?  
- Did the day improve or deteriorate after the reset?  
- Any insight that should be added to `trading-behaviors-kb.md`?

---

### 4. Plan Adherence & Adjustment

- Was conviction sizing applied correctly?  
- Did market regime affect your trade frequency or bias?  
- Were your tiering and exit rules respected?

---

### 5. Moderator Sync

- Which DP or Mancini trades did you align with?  
- Were any calls missed or misunderstood?  
- Did moderator sentiment align with your actions?  
- Any follow-through worth swinging?

---

### 6. Closing Actions

- Update KB if a new blindspot or pattern emerged  
- Flag any trades worth revisiting for deeper breakdown  
- Archive log to `/logs/YYYY/YYYY-MM-DD.md` if not already done  
- Rate the day overall [Excellent | Solid | Mixed | Poor]  
- Set 1 intention for tomorrow  

---