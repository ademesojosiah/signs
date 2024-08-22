import "express-async-errors";
import db from "../model/index.model";
import { Text } from "../model/text.model";
import { Video, VideoInput } from "../model/video.model";
import textServices from "./text.service";
import { AppError } from "../utils/error/appError";
import ratingService from "./rating.service";
import textVideoService from "./textVideo.service";
import { TextVideo } from "../model/textVideo.model";

const createVideoService = async (payload: VideoInput): Promise<Video> => { 

  const video: Video = await db.Video.create({videoUrl : payload.videoUrl,userId: payload.userId});


  if(payload.textId){
    await textServices.findTextService(payload.textId as number)
    const response = textVideoService.createTextVideoService({textId:payload.textId, userId: payload.userId,videoId:video.id})
    return response;
 }
  return video;
};

const getAllVideoService = async (): Promise<any[]> => {
  const videos: Video[] = await db.Video.findAll({
    include:[
      {
         model: TextVideo, 
         as: "textVideos", 
         attributes:["id","textId"],
         include:[ 
          { 
            model: Text , 
            as: 'text' ,
            attributes:["id","text"]}] },
    ]});


    const processedTexts = await Promise.all(
      videos.map(async (video: any) => {
        const texts = [...video.textVideos];
    
        // Fetch ratings and build the final result in one loop
        const newTexts = await Promise.all(
          texts.map(async (text) => {
            const rating = await ratingService.getRating(text.textId, video.id);
            return {
              id: text.id,
              text: text.text.text,
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
    
    return processedTexts;
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
