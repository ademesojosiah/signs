import "express-async-errors";
import db from "../model/index.model";
import { Text, TextInput } from "../model/text.model";
import { Video } from "../model/video.model";
import { AppError } from "../utils/error/appError";
import videoService from "./video.service";
import ratingService from "./rating.service";
import { TextVideo } from "../model/textVideo.model";
import textVideoService from "./textVideo.service";

const createTextService = async (payload: TextInput): Promise<Text> => {
  payload.text = payload.text;

  const oldText: Text | null = await db.Text.findOne({
    where: { text: payload.text !==null ? payload.text.trim(): payload.text },
  });


  if (oldText) {

    if(payload.videoId){
      let textVideo: TextVideo| null =  await textVideoService.findTextVideoService(oldText.id,payload.videoId as number)
      if (textVideo){
        return oldText
      }
      await textVideoService.createTextVideoService({textId:oldText.id, userId: payload.userId,videoId:payload.videoId})
    }

    return oldText;
  }

  const text: Text = await db.Text.create({text : payload.text,userId: payload.userId});
  if(payload.videoId){
    await videoService.findVideoService(payload.videoId as number)
    const response = textVideoService.createTextVideoService({textId:text.id, userId: payload.userId,videoId:payload.videoId})
    return response;
 }
  return text;
};

const getAllTextService = async (): Promise<any[]> => {
  const texts: Text[] = await db.Text.findAll({attributes:["id","text","createdAt","updatedAt"],
    include: [
      {
         model: TextVideo, 
         as: "textVideos", 
         attributes:["id","videoId"],
         include:[ 
          { 
            model: Video , 
            as: 'video' ,
            attributes:["id","videoUrl"]}] },
    ]
  });
  
  const processedTexts = await Promise.all(
    texts.map(async (text: any) => {
      const videoUrls = [...text.textVideos];
  
      // Fetch ratings and build the final result in one loop
      const newVideoUrls = await Promise.all(
        videoUrls.map(async (video) => {
          const rating = await ratingService.getRating(text.id, video.videoId);
          return {
            id: video.id,
            videoUrl: video.video.videoUrl,
            rating: rating
          };
        })
      );
  
      return {
        id: text.id,
        text: text.text,
        videoUrls: newVideoUrls
      };
    })
  );
  
  return processedTexts;
}  

const getAllMyTextService = async (userId:number): Promise<any[]> => {
  const texts: Text[] = await db.Text.findAll({where:{userId: userId}, attributes:["id","text","createdAt","updatedAt"],
    include: [
      {
         model: TextVideo,
         as: "textVideos", 
         attributes:["id","videoId"],
         include:[ 
          { 
            model: Video , 
            as: 'video' ,
            attributes:["id","videoUrl"]}] },
    ]
  });
  
  const processedTexts = await Promise.all(
    texts.map(async (text: any) => {
      const videoUrls = [...text.textVideos];
  
      // Fetch ratings and build the final result in one loop
      const newVideoUrls = await Promise.all(
        videoUrls.map(async (video) => {
          const rating = await ratingService.getRating(text.id, video.videoId);
          return {
            id: video.id,
            videoUrl: video.video.videoUrl,
            rating: rating
          };
        })
      );
  
      return {
        id: text.id,
        text: text.text,
        videoUrls: newVideoUrls
      };
    })
  );
  
  return processedTexts;
}  

const findOneTextService = async (textId:number): Promise<any[]> => {
  const texts: Text[] = await db.Text.findAll({where:{id:textId}, attributes:["id","text","createdAt","updatedAt"],
    include: [
      {
         model: TextVideo, 
         as: "textVideos", 
         attributes:["id","videoId"],
         include:[ 
          { 
            model: Video , 
            as: 'video' ,
            attributes:["id","videoUrl"]}] },
    ]
  });
  
  const processedTexts = await Promise.all(
    texts.map(async (text: any) => {
      const videoUrls = [...text.textVideos];
  
      // Fetch ratings and build the final result in one loop
      const newVideoUrls = await Promise.all(
        videoUrls.map(async (video) => {
          const rating = await ratingService.getRating(text.id, video.videoId);
          return {
            id: video.id,
            videoUrl: video.video.videoUrl,
            rating: rating
          };
        })
      );
  
      return {
        id: text.id,
        text: text.text,
        videoUrls: newVideoUrls
      };
    })
  );
  
  return processedTexts;
}  

const findTextService = async (textId: number): Promise<Text> => {
    const text: Text|null = await db.Text.findByPk(textId);
  
    if(!text){
        throw new AppError(401,`text with ${textId} does not exist`)
    }
    return text;
  };

const textServices = { createTextService, getAllTextService , findTextService, getAllMyTextService,findOneTextService};

export default textServices;
