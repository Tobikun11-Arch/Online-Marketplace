import axios from 'axios'

export const userData = axios.create({
    baseURL: 'http://localhost:5000/api/users/SellerProductlist'  //deployment: process.env.NEXT_PUBLIC_MAINSHOP
})