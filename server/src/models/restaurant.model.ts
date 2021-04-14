import * as mongoose from 'mongoose';
import {Restaurant, RestaurantOwner, SiteDetails, Socials} from '../interfaces/restaurant.interface';
const restaurantSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    email: String,
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default(val: RestaurantOwner): RestaurantOwner {
        return val || null;
      },
    },
    description: {
      type: String,
      default(val: string): string {
        return '';
      },
    },
      siteUrl: {
          type: Object,
          default(val: SiteDetails): SiteDetails {
              return {
                  page: null,
                  photo: null,
                  logo: null,
              };
          },
      },
    opened: {
      type: Boolean,
      default(val: boolean): boolean {
        return false;
      },
    },
    verified: {
      type: Boolean,
      default(val: boolean): boolean {
        return false;
      },
    },
    cuisine: Array,
    socials: {
      type: Object,
      default(val: Socials): Socials {
        return {
          facebook: null,
          instagram: null,
          socialImage: null,
        };
      },
    },
    comments: Array,
    likeCount: {
      type: Number,
      default(val: number): number {
        return 0;
      },
    },
    dislikeCount: {
      type: Number,
      default(val: number): number {
        return 0;
      },
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

const restaurantModel = mongoose.model<Restaurant & mongoose.Document>('Restaurant', restaurantSchema);

export default restaurantModel;
