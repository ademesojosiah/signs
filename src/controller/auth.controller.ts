import { Request, Response } from "express";
import { UserInput } from "../model/user.model";
import  userService  from "../service/user.service";
import { sendSuccessResponse } from "../utils/response/successResponse";

const signUpController = async (req:Request , res:Response) =>{
    const payload : UserInput = req.body;

    const response = await userService.createUserService(payload, req);

    sendSuccessResponse(res,200,"user created successfully", response);

}

const loginController = async (req:Request , res:Response) =>{
    const payload : UserInput = req.body;

    const response = await userService.loginUserService(payload);

    sendSuccessResponse(res,200,"login successfully", response);

}



const authController = {
    signUpController,
    loginController
}

export default authController;