import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { toDashboardView } from './mappers';
import { DashboardResponse, DashboardView } from './models';

@Injectable({ providedIn: 'root' })
export class Dashboard {
  private readonly http = inject(HttpClient);

  getDashboard(): Observable<DashboardView | null> {
    return this.http.get<DashboardResponse>('/api/dashboard').pipe(
      map((response) => toDashboardView(response)),
      catchError(() => of(null)),
    );
  }
}
