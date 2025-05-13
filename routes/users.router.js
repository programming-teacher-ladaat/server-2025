import { Router } from "express";
import { getAllUsers, login, register } from "../controllers/users.controller.js";

const router = Router();

router.get('/', getAllUsers);

router.post('/login', login);

router.post('/', register);

export default router;