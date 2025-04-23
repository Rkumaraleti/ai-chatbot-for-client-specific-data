import React from "react";
import { Navigate } from "react-router-dom";
import authStore from "../store/authStore"; // Import the auth store

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = authStore.user;

  // Check if the user is logged in and has the required role
  if (!user || user.role !== requiredRole) {
    confirm("You are not authorized to access this page.");
    return <Navigate to="/login" replace />; // Redirect to login if not authorized
  }

  return children; // Render the protected component if authorized
};

export default ProtectedRoute;
