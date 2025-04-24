const express = require('express');

const dotenv = require('dotenv').config();
// Create an Express application
const app = express();

// Request Body Parser
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Connect to MongoDB
const {connectDB} = require('./config/db');
connectDB();

// Environment variables
const PORT = process.env.PORT || 3000;

// CORS Policy:
const cors = require('cors');
app.use(cors({
    origin: process.env.CLIENT_URL, // Use a single string for the origin
    credentials: true, // Allow credentials
    optionSuccessStatus: 200,
    allowedHeaders: ["Content-Type", "Authorization", "Accept"], // Allow these headers
}));
app.options('/*', cors())

// Test route
app.get('/', (req, res) => {
    res.send('Backend is working!');
}
);

// Middleware for JWT Authentication & role-based access control
const jwtAuthentication = require('./middlewares/jwtAuthentication');
const isAdmin = require('./middlewares/isAdmin');

// Import routes
const conversationRoutes = require('./routes/conversationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');

// Use Routes
app.use('/conversations', jwtAuthentication,conversationRoutes);
app.use('/admin', jwtAuthentication, isAdmin, adminRoutes);
app.use('/auth', authRoutes);

// Listening to the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})