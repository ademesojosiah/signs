import express, { Express, Request,Response, Application } from "express";
import "./utils/error/unHandledError";
import "dotenv/config";
import { errorMiddleware } from "./middleware/errorMiddleware";

const app : Application = express();

const PORT = process.env.PORT


app.use(errorMiddleware);

app.listen(PORT, async()=>{
    console.log("server listening to http://localhost:"+PORT);

})