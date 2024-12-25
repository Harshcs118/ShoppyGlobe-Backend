const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticateJWT = require('../middleware/authMiddleware');

// Create a new order
router.post('/', authenticateJWT, orderController.createOrder);

// Get order history for the authenticated user
router.get('/', authenticateJWT, orderController.getOrderHistory);

module.exports = router;