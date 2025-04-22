import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import chatStore from "../store/chatStore";
import axios from "axios";

const Chat = observer(() => {
  const [input, setInput] = useState(""); // Stores the user input
  const messagesEndRef = useRef(null); // Ref to scroll to the latest message

  // Scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatStore.messages]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Add user message to the conversation
    const userMessage = { sender: "user", text: input };
    chatStore.addMessage(userMessage);

    // Clear the input field
    setInput("");

    // Simulate AI typing
    chatStore.setTyping(true);

    try {
      // Send the user message to the backend
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/conversations`,
        {
          userId: "user123", // Replace with actual user ID
          messages: [
            {
              role: "user",
              content: input,
              timestamp: new Date(),
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Add AI response to the conversation
      const aiMessage = {
        sender: "AI",
        text: response.data.messages[1].content, // Replace with actual API response
      };
      chatStore.addMessage(aiMessage);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      chatStore.addMessage({
        sender: "AI",
        text: "Sorry, something went wrong. Please try again.",
      });
    } finally {
      chatStore.setTyping(false); // Stop typing indicator
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white w-[75%] mx-auto">
      {/* Chat Header */}
      <div className="bg-gray-800 text-white text-center py-3 shadow">
        <h4 className="text-lg font-semibold">AI Chat System</h4>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-grow p-4 overflow-y-auto">
        {chatStore.messages.map((message, index) => (
          <div
            key={index}
            className={`flex mb-3 ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-200"
              }`}
              style={{ maxWidth: "75%" }}
            >
              <strong>{message.sender === "user" ? "You" : "AI"}:</strong>{" "}
              {message.text}
            </div>
          </div>
        ))}
        {chatStore.isTyping && (
          <div className="flex mb-3 justify-start">
            <div
              className="p-3 rounded-lg bg-gray-700 text-gray-200"
              style={{ maxWidth: "75%" }}
            >
              <strong>AI:</strong> Typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex items-center p-4 bg-gray-800 border-t border-gray-700">
        <input
          type="text"
          className="flex-grow p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
});

export default Chat;
