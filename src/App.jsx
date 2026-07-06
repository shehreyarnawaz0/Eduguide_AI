import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import { useChat } from "./hooks/useChat";

const App = () => {
  // Determine initial theme (checking localStorage first, then system preference)
  const [isDark, setIsDark] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("eduguide_theme_dark");
      if (savedTheme !== null) {
        return JSON.parse(savedTheme);
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch (e) {
      return false;
    }
  });

  const {
    messages,
    isLoading,
    error,
    isMockMode,
    sendMessage,
    clearChat
  } = useChat();

  // Apply dark theme class to the document root element for global styling
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark-theme");
    } else {
      root.classList.remove("dark-theme");
    }
    try {
      localStorage.setItem("eduguide_theme_dark", JSON.stringify(isDark));
    } catch (e) {
      console.error("Failed to persist theme setting:", e);
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <div className="app-container">
      <div className="app-content-wrapper">
        {/* Sidebar Info Panel */}
        <Sidebar
          onSelectQuestion={sendMessage}
          isLoading={isLoading}
        />

        {/* Core Chat window */}
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          error={error}
          isMockMode={isMockMode}
          isDark={isDark}
          onToggleTheme={handleToggleTheme}
          onClearChat={clearChat}
          onSendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default App;
