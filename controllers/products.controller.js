import Product from '../models/product.model.js';

let products = [];

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products); // נעדיף להשתמש בצורה זו כדי לחייב לשלוח אוביקט
    } catch (error) {
        res.status(500).json(error)
    }
};

// get by id
export const getProductById = (req, res) => {
    const { id } = req.params;
    const product = products.find(p => p.id == id);
    res.json(product);
};

// add
export const addProduct = async (req, res) => {
    try {
        const { name, price, amount } = req.body;
        const product = new Product({ name: name, amount, price });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json(error)
    }
};

// update
export const updateProduct = async (req, res) => {
    try {
        const pId = req.params.id;
        const { _id, name, price, amount } = req.body;

        if (pId !== _id) {
            // 409 - conflict - חוסר הגיון בנתונים שנשלחו
            return res.status(409).json({ message: 'id conflict' })
        }

        const product = await Product.findByIdAndUpdate(pId, {
            $set: { name, price, amount },
        }, { new: true });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error)
    }
};

// delete
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        await Product.findByIdAndDelete(id);

        res.status(204).end();
    } catch (error) {
        res.status(500).json(error)
    }
};