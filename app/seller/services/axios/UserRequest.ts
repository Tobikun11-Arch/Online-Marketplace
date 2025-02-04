import { addInterceptors } from "../axios-instance/AxiosInstance";
import axios, { AxiosInstance  } from 'axios'

export const data_seller: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/users/sellerdata',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})



addInterceptors(data_seller)