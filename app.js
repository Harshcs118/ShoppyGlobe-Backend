// Import necessary modules
const express = require('express'); // Express framework for building web applications
const mongoose = require('mongoose'); // Mongoose library for MongoDB object modeling
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const { MONGODB_URI } = require('./src/config/config'); // MongoDB connection URI from configuration
const productRoutes = require('./src/routes/productRoutes'); // Import product routes
const cartRoutes = require('./src/routes/cartRoutes'); // Import cart routes
const authRoutes = require('./src/routes/authRoutes'); // Import authentication routes
const orderRoutes = require('./src/routes/orderRoutes'); // Import order routes
const errorHandler = require('./src/middleware/errorHandler'); // Import error handling middleware

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Connect to MongoDB without deprecated options
mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected')) // Log success message on successful connection
    .catch(err => console.error('MongoDB connection error:', err)); // Log error message on connection failure

// Define API routes
app.use('/api/products', productRoutes); // Route for product-related operations
app.use('/api/cart', cartRoutes); // Route for cart-related operations
app.use('/api/auth', authRoutes); // Route for authentication-related operations
app.use('/api/orders', orderRoutes); // Route for order-related operations

// Use error handling middleware
app.use(errorHandler); // Handle errors that occur in the application

// Define the port for the server to listen on
const PORT = process.env.PORT || 5000; // Use environment variable or default to 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Log message indicating the server is running
});