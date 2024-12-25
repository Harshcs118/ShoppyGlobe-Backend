const Order = require('../models/orderModel');
const Cart = require('../models/cartModel'); // Assuming you have a Cart model

// Create a new order
exports.createOrder = async (req, res) => {
    const { items, totalAmount } = req.body;

    // Validate that items are provided
    if (!items || items.length === 0) {
        return res.status(400).json({ message: 'Items are required to create an order.' });
    }

    try {
        const newOrder = new Order({ userId: req.user.id, items, totalAmount });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get order history for a user
exports.getOrderHistory = async (req, res) => {
    const userId = req.user.id; // Get user ID from the authenticated user

    try {
        const orders = await Order.find({ userId }).populate('items.productId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};