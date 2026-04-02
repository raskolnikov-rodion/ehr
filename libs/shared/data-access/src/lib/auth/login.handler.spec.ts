import { describe, expect, it } from 'vitest';
import { REGISTERED_USERS } from './constants';
import { loginHandler } from './login.handler';

describe('loginHandler', () => {
  const { DOCTOR, NURSE } = REGISTERED_USERS;

  describe('successful login', () => {
    it('returns 200 with accessToken and user payload for valid doctor credentials', () => {
      const result = loginHandler({
        url: '/api/login',
        method: 'POST',
        body: { email: DOCTOR.email, password: DOCTOR.password },
      });

      expect(result.status).toBe(200);
      const body = result.body as {
        accessToken: string;
        user: { id: string; name: string; email: string };
      };
      expect(body.accessToken).toContain('mock.jwt.ehr-demo.');
      expect(body.user).toEqual({
        id: DOCTOR.id,
        name: DOCTOR.name,
        email: DOCTOR.email,
      });
    });

    it('returns 200 with the correct user payload for valid nurse credentials', () => {
      const result = loginHandler({
        url: '/api/login',
        method: 'POST',
        body: { email: NURSE.email, password: NURSE.password },
      });

      expect(result.status).toBe(200);
      const body = result.body as { user: { id: string } };
      expect(body.user.id).toBe(NURSE.id);
    });

    it('does not expose the password in the response user object', () => {
      const result = loginHandler({
        url: '/api/login',
        method: 'POST',
        body: { email: DOCTOR.email, password: DOCTOR.password },
      });

      const user = (result.body as { user: Record<string, unknown> }).user;
      expect(user['password']).toBeUndefined();
    });
  });

  describe('failed login', () => {
    it('returns 401 for an unrecognised email', () => {
      const result = loginHandler({
        url: '/api/login',
        method: 'POST',
        body: { email: 'unknown@ehr.demo', password: DOCTOR.password },
      });

      expect(result.status).toBe(401);
      expect(result.body).toEqual({ message: 'Invalid email or password.' });
    });

    it('returns 401 for a correct email with the wrong password', () => {
      const result = loginHandler({
        url: '/api/login',
        method: 'POST',
        body: { email: DOCTOR.email, password: 'wrongPassword' },
      });

      expect(result.status).toBe(401);
      expect(result.body).toEqual({ message: 'Invalid email or password.' });
    });
  });
});
