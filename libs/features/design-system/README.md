# design-system

Design-system reference library. Import alias: `@ehr/design-system`.

## Features

- Color groups: Primary, Secondary, Neutrals, Semantic, Backgrounds, Text, Borders, Focus & Interaction
- Shadow/elevation tokens: sm, md, lg
- Typography samples: heading, body, caption and mono (IBM Plex Sans / IBM Plex Mono)
- Corner radius tokens: sm, md, lg
- Button variants with default, hover, active, focus and disabled states
- Responds to the active theme in real time — switching light/dark mode updates all swatches via CSS custom properties

## Public API

| Export         | Selector            | Description                                                 |
| -------------- | ------------------- | ----------------------------------------------------------- |
| `DesignSystem` | `ehr-design-system` | Standalone component. Lazy-loaded at `/docs/design-system`. |

## Running unit tests

```bash
npx nx test design-system
```
