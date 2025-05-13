import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        const [, token] = authorization.split(' ');

        const secretKey = process.env.JWT_SECRET || 'JWT_SECRET';

        // אימות הטוקן
        const user = jwt.verify(token, secretKey); // payload: { _id, role }
        if (!user) {
            return next({ status: 403, message: 'auth required' }) // 403-Forbidden
        }

        // נעביר את היוזר שנשלף מהטוקן הלאה לראוטר
        req.myUser = user;
        next();
        // next(user); // מעביר למידולוואר של השגיאות
    } catch (error) {
        return next({ status: 403, message: 'auth required' })
        // 401-Unauthorized
    }
}

export const authAdmin = (req, res, next) => {
    // req.myUser = user;
    if (req.myUser.role !== 'admin'){
        return next({ status: 403, message: 'you are not admin' }) // 403-Forbidden
    }
    next();
}