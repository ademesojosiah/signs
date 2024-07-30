import "express-async-errors"
import { NextFunction, Request, Response } from "express";
import cloud from "../cloudinary/cloudinary";

export const saveImage = async (req: Request, res: Response, next :NextFunction): Promise<void> => {
    const documentFiles  = req.file;
    let url:string | undefined ;
    if(documentFiles){
        const result  = await cloud.uploadImage(documentFiles.path);
        url = result.imageURL;

    }

    req.body = {...req.body,verificationUpload:url };
    next();
};

export const saveVideo = async (req: Request, res: Response, next :NextFunction): Promise<any> => {


    // Assuming video file is sent as 'video' in multipart/form-data
    if (!req.file || req.file.fieldname !== 'video') {
        return res.status(400).json({ message: 'No video file uploaded' });
      }

    // Upload the video to Cloudinary
    const documentFiles  = req.file;

    let url:string | undefined ;
    if(documentFiles){
        const result  = await cloud.uploadVideos(documentFiles.path);
        url = result.imageURL;

    }

    req.body = {...req.body,videoUrl:url };
    next();
};
