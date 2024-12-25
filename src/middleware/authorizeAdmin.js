const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // User is an admin, proceed to the next middleware
    } else {
        res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};

module.exports = authorizeAdmin;