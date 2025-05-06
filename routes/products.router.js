import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/products.controller.js";

const router = Router();

// get all
router.get('/', getAllProducts);

// get by id
router.get('/:id', getProductById);

// add
router.post('/', addProduct);

// update
router.put('/:id', updateProduct);

// delete
router.delete('/:id', deleteProduct);

export default router;