# color-palette

Design-system color reference library. Import alias: `@ehr/color-palette`.

Exposes a component that renders CSS custom properties defined in the EHR app's theme — colors, semantic tokens, backgrounds, text, borders, focus/interaction states, and shadows/elevation — as a visual swatch grid.

## Features

- Displays color groups: Primary, Secondary, Neutrals, Semantic, Backgrounds, Text, Borders, Focus & Interaction
- Displays shadow/elevation tokens (sm, md, lg)
- Light/dark theme toggle — switches the `data-theme` attribute on `<html>` so CSS variables update live

## Public API

| Export                  | Description                                                              |
| ----------------------- | ------------------------------------------------------------------------ |
| `ColorPaletteComponent` | Standalone component; import directly or re-export from a feature module |

## Running unit tests

```bash
npx nx test color-palette
```
