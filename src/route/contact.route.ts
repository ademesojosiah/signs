import { Router } from "express";
import contactUsController from "../controller/contactUs.controller";
import { ContactUsValidator } from "../vallidaton/auth.validation";

const router = Router();

router.post("", ContactUsValidator,contactUsController.contactUsController);

export default router;