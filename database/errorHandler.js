/**
 * Database Error Handler - Log and handle all database errors
 */
export const DBErrorHandler = 
{
    /**
     * Handle and log database errors
     * @param {Error} error - Error object
     * @param {string} context - Operation context
     * @returns {Object} - Error response object
     */
    handle(error, context = 'Database Operation') 
    {
        const errorMessage = `[${context}] ${error.message || 'Unknown error occurred'}`;

        console.error('DATABASE ERROR:', errorMessage);
        console.error('Stack Trace:', error.stack);

        return {
            success: false,
            error: errorMessage,
            code: error.code || 'DB_ERROR'
        };
    },

    /**
     * Log warning message
     * @param {string} message - Warning message
     * @param {string} context - Context name
     */
    warn(message, context = 'Database') 
    {
        console.warn(`${context}: ${message}`);
    },

    /**
     * Log info message
     * @param {string} message - Info message
     * @param {string} context - Context name
     */
    info(message, context = 'Database') 
    {
        console.log(`${context}: ${message}`);
    }
};
