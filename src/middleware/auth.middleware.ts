import { AppError } from "../utils/error/appError";
import { NextFunction, Request, Response } from "express";
import "express-async-errors";
import jwt, { JwtPayload } from "jsonwebtoken";
import db from "../model/index.model";

const secret = process.env.JWT_SECRET as string;

interface IPayload {
  userId: number;
  userEmail: string;
  iat: number;
  exp: number;
}

const authorize = async (req: Request, res: Response, next:NextFunction): Promise<any> => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    throw new AppError( 401,"Unauthorized");
  const payload: IPayload = jwt.verify(token, secret) as IPayload;

  const user = await db.User.findOne({
    where: { id: payload.userId, email: payload.userEmail },
  });
  if (!user) throw new AppError(401,"UnAuthorized" );

  req.user = user;
  next()
};

export default authorize;
