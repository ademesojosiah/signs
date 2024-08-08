import { Request, Response } from "express";
import { sendSuccessResponse } from "../utils/response/successResponse";
import { VideoAttributes } from "../model/video.model";
import videoService from "../service/video.service";

const createVideoController = async (req: Request, res: Response) => {
  const payload: VideoAttributes = req.body;

  const response = await videoService.createVideoService(payload);

  sendSuccessResponse(res, 200, "video created successfully", response);
};

const allVideoController = async (req: Request, res: Response) => {
  const response = await videoService.getAllVideoService();

  sendSuccessResponse(res, 200, "videos fetched successfully", response);
};

export default { createVideoController, allVideoController };
