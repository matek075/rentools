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
