// Import necessary modules
const express = require('express'); // Express framework for building web applications
const { body, param, validationResult } = require('express-validator'); // Middleware for validating request data
const router = express.Router(); // Create a new router instance
const cartController = require('../controllers/cartController'); // Import the cart controller
const authenticateJWT = require('../middleware/authMiddleware'); // Import JWT authentication middleware

// Add to cart route
router.post('/', 
    authenticateJWT, // Middleware to authenticate the user
    // Validate the productId field
    body('productId').isMongoId().withMessage('Invalid product ID'),
    // Validate the quantity field
    body('quantity').isNumeric().isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
    // Middleware to check for validation errors
    async (req, res, next) => {
        const errors = validationResult(req); // Get validation errors
        if (!errors.isEmpty()) {
            // If there are errors, respond with a 400 status and the errors
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Proceed to the next middleware or route handler
    },
    cartController.addToCart // Call the addToCart function from the cartController
);

// Update cart item route
router.put('/:id',  // Changed from :productId to :id for clarity
    authenticateJWT, // Middleware to authenticate the user
    // Validate the cart item ID
    param('id').isMongoId().withMessage('Invalid cart item ID'),
    // Validate the quantity field
    body('quantity').isNumeric().isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
    // Middleware to check for validation errors
    async (req, res, next) => {
        const errors = validationResult(req); // Get validation errors
        if (!errors.isEmpty()) {
            // If there are errors, respond with a 400 status and the errors
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Proceed to the next middleware or route handler
    },
    cartController.updateCartItem // Call the updateCartItem function from the cartController
);

// View cart route
router.get('/', authenticateJWT, cartController.viewCart); // Middleware to authenticate the user and call viewCart

// Clear cart route
router.delete('/:id', authenticateJWT, cartController.removeCartItem); // Middleware to authenticate the user and call removeCartItem

// Export the router for use in other parts of the application
module.exports = router;