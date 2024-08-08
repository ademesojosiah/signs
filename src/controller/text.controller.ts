import { Request, Response } from "express";
import { sendSuccessResponse } from "../utils/response/successResponse";
import { TextAttributes } from "../model/text.model";
import textServices from "../service/text.service";

const createTextController = async (req: Request, res: Response) => {
  const payload: TextAttributes = req.body;

  const response = await textServices.createTextService(payload);

  sendSuccessResponse(res, 200, "text created successfully", response);
};

const allTextController = async (req: Request, res: Response) => {
  const response = await textServices.getAllTextService();

  sendSuccessResponse(res, 200, "texts fetched successfully", response);
};

export default { createTextController, allTextController };
