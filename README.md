# Sentiment Check

A modern web application for analyzing text sentiment using Hugging Face's natural language processing capabilities.

## 🔍 Project Overview

Sentiment Check is a full-stack application built with a monorepo architecture, designed to analyze the sentiment of text inputs and provide detailed feedback. The application uses Hugging Face's pre-trained model (`distilbert-base-uncased-finetuned-sst-2-english`) to determine whether text has a positive or negative sentiment along with a confidence score.

## 🚀 Features

- Text sentiment analysis with Hugging Face's API
- React frontend with Ant Design components
- GraphQL API built with GraphQL Yoga
- Results categorization with descriptions and tips
- Form validation on client and server side

## 🛠️ Technology Stack

### Frontend

- React 19
- TypeScript
- Vite
- Ant Design (UI components)
- TanStack React Query (data fetching and caching)
- GraphQL Request (API client)
- Vitest (testing)

### Backend

- Node.js
- TypeScript
- GraphQL Yoga (GraphQL server)
- Hugging Face API (sentiment analysis)

### Shared

- TypeScript
- Zod (schema validation)

## 🧩 Architecture

The project follows a monorepo structure with three main packages:

1. **frontend**: React application that provides the user interface for text sentiment analysis.
2. **backend**: GraphQL server that communicates with the Hugging Face API.
3. **shared**: Common types and schemas shared between frontend and backend.

### Development Tools

- pnpm (package management with workspaces)
- ESLint (linting)
- Prettier (code formatting)
- Husky (git hooks)
- Lint-staged (pre-commit linting)
- TypeScript ESLint

### Data Flow

1. User enters text in the frontend form.
2. The input is validated with Zod schema.
3. If valid, the text is sent to the backend via GraphQL mutation.
4. Backend validates the input again and calls the Hugging Face API.
5. Hugging Face processes the text and returns a sentiment analysis.
6. The result is returned to the frontend.
7. Frontend displays the sentiment analysis results with appropriate styling based on the sentiment.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (v8 or higher)
- [Git](https://git-scm.com/)
- A [Hugging Face account](https://huggingface.co/) with an API token

## 🔧 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/voytek98/sentiment-check.git
   cd sentiment-check
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Add GraphQL server endpoint to the `packages/frontend/.env` file:

   ```bash
    VITE_GRAPHQL_API_URL=http://localhost:4000/graphql
   ```

4. Add your Hugging Face API token to the `packages/backend/.env` file:
   ```bash
    HF_TOKEN=your-huggingface-token
   ```

## 🚀 Running the Application

### Development Mode

To start both frontend and backend in development mode:

```bash
pnpm dev
```

This will run:

- Frontend on http://localhost:5173
- Backend on http://localhost:4000

## 🧪 Running Tests

To run all tests:

```bash
pnpm test
```

To run tests with coverage:

```bash
pnpm test:coverage
```

To run tests in watch mode:

```bash
pnpm test:watch
```

To run tests with UI:

```bash
pnpm test:ui
```

## 📁 Project Structure

```
sentiment-check/
├── packages/
│   ├── backend/           # GraphQL server with Hugging Face integration
│   │   ├── src/
│   │   │   ├── huggingface.ts  # Hugging Face API client
│   │   │   ├── index.ts        # Server entry point
│   │   │   └── schema.ts       # GraphQL schema definition
│   │   └── package.json
│   │
│   ├── frontend/          # React application
│   │   ├── src/
│   │   │   ├── api/           # API client
│   │   │   ├── components/    # UI components
│   │   │   ├── gql/           # Generated GraphQL types
│   │   │   ├── hooks/         # Custom React hooks
│   │   │   ├── pages/         # Page components
│   │   │   ├── test/          # Test utilities
│   │   │   └── utils/         # Utility functions
│   │   └── package.json
│   │
│   └── shared/            # Shared code between packages
│       ├── src/
│       │   ├── schemas.ts     # Validation schemas
│       │   ├── types.ts       # TypeScript type definitions
│       │   └── index.ts       # Entry point
│       └── package.json
│
├── .husky/               # Git hooks
├── .prettierrc          # Prettier configuration
├── eslint.config.ts     # ESLint configuration
├── package.json         # Root package.json
└── pnpm-workspace.yaml  # pnpm workspace configuration
```

## 💡 Development Challenges

During the development of this project, several technical challenges were addressed:

### 1. Consistent Form Validation Across Frontend and Backend

One of the core challenges was implementing consistent validation logic on both the frontend and backend. To solve this:

- Created a shared package with Zod schemas that could be imported in both frontend and backend
- Used the same validation schema (`InputValidationSchema`) for text input validation in both areas
- On the frontend, validation occurs before sending the GraphQL mutation
- On the backend, a second validation layer ensures data integrity before calling the Hugging Face API
- Error messages are consistently formatted across the application

This approach eliminated code duplication and ensured consistent validation rules throughout the application.

### 2. Setting up and Configuring GraphQL

As this was my first-time GraphQL implementation from scratch, several decisions and challenges were addressed:

- Selected GraphQL Yoga for the backend, and graphql-request for the frontend due to their simplicity and modern features
- Implemented code generation for type-safe GraphQL operations using GraphQL Codegen
- Created a custom GraphQL client setup with React Query for optimal caching and state management
- Designed a minimal yet complete GraphQL schema focusing on the core sentiment analysis functionality
- Handled GraphQL error cases and provided meaningful error messages to users

### 3. Monorepo Architecture and Type Sharing

Setting up a monorepo with proper sharing between packages required:

- Setting up proper TypeScript configuration for each package
- Ensuring types and interfaces were properly exported and imported across packages
- Implementing workspace-aware package management with pnpm

### 4. Tests Setup

Creating a comprehensive test suite with modern React features required:

- Setting up Vitest with proper DOM testing environment
- Mocking React Query hooks and GraphQL operations
- Implementing test coverage reporting

### 5. External API Integration

Working with the Hugging Face API presented challenges:

- Error handling for API rate limits and failures
- Response transformation to map external API format to internal types

## 🔍 What else could be improved?

- proper Layout component for pages - it's included in Home page for simplicity
- separate directory/file for providers
- i18n for multi language support
- custom theme config for ant design
- husky could consider test coverage percentage rule
- aliases setup for common directories (`@/components`, `@/hooks` etc.)
- full control on formating rules like imports order and grouping, objects sorting etc. using library like `eslint-plugin-perfectionist`
