import * as mongoose from 'mongoose';
import {addressSchema} from "./address.model";
import {Restaurant, RestaurantOwner, RestaurantSiteUrl} from '../interfaces/restaurant.interface';
import {userSchema} from "./user.model";
const restaurantSchema = new mongoose.Schema(
    {
        id: String,
        name: String,
        email: String,
        address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address"
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default(val: RestaurantOwner): RestaurantOwner {
                return null;
            },
        },
        description: {
            type: String,
            default(val: string): string {
                return "";
            },
        },
        siteUrl: {
            type: String,
            default(val: RestaurantSiteUrl): RestaurantSiteUrl {
                return null;
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
        socials: Array,
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
