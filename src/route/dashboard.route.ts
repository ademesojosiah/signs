import { Router } from "express";
import dashboardController from "../controller/dashboardController.controller";

const router = Router();

router.get("" ,dashboardController.getDashboardController);


export default router;