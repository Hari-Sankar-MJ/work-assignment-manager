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

This learning project uses modern Vite rather than the Create React App setup in WorkAssignment. The core React and architectural patterns remain transferable. WorkAssignment is a reference for technologies encountered at work, not a model for project structure or React design; prefer modern, clear, feature-oriented patterns in this repository.

## Current technology and project state

### Frontend

- Location: `client/`
- Created with Vite using the `react-ts` template.
- Current runtime: React 19, TypeScript, Vite 8, ESLint, MUI, and Emotion.
- Development server: `npm run dev` from `client/`.
- Linter: `npm run lint` from `client/`.
- MUI is installed and a dark MUI theme with `ThemeProvider` and `CssBaseline` is active.
- No backend has been created.

### Current source structure

```text
client/src/
  components/
    AssignmentForm.tsx
    AssignmentListItem.tsx
  types/
    assignment.ts
  utilities/
    formatDate.ts
  App.tsx
  main.tsx
  theme.ts
```

`App.tsx` holds the local `assignments` state, derives the filtered list, and owns assignment creation and completion updates. `AssignmentListItem.tsx` renders one typed assignment and requests completion through a callback prop. `AssignmentForm.tsx` owns temporary title and assignee input state, then passes submitted values upward through a callback prop.

`types/assignment.ts` contains:

- `Assignment`, the assignment data shape.
- `Status`, a string-union type allowing only `Pending`, `In Progress`, or `Completed`.

The sample data is intentionally local for now. It will later move behind an API/query layer.

## State and data-management curriculum

Teach these concerns separately. Do not use one library as a default answer for every kind of state.

| Concern | First choice | Later tools and rationale |
| --- | --- | --- |
| Component-local UI state | `useState` | State used only by one component or its close descendants, such as an input's current value. |
| Shared client/UI state | Lift state to the nearest common parent, then consider Context | Jotai for small, independent, broadly shared client-state atoms; Redux Toolkit for large or highly coordinated global client state with explicit actions, reducers, predictable transitions, and DevTools. Redux is not automatically required merely because two components share data. |
| Server state | TanStack Query | Cached API data, loading/error states, refetching, mutations, invalidation, and optimistic updates. Do not duplicate ordinary server/API data into Jotai or Redux by default. |
| HTTP transport | Native `fetch` first, then Axios | Learn both. Use `fetch` when browser-native primitives are sufficient; use Axios where its client instance, interceptors, request/response transforms, and consistent error handling materially help. |

TanStack Query is the current name of the library previously called React Query. WorkAssignment uses the older `react-query` package; this project should learn and use current TanStack Query patterns when API work begins.

## Target frontend structure

As features grow, move from the current small `components/` layout to a feature-oriented structure such as:

```text
src/
  app/                 # app-wide providers, routing, theme, configuration
  features/
    assignments/
      api/             # Axios/fetch calls and TanStack Query hooks
      components/      # assignment-specific UI
      types/           # feature models and DTOs
      hooks/           # feature-specific client hooks
  shared/              # reusable UI and utilities with no feature ownership
```

Do not create empty folders pre-emptively. Introduce each layer only when a concrete feature needs it, explaining its boundary and responsibility first.

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
11. Installed MUI, configured a dark theme, and learned `ThemeProvider`, `CssBaseline`, `Stack`, `Paper`, `Typography`, `Chip`, `Button`, `TextField`, and `MenuItem`.
12. Learned local state with `useState`, derived values, controlled inputs, form submission, `preventDefault`, and responsive MUI props.
13. Learned immutable array/object updates, conditional rendering with `&&` and ternaries, callback props, and one-way data flow from parent state to child UI.
14. Extracted `AssignmentForm`, learned `SubmitEvent<HTMLFormElement>`, and separated date storage from date display with a named utility export.

## Verification history

- The Vite development server displayed the starter application and later the assignment list successfully.
- `npm run lint` was clean after the assignment list and component extraction.
- A production build was attempted once. Vite encountered a Windows `spawn EPERM` permission error while loading its configuration. This was not caused by the React code and has not been investigated further because development and linting were working.

## Current next step

Finish the current assignee-selector verification, then continue enhancing the local assignment workflow. Before introducing any new React primitive, library, or unfamiliar syntax, explain its purpose, data flow, syntax, and alternatives first. The user explicitly requested this after earlier gaps in the `useState` and conditional-rendering explanations.

## Longer-term learning roadmap

1. Complete core React: components, props, events, local state, derived state, forms, conditional rendering, lifting state, composition, and effects.
2. Improve local feature structure, validation, reusable shared UI, and routing.
3. Learn client-state choices in practice: lifting state, Context, Jotai, then Redux Toolkit; compare their trade-offs with concrete features.
4. Create the Azure Functions HTTP API and EF Core persistence.
5. Learn raw `fetch`, then Axios clients and error handling.
6. Learn current TanStack Query for server state: queries, mutations, caching, invalidation, loading/error UI, and optimistic updates.
7. Integrate the frontend with the backend using Axios and TanStack Query, keeping server state out of client-state stores by default.
8. Add webhooks and activity/status updates.
9. Optional Service Bus, authentication, localisation, testing, deployment, and accessibility review.

## Session updates

### 2026-09-21 — expanded learning requirements

- The user asked to explicitly include sound React structure, Jotai, Redux Toolkit, Axios, TanStack Query/React Query, and the rationale for choosing among them.
- State-management guidance was added: local state first, shared client state only when needed, and server state handled by TanStack Query rather than copied into Redux/Jotai by default.
- The learning project will use WorkAssignment to identify workplace technologies, but will not imitate its structure as a best-practice template.

## Log update format

When this document is updated, preserve the current state and add a short dated entry under a new `## Session updates` heading. Each entry should note what changed, what was verified, important decisions, and the exact next task.
