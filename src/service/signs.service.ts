import "express-async-errors";
import db from "../model/index.model";
import { SignsAttributes } from "../model/sign.model";
import videoService from "./video.service";
import textServices from "./text.service";
import { Video } from "../model/video.model";


const createSignsService = async (payload: SignsAttributes): Promise<any> => {

  //save text to database
  let text : any  = await textServices.createTextService({text: payload.text, userId: payload.userId});  

  const video : Video = await videoService.createVideoService({videoUrl : payload.videoUrl,userId: payload.userId, textId:text.id});

  text = await db.Text.findByPk(text.id, {
    include: { model: Video, as: 'childVideos' ,attributes:["videoUrl"]}
  });

  const response = {
    text: text.text,
    videoUrls: text.childVideos,
  };

  return response;
};

const getAllSignsService = async(): Promise<{text:string, videoUrls : string[] }[]> => {
  const texts: any = await textServices.getAllTextService();
  return texts;

}

const signsService = { createSignsService, getAllSignsService };

export default signsService;
