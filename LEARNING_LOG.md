# Learning Log and AI Handover

This document is the durable handoff for this repository. A new AI assistant must read it fully, then inspect `git status` and recent commits, before proposing work. Keep it current after every meaningful milestone, decision, or change to the next task.

## Project purpose

This repository is a deliberately small **Work Assignment Manager** used to learn modern React through manual implementation. It is inspired by the local WorkAssignment repositories, but is not intended to reproduce their business scope, code structure, integrations, or company branding.

The planned application lets a user view work assignments, assign people, change assignment status, and eventually receive backend webhook updates.

## Non-negotiable learning contract

- The project owner writes application code manually. Do not replace that learning process with large copy-paste solutions.
- Teach one small concept or task at a time. Before introducing a new React primitive, library, or unfamiliar syntax, explain its purpose, data flow, syntax, alternatives, and why it is appropriate here.
- Review the user's changes read-only unless the user explicitly asks the AI to edit a file. The user has explicitly authorised maintenance of this README and this learning log.
- Explain at a level suitable for someone familiar with C# and MAUI but new to React.
- When a request is complete, update this log and README if the project status, decisions, roadmap, or handoff instructions materially changed. **Do this proactively before recommending a milestone commit; never wait for the user to ask for the update.** Include a dated session entry at the bottom.
- Prefer precise, small implementation objectives over abstract advice. Verify with `npm run lint`, `npx tsc -b`, and relevant UI checks where appropriate.

## Required new-chat routine

1. Read `README.md` and this file in full.
2. Run `git status --short`, inspect recent commits, and inspect the files relevant to the active milestone.
3. Confirm the current task before changing anything. Preserve user changes and do not reset, discard, or overwrite them.
4. Teach and review first; do not edit application code unless directly authorised.
5. Before recommending the milestone commit, proactively record what changed, what was verified, key decisions, and the exact next task in this document. Do not wait for a user reminder.

## Reference repositories and alignment

Local reference repositories:

- `C:\repos\WorkAssignmentReact`
- `C:\repos\WorkAssignmentFunction`

WorkAssignmentReact uses React, TypeScript, Material UI, React Router, Axios, old React Query (`react-query`), Jotai, i18next, MSAL, MUI X Pro controls, and a dense work-management UI. WorkAssignmentFunction is a .NET 8 Azure Functions isolated-worker backend using EF Core, SQL Server, HTTP triggers, Service Bus, and a layered `Core` / `Application` / `Infrastructure` / `Functions` architecture.

This project intentionally uses modern Vite and current libraries instead of copying the older Create React App/React Query setup. WorkAssignment is a technology and visual-pattern reference, **not** an architectural model. Prefer clear feature-oriented boundaries and small, explainable components here.

## Current technology

### Frontend

- Location: `client/`
- Runtime: React 19, TypeScript 6, Vite 8, ESLint, MUI 9/Emotion, React Router 8, and Jotai 3.
- Run development server: `npm run dev` from `client/`.
- Lint: `npm run lint` from `client/`.
- Type check: `npx tsc -b` from `client/`.
- MUI dark theme, `ThemeProvider`, and `CssBaseline` are active.
- No backend, API calls, database, authentication, or server state exist yet.

### Current source structure

```text
client/src/
  App.tsx                         # route tree only
  main.tsx                        # React root, MUI providers, BrowserRouter
  theme.ts
  layouts/
    AppLayout.tsx                 # shared AppBar, navigation, Jotai assignment count, Outlet
  pages/
    AssignmentsPage.tsx           # URL-facing assignments screen
    AboutPage.tsx
    NotFoundPage.tsx
  features/
    assignments/
      components/
        AssignmentForm.tsx
        AssignmentListItem.tsx
      state/
        AssignmentsAtom.ts        # persisted shared assignment atom
      types/
        assignment.ts
      utilities/
        formatDate.ts
```

### Current routing

- `main.tsx` wraps the app in `BrowserRouter` inside the MUI theme provider.
- `App.tsx` defines a pathless layout route using `AppLayout` and nested routes:
  - `/assignments` → `AssignmentsPage`
  - `/about` → `AboutPage`
  - `/` → redirects to `/assignments` using `Navigate` with `replace`
  - `*` → `NotFoundPage`
- `AppLayout` uses `Outlet` to render the matching child page. It uses `Link` for navigation and `useLocation` to give the active navigation button a bold style.

### Current assignments feature

- `Assignment` is the typed model; `Status` is a string union: `Pending`, `In Progress`, or `Completed`.
- `AssignmentForm` has local controlled-input state, validates a title, and asks the page to add an assignment through a callback prop.
- `AssignmentListItem` renders assignment information, formatted date, status chip, and requests completion via a callback prop.
- `AssignmentsPage` keeps `showCompleted` as local `useState`, derives `visibleAssignments`, and calls the setter from the shared atom to add/complete items immutably.
- `AssignmentsAtom.ts` exports `assignmentAtom`, made with:

  ```ts
  atomWithStorage<Assignment[]>('assignments', initialAssignments, undefined, {
    getOnInit: true,
  })
  ```

  It uses the browser key `assignments`, persists JSON through `localStorage`, and reads saved values during atom initialisation. Keep atoms at module scope, not inside a component, because atom identity is an object reference and a component function runs again on each render.
- `AppLayout` calls `useAtomValue(assignmentAtom)` and derives an open-assignment count. Adding or completing an assignment updates the page and header without prop drilling.

## State and data-management decisions

Use the smallest fitting state mechanism. Do not adopt a library merely because it is available.

| Concern | First choice | When to move on |
| --- | --- | --- |
| Component-local UI state | `useState` | State used only by one component or close descendants, e.g. form fields and `showCompleted`. |
| Nearby shared state | Lift state to the nearest common parent; consider Context plus `useReducer` | Use when the sharing boundary remains a clear subtree. |
| Shared client/UI state | Jotai | Small independent state that several distant components need, e.g. the local assignment list and layout count. |
| Complex, coordinated global client state | Redux Toolkit | Explicit actions/reducers, predictable transitions, DevTools, and consistent team conventions are valuable. Learn it next. |
| Server state | TanStack Query | API data, caching, loading/error states, mutations, invalidation, refetching, and optimistic updates. Do not copy ordinary server data into Jotai or Redux by default. |
| HTTP transport | Native `fetch`, then Axios | Learn both. Use Axios when its client instance, interceptors, transformations, or error model add value. |

Jotai is a state-management library built around small atom definitions, a store, and React subscriptions. `useAtom` reads/writes; `useAtomValue` reads without receiving a setter. A Jotai atom is live client state; `localStorage` is persistence across refreshes.

## Next milestone: Redux Toolkit

The Jotai milestone is complete and was committed as `29f0a7b shared assignments with jotai`.

The next chat should start Redux Toolkit deliberately, not immediately rewrite the working assignment list. First explain the relationship between the Redux store, `Provider`, slices, actions, reducers, selectors, `useDispatch`, and `useSelector`.

Then install `@reduxjs/toolkit` and `react-redux` from `client/` and create a **separate, bounded learning feature** for shared UI preferences—recommended first example: assignment-view density (`comfortable` versus `compact`). The layout can control the preference while assignment items read it. This demonstrates Redux sharing without having Jotai and Redux own the same assignment data.

Do not migrate `assignmentAtom` into Redux merely to demonstrate syntax. After the Redux exercise, compare Jotai atoms with Redux slices/reducers and decide which mechanism should remain for each client-state concern.

## Visual/product direction

On 2026-11-26 the user supplied a WorkAssignment screenshot as a visual reference. The target is a neutral work-management application with a similarly professional, information-dense feel—not a visual or functional copy.

### Preserve these broad patterns

- application shell: top app bar plus navigation, responsive on smaller screens;
- strong page title and compact, clearly separated content regions;
- tabbed search modes where the feature warrants them;
- filter/search controls above the work list;
- status-first work records, selection, bulk actions, dense table/list layouts, and accessible visual hierarchy;
- Material UI components and a responsive design, not hard-coded desktop dimensions.

### Do not copy

- Rio Tinto branding, logo, colours, terminology, user name, account/authentication experience, proprietary business data, assets, or code;
- company-specific plant/work-centre/work-order semantics unless intentionally replaced with neutral learning-domain equivalents;
- the full WorkAssignment feature set or its complex component/state structure.

### Incremental UI plan

1. Keep the present neutral MUI application shell while learning state management.
2. After Redux basics, improve the shell deliberately: responsive top bar, neutral icon-based navigation, and theme tokens. Explain each layout decision.
3. Build a small, generic assignment search/filter experience with local mock data. Introduce tabs, controlled filters, and accessible labels one at a time.
4. Introduce a compact work-list/table view. WorkAssignment uses commercial `DataGridPro`; this project should use simple MUI layout first, then evaluate free `@mui/x-data-grid` only when a concrete grid feature needs it. Do not require a Pro licence.
5. Add selection, bulk actions, column/density preferences, and advanced filters only when their state/API implications can be taught clearly.
6. Replace mock data with the backend and TanStack Query later. Preserve the neutral domain and visual system.

Relevant WorkAssignment source references, inspected on 2026-11-26:

- `WorkAssignmentReact/src/pages/WorkAssignmentPage.tsx` composes a header/filter section and a grid.
- `WorkAssignmentReact/src/components/WorkAssignmnetGrid/WorkAssignmentHeader.tsx` shows tabs, autocomplete filters, date-range controls, search, and clear actions.
- `WorkAssignmentReact/src/components/WorkAssignmnetGrid/WorkAssignmentGrid.tsx` shows the grid toolbar, quick filter, selection, bulk actions, density, and column controls.
- `WorkAssignmentReact/src/App.tsx` and layout components demonstrate its app shell, but should not be copied as this learning project's architecture.

## Concepts covered

1. Vite + React + TypeScript project creation, files, npm packages, ESLint, and the execution path from `index.html` to `main.tsx` and `App`.
2. Components, JSX, props, TypeScript interfaces/types/string unions, default and named exports, list rendering, and React keys.
3. Local React state with `useState`, controlled forms, `preventDefault`, immutable updates, derived values, conditional rendering, callback props, and `useEffect` persistence.
4. MUI theme/provider/baseline plus `Stack`, `Paper`, `Typography`, `TextField`, `MenuItem`, `Button`, and `Chip`.
5. Date storage versus display formatting and a named utility export.
6. React Router: `BrowserRouter`, `Routes`, `Route`, `Navigate`, nested/layout routes, `Outlet`, `Link`, `useLocation`, active navigation styling, and wildcard/not-found routes.
7. Feature-oriented organisation: assignment-specific UI/types/state/utilities are colocated under `features/assignments`.
8. Jotai: module-level atom identity, `atomWithStorage`, `useAtom`, `useAtomValue`, `localStorage` initialisation, and sharing assignment state between a page and layout.
9. The conceptual distinction among local state, Jotai, Redux Toolkit, TanStack Query, native `fetch`, and Axios.

## Verification and known notes

- The application has been run in Vite during the learning sessions.
- `npm run lint` and `npx tsc -b` were clean after routing, feature organisation, and Jotai work.
- A historical production build attempt hit a Windows Vite `spawn EPERM` while loading configuration. It was not traced to React code and should only be revisited if it recurs.
- Run `git diff --check` before commits. It previously caught simple trailing whitespace.

## Git history relevant to the current baseline

- `29f0a7b shared assignments with jotai`
- `15b0aa7 organize assignemtn code by feature`
- `e27796b add routing improvements`
- `3da7e17 add routing and shared layouts and about page`
- `8d6cc0f persist local storage`

## Session updates

### 2026-11-26 — documentation handoff and visual direction

- README and this log were refreshed to reflect the current routed, feature-oriented, Jotai-enabled client and the clean commit baseline.
- Added the explicit required new-chat routine and documentation-maintenance contract so a future chat can continue without relying on conversation history.
- Recorded the next Redux Toolkit learning milestone: use a separate shared UI-preference feature rather than duplicating assignment ownership across Jotai and Redux.
- Recorded a neutral, staged visual direction inspired by the WorkAssignment screenshot and inspected source patterns. The goal is a professional work-management feel; corporate branding, proprietary data, and WorkAssignment's structure/code must not be copied.

### 2026-11-26 — documentation-maintenance clarification

- Clarified that future AI assistants must update the handoff documentation proactively before recommending a meaningful milestone commit; they must not wait for the user to request it.

## Log update format

Add a dated entry under **Session updates** that includes:

- what changed;
- what was verified;
- decisions or trade-offs made;
- the exact next task.
