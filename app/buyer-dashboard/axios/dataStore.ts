import axios from 'axios'

const productUrl = process.env.NEXT_PUBLIC_PRODUCT //deployment url
const localproductUrl = 'http://localhost:5000/api/users/SellerProductlist' //localhost url

export const MainShop = axios.create({
    baseURL: productUrl  
})

export const AllProducts = axios.create({
    baseURL: productUrl 
})