# ui

Shared presentational components with no business logic dependencies. Import alias: `@ehr/ui`.

All components use `ChangeDetectionStrategy.OnPush` and signal-based inputs. They carry no service injections and impose no constraints on how data reaches them.

## Components

### `AlertComponent` — `ehr-alert`

Accessible alert box that adapts its ARIA role and live region based on severity.

**Inputs:**

| Name          | Type        | Default           | Description                                        |
| ------------- | ----------- | ----------------- | -------------------------------------------------- |
| `message`     | `string`    | required          | Main alert text                                    |
| `type`        | `AlertType` | `AlertType.ERROR` | Severity: `error`, `warning`, `success`, or `info` |
| `title`       | `string`    | `''`              | Optional bold heading above the message            |
| `dismissible` | `boolean`   | `false`           | When `true`, renders a close button                |
| `id`          | `string`    | auto-generated    | Used for `test-id` attribute                       |

**Outputs:**

| Name        | Type     | Description                                           |
| ----------- | -------- | ----------------------------------------------------- |
| `dismissed` | `string` | Emits the alert `id` when the close button is clicked |

**ARIA behaviour:** `error` and `warning` alerts get `role="alert"` and `aria-live="assertive"`; `success` and `info` get `role="status"` and `aria-live="polite"`.

---

### `CardComponent` — `ehr-card`

Generic card container that projects content via named slots.

**Inputs:**

| Name       | Type      | Default        | Description                                 |
| ---------- | --------- | -------------- | ------------------------------------------- |
| `title`    | `string`  | `''`           | Optional card heading                       |
| `action`   | `string`  | `''`           | Optional text link shown in the card header |
| `bordered` | `boolean` | `true`         | When `false`, removes the card border       |
| `id`       | `string`  | auto-generated | Used for `test-id` attribute                |

**Outputs:**

| Name          | Type     | Description                                         |
| ------------- | -------- | --------------------------------------------------- |
| `actionClick` | `string` | Emits the card `id` when the action link is clicked |

**Content projection:** project body content with `ngProjectAs="card-content"`.

## Public API

| Export           | Selector    | Description                                 |
| ---------------- | ----------- | ------------------------------------------- |
| `AlertComponent` | `ehr-alert` | Accessible alert with configurable type     |
| `CardComponent`  | `ehr-card`  | Generic card container                      |
| `AlertType`      | —           | Enum: `ERROR`, `WARNING`, `SUCCESS`, `INFO` |

## Running unit tests

```bash
npx nx test ui
```
