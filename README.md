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

### 🛠️ Technologies & Languages Used

#### **Languages**
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

#### **Frontend**
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

#### **Backend & AI**
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Spring AI](https://img.shields.io/badge/Spring_AI-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Ollama](https://img.shields.io/badge/Ollama-000000?style=for-the-badge&logo=ollama&logoColor=white)

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


