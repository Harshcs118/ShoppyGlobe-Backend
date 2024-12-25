const Cart = require('../models/cartModel');

// Add to cart
exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (cart) {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
            await cart.save();
            return res.status(200).json({ message: 'Product quantity updated in cart', cart });
        } else {
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
    const { quantity } = req.body;
    const { productId } = req.params;
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
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
        const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
        if (!cart) return res.status(404).send('Cart not found');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Clear cart
exports.clearCart = async (req, res) => {
    try {
        await Cart.findOneAndDelete({ userId: req.user.id });
        res.json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};