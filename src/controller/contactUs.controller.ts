import { Request, Response } from "express";
import contactUsService from "../service/contactUs.service";
import { sendSuccessResponse } from "../utils/response/successResponse";
import { ContactUsInput } from "../model/contactUs.model";

const contactUsController = async (req:Request , res:Response) =>{
    const payload : ContactUsInput = req.body;

    const response = await contactUsService.createContactUsService(payload);

    sendSuccessResponse(res,200, response,null);

}

export default {contactUsController};