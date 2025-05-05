---
title: Trading Behaviors Knowledge Base  
description: Curated list of trading behaviors, blindspots, and improvement heuristics based on real-world performance reviews  
tags: [system, behavior, discipline]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.1  
category: system  
usage: Run when logging behavior issues, reviewing patterns, or updating reset protocol  
status: stable  
requires: []  
linked_outputs: [midday-reset.md, copilot.md, update-trading-behaviors-kb.md]  
input_format: markdown  
output_format: markdown  
ai_enabled: true  
---

# TRADING BEHAVIORS KNOWLEDGE BASE — SIMON PLANT

## I. BLINDSPOTS & BEHAVIORAL PATTERNS

### 1. Overtrading Lotto Contracts in Low Vol Environments
- Frequent use of OTM 0DTE contracts late in the day
- Lack of confirmation; hope-based trades on weak tape
- **Fix:** No new OTM lotto trades after 11:30 AM PT unless news/catalyst or breakout with volume

### 2. Oversized SPX Puts with No Tape Support
- Held far OTM puts against rising VWAP/EMA stack
- Bias override: traded market fall narrative without confirmation
- **Fix:** 10:30 AM PT bias reset; no Tier 1 SPX size if price is above all MAs + VWAP

### 3. Late Entries / Gave Up Winners
- Missed exits on ITM positions; chased extended names
- **Fix:** Trim ½ at +20–30%, trail remainder. Exit if price loses VWAP or structure

### 4. Too Many Names with No Edge
- Traded outside of focus list; multiple losses from impulsive exploration
- **Fix:** 3-name max. Require pattern + level + trigger + exit plan

### 5. Position Size Misaligned to Edge
- Max size deployed on weak setups
- **Fix:** Pre-label by tier using definitions from `trading-capital-profile.md`:
  - Tier 1 = high-conviction core
  - Tier 2 = structured but moderate edge
  - Tier 3 = lottos or low-probability setups only

### 6. Lack of Exit Discipline
- Held losers too long; scalped winners too early
- **Fix:** Use OCO brackets. Exit at VWAP loss (long) or structure reclaim (short)

### 7. Mixed Bias with No Confirmation
- Flipped bias mid-trade without structural triggers
- **Fix:** Stick to one directional bias per session unless clear reclaim/failure occurs

### 8. Emotional Averaging + FOMO
- Averaged into losers and re-traded failed levels
- **Fix:** Pause if chasing. Trigger midday reset if loss exceeds `daily_loss_soft_dollars` in `trading-capital-profile.md`

### 9. IC Execution Drift
- Followed sentiment, not structure: mismatched strike, size, expiry
- **Fix:** Mirror full IC setup:
  - Entry zone
  - Expiration
  - Trim logic
  - Exit path

### 10. Inner Circle Signal Alignment
- Correctly aligned on conviction trades (e.g. META)
- Avoided mixed signals (e.g. NFLX: DP trimming vs Kira shorting)
- **Fix:** Require at least 2 IC mods aligned before taking position

### 11. Option Pricing & Structure Assessment
- Entered trades with poor spreads or inflated premiums
- **Fix:** Review spread width and chain structure before entering

---

## II. OPERATING RULES

### Trade Entry Filters
- Must meet 4 filters: Setup + Trigger + Volume + Defined Risk
- No trades outside premarket plan
- No new entries after 1:00 PM PT unless triggered by macro/catalyst

### Tiered Sizing Discipline
- **Tier 1**: Defined in `trading-capital-profile.md`  
- **Tier 2**: Defined in `trading-capital-profile.md`  
- **Tier 3**: Max size defined in `max_options_trade_dollars` (see profile)

### Active Risk Management
- Max 2 concurrent positions  
- Weekly loss limit: reference `daily_loss_soft_dollars`  
- Auto-disable entry if drawdown exceeds `daily_loss_hard_dollars`

---

## III. MINDSET UPGRADES

- Structure > Emotion  
- Confirmation > Prediction  
- Capital is Oxygen — preserve it  
- Trade Reaction, Not Forecast  
- Be the most disciplined trader in the room  

---

## IV. BUILDING SYSTEM TOOLS (TO DO)

- [ ] “Friday Lotto Rules” checklist  
- [ ] IC Mirror Log Template  
- [ ] Trade Commission Tracker  
- [ ] Integrate with daily debrief + SOP flow  