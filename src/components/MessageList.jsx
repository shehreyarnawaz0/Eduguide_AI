import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import TypingIndicator from "./TypingIndicator";
import { AlertCircle } from "lucide-react";

const MessageList = ({ messages, isLoading, error }) => {
  const bottomRef = useRef(null);

  // Auto-scroll to the bottom whenever messages or loading state changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="message-list-container">
      <div className="messages-scroll-area">
        {messages.map((msg) => (
          <MessageItem key={msg.id} message={msg} />
        ))}

        {/* Loading / Typing Indicator */}
        {isLoading && <TypingIndicator />}

        {/* User-friendly inline error banner */}
        {error && (
          <div className="chat-error-banner">
            <AlertCircle size={18} className="error-banner-icon" />
            <div className="error-banner-text">
              <span className="error-title">Helpdesk Connection Alert</span>
              <span className="error-desc">{error}</span>
            </div>
          </div>
        )}

        {/* Target anchor for auto-scroll */}
        <div ref={bottomRef} style={{ float: "left", clear: "both" }} />
      </div>
    </div>
  );
};

export default MessageList;
