import { errorHandler } from "./errorHandler";
import process from "process";

process.on("unhandledRejection", (error: Error | any) => {
  console.log(`Unhandled Rejection: ${error.message || error}`);

  throw new Error(error.message || error);
});

process.on("uncaughtException", (error: Error) => {
  console.log(`Uncaught Exception: ${error}`);

  errorHandler.handleError(error);
});
