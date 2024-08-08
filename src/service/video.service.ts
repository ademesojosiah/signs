import "express-async-errors";
import db from "../model/index.model";
import { Text } from "../model/text.model";
import { Video, VideoInput } from "../model/video.model";

const createVideoService = async (payload: VideoInput): Promise<Video> => { 
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

const videoService = { createVideoService, getAllVideoService };

export default videoService;
