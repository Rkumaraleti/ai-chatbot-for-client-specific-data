const isAdmin = (req, res, next) => {
  // Check if the user is attached to the request and has the admin role
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }

  // If the user is an admin, proceed to the next middleware or route handler
  next();
};

module.exports = isAdmin;