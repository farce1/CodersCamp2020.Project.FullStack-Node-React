import { Address } from './address.interface';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: string;
  confirmationCode: string;
  age?: number;
  address?: string;
  userRole?: number;
  avatarUrl?: string;
  blocked?: boolean;
  ownedRestaurants?: string[];
  favourites?: string[];
  comments?: string[];
}

export type UserAvatarUrl = string | null;

export default User;
