import { makeAutoObservable } from "mobx";

class ChatStore {
  messages = JSON.parse(localStorage.getItem("messages")) || []; // Load messages from localStorage
  isTyping = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Add a message to the chat
  addMessage(message) {
    this.messages.push(message);
    this.saveMessages(); // Save messages to localStorage
  }

  // Set the typing state
  setTyping(isTyping) {
    this.isTyping = isTyping;
  }

  // Clear all messages
  clearMessages() {
    this.messages = [];
    this.saveMessages(); // Clear messages in localStorage
  }

  // Save messages to localStorage
  saveMessages() {
    localStorage.setItem("messages", JSON.stringify(this.messages));
  }
}

const chatStore = new ChatStore();
export default chatStore;