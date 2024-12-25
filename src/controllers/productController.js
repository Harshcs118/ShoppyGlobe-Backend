// Import the Product model
const Product = require('../models/productModel');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        // Retrieve all products from the database
        const products = await Product.find();
        // Respond with the list of products
        res.json(products);
    } catch (error) {
        // Handle any errors that occur during retrieval
        res.status(500).json({ message: 'Error retrieving products: ' + error.message });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        // Find a product by its ID
        const product = await Product.findById(req.params.id);
        // If the product is not found, return a 404 error
        if (!product) return res.status(404).json({ message: 'Product not found' });
        // Respond with the found product
        res.json(product);
    } catch (error) {
        // Handle any errors that occur during retrieval
        res.status(500).json({ message: 'Error retrieving product: ' + error.message });
    }
};

// Create a new product (Admin only)
exports.createProduct = async (req, res) => {
    // Destructure product details from the request body
    const { name, price, description, stock } = req.body;
    // Create a new product instance
    const newProduct = new Product({ name, price, description, stock });
    try {
        // Save the new product to the database
        await newProduct.save();
        // Respond with the created product
        res.status(201).json(newProduct);
    } catch (error) {
        // Handle any errors that occur during creation
        res.status(400).json({ message: 'Error creating product: ' + error.message });
    }
};

// Update a product (Admin only)
exports.updateProduct = async (req, res) => {
    // Get the product ID from the request parameters
    const { id } = req.params;
    // Destructure updated product details from the request body
    const { name, price, description, stock } = req.body;
    try {
        // Find the product by ID and update its details
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, description, stock }, { new: true });
        // If the product is not found, return a 404 error
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        // Respond with the updated product
        res.json(updatedProduct);
    } catch (error) {
        // Handle any errors that occur during the update
        res.status(400).json({ message: 'Error updating product: ' + error.message });
    }
};

// Delete a product (Admin only)
exports.deleteProduct = async (req, res) => {
    // Get the product ID from the request parameters
    const { id } = req.params;
    try {
        // Find the product by ID and delete it
        const deletedProduct = await Product.findByIdAndDelete(id);
        // If the product is not found, return a 404 error
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        // Respond with a success message
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        // Handle any errors that occur during deletion
        res.status(500).json({ message: 'Error deleting product: ' + error.message });
    }
};