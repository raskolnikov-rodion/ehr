# ui

Shared presentational components with no business logic dependencies. Import alias: `@ehr/ui`.

## Public API

| Export          | Selector   | Inputs                     | Description                                               |
| --------------- | ---------- | -------------------------- | --------------------------------------------------------- |
| `CardComponent` | `ehr-card` | `title: string` (optional) | Generic card container; projects content via `ng-content` |

## Running unit tests

```bash
npx nx test ui
```
