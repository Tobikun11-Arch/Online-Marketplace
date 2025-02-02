import { addInterceptors } from "../axios-instance/AxiosInstance";
import axios, { AxiosInstance  } from 'axios'

export const add_product: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ADD_PRODUCTS,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})


export const draft_product: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DRAFT_PRODUCTS,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})


export const seller_products: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/users/get/product',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

export const orders_products: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/users/get/orders',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

export const update_products: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/users/put/product',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})


export const update_draftProducts: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/users/put/draftproduct',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})


export const delete_product: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/users/delete/product',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})


export const Draft_Publish: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/users/post/newpublish',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})



//Add the axios instance here
addInterceptors(add_product)
addInterceptors(draft_product)
addInterceptors(seller_products)
addInterceptors(update_products)
addInterceptors(update_draftProducts)
addInterceptors(Draft_Publish) //snake case
addInterceptors(delete_product)
addInterceptors(orders_products)