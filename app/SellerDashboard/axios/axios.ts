import axios from "axios";

// Cloudinary connection
const cloudinary_Connection = process.env.NEXT_PUBLIC_CLOUDINARY;
export const Cloudinary = axios.create({
  baseURL: cloudinary_Connection
});

// Product API
const productApi = process.env.NEXT_PUBLIC_PRODUCTS;
if (!productApi) {
  throw new Error('Product API is not set'); 
}
export const ProductApi = axios.create({
  baseURL: productApi,
  headers: {
    'Content-Type': 'application/json',
  },
});
ProductApi.defaults.withCredentials = true; // Enable credentials for ProductApi

// Get the product list
const productList_api = process.env.NEXT_PUBLIC_PRODUCT_LIST;
if (!productList_api) {
  throw new Error('Product list API is not set'); 
}
export const productList = axios.create({
  baseURL: productList_api,
});
productList.defaults.withCredentials = true; // Enable credentials for productList

// Remove background API
const Remove_Api = process.env.NEXT_PUBLIC_REMOVEBG;
export const Remove_Bg = axios.create({
  baseURL: Remove_Api
});

// Delete product API
const ProductDelete = process.env.NEXT_PUBLIC_PRODUCTS_DELETE;
export const Delete_Product = axios.create({
  baseURL: ProductDelete
});

// Register user API
const registerUser = process.env.NEXT_PUBLIC_REGISTER;
export const newRegister = axios.create({
  baseURL: registerUser,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login user API
const loginUser = process.env.NEXT_PUBLIC_LOGIN;
export const userLog = axios.create({
  baseURL: loginUser,
  headers: {
    'Content-Type': 'application/json',
  },
});
userLog.defaults.withCredentials = true; // Enable credentials for userLog

// Authentication API
const authentication = process.env.NEXT_PUBLIC_Authentication; 
export const auth = axios.create({
  baseURL: authentication,
  headers: {
    'Content-Type': 'application/json',
  },
});
auth.defaults.withCredentials = true; // Enable credentials for auth

// Refresh authentication API
const AuthenticationRefresh = process.env.NEXT_PUBLIC_AuthenticationRefresh; 
export const refresh = axios.create({
  baseURL: AuthenticationRefresh,
  headers: {
    'Content-Type': 'application/json',
  },
});
refresh.defaults.withCredentials = true; // Enable credentials for refresh

const SignoutApi = process.env.NEXT_PUBLIC_SIGNOUT; 
export const Signout = axios.create({
  baseURL: SignoutApi,
  headers: {
    'Content-Type': 'application/json',
  },
});
Signout.defaults.withCredentials = true;

export const CheckUser = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CHECKUSER,
  headers: {
    'Content-Type': 'application/json',
  },
});
CheckUser.defaults.withCredentials = true;