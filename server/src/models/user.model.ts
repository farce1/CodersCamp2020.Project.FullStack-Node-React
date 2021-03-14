import * as mongoose from 'mongoose';
import User, { UserAvatarUrl } from '../interfaces/user.interface';
import addressModel, { addressSchema } from './address.model';

const userSchema = new mongoose.Schema(
  {
    id: String,
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    address: addressSchema,
    avatarUrl: {
      type: String,
      default(val: UserAvatarUrl): UserAvatarUrl {
        return null;
      },
    },
    userRole: {
      type: Number,
      default(val: number): number {
        return 2;
      },
    },
    verified: {
      type: Boolean,
      default(val: boolean): boolean {
        return false;
      },
    },
    blocked: {
      type: Boolean,
      default(val: boolean): boolean {
        return false;
      },
    },
    ownedRestaurants: Array,
    favourites: Array,
    comments: Array,
    password: {
      type: String,
      get: (): undefined => undefined,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
