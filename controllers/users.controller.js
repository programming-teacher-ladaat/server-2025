import User, { generateToken, JoiUserSchemas } from '../models/user.model.js';
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
        if (JoiUserSchemas.login.validate(req.body).error) {
            return next({ status: 400, message: 'invalid data' }); // Bad Request - בקשה לא תקינה
        }

        // בוודאות הנתונים שנשלחו תקינים
        const { email, password } = req.body;
        // const email = req.body.email
        const user = await User.findOne({ email });
        if (!user) {
            return next({ message: 'user not found', status: 401 }); // Unauthorized - לא מאומת
        }

        // בדיקת הסיסמא שנשלחה עם הסיסמא המוצפנת
        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth) {
            return next({ message: 'user not found', status: 401 }); // Unauthorized - לא מאומת
        }

        // user.password = '****'; // מחזיר כוכביות ללקוח
        // res.json(user);
        const token = generateToken(user);
        res.json({ username: user.username, token });
    } catch (error) {
        next({ message: error.message });
    }
}

// sign-up
export const register = async (req, res, next) => {
    try {
        const v = JoiUserSchemas.register.validate(req.body);
        if (v.error) {
            return next({ status: 400, message: v.error }); // Bad Request - בקשה לא תקינה
        }

        const { username, email, password } = v.value;
        const user = new User({ username, email, password });
        // TODO: hash the password - מתבצע אוטומטית לפני שמירה
        await user.save();

        // user.password = '****'; // מחזיר כוכביות ללקוח
        // res.json(user);
        const token = generateToken(user);
        res.json({ username: user.username, token });
    } catch (error) {
        next({ message: error.message });
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        // req.myUser = { _id, role }

        const { id } = req.params;

        if (req.myUser._id !== id) {
            return next({ status: 403, message: `user ${req.myUser._id} cannot delete user ${id}` })
        }

        // await User.deleteOne({ _id: id });
        await User.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        next({ message: error.message });
    }
}
