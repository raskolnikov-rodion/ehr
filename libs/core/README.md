# core

Application-wide authentication services and route guards. Import alias: `@ehr/core`.

## How it works

`Auth` holds auth state in a private `accessToken` signal initialised from `localStorage`. `isLoggedIn` is a `computed` signal derived from that token — there is no imperative state mutation. Login and logout methods update the signal and sync to `localStorage` under the key `ehr_access_token`. The readonly `token` signal exposes the raw token value for use by the interceptor.

`authInterceptor` is a functional `HttpInterceptorFn`. It reads the current token from `Auth` and attaches an `Authorization: Bearer <token>` header to every outbound request whose URL starts with `/api/`, except `/api/login` which is always passed through unauthenticated. Requests to non-API paths are also left unchanged.

Route access is enforced at the router level by two functional guards:

- `authGuard` — redirects unauthenticated users to `/login`
- `noAuthGuard` — redirects already-authenticated users to `/dashboard`, preventing redundant re-authentication

Both guards are pure functions that compose directly with Angular's `canActivate` API.

## Public API

| Export            | Description                                                                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Auth`            | Manages auth state via signals. Exposes `isLoggedIn` (computed), `token` (readonly signal), `login(email, password)` (returns Observable), and `logout()`. |
| `authInterceptor` | `HttpInterceptorFn` — attaches `Authorization: Bearer <token>` to all `/api/*` requests except `/api/login`.                                               |
| `authGuard`       | `CanActivateFn` — redirects unauthenticated users to `/login`.                                                                                             |
| `noAuthGuard`     | `CanActivateFn` — redirects authenticated users to `/dashboard`.                                                                                           |
| `LogoutButton`    | Standalone button (`ehr-logout-button`) that calls `Auth.logout()` and navigates to `/login`.                                                              |

## Running unit tests

```bash
npx nx test core
```
