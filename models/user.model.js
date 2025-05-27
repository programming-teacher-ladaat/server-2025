import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true, minlength: 2 },
    email: { type: String, unique: true, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    orders: [{
        _id: { type: Schema.Types.ObjectId, ref: 'products' },
        name: String,
        price: Number,
        amount: Number // ניתן להוסיף שדות נוספים שלא קיימים באוסף מוצרים
    }],
});

export const generateToken = (user) => {
    const secretKey = process.env.JWT_SECRET || 'JWT_SECRET';
    const token = jwt.sign({ _id: user._id, role: user.role }, secretKey, { expiresIn: '1h' });
    return token;
};

// save לפני הפעולה
// יקרה באופן אוטומטי
// this-חובה לשלוח פונקציה רגילה ולא חץ - כי משתמשים ב
userSchema.pre('save', async function () {
    // hash the password
    const salt = await bcrypt.genSalt(10);
    console.log(salt);

    const hash = await bcrypt.hash(this.password, salt);

    // Store hash in your password DB
    this.password = hash;

    console.log(this);
});

export const JoiUserSchemas = {
    register: Joi.object({
        username: Joi.string().required(),
        password: Joi.string()
            .min(4) // מינימום 4 תווים
            .pattern(/^[a-zA-Z0-9]+$/) // סיסמא מכילה אותיות באנגלית או מספרים
            .required(),
        email: Joi.string().email().lowercase().required(), // אימייל תקין + המרה לאותיות קטנות
    }),
    login: Joi.object({
        email: Joi.string().lowercase().required(), // המרה לאותיות קטנות
        password: Joi.string().required(),
    }),
};

export default model('users', userSchema);