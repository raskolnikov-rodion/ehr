# design-system

Design-system reference library. Import alias: `@ehr/design-system`.

## Features

- Color groups: Primary, Secondary, Neutrals, Semantic, Backgrounds, Text, Borders, Focus & Interaction
- Shadow/elevation tokens: sm, md, lg
- Responds to the active theme in real time — switching light/dark mode updates all swatches via CSS custom properties

## Public API

| Export                  | Selector            | Description                                                 |
| ----------------------- | ------------------- | ----------------------------------------------------------- |
| `DesignSystemComponent` | `ehr-design-system` | Standalone component. Lazy-loaded at `/docs/design-system`. |

## Running unit tests

```bash
npx nx test design-system
```
