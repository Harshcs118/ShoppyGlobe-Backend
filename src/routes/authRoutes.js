// Import necessary modules
const express = require('express'); // Express framework for building web applications
const { body, validationResult } = require('express-validator'); // Middleware for validating request data
const router = express.Router(); // Create a new router instance
const authController = require('../controllers/authController'); // Import the authentication controller

// User registration route
router.post('/register', 
    // Validate the username field
    body('username')
        .isString()
        .notEmpty()
        .withMessage('Username is required'),
    
    // Validate the password field
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    
    // Middleware to check for validation errors
    async (req, res, next) => {
        const errors = validationResult(req); // Get validation errors
        if (!errors.isEmpty()) {
            // If there are errors, respond with a 400 status and the errors
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Proceed to the next middleware or route handler
    },
    authController.register // Call the register function from the authController
);

// User login route
router.post('/login', 
    // Validate the username field
    body('username')
        .isString()
        .notEmpty()
        .withMessage('Username is required'),
    
    // Validate the password field
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    
    // Middleware to check for validation errors
    async (req, res, next) => {
        const errors = validationResult(req); // Get validation errors
        if (!errors.isEmpty()) {
            // If there are errors, respond with a 400 status and the errors
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Proceed to the next middleware or route handler
    },
    authController.login // Call the login function from the authController
);

// Export the router for use in other parts of the application
module.exports = router;