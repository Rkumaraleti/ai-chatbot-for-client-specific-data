import axios from "axios";

import authStore from "../store/authStore";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include credentials (cookies) for CORS
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data?.message || error.message);

    // Check for specific error status codes
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Call the logout function if it is set
      if (authStore.logout()) {
        authStore.logout();
      } else {
        console.error("Logout function is not set.");
      }
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
