# dashboard

Feature library for the dashboard page. Import alias: `@ehr/dashboard`.

Lazy-loaded at `/dashboard` and protected by `authGuard`. The page composes four sections — a stats bar, a daily schedule, a pending actions list, and a recent patients list — from purpose-built presentational components backed by typed data models.

## Components

### `PageComponent` (smart, public)

Owns all data for the page as typed arrays declared directly on the class. Wires the data to the presentational components below. Manages alert dismissal state via a signal.

### Internal presentational components

| Component                  | Selector                 | Input                      | Description                                                     |
| -------------------------- | ------------------------ | -------------------------- | --------------------------------------------------------------- |
| `GreetingComponent`        | `ehr-dashboard-greeting` | `name: string`             | Header with time-aware greeting and formatted date badge        |
| `StatCardComponent`        | `ehr-stat-card`          | `statistic: Statistic`     | Summary card with value, trend text, trend direction, and icon  |
| `AppointmentItemComponent` | `ehr-appointment-item`   | `appointment: Appointment` | List row with time, patient name, type, and status badge        |
| `ActionItemComponent`      | `ehr-action-item`        | `action: PendingAction`    | List row with severity dot, title, meta text, and action button |
| `PatientItemComponent`     | `ehr-patient-item`       | `patient: Patient`         | List row with avatar, name, detail, and last-visit date         |

### Data models

| Model           | Location                     | Key fields                                                            |
| --------------- | ---------------------------- | --------------------------------------------------------------------- |
| `Statistic`     | `stat-card/models.ts`        | `label`, `value`, `trend`, `trendDirection`, `iconUrl`                |
| `Appointment`   | `appointment-item/models.ts` | `time`, `patient`, `type`, `status: AppointmentStatus`                |
| `PendingAction` | `action-item/models.ts`      | `severity: ActionSeverity`, `title`, `meta`, `actionLabel`            |
| `Patient`       | `patient-item/models.ts`     | `initials`, `avatarColor: AvatarColor`, `name`, `detail`, `lastVisit` |

## Public API

| Export          | Description                         |
| --------------- | ----------------------------------- |
| `PageComponent` | Standalone dashboard page component |

## Running unit tests

```bash
npx nx test dashboard
```
