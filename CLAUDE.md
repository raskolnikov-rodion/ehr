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
npx nx lint EHR                         # Lint one project
npx nx run-many -t lint                 # Lint all projects

# E2E (Playwright — starts dev server automatically)
npx nx e2e EHR-e2e

# Project graph
npx nx graph
```

## Architecture

Nx monorepo. The app shell lives in `apps/EHR`.

### Testing layers

| Layer       | Tool                               | Scope                                              |
| ----------- | ---------------------------------- | -------------------------------------------------- |
| Unit        | Vitest + Angular Testing Library   | Stores, services, pipes, presentational components |
| Integration | Vitest + `HttpClientTestingModule` | Smart components + store + mock API                |
| E2E         | Playwright (Chromium)              | Critical user journeys                             |
