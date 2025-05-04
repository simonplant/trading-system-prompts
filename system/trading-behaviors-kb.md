---
title: Trading Behaviors Knowledge Base
description: Curated list of trading behaviors, blindspots, and improvement heuristics based on real-world performance reviews
author: Simon Plant
version: 1.0
last_updated: 2025-05-03
category: system
usage: Review daily; update after each postmarket debrief or behavioral breakdown
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
- **Fix:** 10:30 AM PT bias reset; no >1x SPX size if price is above all MAs + VWAP

### 3. Late Entries / Gave Up Winners
- Missed exits on ITM positions; chased extended names
- **Fix:** Trim ½ at +20–30%, trail the rest. Stop if price loses VWAP or entry

### 4. Too Many Names with No Edge
- Traded tickers outside of focus list; $1K+ lost in unplanned trades
- **Fix:** 3-name max; trade only setups with pattern + level + trigger + exit plan

### 5. Position Size Misaligned to Edge
- Max size on low-conviction ideas (TSLA 295C, SPX 5575P)
- **Fix:** Pre-label each trade by tier:
  - Tier 1: High-conviction = up to 10 contracts
  - Tier 2: Structured = 5 contracts
  - Tier 3: Lotto = 3 contracts / $500 max

### 6. Lack of Exit Discipline
- Held losers hoping for reversal; scalped winners too fast
- **Fix:** Use OCO brackets. Auto-exit:
  - VWAP loss (longs)
  - Structure break or resistance reclaim (shorts)

### 7. Mixed Bias with No Confirmation
- Traded both calls/puts on same names without clarity
- **Fix:** One directional bias per session unless level reclaim/failure triggers a shift

### 8. Emotional Averaging + FOMO
- Averaged into losers and re-traded failed levels
- **Fix:** Stop trading if chasing. Apply emotional state scoring (post-trade tag)

### 9. IC Execution Drift
- Copied sentiment, not structure: mismatched entry, expiration, or size
- **Fix:** Mirror full structure:
  - Expiration
  - Entry zone
  - Trim logic
  - Build daily IC “mirror log”

---

## II. OPERATING RULES

### Trade Entry Filters
- Must meet 4 filters: **Setup + Trigger + Volume + Risk**
- No trades outside premarket focus list
- No new entries after 1:00 PM PT unless major catalyst hits

### Tiered Sizing Discipline
- **Tier 1**: Max 10 contracts → Confirmed setup + catalyst
- **Tier 2**: Max 5 contracts → Structured but lower conviction
- **Tier 3**: Max 3 contracts / $500 → Lottos or scalps only

### Active Risk Management
- Max 2 open positions at a time
- Weekly loss limit: $2,000
- Use next-week expiry unless trading confirmed real-time breakout/fail

### Daily Execution Checklist
- Preplan 3–5 best ideas before open
- Set alerts + stage contracts in ThinkOrSwim
- Log all trades:
  - Setup, rationale, size, stop, emotional rating
- Score: Setup (A/B/C), Execution (A/B/C)

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