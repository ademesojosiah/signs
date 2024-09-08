import "express-async-errors";
import { User, UserInput } from "../model/user.model";
import * as bcrypt from "bcryptjs";
import db from "../model/index.model"
import { AppError } from "../utils/error/appError";
import { Request } from "express";
import { Optional } from "sequelize";




export interface IloginInput
  extends Optional<
    UserInput,
    "fullname" | "role"
  > {}
export interface IforgetInput extends Optional<IloginInput, "password"> {}
export interface IresetInput extends Optional<IloginInput, "email"> {}

const createUserService = async (
    payload: UserInput,
    req: Request
  ): Promise<any> => {
    const realPayload: UserInput = {
      fullname: payload.fullname,
      email: payload.email.toLowerCase(),
      password: await bcrypt.hash(payload.password, 10),
      role: payload.role,
    };
  
    //CHECK IF USER EXISTS
    const existingUser: User | null = await db.User.findOne({
      where: { email: realPayload.email },
    });
  
    if (existingUser) throw new AppError(401, "User already exists");
  
    //VERIFY USER
    realPayload.is_verified = false;
  
    // CREATE NEW USER
    const user: User = await db.User.create(realPayload);
    const sessionToken = await user.createJwt();
  
    // const { token, tokenExpires } = await createAndSaveToken(user.id);
  
    // const url: string = `${req.protocol}://${req.get(
    //   "host"
    // )}/api/v1/auth/verify/${token}`;
  
    // // SEND SUCCESS MAIL TO CLIENT
    // await new Email(user, url).sendWelcome();
  
    const responseData = {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      userRole: user.role,
    };
  
    return { responseData, token: sessionToken };
  };


  const loginUserService = async (payload: IloginInput): Promise<any> => {
    //CHECK IF USER EXISTS
    const user: User | null = await db.User.findOne({
      where: { email: payload.email.toLowerCase() },
    });
  
    if (!user) throw new AppError(401, "User does not exist, Please sign up");
  
    //COMPARE PASSWORD
    if (!(await user.comparePassword(payload.password))) {
      throw new AppError(401, "password is incorrect, Please try again");
    }
  
    //CREATE AUTHENTICATION TOKEN
    const token = await user.createJwt();
    const response = {
      data: {
        id: user.id,
        fullname: user.fullname,
        userRole: user.role
      },
      token: token,
    };
  
    return response;
  };

  
  const getDashboard = async (userId:number): Promise<any> => {
    //CHECK IF USER EXISTS
    const user: User | null = await db.User.findOne({
      where: { id: userId },
    });
  
    if (!user) throw new AppError(401, "User does not exist, Please sign up");
  
  
    const response = {
      data: {
        fullname: user.fullname,
        userRole: user.role
      },
    };
  
    return response;
  };


  const userService = {
    createUserService,
    loginUserService,
    getDashboard
  }
export default userService;