import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/products.controller.js";
import { blockServer } from "../middlewares/printDate.middleware.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/mid', blockServer, (req, res, next) => {
    console.log('mid', req.myNumber);    
    res.send('try middleware');
});

// get all products
// can send query params: ?full=1 (all details of owner), ?full=0 (only owner basic details)
router.get('/', getAllProducts);

// get by id
router.get('/:id', getProductById);

// add
router.post('/', auth, addProduct);

// update
router.put('/:id', updateProduct);

// delete
router.delete('/:id', deleteProduct);

export default router;