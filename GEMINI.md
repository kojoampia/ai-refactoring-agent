# ai-refactoring-agent (SpringRefactor AI)

Professional agentic platform for refactoring legacy Spring Boot applications to modern Spring Boot 3+ standards and Spring AI architectures.

## Project Overview
This project focuses on automating the modernization of Java Spring Boot applications. It leverages the Gemini API to analyze legacy code and generate refactored versions that adhere to contemporary best practices.

## Tech Stack
- **Frontend:** React with Vite
- **Language:** TypeScript
- **AI Integration:** Gemini API (managed via `src/services/refactorService.ts`)
- **Styling:** CSS

## Core Workflows
- **Code Analysis:** Analyzing Java files for legacy patterns.
- **Refactoring:** Generating updated code for Spring Boot 3+ and Spring AI.
- **Verification:** (Planned) Validating generated code against modern standards.

## Architecture
- `src/services/`: Contains the core logic for interacting with the AI refactoring engine.
- `src/App.tsx`: Main entry point for the refactoring dashboard.
