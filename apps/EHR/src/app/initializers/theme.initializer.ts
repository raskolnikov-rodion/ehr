import { provideAppInitializer } from '@angular/core';
import { setInitialThemeOnDocument } from '@ehr/theme';

export const themeInitializer = provideAppInitializer(() => {
  setInitialThemeOnDocument();
});
