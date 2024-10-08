import { Router } from "express";
import { saveVideo } from "../utils/multer/saveImage.multer";
import {  uploadVideo } from "../utils/multer/multer";
import videoController from "../controller/video.controller";

const router = Router();

router.post("", uploadVideo.single("video"),saveVideo,videoController.createVideoController);
router.get("/all",videoController.allVideoController);
router.get("",videoController.allMyVideoController);
router.get("/:id",videoController.OneVideoController);


export default router;