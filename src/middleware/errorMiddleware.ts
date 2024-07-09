import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/error/errorHandler";


export const errorMiddleware = (err: Error, req:Request, res:Response, next : NextFunction):void => {

    errorHandler.handleError(err,res);
}