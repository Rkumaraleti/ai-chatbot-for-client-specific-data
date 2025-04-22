const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Conversation schema
const conversationSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    messages: [
        {
            role: {
                type: String,
                enum: ['user', 'ai'],
                required: true
            },
            content: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
},{ timestamps: true });

// Create a Conversation model
const Conversation = mongoose.model('Conversation', conversationSchema);

// Export the Conversation model
module.exports = Conversation;