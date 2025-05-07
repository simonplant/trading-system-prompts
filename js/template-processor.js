/**
 * js/template-processor.js
 * 
 * Template processing engine for generating standardized outputs
 * 
 * @version 1.0
 * @author Trading System
 * @last_updated 2025-05-07
 */

const fs = require('fs').promises;
const path = require('path');
const { resolvePath, resolveTemplatePath } = require('./path-resolver');

/**
 * Processes a template with provided data
 * 
 * @param {string} templatePath - Path to the template file
 * @param {object} data - Data to inject into the template
 * @param {object} options - Additional processing options
 * @returns {Promise<string>} - The processed template content
 */
async function processTemplate(templatePath, data, options = {}) {
  try {
    // Read template content
    const templateContent = await fs.readFile(templatePath, 'utf8');
    
    // Process template variables
    let processedContent = templateContent;
    
    // Simple variable replacement
    Object.entries(data).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`;
      
      // Handle different value types
      if (typeof value === 'object' && value !== null) {
        // For objects, convert to JSON if stringify option is enabled
        if (options.stringify) {
          processedContent = processedContent.replace(
            new RegExp(placeholder, 'g'), 
            JSON.stringify(value, null, 2)
          );
        }
      } else {
        // For scalar values, direct replacement
        processedContent = processedContent.replace(
          new RegExp(placeholder, 'g'), 
          value?.toString() || ''
        );
      }
    });
    
    // Process conditional blocks
    processedContent = processConditionalBlocks(processedContent, data);
    
    // Process loops
    processedContent = processLoopBlocks(processedContent, data);
    
    return processedContent;
  } catch (error) {
    throw new Error(`Template processing error: ${error.message}`);
  }
}

/**
 * Process conditional blocks in template
 * 
 * @param {string} content - Template content
 * @param {object} data - Template data
 * @returns {string} - Processed content
 */
function processConditionalBlocks(content, data) {
  // Process if blocks
  let processedContent = content;
  const ifRegex = /{{#if\s+([^}]+)}}([\s\S]*?)(?:{{#else}}([\s\S]*?))?{{\/if}}/g;
  
  return processedContent.replace(ifRegex, (match, condition, trueBlock, falseBlock = '') => {
    // Evaluate the condition
    const conditionValue = evaluateCondition(condition, data);
    return conditionValue ? trueBlock : falseBlock;
  });
}

/**
 * Process loop blocks in template
 * 
 * @param {string} content - Template content
 * @param {object} data - Template data
 * @returns {string} - Processed content
 */
function processLoopBlocks(content, data) {
  let processedContent = content;
  const eachRegex = /{{#each\s+([^}]+)}}([\s\S]*?){{\/each}}/g;
  
  return processedContent.replace(eachRegex, (match, arrayPath, itemTemplate) => {
    // Get the array from data
    const array = getNestedValue(data, arrayPath);
    
    if (!Array.isArray(array)) {
      return ''; // Return empty string if not an array
    }
    
    // Process each item in the array
    return array.map((item, index) => {
      // Create a context with item and index
      const context = {
        ...data,
        item,
        index
      };
      
      // Replace item placeholders
      return itemTemplate.replace(/{{item\.([^}]+)}}/g, (m, prop) => {
        return item[prop] || '';
      }).replace(/{{index}}/g, index.toString());
    }).join('');
  });
}

/**
 * Evaluate a condition with given data
 * 
 * @param {string} condition - Condition to evaluate
 * @param {object} data - Data for evaluation
 * @returns {boolean} - Result of evaluation
 */
function evaluateCondition(condition, data) {
  // Simple conditions like "key" or "key.subkey"
  if (!condition.includes(' ')) {
    return !!getNestedValue(data, condition);
  }
  
  // Equal comparison (key == value)
  if (condition.includes(' == ')) {
    const [left, right] = condition.split(' == ').map(s => s.trim());
    const leftValue = getNestedValue(data, left);
    
    // If right side is a quoted string
    if (right.startsWith('"') && right.endsWith('"')) {
      return leftValue == right.slice(1, -1);
    }
    
    // Otherwise treat as another data value
    const rightValue = getNestedValue(data, right);
    return leftValue == rightValue;
  }
  
  // Not equal comparison (key != value)
  if (condition.includes(' != ')) {
    const [left, right] = condition.split(' != ').map(s => s.trim());
    const leftValue = getNestedValue(data, left);
    
    // If right side is a quoted string
    if (right.startsWith('"') && right.endsWith('"')) {
      return leftValue != right.slice(1, -1);
    }
    
    // Otherwise treat as another data value
    const rightValue = getNestedValue(data, right);
    return leftValue != rightValue;
  }
  
  // Default to false for unrecognized conditions
  return false;
}

/**
 * Get a nested value from an object using dot notation
 * 
 * @param {object} obj - Object to get value from
 * @param {string} path - Path to value using dot notation
 * @returns {*} - The value or undefined if not found
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

/**
 * Generate a file from a template
 * 
 * @param {string} templatePath - Path to template
 * @param {string} outputPath - Path for output file
 * @param {object} data - Data to inject into template
 * @param {object} options - Additional options
 * @returns {Promise<string>} - Path to generated file
 */
async function generateFromTemplate(templatePath, outputPath, data, options = {}) {
  try {
    // Process the template
    const processedContent = await processTemplate(templatePath, data, options);
    
    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    await fs.mkdir(outputDir, { recursive: true });
    
    // Write the output file
    await fs.writeFile(outputPath, processedContent);
    
    return outputPath;
  } catch (error) {
    throw new Error(`Template generation error: ${error.message}`);
  }
}

module.exports = {
  processTemplate,
  generateFromTemplate
};
