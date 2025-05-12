---
title: Trade Validation Copilot
description: Validate intraday trade ideas against plan, levels, and behavioral patterns
tags: [intraday, validation, execution]
author: Simon Plant
last_updated: 2025-05-10
version: 3.0
category: intraday
usage: Run before entering any trade to validate against plan, market conditions, and behavioral patterns. Produces GO/WAIT/NO GO assessment with detailed rationale.
status: active
requires: [system-parameters.json, trading-behaviors-kb.md, trade-data-schema.json]
linked_outputs: [copilot.md, midday-reset.md]
input_format: markdown
output_format: markdown
ai_enabled: true
schema_version: 2.0
style:
  use_emojis: false
  text_decoration: false
---

# TRADE VALIDATION COPILOT

## Purpose

Provide comprehensive validation of trade ideas against your daily trade plan, current market conditions, technical levels, and behavioral patterns. The copilot enforces trading discipline by issuing a clear GO/WAIT/NO GO assessment with detailed rationale.

---

## Validation Framework

This enhanced trade validator executes the following checks in sequence:

1. **Schema Validation**
   - Ensure trade idea has all required fields
   - Verify data types and enumerations
   - Check mathematical consistency of levels

2. **Plan Alignment**
   - Verify trade matches unified plan priorities
   - Check consistency with market bias
   - Confirm technical level alignment

3. **Market Condition Assessment**
   - Evaluate current market regime
   - Check for counter-trend risk
   - Verify trade timing with market phase

4. **Technical Analysis**
   - Validate entry against key levels
   - Check target feasibility
   - Verify stop location against structure

5. **Risk Management**
   - Apply position sizing rules
   - Check daily risk exposure
   - Verify risk/reward parameters

6. **Behavioral Pattern Detection**
   - Check for historical behavior flags
   - Identify potential biases
   - Screen for execution blindspots

---

## Input Format

Validate a trade idea with the following format:

```
Ticker: [symbol]
Direction: [LONG|SHORT]
Entry: [price level or condition]
Target: [price level(s)]
Stop: [price level]
Type: [CASHFLOW|SWING|LONGTERM|LOTTO]
Confidence: [BIG_IDEA|HIGH|MEDIUM|LOW]
Context: [brief description of the setup]
```

Additional optional fields:
- `Position Size`: [FULL_DOUBLE|FULL|HALF|QUARTER|SMALL|TINY]
- `Tier`: [1|2|3]
- `Catalyst`: [event or news]
- `Timing`: [specific time condition]

---

## Enhanced Validation Logic

### Plan Alignment Check

The validator compares the trade idea against the current unified trade plan, checking:

1. **Direction Consistency**: Trade direction matches market bias and sector trend
2. **Level Alignment**: Entry, target and stop align with key levels in plan
3. **Sector Rotation**: Trade sector matches current focus sectors
4. **Catalyst Alignment**: Trade catalyst exists and aligns with expected events
5. **Time Window**: Execution time matches optimal trading windows

### Technical Validation

The validator now performs enhanced technical validation:

1. **Level Confluence**: Checks for multiple technical factors at key levels
2. **Structure Validation**: Verifies entries align with chart structure
3. **Volume Profile**: Assesses volume conditions at entry level
4. **Moving Average Relationship**: Checks price relative to key moving averages
5. **Level Precision**: Validates precise entry vs. range entries

### Behavioral Pattern Recognition

The validator checks for behavioral patterns from your knowledge base:

1. **Pattern Detection**: Identifies patterns matching past behavior flags
2. **Ticker-Specific History**: Checks historical performance with this ticker
3. **Timing Patterns**: Analyzes time-of-day patterns in trading behavior
4. **Sizing Discipline**: Verifies position size against rules and recent performance
5. **Emotional Indicators**: Detects potential emotional biases in trade rationale

---

## Output Format

The validator returns a verdict with detailed rationale:

### GO Assessment
```
VERDICT: GO ✅

TRADE SUMMARY:
• [Ticker] [LONG|SHORT] @ [Entry]
• Target: [Price] | Stop: [Price] | R:R [ratio]
• Type: [CASHFLOW|SWING|LONGTERM|LOTTO]
• Confidence: [LEVEL] | Size: [SIZE]

VALIDATION CHECKLIST:
✅ PLAN ALIGNMENT: [specific alignment details]
✅ MARKET CONDITIONS: [supportive conditions]
✅ TECHNICAL STRUCTURE: [confirming factors]
✅ RISK MANAGEMENT: [within parameters]
✅ BEHAVIORAL CHECK: [no flags detected]

EXECUTION NOTES:
• [specific execution guidance]
• [optimal entry technique]
• [recommended order type]
• [time considerations]

MANAGEMENT PLAN:
• First target (T1): [action at T1]
• Second target (T2): [action at T2]
• Runner management: [trailing approach]
• Mental stop update: [monitoring parameters]
```

### WAIT Assessment
```
VERDICT: WAIT ⏳

TRADE SUMMARY:
• [Ticker] [LONG|SHORT] @ [Entry]
• Target: [Price] | Stop: [Price] | R:R [ratio]
• Type: [CASHFLOW|SWING|LONGTERM|LOTTO]
• Confidence: [LEVEL] | Size: [SIZE]

VALIDATION CHECKLIST:
✅ [passing checks]
⚠️ [specific concerns]: [details]
⚠️ [specific concerns]: [details]

WAIT CRITERIA:
• Require: [specific condition to satisfy]
• Confirm: [verification needed]
• Re-check: [parameter to reassess]

IMPROVEMENT SUGGESTIONS:
• [specific adjustment to parameters]
• [alternative approach]
• [risk mitigation technique]

RESET PROTOCOL:
• [behavioral reset recommendation]
• [focus technique]
```

### NO GO Assessment
```
VERDICT: NO GO ❌

TRADE SUMMARY:
• [Ticker] [LONG|SHORT] @ [Entry]
• Target: [Price] | Stop: [Price] | R:R [ratio]
• Type: [CASHFLOW|SWING|LONGTERM|LOTTO]
• Confidence: [LEVEL] | Size: [SIZE]

VALIDATION FAILURE:
❌ [major issue]: [critical details]
❌ [major issue]: [critical details]

RISK ASSESSMENT:
• [specific risk calculation]
• [exposure issue]
• [technical warning]

BEHAVIORAL FLAGS:
• [behavioral pattern identified]
• [historical context]
• [suggested mitigation]

ALTERNATIVE SETUPS:
• [better trade in same direction]
• [alternative with higher probability]
```

---

## Implementation Details

### JavaScript Integration

The trade validator now integrates with JavaScript utilities:

```javascript
// Trade validation implementation
function validateTradeIdea(tradeIdea, tradePlan, behaviorKB) {
  // Schema validation
  const { validateSchema } = require('./js/schema-validator');
  const validationResult = validateSchema(tradeIdea, 'TRADE_IDEA');
  
  if (!validationResult.valid) {
    return {
      decision: 'NO GO',
      reason: `Schema validation failure: ${validationResult.errors.join(', ')}`,
      details: validationResult.errors
    };
  }
  
  // Plan alignment check
  const { checkPlanAlignment } = require('./js/validation-utility');
  const alignmentCheck = checkPlanAlignment(tradeIdea, tradePlan);
  
  if (!alignmentCheck.aligned) {
    return {
      decision: 'WAIT',
      reason: `Trade not aligned with plan: ${alignmentCheck.reason}`,
      details: alignmentCheck.details
    };
  }
  
  // Behavioral check
  const { validateBehavioralPatterns } = require('./js/json-validation-utility');
  const behaviorCheck = validateBehavioralPatterns(tradeIdea, behaviorKB);
  
  if (behaviorCheck.flagged) {
    return {
      decision: 'WAIT',
      reason: `Potential behavioral issue detected: ${behaviorCheck.flags[0].flag}`,
      details: behaviorCheck.flags[0].context,
      reset: behaviorCheck.flags[0].reset_type
    };
  }
  
  // Risk management check
  const { getParameter, getPositionSize } = require('./js/parameter-loader');
  const maxPositionSize = getParameter('SYSTEM_THRESHOLDS.MAX_POSITION_SIZE');
  const recommendedSize = getPositionSize(tradeIdea.confidence, tradeIdea.duration);
  
  // All checks passed
  return {
    decision: 'GO',
    reason: 'Trade aligned with plan and passes all validation checks',
    details: {
      recommended_size: recommendedSize,
      risk_reward: calculateRiskReward(tradeIdea),
      execution_notes: generateExecutionNotes(tradeIdea)
    }
  };
}
```

### Behavioral Integration

The validator references the trading behaviors knowledge base to identify and prevent behavioral patterns:

```javascript
function checkBehavioralPatterns(tradeIdea, behaviorKB) {
  const flags = [];
  
  // Extract behavioral patterns from KB
  const patterns = extractPatternsFromKB(behaviorKB);
  
  // Check for ticker-specific patterns
  const tickerPatterns = patterns.filter(p => 
    p.tickers && p.tickers.includes(tradeIdea.ticker)
  );
  
  if (tickerPatterns.length > 0) {
    flags.push({
      type: 'ticker_specific',
      pattern: tickerPatterns[0].name,
      description: tickerPatterns[0].description,
      mitigation: tickerPatterns[0].fix
    });
  }
  
  // Check for time-of-day patterns
  const currentHour = new Date().getHours();
  const timePatterns = patterns.filter(p => 
    p.time_windows && p.time_windows.some(w => isInTimeWindow(currentHour, w))
  );
  
  if (timePatterns.length > 0) {
    flags.push({
      type: 'time_based',
      pattern: timePatterns[0].name,
      description: timePatterns[0].description,
      mitigation: timePatterns[0].fix
    });
  }
  
  // More behavioral checks...
  
  return flags;
}
```

---

## Usage Examples

### Example 1: Validating a Plan-Aligned Trade

```
Ticker: SPY
Direction: LONG
Entry: 476.50
Target: 480.00, 485.00
Stop: 474.00
Type: CASHFLOW
Confidence: HIGH
Context: Bouncing off 21 EMA with increasing volume and broader market strength
```

### Example 2: Checking a Trade with Behavioral Risk

```
Ticker: TSLA
Direction: LONG
Entry: 180.50 (extended from VWAP)
Target: 185.00
Stop: 178.00
Type: CASHFLOW
Confidence: MEDIUM
Context: Breaking out of morning range, but already up 2% from LOD
```

### Example 3: Testing a Rule-Breaking Trade

```
Ticker: SPX
Direction: SHORT
Entry: 4725
Target: 4700, 4675
Stop: 4750
Type: LOTTO
Confidence: LOW
Context: Contrarian fade of uptrend, feeling market is overextended
```

---

## Reset Protocols

For trades that trigger behavioral flags, the validator will recommend one of these reset protocols:

1. **Midday Reset**: Pause, reassess market conditions, and reset focus
2. **Copilot Reentry**: Restart trade flow with reduced size or tighter parameters
3. **Journal Review**: Reflect on specific pattern and review previous occurrences
4. **SOP Realignment**: Re-read trading charter and principles before continuing
5. **Full Stop**: Cease trading for the day (for severe violations)

---

## Integration Points

| Component | Integration |
|-----------|-------------|
| `main-controller.md` | Entry point for all validations |
| `js/schema-validator.js` | Data structure validation |
| `js/json-validation-utility.js` | Domain-specific validation |
| `js/parameter-loader.js` | System parameter access |
| `trading-behaviors-kb.md` | Behavioral pattern reference |
| `midday-reset.md` | Recovery protocol for flags |

---

## CHANGELOG

- v3.0 (2025-05-10): Added JavaScript utility integration, enhanced behavioral pattern detection, improved validation framework
- v2.2 (2025-05-05): Added structured output formats for GO/WAIT/NO GO assessments
- v2.1 (2025-04-15): Integrated with trading behaviors knowledge base
- v2.0 (2025-04-01): Expanded technical validation logic
- v1.0 (2025-03-15): Initial implementation