import { afterEach, describe, expect, it } from 'vitest';
import { THEME_KEY } from './constants';
import { APP_THEME } from './models';
import { setInitialThemeOnDocument } from './helpers';

describe('setInitialThemeOnDocument', () => {
  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute(THEME_KEY);
  });

  it('returns light theme when localStorage is empty', () => {
    expect(setInitialThemeOnDocument()).toBe(APP_THEME.LIGHT);
  });

  it('sets data-theme attribute to light when localStorage is empty', () => {
    setInitialThemeOnDocument();
    expect(document.documentElement.getAttribute(THEME_KEY)).toBe(
      APP_THEME.LIGHT,
    );
  });

  it('returns dark theme when dark is persisted in localStorage', () => {
    localStorage.setItem(THEME_KEY, APP_THEME.DARK);
    expect(setInitialThemeOnDocument()).toBe(APP_THEME.DARK);
  });

  it('sets data-theme attribute to dark when dark is persisted in localStorage', () => {
    localStorage.setItem(THEME_KEY, APP_THEME.DARK);
    setInitialThemeOnDocument();
    expect(document.documentElement.getAttribute(THEME_KEY)).toBe(
      APP_THEME.DARK,
    );
  });

  it('returns light theme when light is persisted in localStorage', () => {
    localStorage.setItem(THEME_KEY, APP_THEME.LIGHT);
    expect(setInitialThemeOnDocument()).toBe(APP_THEME.LIGHT);
  });
});
