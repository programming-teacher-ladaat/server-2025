import { model, Schema } from "mongoose";

const productSchema = new Schema({
    name: String,
    price: Number,
    amount: Number
});

export default model('products', productSchema);