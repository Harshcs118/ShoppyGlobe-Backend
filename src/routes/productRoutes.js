const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { body, validationResult } = require('express-validator');
const authenticateJWT = require('../middleware/authMiddleware'); // Middleware to authenticate JWT
const authorizeAdmin = require('../middleware/authorizeAdmin'); // Middleware to authorize admin

// Get all products
router.get('/', productController.getAllProducts);

// Get product by ID
router.get('/:id', productController.getProductById);

// Create a new product (Admin only)
router.post('/', 
    authenticateJWT, // Ensure the user is authenticated
    authorizeAdmin, // Ensure the user is an admin
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('description').isString().notEmpty().withMessage('Description is required'),
    body('stock').isNumeric().withMessage('Stock must be a number'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    productController.createProduct
);

// Update a product (Admin only)
router.put('/:id', 
    authenticateJWT, // Ensure the user is authenticated
    authorizeAdmin, // Ensure the user is an admin
    body('name').optional().isString().notEmpty().withMessage('Name must be a string'),
    body('price').optional().isNumeric().withMessage('Price must be a number'),
    body('description').optional().isString().notEmpty().withMessage('Description must be a string'),
    body('stock').optional().isNumeric().withMessage('Stock must be a number'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    productController.updateProduct
);

// Delete a product (Admin only)
router.delete('/:id', 
    authenticateJWT, // Ensure the user is authenticated
    authorizeAdmin, // Ensure the user is an admin
    productController.deleteProduct
);

module.exports = router;