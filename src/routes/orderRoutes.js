// Import necessary modules
const express = require('express'); // Express framework for building web applications
const router = express.Router(); // Create a new router instance
const orderController = require('../controllers/orderController'); // Import the order controller
const authenticateJWT = require('../middleware/authMiddleware'); // Import JWT authentication middleware

// Create a new order route
router.post('/', authenticateJWT, orderController.createOrder); // Middleware to authenticate the user and call createOrder

// Get order history route for the authenticated user
router.get('/', authenticateJWT, orderController.getOrderHistory); // Middleware to authenticate the user and call getOrderHistory

// Export the router for use in other parts of the application
module.exports = router;