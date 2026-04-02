import { beforeEach, describe, expect, it } from 'vitest';
import { MockHandlerFn } from './models';
import { MockRouteService } from './mock-route.service';
import { TestBed } from '@angular/core/testing';

describe('MockRouteService', () => {
  let service: MockRouteService;
  const handler: MockHandlerFn = () => ({ status: 200, body: null });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockRouteService],
    });
    service = TestBed.inject(MockRouteService);
  });

  describe('register', () => {
    it('stores the route and returns the total route count', () => {
      const result = service.register('GET', '/api/test', handler);
      expect(result).toEqual({ totalRoutes: 1 });
    });

    it('increments totalRoutes with each registration', () => {
      service.register('GET', '/api/a', handler);
      const result = service.register('POST', '/api/b', handler);
      expect(result).toEqual({ totalRoutes: 2 });
    });

    it('normalises the method to uppercase', () => {
      service.register('get', '/api/c', handler);
      expect(service.match('GET', '/api/c')).toBe(handler);
    });

    it('accepts a RegExp pattern', () => {
      service.register('GET', /^\/api\/items\/\d+$/, handler);
      expect(service.match('GET', '/api/items/7')).toBe(handler);
    });

    it('throws when registering a duplicate string route', () => {
      service.register('GET', '/api/test', handler);
      expect(() => service.register('GET', '/api/test', handler)).toThrow(
        'Route already registered: GET /api/test',
      );
    });

    it('throws when registering a duplicate RegExp route', () => {
      service.register('GET', /^\/api\/items\/\d+$/, handler);
      expect(() =>
        service.register('GET', /^\/api\/items\/\d+$/, handler),
      ).toThrow('Route already registered: GET /^\\/api\\/items\\/\\d+$/');
    });

    it('allows the same pattern on different methods', () => {
      service.register('GET', '/api/test', handler);
      expect(() =>
        service.register('POST', '/api/test', handler),
      ).not.toThrow();
    });
  });

  describe('match', () => {
    it('returns the handler for an exact string pattern match', () => {
      service.register('GET', '/api/test', handler);
      expect(service.match('GET', '/api/test')).toBe(handler);
    });

    it('returns the handler when the URL satisfies a RegExp pattern', () => {
      service.register('GET', /^\/api\/users\/\d+$/, handler);
      expect(service.match('GET', '/api/users/42')).toBe(handler);
    });

    it('returns undefined when no route matches the URL', () => {
      service.register('GET', '/api/test', handler);
      expect(service.match('GET', '/api/other')).toBeUndefined();
    });

    it('returns undefined when the method does not match', () => {
      service.register('POST', '/api/test', handler);
      expect(service.match('GET', '/api/test')).toBeUndefined();
    });

    it('matches any method when the route is registered with wildcard *', () => {
      service.register('*', '/api/test', handler);
      expect(service.match('GET', '/api/test')).toBe(handler);
      expect(service.match('POST', '/api/test')).toBe(handler);
      expect(service.match('DELETE', '/api/test')).toBe(handler);
    });

    it('normalises the match method to uppercase', () => {
      service.register('GET', '/api/test', handler);
      expect(service.match('get', '/api/test')).toBe(handler);
    });

    it('returns undefined when no routes have been registered', () => {
      expect(service.match('GET', '/api/test')).toBeUndefined();
    });
  });
});
