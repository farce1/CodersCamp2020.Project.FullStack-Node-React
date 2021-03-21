import Comments from "interfaces/comments.interface";
import * as mongoose from "mongoose";

export const commentsSchema = new mongoose.Schema({
    timeStamp: Date,
    comment: String,
    // restaurant_id: String,
    // restaurant_name: String,
    // user_id: String,
    // user_firstName: String,
    // user_lastName: String,
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

const commentsModel = mongoose.model<Comments & mongoose.Document>('Comments', commentsSchema);

export default commentsModel;
