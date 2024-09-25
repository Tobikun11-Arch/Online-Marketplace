import axios from "axios";


//get cloudname and post
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
if (!cloudName) {  
    throw new Error('Cloudinary cloud name is not set');  
}
const cloud = process.env.NEXT_PUBLIC_CLOUDINARY;
const cloudinary_Connection =`${cloud}${cloudName}`

export const Cloudinary = axios.create({
  baseURL: cloudinary_Connection
})

//post product api
const productApi = process.env.NEXT_PUBLIC_PRODUCTS;
if(!productApi) {
    throw new Error('product api is not set'); 
  }

export const ProductApi = axios.create({
    baseURL: productApi
})

//Get the product list
const productList_api = process.env.NEXT_PUBLIC_PRODUCT_LIST;
if(!productList_api) {
    throw new Error('product list is not set'); 
}

export const productList = axios.create({
    baseURL: productList_api
})