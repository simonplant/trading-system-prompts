/**
 * js/parameter-loader.js
 * 
 * Central utility for loading system parameters
 * 
 * @version 1.0
 * @author Trading System
 * @last_updated 2025-05-07
 */

const fs = require('fs');
const path = require('path');

// Cache for parameters to avoid repeated disk reads
let parametersCache = null;
let lastLoadTime = null;

// Cache expiration time in milliseconds (5 minutes)
const CACHE_EXPIRATION = 5 * 60 * 1000;

/**
 * Load system parameters from JSON file
 * 
 * @param {boolean} forceReload - Force reload from disk even if cache exists
 * @returns {object} - System parameters
 */
function loadParameters(forceReload = false) {
  const now = Date.now();
  
  // Return cached parameters if available and not expired
  if (
    !forceReload && 
    parametersCache && 
    lastLoadTime && 
    (now - lastLoadTime) < CACHE_EXPIRATION
  ) {
    return parametersCache;
  }
  
  try {
    // Determine the correct path to system-parameters.json
    const parameterPath = path.join(process.cwd(), 'system', 'system-parameters.json');
    
    // Read and parse the parameters file
    const parameterData = fs.readFileSync(parameterPath, 'utf8');
    const parameters = JSON.parse(parameterData);
    
    // Update cache
    parametersCache = parameters;
    lastLoadTime = now;
    
    return parameters;
  } catch (error) {
    throw new Error(`Failed to load system parameters: ${error.message}`);
  }
}

/**
 * Get a specific parameter by path
 * 
 * @param {string} paramPath - Parameter path (e.g., 'MARKET_CONVERSION_FACTORS.ES_TO_SPX_CONVERSION')
 * @param {*} defaultValue - Default value if parameter not found
 * @returns {*} - Parameter value or default
 */
function getParameter(paramPath, defaultValue = null) {
  // Load parameters if not already loaded
  const parameters = loadParameters();
  
  // Split the path into segments
  const segments = paramPath.split('.');
  
  // Navigate through the parameter object
  let value = parameters;
  for (const segment of segments) {
    if (value === undefined || value === null || typeof value !== 'object') {
      return defaultValue;
    }
    
    value = value[segment];
  }
  
  return value !== undefined ? value : defaultValue;
}

/**
 * Get size recommendation based on confidence and duration
 * 
 * @param {string} confidence - Trade confidence level
 * @param {string} duration - Trade duration
 * @returns {string} - Recommended position size
 */
function getPositionSize(confidence, duration) {
  const sizeMatrix = getParameter('POSITION_SIZE_MATRIX', {});
  
  // Check if confidence level exists in the matrix
  if (!sizeMatrix[confidence]) {
    return 'QUARTER'; // Default fallback size
  }
  
  // Check if duration exists for this confidence level
  if (!sizeMatrix[confidence][duration]) {
    return 'QUARTER'; // Default fallback size
  }
  
  return sizeMatrix[confidence][duration];
}

/**
 * Get command path from routing table
 * 
 * @param {string} command - Command name
 * @param {string} phase - Trading phase
 * @returns {string|null} - Command path or null if not found
 */
function getCommandPath(command, phase = 'SYSTEM') {
  const routingTable = getParameter('COMMAND_ROUTING_TABLE', {});
  const phaseKey = `${phase.toUpperCase()}_COMMANDS`;
  
  // Check if phase exists in routing table
  if (!routingTable[phaseKey]) {
    return null;
  }
  
  // Check if command exists in phase
  return routingTable[phaseKey][command] || null;
}

/**
 * Get validation requirements for a schema type
 * 
 * @param {string} schemaType - Schema type (e.g., 'DP', 'MANCINI')
 * @returns {string[]|null} - Required fields or null if not found
 */
function getValidationRequirements(schemaType) {
  const validationParams = getParameter('VALIDATION_PARAMETERS', {});
  
  if (!validationParams.REQUIRED_SCHEMA_FIELDS) {
    return null;
  }
  
  return validationParams.REQUIRED_SCHEMA_FIELDS[schemaType] || null;
}

/**
 * Convert ES futures level to SPX level
 * 
 * @param {number} esLevel - ES futures level
 * @returns {number} - Converted SPX level
 */
function convertEStoSPX(esLevel) {
  const conversion = getParameter('MARKET_CONVERSION_FACTORS.ES_TO_SPX_CONVERSION', -20);
  return esLevel + conversion;
}

/**
 * Convert SPX level to SPY level
 * 
 * @param {number} spxLevel - SPX level
 * @returns {number} - Converted SPY level
 */
function convertSPXtoSPY(spxLevel) {
  const divisor = getParameter('MARKET_CONVERSION_FACTORS.SPX_TO_SPY_DIVISOR', 10);
  return spxLevel / divisor;
}

module.exports = {
  loadParameters,
  getParameter,
  getPositionSize,
  getCommandPath,
  getValidationRequirements,
  convertEStoSPX,
  convertSPXtoSPY
};
