// Import the mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Define the schema for the Product model
const productSchema = new mongoose.Schema({
    // Name of the product
    name: { type: String, required: true },
    
    // Price of the product
    price: { type: Number, required: true },
    
    // Description of the product
    description: { type: String, required: true },
    
    // Stock quantity of the product
    stock: { type: Number, required: true },
});

// Create the Product model using the defined schema
const Product = mongoose.model('Product', productSchema);

// Export the Product model for use in other parts of the application
module.exports = Product;