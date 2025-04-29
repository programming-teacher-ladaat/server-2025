// 1. ייבוא
import express from 'express';

// 2. יצירת שרת
const app = express();

// ============== middlewares ==============
// מאפשר לקבל באדי מסוג גייסון
app.use(express.json());
// מאפשר לקבל באדי מתוך טופס
app.use(express.urlencoded({ extended: true }));

const products = [];

// 3. טיפול בניתובים
app.get('/products', (req, res) => {
    // res.send(products); // מאפשר להחזיר הכל
    res.json(products); // נעדיף להשתמש בצורה זו כדי לחייב לשלוח אוביקט
});

app.post('/products', (req, res) => {
    products.push({ id: 100, name: 'milk', price: 5, amount: 10 })
    res.json(products)
});

app.put('/try/:idx', (req, res) => {
    // req - כל מה שנשלח מהלקוח
    console.log(req.params); // url parameters (values are strings)
    console.log(req.query); // url query (values are strings)
    console.log(req.body); // body (async) -> event listener ('data', 'end')
    console.log(req.headers); // headers (keys are lowercase)
    res.send();
});

// 4. הרצת שרת
const port = 5000;
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
});
