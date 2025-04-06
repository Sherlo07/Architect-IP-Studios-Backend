import express from "express";
import { register, login } from "../Controllers/AuthController.js";
import { validateRegister, validateLogin } from "../Middlewares/AuthValidation.js";

const router = express.Router();

router.post("/signup", validateRegister, register);

router.post("/login", validateLogin, login);

export default router;
