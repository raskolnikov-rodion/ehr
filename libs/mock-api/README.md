# mock-api

Intercepts all `/api/*` HTTP requests and routes them to in-memory handler functions, with no backend required. Import alias: `@ehr/mock-api`.

## How it works

- Requests whose URL starts with `/api/` are intercepted and matched against a registered route table by HTTP method and URL pattern (string or `RegExp`). The wildcard `'*'` matches any HTTP verb.
- Matched handlers return a `{ status, body }` response. Responses with `status >= 400` are emitted as `HttpErrorResponse`.
- Unmatched requests receive a `404 HttpErrorResponse`.
- All responses are delayed by a random 200–1000 ms to simulate network latency.
- Requests that do not start with `/api/` pass through to the real network unchanged.

Removing `provideMockApi()` from `appConfig` is the only change needed to point the app at a real backend — no component or service code changes required.

## Setup

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideMockApi } from '@ehr/mock-api';

export const appConfig: ApplicationConfig = {
  providers: [provideMockApi()],
};
```

## Adding a new endpoint

1. Create a `MockHandlerFn` in a new file under `src/lib/`:

```typescript
// src/lib/patients/handlers.ts
import { MockHandlerFn } from '../handler/models';

export const getPatientsHandler: MockHandlerFn = (_req) => ({
  status: 200,
  body: [{ id: 1, name: 'Jane Doe' }],
});
```

2. Register it in `src/lib/provider/routes.ts`:

```typescript
{ method: 'GET', url: '/api/patients', handler: getPatientsHandler },
```

## Public API

| Export           | Description                                                            |
| ---------------- | ---------------------------------------------------------------------- |
| `provideMockApi` | Registers the HTTP interceptor and initialises all mock route handlers |

## Running unit tests

```bash
npx nx test mock-api
```
