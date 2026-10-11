/** Route path segments, shared by the route config and in-app navigation. */
export const ROUTE_PATHS = {
  login: 'login',
  logout: 'logout',
  dashboard: 'dashboard',
  patients: 'patients',
  patientProfile: 'patient/:id',
  designSystem: 'docs/design-system',
} as const;
