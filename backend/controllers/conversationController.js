const Conversation = require("../models/Conversation"); // Import the Conversation model

const { getGeminiData } = require("../utils/gemini_ai"); // Import the function to get data from Gemini API

const {companyData} = require("../controllers/adminController"); // Import the conversation controller

// Function to get all conversations
exports.getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find(); // Fetch all conversations from the database
    res.status(200).json(conversations); // Send the conversations as a JSON response
  } catch (error) {
    console.error("Error fetching conversations:", error.message);
    res.status(500).json({ error: "Failed to fetch conversations" }); // Send an error response
  }
};    

// Function to set a new conversation
exports.setConversation = async (req, res) => {
  try {
      const { userId, messages } = req.body; // Extract userId and messages from the request body
    
    let prompt = `You are a helpful assistant. Answer the user's question based on the provided context if context is available. If not, answer based on your knowledge. \n\n`; // Initialize the prompt with a system message
    
    try {
        const requiredContext = await companyData(); // Fetch company data from the database
        prompt += `Context: ${requiredContext} \n\n`; // Add the company data to the prompt
    } catch (error) {
        console.error("Error fetching company data:", error.message);
        throw new Error("Failed to fetch company data");
    }

    // Add the user's question to the prompt
    prompt += `Question: ${messages[0].content}`;
      
    console.log("Prompt:", prompt); // Log the prompt for debugging
      const aiResponse = await getGeminiData(prompt); // Get AI response using the message content

      // AI Response saving in the database
      const aiConversation = new Conversation({
        userId,
        messages: [
          ...messages,
          {
            role: "ai",
            content: aiResponse,
            timestamp: new Date(),
          },
        ],
      });
      const fetchedAnswer = await aiConversation.save(); // Save the AI response conversation to the database
    res.status(201).json(fetchedAnswer); // Send the created conversation as a JSON response
  } catch (error) {
    console.error("Error creating conversation:", error.message);
    res.status(500).json({ error: "Failed to create conversation" }); // Send an error response
  }
}

// Function to get conversations by userId (can also be updated to fetch by username or email id later)
exports.getConversationsByUserId = async (req, res) => {
  try {
    const { id } = req.params; // Extract userId from the request parameters
    const conversations = await Conversation.find({ userId: id }); // Fetch conversations for the specific userId
    res.status(200).json(conversations); // Send the conversations as a JSON response
  } catch (error) {
    console.error("Error fetching conversations by userId:", error.message);
    res.status(500).json({ error: "Failed to fetch conversations" }); // Send an error response
  }
}