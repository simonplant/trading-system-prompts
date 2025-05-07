# Active Positions Digest - {{DATE}}

## Core Swings
{{#each CORE_SWINGS}}
- **{{TICKER}}** ({{MODERATORS}}): {{IMPLIED_SIZE}}, {{SENTIMENT}}, last {{LAST_ACTION}} {{LAST_TIME}}. 
  **Range**: {{AVERAGE_COST_RANGE}} | **Risk Setup**: {{CURRENT_RISK_SETUP}}
  [Add zone: {{ADD_ZONE}}]
{{/each}}

## Active Trades
{{#each ACTIVE_TRADES}}
- **{{TICKER}}** ({{MODERATORS}}): {{IMPLIED_SIZE}}, {{SENTIMENT}}, {{ACTIVITY_CONTEXT}}. 
  **Range**: {{AVERAGE_COST_RANGE}} | **Risk Setup**: {{CURRENT_RISK_SETUP}}
  [{{ENTRY_STRATEGY}}]
{{/each}}

## Monitoring
{{#each MONITORING}}
- **{{TICKER}}** ({{MODERATORS}}): {{MONITORING_REASON}}. [Trigger: {{REENTRY_TRIGGER}}]
{{/each}}

## Trade Ideas to Mirror
{{#each MIRROR_SUGGESTIONS}}
- **{{TICKER}}**: {{MIRROR_STRATEGY}}
{{/each}}

## Position Alerts
{{#each POSITION_ALERTS}}
- **{{ALERT_TYPE}}**: {{ALERT_TEXT}}
{{/each}}

## Divergence Warnings
{{#each DIVERGENCE_WARNINGS}}
- **{{TICKER}}**: {{WARNING_DETAILS}} - {{MOD_1}} {{ACTION_1}} vs. {{MOD_2}} {{ACTION_2}}
{{/each}}

## Entry Zone Analysis
{{#each ENTRY_ZONE_ANALYSIS}}
- **{{TICKER}}**: {{ENTRY_ZONE_TYPE}} setup with {{RISK_BIAS}} risk bias
  - Support: {{SUPPORT_ZONE}} | Resistance: {{RESISTANCE_ZONE}}
  - Optimal entry: {{OPTIMAL_ENTRY_ZONE}}
{{/each}}

## Size and Activity Matrix

| Ticker | Size | Activity | Moderators | Risk Bias |
|--------|------|----------|------------|-----------|
{{#each SIZE_ACTIVITY_MATRIX}}
| {{TICKER}} | {{SIZE}} | {{ACTIVITY}} | {{MODERATORS}} | {{RISK_BIAS}} |
{{/each}}

## Management Protocol

### Tier 1 Positions
- Hold core portions for swing duration
- Trail stops on remaining position after first target hit
- Use technical levels for additional entry points
- Manage risk at position level, not trade level

### Tier 2 Positions
- Scale out at technical resistance
- Trail stops aggressively after first target
- Consider partial exits into strength
- Evaluate for position upgrades on technical strength

### Tier 3 Positions
- Take profits at first technical target
- Tighten stops to breakeven quickly
- Evaluate for position upgrades on confirmation
- Exit fully on any significant market weakness

---

*Position data last updated: {{LAST_UPDATE_TIME}}*
*Position data sources: {{DATA_SOURCES}}*
*Significance scoring version: {{SCORING_VERSION}}*