/**
 * Middleware function to authorize admin users.
 * This function checks if the authenticated user has admin privileges.
 */
const authorizeAdmin = (req, res, next) => {
    // Check if the user is authenticated and has admin privileges
    if (req.user && req.user.isAdmin) {
        next(); // User is an admin, proceed to the next middleware
    } else {
        // User is not an admin, deny access
        res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};

// Export the authorizeAdmin middleware
module.exports = authorizeAdmin;