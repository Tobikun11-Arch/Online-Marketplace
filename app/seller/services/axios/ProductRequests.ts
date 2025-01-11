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

//Add the axios instance here
addInterceptors(add_product)
addInterceptors(draft_product)