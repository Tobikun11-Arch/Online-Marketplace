import axios from 'axios'

export const userData = axios.create({
    baseURL: process.env.NEXT_PUBLIC_MAINSHOP || 'http://localhost:5000/api/users/SellerProductlist'
})