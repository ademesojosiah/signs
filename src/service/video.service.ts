import "express-async-errors";
import db from "../model/index.model";
import { Text } from "../model/text.model";
import { Video, VideoInput } from "../model/video.model";
import textServices from "./text.service";
import { AppError } from "../utils/error/appError";
import ratingService from "./rating.service";

const createVideoService = async (payload: VideoInput): Promise<Video> => { 

    if(payload.textId){
        textServices.findTextService(payload.textId as number)
    }
  const video: Video = await db.Video.create(payload);
  return video;
};

const getAllVideoService = async (): Promise<any[]> => {
  const videos: Video[] = await db.Video.findAll({
    include:[
    {model: Text, as: "childText", attributes:["id","text"]},
    {model: Text, as: "childText", attributes:["id","text"]}
  ]});

  const processedVideos = await Promise.all(
    videos.map(async (video: any) => {
      const texts = video.parentVideo ? [...video.childText, video.parentText] : [...video.childText];
  
      // Fetch ratings and build the final result in one loop
      const newTexts = await Promise.all(
        texts.map(async (text) => {
          const rating = await ratingService.getRating(text.id, video.id);
          return {
            id: text.id,
            text: text.text,
            rating: rating
          };
        })
      );
  
      return {
        id: video.id,
        videoUrl: video.videoUrl,
        texts: newTexts
      };
    })
  );
  
  return processedVideos;
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
