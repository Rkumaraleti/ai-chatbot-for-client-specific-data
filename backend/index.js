const express = require('express');
const cors = require('cors');

const dotend = require('dotenv').config();

// Create an Express application
const app = express();

// Request Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const {connectDB} = require('./config/db');
connectDB();


const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL;

// Enable CORS for all routes
app.use(cors(
    {
        origin: CLIENT_URL, // ALlowed origin
        credentials: true, // Allow credentials
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    }
));

// Test route
app.get('/', (req, res) => {
    res.send('Backend is working!');
}
);

// Listening to the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})