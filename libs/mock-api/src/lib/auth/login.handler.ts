import { MockHandlerFn } from '../service/models';
import { REGISTERED_USERS } from './constants';
import { LoginRequestBody } from './models';

export const loginHandler: MockHandlerFn = (req) => {
  const { email, password } = req.body as LoginRequestBody;

  const user = Object.values(REGISTERED_USERS).find(
    (user) => user.email === email && user.password === password,
  );

  if (user) {
    return {
      status: 200,
      body: {
        accessToken: `mock-token.${user.id}.${Math.random()}`,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    };
  }

  return {
    status: 401,
    body: { message: 'Invalid email or password.' },
  };
};
