import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { DashboardResponse } from './models';

@Injectable({ providedIn: 'root' })
export class Dashboard {
  private readonly http = inject(HttpClient);

  getDashboard(): Observable<DashboardResponse | null> {
    return this.http
      .get<DashboardResponse>('/api/dashboard')
      .pipe(catchError(() => of(null)));
  }
}
