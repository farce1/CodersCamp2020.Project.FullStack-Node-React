import * as mongoose from "mongoose";
import {Address} from "cluster";

export const addressSchema = new mongoose.Schema({
    city: String,
    country: String,
    street: String,
});

const addressModel = mongoose.model<Address & mongoose.Document>('Address', addressSchema);

export default addressModel
