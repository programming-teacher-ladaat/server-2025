import mongoose, { model, mongo, Schema } from "mongoose";

// זו הסכמה של הבעלים של המוצר
// לא ניצור מודל כי אין אוסף חדש
const ownerSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, ref: 'users' }, // reference - הפניה לאוסף אחר
    username: String,
});

const productSchema = new Schema({
    name: String,
    price: Number,
    amount: Number,
    // כשיוצרים אוביקט בתוך סכמה של מונגוז נוצרת סכמה חדשה בצורה אוטומטית
    // owner: {
    //     _id: mongoose.SchemaTypes.ObjectId,
    //     username: String,
    //     ref: 'users'// reference - הפניה לאוסף אחר
    // },
    owner: ownerSchema
});

// נייצא מודל שכולל את שם האוסף
export default model('products', productSchema);