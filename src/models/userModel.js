// Import the mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    // Username of the user, must be unique
    username: { type: String, required: true, unique: true },
    
    // Password of the user
    password: { type: String, required: true },
    
    // Admin role indicator, defaults to false
    isAdmin: { type: Boolean, default: false } // New field for admin role
});

// Create the User model using the defined schema
const User = mongoose.model('User ', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;