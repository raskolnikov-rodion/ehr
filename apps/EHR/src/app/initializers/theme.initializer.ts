import { provideAppInitializer } from '@angular/core';
import { setInitialThemeOnDocument } from '@ehr/core';

export const themeInitializer = provideAppInitializer(() => {
  setInitialThemeOnDocument();
});
