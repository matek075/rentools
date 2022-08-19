import { Company } from 'context/company/types';
import { UserJWT } from 'types';

export enum UserType {
  User = 'user',
  Partner = 'partner',
}

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  type: UserType;
}

export interface UserState {
  authenticated: boolean;
  loading: boolean;
  data?: UserJWT;
  company?: Company;
  signIn: (accessToken: string) => void;
  signOut: () => void;
  refresh: () => void;
}

export enum AdminRole {
  READER = 1,
  MODERATOR = 2,
  ADMIN = 3,
}

export interface AdminJWT {
  name: string;
  role: AdminRole;
  exp: number;
  iat: number;
}

export interface AdminState {
  authenticated: boolean;
  loading?: boolean;
  data?: AdminJWT;
  signIn: (accessToken: string) => void;
  signOut: () => void;
}
