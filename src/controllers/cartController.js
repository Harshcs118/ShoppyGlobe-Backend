// Import the Cart model and isValidObjectId function from mongoose
const Cart = require('../models/cartModel');
const { isValidObjectId } = require('mongoose');

// Add to cart
exports.addToCart = async (req, res) => {
    // Destructure productId and quantity from the request body
    const { productId, quantity } = req.body;

    // Validate input for productId
    if (!isValidObjectId(productId)) {
        return res.status(400).json({ message: 'Invalid product ID' });
    }
    // Validate input for quantity
    if (typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({ message: 'Quantity must be a positive number' });
    }

    try {
        // Find the user's cart
        const cart = await Cart.findOne({ userId: req.user.id });
        if (cart) {
            // Check if the product is already in the cart
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex > -1) {
                // Update the quantity if the product is already in the cart
                cart.items[itemIndex].quantity += quantity; // Update quantity
            } else {
                // Add new item to the cart
                cart.items.push({ productId, quantity }); // Add new item
            }
            // Save the updated cart
            await cart.save();
            return res.status(200).json({ message: 'Product quantity updated in cart', cart });
        } else {
            // Create a new cart if it doesn't exist
            const newCart = new Cart({ userId: req.user.id, items: [{ productId, quantity }] });
            await newCart.save();
            return res.status(201).json({ message: 'Product added to cart', cart: newCart });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while adding to cart' });
    }
};

// Update cart item
exports.updateCartItem = async (req, res) => {
    // Destructure quantity from the request body and id from the request parameters
    const { quantity } = req.body;
    const { id } = req.params; // This should be the cart item ID

    // Validate quantity
    if (typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({ message: 'Quantity must be a positive number' });
    }

    try {
        // Find the user's cart
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        // Find the item in the cart using the cart item ID
        const itemIndex = cart.items.findIndex(item => item._id.toString() === id); // Use cart item ID
        if (itemIndex > -1) {
            // Update the quantity of the item
            cart.items[itemIndex].quantity = quantity; // Update quantity
            await cart.save();
            return res.status(200).json({ message: 'Cart item updated', cart });
        } else {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while updating the cart item' });
    }
};

// View cart
exports.viewCart = async (req, res) => {
    try {
        // Find the user's cart and populate product details
        const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        // Respond with the cart details
        res.json(cart);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

// Clear cart
exports.removeCartItem = async (req, res) => {
    // Destructure id from the request parameters
    const { id } = req.params; // This should be the cart item ID

    try {
        // Find the user's cart
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        // Find the item in the cart using the cart item ID
        const itemIndex = cart.items.findIndex(item => item._id.toString() === id); // Use cart item ID
        if (itemIndex > -1) {
            // Remove the item from the cart
            cart.items.splice(itemIndex, 1); // Remove the item from the array
            await cart.save(); // Save the updated cart
            return res.status(200).json({ message: 'Item removed from cart', cart });
        } else {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while removing the item from the cart' });
    }
};