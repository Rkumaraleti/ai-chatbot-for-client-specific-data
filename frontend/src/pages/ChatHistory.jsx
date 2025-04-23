import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import authStore from "../store/authStore";

const ChatHistory = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/conversations/${
            authStore.user.email
          }`
        );
        setChatHistory(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100 w-[75%] mx-auto">
      {/* Header */}
      <div className="bg-gray-800 text-white py-4 shadow flex items-center justify-between px-4">
        <button
          onClick={() => navigate("/")} // Navigate to the home page
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back to Home
        </button>
        <h1 className="text-2xl font-bold text-center flex-grow">
          Chat History for {authStore.user.name}
        </h1>
      </div>

      {/* Chat History Container */}
      <div className="flex-grow overflow-y-auto p-4">
        {chatHistory.length === 0 ? (
          <p className="text-gray-500 text-center">
            No chat history available.
          </p>
        ) : (
          <ul className="space-y-6">
            {" "}
            {/* Add spacing between messages */}
            {chatHistory.map((conversation, index) => (
              <div key={index}>
                {conversation.messages.map((message, msgIndex) => (
                  <li
                    key={msgIndex}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-4 rounded-lg shadow-md ${
                        message.role === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-black"
                      }`}
                      style={{
                        maxWidth: "75%",
                        marginBottom: "10px", // Add spacing between messages
                      }}
                    >
                      {loading ? (
                        <div className="animate-pulse">
                          <div className="h-4 bg-gray-400 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-400 rounded w-1/2"></div>
                        </div>
                      ) : (
                        <>
                          <strong>
                            {message.role === "user" ? "You" : "AI"}:
                          </strong>{" "}
                          {message.content}
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChatHistory;
