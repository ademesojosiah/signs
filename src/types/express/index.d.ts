import express from "express";
import { UserInput } from "../../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    user: UserInput;
  }
}
