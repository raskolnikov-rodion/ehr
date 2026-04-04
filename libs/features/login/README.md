# login

Feature library for the login page and form. Import alias: `@ehr/login`.

Lazy-loaded at `/login` and protected by `noAuthGuard`. On successful authentication, the page navigates to `/dashboard`.

## Components

### `PageComponent` (smart)

Injects `AuthService` and `Router`. Handles form submission, shows a loading state while the request is in flight, and displays an error message on failed login.

### `FormComponent` (presentational)

Built with the Angular Signals forms API (`@angular/forms/signals`). Validates email format and minimum password length. Emits `formSubmit` with `{ email, password }` when the form is valid.

## Public API

| Export          | Description                     |
| --------------- | ------------------------------- |
| `PageComponent` | Standalone login page component |

## Running unit tests

```bash
npx nx test login
```
