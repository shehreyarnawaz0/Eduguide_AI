import { useState, useEffect, useCallback } from "react";
import { sendMessageToAI } from "../services/openai";

const STORAGE_KEY = "eduguide_chat_history";

const INITIAL_MESSAGE = {
  id: "welcome-msg",
  role: "assistant",
  content: "Hello! I am EduGuide AI, your Student Helpdesk Assistant. I can help answer questions about university admissions, courses, fees, scholarships, academic calendars, timetables, campus services, and student support. How can I assist you today?",
  timestamp: Date.now()
};

export const useChat = () => {
  const [messages, setMessages] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [INITIAL_MESSAGE];
    } catch (e) {
      console.error("Error reading chat history from localStorage:", e);
      return [INITIAL_MESSAGE];
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMockMode, setIsMockMode] = useState(true);

  // Check if API Key is configured
  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const isMock = !apiKey || apiKey === "your_api_key_here" || apiKey.trim() === "";
    setIsMockMode(isMock);
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error("Error writing chat history to localStorage:", e);
    }
  }, [messages]);

  /**
   * Send a new message to the assistant
   */
  const sendMessage = useCallback(async (content) => {
    if (!content || content.trim() === "") return;

    const trimmedContent = content.trim();
    
    // 1. Construct user message object
    const userMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role: "user",
      content: trimmedContent,
      timestamp: Date.now()
    };

    // 2. Optimistically append user message and clear previous error state
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // 3. Collect conversation history (excluding the very first welcome message if desired,
      // or keeping it. Let's pass the message list. We map roles to conform to API requirements).
      const historyToSend = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // 4. Send request to service
      const reply = await sendMessageToAI(historyToSend);

      // 5. Append assistant reply
      const assistantMessage = {
        id: `assistant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        role: "assistant",
        content: reply,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Chat Message Error:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  /**
   * Clears the chat history and resets to the welcome message
   */
  const clearChat = useCallback(() => {
    setMessages([INITIAL_MESSAGE]);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    messages,
    isLoading,
    error,
    isMockMode,
    sendMessage,
    clearChat
  };
};
