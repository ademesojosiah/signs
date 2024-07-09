import express, { Express, Request,Response, Application } from "express";
import "dotenv/config"

const app : Application = express();

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log("server listening to http://localhost:"+PORT)
})