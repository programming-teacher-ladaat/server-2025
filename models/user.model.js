import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
});


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
})

export default model('users', userSchema);