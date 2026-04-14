import { MockHandlerFn } from '../service/models';
import { MOCK_DASHBOARD_DOCTOR, MOCK_DASHBOARD_NURSE } from './dashboard.data';

export const FAILURE_RATE = 0.15;

export const dashboardHandler: MockHandlerFn = (req) => {
  if (Math.random() < FAILURE_RATE) {
    return {
      status: 503,
      body: { message: 'Service temporarily unavailable' },
    };
  }

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
