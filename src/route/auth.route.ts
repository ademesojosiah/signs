import { Router } from "express";
import authController from "../controller/auth.controller";

const router = Router();

router.post("/signup",authController.signUpController);
router.post("/login",authController.loginController);

export default router;