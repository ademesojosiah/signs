import "express-async-errors";
import db from "../model/index.model";
import { Text } from "../model/text.model";
import { Video, VideoInput } from "../model/video.model";
import textServices from "./text.service";
import { AppError } from "../utils/error/appError";

const createVideoService = async (payload: VideoInput): Promise<Video> => { 

    if(payload.textId){
        textServices.findTextService(payload.textId as number)
    }
  const video: Video = await db.Video.create(payload);
  return video;
};

const getAllVideoService = async (): Promise<Video[]> => {
  const videos: any = await db.Video.findAll({include:{model: Text, as: "childText", attributes:["text"]}});

  return videos.map((video:any)=>{
    return{
        videoUrl : video.videoUrl,
        texts: video.childText
    }
  });
};

const findVideoService = async (videoId: number): Promise<Video> => {
    const video: Video|null = await db.Video.findByPk(videoId);
  
    if(!video){
        throw new AppError(401,`text with ${videoId} does not exist`)
    }
    return video;
  };

const videoService = { createVideoService, getAllVideoService ,findVideoService};

export default videoService;
