import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { AppError } from "../utils/error/appError";



export async function validateRatingInput(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const ratingInput = req.body;
  
    const schema = Joi.object({
      textId: Joi.string().required(), 
      videoId: Joi.string().required(), 
      ratingNo: Joi.number().integer().min(1).max(5).required()
    });
  
    try {
      await schema.validateAsync(ratingInput);
      next();
    } catch (error: any) {
      throw new AppError(401, error.message);
    }
  }