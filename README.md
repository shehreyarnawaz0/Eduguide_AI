# EduGuide AI – Smart Student Helpdesk Assistant

EduGuide AI is an intelligent, intent-based conversational helpdesk assistant designed to help university students, applicants, and staff find answers to campus-related questions. The assistant provides quick and accurate responses regarding admissions, tuition fees, course catalogs, academic calendars, scholarships, campus housing, and IT support services.

Built with React 19, Vite, and OpenAI API, the assistant features a strict, restricted domain scope. It declines to answer queries unrelated to university life, preventing hallucinations or false information. 

> [!TIP]
> **Ready for Review (Zero-Config Test Mode)**
> If no OpenAI API Key is provided, the application runs in a simulated **Simulation Mode**. It runs intelligent keyword heuristic matching locally with simulated network latency and bubbles to mimic typing indicators. This makes the project immediately testable and review-ready without requiring API key setups.

---

## 🌟 Key Features

- **Intent-Based Filtering**: Rejects out-of-scope inquiries (e.g., general programming, math, world news) using domain guardrails.
- **Visual Design**: Sleek glassmorphic UI, tailored HSL Dark & Light themes, dynamic animations (typing indicator, scroll-to-bottom, pulsing status dots, hover scale transitions).
- **Preset FAQ Chips**: Sidebar chips populated with quick-test queries (including a button to test out-of-scope behavior).
- **Session Persistence**: Chat history and theme settings are saved locally to `localStorage` and persist through page reloads.
- **Robust Error Handling**: Friendly error messages and connection alerts for API rate limits, bad keys, or network failures.
- **Clean Structure**: Highly modular folder structure with reusable hooks, components, and services.

---

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: JavaScript (ES6+)
- **Styling**: Vanilla CSS (CSS variables, flexbox, glassmorphic grids, transitions)
- **API Client**: Axios
- **Icon Set**: Lucide React
- **Deployment**: Vercel

---

## 📁 Project Structure

```
Eduguide AI/
├── .env.example          # Template environment file
├── .env                  # Active environment variables
├── index.html            # Main HTML wrapper
├── package.json          # Dependency manifest
├── vite.config.js        # Vite bundler configurations
└── src/
    ├── main.jsx          # App bootstrap file
    ├── index.css         # Design system (HSL themes, variables, animations)
    ├── App.jsx           # Main grid layout & theme provider
    ├── App.css           # Unused (cleared)
    ├── components/
    │   ├── Sidebar.jsx        # FAQ preset chips, university scope guidelines
    │   ├── ChatWindow.jsx     # Main interface viewport wrapper
    │   ├── ChatHeader.jsx     # Bot title, status pulse, theme & clear actions
    │   ├── MessageList.jsx    # Scrollable bubble list, inline error banners
    │   ├── MessageItem.jsx    # User/bot bubble, markdown parser, avatars
    │   ├── ChatInput.jsx      # Input validations, character limits (500 char cap)
    │   └── TypingIndicator.jsx# Animated bouncing dots for assistant thinking state
    ├── hooks/
    │   └── useChat.js         # Custom hook for messages state and business logic
    ├── services/
    │   └── openai.js          # API service with Axios and local mock simulation fallback
    └── utils/
        └── constants.js       # System Prompt, fallback texts, mock answers database
```

---

## 🚀 Installation & Local Setup

### 1. Clone & Navigate
Ensure you have [Node.js](https://nodejs.org/) installed, then navigate to your project directory.

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variable Configuration
Copy the `.env.example` file to `.env`:
- **Windows (PowerShell)**:
  ```powershell
  Copy-Item .env.example .env
  ```
- **Linux/macOS**:
  ```bash
  cp .env.example .env
  ```
Open the `.env` file and insert your API key:
```env
VITE_OPENAI_API_KEY=sk-proj-YourActualOpenAiKeyHere
```
*Note: If left blank or set to `your_api_key_here`, the application automatically falls back to **Simulation Mode**.*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your web browser.

### 5. Build for Production
```bash
npm run build
```

---

## ☁️ Deployment Steps (Vercel)

You can easily deploy this Vite + React project to Vercel in 2 minutes:

### Option A: Vercel Git Integration (Recommended)
1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Sign in to the [Vercel Dashboard](https://vercel.com).
3. Click **Add New** > **Project** and import your repository.
4. In the configuration stage, Vercel will auto-detect Vite. Leave build command (`npm run build`) and output directory (`dist`) as default.
5. Expand **Environment Variables** and add:
   - Key: `VITE_OPENAI_API_KEY`
   - Value: `sk-proj-YourKey...` (Leave blank if you wish to host the Simulation version).
6. Click **Deploy**.

### Option B: Vercel CLI (Quick Command Line)
1. Install Vercel globally:
   ```bash
   npm install -g vercel
   ```
2. Run the deployment command inside the project root:
   ```bash
   vercel
   ```
3. Follow the setup prompts. To deploy to production with env variables, set them up on the web dashboard or deploy with:
   ```bash
   vercel --prod
   ```

---

## 🔮 Future Improvements

1. **Voice Input / TTS**: Integrate Speech-to-Text API for hands-free queries, and Text-to-Speech to read out responses.
2. **Interactive Elements**: Embed interactive map elements, dropdown select components for course selection, or dynamic calendar cards.
3. **Admin Dashboard**: Build a panel where university staff can view search telemetry, check frequently asked questions, and update the system prompt categories dynamically.
4. **Context-Aware RAG (Retrieval-Augmented Generation)**: Connect the assistant to a vector database containing the actual PDF university catalogs, academic rulebooks, and course syllabus files for 100% precise student advising.
