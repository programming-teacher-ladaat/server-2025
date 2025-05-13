import { Router } from "express";
import { deleteUser, getAllUsers, login, register } from "../controllers/users.controller.js";
import { auth, authAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/', auth, authAdmin, getAllUsers);

router.post('/login', login);

router.post('/', register);

router.delete('/:id', auth, deleteUser);

export default router;