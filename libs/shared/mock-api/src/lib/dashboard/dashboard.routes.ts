import { dashboardHandler } from './dashboard.handler';

export const DASHBOARD_ROUTES = [
  { method: 'GET', pattern: '/api/dashboard', handler: dashboardHandler },
];
