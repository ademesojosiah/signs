import { Request, Response } from "express";
import signsService from "../service/signs.service";
import { sendSuccessResponse } from "../utils/response/successResponse";
import { SignsAttributes } from "../model/sign.model";

const createSignController = async (req: Request, res: Response) => {
  const payload: SignsAttributes = {...req.body, userId: req.user?.id};

  console.log(payload);
  

  const response = await signsService.createSignsService(payload);

  sendSuccessResponse(res, 200, "Sign created successfully", response);
};

const allSignController = async (req: Request, res: Response) => {
  const response = await signsService.getAllSignsService();

  sendSuccessResponse(res, 200, "Sign fetched successfully", response);
};

export default { createSignController, allSignController };
