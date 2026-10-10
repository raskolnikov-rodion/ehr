# theme

Shared theme library. Manages light/dark mode via Angular signals and exposes a toggle component. Import alias: `@ehr/theme`.

## How it works

`Theme` reads and writes a `data-theme` attribute on `<html>`. All color values in the design system are defined as CSS custom properties that respond to this attribute, so toggling the theme updates the entire UI via CSS with no JavaScript repaints. The user's preference is persisted to `localStorage`.

To prevent a flash of the wrong theme on page load, `setInitialThemeOnDocument` is called via `provideAppInitializer` before Angular bootstraps. This applies the saved theme synchronously in the same microtask as the app shell render.

## Public API

| Export                      | Selector           | Description                                                                                                                                          |
| --------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Theme`                     | —                  | Reads/writes `data-theme` on `<html>` and persists the choice to `localStorage`. Exposes a `darkTheme` computed signal and a `toggleTheme()` method. |
| `ThemeToggle`               | `ehr-theme-toggle` | Standalone button that calls `Theme.toggleTheme()` and reflects the current mode via an icon and accessible label.                                   |
| `setInitialThemeOnDocument` | —                  | Pure function. Call inside `provideAppInitializer` to apply the persisted theme to `<html>` before first render, preventing flash.                   |

## Usage

```typescript
// app.config.ts
import { provideAppInitializer } from '@angular/core';
import { setInitialThemeOnDocument } from '@ehr/theme';

export const appConfig: ApplicationConfig = {
  providers: [provideAppInitializer(setInitialThemeOnDocument)],
};
```

## Running unit tests

```bash
npx nx test theme
```
