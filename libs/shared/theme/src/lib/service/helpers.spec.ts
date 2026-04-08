import { afterEach, describe, expect, it } from 'vitest';
import { THEME_KEY } from './constants';
import { setInitialThemeOnDocument } from './helpers';

describe('setInitialThemeOnDocument', () => {
  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute(THEME_KEY);
  });

  it('returns light theme when localStorage is empty', () => {
    expect(setInitialThemeOnDocument()).toBe('light');
  });

  it('sets data-theme attribute to light when localStorage is empty', () => {
    setInitialThemeOnDocument();
    expect(document.documentElement.getAttribute(THEME_KEY)).toBe('light');
  });

  it('returns dark theme when dark is persisted in localStorage', () => {
    localStorage.setItem(THEME_KEY, 'dark');
    expect(setInitialThemeOnDocument()).toBe('dark');
  });

  it('sets data-theme attribute to dark when dark is persisted in localStorage', () => {
    localStorage.setItem(THEME_KEY, 'dark');
    setInitialThemeOnDocument();
    expect(document.documentElement.getAttribute(THEME_KEY)).toBe('dark');
  });

  it('returns light theme when light is persisted in localStorage', () => {
    localStorage.setItem(THEME_KEY, 'light');
    expect(setInitialThemeOnDocument()).toBe('light');
  });
});
