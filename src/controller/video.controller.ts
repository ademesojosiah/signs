import { Request, Response } from "express";
import { sendSuccessResponse } from "../utils/response/successResponse";
import { VideoAttributes } from "../model/video.model";
import videoService from "../service/video.service";

const createVideoController = async (req: Request, res: Response) => {
  const payload: VideoAttributes = {...req.body,userId: req.user?.id};

  const response = await videoService.createVideoService(payload);

  sendSuccessResponse(res, 200, "video created successfully", response);
};

const allVideoController = async (req: Request, res: Response) => {
  const response = await videoService.getAllVideoService();

  sendSuccessResponse(res, 200, "videos retrieved successfully", response);
};

const allMyVideoController = async (req: Request, res: Response) => {

  const userId = req.user?.id as number
  const response = await videoService.getAllMyVideoService(userId);

  sendSuccessResponse(res, 200, "videos retrieved successfully", response);
};

const OneVideoController = async (req: Request, res: Response) => {

  const videoId = req.params.id
  const response = await videoService.getOneVideoService(Number(videoId));

  sendSuccessResponse(res, 200, "video retrieved successfully", response);
};

export default { createVideoController, allVideoController,allMyVideoController,OneVideoController };
