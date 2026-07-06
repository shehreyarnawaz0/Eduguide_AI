import axios from "axios";
import { SYSTEM_PROMPT, FALLBACK_RESPONSE, MOCK_KNOWLEDGE_BASE } from "../utils/constants";

/**
 * Validates whether the user message falls within the university scope in Mock Mode.
 * Performs basic keyword checking.
 * 
 * @param {string} userText 
 * @returns {string} The appropriate response from mock database or standard fallback.
 */
const getMockResponse = (userText) => {
  const text = userText.toLowerCase();

  // Find if any mock knowledge entry has keywords matching the query
  for (const entry of MOCK_KNOWLEDGE_BASE) {
    if (entry.keywords.some(keyword => text.includes(keyword))) {
      return entry.answer;
    }
  }

  // If no keywords match, trigger standard scope fallback
  return FALLBACK_RESPONSE;
};

/**
 * Sends conversation messages to OpenAI API or processes them locally in Mock Mode.
 * 
 * @param {Array} chatMessages - List of messages in the format [{ role: 'user'|'assistant', content: '' }]
 * @param {Object} options - Custom parameters (e.g. model)
 * @returns {Promise<string>} The response content from the AI or mock system.
 */
export const sendMessageToAI = async (chatMessages, options = {}) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const isMockMode = !apiKey || apiKey === "your_api_key_here" || apiKey.trim() === "";

  // 1. Simulation / Mock Mode
  if (isMockMode) {
    return new Promise((resolve) => {
      // Simulate artificial network delay (1.2s to 2s) for natural typing indicator
      const delay = Math.random() * 800 + 1200;
      setTimeout(() => {
        const lastUserMessage = [...chatMessages]
          .reverse()
          .find(msg => msg.role === "user");
        
        if (!lastUserMessage) {
          resolve("Hello! How can I assist you today?");
          return;
        }

        const answer = getMockResponse(lastUserMessage.content);
        resolve(answer);
      }, delay);
    });
  }

  // 2. Live API Mode
  try {
    // Construct request history payload with System Prompt prepended
    const formattedMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...chatMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: options.model || "gpt-4o-mini",
        messages: formattedMessages,
        temperature: 0.2, // Low temperature ensures consistency and adherence to prompt scope
        max_tokens: 400
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        timeout: 15000 // 15-second timeout
      }
    );

    if (response.data && response.data.choices && response.data.choices[0]) {
      return response.data.choices[0].message.content.trim();
    } else {
      throw new Error("Invalid API response structure received from OpenAI.");
    }
  } catch (error) {
    console.error("OpenAI API Call Error:", error);

    let friendlyMessage = "Something went wrong while contacting the helpdesk service.";

    if (error.response) {
      const status = error.response.status;
      const apiErrorMessage = error.response.data?.error?.message || "";
      
      switch (status) {
        case 401:
          friendlyMessage = "API Authentication failed. Please check if your OpenAI API key in .env is correct and active.";
          break;
        case 429:
          friendlyMessage = "Too many requests. You have hit a rate limit or your OpenAI account has run out of usage credits. Try again in a few moments.";
          break;
        case 403:
          friendlyMessage = "Access denied. The API endpoint may be restricted or blocked. Please verify your OpenAI permissions.";
          break;
        case 500:
        case 503:
          friendlyMessage = "OpenAI server error. Their services are currently overloaded. Please retry in a moment.";
          break;
        default:
          friendlyMessage = `OpenAI API Error (${status}): ${apiErrorMessage || error.message}`;
      }
    } else if (error.code === "ECONNABORTED") {
      friendlyMessage = "Connection timeout. The server took too long to respond. Please check your internet speed and try again.";
    } else if (error.request) {
      friendlyMessage = "Network error. Unable to establish a connection to OpenAI. Please verify you are online.";
    } else {
      friendlyMessage = error.message;
    }

    throw new Error(friendlyMessage);
  }
};
