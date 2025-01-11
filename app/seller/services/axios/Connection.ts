import axios from 'axios'

const cloudinary_Connection = process.env.NEXT_PUBLIC_CLOUDINARY;
export const CloudinaryConnection = axios.create({
  baseURL: cloudinary_Connection
});