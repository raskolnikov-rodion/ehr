# dashboard

Feature library for the dashboard page. Import alias: `@ehr/dashboard`.

Lazy-loaded at `/dashboard` and protected by `authGuard`. The page composes four sections — a stats bar, a daily schedule, a pending actions list, and a recent patients list — from purpose-built presentational components backed by typed data models.

## Components

### `DashboardPage` (smart, public)

Fetches data via `Dashboard` and converts the observable to a signal with `toSignal`. Derives `isLoading` (signal is `undefined`) and `hasError` (signal is `null`) computed signals. Wires the response fields to the presentational components below. Manages alert dismissal state via a signal.

### Internal presentational components

| Component         | Selector                 | Input                      | Description                                                     |
| ----------------- | ------------------------ | -------------------------- | --------------------------------------------------------------- |
| `Greeting`        | `ehr-dashboard-greeting` | `name: string`             | Header with time-aware greeting and formatted date badge        |
| `StatCard`        | `ehr-stat-card`          | `statistic: Statistic`     | Summary card with value, trend text, trend direction, and icon  |
| `AppointmentItem` | `ehr-appointment-item`   | `appointment: Appointment` | List row with time, patient name, type, and status badge        |
| `ActionItem`      | `ehr-action-item`        | `action: PendingAction`    | List row with severity dot, title, meta text, and action button |
| `PatientItem`     | `ehr-patient-item`       | `patient: Patient`         | List row with avatar, name, detail, and last-visit date         |

### Data models

| Model           | Location                     | Key fields                                                            |
| --------------- | ---------------------------- | --------------------------------------------------------------------- |
| `Statistic`     | `stat-card/models.ts`        | `label`, `value`, `trend`, `trendDirection`, `iconUrl`                |
| `Appointment`   | `appointment-item/models.ts` | `time`, `patient`, `type`, `status: AppointmentStatus`                |
| `PendingAction` | `action-item/models.ts`      | `severity: ActionSeverity`, `title`, `meta`, `actionLabel`            |
| `Patient`       | `patient-item/models.ts`     | `initials`, `avatarColor: AvatarColor`, `name`, `detail`, `lastVisit` |

## Services

### `Dashboard` (internal)

Calls `GET /api/dashboard` via `HttpClient`. Returns `Observable<DashboardResponse | null>` — errors are caught and mapped to `null`.

### `DashboardResponse`

| Field          | Type                                                          | Description                    |
| -------------- | ------------------------------------------------------------- | ------------------------------ |
| `greeting`     | `{ name: string }`                                            | Name used in the page greeting |
| `alert`        | `{ type: AlertType; title: string; message: string } \| null` | Optional dismissible alert     |
| `stats`        | `Statistic[]`                                                 | Summary stat cards             |
| `appointments` | `Appointment[]`                                               | Daily schedule rows            |
| `actions`      | `Action[]`                                                    | Pending action rows            |
| `patients`     | `Patient[]`                                                   | Recent patient rows            |

## Public API

| Export          | Description                         |
| --------------- | ----------------------------------- |
| `DashboardPage` | Standalone dashboard page component |

## Running unit tests

```bash
npx nx test dashboard
```
