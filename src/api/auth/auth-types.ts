import { User } from '../users/user-schema.js';

export interface UserLocalsAuthInfo {
  email: string;
}

export interface LoginResponse {
  accessToken: string;
}

export type AuthRequest = Pick<User, 'name' | 'surname' | 'email' | 'password'>;
