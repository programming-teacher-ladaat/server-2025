import { Router } from "express";

const router = Router();

let products = [];

// get all
router.get('/', (req, res) => {
    // res.send(products); // מאפשר להחזיר הכל
    res.json(products); // נעדיף להשתמש בצורה זו כדי לחייב לשלוח אוביקט
});

// get by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find(p => p.id == id);
    res.json(product);
});

// add
router.post('/', (req, res) => {
    const { name, price, amount } = req.body;
    const product = { id: Date.now(), name: name, price, amount }
    products.push(product);
    res.status(201).json(product);
});

// update
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, amount } = req.body;
    const product = products.find(p => p.id == id);
    product.name = name;
    product.price = price;
    product.amount = amount;
    res.json(product);
})

// delete
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    products = products.filter(p => p.id != id);
    res.status(204).send();
})

export default router;