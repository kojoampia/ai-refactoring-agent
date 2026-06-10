<div align="center">
<img width="1200" height="475" alt="SpringRefactor AI Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# 🍃 SpringRefactor AI (v4.2)

**Modernize legacy Spring Boot applications with AI-driven precision.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini](https://img.shields.io/badge/AI-Gemini_1.5_Pro-4285F4?logo=google-gemini&logoColor=white)](https://ai.google.dev/)
</div>

---

## 🚀 Overview

**SpringRefactor AI** is a professional agentic platform designed to automate the modernization of legacy Spring Boot applications. By leveraging the power of Google's Gemini API, it analyzes legacy Java codebases and generates refactored versions that adhere to Spring Boot 3.3+, Java 21+, and modern Spring AI standards.

Whether you're dealing with deprecated `@Configuration` patterns, migrating to Java Records, or looking to integrate AI-native capabilities like Vector Stores and ChatClients, SpringRefactor AI provides the architectural guidance and code generation needed for a seamless transition.

## ✨ Key Features

- **🔍 Intelligent Technical Debt Analysis:** Identifies deprecated patterns, security vulnerabilities (like OAuth gaps), and opportunities for modernization.
- **🛠️ Automated Refactoring:** Generates clean, production-ready code using Java 21 features (Records, Virtual Threads) and Spring Boot 3+ best practices.
- **🤖 Spring AI Integration:** Automatically suggests and implements AI-native patterns, injecting `VectorStore` or `ChatClient` where relevant.
- **📊 Compliance Tracking:** Visualize your application's progress towards modern standards with real-time compliance metrics.
- **💻 Pro-Grade Dashboard:** A high-performance, dark-themed workspace built with React 19 and Framer Motion for a fluid developer experience.
- **⚡ Real-time Feedback:** Powered by `gemini-1.5-pro` (or latest preview) for deep architectural insights.

## 🛠️ Tech Stack

- **Frontend:** [React 19](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) & [Motion (Framer)](https://motion.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **AI Orchestration:** [Gemini API](https://ai.google.dev/) via `@google/genai`
- **Language:** TypeScript

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- A Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ai-refactoring-agent.git
   cd ai-refactoring-agent
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

### Running the App

Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

## 📖 Usage

1. **Upload Legacy Code:** Drag and drop your `.java` or `pom.xml` files into the workspace.
2. **Analyze:** Click the **"Refactor"** button to initiate the AI deep scan.
3. **Review Analysis:** Read the detailed breakdown of technical debt and proposed improvements.
4. **Apply Fixes:** Compare the legacy code with the refactored SB3+ version and apply changes to your project.

## 📄 License

This project is licensed under the Apache-2.0 License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">
Built with ❤️ for the Spring Community.
</div>
