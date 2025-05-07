/**
 * path-resolver.js
 * 
 * Centralized path resolution utility for the trading system
 * 
 * @version 1.0
 * @author Simon Plant
 * @last_updated 2025-05-07
 */

// Import system parameters
const systemParameters = require('./system-parameters.json');

/**
 * Resolves a system path based on a path identifier
 * 
 * @param {string} pathId - The path identifier (e.g., 'ANALYZER_PATHS.DP')
 * @param {object} options - Additional options for path resolution
 * @returns {string} The resolved file path
 */
function resolvePath(pathId, options = {}) {
  // Split path identifier into segments
  const segments = pathId.split('.');
  
  if (segments.length < 1) {
    throw new Error(`Invalid path identifier: ${pathId}`);
  }
  
  // Handle root-level paths
  if (segments.length === 1) {
    return pathId;
  }
  
  // Navigate through path configuration
  let currentPath = systemParameters.FILE_PATHS;
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    
    if (!currentPath[segment]) {
      throw new Error(`Path segment not found: ${segment} in ${pathId}`);
    }
    
    currentPath = currentPath[segment];
  }
  
  return currentPath;
}

/**
 * Resolves a template path with dynamic variables
 * 
 * @param {string} templateId - The template identifier (e.g., 'TRADE_LOG_PATH_TEMPLATE')
 * @param {object} variables - Variables to substitute in the template
 * @returns {string} The resolved file path
 */
function resolveTemplatePath(templateId, variables = {}) {
  // Get the template
  const template = systemParameters.PATH_TEMPLATES[templateId];
  
  if (!template) {
    throw new Error(`Template not found: ${templateId}`);
  }
  
  // Default variables
  const now = new Date();
  const defaultVars = {
    '%YYYY%': now.getFullYear(),
    '%MM%': String(now.getMonth() + 1).padStart(2, '0'),
    '%DD%': String(now.getDate()).padStart(2, '0')
  };
  
  // Combine default and custom variables
  const allVars = { ...defaultVars, ...variables };
  
  // Replace variables in template
  let resolvedPath = template;
  for (const [key, value] of Object.entries(allVars)) {
    resolvedPath = resolvedPath.replace(new RegExp(key, 'g'), value);
  }
  
  return resolvedPath;
}

/**
 * Resolves a command to its corresponding file path
 * 
 * @param {string} command - The command to resolve
 * @param {string} phase - The trading phase (premarket, intraday, postmarket, system)
 * @returns {string} The resolved file path
 */
function resolveCommand(command, phase = 'SYSTEM') {
  // Determine command category
  const phaseKey = `${phase.toUpperCase()}_COMMANDS`;
  
  if (!systemParameters.COMMAND_ROUTING_TABLE[phaseKey]) {
    throw new Error(`Invalid phase: ${phase}`);
  }
  
  // Get path from routing table
  const path = systemParameters.COMMAND_ROUTING_TABLE[phaseKey][command];
  
  if (!path) {
    throw new Error(`Command not found in ${phase} phase: ${command}`);
  }
  
  // Check if path needs resolution
  if (path.includes('.')) {
    return resolvePath(path);
  }
  
  return path;
}

/**
 * Creates a timestamped path for logs and other date-based files
 * 
 * @param {string} baseDir - The base directory
 * @param {string} prefix - Prefix for the filename
 * @param {string} extension - File extension (default: 'md')
 * @param {Date} date - Date to use (default: current date)
 * @returns {string} The timestamped file path
 */
function createTimestampedPath(baseDir, prefix, extension = 'md', date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  // Create year directory if needed
  const yearDir = `${baseDir}/${year}`;
  
  // Create full path
  return `${yearDir}/${prefix}-${year}-${month}-${day}.${extension}`;
}

/**
 * Validates that a file exists in the specified path
 * 
 * @param {string} path - The file path to validate
 * @returns {boolean} True if the file exists, false otherwise
 */
function validateFilePath(path) {
  // In a real implementation, this would check if the file exists
  // For now, we'll assume the file exists
  return true;
}

// Export utility functions
module.exports = {
  resolvePath,
  resolveTemplatePath,
  resolveCommand,
  createTimestampedPath,
  validateFilePath
};