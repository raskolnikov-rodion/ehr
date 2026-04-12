import { AUTH_ROUTES } from '../auth/routes';
import { DASHBOARD_ROUTES } from '../dashboard/dashboard.routes';

export const ROUTES = [...AUTH_ROUTES, ...DASHBOARD_ROUTES] as const;
