import "express-async-errors";
import db from "../model/index.model";
import { SignsAttributes } from "../model/sign.model";
import videoService from "./video.service";
import textServices from "./text.service";
import { Video } from "../model/video.model";
import textVideoService from "./textVideo.service";


const createSignsService = async (payload: SignsAttributes): Promise<any> => {

  //save text to database
  let text : any  = await textServices.createTextService({text: payload.text, userId: payload.userId});  

  const video : Video = await videoService.createVideoService({videoUrl : payload.videoUrl,userId: payload.userId});

  const response = await textVideoService.createTextVideoService({textId: text.id,userId: payload.userId , videoId: video.id})
  return response;
};

const getAllSignsService = async(): Promise<{text:string, videoUrls : string[] }[]> => {
  const texts: any = await textServices.getAllTextService();
  return texts;

}

const signsService = { createSignsService, getAllSignsService };

export default signsService;
