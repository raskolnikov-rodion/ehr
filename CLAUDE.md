# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Keep your messages short and clear. No fluff.

## Commands

```bash
# Develop
npx nx serve EHR                        # Dev server at http://localhost:4200

# Build
npx nx build EHR
npx nx build EHR --configuration=production

# Test (unit — Vitest)
npx nx run-many -t test                 # All projects
npx nx test <project>                   # Single project (e.g. core, theme, layout)
npx nx test <project> --testFile=path/to/foo.spec.ts  # Single file

# Lint
npx nx lint EHR                         # ESLint one project
npx nx run-many -t lint                 # ESLint all projects
npx nx stylelint EHR                    # Stylelint one project
npx nx run-many -t stylelint            # Stylelint all projects

# E2E (Playwright — starts dev server automatically)
npx nx e2e EHR-e2e

# Affected only (used in CI)
npx nx affected -t lint
npx nx affected -t test
npx nx affected -t build

# Project graph
npx nx graph
```

## Architecture

Nx monorepo. The app shell lives in `apps/EHR`.

### Library map

| Path alias           | Location                      | Purpose                                                |
| -------------------- | ----------------------------- | ------------------------------------------------------ |
| `@ehr/core`          | `libs/core`                   | Route guards, auth service, and logout button          |
| `@ehr/theme`         | `libs/shared/theme`           | ThemeService, ThemeToggleComponent, theme initialiser  |
| `@ehr/mock-api`      | `libs/shared/mock-api`        | Mock API provider, interceptor, route handlers         |
| `@ehr/layout`        | `libs/shared/layout`          | App shell layout: header, footer, ShellLayoutComponent |
| `@ehr/ui`            | `libs/shared/ui`              | Shared presentational components (e.g. Card)           |
| `@ehr/login`         | `libs/features/login`         | Login page + form                                      |
| `@ehr/dashboard`     | `libs/features/dashboard`     | Dashboard page                                         |
| `@ehr/color-palette` | `libs/features/color-palette` | Design-system color reference                          |

### Mock API

There is no real backend. `provideMockApi()` (from `@ehr/mock-api`) registers an `HttpInterceptorFn` that intercepts all `/api/*` requests and dispatches them to handlers registered in `MockRouteService`. Responses include a randomised 200–1000 ms delay. To add a new endpoint, create a `MockHandlerFn` and add it to `libs/shared/mock-api/src/lib/provider/routes.ts`. Removing `provideMockApi()` is the only change needed to switch to a real backend.

Demo credentials (defined in `libs/shared/mock-api/src/lib/auth/constants.ts`):

- `doctor@ehr.demo` / `doctorPassword`
- `nurse@ehr.demo` / `nursePassword`

### Auth state

`AuthService` (in `@ehr/core`) holds auth state via Angular signals. `isLoggedIn` is a computed signal derived from an `accessToken` signal. The token is persisted to `localStorage` under the key `ehr_access_token`. Route access is controlled by `authGuard` (requires login) and `noAuthGuard` (redirects away if already logged in).

### Theme state

`ThemeService` (in `@ehr/theme`) manages light/dark mode. It reads/writes `data-theme` on `<html>` and persists the choice to `localStorage`. `setInitialThemeOnDocument` is called via `provideAppInitializer` (wired in `apps/EHR/src/app/initializers/theme.initializer.ts`) to apply the saved theme before first render, preventing flash. `ThemeToggleComponent` (`ehr-theme-toggle`) is the UI entry point.

### Module boundaries

`@nx/enforce-module-boundaries` is enforced via lint. Features cannot import from each other's internals; shared UI cannot depend on business logic. Violations are lint errors.

### Routing

Feature pages are lazy-loaded via `loadComponent`. Feature pages are never in the initial bundle.

### Testing layers

| Layer       | Tool                                  | Scope                                                                      |
| ----------- | ------------------------------------- | -------------------------------------------------------------------------- |
| Unit        | Vitest + Angular Testing Library      | Presentational components, services, guards, mock handlers                 |
| Integration | Vitest + `provideHttpClientTesting()` | Smart/page components wired to mocked services; interceptor with real HTTP |
| E2E         | Playwright (Chromium)                 | Critical user journeys through the real UI                                 |

Conventions:

- All component tests include an axe accessibility assertion via `vitest-axe`
- Elements are queried by `test-id` attribute (e.g. `By.css("[test-id='submit-button']")` / `page.getByTestId(...)`)
- Smart component tests mock dependencies with `vi.fn()`

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

## General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->
