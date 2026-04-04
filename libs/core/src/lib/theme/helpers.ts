import { THEME_KEY } from './constants';
import { APP_THEME } from './models';

export function setInitialThemeOnDocument(): APP_THEME {
  const initialTheme = (localStorage.getItem(THEME_KEY) ||
    APP_THEME.LIGHT) as APP_THEME;
  document.documentElement.setAttribute(THEME_KEY, initialTheme);
  return initialTheme;
}
