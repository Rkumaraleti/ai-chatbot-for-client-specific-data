const express = require('express');

// Router Module to conceal the routes:
const router = express.Router();

// Import the Conversation model:
const ConversationController = require('../controllers/conversationController');

router.route('/')
    .get(ConversationController.getConversations)
    .post(ConversationController.setConversation);

router.route('/:username')
    .get(ConversationController.getConversationsByUserId); // Get a conversation by ID

module.exports = router;