import { loginHandler } from './login.handler';

export const AUTH_ROUTES = [
  { method: 'POST', pattern: '/api/login', handler: loginHandler },
];
