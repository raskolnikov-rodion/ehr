import { computed, Injectable, signal } from '@angular/core';
import { THEME_KEY } from './constants';
import { APP_THEME } from './models';
import { setInitialThemeOnDocument } from './helpers';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private readonly theme = signal<APP_THEME>('light');

  readonly darkTheme = computed(() => this.theme() === 'dark');

  constructor() {
    this.setInitialTheme();
  }

  toggleTheme(): void {
    const newTheme: APP_THEME = this.darkTheme() ? 'light' : 'dark';
    document.documentElement.setAttribute(THEME_KEY, newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    this.theme.set(newTheme);
  }

  private setInitialTheme(): void {
    const initialTheme = setInitialThemeOnDocument();
    this.theme.set(initialTheme);
  }
}
