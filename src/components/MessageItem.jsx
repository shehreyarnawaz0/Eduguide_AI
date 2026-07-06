import React from "react";
import { User, Sparkles } from "lucide-react";

/**
 * A safe, lightweight React parser for basic markdown features
 * Supports: bold (**text**), line breaks, and bulleted/numbered lists
 * 
 * @param {string} text 
 * @returns {React.ReactNode[]} React elements representing the formatted text
 */
const formatMessageText = (text) => {
  if (!text) return "";

  const lines = text.split("\n");
  let inList = false;
  let listElements = [];
  const finalElements = [];

  const parseLineContent = (content) => {
    // Regex split to identify bold parts: "**bold text**"
    const parts = content.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={idx}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  lines.forEach((line, index) => {
    // Detect bullet points (* or -) or numbered items (1. 2. etc.)
    const bulletMatch = line.match(/^(\*|-)\s+(.*)/);
    const numberMatch = line.match(/^(\d+)\.\s+(.*)/);

    if (bulletMatch) {
      inList = true;
      listElements.push(
        <li key={`li-${index}`} className="chat-list-item">
          <span className="bullet-symbol">•</span>
          <span className="list-content">{parseLineContent(bulletMatch[2])}</span>
        </li>
      );
    } else if (numberMatch) {
      inList = true;
      listElements.push(
        <li key={`li-${index}`} className="chat-list-item">
          <span className="bullet-number">{numberMatch[1]}.</span>
          <span className="list-content">{parseLineContent(numberMatch[2])}</span>
        </li>
      );
    } else {
      // If we were inside a list and hit a non-list line, dump the list first
      if (inList && listElements.length > 0) {
        finalElements.push(
          <ul key={`ul-${index}`} className="chat-bullet-list">
            {listElements}
          </ul>
        );
        listElements = [];
        inList = false;
      }

      // Render standard paragraph (skip completely empty lines to reduce vertical bloat)
      if (line.trim() !== "") {
        finalElements.push(
          <p key={`p-${index}`} className="chat-paragraph">
            {parseLineContent(line)}
          </p>
        );
      }
    }
  });

  // Pick up any trailing list elements
  if (inList && listElements.length > 0) {
    finalElements.push(
      <ul key={`ul-end`} className="chat-bullet-list">
        {listElements}
      </ul>
    );
  }

  return finalElements;
};

const MessageItem = ({ message }) => {
  const isUser = message.role === "user";
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <div className={`message-row ${isUser ? "user-row" : "bot-row"}`}>
      <div className="message-container">
        {/* Avatar */}
        <div className={`avatar-wrapper ${isUser ? "user-avatar-bg" : "bot-avatar-bg"}`}>
          {isUser ? (
            <User size={16} className="avatar-icon" />
          ) : (
            <Sparkles size={16} className="avatar-icon" />
          )}
        </div>

        {/* Message Bubble */}
        <div className="message-bubble-wrapper">
          <div className="message-header-info">
            <span className="sender-name">{isUser ? "You" : "EduGuide AI"}</span>
            <span className="message-time">{formattedTime}</span>
          </div>
          <div className="message-bubble">
            {formatMessageText(message.content)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
