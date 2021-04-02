import Comments from 'interfaces/comments.interface';
import * as mongoose from 'mongoose';

export const commentsSchema = new mongoose.Schema({
    comment: String,
    id: String,
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters: true,
    },
});

const commentsModel = mongoose.model<Comments & mongoose.Document>('Comments', commentsSchema);

export default commentsModel;