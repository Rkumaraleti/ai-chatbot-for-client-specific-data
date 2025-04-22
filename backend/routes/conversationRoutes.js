const express = require('express');

// Router Module to conceal the routes:
const router = express.Router();

// Import the Conversation model:
const ConversationController = require('../controllers/conversationController');

router.get('/', ConversationController.getConversations); // Get all conversations

router.post('/', ConversationController.setConversation); // Set a new conversation

router.get('/:id', ConversationController.getConversationsByUserId); // Get a conversation by ID

module.exports = router;