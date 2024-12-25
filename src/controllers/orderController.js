// Import the Order model and Cart model
const Order = require('../models/orderModel'); // Order model for MongoDB
const Cart = require('../models/cartModel'); // Assuming you have a Cart model

// Create a new order
exports.createOrder = async (req, res) => {
    // Destructure items and totalAmount from the request body
    const { items, totalAmount } = req.body;

    // Validate that items are provided
    if (!items || items.length === 0) {
        return res.status(400).json({ message: 'Items are required to create an order.' });
    }

    try {
        // Create a new order instance with user ID, items, and total amount
        const newOrder = new Order({ userId: req.user.id, items, totalAmount });
        // Save the new order to the database
        await newOrder.save();
        // Respond with the created order
        res.status(201).json(newOrder);
    } catch (error) {
        // Handle any errors that occur during order creation
        res.status(400).json({ message: error.message });
    }
};

// Get order history for a user
exports.getOrderHistory = async (req, res) => {
    // Get user ID from the authenticated user
    const userId = req.user.id;

    try {
        // Find all orders for the user and populate product details
        const orders = await Order.find({ userId }).populate('items.productId');
        // Respond with the user's order history
        res.json(orders);
    } catch (error) {
        // Handle any errors that occur while fetching order history
        res.status(500).json({ message: error.message });
    }
};