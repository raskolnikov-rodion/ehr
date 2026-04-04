import { computed, Injectable, signal } from '@angular/core';
import { THEME_KEY } from './constants';
import { APP_THEME } from './models';
import { setInitialThemeOnDocument } from './helpers';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly theme = signal<string | null>('');

  readonly darkTheme = computed(() => this.theme() === APP_THEME.DARK);

  constructor() {
    this.setInitialTheme();
  }

  toggleTheme(): void {
    const newTheme = this.darkTheme() ? APP_THEME.LIGHT : APP_THEME.DARK;
    document.documentElement.setAttribute(THEME_KEY, newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    this.theme.set(newTheme);
  }

  private setInitialTheme(): void {
    const initialTheme = setInitialThemeOnDocument();
    this.theme.set(initialTheme);
  }
}
