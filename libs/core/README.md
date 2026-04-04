# core

Application-wide auth services and route guards. Import alias: `@ehr/core`.

## Public API

| Export        | Description                                                                                                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AuthService` | Manages auth state via Angular signals. Exposes `isLoggedIn` (computed) and `login`/`logout` methods. Persists the access token to `localStorage` under `ehr_access_token`. |
| `authGuard`   | Functional route guard — redirects unauthenticated users to `/login`.                                                                                                       |
| `noAuthGuard` | Functional route guard — redirects already-authenticated users away from `/login`.                                                                                          |

## Running unit tests

```bash
npx nx test core
```
