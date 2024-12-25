// Import the mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Define the schema for the Order model
const orderSchema = new mongoose.Schema({
    // User ID associated with the order, referencing the User model
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    
    // Array of items in the order
    items: [
        {
            // Product ID referencing the Product model
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            // Quantity of the product in the order
            quantity: { type: Number, required: true }
        }
    ],
    
    // Total amount for the order
    totalAmount: { type: Number, required: true },
    
    // Status of the order, default is 'Pending'
    status: { type: String, default: 'Pending' },
    
    // Timestamp for when the order was created
    createdAt: { type: Date, default: Date.now }
});

// Create the Order model using the defined schema
const Order = mongoose.model('Order', orderSchema);

// Export the Order model for use in other parts of the application
module.exports = Order;