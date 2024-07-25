import { Router } from "express";
import authController from "../controller/auth.controller";
import { loginValidator, signUpValidator } from "../vallidaton/auth.validation";

const router = Router();

router.post("/signup",signUpValidator, authController.signUpController);
router.post("/login",loginValidator, authController.loginController);

export default router;