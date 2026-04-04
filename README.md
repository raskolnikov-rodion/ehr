# EHR Demo

An Electronic Health Records (EHR) demo application built with Angular and Nx.

Intended to provide a simplified EHR experience. The focus is on **architectural decision-making**:

- enforced module boundaries
- scalable monorepo structure
- signal-based state
- backend-independent data layer
- deliberate multi-layer testing strategy
- accessibility as a first-class concern
- performance through lazy loading
- automated quality gates and continuous deployment

Internationalisation, server-side rendering, and role-based access control are intentionally out of scope for this demo.

The [live version](https://ehr-demo.netlify.app/) is deployed using Netlify.

Demo credentials:

| Email             | Password         |
| ----------------- | ---------------- |
| `doctor@ehr.demo` | `doctorPassword` |
| `nurse@ehr.demo`  | `nursePassword`  |

To run the application locally:

```bash
npm install && npm start   # → http://localhost:4200
```

---

## Architecture

### Monorepo structure with enforced module boundaries

The app shell in `apps/EHR` is intentionally thin. Feature logic lives in purpose-scoped libraries with import boundaries enforced by Nx:

| Alias                | Location                      | Purpose                                        |
| -------------------- | ----------------------------- | ---------------------------------------------- |
| `@ehr/core`          | `libs/core`                   | Route guards and main services                 |
| `@ehr/mock-api`      | `libs/shared/mock-api`        | Mock API provider, interceptor, route handlers |
| `@ehr/ui`            | `libs/shared/ui`              | Shared presentational components (e.g. Card)   |
| `@ehr/login`         | `libs/features/login`         | Login page + form                              |
| `@ehr/dashboard`     | `libs/features/dashboard`     | Dashboard page                                 |
| `@ehr/color-palette` | `libs/features/color-palette` | Design-system color reference                  |

This separation accomplishes the following:

- features can never reach into each other's internals
- shared UI is never coupled to business logic
- the dependency graph stays acyclic

These constraints keep the codebase from developing improper couplings, enhance maintainability and facilitate addition of new features.

### Nx vs a flat workspace

Nx adds configuration overhead and increases overall code volume compared to a plain Angular workspace. That cost is accepted deliberately, because it unlocks several capabilities that matter at scale:

- **Enforced module boundaries** — `@nx/enforce-module-boundaries` makes illegal imports a lint error, preventing accidental coupling between libraries at the tooling level rather than by convention.
- **Dependency graph** — `npx nx graph` gives a visual, always-accurate picture of what depends on what, which is invaluable when reasoning about the impact of a change.
- **Affected commands** — `nx affected` determines which projects are actually touched by a given change and runs only the relevant build/test/lint targets. In CI this eliminates redundant work as the project grows.

For a project of this size the monorepo tooling is heavier than strictly necessary, but the tradeoff is intentional: it demonstrates the setup in a realistic way and keeps the project ready to scale.

### Signal-based state management

Auth state is managed with Angular signals rather than a third-party store. `isLoggedIn` is a `computed` signal derived from an `accessToken` signal in `AuthService`, persisted to `localStorage`. There is no imperative mutation — state flows reactively from a single source of truth.

Route access is controlled by two functional guards: `authGuard` (blocks unauthenticated access) and `noAuthGuard` (redirects authenticated users away from the login page).

**Signals over NgRx.** NgRx would be the conventional choice for shared state in a large Angular app, but it comes with real costs: boilerplate (actions, reducers, selectors, effects), a non-trivial learning curve, and a heavier production bundle. For the complexity level of this project, that overhead is not justified. Angular signals achieve the same reactive, unidirectional data flow with no extra dependencies, less code, and a smaller bundle. NgRx remains a natural upgrade path if the state model grows, without paying its price upfront.

### Backend-independent data layer

There is no real backend. `provideMockApi()` (in `@ehr/mock-api`) registers an `HttpInterceptorFn` that intercepts all `/api/*` requests and dispatches them to typed handler functions registered in a route table. Responses include a randomised 200–1000 ms delay to simulate real network conditions.

This design means:

- Features are developed and tested without any infrastructure dependency
- The mock layer can be swapped for a real API by removing a single provider — no component or service changes required
- Handler functions are independently testable

### Lazy-loaded routes

Feature routes are lazy-loaded using Angular's `loadComponent` API. The login and dashboard pages are never bundled into the initial chunk — they are fetched on demand when the user first navigates to each route. This keeps the initial bundle small and reduces time-to-interactive, which matters most on slow connections or low-end devices.

---

## Testing Strategy

The project uses three testing layers, each with a distinct scope:

| Layer       | Tool                                  | Scope                                                                |
| ----------- | ------------------------------------- | -------------------------------------------------------------------- |
| Unit        | Vitest + Angular Testing Library      | Presentational components, services, guards, mock API handlers       |
| Integration | Vitest + `provideHttpClientTesting()` | Page components wired to mocked services; interceptor with real HTTP |
| E2E         | Playwright (Chromium)                 | Critical user journeys through the real UI                           |

**Conventions:**

- Every component test includes an axe-core accessibility assertion via `vitest-axe`, so violations are caught before they reach the browser.
- Elements are queried by `test-id` attribute (e.g. `By.css("[test-id='submit-button']")` / `page.getByTestId(...)`), decoupling tests from implementation details like class names or DOM structure.
- Smart component tests inject mocked dependencies with `vi.fn()` rather than the real implementations.

**Why three layers?** Unit tests are fast and give precise failure signals, but they can miss wiring bugs that only appear when real HTTP flows through the interceptor. Integration tests catch that class of error without needing a running browser. E2E tests confirm that the assembled app works as a user would experience it, but they are slower and more brittle, so they cover only the critical paths.

---

## Accessibility

Accessibility is treated as a first-class concern rather than an afterthought:

- **Color contrast**: all foreground/background color combinations in the design system meet WCAG AA contrast ratios.
- **Automated accessibility testing**: unit and integration tests use `vitest-axe` to run axe-core rules against rendered components, catching violations before they reach the browser.
- **Template linting**: `@angular-eslint` rules enforce accessible markup conventions (e.g. required `alt` attributes, valid ARIA usage) at lint time.

---

## CI/CD

Every pull request runs `nx affected` to lint, test, and build only the projects touched by that change. This keeps CI fast while still enforcing quality on everything that matters. Merges to `master` trigger an automatic deploy to Netlify, so the live demo always reflects the current state of the main branch.

---

## Tech Stack

| Concern   | Tool                             |
| --------- | -------------------------------- |
| Framework | Angular (signals, standalone)    |
| Monorepo  | Nx                               |
| Styling   | SCSS                             |
| Unit/int. | Vitest + Angular Testing Library |
| E2E       | Playwright                       |
| Linting   | ESLint + Stylelint               |

---

## Commands

```bash
npx nx build EHR --configuration=production   # Production build
npx nx run-many -t lint                        # Lint all projects
npx nx run-many -t stylelint                   # Stylelint all projects
npx nx affected -t test                        # Test affected projects (CI)
npx nx graph                                   # Visualise dependency graph
```
