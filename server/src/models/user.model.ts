import * as mongoose from 'mongoose';
import User, { UserAvatarUrl } from '../interfaces/user.interface';

export const userSchema = new mongoose.Schema(
  {
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    status: {
      type: String, 
      enum: ['Pending', 'Active'], 
      default: 'Pending'
    },
    password: {
      type: String,
      get: (): undefined => undefined,
    },
    confirmationCode: {type: String, unique: true },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    age: Number,
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
    },
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
    blocked: {
      type: Boolean,
      default(val: boolean): boolean {
        return false;
      },
    },
    ownedRestaurants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
      },
    ],
    favourites: Array,
    comments: Array,
    Operation: String || null,
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
