export enum HttpCode {
    OK = 200,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    FORBIDDEN_ERROR = 403,
    INTERNAL_SERVER_ERROR = 500,
    }


 export class AppError extends Error{
    public readonly status: boolean;
    public readonly httpCode: HttpCode;
    public readonly message: string;
    public readonly isOperational: boolean = true;


    constructor(statusCode:HttpCode, message:string,status:boolean = false, isOperational:boolean = true){
        super(message)

        this.message = message;
        this.status = status;
        this.httpCode = statusCode;
        if (isOperational !== undefined) {
            this.isOperational = isOperational;
          }
      
          Error.captureStackTrace(this);
    }
}