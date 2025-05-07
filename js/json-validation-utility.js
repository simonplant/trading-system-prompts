/**
 * JSON Validation Utility
 * 
 * Provides robust validation for trading system JSON data structures
 * against defined schemas with detailed error reporting and recovery options.
 * 
 * @version 1.2.0
 * @author Simon Plant
 * @updated 2025-05-07
 */

// Import required dependencies
const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

// Create validator instance with all options
const ajv = new Ajv({
  allErrors: true,
  verbose: true,
  $data: true,
  strict: false
});
addFormats(ajv);

/**
 * Configuration for the validation utility
 */
const config = {
  schemaDirectory: path.resolve(__dirname, '../system'),
  errorLogPath: path.resolve(__dirname, '../logs/errors/json-validation-errors.log'),
  maxLogSize: 5 * 1024 * 1024, // 5MB
  enableConsoleOutput: true,
  maxRetries: 3,
  retryDelayMs: 500
};

/**
 * Cached schema objects to avoid repeated disk reads
 */
const schemaCache = {};

/**
 * Load schema from file or cache
 * 
 * @param {string} schemaName - Name of the schema file without extension
 * @returns {Object} Loaded schema
 * @throws {Error} If schema file cannot be found or parsed
 */
function loadSchema(schemaName) {
  // Return from cache if available
  if (schemaCache[schemaName]) {
    return schemaCache[schemaName];
  }
  
  // Construct full path and check if exists
  const schemaPath = path.join(config.schemaDirectory, `${schemaName}.json`);
  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Schema file not found: ${schemaPath}`);
  }
  
  try {
    // Load and parse schema
    const schemaContent = fs.readFileSync(schemaPath, 'utf8');
    const schema = JSON.parse(schemaContent);
    
    // Add to cache and return
    schemaCache[schemaName] = schema;
    return schema;
  } catch (error) {
    throw new Error(`Failed to load schema ${schemaName}: ${error.message}`);
  }
}

/**
 * Format validation errors into a readable structure
 * 
 * @param {Array} errors - Array of validation errors from AJV
 * @returns {Array} Formatted error objects
 */
function formatErrors(errors) {
  if (!errors || errors.length === 0) {
    return [];
  }
  
  return errors.map(error => ({
    path: error.instancePath || '(root)',
    keyword: error.keyword,
    message: error.message,
    params: error.params,
    schemaPath: error.schemaPath
  }));
}

/**
 * Log validation errors for debugging
 * 
 * @param {string} schemaName - Name of the schema file
 * @param {Array} errors - Formatted error objects
 */
function logValidationErrors(schemaName, errors) {
  if (!errors || errors.length === 0) {
    return;
  }
  
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] Validation errors for ${schemaName}:\n${JSON.stringify(errors, null, 2)}\n\n`;
  
  // Console output if enabled
  if (config.enableConsoleOutput) {
    console.error(logMessage);
  }
  
  // File logging
  try {
    // Check if log file exists and is too large
    if (fs.existsSync(config.errorLogPath)) {
      const stats = fs.statSync(config.errorLogPath);
      if (stats.size > config.maxLogSize) {
        // Rotate log file
        const backupPath = `${config.errorLogPath}.bak`;
        if (fs.existsSync(backupPath)) {
          fs.unlinkSync(backupPath);
        }
        fs.renameSync(config.errorLogPath, backupPath);
      }
    }
    
    // Ensure directory exists
    const logDir = path.dirname(config.errorLogPath);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    
    // Append to log file
    fs.appendFileSync(config.errorLogPath, logMessage);
  } catch (error) {
    console.error(`Failed to log validation errors: ${error.message}`);
  }
}

/**
 * Validate data against specified schema
 * 
 * @param {Object} data - Data to validate
 * @param {string} schemaName - Name of the schema to validate against
 * @returns {Object} Validation result with valid flag and errors
 */
function validateJson(data, schemaName) {
  try {
    // Load schema
    const schema = loadSchema(schemaName);
    
    // Compile validator if not already in cache
    const validator = ajv.getSchema(schemaName) || ajv.compile(schema);
    
    // Validate data
    const valid = validator(data);
    const errors = formatErrors(validator.errors);
    
    // Log any errors
    if (!valid) {
      logValidationErrors(schemaName, errors);
    }
    
    return {
      valid,
      errors,
      schema: schemaName
    };
  } catch (error) {
    return {
      valid: false,
      errors: [{ path: '(validator)', message: error.message }],
      schema: schemaName
    };
  }
}

/**
 * Attempt to fix common JSON errors
 * 
 * @param {string|Object} data - JSON string or object to fix
 * @returns {Object} Fixed data object
 * @throws {Error} If data cannot be fixed
 */
function fixCommonJsonErrors(data) {
  // If data is already an object, return it
  if (typeof data === 'object' && data !== null) {
    return data;
  }
  
  // If data is a string, try to parse it
  if (typeof data === 'string') {
    try {
      // Try standard JSON.parse first
      return JSON.parse(data);
    } catch (e) {
      // Fix common JSON formatting errors
      try {
        // Replace single quotes with double quotes
        let fixedJson = data.replace(/'/g, '"');
        
        // Fix unquoted property names
        fixedJson = fixedJson.replace(/(\w+):/g, '"$1":');
        
        // Remove trailing commas
        fixedJson = fixedJson.replace(/,\s*([\]}])/g, '$1');
        
        // Try parsing again
        return JSON.parse(fixedJson);
      } catch (fixError) {
        throw new Error(`Failed to parse JSON: ${fixError.message}`);
      }
    }
  }
  
  throw new Error('Invalid data type: must be object or string');
}

/**
 * Extract required fields according to schema
 * 
 * @param {Object} data - Data object to extract from
 * @param {string} schemaName - Name of the schema
 * @returns {Object} Object containing only required fields
 */
function extractRequiredFields(data, schemaName) {
  try {
    const schema = loadSchema(schemaName);
    const requiredFields = schema.required || [];
    
    // Create new object with only required fields
    const result = {};
    for (const field of requiredFields) {
      if (data.hasOwnProperty(field)) {
        result[field] = data[field];
      }
    }
    
    return result;
  } catch (error) {
    console.error(`Failed to extract required fields: ${error.message}`);
    return data;
  }
}

/**
 * Create a default object based on schema with required fields
 * 
 * @param {string} schemaName - Name of the schema
 * @returns {Object} Default object with required fields initialized
 */
function createDefaultObject(schemaName) {
  try {
    const schema = loadSchema(schemaName);
    const result = {};
    
    // Add required fields with default values
    if (schema.required && schema.properties) {
      for (const field of schema.required) {
        const propSchema = schema.properties[field];
        if (propSchema) {
          // Set appropriate default value based on type
          switch (propSchema.type) {
            case 'string':
              result[field] = propSchema.default || '';
              break;
            case 'number':
              result[field] = propSchema.default || 0;
              break;
            case 'boolean':
              result[field] = propSchema.default || false;
              break;
            case 'array':
              result[field] = propSchema.default || [];
              break;
            case 'object':
              result[field] = propSchema.default || {};
              break;
            default:
              result[field] = null;
          }
        }
      }
    }
    
    return result;
  } catch (error) {
    console.error(`Failed to create default object: ${error.message}`);
    return {};
  }
}

/**
 * Validate and fix JSON data with retry logic
 * 
 * @param {Object|string} data - Data to validate and fix
 * @param {string} schemaName - Name of the schema
 * @param {Object} options - Additional options
 * @returns {Object} Validation result with fixed data if applicable
 */
async function validateAndFix(data, schemaName, options = {}) {
  const opts = {
    maxRetries: options.maxRetries || config.maxRetries,
    retryDelay: options.retryDelay || config.retryDelayMs,
    autoFix: options.autoFix !== undefined ? options.autoFix : true
  };
  
  let attemptCount = 0;
  let lastError = null;
  let fixedData = data;
  
  while (attemptCount < opts.maxRetries) {
    try {
      // Try to fix common JSON errors
      if (opts.autoFix) {
        fixedData = fixCommonJsonErrors(fixedData);
      }
      
      // Validate the fixed data
      const result = validateJson(fixedData, schemaName);
      
      // If valid, return success
      if (result.valid) {
        return {
          valid: true,
          data: fixedData,
          schema: schemaName,
          fixed: fixedData !== data,
          errors: []
        };
      }
      
      // Track errors and retry with fixes if possible
      lastError = result.errors;
      
      // Apply automatic fixes if enabled
      if (opts.autoFix) {
        // Replace with defaults for missing required fields
        const defaultObject = createDefaultObject(schemaName);
        for (const key in defaultObject) {
          if (!fixedData.hasOwnProperty(key)) {
            fixedData[key] = defaultObject[key];
          }
        }
      }
      
      // Delay before retry
      await new Promise(resolve => setTimeout(resolve, opts.retryDelay));
      attemptCount++;
    } catch (error) {
      lastError = [{ path: '(fix)', message: error.message }];
      attemptCount++;
      await new Promise(resolve => setTimeout(resolve, opts.retryDelay));
    }
  }
  
  // Extract required fields as a last resort
  if (opts.autoFix) {
    try {
      const requiredOnly = extractRequiredFields(fixedData, schemaName);
      const finalResult = validateJson(requiredOnly, schemaName);
      
      if (finalResult.valid) {
        return {
          valid: true,
          data: requiredOnly,
          schema: schemaName,
          fixed: true,
          partial: true,
          errors: []
        };
      }
      
      return {
        valid: false,
        data: fixedData,
        schema: schemaName,
        errors: finalResult.errors,
        attempted: true
      };
    } catch (error) {
      // Fall through to error case
    }
  }
  
  // Return error after all retries failed
  return {
    valid: false,
    data: fixedData,
    schema: schemaName,
    errors: lastError,
    attempted: true
  };
}

/**
 * Merge multiple validated JSON objects
 * 
 * @param {Array<Object>} objects - Array of validated objects
 * @param {string} schemaName - Schema to validate the merged result
 * @returns {Object} Merged object
 */
function mergeValidatedObjects(objects, schemaName) {
  if (!Array.isArray(objects) || objects.length === 0) {
    return createDefaultObject(schemaName);
  }
  
  // Start with an empty result
  const result = {};
  
  // Merge all objects
  for (const obj of objects) {
    if (typeof obj === 'object' && obj !== null) {
      Object.assign(result, obj);
    }
  }
  
  // Validate merged result
  const validation = validateJson(result, schemaName);
  
  // If invalid, log the errors
  if (!validation.valid) {
    logValidationErrors(schemaName, validation.errors);
  }
  
  return result;
}

/**
 * Get schema definition for documentation
 * 
 * @param {string} schemaName - Name of the schema
 * @returns {Object} Human-readable schema properties
 */
function getSchemaDefinition(schemaName) {
  try {
    const schema = loadSchema(schemaName);
    
    // Extract relevant documentation
    return {
      title: schema.title || schemaName,
      description: schema.description || '',
      requiredFields: schema.required || [],
      properties: Object.keys(schema.properties || {}).map(key => ({
        name: key,
        type: schema.properties[key].type,
        description: schema.properties[key].description || '',
        required: (schema.required || []).includes(key),
        enum: schema.properties[key].enum,
        format: schema.properties[key].format
      }))
    };
  } catch (error) {
    console.error(`Failed to get schema definition: ${error.message}`);
    return { title: schemaName, description: 'Error loading schema', properties: [] };
  }
}

// Export public API
module.exports = {
  validateJson,
  validateAndFix,
  fixCommonJsonErrors,
  extractRequiredFields,
  createDefaultObject,
  mergeValidatedObjects,
  getSchemaDefinition,
  config
};