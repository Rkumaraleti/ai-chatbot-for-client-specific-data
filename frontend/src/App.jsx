import "./App.css";

import Chat from "./pages/Chat";
import Admin from "./pages/Admin";
import ChatHistory from "./pages/ChatHistory";
import Login from "./components/Login";
import Register from "./components/Register";

import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./util/ProtectedRoute"; // Import the ProtectedRoute component

function App() {
  return (
    <>
      <div className="h-[100vh]">
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="/chat-history" element={<ChatHistory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
