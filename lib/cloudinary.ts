import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // Replace with your Cloudinary Cloud Name
  api_key: process.env.CLOUDINARY_API_KEY, // Replace with your Cloudinary API Key
  api_secret: process.env.CLOUDINARY_SECRET, // Replace with your Cloudinary API Secret
});

export default cloudinary;