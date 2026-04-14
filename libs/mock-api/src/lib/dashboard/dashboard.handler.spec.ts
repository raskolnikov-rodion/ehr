import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MOCK_DASHBOARD_DOCTOR, MOCK_DASHBOARD_NURSE } from './dashboard.data';
import { dashboardHandler, FAILURE_RATE } from './dashboard.handler';

const doctorReq = {
  url: '/api/dashboard',
  method: 'GET',
  body: null,
  headers: { authorization: 'Bearer mock-token.DOCTOR' },
};

const nurseReq = {
  url: '/api/dashboard',
  method: 'GET',
  body: null,
  headers: { authorization: 'Bearer mock-token.NURSE' },
};

const unauthReq = {
  url: '/api/dashboard',
  method: 'GET',
  body: null,
  headers: {},
};

describe('dashboardHandler', () => {
  describe('when the random failure does not trigger', () => {
    beforeEach(() => {
      vi.spyOn(Math, 'random').mockReturnValue(FAILURE_RATE);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('returns 200 with doctor data for a DOCTOR token', () => {
      const result = dashboardHandler(doctorReq);

      expect(result.status).toBe(200);
      expect(result.body).toEqual(MOCK_DASHBOARD_DOCTOR);
    });

    it('returns 200 with nurse data for a NURSE token', () => {
      const result = dashboardHandler(nurseReq);

      expect(result.status).toBe(200);
      expect(result.body).toEqual(MOCK_DASHBOARD_NURSE);
    });

    it('returns 401 when authorization header is missing', () => {
      const result = dashboardHandler(unauthReq);

      expect(result.status).toBe(401);
      expect(result.body).toEqual({ message: 'Unauthorized' });
    });

    it('returns 401 for an unrecognised user id in the token', () => {
      const result = dashboardHandler({
        ...doctorReq,
        headers: { authorization: 'Bearer mock-token.UNKNOWN' },
      });

      expect(result.status).toBe(401);
      expect(result.body).toEqual({ message: 'Unauthorized' });
    });
  });

  describe('random failure', () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('returns 503 when Math.random() is below the failure rate', () => {
      vi.spyOn(Math, 'random').mockReturnValue(FAILURE_RATE - 0.01);

      const result = dashboardHandler(doctorReq);

      expect(result.status).toBe(503);
      expect(result.body).toEqual({
        message: 'Service temporarily unavailable',
      });
    });

    it('does not fail when Math.random() equals the failure rate', () => {
      vi.spyOn(Math, 'random').mockReturnValue(FAILURE_RATE);

      const result = dashboardHandler(doctorReq);

      expect(result.status).toBe(200);
    });

    it('fails roughly 15% of the time over many invocations', () => {
      const iterations = 10_000;
      let failures = 0;

      for (let i = 0; i < iterations; i++) {
        vi.restoreAllMocks();
        if (dashboardHandler(doctorReq).status === 503) failures++;
      }

      const rate = failures / iterations;
      expect(rate).toBeGreaterThan(0.1);
      expect(rate).toBeLessThan(0.2);
    });
  });
});
