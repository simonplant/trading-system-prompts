# Trade Plan Decision Log for {{DATE}}

## Summary
This log records all classification, inclusion, and priority decisions made during today's trade plan generation.

## DP Analyzer Decisions

### Primary Emphasis Detection
{{#each PRIMARY_EMPHASIS_MATCHES}}
- **{{TICKER}}**: Matched "{{PATTERN}}" → {{CLASSIFICATION}}
  - **Source Text**: "{{SOURCE_TEXT}}"
  - **Confidence**: {{CONFIDENCE}}%
  - **Evidence**: {{EVIDENCE_SUMMARY}}
{{/each}}

### Secondary Emphasis Detection
{{#each SECONDARY_EMPHASIS_MATCHES}}
- **{{TICKER}}**: Matched "{{PATTERN}}" → {{CLASSIFICATION}}
  - **Source Text**: "{{SOURCE_TEXT}}"
  - **Confidence**: {{CONFIDENCE}}%
  - **Evidence**: {{EVIDENCE_SUMMARY}}
{{/each}}

### Tempering Signals
{{#each TEMPERING_SIGNALS}}
- **{{TICKER}}**: Matched "{{PATTERN}}" → {{CLASSIFICATION}}
  - **Source Text**: "{{SOURCE_TEXT}}"
  - **Confidence**: {{CONFIDENCE}}%
  - **Evidence**: {{EVIDENCE_SUMMARY}}
{{/each}}

### Duration Classification
{{#each DURATION_CLASSIFICATION}}
- **{{TICKER}}**: Classified as {{DURATION}} based on "{{PATTERN}}"
  - **Source Text**: "{{SOURCE_TEXT}}"
  - **Confidence**: {{CONFIDENCE}}%
{{/each}}

### Position Context Integration
{{#each POSITION_CONTEXT}}
- **{{TICKER}}**: {{POSITION_STATUS}} position held by {{MODERATORS}}
  - **Current Size**: {{IMPLIED_SIZE}}
  - **Size Signal**: {{SIZE_SIGNAL}}
  - **Last Action**: {{LAST_ACTION}} by {{LAST_MODERATOR}} at {{LAST_TIME}}
  - **Context Applied**: {{CONTEXT_APPLIED}}
{{/each}}

### Exclusion Decisions
{{#each EXCLUSIONS}}
- **{{TICKER}}**: Excluded from analysis
  - **Reason**: {{REASON}}
  - **Source Text**: "{{SOURCE_TEXT}}"
{{/each}}

## Unified Plan Generator Decisions

### Priority Tier Assignment
{{#each PRIORITY_TIER_ASSIGNMENTS}}
- **{{TICKER}}**: Assigned to Tier {{TIER}}
  - **DP Score**: {{DP_SCORE}} ({{DP_CONVICTION}} conviction, {{DP_CONTEXT}})
  - **Position Context**: {{POSITION_TYPE}} ({{POSITION_DETAILS}})
  - **Technical Alignment**: {{TECHNICAL_ALIGNMENT}}
  - **Combined Score**: {{COMBINED_SCORE}} ({{SCORE_CALCULATION}})
  - **Tiebreakers Applied**: {{TIEBREAKERS}}
{{/each}}

### Mirror Strategy Generation
{{#each MIRROR_STRATEGIES}}
- **{{TICKER}}**: {{MIRROR_STRATEGY}}
  - **Position Status**: {{POSITION_STATUS}}
  - **Moderator Activity**: {{MODERATOR_ACTIVITY}}
  - **Risk Bias**: {{RISK_BIAS}}
  - **Divergence Detected**: {{DIVERGENCE}}
  - **Strategy Rationale**: {{STRATEGY_RATIONALE}}
{{/each}}

### Conflict Resolution
{{#each CONFLICTS}}
- **{{TICKER}}**: Conflict between {{SOURCE_1}} and {{SOURCE_2}}
  - **Conflict Type**: {{CONFLICT_TYPE}}
  - **Resolution**: {{RESOLUTION}}
  - **Rationale**: {{RATIONALE}}
{{/each}}

### ES/SPX Level Conversion
- **ES to SPX Conversion Factor**: {{ES_TO_SPX_CONVERSION}}
- **Levels Converted**:
{{#each CONVERTED_LEVELS}}
  - ES {{ES_LEVEL}} → SPX {{SPX_LEVEL}} ({{CONTEXT}})
{{/each}}

## Position Tracking Decisions

### Position Updates
{{#each POSITION_UPDATES}}
- **{{TICKER}}**: {{UPDATE_TYPE}}
  - **Previous Status**: {{PREVIOUS_STATUS}}
  - **New Status**: {{NEW_STATUS}}
  - **Reason**: {{REASON}}
  - **Source**: {{SOURCE}}
  - **Significance Score**: {{SIGNIFICANCE_SCORE}} ({{SCORE_CHANGE}})
{{/each}}

### Drift Warnings
{{#each DRIFT_WARNINGS}}
- **{{TICKER}}**: Drift warning generated
  - **Type**: {{WARNING_TYPE}}
  - **Details**: {{WARNING_DETAILS}}
  - **Recommended Action**: {{RECOMMENDED_ACTION}}
{{/each}}

### Divergence Detection
{{#each DIVERGENCE_DETECTIONS}}
- **{{TICKER}}**: Moderator divergence detected
  - **Conflicting Actions**: {{MOD_1}} {{ACTION_1}} vs {{MOD_2}} {{ACTION_2}}
  - **Severity**: {{SEVERITY}}
  - **Resolution**: {{RESOLUTION}}
  - **Impact on Trade Plan**: {{IMPACT}}
{{/each}}

## Final Decisions

### Inclusion/Exclusion Summary
- **Total Trade Ideas Analyzed**: {{TOTAL_IDEAS}}
- **Included in Trade Plan**: {{INCLUDED_IDEAS}}
- **Excluded from Trade Plan**: {{EXCLUDED_IDEAS}}
- **Tier 1 Ideas**: {{TIER_1_COUNT}}
- **Tier 2 Ideas**: {{TIER_2_COUNT}}
- **Tier 3 Ideas**: {{TIER_3_COUNT}}
- **Tier 4 Ideas**: {{TIER_4_COUNT}}

### Critical Decision Points
{{#each CRITICAL_DECISIONS}}
- **{{DECISION_POINT}}**: {{DECISION_MADE}}
  - **Alternatives Considered**: {{ALTERNATIVES}}
  - **Deciding Factors**: {{DECIDING_FACTORS}}
  - **Impact**: {{IMPACT}}
{{/each}}

## System Parameters
- **Logging Level**: {{LOGGING_LEVEL}}
- **System Parameters Version**: {{SYSTEM_PARAMETERS_VERSION}}
- **DP Analyzer Version**: {{DP_ANALYZER_VERSION}}
- **Position Tracker Version**: {{POSITION_TRACKER_VERSION}}
- **Unified Plan Generator Version**: {{UNIFIED_PLAN_GENERATOR_VERSION}}

---

*Generated at {{TIMESTAMP}} | Log ID: {{LOG_ID}}*