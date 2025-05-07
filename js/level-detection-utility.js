/**
 * Level Detection and Validation Utility
 * 
 * Enhances price level detection, validation, and confluence analysis
 * across DP and Mancini sources for more accurate trading levels.
 * 
 * @version 1.0.0
 * @author Simon Plant
 * @updated 2025-05-07
 */

// Import required dependencies
const { loadParameters } = require('./parameter-loader');
const { validateJson } = require('./json-validation-utility');

/**
 * Configuration for level detection
 */
const config = {
  // Round levels to nearest multiple based on instrument
  roundingFactors: {
    'SPX': 1.0,
    'ES': 0.25,
    'TSLA': 0.5,
    'AAPL': 0.25,
    'QQQ': 0.1,
    'SPY': 0.1,
    'DEFAULT': 0.1
  },
  // Tolerance for identifying confluence between levels
  confluenceTolerance: {
    'SPX': 5.0,
    'ES': 1.0,
    'DEFAULT': 0.5
  },
  // Weight factors for different level types
  levelWeights: {
    'STRUCTURE': 1.0,     // Trendlines, channels, etc.
    'PRIOR_HIGH_LOW': 0.9, // Prior day high/low
    'PIVOT': 0.8,         // Pivot points
    'FIBONACCI': 0.7,     // Fibonacci levels
    'MOVING_AVERAGE': 0.7, // Key moving averages
    'VWAP': 0.6,          // VWAP and anchored VWAP
    'ROUND_NUMBER': 0.5,  // Psychological levels
    'VOLUME_PROFILE': 0.8 // Volume profile nodes
  },
  // Source credibility weights
  sourceWeights: {
    'DP': 1.0,
    'MANCINI': 1.0,
    'USER': 0.8,
    'HISTORICAL': 0.7,
    'COMPUTED': 0.6
  },
  // Maximum number of levels to include per category
  maxLevelsPerCategory: {
    'MACRO_RESISTANCE': 3,
    'MAJOR_RESISTANCE': 5,
    'MINOR_RESISTANCE': 7,
    'MINOR_SUPPORT': 7,
    'MAJOR_SUPPORT': 5,
    'MACRO_SUPPORT': 3
  }
};

/**
 * Level class to represent a price level with metadata
 */
class Level {
  constructor({
    price,
    context = '',
    type = 'STRUCTURE',
    source = 'COMPUTED',
    timeframe = 'DAILY',
    symbol = 'SPX',
    confidence = 0.5
  }) {
    this.price = Number(price);
    this.context = context;
    this.type = type;
    this.source = source;
    this.timeframe = timeframe;
    this.symbol = symbol;
    this.confidence = confidence;
    this.weight = this._calculateWeight();
    this.roundedPrice = this._roundPrice();
  }

  /**
   * Calculate the weight of this level based on type and source
   * 
   * @returns {number} Level weight (0-1)
   */
  _calculateWeight() {
    const typeWeight = config.levelWeights[this.type] || config.levelWeights.STRUCTURE;
    const sourceWeight = config.sourceWeights[this.source] || config.sourceWeights.COMPUTED;
    return typeWeight * sourceWeight * this.confidence;
  }

  /**
   * Round the price to the appropriate multiple for the symbol
   * 
   * @returns {number} Rounded price
   */
  _roundPrice() {
    const factor = config.roundingFactors[this.symbol] || config.roundingFactors.DEFAULT;
    return Math.round(this.price / factor) * factor;
  }

  /**
   * Check if this level is in confluence with another level
   * 
   * @param {Level} otherLevel The level to check confluence with
   * @returns {boolean} True if levels are in confluence
   */
  isInConfluenceWith(otherLevel) {
    const tolerance = config.confluenceTolerance[this.symbol] || config.confluenceTolerance.DEFAULT;
    return Math.abs(this.roundedPrice - otherLevel.roundedPrice) <= tolerance;
  }

  /**
   * Create a string representation of the level
   * 
   * @returns {string} Formatted level string
   */
  toString() {
    return `${this.roundedPrice}${this.context ? ` (${this.context})` : ''}`;
  }

  /**
   * Convert level to JSON representation
   * 
   * @returns {object} JSON representation
   */
  toJSON() {
    return {
      price: this.roundedPrice,
      context: this.context,
      type: this.type,
      source: this.source,
      timeframe: this.timeframe,
      weight: this.weight
    };
  }
}

/**
 * Level collection to manage and analyze multiple levels
 */
class LevelCollection {
  constructor(symbol = 'SPX') {
    this.levels = [];
    this.symbol = symbol;
    this.confluence = new Map(); // Map of rounded price to array of levels
  }

  /**
   * Add a level to the collection
   * 
   * @param {Level|Object} level Level to add
   * @returns {Level} The added level
   */
  addLevel(level) {
    const levelObj = level instanceof Level ? level : new Level({...level, symbol: this.symbol});
    this.levels.push(levelObj);
    
    // Update confluence map
    const key = levelObj.roundedPrice.toString();
    if (!this.confluence.has(key)) {
      this.confluence.set(key, []);
    }
    this.confluence.get(key).push(levelObj);
    
    return levelObj;
  }

  /**
   * Add multiple levels to the collection
   * 
   * @param {Array<Level|Object>} levels Array of levels to add
   * @returns {Array<Level>} The added levels
   */
  addLevels(levels) {
    return levels.map(level => this.addLevel(level));
  }

  /**
   * Get levels sorted by price
   * 
   * @param {boolean} ascending Whether to sort ascending or descending
   * @returns {Array<Level>} Sorted levels
   */
  getSortedLevels(ascending = true) {
    return [...this.levels].sort((a, b) => {
      return ascending ? a.price - b.price : b.price - b.price;
    });
  }

  /**
   * Get levels in a specific price range
   * 
   * @param {number} minPrice Minimum price
   * @param {number} maxPrice Maximum price
   * @returns {Array<Level>} Levels in range
   */
  getLevelsInRange(minPrice, maxPrice) {
    return this.levels.filter(level => {
      return level.price >= minPrice && level.price <= maxPrice;
    });
  }

  /**
   * Get levels above a current price
   * 
   * @param {number} currentPrice Current price
   * @param {number} count Maximum number of levels to return
   * @returns {Array<Level>} Levels above price
   */
  getLevelsAbove(currentPrice, count = 10) {
    return this.getSortedLevels(true)
      .filter(level => level.price > currentPrice)
      .slice(0, count);
  }

  /**
   * Get levels below a current price
   * 
   * @param {number} currentPrice Current price
   * @param {number} count Maximum number of levels to return
   * @returns {Array<Level>} Levels below price
   */
  getLevelsBelow(currentPrice, count = 10) {
    return this.getSortedLevels(false)
      .filter(level => level.price < currentPrice)
      .slice(0, count);
  }

  /**
   * Find confluent levels (levels that are very close to each other)
   * 
   * @param {number} tolerance Price difference tolerance for confluence
   * @returns {Array<Array<Level>>} Groups of confluent levels
   */
  findConfluentLevels(tolerance = null) {
    if (!tolerance) {
      tolerance = config.confluenceTolerance[this.symbol] || config.confluenceTolerance.DEFAULT;
    }
    
    const result = [];
    
    // Convert confluence map to array of level groups
    for (const [price, levels] of this.confluence.entries()) {
      if (levels.length > 1) {
        // Multiple levels at the same rounded price
        result.push(levels);
      }
    }
    
    return result;
  }

  /**
   * Get the most significant levels based on weight and confluence
   * 
   * @param {number} currentPrice Current price
   * @returns {Object} Categorized levels
   */
  getSignificantLevels(currentPrice) {
    const sortedLevels = this.getSortedLevels(true);
    const confluenceGroups = this.findConfluentLevels();
    
    // Calculate combined weights for confluent levels
    const weightBoost = new Map();
    confluenceGroups.forEach(group => {
      // Get the average price for this group
      const avgPrice = group.reduce((sum, level) => sum + level.price, 0) / group.length;
      const roundedPrice = Math.round(avgPrice * 100) / 100;
      
      // Calculate combined weight
      const combinedWeight = group.reduce((sum, level) => sum + level.weight, 0);
      weightBoost.set(roundedPrice.toString(), combinedWeight);
    });
    
    // Apply weight boosting to all levels
    const boostedLevels = sortedLevels.map(level => {
      const key = level.roundedPrice.toString();
      const boost = weightBoost.get(key) || level.weight;
      return {
        level,
        boostedWeight: boost
      };
    });
    
    // Categorize levels
    const categories = {
      macro_resistance: [],
      major_resistance: [],
      minor_resistance: [],
      trading_range: {
        low: currentPrice * 0.99,
        high: currentPrice * 1.01
      },
      minor_support: [],
      major_support: [],
      macro_support: []
    };
    
    // Get top weighted resistance levels
    const resistanceLevels = boostedLevels
      .filter(item => item.level.price > currentPrice)
      .sort((a, b) => b.boostedWeight - a.boostedWeight);
    
    // Get top weighted support levels
    const supportLevels = boostedLevels
      .filter(item => item.level.price < currentPrice)
      .sort((a, b) => b.boostedWeight - a.boostedWeight);
    
    // Fill categories with limits
    const fillCategory = (levels, category, count) => {
      const maxCount = config.maxLevelsPerCategory[category.toUpperCase()] || count;
      return levels.slice(0, maxCount).map(item => item.level);
    };
    
    categories.macro_resistance = fillCategory(resistanceLevels, 'MACRO_RESISTANCE', 3);
    resistanceLevels.splice(0, categories.macro_resistance.length);
    
    categories.major_resistance = fillCategory(resistanceLevels, 'MAJOR_RESISTANCE', 5);
    resistanceLevels.splice(0, categories.major_resistance.length);
    
    categories.minor_resistance = fillCategory(resistanceLevels, 'MINOR_RESISTANCE', 7);
    
    categories.macro_support = fillCategory(supportLevels, 'MACRO_SUPPORT', 3);
    supportLevels.splice(0, categories.macro_support.length);
    
    categories.major_support = fillCategory(supportLevels, 'MAJOR_SUPPORT', 5);
    supportLevels.splice(0, categories.major_support.length);
    
    categories.minor_support = fillCategory(supportLevels, 'MINOR_SUPPORT', 7);
    
    // Update trading range if we have enough data
    if (categories.minor_resistance.length > 0 && categories.minor_support.length > 0) {
      categories.trading_range = {
        low: categories.minor_support[0].price,
        high: categories.minor_resistance[0].price
      };
    }
    
    return categories;
  }

  /**
   * Convert collection to JSON for output
   * 
   * @param {number} currentPrice Current price for categorization
   * @returns {Object} JSON representation
   */
  toJSON(currentPrice) {
    const significantLevels = this.getSignificantLevels(currentPrice);
    
    // Format levels for JSON output
    const formatLevelArray = (levels) => {
      return levels.map(level => ({
        level: level.roundedPrice.toString(),
        context: level.context || level.type.toLowerCase(),
        type: level.type,
        source: level.source,
        weight: level.weight
      }));
    };
    
    return {
      symbol: this.symbol,
      current_price: currentPrice,
      last_updated: new Date().toISOString(),
      macro_resistance: formatLevelArray(significantLevels.macro_resistance),
      major_resistance: formatLevelArray(significantLevels.major_resistance),
      minor_resistance: formatLevelArray(significantLevels.minor_resistance),
      trading_range: significantLevels.trading_range,
      minor_support: formatLevelArray(significantLevels.minor_support),
      major_support: formatLevelArray(significantLevels.major_support),
      macro_support: formatLevelArray(significantLevels.macro_support),
      confluence_points: this.findConfluentLevels().map(group => {
        const avgPrice = group.reduce((sum, level) => sum + level.price, 0) / group.length;
        return {
          price: Math.round(avgPrice * 100) / 100,
          sources: [...new Set(group.map(level => level.source))],
          types: [...new Set(group.map(level => level.type))],
          weight: group.reduce((sum, level) => sum + level.weight, 0)
        };
      })
    };
  }
}

/**
 * Extract levels from DP analysis JSON
 * 
 * @param {Object} dpAnalysis DP analysis JSON data
 * @param {string} symbol Symbol to use for levels
 * @returns {Array<Level>} Extracted levels
 */
function extractLevelsFromDP(dpAnalysis, symbol = 'SPX') {
  const levels = [];
  
  try {
    // Extract levels from MARKET_BIAS section
    if (dpAnalysis.MARKET_BIAS && dpAnalysis.MARKET_BIAS.key_levels) {
      const keyLevels = dpAnalysis.MARKET_BIAS.key_levels;
      
      // Process SPX levels
      if (keyLevels.SPX && Array.isArray(keyLevels.SPX)) {
        keyLevels.SPX.forEach(level => {
          if (typeof level === 'number' || (typeof level === 'string' && !isNaN(parseFloat(level)))) {
            levels.push(new Level({
              price: parseFloat(level),
              type: 'STRUCTURE',
              source: 'DP',
              timeframe: 'DAILY',
              symbol: 'SPX',
              confidence: 0.9
            }));
          }
        });
      }
      
      // Process ES levels if symbol is ES
      if (symbol === 'ES' && keyLevels.ES && Array.isArray(keyLevels.ES)) {
        keyLevels.ES.forEach(level => {
          if (typeof level === 'number' || (typeof level === 'string' && !isNaN(parseFloat(level)))) {
            levels.push(new Level({
              price: parseFloat(level),
              type: 'STRUCTURE',
              source: 'DP',
              timeframe: 'DAILY',
              symbol: 'ES',
              confidence: 0.9
            }));
          }
        });
      }
    }
    
    // Extract levels from TRADE_DATA section
    if (dpAnalysis.TRADE_DATA && Array.isArray(dpAnalysis.TRADE_DATA)) {
      dpAnalysis.TRADE_DATA.forEach(trade => {
        if (trade.ticker === symbol || (symbol === 'SPX' && trade.ticker === 'SPY')) {
          // Handle entry levels
          if (trade.levels && trade.levels.entry) {
            const entries = Array.isArray(trade.levels.entry) ? trade.levels.entry : [trade.levels.entry];
            
            entries.forEach(entry => {
              // Try to extract numeric value from entry
              const match = /(\d+(\.\d+)?)/.exec(entry.toString());
              if (match) {
                const price = parseFloat(match[1]);
                if (!isNaN(price)) {
                  levels.push(new Level({
                    price,
                    context: `DP ${trade.direction.toLowerCase()} entry`,
                    type: 'ENTRY',
                    source: 'DP',
                    timeframe: 'DAILY',
                    symbol,
                    confidence: getConfidenceFromDP(trade.conviction)
                  }));
                }
              }
            });
          }
          
          // Handle target levels
          if (trade.levels && trade.levels.targets) {
            const targets = Array.isArray(trade.levels.targets) ? trade.levels.targets : [trade.levels.targets];
            
            targets.forEach((target, index) => {
              const match = /(\d+(\.\d+)?)/.exec(target.toString());
              if (match) {
                const price = parseFloat(match[1]);
                if (!isNaN(price)) {
                  levels.push(new Level({
                    price,
                    context: `DP ${trade.direction.toLowerCase()} T${index + 1}`,
                    type: 'TARGET',
                    source: 'DP',
                    timeframe: 'DAILY',
                    symbol,
                    confidence: getConfidenceFromDP(trade.conviction) * 0.9 // Slightly lower confidence for targets
                  }));
                }
              }
            });
          }
          
          // Handle stop levels
          if (trade.levels && trade.levels.stops) {
            const stops = Array.isArray(trade.levels.stops) ? trade.levels.stops : [trade.levels.stops];
            
            stops.forEach(stop => {
              const match = /(\d+(\.\d+)?)/.exec(stop.toString());
              if (match) {
                const price = parseFloat(match[1]);
                if (!isNaN(price)) {
                  levels.push(new Level({
                    price,
                    context: `DP ${trade.direction.toLowerCase()} stop`,
                    type: 'STOP',
                    source: 'DP',
                    timeframe: 'DAILY',
                    symbol,
                    confidence: getConfidenceFromDP(trade.conviction) * 0.8 // Lower confidence for stops
                  }));
                }
              }
            });
          }
        }
      });
    }
  } catch (error) {
    console.error(`Error extracting levels from DP analysis: ${error.message}`);
  }
  
  return levels;
}

/**
 * Get confidence value from DP conviction level
 * 
 * @param {string} conviction DP conviction level
 * @returns {number} Confidence value (0-1)
 */
function getConfidenceFromDP(conviction) {
  if (!conviction) return 0.5;
  
  // If conviction is an object with a level property
  if (typeof conviction === 'object' && conviction.level) {
    conviction = conviction.level;
  }
  
  switch (conviction.toString().toUpperCase()) {
    case 'BIG_IDEA': return 1.0;
    case 'HIGH': return 0.9;
    case 'MEDIUM': return 0.7;
    case 'LOW': return 0.5;
    default: return 0.5;
  }
}

/**
 * Extract levels from Mancini analysis JSON
 * 
 * @param {Object} manciniAnalysis Mancini analysis JSON data
 * @param {string} symbol Symbol to use for levels
 * @returns {Array<Level>} Extracted levels
 */
function extractLevelsFromMancini(manciniAnalysis, symbol = 'SPX') {
  const levels = [];
  
  try {
    // Get ES to SPX conversion factor if needed
    let conversionFactor = 0;
    if (symbol === 'SPX' && manciniAnalysis.TECHNICAL_DATA && 
        manciniAnalysis.TECHNICAL_DATA.metadata && 
        manciniAnalysis.TECHNICAL_DATA.metadata.es_to_spx_conversion) {
      conversionFactor = parseFloat(manciniAnalysis.TECHNICAL_DATA.metadata.es_to_spx_conversion);
    } else {
      // Use default from system parameters
      const parameters = loadParameters();
      conversionFactor = parameters.MARKET_CONVERSION_FACTORS.ES_TO_SPX_CONVERSION || -20;
    }
    
    // Helper to convert ES levels to SPX if needed
    const convertLevel = (level, isES = true) => {
      if (typeof level === 'string') {
        level = parseFloat(level);
      }
      
      if (isNaN(level)) return null;
      
      // Convert ES to SPX if needed
      if (symbol === 'SPX' && isES) {
        return level + conversionFactor;
      }
      
      return level;
    };
    
    // Extract from support_resistance section
    if (manciniAnalysis.TECHNICAL_DATA && manciniAnalysis.TECHNICAL_DATA.support_resistance) {
      const sr = manciniAnalysis.TECHNICAL_DATA.support_resistance;
      
      // Process macro resistance
      if (sr.macro_resistance && Array.isArray(sr.macro_resistance)) {
        sr.macro_resistance.forEach(item => {
          const price = convertLevel(item.level);
          if (price !== null) {
            levels.push(new Level({
              price,
              context: item.context || 'Macro resistance',
              type: 'MACRO_RESISTANCE',
              source: 'MANCINI',
              timeframe: 'DAILY',
              symbol,
              confidence: 0.95
            }));
          }
        });
      }
      
      // Process major resistance
      if (sr.major_resistance && Array.isArray(sr.major_resistance)) {
        sr.major_resistance.forEach(item => {
          const price = convertLevel(item.level);
          if (price !== null) {
            levels.push(new Level({
              price,
              context: item.context || 'Major resistance',
              type: 'MAJOR_RESISTANCE',
              source: 'MANCINI',
              timeframe: 'DAILY',
              symbol,
              confidence: 0.9
            }));
          }
        });
      }
      
      // Process minor resistance
      if (sr.minor_resistance && Array.isArray(sr.minor_resistance)) {
        sr.minor_resistance.forEach(item => {
          const price = convertLevel(item.level);
          if (price !== null) {
            levels.push(new Level({
              price,
              context: item.context || 'Minor resistance',
              type: 'MINOR_RESISTANCE',
              source: 'MANCINI',
              timeframe: 'DAILY',
              symbol,
              confidence: 0.8
            }));
          }
        });
      }
      
      // Process trading range
      if (sr.trading_range) {
        if (sr.trading_range.high) {
          const price = convertLevel(sr.trading_range.high);
          if (price !== null) {
            levels.push(new Level({
              price,
              context: 'Trading range high',
              type: 'RANGE',
              source: 'MANCINI',
              timeframe: 'DAILY',
              symbol,
              confidence: 0.85
            }));
          }
        }
        
        if (sr.trading_range.low) {
          const price = convertLevel(sr.trading_range.low);
          if (price !== null) {
            levels.push(new Level({
              price,
              context: 'Trading range low',
              type: 'RANGE',
              source: 'MANCINI',
              timeframe: 'DAILY',
              symbol,
              confidence: 0.85
            }));
          }
        }
      }
      
      // Process minor support
      if (sr.minor_support && Array.isArray(sr.minor_support)) {
        sr.minor_support.forEach(item => {
          const price = convertLevel(item.level);
          if (price !== null) {
            levels.push(new Level({
              price,
              context: item.context || 'Minor support',
              type: 'MINOR_SUPPORT',
              source: 'MANCINI',
              timeframe: 'DAILY',
              symbol,
              confidence: 0.8
            }));
          }
        });
      }
      
      // Process major support
      if (sr.major_support && Array.isArray(sr.major_support)) {
        sr.major_support.forEach(item => {
          const price = convertLevel(item.level);
          if (price !== null) {
            levels.push(new Level({
              price,
              context: item.context || 'Major support',
              type: 'MAJOR_SUPPORT',
              source: 'MANCINI',
              timeframe: 'DAILY',
              symbol,
              confidence: 0.9
            }));
          }
        });
      }
      
      // Process macro support
      if (sr.macro_support && Array.isArray(sr.macro_support)) {
        sr.macro_support.forEach(item => {
          const price = convertLevel(item.level);
          if (price !== null) {
            levels.push(new Level({
              price,
              context: item.context || 'Macro support',
              type: 'MACRO_SUPPORT',
              source: 'MANCINI',
              timeframe: 'DAILY',
              symbol,
              confidence: 0.95
            }));
          }
        });
      }
    }
    
    // Extract from control_lines section
    if (manciniAnalysis.TECHNICAL_DATA && manciniAnalysis.TECHNICAL_DATA.control_lines) {
      const cl = manciniAnalysis.TECHNICAL_DATA.control_lines;
      
      // Process bull above levels
      if (cl.bull_above && Array.isArray(cl.bull_above)) {
        cl.bull_above.forEach(item => {
          let levelStr = item;
          let context = 'Bull control line';
          
          // Handle if item is an object or string with context
          if (typeof item === 'object' && item.level) {
            levelStr = item.level;
            context = item.context || context;
          }
          
          // Extract numeric part
          const match = /(\d+(\.\d+)?)/.exec(levelStr.toString());
          if (match) {
            const price = convertLevel(match[1]);
            if (price !== null) {
              levels.push(new Level({
                price,
                context,
                type: 'CONTROL_LINE',
                source: 'MANCINI',
                timeframe: 'DAILY',
                symbol,
                confidence: 0.95
              }));
            }
          }
        });
      }
      
      // Process bear below levels
      if (cl.bear_below && Array.isArray(cl.bear_below)) {
        cl.bear_below.forEach(item => {
          let levelStr = item;
          let context = 'Bear control line';
          
          // Handle if item is an object or string with context
          if (typeof item === 'object' && item.level) {
            levelStr = item.level;
            context = item.context || context;
          }
          
          // Extract numeric part
          const match = /(\d+(\.\d+)?)/.exec(levelStr.toString());
          if (match) {
            const price = convertLevel(match[1]);
            if (price !== null) {
              levels.push(new Level({
                price,
                context,
                type: 'CONTROL_LINE',
                source: 'MANCINI',
                timeframe: 'DAILY',
                symbol,
                confidence: 0.95
              }));
            }
          }
        });
      }
      
      // Process decision point
      if (cl.decision_point) {
        let levelStr = cl.decision_point;
        let context = 'Decision point';
        
        // Handle if item is an object or string with context
        if (typeof cl.decision_point === 'object' && cl.decision_point.level) {
          levelStr = cl.decision_point.level;
          context = cl.decision_point.context || context;
        }
        
        // Extract numeric part
        const match = /(\d+(\.\d+)?)/.exec(levelStr.toString());
        if (match) {
          const price = convertLevel(match[1]);
          if (price !== null) {
            levels.push(new Level({
              price,
              context,
              type: 'DECISION_POINT',
              source: 'MANCINI',
              timeframe: 'DAILY',
              symbol,
              confidence: 1.0 // Highest confidence for decision points
            }));
          }
        }
      }
    }
    
    // Extract from trade setups
    if (manciniAnalysis.TRADE_SETUPS && manciniAnalysis.TRADE_SETUPS.setups && 
        Array.isArray(manciniAnalysis.TRADE_SETUPS.setups)) {
      
      manciniAnalysis.TRADE_SETUPS.setups.forEach(setup => {
        // Primary level
        if (setup.primary_level) {
          const price = convertLevel(setup.primary_level);
          if (price !== null) {
            levels.push(new Level({
              price,
              context: `${setup.type || 'Setup'} ${setup.direction || ''} primary level`,
              type: 'SETUP',
              source: 'MANCINI',
              timeframe: 'DAILY',
              symbol,
              confidence: getConfidenceFromMancini(setup.conviction)
            }));
          }
        }
        
        // Execution targets
        if (setup.execution && setup.execution.targets && Array.isArray(setup.execution.targets)) {
          setup.execution.targets.forEach((target, index) => {
            const price = convertLevel(target);
            if (price !== null) {
              levels.push(new Level({
                price,
                context: `${setup.type || 'Setup'} ${setup.direction || ''} T${index + 1}`,
                type: 'TARGET',
                source: 'MANCINI',
                timeframe: 'DAILY',
                symbol,
                confidence: getConfidenceFromMancini(setup.conviction) * 0.9
              }));
            }
          });
        }
        
        // Execution stop
        if (setup.execution && setup.execution.stop) {
          const price = convertLevel(setup.execution.stop);
          if (price !== null) {
            levels.push(new Level({
              price,
              context: `${setup.type || 'Setup'} ${setup.direction || ''} stop`,
              type: 'STOP',
              source: 'MANCINI',
              timeframe: 'DAILY',
              symbol,
              confidence: getConfidenceFromMancini(setup.conviction) * 0.8
            }));
          }
        }
      });
    }
    
  } catch (error) {
    console.error(`Error extracting levels from Mancini analysis: ${error.message}`);
  }
  
  return levels;
}

/**
 * Get confidence value from Mancini conviction level
 * 
 * @param {string} conviction Mancini conviction level
 * @returns {number} Confidence value (0-1)
 */
function getConfidenceFromMancini(conviction) {
  if (!conviction) return 0.5;
  
  switch (conviction.toString().toUpperCase()) {
    case 'HIGH': return 0.9;
    case 'MEDIUM': return 0.7;
    case 'LOW': return 0.5;
    default: return 0.5;
  }
}

/**
 * Extract key levels from technical moving averages
 * 
 * @param {Object} smaData SMA data from get-daily-sma-for-tickers
 * @param {string} symbol Symbol to process
 * @returns {Array<Level>} Extracted levels
 */
function extractLevelsFromSMA(smaData, symbol) {
  const levels = [];
  
  try {
    if (!smaData || !smaData[symbol]) {
      return levels;
    }
    
    const maData = smaData[symbol];
    
    // Process common moving averages with their confidence levels
    const maConfidence = {
      '8': 0.6,    // 8 SMA - short term
      '21': 0.7,   // 21 SMA - short/medium term
      '34': 0.75,  // 34 SMA - medium term
      '50': 0.8,   // 50 SMA - medium term (important)
      '100': 0.85, // 100 SMA - long term
      '200': 0.9   // 200 SMA - long term (most important)
    };
    
    // Extract moving averages
    for (const [period, confidence] of Object.entries(maConfidence)) {
      if (maData[period]) {
        const value = parseFloat(maData[period]);
        if (!isNaN(value)) {
          levels.push(new Level({
            price: value,
            context: `${period} SMA`,
            type: 'MOVING_AVERAGE',
            source: 'COMPUTED',
            timeframe: 'DAILY',
            symbol,
            confidence
          }));
        }
      }
    }
    
    // Extract VWAP if available
    if (maData.vwap) {
      const value = parseFloat(maData.vwap);
      if (!isNaN(value)) {
        levels.push(new Level({
          price: value,
          context: 'VWAP',
          type: 'VWAP',
          source: 'COMPUTED',
          timeframe: 'DAILY',
          symbol,
          confidence: 0.8
        }));
      }
    }
    
    // Extract Anchored VWAP if available
    if (maData.avwap) {
      const value = parseFloat(maData.avwap);
      if (!isNaN(value)) {
        levels.push(new Level({
          price: value,
          context: 'Anchored VWAP',
          type: 'VWAP',
          source: 'COMPUTED',
          timeframe: 'DAILY',
          symbol,
          confidence: 0.85
        }));
      }
    }
    
  } catch (error) {
    console.error(`Error extracting levels from SMA data: ${error.message}`);
  }
  
  return levels;
}

/**
 * Generate round number levels for psychological support/resistance
 * 
 * @param {number} currentPrice Current price to generate levels around
 * @param {string} symbol Symbol to use
 * @param {number} range Range to generate levels (percentage of current price)
 * @param {number} increment Increment between levels
 * @returns {Array<Level>} Generated levels
 */
function generateRoundNumberLevels(currentPrice, symbol = 'SPX', range = 0.05, increment = null) {
  const levels = [];
  
  try {
    // Determine increment based on price magnitude
    if (!increment) {
      if (currentPrice > 5000) {
        increment = 50; // SPX-like
      } else if (currentPrice > 1000) {
        increment = 25; // High-priced
      } else if (currentPrice > 100) {
        increment = 5;  // Medium-priced
      } else if (currentPrice > 10) {
        increment = 1;  // Lower-priced
      } else {
        increment = 0.5; // Very low-priced
      }
    }
    
    // Generate levels above current price
    const upperLimit = currentPrice * (1 + range);
    let level = Math.ceil(currentPrice / increment) * increment;
    
    while (level <= upperLimit) {
      // Adjust confidence based on "roundness"
      let confidence = 0.5; // Base confidence
      
      if (level % 1000 === 0) {
        confidence = 0.9; // Thousand levels (e.g., 5000)
      } else if (level % 500 === 0) {
        confidence = 0.8; // Half-thousand levels (e.g., 5500)
      } else if (level % 100 === 0) {
        confidence = 0.7; // Hundred levels (e.g., 5600)
      } else if (level % 50 === 0) {
        confidence = 0.6; // Half-hundred levels (e.g., 5650)
      }
      
      levels.push(new Level({
        price: level,
        context: 'Round number',
        type: 'ROUND_NUMBER',
        source: 'COMPUTED',
        timeframe: 'DAILY',
        symbol,
        confidence
      }));
      
      level += increment;
    }
    
    // Generate levels below current price
    const lowerLimit = currentPrice * (1 - range);
    level = Math.floor(currentPrice / increment) * increment;
    
    while (level >= lowerLimit) {
      // Skip the current level which was already added above
      if (level === Math.ceil(currentPrice / increment) * increment) {
        level -= increment;
        continue;
      }
      
      // Adjust confidence based on "roundness"
      let confidence = 0.5; // Base confidence
      
      if (level % 1000 === 0) {
        confidence = 0.9; // Thousand levels
      } else if (level % 500 === 0) {
        confidence = 0.8; // Half-thousand levels
      } else if (level % 100 === 0) {
        confidence = 0.7; // Hundred levels
      } else if (level % 50 === 0) {
        confidence = 0.6; // Half-hundred levels
      }
      
      levels.push(new Level({
        price: level,
        context: 'Round number',
        type: 'ROUND_NUMBER',
        source: 'COMPUTED',
        timeframe: 'DAILY',
        symbol,
        confidence
      }));
      
      level -= increment;
    }
    
  } catch (error) {
    console.error(`Error generating round number levels: ${error.message}`);
  }
  
  return levels;
}

/**
 * Combine levels from multiple sources with deduplication and confluence analysis
 * 
 * @param {Object} sources Object containing level arrays from different sources
 * @param {string} symbol Symbol to use
 * @param {number} currentPrice Current price for context
 * @returns {LevelCollection} Combined level collection
 */
function combineLevels(sources, symbol = 'SPX', currentPrice) {
  const collection = new LevelCollection(symbol);
  
  try {
    // Add levels from each source
    for (const [source, levels] of Object.entries(sources)) {
      if (Array.isArray(levels)) {
        collection.addLevels(levels);
      }
    }
    
    // Add round number levels if not enough levels
    if (collection.levels.length < 20) {
      const roundLevels = generateRoundNumberLevels(currentPrice, symbol);
      collection.addLevels(roundLevels);
    }
    
  } catch (error) {
    console.error(`Error combining levels: ${error.message}`);
  }
  
  return collection;
}

/**
 * Full process to extract, combine, and analyze levels
 * 
 * @param {Object} data Object containing analysis data
 * @param {string} symbol Symbol to process
 * @param {number} currentPrice Current price
 * @returns {Object} Processed levels data
 */
function processLevels(data, symbol = 'SPX', currentPrice) {
  try {
    // Extract levels from various sources
    const dpLevels = data.dpAnalysis ? 
      extractLevelsFromDP(data.dpAnalysis, symbol) : [];
    
    const manciniLevels = data.manciniAnalysis ? 
      extractLevelsFromMancini(data.manciniAnalysis, symbol) : [];
    
    const smaLevels = data.smaData ? 
      extractLevelsFromSMA(data.smaData, symbol) : [];
    
    // Combine all levels
    const combinedLevels = combineLevels({
      dp: dpLevels,
      mancini: manciniLevels,
      sma: smaLevels
    }, symbol, currentPrice);
    
    // Generate final level analysis
    return combinedLevels.toJSON(currentPrice);
    
  } catch (error) {
    console.error(`Error processing levels: ${error.message}`);
    return {
      error: error.message,
      symbol,
      current_price: currentPrice,
      last_updated: new Date().toISOString()
    };
  }
}

// Export public API
module.exports = {
  Level,
  LevelCollection,
  extractLevelsFromDP,
  extractLevelsFromMancini,
  extractLevelsFromSMA,
  generateRoundNumberLevels,
  combineLevels,
  processLevels,
  config
};