# Work Assignment Manager

An intentionally small full-stack work-assignment application built as a hands-on React learning project. It will eventually let users view work, assign it to people, update its status, and receive updates through a backend webhook.

## Learning approach

This is an AI-assisted learning project. The AI acts as a teacher and code reviewer: it explains concepts, proposes small focused tasks, and checks the result. The project owner writes the application code manually rather than pasting in AI-generated solutions. That keeps each feature an opportunity to understand React and the surrounding tools.

The ongoing learning history and handover context are in [LEARNING_LOG.md](LEARNING_LOG.md). **Before continuing this project in a new chat, read this README, read the learning log in full, then inspect `git status` and the recent commit log.** The log contains the current milestone, decisions, teaching preferences, visual direction, and the exact next task.

Future AI assistants must keep those two documents current whenever a meaningful milestone, architectural decision, or next step changes. **Do this proactively before recommending a milestone commit; do not wait for the user to request a log update.** The user writes application code manually; the AI teaches, reviews, and updates documentation only when authorised.

## Current status

The React client runs locally with MUI, React Router, and Jotai. It supports local-only assignment creation, assignee selection, completion, filtering, date formatting, URL routing, a shared app layout, a not-found page, and persisted assignment data in browser `localStorage`.

It currently has no backend, database, authentication, or API calls; those will be added incrementally.

## Planned stack

- Frontend: React, TypeScript, Vite, ESLint, Material UI, React Router, and Jotai
- Frontend patterns to learn: sound feature-oriented project structure, React Router, Axios, TanStack Query (formerly React Query), Jotai, Redux Toolkit, and i18next
- Backend: .NET Azure Functions (isolated worker) and EF Core
- Data: SQLite locally first, with the option to move to SQL Server
- Integration: HTTP APIs, webhooks, and later Azure Service Bus

The stack is deliberately informed by the local `WorkAssignmentReact` and `WorkAssignmentFunction` repositories, while keeping this project small enough for deliberate learning.

## Product and visual direction

The learning app is inspired by the *information-dense work-management* feel of WorkAssignment, not its corporate branding, proprietary data, authentication, or code structure. The intended visual direction is:

- a neutral, professional application shell with a top bar and responsive navigation;
- clear page titles and tabbed/filter-driven work views where they suit the learning feature;
- compact, readable lists or data grids with selection, status, search, and bulk-action patterns introduced one at a time;
- MUI-based implementation with accessible contrast and responsive layouts.

Do **not** copy the Rio Tinto name, logo, colours, user identity, business-specific plant/work-order data, or proprietary UI assets. Use neutral product wording and local mock data. The staged implementation plan and the exact WorkAssignment references are recorded in [LEARNING_LOG.md](LEARNING_LOG.md).

## Run the frontend

```powershell
cd client
npm install
npm run dev
```

Vite prints the local address, normally `http://localhost:5173`.
