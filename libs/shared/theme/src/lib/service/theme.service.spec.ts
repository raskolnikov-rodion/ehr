import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { THEME_KEY } from './constants';
import { APP_THEME } from './models';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  function testSetup() {
    service = TestBed.inject(ThemeService);
  }

  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute(THEME_KEY);
  });

  describe('Initial state', () => {
    beforeEach(() => testSetup());

    it('defaults to light theme when localStorage is empty', () => {
      expect(service.darkTheme()).toBe(false);
    });

    it('sets the data-theme attribute to light on the document element', () => {
      expect(document.documentElement.getAttribute(THEME_KEY)).toBe(
        APP_THEME.LIGHT,
      );
    });
  });

  describe('Initial state (persisted theme)', () => {
    it('restores dark theme from localStorage', () => {
      localStorage.setItem(THEME_KEY, APP_THEME.DARK);
      testSetup();
      expect(service.darkTheme()).toBe(true);
    });

    it('sets the data-theme attribute to dark when dark theme is persisted', () => {
      localStorage.setItem(THEME_KEY, APP_THEME.DARK);
      testSetup();
      expect(document.documentElement.getAttribute(THEME_KEY)).toBe(
        APP_THEME.DARK,
      );
    });
  });

  describe('toggleTheme', () => {
    beforeEach(() => testSetup());

    it('switches from light to dark', () => {
      expect(service.darkTheme()).toBe(false);
      service.toggleTheme();
      expect(service.darkTheme()).toBe(true);
    });

    it('switches from dark to light', () => {
      service.toggleTheme();
      expect(service.darkTheme()).toBe(true);
      service.toggleTheme();
      expect(service.darkTheme()).toBe(false);
    });

    it('persists the new theme to localStorage', () => {
      service.toggleTheme();
      expect(localStorage.getItem(THEME_KEY)).toBe(APP_THEME.DARK);
      service.toggleTheme();
      expect(localStorage.getItem(THEME_KEY)).toBe(APP_THEME.LIGHT);
    });

    it('updates the data-theme attribute on the document element', () => {
      service.toggleTheme();
      expect(document.documentElement.getAttribute(THEME_KEY)).toBe(
        APP_THEME.DARK,
      );
      service.toggleTheme();
      expect(document.documentElement.getAttribute(THEME_KEY)).toBe(
        APP_THEME.LIGHT,
      );
    });
  });
});
