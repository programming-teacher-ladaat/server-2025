/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const notFound = (req, res, next) => {
    // כאשר שולחים פרמטר לנקסט
    // עוברים אוטומטית למידלוואר של השגיאות
    next({ message: 'url not found!', status: 404 });
}

/**
 * מטפל בכל סוגי השגיאות
 * @param {{ message?: string, status?: number }} err 
 * @param {Request} req 
 * @param {Response} res 
 * @param {() => void} next 
 */
export const errorHandler = (err, req, res, next) => {
    // ארבעה פרמטרים - הפרמטר הראשון הוא השגיאה
    const status = err.status ?? 500;
    const msg = err.message ?? 'Server Error';
    res.status(status).json({ error: msg, fixMail: 'fix@gmail.com' }); // { error: { message } }
};