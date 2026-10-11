# domain

Domain entities shared across features and the mock API. Import alias: `@ehr/domain`.

Types only: no runtime code, no Angular, no UI concerns. Features map these entities to their own view-models (see `toDashboardView` in `@ehr/dashboard`).

Tagged `type:domain`, `scope:shared`. It may only depend on other `type:domain` libs.

## Entities

| Entity        | File             | Key fields                                                                       |
| ------------- | ---------------- | -------------------------------------------------------------------------------- |
| `Patient`     | `patient.ts`     | `id`, `name`, `sex: Sex`, `birthDate`                                            |
| `Appointment` | `appointment.ts` | `id`, `patientId`, `patientName`, `start`, `durationMinutes`, `reason`, `status` |
| `Visit`       | `visit.ts`       | `patient: Patient`, `date`, `reason`                                             |

`AppointmentStatus` is `'confirmed' | 'pending' | 'in-progress' | 'done'`.

## Conventions

- Dates are ISO 8601 strings: `YYYY-MM-DD` for `birthDate` and `Visit.date`, local `YYYY-MM-DDTHH:mm` (no offset) for `Appointment.start`.
- Parse date-only values manually. `new Date('2026-04-10')` is read as UTC and can shift the day.
- Entities carry raw data. Formatting such as age, "Today" labels and initials belongs in the consuming feature.
