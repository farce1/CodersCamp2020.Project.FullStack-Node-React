import * as mongoose from 'mongoose';
import User from '../interfaces/user.interface';
import addressModel, {addressSchema} from "./address.model";

const userSchema = new mongoose.Schema(
  {
    id: String,
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    address: addressSchema,
    avatarUrl: String,
    userRole: Number,
    verified: Boolean,
    blocked: Boolean,
    ownedRestaurants: Array,
    favourites: Array,
    comments: Array,
    hash: String,
    salt: String,
    status: {type: String, enum: ['Pending', 'Active'], default: 'Pending'},
    password: {
      type: String,
      get: (): undefined => undefined,
    },
    
    confirmationCode: {type: String, unique: true },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
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
