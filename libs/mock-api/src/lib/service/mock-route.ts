import { Injectable } from '@angular/core';
import { RouteRegistration, MockHandlerFn } from './models';

@Injectable({ providedIn: 'root' })
export class MockRoute {
  private readonly routes: RouteRegistration[] = [];

  register(method: string, pattern: string | RegExp, handler: MockHandlerFn) {
    if (this.routeIsDuplicated(method, pattern)) {
      throw new Error(
        `Route already registered: ${this.normalise(method)} ${pattern.toString()}`,
      );
    }

    const totalRoutes = this.routes.push({
      method: this.normalise(method),
      pattern,
      handler,
    });
    return { totalRoutes };
  }

  match(method: string, url: string): MockHandlerFn | undefined {
    const normalisedMethod = this.normalise(method);
    return this.routes.find(({ method: m, pattern }) => {
      const methodMatches = m === '*' || m === normalisedMethod;
      if (!methodMatches) return false;
      return typeof pattern === 'string' ? pattern === url : pattern.test(url);
    })?.handler;
  }

  private routeIsDuplicated(method: string, pattern: string | RegExp): boolean {
    const normalisedMethod = this.normalise(method);
    return this.routes.some(
      (r) =>
        r.method === normalisedMethod &&
        (r.pattern instanceof RegExp && pattern instanceof RegExp
          ? r.pattern.source === pattern.source &&
            r.pattern.flags === pattern.flags
          : r.pattern === pattern),
    );
  }

  private normalise(method: string): string {
    return method.toUpperCase();
  }
}
