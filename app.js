// 1. ייבוא
import express from 'express';
import productRouter from './routes/products.router.js';
import { config } from 'dotenv';
import { connectDB } from './config/db.js';
import { blockServer, printDate } from './middlewares/printDate.middleware.js';
import morgan from "morgan";
import cors from 'cors';
import { errorHandler, notFound } from './middlewares/errorHandling.middleware.js';

// למשתני הסביבה של המחשב .env מחבר את המשתנים בקובץ
config();

connectDB();

// 2. יצירת שרת
const app = express();

// ============== middlewares ==============
// יש חשיבות לסדר המידלוואר
// מאפשר לקבל באדי מסוג גייסון
app.use(express.json());
// מאפשר לקבל באדי מתוך טופס
app.use(express.urlencoded({ extended: true }));

// הדפסות של לוגים
app.use(morgan('dev'));

// מאפשר גישה לכל הקליינטים, לכל סוגי הבקשות
app.use(cors());
// app.use(cors({ methods: 'GET', origin: 'http://localhost:4200' })); // הגדרות על הגישה

// לתיקיה ציבוריתpublic הופך את התיקיה
// ניתן לגשת לכל הקבצים שבתוכה ע"י
// http://localhost:5000/images/1.jpg
// app.use(express.static('files'));
// app.use(express.static('images'));
app.use(express.static('public'));

// שולחים פונקצית מידלוואר והיא מתבצעת לפני הראוטר
// מידלוואר שמתבצע על כל הבקשות
app.use(printDate);
// app.use('/products', blockServer);

// 3. טיפול בניתובים
app.use('/products', productRouter);
// app.use('/products', blockServer, productRouter);


app.put('/try/:idx', (req, res) => {
    // req - כל מה שנשלח מהלקוח
    console.log(req.params); // url parameters (values are strings)
    console.log(req.query); // url query (values are strings)
    console.log(req.body); // body (async) -> event listener ('data', 'end')
    console.log(req.headers); // headers (keys are lowercase)
    res.send();
});

// בסוף הקובץ לאחר כל הניתובים
// notFound נקשר את המידולוואר של
app.use(notFound);

app.use(errorHandler);

// 4. הרצת שרת
const port = 5000;
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
});
