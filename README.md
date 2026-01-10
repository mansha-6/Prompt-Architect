# PromptArchitect - Multi-Modal Prompt Refinement System

A next-generation tool that transforms vague ideas, sketches, and documents into professional technical specifications using **Gemini 2.5 Flash**.

## 🚀 Features

-   **Multi-Modal Input**: Drop images (wireframes), PDFs (requirements), or text.
-   **AI-Powered Refinement**: Uses Google's **Gemini 2.5 Flash** for high-speed, accurate technical specification generation.
-   **Structured Output**: Generates a standardized JSON schema identifying:
    -   Core Intent
    -   Functional Requirements (MoSCoW prioritized)
    -   Tech Stack Recommendations
    -   Ambiguities & Questions (Critical for consultants)
-   **Premium UI**:
    -   **Dark Mode**: Modern, glassmorphic aesthetic with deep slate backgrounds.
    -   **Modular Architecture**: Clean separation of Input and Output concerns.
    -   **Responsiveness**: Fully responsive layout built with Tailwind v4.

## 🛠️ Setup & Running

1.  **Clone/Nav to directory**:
    ```bash
    cd prompt-refiner
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env.local` file in the root:
    ```env
    GEMINI_API_KEY=your_key_here
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000).

## 🧩 Architecture

-   **Frontend**: Next.js 14 (App Router) for server-side structure and client-side interactivity.
-   **Backend API**: Next.js API Routes (`app/api/refine/route.ts`) acting as a secure proxy to Gemini.
-   **AI Integration**: Direct multi-modal prompt injection using `@google/generative-ai`. We bypass complex OCR libraries by leveraging Gemini's native vision capabilities.

## 💡 Design Rationale

**Why this structure?**
I chose a standard schema that encompasses both *Business Value* (Intent) and *Engineering Reality* (Stack/Constraints). The "Ambiguities" section is unique—it simulates a senior engineer asking clarifying questions, which is the hallmark of a true "refinement" process.

**Why Next.js?**
Speed of delivery and unified architecture. It allows us to ship a full-stack prototype in a single weekend while maintaining production-grade code habits (TypeScript, Tailwind, Server Actions/API).
