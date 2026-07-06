import React from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

const ChatWindow = ({
  messages,
  isLoading,
  error,
  isMockMode,
  isDark,
  onToggleTheme,
  onClearChat,
  onSendMessage
}) => {
  return (
    <main className="chat-window-container">
      {/* Header Bar */}
      <ChatHeader
        isDark={isDark}
        onToggleTheme={onToggleTheme}
        onClearChat={onClearChat}
        isMockMode={isMockMode}
      />

      {/* Message History View */}
      <MessageList
        messages={messages}
        isLoading={isLoading}
        error={error}
      />

      {/* Message Typing Panel */}
      <ChatInput
        onSendMessage={onSendMessage}
        isLoading={isLoading}
      />
    </main>
  );
};

export default ChatWindow;
