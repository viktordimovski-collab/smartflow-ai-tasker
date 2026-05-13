# SmartFlow AI Tasker 🚀

**AI-Powered Task Breakdown Assistant**  
An intelligent productivity tool that uses Google's Gemini AI to break down complex tasks into structured subtasks with priority, category, and icons.

![SmartFlow AI Dashboard](https://via.placeholder.com/800x420/1e40af/ffffff?text=SmartFlow+AI+Tasker)

## ✨ Features

- **Gemini AI Integration** – Automatically decomposes complex tasks
- **Smart Categorization** – Auto assigns title, description, priority, category & icon
- **Multiple Use Cases** – Gaming (Dota 2), productivity, lifestyle & more
- **Modern & Responsive UI** – Built with React + Tailwind
- **Clean Architecture** – Separate client & server

## 🛠 Tech Stack

**Frontend:** React.js + Vite | Tailwind CSS  
**Backend:** Node.js + Express.js  
**AI:** Google Gemini Flash models  
**Other:** CORS, dotenv

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Gemini API Key [](https://ai.google.dev)

### Installation

```bash
# Clone the project
git clone https://github.com/viktordimovski-collab/smartflow-ai-tasker.git
cd smartflow-ai-tasker

# Backend
cd server
npm install
cp .env.example .env          # Add your GEMINI_API_KEY
npm run dev

# Frontend (open new terminal)
cd ../client
npm install
npm run dev
