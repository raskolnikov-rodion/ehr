# mock-api

Configures an Angular app to intercept all HTTP requests to `/api/` and route them to in-memory handler functions, with no backend required.

## How it works

- Requests whose URL starts with `/api/` are intercepted and matched against registered handlers by HTTP method and URL pattern (string or `RegExp`). The wildcard method `'*'` matches any HTTP verb.
- Matched handlers return a `{ status, body }` response. Responses with `status >= 400` are emitted as `HttpErrorResponse`.
- Unmatched requests receive a `404 HttpErrorResponse` with a descriptive error message.
- All responses — success or error — are delayed by a random 200–1000 ms to simulate network latency.
- Requests that do not start with `/api/` are passed through to the real network unchanged.

## Setup

```ts
import { ApplicationConfig } from '@angular/core';
import { provideMockApi } from '@ehr/shared/mock-api';

export const appConfig: ApplicationConfig = {
  providers: [provideMockApi()],
};
```
