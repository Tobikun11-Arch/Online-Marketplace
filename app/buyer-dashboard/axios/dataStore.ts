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

  export const productCategory = axios.create({
    baseURL: 'http://localhost:5000/api/users/product/length',
    headers: {
        'Content-Type': 'application/json'
    }
  })

export const userAuth = axios.create({
    baseURL: 'http://localhost:5000/api/users/product/',  //deployment: process.env.NEXT_PUBLIC_PRODUCTID
    headers: {
        'Content-Type': 'application/json',
    }
})
userAuth.defaults.withCredentials = true;

export const useCart = axios.create({
    baseURL: 'http://localhost:5000/api/users/product/cart',  //deployment: process.env.NEXT_PUBLIC_PRODUCT_CART
    headers: {
        'Content-Type': 'application/json',
    },
})
useCart.defaults.withCredentials = true;

export const myCart = axios.create({
    baseURL: 'http://localhost:5000/api/users/product/cartProducts',  //deployment: process.env.NEXT_PUBLIC_PRODUCT_CART
    headers: {
        'Content-Type': 'application/json',
    },
})
myCart.defaults.withCredentials = true;