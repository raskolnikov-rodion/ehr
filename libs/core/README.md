# core

Application-wide authentication services and route guards. Import alias: `@ehr/core`.

## How it works

`AuthService` holds auth state in a private `accessToken` signal initialised from `localStorage`. `isLoggedIn` is a `computed` signal derived from that token — there is no imperative state mutation. Login and logout methods update the signal and sync to `localStorage` under the key `ehr_access_token`.

Route access is enforced at the router level by two functional guards:

- `authGuard` — redirects unauthenticated users to `/login`
- `noAuthGuard` — redirects already-authenticated users to `/dashboard`, preventing redundant re-authentication

Both guards are pure functions that compose directly with Angular's `canActivate` API.

## Public API

| Export                  | Description                                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `AuthService`           | Manages auth state via signals. Exposes `isLoggedIn` (computed), `login(email, password)` (returns Observable), and `logout()`. |
| `authGuard`             | `CanActivateFn` — redirects unauthenticated users to `/login`.                                                                  |
| `noAuthGuard`           | `CanActivateFn` — redirects authenticated users to `/dashboard`.                                                                |
| `LogoutButtonComponent` | Standalone button (`ehr-logout-button`) that calls `AuthService.logout()` and navigates to `/login`.                            |

## Running unit tests

```bash
npx nx test core
```
