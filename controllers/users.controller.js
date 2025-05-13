import User from '../models/user.model.js';
import bcrypt from "bcryptjs";


export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        next({ message: error.message });
    }
};

// sign-in
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // const email = req.body.email
        const user = await User.findOne({ email });
        if (!user) {
            return next({ message: 'user not found', status: 401 }); // Unauthorized - לא מאומת
        }

        // בדיקת הסיסמא שנשלחה עם הסיסמא המוצפנת
        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth){
            return next({ message: 'user not found', status: 401 }); // Unauthorized - לא מאומת
        }

        // user.password = '****'; // מחזיר כוכביות ללקוח
        res.json(user);
    } catch (error) {
        next({ message: error.message });
    }
}

// sign-up
export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        // TODO: hash the password - מתבצע אוטומטית לפני שמירה
        await user.save();

        // user.password = '****'; // מחזיר כוכביות ללקוח
        res.json(user);
    } catch (error) {
        next({ message: error.message });
    }
}