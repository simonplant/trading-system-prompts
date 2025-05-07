# Utility Integration Guide

## Folder Structure

The utilities we've created fit into your existing folder structure as follows:

```
trading-system-prompts/
├── js/                        # JavaScript utilities folder
│   ├── parameter-loader.js    # Central parameter management
│   ├── path-resolver.js       # Path resolution utilities
│   ├── schema-validator.js    # Schema validation utilities
│   ├── template-processor.js  # Template processing engine
│   └── premarket-pipeline.js  # Premarket workflow automation
├── system/
│   ├── system-parameters.json # Centralized JSON parameters
│   ├── system-parameters.md   # Human-readable parameter documentation (maintained manually)
│   └── ...                    # Other system files
└── ...                        # Existing folders
```

## Parameter Management

1. **One-time Conversion**:
   - We've created `system/system-parameters.json` as the definitive source of configuration
   - The Markdown version (`system-parameters.md`) remains for documentation but is not parsed at runtime
   - All JavaScript utilities reference the JSON version for performance

2. **Parameter Access**:
   - All parameter access is centralized through `js/parameter-loader.js`
   - This provides caching, type conversion, and consistent access patterns
   - Helper methods handle common operations like level conversion

## Integration Steps

### 1. Include Parameter Loader in JavaScript Files

```javascript
// At the top of js files
const { 
  getParameter, 
  getPositionSize, 
  convertEStoSPX 
} = require('./parameter-loader');

// Use parameters in code
const conversionFactor = getParameter('MARKET_CONVERSION_FACTORS.ES_TO_SPX_CONVERSION');
const recommendedSize = getPositionSize('HIGH', 'CASHFLOW');
const spxLevel = convertEStoSPX(4750);
```

### 2. Update Main Controller to Use Parameter Loader

The main controller should be updated to use the parameter loader for:
- Command routing
- Security verification
- System status reporting

### 3. Integrate Schema Validation

Add schema validation calls in key processing points:
- After analyzing DP transcripts
- After analyzing Mancini blueprints
- Before generating unified trade plans

```javascript
const { validateSchema } = require('./schema-validator');

// After processing data
const validationResult = validateSchema(dpAnalysisResult, 'DP');
if (!validationResult.valid) {
  // Handle validation failure
  console.error(`Validation failed: ${validationResult.errors.join(', ')}`);
}
```

### 4. Implement Premarket Pipeline

The premarket pipeline can be integrated as follows:
- Create a CLI script to run the pipeline
- Add integration with the main controller
- Update premarket command handlers to use the pipeline

```javascript
const { PremarketPipeline } = require('./premarket-pipeline');

// In premarket command handler
async function handlePremarketSequence(inputs) {
  const pipeline = new PremarketPipeline();
  const result = await pipeline.run(inputs);
  
  // Return results to user
  return {
    status: result.status,
    outputs: result.results,
    errors: result.errors
  };
}
```

### 5. Use Template Processor for Document Generation

The template processor can be used for all document generation:
- Trade plan summaries
- Performance reports
- Journal entries

```javascript
const { generateFromTemplate } = require('./template-processor');

// Generate a document
const outputPath = await generateFromTemplate(
  'templates/trade-plan.md',
  'logs/trade-plans/2025/2025-05-07-unified-trade-plan.md',
  {
    date: '2025-05-07',
    market_bias: 'BULLISH',
    // ... other template data
  }
);
```

## Maintenance Strategy

### Parameters

1. When parameters need to be updated:
   - Update `system-parameters.json` directly
   - Mirror changes in `system-parameters.md` for documentation

2. For major parameter structure changes:
   - Update `parameter-loader.js` with new access methods
   - Add migration logic if needed

### Schema Updates

1. When schemas are updated:
   - Update JSON schema files directly
   - Update `schema-validator.js` with new validation logic
   - Update schema version in `system-parameters.json`

## Benefits of This Approach

1. **Performance**: No runtime Markdown parsing
2. **Type Safety**: Structured JSON with validation
3. **Consistency**: Centralized parameter access
4. **Maintainability**: Clear separation of concerns
5. **Documentation**: Human-readable Markdown alongside structured JSON

By following this integration guide, your trading system will have a solid foundation for efficient morning sessions with minimal manual intervention.
