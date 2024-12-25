// Import necessary modules
const express = require('express'); // Express framework for building web applications
const router = express.Router(); // Create a new router instance
const productController = require('../controllers/productController'); // Import the product controller
const { body, validationResult } = require('express-validator'); // Middleware for validating request data
const authenticateJWT = require('../middleware/authMiddleware'); // Middleware to authenticate JWT
const authorizeAdmin = require('../middleware/authorizeAdmin'); // Middleware to authorize admin

// Get all products route
router.get('/', productController.getAllProducts); // Call getAllProducts function from the productController

// Get product by ID route
router.get('/:id', productController.getProductById); // Call getProductById function from the productController

// Create a new product route (Admin only)
router.post('/', 
    authenticateJWT, // Ensure the user is authenticated
    authorizeAdmin, // Ensure the user is an admin
    // Validate the product fields
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('description').isString().notEmpty().withMessage('Description is required'),
    body('stock').isNumeric().withMessage('Stock must be a number'),
    // Middleware to check for validation errors
    async (req, res, next) => {
        const errors = validationResult(req); // Get validation errors
        if (!errors.isEmpty()) {
            // If there are errors, respond with a 400 status and the errors
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Proceed to the next middleware or route handler
    },
    productController.createProduct // Call createProduct function from the productController
);

// Update a product route (Admin only)
router.put('/:id', 
    authenticateJWT, // Ensure the user is authenticated
    authorizeAdmin, // Ensure the user is an admin
    // Validate the optional product fields
    body('name').optional().isString().notEmpty().withMessage('Name must be a string'),
    body('price').optional().isNumeric().withMessage('Price must be a number'),
    body('description').optional().isString().notEmpty().withMessage('Description must be a string'),
    body('stock').optional().isNumeric().withMessage('Stock must be a number'),
    // Middleware to check for validation errors
    async (req, res, next) => {
        const errors = validationResult(req); // Get validation errors
        if (!errors.isEmpty()) {
            // If there are errors, respond with a 400 status and the errors
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Proceed to the next middleware or route handler
    },
    productController.updateProduct // Call updateProduct function from the productController
);

// Delete a product route (Admin only)
router.delete('/:id', 
    authenticateJWT, // Ensure the user is authenticated
    authorizeAdmin, // Ensure the user is an admin
    productController.deleteProduct // Call deleteProduct function from the productController
);

// Export the router for use in other parts of the application
module.exports = router;