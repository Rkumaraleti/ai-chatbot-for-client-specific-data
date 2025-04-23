const express = require('express');

const dotenv = require('dotenv').config();

// Create an Express application
const app = express();

// Request Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const {connectDB} = require('./config/db');
connectDB();

// Environment variables
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL;

// CORS Policy:
const cors = require('cors');
app.use(cors({
    origin: process.env.CLIENT_URL, // Use a single string for the origin
    credentials: true, // Allow credentials
    optionSuccessStatus: 200,
    allowedHeaders: ["Content-Type", "Authorization", "Accept"], // Allow these headers
}));

// Test route
app.get('/', (req, res) => {
    res.send('Backend is working!');
}
);

// Import routes
const conversationRoutes = require('./routes/conversationRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Use Routes
app.use('/conversations', conversationRoutes);
app.use('/admin', adminRoutes);

// Listening to the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})