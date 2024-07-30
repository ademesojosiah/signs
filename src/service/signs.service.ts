import "express-async-errors";
import db from "../model/index.model";
import { Signs, SignsInput } from "../model/signs.model";




const createSignsService = async (
    payload: SignsInput
  ): Promise<any> => {    
  
    const signs: Signs = await db.Signs.create(payload);

  
    const response = {
        text: signs.text,
        videoUrl: signs.videoUrl
    };
  
    return response;
  };


  const getAllSignsService = async(): Promise<any> => {
    const signs: Signs[] = await db.Signs.findAll();

  
    return signs.map(sign => {
      return {
        text: sign.text,
        videoUrl: sign.videoUrl
      }
    });

  }


const contactUsService = {createSignsService, getAllSignsService};

export default contactUsService;
