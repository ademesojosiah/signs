import { Request, Response } from "express";
import { sendSuccessResponse } from "../utils/response/successResponse";
import userService from "../service/user.service";

const getDashboardController = async (req: Request, res: Response) => {
    
  const response = await userService.getDashboard(req.user?.id);

  sendSuccessResponse(res, 200, "profile retrieved successfully", response);
};

export default { getDashboardController };

 