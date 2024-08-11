import { Router } from "express";
import rateController from "../controller/rating.controller";
import { validateRatingInput } from "../vallidaton/rating.validation";

const router = Router();

router.post("", validateRatingInput ,rateController.createRatingController);


export default router;