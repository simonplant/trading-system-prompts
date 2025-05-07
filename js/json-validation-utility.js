/**
 * js/json-validation-utility.js
 * 
 * Enhanced JSON validation utility with domain-specific trading validation rules
 * 
 * @version 1.0
 * @author Trading System
 * @last_updated 2025-05-10
 */

const { validateSchema } = require('./schema-validator');
const { getParameter } = require('./parameter-loader');
const { resolvePath } = require('./path-resolver');

/**
 * Comprehensive validation for trade data
 * 
 * @param {object} tradeData - The trade data to validate
 * @param {string} source - Source of the data ('dp' or 'mancini')
 * @returns {object} - Validation result with errors if any
 */
function validateTradeData(tradeData, source) {
  // Initial schema validation
  const schemaResult = validateSchema(tradeData, source.toUpperCase());
  if (!schemaResult.valid) {
    return {
      valid: false,
      errors: schemaResult.errors,
      source: 'schema_validation'
    };
  }
  
  // Validate trade ideas
  const tradeErrors = [];
  
  if (tradeData.TRADE_DATA && Array.isArray(tradeData.TRADE_DATA)) {
    tradeData.TRADE_DATA.forEach((trade, index) => {
      // Check level consistency
      const levelErrors = validateLevelConsistency(trade, index);
      if (levelErrors.length > 0) {
        tradeErrors.push(...levelErrors);
      }
      
      // Check risk/reward calculation
      const rrErrors = validateRiskReward(trade, index);
      if (rrErrors.length > 0) {
        tradeErrors.push(...rrErrors);
      }
      
      // Check position sizing alignment
      const sizingErrors = validatePositionSizing(trade, index);
      if (sizingErrors.length > 0) {
        tradeErrors.push(...sizingErrors);
      }
    });
  }
  
  // Validate market bias
  const biasErrors = validateMarketBias(tradeData);
  
  // Combine all errors
  const allErrors = [...tradeErrors, ...biasErrors];
  
  if (allErrors.length > 0) {
    return {
      valid: false,
      errors: allErrors,
      source: 'domain_validation'
    };
  }
  
  return {
    valid: true,
    message: `Valid ${source.toUpperCase()} trade data`
  };
}

/**
 * Validate price level consistency based on trade direction
 * 
 * @param {object} trade - The trade to validate
 * @param {number} index - Index of the trade in the array
 * @returns {string[]} - Array of error messages
 */
function validateLevelConsistency(trade, index) {
  const errors = [];
  
  if (!trade.levels) {
    errors.push(`TRADE_DATA[${index}]: Missing levels object`);
    return errors;
  }
  
  const { direction, levels } = trade;
  
  // Skip validation if essential components are missing
  if (!direction || !levels.entry || !levels.target || !levels.stop) {
    return errors;
  }
  
  // Handle array of targets
  const targets = Array.isArray(levels.target) ? levels.target : [levels.target];
  
  // Convert any string values to numbers if possible
  const entry = parseNumber(levels.entry);
  const stop = parseNumber(levels.stop);
  const numericTargets = targets.map(parseNumber).filter(t => !isNaN(t));
  
  // Skip validation if we couldn't parse the numbers
  if (isNaN(entry) || isNaN(stop) || numericTargets.length === 0) {
    return errors;
  }
  
  // Validate based on direction
  if (direction === 'LONG') {
    // For LONG trades: entry < targets and stop < entry
    if (numericTargets.some(target => entry >= target)) {
      errors.push(`TRADE_DATA[${index}]: Invalid LONG trade - entry (${entry}) must be lower than all targets`);
    }
    
    if (stop >= entry) {
      errors.push(`TRADE_DATA[${index}]: Invalid LONG trade - stop (${stop}) must be lower than entry (${entry})`);
    }
  } else if (direction === 'SHORT') {
    // For SHORT trades: entry > targets and stop > entry
    if (numericTargets.some(target => entry <= target)) {
      errors.push(`TRADE_DATA[${index}]: Invalid SHORT trade - entry (${entry}) must be higher than all targets`);
    }
    
    if (stop <= entry) {
      errors.push(`TRADE_DATA[${index}]: Invalid SHORT trade - stop (${stop}) must be higher than entry (${entry})`);
    }
  }
  
  // Validate target sequence
  if (numericTargets.length > 1) {
    // Check if targets are in ascending or descending order based on direction
    const isSorted = direction === 'LONG' 
      ? isSortedAscending(numericTargets)
      : isSortedDescending(numericTargets);
      
    if (!isSorted) {
      errors.push(`TRADE_DATA[${index}]: Targets are not in the correct sequence for ${direction} trade`);
    }
  }
  
  return errors;
}

/**
 * Validate risk/reward calculation
 * 
 * @param {object} trade - The trade to validate
 * @param {number} index - Index of the trade in the array
 * @returns {string[]} - Array of error messages
 */
function validateRiskReward(trade, index) {
  const errors = [];
  
  // Skip validation if risk_reward is not provided
  if (!trade.risk_reward || !trade.risk_reward.ratio) {
    return errors;
  }
  
  const { direction, levels, risk_reward } = trade;
  
  // Skip validation if essential components are missing
  if (!direction || !levels || !levels.entry || !levels.target || !levels.stop) {
    return errors;
  }
  
  // Convert any string values to numbers if possible
  const entry = parseNumber(levels.entry);
  const stop = parseNumber(levels.stop);
  
  // For multiple targets, use the first one for validation
  const target = parseNumber(Array.isArray(levels.target) ? levels.target[0] : levels.target);
  
  // Skip validation if we couldn't parse the numbers
  if (isNaN(entry) || isNaN(stop) || isNaN(target)) {
    return errors;
  }
  
  // Calculate risk and reward
  let risk, reward;
  
  if (direction === 'LONG') {
    risk = Math.abs(entry - stop);
    reward = Math.abs(target - entry);
  } else { // SHORT
    risk = Math.abs(stop - entry);
    reward = Math.abs(entry - target);
  }
  
  // Calculate risk/reward ratio
  const calculatedRatio = risk > 0 ? (reward / risk) : 0;
  
  // Compare with the provided ratio (allow 10% tolerance)
  const tolerance = 0.1;
  const difference = Math.abs(calculatedRatio - risk_reward.ratio);
  
  if (difference > tolerance * Math.max(calculatedRatio, risk_reward.ratio)) {
    errors.push(
      `TRADE_DATA[${index}]: Risk/reward ratio (${risk_reward.ratio}) doesn't match calculated value (${calculatedRatio.toFixed(2)})`
    );
  }
  
  return errors;
}

/**
 * Validate position sizing based on confidence and duration
 * 
 * @param {object} trade - The trade to validate
 * @param {number} index - Index of the trade in the array
 * @returns {string[]} - Array of error messages
 */
function validatePositionSizing(trade, index) {
  const errors = [];
  
  // Skip validation if essential components are missing
  if (!trade.confidence || !trade.duration || !trade.position_size) {
    return errors;
  }
  
  const { confidence, duration, position_size } = trade;
  
  // Get position sizing matrix from parameters
  const sizingMatrix = getParameter('POSITION_SIZE_MATRIX', {});
  
  // Skip validation if matrix is not available
  if (!sizingMatrix || Object.keys(sizingMatrix).length === 0) {
    return errors;
  }
  
  // Check if confidence exists in matrix
  if (!sizingMatrix[confidence]) {
    errors.push(`TRADE_DATA[${index}]: Unknown confidence level "${confidence}"`);
    return errors;
  }
  
  // Check if duration exists for this confidence
  if (!sizingMatrix[confidence][duration]) {
    errors.push(`TRADE_DATA[${index}]: No sizing rule for duration "${duration}" with confidence "${confidence}"`);
    return errors;
  }
  
  // Compare with the expected position size
  const expectedSize = sizingMatrix[confidence][duration];
  
  if (position_size !== expectedSize) {
    errors.push(
      `TRADE_DATA[${index}]: Position size "${position_size}" doesn't match expected "${expectedSize}" for ${confidence}/${duration}`
    );
  }
  
  return errors;
}

/**
 * Validate market bias consistency
 * 
 * @param {object} tradeData - The trade data to validate
 * @returns {string[]} - Array of error messages
 */
function validateMarketBias(tradeData) {
  const errors = [];
  
  // Skip validation if essential components are missing
  if (!tradeData.MARKET_BIAS || !tradeData.MARKET_BIAS.overall || !tradeData.TRADE_DATA) {
    return errors;
  }
  
  const { overall } = tradeData.MARKET_BIAS;
  const trades = tradeData.TRADE_DATA;
  
  // Count trades by direction
  const longCount = trades.filter(t => t.direction === 'LONG').length;
  const shortCount = trades.filter(t => t.direction === 'SHORT').length;
  
  // Check if trade directions align with overall bias
  if (overall === 'BULLISH' && shortCount > longCount) {
    errors.push(`Market bias is BULLISH but there are more SHORT trades (${shortCount}) than LONG trades (${longCount})`);
  } else if (overall === 'BEARISH' && longCount > shortCount) {
    errors.push(`Market bias is BEARISH but there are more LONG trades (${longCount}) than SHORT trades (${shortCount})`);
  }
  
  return errors;
}

/**
 * Validate a trade idea against behavioral patterns
 * 
 * @param {object} tradeIdea - Trade idea to validate
 * @param {object} behaviorKB - Behavioral knowledge base content
 * @returns {object} - Validation result with potential behavioral flags
 */
function validateBehavioralPatterns(tradeIdea, behaviorKB) {
  const flags = [];
  
  // Skip validation if essential components are missing
  if (!tradeIdea || !behaviorKB) {
    return { flagged: false };
  }
  
  // Extract relevant information
  const { ticker, confidence, duration, position_size } = tradeIdea;
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Check for late day lotto trading
  if (duration === 'LOTTO' && currentHour >= 11 && currentMinute >= 30) {
    flags.push({
      flag: 'overtrading',
      pattern: 'Overtrading Lotto Contracts in Low Vol Environments',
      context: 'Late day lotto trade without news/catalyst',
      reset_type: 'midday-reset'
    });
  }
  
  // Check for oversized positions
  if (position_size === 'FULL_DOUBLE' && confidence !== 'BIG_IDEA') {
    flags.push({
      flag: 'oversized',
      pattern: 'Position Size Misaligned to Edge',
      context: 'Max size deployed on non-BIG_IDEA setup',
      reset_type: 'journal-review'
    });
  }
  
  // Check for mixed bias trading
  // This would require access to previous trades and market bias
  
  // Check for emotional averaging or FOMO
  // This would require access to previous trades
  
  if (flags.length > 0) {
    return {
      flagged: true,
      flags,
      message: `Detected ${flags.length} potential behavioral issue(s)`
    };
  }
  
  return { flagged: false };
}

/**
 * Perform comprehensive validation of unified trade plan
 * 
 * @param {object} tradePlan - Unified trade plan to validate
 * @returns {object} - Validation result with errors if any
 */
function validateUnifiedTradePlan(tradePlan) {
  const errors = [];
  
  // Validate basic structure
  if (!tradePlan.market_bias) {
    errors.push('Missing market_bias in trade plan');
  }
  
  if (!tradePlan.priority_focus) {
    errors.push('Missing priority_focus in trade plan');
  }
  
  if (!tradePlan.trade_plan) {
    errors.push('Missing trade_plan in trade plan');
  }
  
  // Validate trade categories
  const { trade_plan } = tradePlan;
  
  if (trade_plan) {
    // Ensure at least one category has trades
    const hasAnyTrades = 
      (trade_plan.core_positions && trade_plan.core_positions.length > 0) ||
      (trade_plan.directional_trades && trade_plan.directional_trades.length > 0) ||
      (trade_plan.intraday_setups && trade_plan.intraday_setups.length > 0) ||
      (trade_plan.spec_plays && trade_plan.spec_plays.length > 0);
    
    if (!hasAnyTrades) {
      errors.push('Trade plan contains no trade ideas in any category');
    }
    
    // Validate risk management rules
    if (!tradePlan.risk_management || tradePlan.risk_management.length === 0) {
      errors.push('Missing risk management rules');
    }
    
    // Validate trade management rules
    if (!tradePlan.trade_management || tradePlan.trade_management.length === 0) {
      errors.push('Missing trade management rules');
    }
  }
  
  if (errors.length > 0) {
    return {
      valid: false,
      errors
    };
  }
  
  return {
    valid: true,
    message: 'Valid unified trade plan'
  };
}

/**
 * Helper function to check if array is sorted in ascending order
 * 
 * @param {number[]} arr - Array of numbers
 * @returns {boolean} - True if sorted in ascending order
 */
function isSortedAscending(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) return false;
  }
  return true;
}

/**
 * Helper function to check if array is sorted in descending order
 * 
 * @param {number[]} arr - Array of numbers
 * @returns {boolean} - True if sorted in descending order
 */
function isSortedDescending(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < arr[i + 1]) return false;
  }
  return true;
}

/**
 * Helper function to parse a number from various formats
 * 
 * @param {*} value - Value to parse
 * @returns {number} - Parsed number or NaN
 */
function parseNumber(value) {
  if (typeof value === 'number') {
    return value;
  }
  
  if (typeof value === 'string') {
    // Remove $ and other non-numeric characters except decimal point
    const cleanedValue = value.replace(/[^\d.-]/g, '');
    return parseFloat(cleanedValue);
  }
  
  return NaN;
}

module.exports = {
  validateTradeData,
  validateLevelConsistency,
  validateRiskReward,
  validatePositionSizing,
  validateMarketBias,
  validateBehavioralPatterns,
  validateUnifiedTradePlan
};
