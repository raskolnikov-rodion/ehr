# color-palette

Design-system color reference library. Import alias: `@ehr/color-palette`.

Renders a set of CSS custom properties defined in the EHR theme as a live visual swatch grid. Used during development to verify theme tokens and contrast ratios at a glance.

## Features

- Color groups: Primary, Secondary, Neutrals, Semantic, Backgrounds, Text, Borders, Focus & Interaction
- Shadow/elevation tokens: sm, md, lg
- Responds to the active theme in real time — switching light/dark mode updates all swatches via CSS custom properties

## Public API

| Export                  | Selector            | Description                                                 |
| ----------------------- | ------------------- | ----------------------------------------------------------- |
| `ColorPaletteComponent` | `ehr-color-palette` | Standalone component. Lazy-loaded at `/docs/color-palette`. |

## Running unit tests

```bash
npx nx test color-palette
```
