export const printDate = (req, res, next) => {
    console.log((new Date()).toLocaleString());
    
    // מעבר למידלוואר הבא
    next();
}

export const blockServer = (req, res, next) => {
    const num = Math.random();
    console.log(num);
    req.myNumber = num; // כך מעבירים נתונים למילוואר הבא
    
    if (num > 0.5) {
       return res.status(418).json({ message: 'block by me!!!!!!' });
    }
    next();
}