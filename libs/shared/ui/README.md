# ui

Shared presentational components with no business logic dependencies. Import alias: `@ehr/ui`.

## Public API

| Export           | Selector    | Description                                                     |
| ---------------- | ----------- | --------------------------------------------------------------- |
| `AlertComponent` | `ehr-alert` | Generic alert box; can display a title, an action and a message |
| `CardComponent`  | `ehr-card`  | Generic card container; projects content via `ng-content`       |

## Running unit tests

```bash
npx nx test ui
```
