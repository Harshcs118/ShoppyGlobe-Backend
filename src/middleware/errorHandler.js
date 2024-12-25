/**
 * Error handling middleware for Express applications.
 * This function captures errors that occur during request processing
 * and sends a standardized error response to the client.
 */
const errorHandler = (err, req, res, next) => {
    // Log the error stack trace to the console for debugging
    console.error(err.stack);
    
    // Respond with a 500 Internal Server Error status and the error message
    res.status(500).json({ message: err.message });
};

// Export the errorHandler middleware
module.exports = errorHandler;