---
title: Moderator Position Tracker
description: Track and update moderator positions using relative size indicators
tags: [system, positions, tracking, analytics]
author: Simon Plant
created: 2025-05-07
version: 1.0
category: system
usage: Maintain accurate moderator position data across trading days
status: active
requires: [main-controller.md]
linked_outputs: [unified-trade-plan.md, execution-validator.md]
input_format: chat messages
output_format: structured position data
ai_enabled: true
---

# Moderator Position Tracker

## Purpose
Track moderator positions over time to provide critical context for trade plan generation and decision making. This addresses the core reality that your trading group is swing-oriented, not starting flat each day.

## Position Data Structure
```json
{
  "positions": [
    {
      "ticker": "TEM",
      "direction": "LONG",
      "implied_size": "CORE", 
      "moderators": ["Kira", "Rick", "DP"],
      "duration": "SWING",
      "conviction": "HIGH",
      "status": "ACTIVE",
      "entry_zone_type": "PULLBACK",
      "risk_bias": "LOWER",
      "moderator_divergence": false,
      "drift_warning": false,
      "activity": [
        {"action": "ADD", "size_signal": "INCREASING", "context": "pullback to support", "moderator": "Kira", "timestamp": "2025-05-06T09:30:00Z"},
        {"action": "TRIM", "size_signal": "PARTIAL", "context": "into strength", "moderator": "DP", "timestamp": "2025-05-06T14:15:00Z"},
        {"action": "ADD_BACK", "size_signal": "CORE", "context": "long-term thesis intact", "moderator": "Rick", "timestamp": "2025-05-06T15:30:00Z"}
      ],
      "position_metrics": {
        "significance_score": 85,
        "moderator_alignment": "HIGH",
        "management_activity": "ACTIVE",
        "conviction_trend": "INCREASING",
        "last_seen": "2025-05-06T16:30:00Z"
      },
      "position_source": ["DP_transcript", "Moderator_callout_log", "Manual_annotation"],
      "context": "Earnings beat; first-time raise. Long-term AI healthcare play.",
      "mirror_strategy": "Add on pullbacks to 49-50 zone; trim into strength above 55",
      "average_cost_range": "48.50-50.25",
      "current_risk_setup": "Support zone: 47.50, Stop: 46.75"
    }
  ],
  "last_updated": "2025-05-07T04:30:00Z"
}
```

## Position Classification System

### Relative Size Indicators
- **CORE**: Long-term position mentioned frequently with strong conviction
- **FULL**: Standard position with regular discussion
- **PARTIAL**: Position that has been significantly trimmed
- **STARTER**: New position established with caution
- **TRAILER**: Mostly exited position with small remainder

### Size Change Signals
- **INCREASING**: Multiple adds or emphasis on adding
- **HOLDING**: Steady position mentions without size changes
- **REDUCING**: Multiple trims mentioned
- **TRAILING**: Language indicating mostly exited

### Position Management Classification
1. **CORE_SWING**: Held by multiple moderators, active management, high conviction
2. **ACTIVE_TRADE**: Currently held, recent entries, medium-term holding
3. **MONITORING**: Recently exited but still watching for re-entry
4. **NEW_IDEA**: Not currently held by moderators

### Entry Zone Types
- **PULLBACK**: Entry on retracement to support
- **BREAKOUT**: Entry on move through resistance
- **VWAP_RECLAIM**: Entry on reclaim of VWAP
- **SCALP_BOUNCE**: Short-term bounce play

### Risk Bias Classification
- **LOWER**: Entry near support with immediate confirmation
- **EQUAL**: Balanced risk/reward scenario
- **HIGHER**: Entry with extended risk or unconfirmed setup

## Position Tracking Functionality

### Position Update Logic
1. **Message Parsing**
   - Parse moderator messages for position actions (ADD, TRIM, CLOSE)
   - Extract size indications and context
   - Update existing positions or create new entries

2. **Position Decay Logic**
   - Track days since last mention for each position
   - Apply decay rules from position-significance-score.yaml
   - Automatically downgrade positions with no recent mentions
   - Flag stale positions for review

3. **Drift Detection**
   - Monitor for divergence between moderators
   - Flag positions where moderators are showing opposite actions
   - Detect unusual changes in conviction or sentiment
   - Alert when position behavior deviates from historical patterns

4. **Size Classification Engine**
   - Process verbal cues for position sizing
   - Map size language to standardized indicators
   - Detect changes in size through sequential messages
   - Track relative position weight across moderator portfolio

5. **Source Provenance Tracking**
   - Record the origin of each position update
   - Track primary vs. secondary mentions
   - Log reliability metrics for each source
   - Assign confidence scores to position assessments

## Position Cache Management

```json
{
  "cache_parameters": {
    "max_age_days": 5,
    "refresh_frequency": "daily",
    "staleness_threshold_hours": 48,
    "truncation_threshold_entries": 1000
  },
  "decay_rules": {
    "1_day": { "significance_penalty": 0 },
    "2_days": { "significance_penalty": 5 },
    "3_days": { "significance_penalty": 10 },
    "4_days": { "significance_penalty": 15 },
    "5+_days": { "significance_penalty": 20, "auto_downgrade": true }
  }
}
```

The position state cache tracks:

1. Last mention timestamp for each position
2. Change velocity (frequency of updates)
3. Confidence consistency (fluctuations in conviction)
4. Size evolution (pattern of size changes)
5. Moderator alignment (consensus metrics)

## Integration with Trade Plan Generation

Position data directly informs the unified trade plan through:

1. Providing historical context for new ideas
2. Identifying active management of existing positions
3. Highlighting opportunities to align with moderator actions
4. Supplying risk context for decision-making
5. Detecting conflicting signals for risk management