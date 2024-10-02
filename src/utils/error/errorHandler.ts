import { Response } from "express";
import { AppError, HttpCode } from "./appError";

class ErrorHandler {
  private isTrustedError(error: Error): boolean {
    if (error instanceof AppError) {
      return error.isOperational;
    }

    return false;
  }

  public handleError(error: Error | AppError, response?: Response): void {
    if (this.isTrustedError(error) && response) {
      this.handleTrustedError(error as AppError, response);
    } else {
      this.handleCriticalError(error, response);
    }
  }

  public handleTrustedError(error: AppError, response: Response): void {
    response
      .status(error.httpCode)
      .json({ status: error.status, message: error.message });

      console.error(error.message);
  }

  public handleCriticalError(error: Error | AppError, response?: Response): void {

    if(response){
        response
          .status(HttpCode.INTERNAL_SERVER_ERROR)
          .json({ status: false, message: "internal server error" });
        
    }

      console.error('Application encountered a critical error. Exiting');
      console.error(error.message)
  }
}


export const errorHandler: ErrorHandler = new ErrorHandler();
