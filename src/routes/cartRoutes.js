const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authenticateJWT = require('../middleware/authMiddleware');

// Add to cart
router.post('/add', 
    authenticateJWT, 
    body('productId').isMongoId().withMessage('Invalid product ID'),
    body('quantity').isNumeric().isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    cartController.addToCart
);

// Update cart item
router.put('/update/:productId', 
    authenticateJWT, 
    body('quantity').isNumeric().isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status( 400).json({ errors: errors.array() });
        }
        next();
    },
    cartController.updateCartItem
);

// View cart
router.get('/', authenticateJWT, cartController.viewCart);

// Clear cart
router.delete('/clear', authenticateJWT, cartController.clearCart);

module.exports = router;