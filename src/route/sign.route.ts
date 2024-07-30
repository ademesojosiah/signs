import { Router } from "express";
import signController from "../controller/sign.controller";
import { saveVideo } from "../utils/multer/saveImage.multer";
import { multerUpload, uploadVideo } from "../utils/multer/multer";

const router = Router();

router.post("",uploadVideo.single("video"),saveVideo, signController.createSignController);
router.get("/all",signController.allSignController);


export default router;