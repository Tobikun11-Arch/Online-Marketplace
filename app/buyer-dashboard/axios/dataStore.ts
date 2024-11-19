import axios from 'axios'

const productUrl = process.env.NEXT_PUBLIC_PRODUCT  //deployment url
const localproductUrl = 'http://localhost:5000/api/users/SellerProductlist' //localhost url

export const MainShop = axios.create({
    baseURL: localproductUrl,
    headers: {
        "Content-Type": "application/type",
    },
})

export const AllProducts = axios.create({
    baseURL: localproductUrl,
    headers: {
        "Content-Type": "application/type",
    },
})

export const productId = axios.create({
    baseURL: 'http://localhost:5000/api/users/product/',  //deployment: process.env.NEXT_PUBLIC_PRODUCTID
    headers: {
        'Content-Type': 'application/json',
    }
  })