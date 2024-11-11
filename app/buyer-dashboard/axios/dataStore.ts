import axios from 'axios'

export const MainShop = axios.create({
    baseURL: 'http://localhost:5000/api/users/SellerProductlist'  //deployment: process.env.NEXT_PUBLIC_MAINSHOP
})

export const AllProducts = axios.create({
    baseURL: 'http://localhost:5000/api/users/SellerProductlist'  //deployment: process.env.NEXT_PUBLIC_ALLPRODUCTS
})