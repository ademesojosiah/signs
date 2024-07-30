import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import { unlinkSync } from "fs";

class Cloudinary {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(imageToUpload: string) {
    try {
      const cloudinaryImageUploadResponseData =
        await cloudinary.uploader.upload(imageToUpload, {
          public_id: "siwesProject",
        });

      const { secure_url: url } = cloudinaryImageUploadResponseData;

      if (!url) {
        unlinkSync(imageToUpload);
        return {
          isSuccess: false,
          message:
            "Couldn't upload your image at the moment. Please try again later.",
          statusCode: 400,
        };
      }

      unlinkSync(imageToUpload);
      return {
        isSuccess: true,
        message: "Successfully uploaded image.",
        statusCode: 200,
        imageURL: url,
      };
    } catch (error) {
      unlinkSync(imageToUpload);
      return {
        isSuccess: false,
        message: "Internal Server Error",
        statusCode: 500,
      };
    }
  }
  async uploadVideos(imageToUpload: string) {
    try {


      const desiredFormat = 'mp4'; // Change to the .mov format
      const fps = 30; // Set the desired frames per second
      // Upload the video to Cloudinary
      const result = await cloudinary.uploader.upload(imageToUpload, {
        resource_type: 'video',
        format: desiredFormat ,
        folder:'signs/videos',
        transformation:[{fps}]
      });

      const { secure_url: url } = result;

      // File was uploaded successfully
      if (!url) {
        unlinkSync(imageToUpload);
        return {
          isSuccess: false,
          message:
            "Couldn't upload your video at the moment. Please try again later.",
          statusCode: 400,
        };
      }

      unlinkSync(imageToUpload);
      return {
        isSuccess: true,
        message: "Successfully uploaded video.",
        statusCode: 200,
        imageURL: url,
      };
    } catch (error) {
      unlinkSync(imageToUpload);
      return {
        isSuccess: false,
        message: "Internal Server Error",
        statusCode: 500,
      };
    }
  }
}

const cloud = new Cloudinary();

export default cloud;
