export interface AuthUser {
  id: string;
  email: string;
  name: string;
  password: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}
