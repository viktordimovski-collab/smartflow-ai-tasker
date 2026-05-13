# SmartFlow AI Tasker

**AI-Powered Task Breakdown Assistant**  
An intelligent task management application that uses Google's Gemini AI to automatically break down complex tasks into structured, actionable subtasks.

![SmartFlow AI](https://via.placeholder.com/800x400?text=SmartFlow+AI+Dashboard) <!-- Овде подоцна стави реална слика -->

## ✨ Features

- **AI Task Decomposition** – Break down complex tasks using Gemini 1.5/2.0 Flash
- **Smart Categorization** – Automatic assignment of priority, category, and icon
- **Modern UI** – Clean and responsive React + Tailwind interface
- **Real-time Processing** – Fast backend with Node.js + Express
- **Multiple Use Cases** – From gaming research to daily productivity and shopping

## 🛠 Tech Stack

**Frontend:**
- React.js
- Vite
- Tailwind CSS

**Backend:**
- Node.js + Express
- Gemini API (Google)
- CORS & dotenv

**Tools:**
- Git + GitHub
- ESLint + Prettier

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- Gemini API Key [](https://ai.google.dev)

### Installation

```bash
# Clone the repository
git clone https://github.com/viktordimovski-collab/smartflow-ai-tasker.git
cd smartflow-ai-tasker

# Backend setup
cd server
npm install
cp .env.example .env     # Add your GEMINI_API_KEY
npm run dev

# Frontend setup (new terminal)
cd ../client
npm install
npm run dev
