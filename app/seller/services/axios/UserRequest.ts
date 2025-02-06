import { addInterceptors } from "../axios-instance/AxiosInstance";
import axios, { AxiosInstance  } from 'axios'

export const data_seller: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DATA_SELLER,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

export const update_seller: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_UPDATE_SELLER,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})




addInterceptors(data_seller)
addInterceptors(update_seller)