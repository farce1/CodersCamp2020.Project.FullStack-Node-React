
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  age?: number;
  email: string;
  password: string;
  address?: string;
  avatarUrl?: string;
  userRole?: number;
  verified?: boolean;
  blocked?: boolean;
  ownedRestaurants?: string[];
  favourites?: string[];
  comments?: string[];
  restaurant?: string;
}

export type UserAvatarUrl = string | null;

export default User;
