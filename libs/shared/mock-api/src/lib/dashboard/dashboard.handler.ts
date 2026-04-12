import { MockHandlerFn } from '../service/models';
import { MOCK_DASHBOARD_DOCTOR, MOCK_DASHBOARD_NURSE } from './dashboard.data';

export const dashboardHandler: MockHandlerFn = (req) => {
  const authHeader = req.headers['authorization'] ?? '';
  const token = authHeader.replace('Bearer ', '');
  const userId = token.split('.')?.[1];

  const data =
    userId === 'DOCTOR'
      ? MOCK_DASHBOARD_DOCTOR
      : userId === 'NURSE'
        ? MOCK_DASHBOARD_NURSE
        : null;

  if (!data) {
    return { status: 401, body: { message: 'Unauthorized' } };
  }

  return { status: 200, body: data };
};
