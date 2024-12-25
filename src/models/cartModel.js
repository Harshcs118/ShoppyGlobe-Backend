// Import the mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Define the schema for the Cart model
const cartSchema = new mongoose.Schema({
    // User ID associated with the cart
    userId: { type: String, required: true },
    
    // Array of items in the cart
    items: [
        {
            // Product ID referencing the Product model
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            // Quantity of the product in the cart
            quantity: { type: Number, required: true }
        }
    ],
});

// Create the Cart model using the defined schema
const Cart = mongoose.model('Cart', cartSchema);

// Export the Cart model for use in other parts of the application
module.exports = Cart;