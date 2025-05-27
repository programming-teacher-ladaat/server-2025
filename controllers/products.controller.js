import Product from '../models/product.model.js';
import User from '../models/user.model.js';

let products = [];

export const getAllProducts = async (req, res, next) => {
    try {
        const { full } = req.query;
        let products;

        if (+full) {
            // populate - יכניס את כל הפרטים של המשתמש
            // ref שם השדה צריך להיות השדה של האיי-די שמוגדר עם
            // populate כי רק לו ניתן לבצע
            // products = await Product.find().populate('owner._id');

            // אם רוצים לקחת חלק מפרטי היוזר
            // products = await Product.find().populate('owner._id', 'email -_id');
            products = await Product.find().populate({ path: 'owner._id', select: 'email -_id' });
        }
        else {
            products = await Product.find();
        }
        res.json(products); // נעדיף להשתמש בצורה זו כדי לחייב לשלוח אוביקט
    } catch (error) {
        next({ message: error.message });
        // res.status(500).json(error)
    }
};

// get by id
export const getProductById = (req, res, next) => {
    const { id } = req.params;
    const product = products.find(p => p.id == id);
    res.json(product);
};

// add
export const addProduct = async (req, res, next) => {
    try {
        const { name, price, amount } = req.body;
        const user = await User.findById(req.myUser._id);
        const product = new Product({ name: name, amount, price, owner: user }); // יכניס רק את מה שקיים בסכמה
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        next({ message: error.message });
    }
};

// update
export const updateProduct = async (req, res, next) => {
    try {
        const pId = req.params.id;
        const { _id, name, price, amount } = req.body;

        if (pId !== _id) {
            // 409 - conflict - חוסר הגיון בנתונים שנשלחו
            // return res.status(409).json({ message: 'id conflict' })
            return next({ status: 409, message: 'id conflict' });
        }

        const product = await Product.findByIdAndUpdate(pId, {
            $set: { name, price, amount },
        }, { new: true });

        res.status(200).json(product);
    } catch (error) {
        next({ message: error.message });
    }
};

// delete
export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        await Product.findByIdAndDelete(id);

        res.status(204).end();
    } catch (error) {
        next({ message: error.message });
    }
};