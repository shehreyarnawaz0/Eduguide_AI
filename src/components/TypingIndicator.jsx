import React from "react";

const TypingIndicator = () => {
  return (
    <div className="typing-indicator-container">
      <div className="avatar-placeholder bot-avatar-mini">
        <span>Edu</span>
      </div>
      <div className="typing-bubble">
        <span className="typing-dot"></span>
        <span className="typing-dot"></span>
        <span className="typing-dot"></span>
      </div>
    </div>
  );
};

export default TypingIndicator;
