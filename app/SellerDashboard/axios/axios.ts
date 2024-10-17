import axios from "axios";

const cloudinary_Connection = process.env.NEXT_PUBLIC_CLOUDINARY;
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
    baseURL: productList_api,
})


const Remove_Api = process.env.NEXT_PUBLIC_REMOVEBG
export const Remove_Bg = axios.create({
  baseURL: Remove_Api
})

const ProductDelete = process.env.NEXT_PUBLIC_PRODUCTS_DELETE;
export const Delete_Product = axios.create({
  baseURL: ProductDelete
})

const registerUser = process.env.NEXT_PUBLIC_REGISTER;
export const newRegister = axios.create({
  baseURL: registerUser,
  headers: {
    'Content-Type': 'application/json',
  }
})

const loginUser = process.env.NEXT_PUBLIC_LOGIN;
export const userLog = axios.create({
  baseURL: loginUser,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})