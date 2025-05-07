/**
 * Premarket Pipeline
 * 
 * Automates the premarket workflow by orchestrating the data flow between
 * DP analysis, Mancini analysis, market levels, and unified trade plan generation.
 * 
 * @version 2.0.0
 * @author Simon Plant
 * @updated 2025-05-07
 */

const fs = require('fs');
const path = require('path');
const { validateAndFix, mergeValidatedObjects } = require('./json-validation-utility');
const { processValidateAndSave, generatePath } = require('./template-processor');
const { loadParameters } = require('./parameter-loader');
const { resolveFilePath } = require('./path-resolver');

/**
 * Pipeline configuration
 */
const config = {
  dpSchema: 'trade-data',
  manciniSchema: 'trade-data',
  unifiedSchema: 'unified-plan',
  unifiedTemplate: 'unified-trade-plan',
  levelsSchema: 'market-levels',
  traceEnabled: true,
  includeSourceData: true,
  outputDirectory: path.resolve(__dirname, '../logs/trade-plans'),
  cacheDirectory: path.resolve(__dirname, '../.cache'),
  maxCacheAge: 24 * 60 * 60 * 1000 // 24 hours
};

/**
 * Log pipeline trace messages
 * 
 * @param {string} message - Message to log
 * @param {string} level - Log level
 */
function trace(message, level = 'info') {
  if (!config.traceEnabled) return;
  
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [Premarket Pipeline] [${level.toUpperCase()}]`;
  
  console.log(`${prefix} ${message}`);
}

/**
 * Current pipeline state
 */
let pipelineState = {
  initialized: false,
  startTime: null,
  endTime: null,
  dpData: null,
  manciniData: null,
  levelsData: null,
  smaData: null,
  unifiedData: null,
  errors: [],
  warnings: [],
  output: null
};

/**
 * Reset pipeline state
 */
function resetPipeline() {
  pipelineState = {
    initialized: false,
    startTime: null,
    endTime: null,
    dpData: null,
    manciniData: null,
    levelsData: null,
    smaData: null,
    unifiedData: null,
    errors: [],
    warnings: [],
    output: null
  };
}

/**
 * Initialize the pipeline for a new run
 * 
 * @param {Object} options - Pipeline options
 * @returns {Object} Initialized pipeline state
 */
function initializePipeline(options = {}) {
  // Reset existing state
  resetPipeline();
  
  // Set start time
  pipelineState.startTime = new Date();
  pipelineState.initialized = true;
  
  // Apply options
  Object.assign(config, options);
  
  // Create cache directory if needed
  if (!fs.existsSync(config.cacheDirectory)) {
    fs.mkdirSync(config.cacheDirectory, { recursive: true });
  }
  
  trace('Pipeline initialized');
  
  return pipelineState;
}

/**
 * Process DP analysis data
 * 
 * @param {Object|string} dpData - DP analysis data or file path
 * @returns {Promise<Object>} Processed DP data
 */
async function processDpAnalysis(dpData) {
  trace('Processing DP analysis data');
  
  try {
    // Handle file path input
    let data = dpData;
    if (typeof dpData === 'string') {
      const filePath = resolveFilePath(dpData);
      trace(`Loading DP data from ${filePath}`);
      
      if (!fs.existsSync(filePath)) {
        throw new Error(`DP analysis file not found: ${filePath}`);
      }
      
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    
    // Validate and fix
    const result = await validateAndFix(data, config.dpSchema);
    
    if (!result.valid) {
      // Add warning or error based on severity
      if (result.partial) {
        pipelineState.warnings.push({
          source: 'dp_analysis',
          message: 'DP analysis data partially valid, using required fields only',
          details: result.errors
        });
        
        trace('DP analysis validation partially successful', 'warn');
      } else {
        throw new Error('DP analysis validation failed: ' + JSON.stringify(result.errors));
      }
    }
    
    // Store in pipeline state
    pipelineState.dpData = result.data;
    
    trace('DP analysis processing completed');
    return result.data;
  } catch (error) {
    // Record error
    pipelineState.errors.push({
      source: 'dp_analysis',
      message: error.message,
      stack: error.stack
    });
    
    trace(`DP analysis processing failed: ${error.message}`, 'error');
    throw error;
  }
}

/**
 * Process Mancini analysis data
 * 
 * @param {Object|string} manciniData - Mancini analysis data or file path
 * @returns {Promise<Object>} Processed Mancini data
 */
async function processManciniAnalysis(manciniData) {
  trace('Processing Mancini analysis data');
  
  try {
    // Handle file path input
    let data = manciniData;
    if (typeof manciniData === 'string') {
      const filePath = resolveFilePath(manciniData);
      trace(`Loading Mancini data from ${filePath}`);
      
      if (!fs.existsSync(filePath)) {
        throw new Error(`Mancini analysis file not found: ${filePath}`);
      }
      
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    
    // Validate and fix
    const result = await validateAndFix(data, config.manciniSchema);
    
    if (!result.valid) {
      // Add warning or error based on severity
      if (result.partial) {
        pipelineState.warnings.push({
          source: 'mancini_analysis',
          message: 'Mancini analysis data partially valid, using required fields only',
          details: result.errors
        });
        
        trace('Mancini analysis validation partially successful', 'warn');
      } else {
        throw new Error('Mancini analysis validation failed: ' + JSON.stringify(result.errors));
      }
    }
    
    // Store in pipeline state
    pipelineState.manciniData = result.data;
    
    trace('Mancini analysis processing completed');
    return result.data;
  } catch (error) {
    // Record error
    pipelineState.errors.push({
      source: 'mancini_analysis',
      message: error.message,
      stack: error.stack
    });
    
    trace(`Mancini analysis processing failed: ${error.message}`, 'error');
    throw error;
  }
}

/**
 * Process market levels data
 * 
 * @param {Object|string} levelsData - Market levels data or file path
 * @returns {Promise<Object>} Processed levels data
 */
async function processMarketLevels(levelsData) {
  trace('Processing market levels data');
  
  try {
    // Handle file path input
    let data = levelsData;
    if (typeof levelsData === 'string') {
      const filePath = resolveFilePath(levelsData);
      trace(`Loading levels data from ${filePath}`);
      
      if (!fs.existsSync(filePath)) {
        throw new Error(`Market levels file not found: ${filePath}`);
      }
      
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    
    // Validate and fix
    const result = await validateAndFix(data, config.levelsSchema);
    
    if (!result.valid) {
      // Add warning
      pipelineState.warnings.push({
        source: 'market_levels',
        message: 'Market levels data validation issues, using best effort',
        details: result.errors
      });
      
      trace('Market levels validation partially successful', 'warn');
    }
    
    // Store in pipeline state
    pipelineState.levelsData = result.data;
    
    trace('Market levels processing completed');
    return result.data;
  } catch (error) {
    // Record error but continue
    pipelineState.warnings.push({
      source: 'market_levels',
      message: error.message,
      stack: error.stack
    });
    
    trace(`Market levels processing issue: ${error.message}`, 'warn');
    return null;
  }
}

/**
 * Process SMA data
 * 
 * @param {Object|string} smaData - SMA data or file path
 * @returns {Promise<Object>} Processed SMA data
 */
async function processSmaData(smaData) {
  trace('Processing SMA data');
  
  try {
    // Handle file path input
    let data = smaData;
    if (typeof smaData === 'string') {
      const filePath = resolveFilePath(smaData);
      trace(`Loading SMA data from ${filePath}`);
      
      if (!fs.existsSync(filePath)) {
        trace(`SMA data file not found: ${filePath}`, 'warn');
        return null;
      }
      
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    
    // Basic validation
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid SMA data format');
    }
    
    // Store in pipeline state
    pipelineState.smaData = data;
    
    trace('SMA data processing completed');
    return data;
  } catch (error) {
    // Record warning but continue
    pipelineState.warnings.push({
      source: 'sma_data',
      message: error.message,
      stack: error.stack
    });
    
    trace(`SMA data processing issue: ${error.message}`, 'warn');
    return null;
  }
}

/**
 * Generate unified trade plan
 * 
 * @returns {Promise<Object>} Unified trade plan data
 */
async function generateUnifiedTradePlan() {
  trace('Generating unified trade plan');
  
  try {
    // Check required data
    if (!pipelineState.dpData && !pipelineState.manciniData) {
      throw new Error('Cannot generate unified plan: Both DP and Mancini data missing');
    }
    
    // Load system parameters
    const parameters = loadParameters();
    
    // Create base unified data
    const unifiedData = {
      date: new Date().toISOString().split('T')[0],
      generated_timestamp: new Date().toISOString(),
      source_data: {},
      market_overview: {},
      trade_ideas: [],
      key_levels: {},
      decision_tree: [],
      execution_checklist: []
    };
    
    // Include source data if enabled
    if (config.includeSourceData) {
      if (pipelineState.dpData) {
        unifiedData.source_data.dp = pipelineState.dpData;
      }
      
      if (pipelineState.manciniData) {
        unifiedData.source_data.mancini = pipelineState.manciniData;
      }
      
      if (pipelineState.levelsData) {
        unifiedData.source_data.levels = pipelineState.levelsData;
      }
      
      if (pipelineState.smaData) {
        unifiedData.source_data.sma = pipelineState.smaData;
      }
    }
    
    // Process market overview
    if (pipelineState.dpData && pipelineState