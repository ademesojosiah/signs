import { Router } from "express";
import { saveVideo } from "../utils/multer/saveImage.multer";
import { multerUpload, uploadVideo } from "../utils/multer/multer";
import videoController from "../controller/video.controller";

const router = Router();

router.post("",uploadVideo.single("video"),saveVideo, videoController.createVideoController);
router.get("/all",videoController.allVideoController);


export default router;