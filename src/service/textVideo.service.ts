import "express-async-errors";
import db from "../model/index.model";
import { Video } from "../model/video.model";
import { TextVideo, TextVideoAttributes, TextVideoInput } from "../model/textVideo.model";
import { Text } from "../model/text.model";


const createTextVideoService = async (payload: TextVideoInput): Promise<any> => {

   let body: TextVideoInput = {textId:payload.textId, userId: payload.userId,videoId:payload.videoId}

  //save text to database
  let textVideo : any  = await db.TextVideo.create(body);  


  textVideo = await db.TextVideo.findByPk(textVideo.id, {
    include: [{model: Video, as: 'video' ,attributes:["videoUrl"]}, { model:Text , as: 'text' ,attributes:["text"]} ]
  });

  const response = {
    text: textVideo.text,
    video: textVideo.video,
  };

  return response;
};

const findTextVideoService = async (textId: number, videoId: number): Promise<TextVideo | null> => {
    const textVideo: TextVideo|null = await db.TextVideo.findOne({where:{
        textId: textId,
        videoId: videoId
    }});

    return textVideo;
  };


const  textVideoService = { createTextVideoService ,findTextVideoService};

export default textVideoService;
