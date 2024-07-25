import express, { Express, Request,Response, Application, json } from "express";
import "./utils/error/unHandledError";
import "dotenv/config";
import db from "./model/index.model"
import { errorMiddleware } from "./middleware/errorMiddleware";
import authRouter from "./route/auth.route"
import contactRouter from "./route/contact.route"
import { sendSuccessResponse } from "./utils/response/successResponse";
import { AppError } from "./utils/error/appError";

const app : Application = express();

const PORT = process.env.PORT

app.use(json())

app.get("",(req:Request,res:Response)=>{
    sendSuccessResponse(res,200,"Welcome to signs",null);
})

app.use("/auth",authRouter);
app.use("/contact",contactRouter);


app.use("*",(req:Request,res:Response)=>{
    throw new AppError(401,"page not found");
})
app.use(errorMiddleware);

app.listen(PORT, async()=>{
    console.log("server listening to http://localhost:"+PORT);
    await db.sequelize.sync({ alter:true});
	console.log("database connected succesfully");
})