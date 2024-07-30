import { Router } from "express";
import signController from "../controller/sign.controller";
import { saveVideo } from "../utils/multer/saveImage.multer";
import { multerUpload, uploadVideo } from "../utils/multer/multer";

const router = Router();

router.post("",uploadVideo.single("image"),saveVideo, signController.createSignController);
router.post("/all",signController.allSignController);


export default router;