# Work Assignment Manager

An intentionally small full-stack work-assignment application built as a hands-on React learning project. It will eventually let users view work, assign it to people, update its status, and receive updates through a backend webhook.

## Learning approach

This is an AI-assisted learning project. The AI acts as a teacher and code reviewer: it explains concepts, proposes small focused tasks, and checks the result. The project owner writes the application code manually rather than pasting in AI-generated solutions. That keeps each feature an opportunity to understand React and the surrounding tools.

The ongoing learning history and handover context are in [LEARNING_LOG.md](LEARNING_LOG.md). Read that file before continuing this project in a new chat.

## Current status

The React client is running locally and renders a static list of sample work assignments. It currently has no backend, database, authentication, or API calls; those will be added incrementally.

## Planned stack

- Frontend: React, TypeScript, Vite, ESLint, and Material UI
- Frontend patterns to learn: React Router, Axios, React Query, Jotai, and i18next
- Backend: .NET Azure Functions (isolated worker) and EF Core
- Data: SQLite locally first, with the option to move to SQL Server
- Integration: HTTP APIs, webhooks, and later Azure Service Bus

The stack is deliberately informed by the local `WorkAssignmentReact` and `WorkAssignmentFunction` repositories, while keeping this project small enough for deliberate learning.

## Run the frontend

```powershell
cd client
npm install
npm run dev
```

Vite prints the local address, normally `http://localhost:5173`.
