const express = require("express");
const router = express.Router();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Import Auth Controller
const { register, login } = require("../controllers/authController");


// Register Route
router.post("/register", register);

// Login Route
router.post("/login", login);

module.exports = router;