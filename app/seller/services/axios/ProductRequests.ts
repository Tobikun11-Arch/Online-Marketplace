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
    baseURL: process.env.NEXT_PUBLIC_SELLER_PRODUCTS,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

export const orders_products: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ORDER_PRODUCTS,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

export const update_products: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_UPDATE_PRODUCTS,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})


export const update_draftProducts: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_UPDATE_DRAFT_PRODUCTS,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

export const delete_product: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DELETE_PRODUCT_SELLER,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

export const Draft_Publish: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DRAFT_PUBLISH,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

export const user_sales: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_USER_SALES,
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
addInterceptors(user_sales)