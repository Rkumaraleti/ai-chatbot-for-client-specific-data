import { makeAutoObservable } from "mobx";
import chatStore from "./chatStore";

class AuthStore {
  user = JSON.parse(localStorage.getItem("user")) || null; // Load user from localStorage
  token = localStorage.getItem("token") || null; // Load token from localStorage

  constructor() {
    makeAutoObservable(this);
  }

  // Login the user
  login(user, token) {
    this.user = user;
    this.token = token;
    localStorage.setItem("user", JSON.stringify(user)); // Save user to localStorage
    localStorage.setItem("token", token); // Save token to localStorage
  }

  // Logout the user
  logout() {
    this.user = null;
    this.token = null;

    // Clear localStorage and sessionStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.clear();

    chatStore.clearMessages();
    // Optionally notify other parts of the app (e.g., via events or callbacks)
    console.log("User has been logged out.");
  }

  // Check if the user is logged in
  isLoggedIn() {
    return !!this.token; // Return true if token exists
  }
}

const authStore = new AuthStore();
export default authStore;