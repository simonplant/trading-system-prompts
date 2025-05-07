/**
 * schema-validator.js
 * 
 * Centralized schema validation utility for the trading system
 * 
 * @version 1.0
 * @author Simon Plant
 * @last_updated 2025-05-07
 */

// Import system parameters
const systemParameters = require('./system-parameters.json');

// Schema validation function
function validateSchema(data, schemaType) {
  // Early validation - check if data exists
  if (!data) {
    return {
      valid: false,
      errors: ['Data is null or undefined']
    };
  }

  // Get required fields based on schema type
  const requiredFields = systemParameters.VALIDATION_PARAMETERS.REQUIRED_SCHEMA_FIELDS[schemaType];
  if (!requiredFields) {
    return {
      valid: false,
      errors: [`Unknown schema type: ${schemaType}`]
    };
  }

  // Check for required fields
  const missingFields = [];
  for (const field of requiredFields) {
    if (!data[field]) {
      missingFields.push(field);
    }
  }

  if (missingFields.length > 0) {
    return {
      valid: false,
      errors: [`Missing required fields: ${missingFields.join(', ')}`]
    };
  }

  // Metadata validation
  if (data.metadata) {
    if (!data.metadata.source) {
      return {
        valid: false,
        errors: ['Metadata missing source field']
      };
    }
    
    if (!data.metadata.timestamp) {
      return {
        valid: false,
        errors: ['Metadata missing timestamp field']
      };
    }
    
    if (!data.metadata.version) {
      return {
        valid: false,
        errors: ['Metadata missing version field']
      };
    }
    
    // Version compatibility check
    if (data.metadata.version !== systemParameters.SCHEMA_VERSIONS.TRADE_DATA_SCHEMA_VERSION) {
      return {
        valid: false,
        errors: [
          `Schema version mismatch. Expected: ${systemParameters.SCHEMA_VERSIONS.TRADE_DATA_SCHEMA_VERSION}, ` +
          `Found: ${data.metadata.version}`
        ]
      };
    }
  }

  // Size validation
  const jsonSize = JSON.stringify(data).length;
  if (jsonSize > systemParameters.VALIDATION_PARAMETERS.MAX_JSON_SIZE) {
    return {
      valid: false,
      errors: [`JSON data too large: ${jsonSize} bytes exceed limit of ${systemParameters.VALIDATION_PARAMETERS.MAX_JSON_SIZE} bytes`]
    };
  }

  // Specific schema validation
  let schemaErrors = [];
  
  switch (schemaType) {
    case 'DP':
      schemaErrors = validateDPSchema(data);
      break;
    case 'MANCINI':
      schemaErrors = validateManciniSchema(data);
      break;
    case 'TRADE_IDEA':
      schemaErrors = validateTradeIdeaSchema(data);
      break;
    default:
      schemaErrors = ['Unknown schema type for detailed validation'];
  }

  if (schemaErrors.length > 0) {
    return {
      valid: false,
      errors: schemaErrors
    };
  }

  // All validations passed
  return {
    valid: true,
    message: `Valid ${schemaType} schema (v${data.metadata?.version || 'unknown'})`
  };
}

// DP-specific schema validation
function validateDPSchema(data) {
  const errors = [];

  // Check TRADE_DATA structure
  if (data.TRADE_DATA) {
    if (!Array.isArray(data.TRADE_DATA)) {
      errors.push('TRADE_DATA must be an array');
    } else {
      // Validate each trade
      data.TRADE_DATA.forEach((trade, index) => {
        if (!trade.ticker) errors.push(`TRADE_DATA[${index}]: Missing ticker`);
        if (!trade.direction) errors.push(`TRADE_DATA[${index}]: Missing direction`);
        if (!trade.confidence) errors.push(`TRADE_DATA[${index}]: Missing confidence`);
        if (!trade.duration) errors.push(`TRADE_DATA[${index}]: Missing duration`);
        if (!trade.position_size) errors.push(`TRADE_DATA[${index}]: Missing position_size`);
        if (!trade.levels) errors.push(`TRADE_DATA[${index}]: Missing levels`);
        
        // Direction enum validation
        if (trade.direction && !['LONG', 'SHORT'].includes(trade.direction)) {
          errors.push(`TRADE_DATA[${index}]: Invalid direction: ${trade.direction}`);
        }
        
        // Confidence enum validation
        if (trade.confidence && !['BIG_IDEA', 'HIGH', 'MEDIUM', 'LOW'].includes(trade.confidence)) {
          errors.push(`TRADE_DATA[${index}]: Invalid confidence: ${trade.confidence}`);
        }
        
        // Duration enum validation
        if (trade.duration && !['CASHFLOW', 'SWING', 'LONGTERM', 'LOTTO'].includes(trade.duration)) {
          errors.push(`TRADE_DATA[${index}]: Invalid duration: ${trade.duration}`);
        }
      });
    }
  }

  // Check MARKET_BIAS structure
  if (data.MARKET_BIAS) {
    if (!data.MARKET_BIAS.overall) {
      errors.push('MARKET_BIAS: Missing overall field');
    } else if (!['BULLISH', 'BEARISH', 'NEUTRAL', 'CAUTIOUS', 'MIXED'].includes(data.MARKET_BIAS.overall)) {
      errors.push(`MARKET_BIAS: Invalid overall value: ${data.MARKET_BIAS.overall}`);
    }
    
    // Key levels validation
    if (data.MARKET_BIAS.key_levels) {
      const expectedIndices = ['SPX', 'QQQ', 'SPY', 'ES', 'VIX'];
      expectedIndices.forEach(index => {
        if (data.MARKET_BIAS.key_levels[index] && !Array.isArray(data.MARKET_BIAS.key_levels[index])) {
          errors.push(`MARKET_BIAS.key_levels.${index} must be an array`);
        }
      });
    }
  }

  return errors;
}

// Mancini-specific schema validation
function validateManciniSchema(data) {
  const errors = [];

  // Check metadata ES conversion factor
  if (data.metadata && data.metadata.source === 'mancini' && !data.metadata.es_to_spx_conversion) {
    errors.push('Mancini metadata missing es_to_spx_conversion factor');
  }

  // Validate TECHNICAL_DATA
  if (data.TECHNICAL_DATA) {
    if (!data.TECHNICAL_DATA.market_structure) {
      errors.push('TECHNICAL_DATA missing market_structure field');
    }
    
    if (!data.TECHNICAL_DATA.control_lines) {
      errors.push('TECHNICAL_DATA missing control_lines field');
    }
    
    if (!data.TECHNICAL_DATA.levels) {
      errors.push('TECHNICAL_DATA missing levels field');
    }
    
    if (!data.TECHNICAL_DATA.support_resistance) {
      errors.push('TECHNICAL_DATA missing support_resistance field');
    }
  }

  // Validate TRADE_DATA similar to DP validation
  if (data.TRADE_DATA) {
    if (!Array.isArray(data.TRADE_DATA)) {
      errors.push('TRADE_DATA must be an array');
    } else {
      // Validation similar to DP but with Mancini-specific fields
      data.TRADE_DATA.forEach((trade, index) => {
        // Basic validation similar to DP
        if (!trade.ticker) errors.push(`TRADE_DATA[${index}]: Missing ticker`);
        if (!trade.direction) errors.push(`TRADE_DATA[${index}]: Missing direction`);
        if (!trade.confidence) errors.push(`TRADE_DATA[${index}]: Missing confidence`);
        
        // Check for Mancini-specific field
        if (!trade.setup_type) errors.push(`TRADE_DATA[${index}]: Missing setup_type`);
        
        // Check for acceptance criteria (Mancini-specific)
        if (trade.acceptance) {
          if (!trade.acceptance.type) {
            errors.push(`TRADE_DATA[${index}]: Missing acceptance.type`);
          } else if (!['BACKTEST', 'RECLAIM', 'BOTH'].includes(trade.acceptance.type)) {
            errors.push(`TRADE_DATA[${index}]: Invalid acceptance.type: ${trade.acceptance.type}`);
          }
        }
      });
    }
  }

  // Validate MARKET_ANALYSIS
  if (data.MARKET_ANALYSIS) {
    if (!data.MARKET_ANALYSIS.previous_session) {
      errors.push('MARKET_ANALYSIS missing previous_session field');
    }
    
    if (!data.MARKET_ANALYSIS.next_session_outlook) {
      errors.push('MARKET_ANALYSIS missing next_session_outlook field');
    }
    
    if (!data.MARKET_ANALYSIS.invalidation_signals) {
      errors.push('MARKET_ANALYSIS missing invalidation_signals field');
    }
  }

  return errors;
}

// Trade idea schema validation
function validateTradeIdeaSchema(data) {
  const errors = [];
  
  // Basic required fields
  if (!data.ticker) errors.push('Missing ticker');
  if (!data.direction) errors.push('Missing direction');
  if (!data.confidence) errors.push('Missing confidence');
  if (!data.duration) errors.push('Missing duration');
  if (!data.levels) errors.push('Missing levels');
  
  // Enum validations
  if (data.direction && !['LONG', 'SHORT'].includes(data.direction)) {
    errors.push(`Invalid direction: ${data.direction}`);
  }
  
  if (data.confidence && !['BIG_IDEA', 'HIGH', 'MEDIUM', 'LOW'].includes(data.confidence)) {
    errors.push(`Invalid confidence: ${data.confidence}`);
  }
  
  if (data.duration && !['CASHFLOW', 'SWING', 'LONGTERM', 'LOTTO'].includes(data.duration)) {
    errors.push(`Invalid duration: ${data.duration}`);
  }
  
  if (data.position_size && 
      !['FULL_DOUBLE', 'FULL', 'HALF', 'QUARTER', 'SMALL', 'TINY'].includes(data.position_size)) {
    errors.push(`Invalid position_size: ${data.position_size}`);
  }
  
  // Levels validation
  if (data.levels) {
    if (!data.levels.entry) errors.push('Missing levels.entry');
    if (!data.levels.target) errors.push('Missing levels.target');
    if (!data.levels.stop) errors.push('Missing levels.stop');
  }
  
  return errors;
}

// Export the validation function
module.exports = {
  validateSchema
};