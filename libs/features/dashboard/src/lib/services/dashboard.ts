import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  catchError,
  map,
  Observable,
  of,
  retry,
  throwError,
  timer,
} from 'rxjs';
import { toDashboardError, toDashboardView } from './mappers';
import { DashboardResponse, DashboardResult } from './models';

export const MAX_RETRIES = 3;
export const BASE_RETRY_DELAY_MS = 250;

@Injectable({ providedIn: 'root' })
export class Dashboard {
  private readonly http = inject(HttpClient);

  getDashboard(): Observable<DashboardResult> {
    return this.http.get<DashboardResponse>('/api/dashboard').pipe(
      retry({
        count: MAX_RETRIES,
        delay: (error, retryCount) =>
          error instanceof HttpErrorResponse && error.status === 503
            ? timer(BASE_RETRY_DELAY_MS * 2 ** (retryCount - 1))
            : throwError(() => error),
      }),
      map(
        (response): DashboardResult => ({
          data: toDashboardView(response),
          error: null,
        }),
      ),
      catchError((error) =>
        of<DashboardResult>({ data: null, error: toDashboardError(error) }),
      ),
    );
  }
}
