# CLAUDE.md

Keep your messages short and clear.

## Commands

```bash
# Project graph
npx nx graph

# Run targets (lint, stylelint, test, build, e2e)
npx nx run-many -t <target>                 # All projects
npx nx <target> <project>                   # Single project (e.g. core, theme, layout)
```

## Architecture

Nx monorepo. App shell lives in `apps/EHR`.

### Libraries

| Path alias           | Location                      | Purpose                          |
| -------------------- | ----------------------------- | -------------------------------- |
| `@ehr/core`          | `libs/core`                   | Authentication                   |
| `@ehr/theme`         | `libs/shared/theme`           | Theme management                 |
| `@ehr/mock-api`      | `libs/shared/mock-api`        | Mock backend                     |
| `@ehr/layout`        | `libs/shared/layout`          | App shell layout                 |
| `@ehr/ui`            | `libs/shared/ui`              | Shared presentational components |
| `@ehr/login`         | `libs/features/login`         | Login page                       |
| `@ehr/dashboard`     | `libs/features/dashboard`     | Dashboard page                   |
| `@ehr/color-palette` | `libs/features/color-palette` | Color reference                  |

### Module boundaries

`@nx/enforce-module-boundaries` is enforced via lint. Check `depConstraints` property in [ESLint config](./eslint.config.mjs) in case of errors.

### List-item component pattern

Components that render as list rows (e.g. `ActionItemComponent`) apply `role="listitem"` and their root CSS class to the Angular host element via `host: { role: 'listitem', class: '...' }`. Their templates contain no `<li>` wrapper — the host element _is_ the list item.

## Test Conventions

- All component tests include an axe accessibility assertion via `vitest-axe`
- Elements are queried by `test-id` attribute (e.g. `By.css("[test-id='submit-button']")` / `page.getByTestId(...)`)
- Smart component tests mock dependencies with `vi.fn()`
- When testing list-item components in isolation (outside a `<ul>`), disable the `aria-required-parent` axe rule:
  ```typescript
  expect(
    await axe(fixture.nativeElement, {
      rules: { 'aria-required-parent': { enabled: false } },
    }),
  ).toHaveNoViolations();
  ```
  Full list semantics are verified by parent's axe test.

<!-- nx configuration start-->

## General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run-many`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (`npx nx test`) - avoids using globally installed CLI
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
