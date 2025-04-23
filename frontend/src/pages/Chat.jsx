import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import chatStore from "../store/chatStore";
import authStore from "../store/authStore"; // Import the auth store
import axiosInstance from "../services/axiosInstance";
import ReactMarkdown from "react-markdown";

const Chat = observer(() => {
  const [input, setInput] = useState(""); // Stores the user input
  const messagesEndRef = useRef(null); // Ref to scroll to the latest message
  const navigate = useNavigate(); // For navigation

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
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_SERVER_URL}/conversations`,
        {
          userId: authStore.user.email, // Replace with actual user ID
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
          withCredentials: true,
        }
      );

      // Add AI response to the conversation
      const aiMessage = {
        sender: "AI",
        text: response.data.messages[1].content,
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

  const handleLogout = () => {
    authStore.logout(); // Clear user data from the store
    navigate("/"); // Redirect to the login page
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white w-[75%] mx-auto">
      {/* Chat Header */}
      <div className="flex items-center justify-between bg-gray-800 text-white text-center py-3 shadow">
        <h4 className="text-lg font-semibold text-center flex-8">
          AI Chat System{" "}
        </h4>
        <div className="m-4">
          <Link to="/chat-history">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Chat History
            </button>
          </Link>
        </div>
        <div className="m-4">
          {authStore.isLoggedIn() ? (
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Login
              </button>
            </Link>
          )}
        </div>
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
              <ReactMarkdown>{message.text}</ReactMarkdown>
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
          type="submit"
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
