import "express-async-errors";
import * as bcrypt from "bcryptjs";
import db from "../model/index.model"
import { AppError } from "../utils/error/appError";
import { Request } from "express";
import { Optional } from "sequelize";
import { ContactUs, ContactUsInput } from "../model/contactUs.model";




const createContactUsService = async (
    payload: ContactUsInput
  ): Promise<string> => {
    const realPayload: ContactUsInput = {
      email: payload.email,
      description: payload.description,
    };
  
    const contactUs: ContactUs = await db.ContactUs.create(realPayload);
  
    // const { token, tokenExpires } = await createAndSaveToken(user.id);
  
    // const url: string = `${req.protocol}://${req.get(
    //   "host"
    // )}/api/v1/auth/verify/${token}`;
  
    // // SEND SUCCESS MAIL TO CLIENT
    // await new Email(user, url).sendWelcome();

  
    return "email sent successfully";
  };


const contactUsService = {createContactUsService};

export default contactUsService;
