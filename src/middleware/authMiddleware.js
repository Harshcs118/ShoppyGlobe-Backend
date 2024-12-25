// Import necessary modules
const jwt = require('jsonwebtoken'); // Library for working with JSON Web Tokens
const { JWT_SECRET } = require('../config/config'); // JWT secret from configuration
const User = require('../models/userModel'); // User model for MongoDB

/**
 * Middleware function to authenticate JWT tokens.
 * This function checks for a valid JWT in the request headers
 * and populates the req.user object with the authenticated user's data.
 */
const authenticateJWT = async (req, res, next) => {
    // Extract token from the Authorization header
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from header
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' }); // No token provided

    try {
        // Verify the token using the JWT secret
        const decoded = jwt.verify(token, JWT_SECRET);
        // Populate req.user with user data from the database
        req.user = await User.findById(decoded.id);
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        // Handle invalid token error
        res.status(403).json({ message: 'Invalid token.' });
    }
};

// Export the authenticateJWT middleware
module.exports = authenticateJWT;