# 🤖 AI Help Desk Chatbot

An AI-powered Help Desk Chatbot built using **Spring Boot, Spring AI, Ollama, React, Tailwind CSS, and MySQL**.

The application provides intelligent support through a human-like AI assistant named **Kiya**. Users can describe their problems through text or voice, receive troubleshooting suggestions, and raise or manage support tickets when necessary.

---

## ✨ Features

- 🤖 AI-powered Help Desk Assistant
- 💬 Human-like conversational chat
- 🎤 Voice-to-Text input
- 🧠 Conversation memory
- 🔧 Intelligent troubleshooting suggestions
- 🎫 Create support tickets
- 🔍 Search existing tickets
- 🔄 Update support tickets
- 🔒 Close resolved tickets
- 🗄️ MySQL database integration
- 🦙 Local AI using Ollama
- ⚡ Spring AI Tool Calling
- 📱 Responsive React frontend
- 🎨 Modern UI with Tailwind CSS
- ⬇️ Automatic chat scrolling
- ⌨️ Press Enter to send messages

---

# 🏗️ Architecture

```text
React + Tailwind CSS
        │
        │ HTTP Request
        ▼
Spring Boot Backend
        │
        ▼
Spring AI
        │
        ├──────────────► Ollama
        │                   │
        │                   ▼
        │              Llama 3.2
        │
        ▼
Ticket Database Tools
        │
        ▼
MySQL Database
