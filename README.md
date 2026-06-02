# SmartFlow AI Tasker 🚀

**AI-Powered Task Breakdown Assistant**

A full-stack web application that uses Google Gemini AI to intelligently break down complex tasks into structured subtasks with priorities, categories, and estimated time.

![SmartFlow AI Tasker](https://via.placeholder.com/800x450/1e40af/ffffff?text=SmartFlow+AI+Tasker)

## ✨ Features

- AI-powered task decomposition using Gemini
- Smart categorization and priority assignment
- Modern, clean and responsive UI
- Full-stack architecture (React + Node.js)
- Real-time interaction with AI

## 🛠 Tech Stack

**Frontend:** React.js + Vite | Tailwind CSS  
**Backend:** Node.js + Express.js  
**AI Integration:** Google Gemini 1.5 Flash  
**Other:** REST API, CORS, dotenv

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- Google Gemini API Key

### Installation

```bash
# Clone the repository
git clone https://github.com/viktordimovski-collab/smartflow-ai-tasker.git
cd smartflow-ai-tasker

# Backend
cd server
npm install
cp .env.example .env
# Add your GEMINI_API_KEY in .env file
npm run dev

# Frontend (in a new terminal)
cd ../client
npm install
npm run dev
