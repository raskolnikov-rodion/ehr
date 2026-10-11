import { expect } from 'vitest';
import * as matchers from 'vitest-axe/matchers';
import type { AxeMatchers } from 'vitest-axe/matchers';

declare module '@vitest/expect' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-empty-object-type
  interface Assertion extends AxeMatchers {}
  // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-empty-object-type
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}

expect.extend(matchers);

// jsdom does not implement canvas; axe-core probes it (icon ligature detection).
// Returning null avoids the "Not implemented: getContext" error without the `canvas` package.
HTMLCanvasElement.prototype.getContext = () => null;
