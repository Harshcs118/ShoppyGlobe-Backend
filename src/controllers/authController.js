// Import necessary modules and models
const User = require('../models/userModel'); // User model for MongoDB
const bcrypt = require('bcryptjs'); // Library for hashing passwords
const jwt = require('jsonwebtoken'); // Library for creating JSON Web Tokens
const { JWT_SECRET } = require('../config/config'); // JWT secret from configuration

// User registration
exports.register = async (req, res) => {
    // Destructure username, password, and isAdmin from the request body
    const { username, password, isAdmin } = req.body; // Accept isAdmin from request

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with the hashed password and isAdmin flag
    const newUser  = new User({ 
        username, 
        password: hashedPassword, 
        isAdmin: isAdmin || false // Default to false if isAdmin is not provided
    });

    try {
        // Save the new user to the database
        await newUser .save();
        // Respond with a success message
        res.status(201).send('User  registered successfully');
    } catch (error) {
        // Handle any errors that occur during registration
        res.status(400).json({ message: error.message });
    }
};

// User login
exports.login = async (req, res) => {
    // Destructure username and password from the request body
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send('User  not found'); // User not found

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(403).send('Invalid credentials'); // Invalid password

    // Create a JWT token with user ID and isAdmin flag
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET);

    // Respond with the token
    res.json({ token });
};