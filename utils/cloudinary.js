import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

try {
  const name = process.env.CLOUDINARY_NAME;
  const key = process.env.CLOUDINARY_KEY;
  const secret = process.env.CLOUDINARY_SECRET;

  cloudinary.config({
    cloud_name: name,
    api_key: key,
    api_secret: secret,
  });
} catch (error) {
  console.error("Error configuring Cloudinary:", error);
  throw error;
}

export default cloudinary;
