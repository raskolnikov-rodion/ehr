# EHR Demo

An Electronic Health Records (EHR) demo application built with Angular and Nx.

Intended to provide a simplified EHR experience. The focus is on **architectural decision-making**:

- enforced module boundaries
- scalable monorepo structure
- signal-based state
- backend-independent data layer
- deliberate multi-layer testing strategy
- accessibility as a first-class concern
- performance through lazy loading and self-hosted fonts, with scores enforced by Lighthouse CI
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
| `@ehr/core`          | `libs/core`                   | Route guards and auth service                  |
| `@ehr/theme`         | `libs/shared/theme`           | Theme, ThemeToggle, theme initialiser          |
| `@ehr/mock-api`      | `libs/mock-api`               | Mock API provider, interceptor, route handlers |
| `@ehr/layout`        | `libs/shared/layout`          | App shell layout: header, footer, ShellLayout  |
| `@ehr/ui`            | `libs/shared/ui`              | Shared presentational components (e.g. Card)   |
| `@ehr/login`         | `libs/features/login`         | Login page + form                              |
| `@ehr/dashboard`     | `libs/features/dashboard`     | Dashboard page                                 |
| `@ehr/design-system` | `libs/features/design-system` | Design-system reference                        |

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

Auth state is managed with Angular signals rather than a third-party store. `isLoggedIn` is a `computed` signal derived from an `accessToken` signal in `Auth`, persisted to `localStorage`. There is no imperative mutation — state flows reactively from a single source of truth.

Route access is controlled by two functional guards: `authGuard` (blocks unauthenticated access) and `noAuthGuard` (redirects authenticated users away from the login page). Both are pure functions that compose cleanly with Angular's `canActivate` API — no class-based guards, no service wrapping.

**Signals over NgRx.** NgRx would be the conventional choice for shared state in a large Angular app, but it comes with real costs: boilerplate (actions, reducers, selectors, effects), a non-trivial learning curve, and a heavier production bundle. For the complexity level of this project, that overhead is not justified. Angular signals achieve the same reactive, unidirectional data flow with no extra dependencies, less code, and a smaller bundle. NgRx remains a natural upgrade path if the state model grows, without paying its price upfront.

### Backend-independent data layer

There is no real backend. `provideMockApi()` (in `@ehr/mock-api`) registers an `HttpInterceptorFn` that intercepts all `/api/*` requests and dispatches them to typed handler functions registered in a route table. Responses include a randomised 200–1000 ms delay to simulate real network conditions.

This design means:

- Features are developed and tested without any infrastructure dependency
- The mock layer can be swapped for a real API by removing a single provider — no component or service changes required
- Handler functions are independently testable

### Performance

Several deliberate choices keep the app fast on first load:

- **Lazy-loaded routes** — feature routes use Angular's `loadComponent` API. The login and dashboard pages are never bundled into the initial chunk; they are fetched on demand when first navigated to. This keeps the initial bundle small and reduces time-to-interactive.
- **Self-hosted fonts** — app fonts are served from the same origin rather than a third-party CDN, eliminating the render-blocking cross-origin DNS lookup and connection that Google Fonts would introduce.

These choices are validated on every CI run by Lighthouse CI (LHCI), which audits a production build of the app and enforces minimum scores:

| Category       | Minimum score |
| -------------- | ------------- |
| Performance    | 80            |
| Accessibility  | 90            |
| Best practices | 90            |
| SEO            | 90            |

LHCI runs the audit three times and averages the results to reduce noise from variance in CI runners. The full HTML reports are uploaded as a CI artifact and retained for 30 days.

### Theme system

`Theme` manages light/dark mode by reading and writing a `data-theme` attribute on `<html>`, with the user's preference persisted to `localStorage`. A `provideAppInitializer` call applies the saved theme synchronously before the first render, preventing a flash of the wrong theme on page load. `ThemeToggle` is the sole UI entry point, keeping the service decoupled from layout concerns.

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

## Security

### Route protection

Feature routes are guarded at the router level. `authGuard` redirects unauthenticated users to `/login`; `noAuthGuard` redirects already-authenticated users away from `/login`, preventing redundant re-authentication.

### Branch protection

The `master` branch has a GitHub ruleset that requires all four CI jobs (Lint, Test, Build, Lighthouse) to pass before a pull request can merge. Direct pushes to `master` are blocked. No code reaches production without passing the full automated quality gate.

### Dependency security

Dependabot updates are enabled at repository configuration level. It automatically attempts to open pull requests to resolve security alerts.

---

## CI/CD

The CI pipeline runs as four parallel jobs on every pull request and push to `master`:

| Job        | Steps                                                                                         |
| ---------- | --------------------------------------------------------------------------------------------- |
| Lint       | `nx affected -t lint`, `nx affected -t stylelint`                                             |
| Test       | `nx affected -t test`, `nx affected -t e2e` (with Playwright)                                 |
| Build      | `nx affected -t build`                                                                        |
| Lighthouse | `nx run EHR:lighthouse` — audits performance, accessibility, best practices, and SEO via LHCI |

The Lint, Test, and Build jobs use `nrwl/nx-set-shas` to calculate the affected set relative to the last successful commit on `master`, so only the projects touched by a change are processed. The Lighthouse job always runs against a production build of the app shell and uploads the HTML reports as a CI artifact (retained for 30 days). Merges to `master` trigger an automatic deploy to Netlify, so the live demo always reflects the current state of the main branch.

---

## Tech Stack

| Concern      | Tool                                     |
| ------------ | ---------------------------------------- |
| Framework    | Angular (signals, standalone components) |
| Monorepo     | Nx                                       |
| Styling      | SCSS                                     |
| Unit / int.  | Vitest + Angular Testing Library         |
| E2E          | Playwright                               |
| Linting      | ESLint + `@angular-eslint` + Stylelint   |
| CI           | GitHub Actions                           |
| Deployment   | Netlify                                  |
| Code Reviews | CodeRabbit                               |

---

## Commands Sample

```bash
npx nx build EHR --configuration=production    # Production build
npx nx run-many -t lint                        # Lint all projects
npx nx affected -t test                        # Test affected projects (CI)
npx nx graph                                   # Visualise dependency graph
```
