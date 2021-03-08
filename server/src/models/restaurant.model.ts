import * as mongoose from 'mongoose';
import {addressSchema} from "./address.model";
import {Restaurant} from '../interfaces/restaurant.interface';
const restaurantSchema = new mongoose.Schema(
    {
        id: String,
        name: String,
        email: String,
        address: addressSchema,
        description: String,
        siteUrl: String,
        opened: Boolean,
        verified: Boolean,
        cuisine: Array,
        socials: Array,
        comments: Array,
        likeCount: Number,
        dislikeCount: Number,
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
