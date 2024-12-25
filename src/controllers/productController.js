const Product = require('../models/productModel');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products: ' + error.message });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product: ' + error.message });
    }
};

// Create a new product (Admin only)
exports.createProduct = async (req, res) => {
    const { name, price, description, stock } = req.body;
    const newProduct = new Product({ name, price, description, stock });
    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: 'Error creating product: ' + error.message });
    }
};

// Update a product (Admin only)
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, stock } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, description, stock }, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: 'Error updating product: ' + error.message });
    }
};

// Delete a product (Admin only)
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product: ' + error.message });
    }
};