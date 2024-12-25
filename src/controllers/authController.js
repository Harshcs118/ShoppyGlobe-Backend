const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

// User registration
exports.register = async (req, res) => {
    const { username, password, isAdmin } = req.body; // Accept isAdmin from request
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser  = new User({ username, password: hashedPassword, isAdmin: isAdmin || false }); // Default to false
    try {
        await newUser .save();
        res.status(201).send('User  registered successfully');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// User login
exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send('User  not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(403).send('Invalid credentials');
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET); // Include isAdmin in the token
    res.json({ token });
};