import React from "react";
import { Sun, Moon, Trash2, GraduationCap } from "lucide-react";

const ChatHeader = ({ isDark, onToggleTheme, onClearChat, isMockMode }) => {
  return (
    <header className="chat-header">
      <div className="header-brand">
        <div className="brand-icon-bg">
          <GraduationCap size={20} className="brand-logo-icon" />
        </div>
        <div className="brand-info">
          <h1 className="brand-title">EduGuide AI</h1>
          <div className="bot-status-container">
            <span className="status-dot-pulse"></span>
            <span className="status-text">Online Helpdesk</span>
          </div>
        </div>
      </div>

      <div className="header-actions">
        {/* Mode indicator badge */}
        <div className={`mode-badge ${isMockMode ? "badge-simulated" : "badge-live"}`} title={isMockMode ? "Running in local simulation mode" : "Connected to Live OpenAI API"}>
          {isMockMode ? "Simulation" : "Live API"}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="header-action-btn theme-toggle-btn"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Light Mode" : "Dark Mode"}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Clear Chat History */}
        <button
          onClick={onClearChat}
          className="header-action-btn clear-chat-btn"
          aria-label="Clear chat history"
          title="Clear Conversation"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
