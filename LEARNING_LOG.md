# Learning Log and AI Handover

This document is the durable context for continuing the project. A new AI assistant should read it before proposing or changing anything. Keep it current whenever a meaningful milestone, decision, or next step changes.

## Project purpose

This repository is a deliberately small **Work Assignment Manager** used to learn React through manual implementation. It is inspired by the local WorkAssignment repositories, but is not intended to reproduce their scope or business integrations.

The planned application will let a user view work assignments, assign people, change assignment status, and eventually receive backend webhook updates.

## Learning contract

- The project owner writes application code manually, rather than copy-pasting large AI-generated solutions.
- The AI teaches one small concept or task at a time, explains why it exists, and reviews the user's work read-only unless explicitly asked to edit a file.
- Prefer questions, small implementation objectives, and explanations over completing features for the user.
- The user explicitly authorized the AI to maintain this README and this learning log; do not assume permission to edit application code.
- Keep explanations accessible to someone familiar with C# and MAUI but new to React.

## Reference repositories and target alignment

The local repositories inspected for alignment were:

- `C:\repos\WorkAssignmentReact`
- `C:\repos\WorkAssignmentFunction`

Relevant WorkAssignment frontend patterns include React, TypeScript, MUI, React Router, Axios, React Query, Jotai, i18next, and Azure MSAL. Its backend is a .NET 8 Azure Functions isolated-worker application with EF Core, SQL Server, HTTP triggers, Service Bus, and a layered `Core` / `Application` / `Infrastructure` / `Functions` structure.

This learning project uses modern Vite rather than the Create React App setup in WorkAssignment. The core React and architectural patterns remain transferable.

## Current technology and project state

### Frontend

- Location: `client/`
- Created with Vite using the `react-ts` template.
- Current runtime: React 19, TypeScript, Vite 8, and ESLint.
- Development server: `npm run dev` from `client/`.
- Linter: `npm run lint` from `client/`.
- MUI has not yet been installed.
- No backend has been created.

### Current source structure

```text
client/src/
  components/
    AssignmentListItem.tsx
  types/
    assignment.ts
  App.tsx
  App.css
  index.css
  main.tsx
```

`App.tsx` holds temporary hard-coded sample assignments and renders them with `.map()`. `AssignmentListItem.tsx` is a reusable child component that receives one typed `assignment` prop and renders its list item.

`types/assignment.ts` contains:

- `Assignment`, the assignment data shape.
- `Status`, a string-union type allowing only `Pending`, `In Progress`, or `Completed`.

The sample data is intentionally local for now. It will later move behind an API/query layer.

## Concepts covered so far

1. Created and cloned the GitHub repository.
2. Generated a React + TypeScript Vite client.
3. Chose ESLint over Oxlint for broad ecosystem support and closer alignment with WorkAssignment.
4. Learned the Vite execution path: `index.html` loads `src/main.tsx`, which renders `<App />` into `<div id="root">`.
5. Learned the purpose of `src/`, `public/`, Vite configuration, TypeScript configuration, ESLint configuration, and npm lock files.
6. Replaced the Vite starter UI with a simple work-assignment page.
7. Defined TypeScript models and used a string-union `Status` type.
8. Rendered an array with `assignments.map(...)` and used `key={assignment.id}` at the list-creation site.
9. Moved shared types into `src/types/assignment.ts` and imported `Assignment` as a type-only import.
10. Extracted `AssignmentListItem` as a child component and learned props, object destructuring, default exports, and parent-to-child data flow.

## Verification history

- The Vite development server displayed the starter application and later the assignment list successfully.
- `npm run lint` was clean after the assignment list and component extraction.
- A production build was attempted once. Vite encountered a Windows `spawn EPERM` permission error while loading its configuration. This was not caused by the React code and has not been investigated further because development and linting were working.

## Current next step

Before adding more dependencies, create the first Git commit for the React scaffold and static assignment-list milestone.

Suggested remaining housekeeping before that commit:

1. Ensure the root-level empty `package-lock.json` is absent; `client/package-lock.json` is the lock file that belongs in Git.
2. Add `client/dist/` to the root `.gitignore` so Vite build output is not tracked.
3. Stage the client, `.gitignore`, `README.md`, and this file, then create and push a commit.

After the checkpoint, install Material UI (`@mui/material`, `@emotion/react`, and `@emotion/styled`) and begin replacing the bare HTML presentation with MUI layout components. Explain MUI and each component before asking the user to implement it.

## Longer-term learning roadmap

1. MUI layout and visual styling.
2. Component composition, props, events, and local state.
3. Routing and distinct pages.
4. Forms and validation.
5. Azure Functions HTTP API and EF Core persistence.
6. Axios and React Query API integration.
7. Webhook endpoint and activity/status updates.
8. Optional Service Bus, authentication, localisation, testing, and deployment.

## Log update format

When this document is updated, preserve the current state and add a short dated entry under a new `## Session updates` heading. Each entry should note what changed, what was verified, important decisions, and the exact next task.
