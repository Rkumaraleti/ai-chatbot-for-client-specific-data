// MongoDB connection configuration
const mongoose = require("mongoose");
// Enabler for environment variables
const dotenv = require("dotenv");
dotenv.config();

// Environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoConnect = await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = {connectDB};