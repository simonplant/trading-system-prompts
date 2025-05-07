# Main Controller Integration Example

Below is an example of how to update your `main-controller.md` prompt to leverage the new JavaScript utilities for more efficient processing.

```javascript
// Near the top of the controller logic section, add imports for the utilities
const { 
  getParameter, 
  getPositionSize, 
  getCommandPath 
} = require('./js/parameter-loader');

const { validateSchema } = require('./js/schema-validator');
const { resolvePath, resolveTemplatePath } = require('./js/path-resolver');
const { PremarketPipeline } = require('./js/premarket-pipeline');

// In the command routing section, replace hardcoded paths with dynamic resolution
function routeCommand(command, phase) {
  const commandPath = getCommandPath(command, phase);
  if (!commandPath) {
    throw new Error(`Unknown command: ${command} in phase ${phase}`);
  }
  
  return commandPath;
}

// In the premarket sequence handler
async function handlePremarketSequence(inputs) {
  // Use the premarket pipeline for streamlined processing
  const pipeline = new PremarketPipeline({
    cacheEnabled: true,
    parallelProcessing: true
  });
  
  try {
    const result = await pipeline.run(inputs);
    
    // Return success with generated plan paths
    return {
      status: 'success',
      message: 'Premarket sequence completed successfully',
      outputs: {
        dpSummary: result.results.analyze_dp?.summaryPath,
        manciniSummary: result.results.analyze_mancini?.summaryPath,
        unifiedPlan: result.results.generate_trade_plan?.unifiedPlanDocPath
      }
    };
  } catch (error) {
    // Handle error with specific details
    return {
      status: 'error',
      message: `Premarket sequence failed: ${error.message}`,
      errors: pipeline.state.errors
    };
  }
}

// In the validation logic for trade ideas
function validateTradeIdea(tradeIdea) {
  const validationResult = validateSchema(tradeIdea, 'TRADE_IDEA');
  
  if (!validationResult.valid) {
    return {
      valid: false,
      errors: validationResult.errors
    };
  }
  
  // Enhance trade idea with position sizing recommendation
  if (!tradeIdea.position_size) {
    tradeIdea.position_size = getPositionSize(
      tradeIdea.confidence,
      tradeIdea.duration
    );
  }
  
  return {
    valid: true,
    enhancedTradeIdea: tradeIdea
  };
}

// In the system status handler
function getSystemStatus() {
  return {
    status: 'active',
    version: getParameter('SCHEMA_VERSIONS.CONTROLLER_VERSION', '2.5'),
    timestamp: new Date().toISOString(),
    parameters: {
      updated: getParameter('last_updated', 'unknown'),
      version: getParameter('SCHEMA_VERSIONS.SYSTEM_PARAMETERS_VERSION', '1.1')
    },
    trading: {
      phase: getCurrentTradingPhase(),
      window: isInTradingWindow() ? 'active' : 'inactive'
    }
  };
}

// Helper to determine if current time is in trading window
function isInTradingWindow() {
  const now = new Date();
  const currentTime = now.getHours() * 100 + now.getMinutes();
  
  const startStr = getParameter('TIMING_PARAMETERS.PRIMARY_TRADING_WINDOW_START', '09:45:00');
  const endStr = getParameter('TIMING_PARAMETERS.PRIMARY_TRADING_WINDOW_END', '15:30:00');
  
  const start = parseInt(startStr.split(':').slice(0, 2).join(''));
  const end = parseInt(endStr.split(':').slice(0, 2).join(''));
  
  return currentTime >= start && currentTime <= end;
}

// Helper to determine current trading phase
function getCurrentTradingPhase() {
  const now = new Date();
  const currentHour = now.getHours();
  
  if (currentHour < 9 || (currentHour === 9 && now.getMinutes() < 30)) {
    return 'premarket';
  } else if (currentHour < 16) {
    return 'intraday';
  } else {
    return 'postmarket';
  }
}
```

## Implementation Notes

1. **JavaScript Integration:**  
   The AI assistant cannot directly execute JavaScript code, but this example provides a template for how your main controller should interface with the JavaScript utilities. This would be implemented as a node.js application that wraps around the controller functionality.

2. **Command Execution Flow:**
   - User submits command through AI interface
   - AI processes command and identifies required function
   - AI constructs payload for JavaScript utilities
   - JavaScript utilities perform processing
   - Results are returned to AI for formatting and display

3. **Execution Options:**

   **Option A: Direct Node.js Application**
   - Implement main controller as a Node.js application
   - Use JavaScript utilities directly
   - Call AI services for analysis as needed

   **Option B: Hybrid AI + JavaScript Approach**
   - Keep main controller in AI interface
   - Use API calls to trigger JavaScript utility execution
   - Pass results back to AI for interpretation and response

4. **Parameter Access:**
   The example uses the parameter loader throughout to ensure consistent access to configuration values, replacing hardcoded values with centralized parameters.

5. **Schema Validation:**
   Trade ideas and analysis results are validated to ensure data integrity before processing, helping to catch errors early.

By implementing this integration approach, your system will maintain the flexibility of AI-driven decision making while gaining the performance and structure benefits of JavaScript-based utilities.
