# theme

Shared theme library. Manages light/dark mode via Angular signals and exposes a toggle component. Import alias: `@ehr/theme`.

## Public API

| Export                      | Description                                                                                                                                                                    |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ThemeService`              | Manages light/dark theme. Reads/writes `data-theme` on `<html>` and persists the choice to `localStorage`. Exposes a `darkTheme` computed signal and a `toggleTheme()` method. |
| `ThemeToggleComponent`      | Standalone button component (`ehr-theme-toggle`) that calls `ThemeService.toggleTheme()` and reflects the current mode.                                                        |
| `setInitialThemeOnDocument` | Helper used in `provideAppInitializer` to apply the persisted theme to `<html>` before first render.                                                                           |

## Running unit tests

```bash
npx nx test theme
```
