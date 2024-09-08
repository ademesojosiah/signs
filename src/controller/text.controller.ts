import { Request, Response } from "express";
import { sendSuccessResponse } from "../utils/response/successResponse";
import { TextAttributes } from "../model/text.model";
import textServices from "../service/text.service";

const createTextController = async (req: Request, res: Response) => {
  const payload: TextAttributes = {...req.body, userId:req.user?.id};

  const response = await textServices.createTextService(payload);

  sendSuccessResponse(res, 200, "text created successfully", response);
};

const allTextController = async (req: Request, res: Response) => {
  const response = await textServices.getAllTextService();

  sendSuccessResponse(res, 200, "texts fetched successfully", response);
};

const allMyTextController = async (req: Request, res: Response) => {

  const userId = req.user?.id as number
  const response = await textServices.getAllMyTextService(userId);

  sendSuccessResponse(res, 200, "texts retrieved successfully", response);
};

const OneTextController = async (req: Request, res: Response) => {

  const textId = req.params.id
  const response = await textServices.findOneTextService(Number(textId));

  sendSuccessResponse(res, 200, "text retrieved successfully", response);
};

export default { createTextController, allTextController,allMyTextController, OneTextController };
