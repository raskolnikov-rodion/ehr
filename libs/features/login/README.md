# login

Feature library for the login page and form. Import alias: `@ehr/login`.

Lazy-loaded at `/login` and protected by `noAuthGuard`. On successful authentication, the page navigates to `/dashboard`.

## Components

### `PageComponent` (smart, public)

Injects `AuthService` and `Router`. Handles form submission, manages a loading signal while the request is in flight, and exposes a nullable error signal for failed login attempts. Does not contain any form logic — all validation lives in `FormComponent`.

### `FormComponent` (presentational)

Built with Angular's signals-based forms API (`@angular/forms/signals`). Manages all form state locally via a `signal`-backed model and a `form()` validator config. Validates email format and minimum password length. Emits `formSubmit` with `{ email, password }` only when the form is valid. Accepts an `isLoading` input to disable the submit button while the parent handles the HTTP request.

**Inputs/outputs:**

| Name         | Type                  | Direction | Description                            |
| ------------ | --------------------- | --------- | -------------------------------------- |
| `isLoading`  | `boolean`             | Input     | Disables the submit button when `true` |
| `formSubmit` | `{ email, password }` | Output    | Emitted on valid submit                |

### `FormHeaderComponent` (presentational)

Renders the login form heading and subtitle. No inputs.

### `BrandPanelComponent` (presentational)

Renders the decorative brand panel shown alongside the form on wider viewports. No inputs.

## Public API

| Export          | Description                     |
| --------------- | ------------------------------- |
| `PageComponent` | Standalone login page component |

## Running unit tests

```bash
npx nx test login
```
