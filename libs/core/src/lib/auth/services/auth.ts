import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { LoginResponse } from './models';
import { TOKEN_KEY } from './constants';

@Injectable({ providedIn: 'root' })
export class Auth {
  private readonly http = inject(HttpClient);
  private readonly accessToken = signal<string | null>(
    localStorage.getItem(TOKEN_KEY),
  );

  readonly isLoggedIn = computed(() => this.accessToken() !== null);
  readonly token = this.accessToken.asReadonly();

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>('/api/login', { email, password })
      .pipe(
        tap((response) => {
          localStorage.setItem(TOKEN_KEY, response.accessToken);
          this.accessToken.set(response.accessToken);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.accessToken.set(null);
  }
}
