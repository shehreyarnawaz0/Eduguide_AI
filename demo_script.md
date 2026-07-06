# Project Demo Script (1–2 Minute Presentation)

This script is designed for a recorded screencast, live presentation, or evaluation walkthrough of **EduGuide AI**.

---

## ⏱️ Timeline & Presentation Flow

### 1. Introduction (0:00 - 0:20)
*   **Action**: Show the web page in **Light Mode**. Point cursor at the brand header and sidebar.
*   **Script**:
    > "Hello, today I am presenting **EduGuide AI**, a smart student helpdesk assistant designed to answer university-related questions. EduGuide AI is built using **React 19, Vite, and Axios**, with dynamic theme switching and a glassmorphic design system. The goal of this assistant is to provide instant support for admissions, tuition fees, courses, and housing, while strictly remaining within its designated domain scope."

### 2. Basic Features & Simulation Mode (0:20 - 0:40)
*   **Action**: Click the **"How to Apply"** suggestion chip in the sidebar. Show the typing animation and the response sliding up. Then, toggle the **Dark Theme** button in the header.
*   **Script**:
    > "To make testing easy, the application features a **Simulation Mode** that runs out-of-the-box when no API key is set. When I click a suggested question like 'How to Apply', you see a smooth typing indicator followed by a structured response. I can also toggle between Light and Dark mode instantly. The dark theme adjusts our HSL-based colors for a premium, low-light viewing experience."

### 3. Domain Safeguards & Fallback Behavior (0:40 - 1:10)
*   **Action**: Click the **"Test Out-of-Scope"** suggestion chip (or manually type *"Can you write a JavaScript function to reverse a string?"*).
*   **Script**:
    > "One of the key requirements of EduGuide AI is its strict scope boundary. If a user asks an out-of-scope question—for example, asking for JavaScript coding solutions—the assistant immediately detects this. Instead of generating hallucinated details, it politely declines with our standard guardrail message, reminding the user of the supported subjects. Let's see it in action by sending this request. As you can see, the bot declines instantly and safely."

### 4. Error Handling & Session Persistence (1:10 - 1:30)
*   **Action**: Refresh the page to show that the chat history is still there. Then click the **Clear Conversation** button (Trash icon) to reset.
*   **Script**:
    > "EduGuide AI supports session persistence, meaning if I refresh the web page, the conversations and current theme remain active from `localStorage`. If we run into network outages or API rate limit issues, the UI displays a clean, user-friendly connection alert instead of crashing. We can clear our history at any time using the Trash icon in the header."

### 5. Code Quality & Deployment Summary (1:30 - 1:50)
*   **Action**: Briefly open the README.md structure or show the files list in your editor.
*   **Script**:
    > "Under the hood, the application code is structured according to React production standards, utilizing a custom React hook `useChat` for clean separation of concerns, and a safe native markdown parser. It is production-ready and can be deployed to Vercel in just a single click. Thank you!"
