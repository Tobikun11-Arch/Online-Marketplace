import axios from 'axios'

export const userData = axios.create({
    baseURL: process.env.NEXT_PUBLIC_MAINSHOP  //deployment: process.env.NEXT_PUBLIC_MAINSHOP
})

export const AllProducts = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ALLPRODUCTS  //deployment: process.env.NEXT_PUBLIC_ALLPRODUCTS
})