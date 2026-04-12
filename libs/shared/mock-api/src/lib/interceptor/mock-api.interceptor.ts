import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { of, throwError, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MockRouteService } from '../service/mock-route.service';
import { MockRequest } from '../service/models';
import {
  API_PREFIX,
  MAX_RESPONSE_DELAY_MS,
  MIN_RESPONSE_DELAY_MS,
} from './constants';

export const mockApiInterceptor: HttpInterceptorFn = (req, _next) => {
  if (!req.url.startsWith(API_PREFIX)) {
    return _next(req);
  }

  const registry = inject(MockRouteService);
  const handler = registry.match(req.method, req.url);

  const delay$ = timer(getRandomMsDelay());

  if (!handler) {
    return delay$.pipe(
      switchMap(() =>
        throwError(
          () =>
            new HttpErrorResponse({
              status: 404,
              statusText: 'Not Found',
              url: req.url,
              error: {
                message: `No mock handler for ${req.method} ${req.url}`,
              },
            }),
        ),
      ),
    );
  }

  const mockReq: MockRequest = {
    url: req.url,
    method: req.method,
    body: req.body,
    headers: req.headers
      .keys()
      .reduce(
        (acc, key) => ({
          ...acc,
          [key.toLowerCase()]: req.headers.get(key) ?? '',
        }),
        {} as Record<string, string>,
      ),
  };

  return delay$.pipe(
    switchMap(() => {
      const response = handler(mockReq);
      if (response.status >= 400) {
        return throwError(
          () =>
            new HttpErrorResponse({
              status: response.status,
              url: req.url,
              error: response.body,
            }),
        );
      }
      return of(
        new HttpResponse({
          status: response.status,
          body: response.body,
          url: req.url,
        }),
      );
    }),
  );
};

function getRandomMsDelay(): number {
  return (
    MIN_RESPONSE_DELAY_MS +
    Math.floor(Math.random() * (MAX_RESPONSE_DELAY_MS - MIN_RESPONSE_DELAY_MS))
  );
}
