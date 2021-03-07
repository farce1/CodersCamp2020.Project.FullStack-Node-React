import * as mongoose from 'mongoose';
import User from './user.interface';

const addressSchema = new mongoose.Schema({
  city: String,
  country: String,
  street: String,
});

const schemaTimeStamps = new mongoose.Schema({
  timestamps: {
    createdAt: String,
    updatedAt: String,
  },
});

const userSchema = new mongoose.Schema(
  {
    id: String,
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    address: addressSchema,
    avatarUrl: String,
    accountTimeStamps: schemaTimeStamps,
    userRole: Number,
    verified: Boolean,
    blocked: Boolean,
    ownedRestaurants: Array,
    favourites: Array,
    comments: Array,
    hash: String,
    salt: String,
    password: {
      type: String,
      get: (): undefined => undefined,
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  },
);

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author',
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
