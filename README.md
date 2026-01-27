# AI Project Requirement Analyzer 🧠

> **A decision-support system that converts raw project ideas into structured, constraint-aware engineering blueprints.**

![Project Status](https://img.shields.io/badge/Status-MVP_Complete-success)
![Tech Stack](https://img.shields.io/badge/Stack-React_|_Node_|_Gemini_AI-blue)

## 🧩 The Problem
Most early-stage developers and students fail not because they can't code, but because they **can't plan**. 
- They choose tech stacks based on hype, not requirements.
- They underestimate timelines by 300%.
- They ignore critical risks until deployment.

## 💡 The Solution
This is **not a wrapper** around ChatGPT. It is an engineering tool that uses AI to enforce **constraint-based reasoning**.

Instead of a chat interface, it uses a multi-step analysis pipeline to:
1.  **Brutalize Scope:** Aggressively cut features based on team size (e.g., "Solo devs shouldn't build Microservices").
2.  **Estimate Uncertainty:** It doesn't give a date; it gives a *confidence range* based on input vagueness.
3.  **Simulate Scenarios:** Runs A/B tests on project constraints (e.g., "What if I hire one more person?").

## 🏗️ Architecture

The system follows a decoupled **Client-Server-Intelligence** architecture:

\`\`\`mermaid
graph LR
    User[User Input] --> Client[React + Vite]
    Client -->|JSON| API[Node.js Express API]
    API -->|System Prompt + Constraints| Brain[Google Gemini 1.5 Flash]
    Brain -->|Strict JSON Schema| API
    API -->|Validation| Client
\`\`\`

### Key Technical Decisions
- **Strict JSON Enforcement:** The AI is instructed via System Prompts to return a strict schema. We don't parse markdown; we parse data.
- **Latency Optimization:** Uses `Gemini 1.5 Flash` for sub-3s analysis times while maintaining reasoning depth.
- **Stateless Backend:** The Node.js layer is purely functional, allowing for infinite horizontal scaling on serverless platforms (Vercel/Render).

## 🚀 Features

### 1. Constraint-Aware Planning
Input your **Skill Level** (Beginner/Intermediate) and **Time Budget**. The system adjusts the roadmap difficulty accordingly.

### 2. Scenario Simulator (Comparison Mode)
Run two parallel simulations to see how changing a variable (e.g., *2 Weeks vs 2 Months*) alters the tech stack and feature set.

### 3. Risk Engine
Identifies specific failure modes (e.g., "GDPR compliance risk" for a solo dev building a social network).

## 🛠️ Installation & Setup

### Prerequisites
- Node.js v18+
- Google Gemini API Key (Free)

### 1. Clone & Install
\`\`\`bash
git clone https://github.com/YOUR_USERNAME/project-plan-assistant.git
cd project-plan-assistant
npm install
cd server
npm install
\`\`\`

### 2. Configure Environment
Create a \`.env\` file in the \`/server\` directory:
\`\`\`env
GEMINI_API_KEY=your_key_here
PORT=5000
\`\`\`

### 3. Run Locally (Parallel)
**Terminal 1 (Backend):**
\`\`\`bash
cd server
node index.js
\`\`\`

**Terminal 2 (Frontend):**
\`\`\`bash
npm run dev
\`\`\`

## 🔮 Future Roadmap
- [ ] **Export to PDF/Markdown:** Generate a downloadable PRD (Product Requirements Doc).
- [ ] **Jira Integration:** Convert generated features into Jira tickets.
- [ ] **Architecture Diagrams:** AI generation of Mermaid.js system diagrams.

---
*Built to demonstrate realistic AI engineering, not just prompt engineering.*