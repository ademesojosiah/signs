import express, { Express, Request,Response, Application, json } from "express";
import "./utils/error/unHandledError";
import "dotenv/config";
import db from "./model/index.model";
import { errorMiddleware } from "./middleware/errorMiddleware";
import authRouter from "./route/auth.route";
import contactRouter from "./route/contact.route";
import signRouter from "./route/sign.route";
import textRouter from "./route/text.router";
import videoRouter from "./route/video.route";
import ratingRouter from "./route/rating.route";
import dashboardRouter from "./route/dashboard.route";
import { sendSuccessResponse } from "./utils/response/successResponse";
import { AppError } from "./utils/error/appError";
import cors from 'cors';
import authorize from "./middleware/auth.middleware";

const app : Application = express();

const PORT = process.env.PORT

import fs from 'fs';
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:5173", "https://sign-translation-app-frontend.vercel.app","https://sign-translation-app-dashboard.vercel.app","https://sign-translation-app.onrender.com", "https://sign-translation-app-dashboard.onrender.com"], // Allow all origins
    methods: 'GET,PUT,PATCH,POST,DELETE', // Allowed methods
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization' // Allowed headers
  };

app.use(cors(corsOptions));
app.use(json())
app.use(express.urlencoded({extended:false}))

app.get("",(req:Request,res:Response)=>{
    sendSuccessResponse(res,200,"Welcome to signs",null);
})

app.use("/auth",authRouter);
app.use("/contact",contactRouter);
app.use("/sign",authorize ,signRouter);
app.use("/text",authorize,textRouter);
app.use("/video",authorize,videoRouter);
app.use("/rate", authorize,ratingRouter);
app.use("/dashboard", authorize,dashboardRouter);


app.use("*",(req:Request,res:Response)=>{
    throw new AppError(401,"page not found");
})
app.use(errorMiddleware);

app.listen(PORT, async()=>{
    console.log("server listening to http://localhost:"+PORT);
    await db.sequelize.sync({ alter:true});
	console.log("database connected succesfully");
})