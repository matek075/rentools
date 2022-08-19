// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { Settings } from 'path/to/interfaces';

import { UserType } from 'context/user/types';

export * from './Api.types';
export * from './File.types';
export * from './Product.types';
export * from './Company.types';
export * from './Blog.types';
export * from './Geolocation.types';
export * from './OpeningHours.types'

export interface UserJWT extends User {
  exp: number;
  iat: number;
}

export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  type: UserType;
};
