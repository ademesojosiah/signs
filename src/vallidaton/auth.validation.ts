import "express-async-errors";
import Joi from "joi";
import { UserInput } from "../model/user.model";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/error/appError";
import { ContactUsInput } from "../model/contactUs.model";

export async function signUpValidator(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const signup: UserInput = req.body;
  const schema = Joi.object({
    fullname: Joi.string().required(),
    password: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),


    email: Joi.string().email().required(),

    role: Joi.string().required().valid("USER", "ADMIN"),
  });
  try {
    await schema.validateAsync(signup);
    next();
  } catch (error: any) {
    throw new AppError(401, error.message);
  }
}

export async function loginValidator(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const login: { email: string; password: string } = req.body;
  const schema = Joi.object({
    password: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

    email: Joi.string().email().required(),
  });

  try {
    await schema.validateAsync(login);
    next();
  } catch (error: any) {
    throw new AppError(401, error.message);
  }
}

export async function forgetInputValidator(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const login = req.body;
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  try {
    await schema.validateAsync(login);
    next();
  } catch (error: any) {
    throw new AppError(401, error.message);
  }
}

export async function resetInputValidator(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const login = req.body;
  const schema = Joi.object({
    password: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });

  try {
    await schema.validateAsync(login);
    next();
  } catch (error: any) {
    throw new AppError(401, error.message);
  }
}


export async function ContactUsValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const signup: ContactUsInput = req.body;
    const schema = Joi.object({  
      email: Joi.string().email().required(),
  
      description: Joi.string().required()
    });
    try {
      await schema.validateAsync(signup);
      next();
    } catch (error: any) {
      throw new AppError(401, error.message);
    }
  }
