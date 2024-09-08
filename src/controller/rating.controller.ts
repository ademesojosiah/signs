import { Request, Response } from "express";
import { sendSuccessResponse } from "../utils/response/successResponse";
import { RatingAttributes } from "../model/rating.model";
import ratingService from "../service/rating.service";

const createRatingController = async (req: Request, res: Response) => {
  const payload: RatingAttributes ={ ...req.body, userId:req.user?.id};

  const response = await ratingService.createRatingService(payload);

  sendSuccessResponse(res, 200, "rating created successfully", response);
};

export default { createRatingController };

