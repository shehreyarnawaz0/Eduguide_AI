import React, { useState, useRef, useEffect } from "react";
import { SendHorizontal } from "lucide-react";

const CHARACTER_LIMIT = 500;

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  // Auto-focus input on mount and when loading finishes
  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (text.trim() === "" || isLoading) return;

    onSendMessage(text.trim());
    setText("");
  };

  const handleChange = (e) => {
    const val = e.target.value;
    if (val.length <= CHARACTER_LIMIT) {
      setText(val);
    }
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <div className="chat-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={handleChange}
          disabled={isLoading}
          placeholder={isLoading ? "EduGuide AI is thinking..." : "Type your question here (e.g. How to apply?)..."}
          className="chat-text-input"
          maxLength={CHARACTER_LIMIT}
          aria-label="Student support question input"
        />
        
        {/* Character limit badge */}
        <span className={`char-counter ${text.length >= CHARACTER_LIMIT * 0.9 ? "limit-warning" : ""}`}>
          {text.length}/{CHARACTER_LIMIT}
        </span>

        <button
          type="submit"
          disabled={text.trim() === "" || isLoading}
          className="chat-send-btn"
          aria-label="Send message"
        >
          <SendHorizontal size={18} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
