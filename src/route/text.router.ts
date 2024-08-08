import { Router } from "express";
import { multerUpload, uploadVideo } from "../utils/multer/multer";
import textController from "../controller/text.controller";

const router = Router();

router.post("", textController.createTextController);
router.get("/all",textController.allTextController);


export default router;