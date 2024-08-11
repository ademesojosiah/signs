
import "express-async-errors";
import db from "../model/index.model";
import videoService from "./video.service";
import textServices from "./text.service";
import { Video } from "../model/video.model";
import { Rating, RatingAttributes, RatingInput } from "../model/rating.model";


const createRatingService = async (payload: RatingAttributes): Promise<any> => {

  //save text to database
  const text : any  = await textServices.findTextService(payload.textId);  

  const video : Video = await videoService.findVideoService(payload.videoId);

  const body : RatingInput = {userId: payload.userId, textId: payload.textId, videoId: payload.videoId, ratingNo: payload.ratingNo}


  const rating : Rating = await db.Rating.create(body);
  return rating;
  
};


async function getRating(textId:number,videoId:number ){
	// CHECK IF ACTIVITIES HAS BEEN PERFORMED PREVIOUSLY
	const allRated = await db.Rating.findAll({where:{
		textId: textId,
        videoId: videoId
	}})

	if(allRated.length <= 0){
		return  0;
	}

	let sum = 0;
    
	allRated.forEach(rate=>{
		sum += rate.ratingNo * 20
	})

	const rating = sum / allRated.length

	return `${rating}%`
}


const ratingService = { createRatingService, getRating };

export default ratingService;