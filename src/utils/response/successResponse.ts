import { Request, Response } from 'express';
import { HttpCode } from '../error/appError';

class SuccessResponse {
  constructor(
    public readonly statusCode: HttpCode,
    public readonly message: string,
    public readonly data: Object | null
  ) {}

  send(res: Response): Response {

    if(this.data !== null){
        
        return res.status(this.statusCode).json({ status: true, message: this.message, data: this.data });
    }

    return res.status(this.statusCode).json({ status: true, message: this.message});

  }
}

const sendSuccessResponse = (
  res: Response,
  statusCode: HttpCode,
  message: string,
  data: Object| null 
): Response => {
  const response = new SuccessResponse(statusCode, message, data);
  return response.send(res);
};

export { HttpCode, sendSuccessResponse };
