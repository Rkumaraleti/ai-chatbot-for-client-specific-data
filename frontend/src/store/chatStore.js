import { makeAutoObservable } from "mobx";

class ChatStore {
  messages = JSON.parse(sessionStorage.getItem("messages")) || []; // Load messages from sessionStorage
  isTyping = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Add a message to the chat
  addMessage(message) {
    this.messages.push(message);
    this.saveMessages(); // Save messages to sessionStorage
  }

  // Set the typing state
  setTyping(isTyping) {
    this.isTyping = isTyping;
  }

  // Save messages to sessionStorage
  saveMessages() {
    sessionStorage.setItem("messages", JSON.stringify(this.messages));
  }

  // Clear all messages
  clearMessages() {
    this.messages = [];
    sessionStorage.removeItem("messages"); // Clear messages from sessionStorage
  }
}

const chatStore = new ChatStore();
export default chatStore;