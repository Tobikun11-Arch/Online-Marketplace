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
    baseURL: 'http://localhost:5000/api/users/categories/length',
    headers: {
        'Content-Type': 'application/json'
    }
  })
  productCategory.defaults.withCredentials = true

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


export const updateQuantity = axios.create({
    baseURL: 'http://localhost:5000/api/users/product/updateQuantity',  //deployment: process.env.NEXT_PUBLIC_PRODUCT_CART
    headers: {
        'Content-Type': 'application/json',
    },
})
updateQuantity.defaults.withCredentials = true;


export const deleteProduct = axios.create({
    baseURL: 'http://localhost:5000/api/users/product/deleteProduct',  //deployment: process.env.NEXT_PUBLIC_PRODUCT_CART
    headers: {
        'Content-Type': 'application/json',
    },
})
deleteProduct.defaults.withCredentials = true;


export const UpdateProfiles = axios.create({
    baseURL: 'http://localhost:5000/api/users/UpdateProfile',  //deployment: process.env.NEXT_PUBLIC_PRODUCT_CART
    headers: {
        'Content-Type': 'application/json',
    },
})
UpdateProfiles.defaults.withCredentials = true;

export const searchData = axios.create({
    baseURL: 'http://localhost:5000/api/users/searchProduct',
    headers: {
        'Content-Type': 'application/json',
    },
})
searchData.defaults.withCredentials = true;

export const StripePayment = axios.create({
    baseURL: 'http://localhost:5000/api/users/StripePayment',
    headers: {
        'Content-Type': 'application/json',
    },
})
StripePayment.defaults.withCredentials = true;

export const Orders = axios.create({
    baseURL: 'http://localhost:5000/api/users/Orders',
    headers: {
        'Content-Type': 'application/json',
    },
})
Orders.defaults.withCredentials = true;

export const getOrderHistory = axios.create({
    baseURL: 'http://localhost:5000/api/users/',
    headers: {
        'Content-Type': 'application/json',
    },
})
getOrderHistory.defaults.withCredentials = true;