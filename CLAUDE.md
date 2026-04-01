# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Develop
npx nx serve EHR                        # Dev server at http://localhost:4200

# Build
npx nx build EHR
npx nx build EHR --configuration=production

# Test (unit — Vitest)
npx nx test EHR                         # All unit tests
npx nx test EHR --testFile=path/to/foo.spec.ts  # Single file

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

Commits must follow Conventional Commits (`feat:`, `fix:`, `chore:`, etc.) — enforced by commitlint. Pre-commit hooks run Prettier, ESLint, and Stylelint via lint-staged.

## Architecture

Nx monorepo. The app shell lives in `apps/EHR`.

### Testing layers

| Layer       | Tool                               | Scope                                              |
| ----------- | ---------------------------------- | -------------------------------------------------- |
| Unit        | Vitest + Angular Testing Library   | Stores, services, pipes, presentational components |
| Integration | Vitest + `HttpClientTestingModule` | Smart components + store + mock API                |
| E2E         | Playwright (Chromium)              | Critical user journeys                             |
