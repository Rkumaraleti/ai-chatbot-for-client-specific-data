const express = require("express");
const router = express.Router();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Import Auth Controller
const authController = require("../controllers/authController");


// Register Route
router.route("/register")
    .post(authController.register);

// Login Route
router.route("/login")
    .post(authController.login);

module.exports = router;