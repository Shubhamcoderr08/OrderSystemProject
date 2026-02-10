import { v2 as cloudinary } from "cloudinary";
import fs from "fs"


 cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


export const uploadOnCloudinary = async (localFilePath) => {
  try {
    const response = await cloudinary.uploader.upload(
      localFilePath,
      {
        folder: "ProductImages",
        resource_type: "image"
      }
    );

    // local file delete after upload of image on Cloudinary
    fs.unlinkSync(localFilePath);
    return response;
  } 
  
  catch (error) {
    // remove the locally saved temporary file as the upload operation got failed
    fs.unlinkSync(localFilePath);
    return null;
  }
};
