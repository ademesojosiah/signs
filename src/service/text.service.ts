import "express-async-errors";
import db from "../model/index.model";
import { Text, TextInput } from "../model/text.model";
import { Video } from "../model/video.model";
import { AppError } from "../utils/error/appError";
import videoService from "./video.service";
import ratingService from "./rating.service";

const createTextService = async (payload: TextInput): Promise<Text> => {
  payload.text = payload.text;

  const oldText: Text | null = await db.Text.findOne({
    where: { text: payload.text !==null ? payload.text.trim(): payload.text },
  });

  if(payload.videoId){
    videoService.findVideoService(payload.videoId as number)
}

  if (oldText) {
    throw new AppError(401, "text exist in the database");
  }
  const text: Text = await db.Text.create(payload);
  return text;
};

const getAllTextService = async (): Promise<any[]> => {
  const texts: Text[] = await db.Text.findAll({
    include: [
      { model: Video, as: "childVideos", attributes: ["id", "videoUrl"] },
      { model: Video, as: "parentVideo", attributes: ["id", "videoUrl"] }
    ]
  });
  
  const processedTexts = await Promise.all(
    texts.map(async (text: any) => {
      const videoUrls = text.parentVideo ? [...text.childVideos, text.parentVideo] : [...text.childVideos];
  
      // Fetch ratings and build the final result in one loop
      const newVideoUrls = await Promise.all(
        videoUrls.map(async (video) => {
          const rating = await ratingService.getRating(text.id, video.id);
          return {
            id: video.id,
            videoUrl: video.videoUrl,
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

const textServices = { createTextService, getAllTextService , findTextService};

export default textServices;
