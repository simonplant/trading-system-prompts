/**
 * js/premarket-pipeline.js
 * 
 * Streamlined premarket analysis pipeline for efficient morning sessions
 * 
 * @version 1.0
 * @author Trading System
 * @last_updated 2025-05-07
 */

const fs = require('fs').promises;
const path = require('path');
const { resolvePath, resolveTemplatePath, validateFilePath } = require('./path-resolver');
const { validateSchema } = require('./schema-validator');
const { processTemplate, generateFromTemplate } = require('./template-processor');

// Import system parameters
const systemParameters = require('../system/system-parameters.json');

/**
 * Premarket Pipeline Manager
 * Streamlines the premarket analysis workflow by chaining components
 * and handling dependencies, caching, and error recovery
 */
class PremarketPipeline {
  constructor(options = {}) {
    this.options = {
      cacheEnabled: true,
      parallelProcessing: true,
      errorRecovery: true,
      ...options
    };
    
    // Cache for intermediate results
    this.cache = {};
    
    // Pipeline state
    this.state = {
      status: 'idle',
      currentPhase: null,
      errors: [],
      results: {},
      startTime: null,
      endTime: null
    };
    
    // Pipeline phases
    this.phases = [
      'initialize',
      'analyze_dp',
      'analyze_mancini',
      'get_levels',
      'generate_trade_plan',
      'finalize'
    ];
  }
  
  /**
   * Run the complete premarket pipeline
   * 
   * @param {object} inputs - Pipeline inputs
   * @returns {Promise<object>} - Pipeline results
   */
  async run(inputs = {}) {
    try {
      this.state.status = 'running';
      this.state.startTime = new Date();
      this.state.errors = [];
      
      // Initialize context with inputs
      const context = {
        inputs,
        results: {},
        errors: [],
        warnings: [],
        timestamp: new Date().toISOString()
      };
      
      // Execute each phase
      for (const phase of this.phases) {
        this.state.currentPhase = phase;
        
        // Check if phase can be skipped (if result exists in cache)
        if (this.canSkipPhase(phase, context)) {
          console.log(`Skipping phase: ${phase} (using cached result)`);
          continue;
        }
        
        console.log(`Executing phase: ${phase}`);
        
        try {
          // Execute the phase
          const phaseMethod = this[`phase_${phase}`];
          if (typeof phaseMethod === 'function') {
            await phaseMethod.call(this, context);
          } else {
            throw new Error(`Unknown phase method: phase_${phase}`);
          }
          
          // Cache the result
          if (this.options.cacheEnabled) {
            this.cachePhaseResult(phase, context);
          }
        } catch (error) {
          context.errors.push({
            phase,
            message: error.message,
            stack: error.stack
          });
          
          // Handle error based on configuration
          if (!this.options.errorRecovery) {
            throw error;
          }
          
          console.error(`Error in phase ${phase}: ${error.message}`);
        }
      }
      
      // Set pipeline state to completed
      this.state.status = 'completed';
      this.state.endTime = new Date();
      this.state.results = context.results;
      
      // Return the final context
      return {
        status: context.errors.length === 0 ? 'success' : 'completed_with_errors',
        results: context.results,
        errors: context.errors,
        warnings: context.warnings,
        executionTime: this.state.endTime - this.state.startTime
      };
    } catch (error) {
      // Set pipeline state to failed
      this.state.status = 'failed';
      this.state.endTime = new Date();
      this.state.errors.push(error.message);
      
      throw error;
    }
  }
  
  /**
   * Check if a phase can be skipped (cached result available)
   * 
   * @param {string} phase - Pipeline phase
   * @param {object} context - Pipeline context
   * @returns {boolean} - True if phase can be skipped
   */
  canSkipPhase(phase, context) {
    if (!this.options.cacheEnabled) {
      return false;
    }
    
    // Check if result exists in cache
    if (!this.cache[phase]) {
      return false;
    }
    
    // Add cached result to context
    context.results[phase] = this.cache[phase].result;
    
    return true;
  }
  
  /**
   * Cache the result of a phase
   * 
   * @param {string} phase - Pipeline phase 
   * @param {object} context - Pipeline context
   */
  cachePhaseResult(phase, context) {
    if (!context.results[phase]) {
      return;
    }
    
    this.cache[phase] = {
      timestamp: new Date(),
      result: context.results[phase]
    };
  }
  
  /**
   * Initialize the pipeline
   * 
   * @param {object} context - Pipeline context
   */
  async phase_initialize(context) {
    // Validate inputs
    if (!context.inputs) {
      throw new Error('No inputs provided');
    }
    
    // Create timestamp for this run
    const now = new Date();
    const timestamp = now.toISOString();
    const dateStr = now.toISOString().split('T')[0];
    
    // Setup output directories
    const outputDirs = [
      path.resolve(process.cwd(), `logs/trade-plans/${dateStr.substring(0, 4)}`),
      path.resolve(process.cwd(), `logs/levels/${dateStr.substring(0, 4)}`)
    ];
    
    // Create output directories if they don't exist
    for (const dir of outputDirs) {
      try {
        await fs.mkdir(dir, { recursive: true });
      } catch (error) {
        context.warnings.push(`Failed to create directory: ${dir}`);
      }
    }
    
    // Store initialization results
    context.results.initialize = {
      timestamp,
      dateStr,
      outputDirs
    };
  }
  
  /**
   * Analyze DP morning call
   * 
   * @param {object} context - Pipeline context
   */
  async phase_analyze_dp(context) {
    // Skip if no DP transcript
    if (!context.inputs.dpTranscript) {
      context.warnings.push('No DP transcript provided, skipping DP analysis');
      return;
    }
    
    try {
      // Get analyzer path
      const analyzerPath = resolvePath('ANALYZER_PATHS.DP');
      
      // Read analyzer template
      const analyzerTemplate = await fs.readFile(analyzerPath, 'utf8');
      
      // Process the DP transcript
      // In a real implementation, this would call an AI service
      // Here we'll simulate the result
      const dpAnalysisResult = {
        metadata: {
          source: "dp",
          timestamp: new Date().toISOString(),
          version: "2.0"
        },
        TRADE_DATA: [
          {
            ticker: "SPY",
            direction: "LONG",
            confidence: "HIGH",
            duration: "SWING",
            position_size: "FULL",
            trigger_type: "exact",
            levels: {
              entry: 475.50,
              target: [480, 485],
              stop: 470
            }
          }
        ],
        MARKET_BIAS: {
          overall: "BULLISH",
          key_levels: {
            SPX: [4750, 4775, 4800],
            QQQ: [380, 385, 390],
            SPY: [475, 480, 485],
            ES: [4740, 4765, 4790]
          }
        },
        COACHING_INSIGHTS: {
          risk_management: [
            "Size appropriately in this volatile environment"
          ],
          timing_advice: [
            "Wait for confirmation before entering"
          ],
          market_condition_warnings: [
            "Watch for FOMC volatility"
          ]
        }
      };
      
      // Validate the result
      const validationResult = validateSchema(dpAnalysisResult, 'DP');
      if (!validationResult.valid) {
        throw new Error(`DP analysis validation failed: ${validationResult.errors.join(', ')}`);
      }
      
      // Generate DP summary
      const dateStr = context.results.initialize.dateStr;
      const dpSummaryPath = path.resolve(process.cwd(), `logs/trade-plans/${dateStr.substring(0, 4)}/${dateStr}-dp-trade-plan.md`);
      
      // Get summary generator path
      const summaryPath = resolvePath('SUMMARY_PATHS.DP');
      
      // Read summary template 
      const summaryTemplate = await fs.readFile(summaryPath, 'utf8');
      
      // Generate the summary
      await generateFromTemplate(summaryPath, dpSummaryPath, {
        dpAnalysis: dpAnalysisResult,
        date: dateStr
      });
      
      // Store DP analysis results
      context.results.analyze_dp = {
        analysis: dpAnalysisResult,
        summaryPath: dpSummaryPath
      };
    } catch (error) {
      throw new Error(`DP analysis failed: ${error.message}`);
    }
  }
  
  /**
   * Analyze Mancini blueprint
   * 
   * @param {object} context - Pipeline context
   */
  async phase_analyze_mancini(context) {
    // Skip if no Mancini blueprint
    if (!context.inputs.manciniBlueprint) {
      context.warnings.push('No Mancini blueprint provided, skipping Mancini analysis');
      return;
    }
    
    try {
      // Get analyzer path
      const analyzerPath = resolvePath('ANALYZER_PATHS.MANCINI');
      
      // Read analyzer template
      const analyzerTemplate = await fs.readFile(analyzerPath, 'utf8');
      
      // Process the Mancini blueprint
      // In a real implementation, this would call an AI service
      // Here we'll simulate the result
      const manciniAnalysisResult = {
        metadata: {
          source: "mancini",
          timestamp: new Date().toISOString(),
          version: "2.0",
          es_to_spx_conversion: -20
        },
        TECHNICAL_DATA: {
          market_structure: {
            regime: "BUY_DIPS",
            current_pattern: "Bull flag",
            day_streak: "3 up days",
            key_structures: ["Bull flag", "Higher lows"]
          },
          control_lines: {
            bull_above: ["4750 hourly closing basis"],
            bear_below: ["4700 hourly closing basis"],
            decision_point: "4725"
          },
          levels: {
            structure_levels: [
              {level: "4750", context: "Prior high", origin: "May 3"}
            ],
            magnets: [
              {level: "4800", context: "Psychological level"}
            ]
          },
          support_resistance: {
            major_resistance: [
              {level: "4750", context: "Prior high"}
            ],
            minor_resistance: [
              {level: "4735", context: "Intraday high May 6"}
            ],
            trading_range: {
              high: "4750",
              low: "4700"
            },
            minor_support: [
              {level: "4715", context: "Intraday low May 6"}
            ],
            major_support: [
              {level: "4700", context: "Round number"}
            ]
          }
        },
        TRADE_DATA: [
          {
            ticker: "SPX",
            direction: "LONG",
            confidence: "HIGH",
            duration: "CASHFLOW",
            position_size: "FULL",
            trigger_type: "exact",
            setup_type: "FAILED_BREAKDOWN",
            levels: {
              entry: 4725,
              target: [4750, 4775],
              stop: 4700
            },
            acceptance: {
              type: "RECLAIM",
              pattern: "Reclaim 4725 with 15-min close"
            }
          }
        ],
        MARKET_BIAS: {
          overall: "BULLISH",
          market_regime: "trending",
          volume_profile: "above_average"
        },
        MARKET_ANALYSIS: {
          previous_session: {
            summary: "Bullish day with strong close",
            key_developments: ["Broke above 4700", "Closed near highs"]
          },
          next_session_outlook: {
            scenarios: [
              {
                condition: "Break above 4750",
                outcome: "Quick move to 4800",
                probability: "60%"
              },
              {
                condition: "Break below 4700",
                outcome: "Retest of 4650",
                probability: "30%"
              }
            ]
          },
          invalidation_signals: {
            structural: ["Hourly close below 4700"],
            timing: ["No breakout by 11:00 AM"]
          }
        }
      };
      
      // Validate the result
      const validationResult = validateSchema(manciniAnalysisResult, 'MANCINI');
      if (!validationResult.valid) {
        throw new Error(`Mancini analysis validation failed: ${validationResult.errors.join(', ')}`);
      }
      
      // Generate Mancini summary
      const dateStr = context.results.initialize.dateStr;
      const manciniSummaryPath = path.resolve(process.cwd(), `logs/trade-plans/${dateStr.substring(0, 4)}/${dateStr}-mancini-trade-plan.md`);
      
      // Get summary generator path
      const summaryPath = resolvePath('SUMMARY_PATHS.MANCINI');
      
      // Generate the summary
      await generateFromTemplate(summaryPath, manciniSummaryPath, {
        manciniAnalysis: manciniAnalysisResult,
        date: dateStr
      });
      
      // Store Mancini analysis results
      context.results.analyze_mancini = {
        analysis: manciniAnalysisResult,
        summaryPath: manciniSummaryPath
      };
    } catch (error) {
      throw new Error(`Mancini analysis failed: ${error.message}`);
    }
  }
  
  /**
   * Get market levels
   * 
   * @param {object} context - Pipeline context
   */
  async phase_get_levels(context) {
    try {
      // Get levels from inputs or fetch from market data
      let levels = context.inputs.levels || {
        ES: [4740, 4765, 4790],
        SPX: [4750, 4775, 4800],
        QQQ: [380, 385, 390],
        SPY: [475, 480, 485],
        VIX: [15, 17.5, 20]
      };
      
      // Apply ES to SPX conversion if needed
      if (context.results.analyze_mancini && context.results.analyze_mancini.analysis.metadata.es_to_spx_conversion) {
        const conversion = context.results.analyze_mancini.analysis.metadata.es_to_spx_conversion;
        
        // Only convert if ES levels exist
        if (levels.ES) {
          // Create SPX levels based on ES levels if SPX levels don't exist
          if (!levels.SPX) {
            levels.SPX = levels.ES.map(level => level + conversion);
          }
        }
      }
      
      // Store levels
      const dateStr = context.results.initialize.dateStr;
      const levelsPath = path.resolve(process.cwd(), `logs/levels/${dateStr.substring(0, 4)}/${dateStr}-spx-levels.md`);
      
      // Write levels to file
      await fs.writeFile(levelsPath, `# Market Levels - ${dateStr}\n\n` + 
        Object.entries(levels).map(([key, value]) => `## ${key}\n${value.join(', ')}`).join('\n\n'));
      
      // Store levels in context
      context.results.get_levels = {
        levels,
        levelsPath
      };
    } catch (error) {
      throw new Error(`Get levels failed: ${error.message}`);
    }
  }
  
  /**
   * Generate unified trade plan
   * 
   * @param {object} context - Pipeline context
   */
  async phase_generate_trade_plan(context) {
    try {
      // Check if we have DP analysis and Mancini analysis
      const hasDP = !!context.results.analyze_dp;
      const hasMancini = !!context.results.analyze_mancini;
      
      if (!hasDP && !hasMancini) {
        context.warnings.push('No DP or Mancini analysis available, skipping unified trade plan generation');
        return;
      }
      
      // Combine data for unified plan
      const unifiedInputData = {
        DP_DATA: hasDP ? context.results.analyze_dp.analysis : null,
        MANCINI_DATA: hasMancini ? context.results.analyze_mancini.analysis : null,
        MARKET_CONTEXT: {
          current_levels: context.results.get_levels ? context.results.get_levels.levels : null,
          timestamp: new Date().toISOString(),
          economic_events: context.inputs.economicEvents || []
        }
      };
      
      // Get unified plan generator path
      const unifiedPlanPath = resolvePath('SUMMARY_PATHS.UNIFIED');
      
      // Generate unified trade plan
      // In a real implementation, this would call an AI service
      // Here we'll simulate the result
      const unifiedPlan = {
        date: context.results.initialize.dateStr,
        market_bias: "BULLISH",
        market_summary: "Bull flag formation with strong momentum and supportive technicals.",
        priority_focus: {
          critical_level: "SPX 4750",
          first_action: "Watch for 4725 reclaim for long entry",
          event_focus: "FOMC minutes at 2:00 PM",
          risk_alert: "Invalidation on hourly close below 4700"
        },
        trade_plan: {
          core_positions: [
            {
              ticker: "SPY",
              direction: "LONG",
              conviction: "HIGH",
              duration: "SWING",
              size: "FULL",
              setup: "Bullish continuation",
              trigger: "Break above 476",
              entry: 476.50,
              targets: [480, 485, 490],
              stop: 470,
              notes: "Aligned with DP's high conviction SPY long"
            }
          ],
          intraday_setups: [
            {
              ticker: "SPX",
              direction: "LONG",
              conviction: "HIGH",
              duration: "CASHFLOW",
              size: "FULL",
              setup: "Failed breakdown reclaim",
              trigger: "Reclaim 4725 with 15-min close",
              entry: 4725,
              targets: [4750, 4775],
              stop: 4700,
              timing: "Primary window (9:45-11:00 AM)",
              notes: "Mancini's primary setup"
            }
          ]
        },
        risk_management: [
          "Size appropriately in this volatile environment",
          "Use 2% account risk per position",
          "Take partial profits at first target"
        ],
        key_events: [
          {
            time: "14:00",
            event: "FOMC Minutes",
            implications: "Potential volatility increase"
          }
        ],
        trade_management: [
          "Move to breakeven after 50% to first target",
          "Take 1/2 position off at first target",
          "Trail remainder with 15-min chart"
        ]
      };
      
      // Generate unified plan document
      const dateStr = context.results.initialize.dateStr;
      const unifiedPlanDocPath = path.resolve(process.cwd(), `logs/trade-plans/${dateStr.substring(0, 4)}/${dateStr}-unified-trade-plan.md`);
      
      // Create a template string for the unified plan
      const unifiedPlanTemplate = `
# UNIFIED TRADE PLAN — {{date}}

MARKET BIAS: {{market_bias}}
{{market_summary}}

5-MINUTE PRIORITY FOCUS:
• Critical Level: {{priority_focus.critical_level}}
• First Action: {{priority_focus.first_action}}
• Event Focus: {{priority_focus.event_focus}}
• Risk Alert: {{priority_focus.risk_alert}}

TRADE EXECUTION PLAN:

{{#if trade_plan.core_positions}}
CORE POSITIONS:
{{#each trade_plan.core_positions}}
1. {{item.ticker}} {{item.direction}} ({{item.conviction}}/{{item.duration}}/{{item.size}})
   SETUP: {{item.setup}}
   TRIGGER: {{item.trigger}}
   LEVELS: Entry {{item.entry}} → Targets {{item.targets}} → Stop {{item.stop}}
   NOTES: {{item.notes}}
{{/each}}
{{/if}}

{{#if trade_plan.intraday_setups}}
INTRADAY SETUPS:
{{#each trade_plan.intraday_setups}}
1. {{item.ticker}} {{item.direction}} ({{item.conviction}}/{{item.duration}}/{{item.size}})
   SETUP: {{item.setup}}
   TRIGGER: {{item.trigger}}
   LEVELS: Entry {{item.entry}} → Targets {{item.targets}} → Stop {{item.stop}}
   TIMING: {{item.timing}}
   NOTES: {{item.notes}}
{{/each}}
{{/if}}

RISK MANAGEMENT PROTOCOL:
{{#each risk_management}}
• {{item}}
{{/each}}

KEY EVENTS:
{{#each key_events}}
• {{item.time}}: {{item.event}} – {{item.implications}}
{{/each}}

TRADE MANAGEMENT RULES:
{{#each trade_management}}
• {{item}}
{{/each}}
      `;
      
      // Write the unified plan using the template
      await fs.writeFile(unifiedPlanDocPath, unifiedPlanTemplate
        .replace('{{date}}', unifiedPlan.date)
        .replace('{{market_bias}}', unifiedPlan.market_bias)
        .replace('{{market_summary}}', unifiedPlan.market_summary)
        .replace('{{priority_focus.critical_level}}', unifiedPlan.priority_focus.critical_level)
        .replace('{{priority_focus.first_action}}', unifiedPlan.priority_focus.first_action)
        .replace('{{priority_focus.event_focus}}', unifiedPlan.priority_focus.event_focus)
        .replace('{{priority_focus.risk_alert}}', unifiedPlan.priority_focus.risk_alert)
        // For simplicity, we're manually replacing the template variables
        // In a real implementation, you would use a proper template engine
      );
      
      // Store unified plan in context
      context.results.generate_trade_plan = {
        unifiedPlan,
        unifiedPlanDocPath
      };
    } catch (error) {
      throw new Error(`Generate unified trade plan failed: ${error.message}`);
    }
  }
  
  /**
   * Finalize the pipeline
   * 
   * @param {object} context - Pipeline context
   */
  async phase_finalize(context) {
    try {
      // Generate final report
      const report = {
        timestamp: new Date().toISOString(),
        executionTime: new Date() - new Date(context.results.initialize.timestamp),
        phases: Object.keys(context.results),
        errors: context.errors,
        warnings: context.warnings,
        outputs: {
          dp: context.results.analyze_dp ? context.results.analyze_dp.summaryPath : null,
          mancini: context.results.analyze_mancini ? context.results.analyze_mancini.summaryPath : null,
          levels: context.results.get_levels ? context.results.get_levels.levelsPath : null,
          unifiedPlan: context.results.generate_trade_plan ? context.results.generate_trade_plan.unifiedPlanDocPath : null
        }
      };
      
      // Store report
      const dateStr = context.results.initialize.dateStr;
      const reportPath = path.resolve(process.cwd(), `logs/trade-plans/${dateStr.substring(0, 4)}/${dateStr}-pipeline-report.json`);
      
      // Write report to file
      await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
      
      // Store report in context
      context.results.finalize = {
        report,
        reportPath
      };
    } catch (error) {
      throw new Error(`Finalize failed: ${error.message}`);
    }
  }
}

module.exports = {
  PremarketPipeline
};
