# MusicGPT: AI-Powered Voice and Music Generation Platform

MusicGPT is a full-stack application designed for generating speech and music content using AI. It features a modern, scalable architecture with a NestJS backend and a Next.js frontend, all containerized with Docker for easy setup and deployment.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Docker Setup (Recommended)](#docker-setup-recommended)
  - [Manual Setup (Without Docker)](#manual-setup-without-docker)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Key Design Decisions](#key-design-decisions)

## Features

- **AI-Powered Generation**: Core functionality for creating speech and music from text prompts.
- **Dual Creation Tools**:
  - **Text to Speech**: Convert text into high-quality speech using a diverse catalog of voices.
  - **Create Anything**: Generate original music from a descriptive prompt, with options for lyrics, instrumental modes, and uploading audio files.
- **Dynamic Voice Catalog**:
  - Browse and select from a wide range of voices.
  - Filter voices by language (English, Nepali, Indian).
  - Search for specific voices by name.
  - Infinite scroll for a seamless browsing experience.
- **Performance-Optimized**: Backend API responses are cached using Redis to ensure fast and efficient data retrieval.
- **Containerized Environment**: Utilizes Docker and Docker Compose for a consistent, one-command setup process.
- **Modern & Scalable**: Built with industry-leading frameworks like NestJS and Next.js, ensuring a maintainable and scalable codebase.

## Tech Stack

| Area         | Technology                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------ |
| **Frontend** | **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, **TanStack Query (React Query)** |
| **Backend**  | **NestJS**, **TypeScript**, **Prisma (ORM)**                                               |
| **Database** | **PostgreSQL**                                                                             |
| **Caching**  | **Redis**                                                                                  |
| **Infra**    | **Docker**, **Docker Compose**                                                             |
| **API Docs** | **Swagger (OpenAPI)**                                                                      |

## Architecture

The application follows a modular, service-oriented architecture. The Next.js frontend communicates with the NestJS backend API, which in turn interacts with the PostgreSQL database and Redis cache.

```mermaid
flowchart TB
    User[User] --> Frontend[Next.js Frontend]
    Frontend --> API[NestJS API]

    subgraph Backend Services
        API --> VoicesModule[Voices Module]
        API --> SpeechModule[Speech Requests Module]

        VoicesModule --> RedisService[Redis Service]
        SpeechModule --> PrismaService[Prisma Service]
        VoicesModule --> PrismaService

        PrismaService --> DB[(PostgreSQL)]
        RedisService --> Cache[(Redis Cache)]
    end
```

## Getting Started

### Prerequisites

- **Git**: For cloning the repository.
- **Docker & Docker Compose**: For the recommended setup.
- **Node.js (v18+)**: Required for manual setup.

### Docker Setup (Recommended)

This is the simplest way to get the entire application running.

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Start all services:**
    The `-d` flag runs the containers in detached mode.

    ```bash
    docker compose up -d
    ```

3.  **Seed the database:**
    This command populates the database with an initial set of voices.

    ```bash
    docker compose exec backend npm run seed
    ```

4.  **Access the applications:**
    - **Frontend**: [http://localhost:3001](http://localhost:3001)
    - **Backend API**: [http://localhost:3000](http://localhost:3000)
    - **API Documentation (Swagger)**: [http://localhost:3000/api](http://localhost:3000/api)

#### Frontend Setup

1.  **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the `frontend` directory. Ensure `NEXT_PUBLIC_API_URL` points to your running backend (e.g., `http://localhost:3000`).

4.  **Start the frontend server:**
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:3001`.

## Project Structure

The project is organized as a monorepo with a clear separation of concerns:

```
.
├── backend/                # NestJS Backend API
│   ├── src/                # Source code
│   │   ├── voices/         # Module for handling voice data
│   │   └── speech-requests/# Module for handling generation requests
│   ├── prisma/             # Prisma schema and migrations
│   └── ...
├── frontend/               # Next.js Frontend Application
│   ├── src/
│   │   ├── app/            # Next.js App Router pages
│   │   ├── components/     # Reusable React components
│   │   ├── hooks/          # Custom hooks for API calls and state logic
│   │   └── utils/          # Utilities, API client, etc.
│   └── ...
├── docker-compose.yml      # Defines and configures all services for Docker
└── README.md               # This file
```

## API Endpoints

The API is documented via Swagger at `http://localhost:3000/api`. Key endpoints include:

- `GET /voices`: Retrieves a paginated list of voices. Supports filtering by `language` and pagination with `page` and `limit`.
- `GET /voices/search`: Searches for voices by name. Supports `query`, `language`, `page`, and `limit`.
- `POST /speech-requests`: Creates a new speech or music generation request.
- `DELETE /cache`: Clears all cached data from Redis.

## Environment Variables

The application relies on environment variables for configuration.

#### Backend (`backend/.env`)

| Variable       | Description                   | Default (in `docker-compose.yml`)                       |
| -------------- | ----------------------------- | ------------------------------------------------------- |
| `PORT`         | Port for the NestJS server.   | `3000`                                                  |
| `DATABASE_URL` | PostgreSQL connection string. | `postgresql://postgres:postgres@postgres:5432/musicgpt` |
| `REDIS_HOST`   | Redis host.                   | `redis`                                                 |
| `REDIS_PORT`   | Redis port.                   | `6379`                                                  |

#### Frontend (`frontend/.env.local`)

| Variable              | Description             | Default                 |
| --------------------- | ----------------------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | URL of the backend API. | `http://localhost:3000` |

## Key Design Decisions

- **Monorepo Structure**: A monorepo was chosen to streamline development and dependency management between the frontend and backend. It simplifies local setup and makes cross-service changes easier to coordinate.

- **Docker for Development**: Using Docker Compose ensures a consistent and reproducible development environment for all contributors. It eliminates the "it works on my machine" problem by containerizing the database, cache, and backend service, which can be started with a single command.

- **NestJS for the Backend**: NestJS provides a structured, modular architecture out-of-the-box. Its use of TypeScript, dependency injection, and clear design patterns makes the API robust, maintainable, and scalable.

- **Next.js (App Router) for the Frontend**: The Next.js App Router was selected for its modern approach to building React applications, offering server-side rendering, streamlined routing, and excellent performance.

- **Prisma as ORM**: Prisma was chosen for its strong type safety, which catches database-related errors at compile time. Its auto-generated client and intuitive API for database operations significantly speed up development.

- **Redis for Caching**: The `/voices` endpoint is a frequent target for read operations. To reduce database load and improve response times, a Redis caching layer was implemented. The `VoicesService` intelligently caches paginated and filtered results, leading to a much snappier user experience.

- **TanStack Query (React Query) on Frontend**: This library was used to manage server state. It simplifies data fetching, caching, and synchronization, handling complex UI states like loading, error, and pagination with minimal boilerplate code. This is evident in the `useVoices` hook, which manages the infinite scroll feature.
