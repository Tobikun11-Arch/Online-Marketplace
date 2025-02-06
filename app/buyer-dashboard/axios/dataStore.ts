import axios from 'axios'

const productUrl = process.env.NEXT_PUBLIC_PRODUCT  //deployment url
export const MainShop = axios.create({
    baseURL: productUrl,
    headers: {
        "Content-Type": "application/type",
    },
})

export const AllProducts = axios.create({
    baseURL: productUrl,
    headers: {
        "Content-Type": "application/type",
    },
})

export const productId = axios.create({
    baseURL: process.env.NEXT_PUBLIC_PRODUCTID,
    headers: {
        'Content-Type': 'application/json',
    }
})

export const productCategory = axios.create({
    baseURL: process.env.NEXT_PUBLIC_PRODUCT_CATEGORY,
    headers: {
        'Content-Type': 'application/json',
    }
})
productCategory.defaults.withCredentials = true;

export const userAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_USER_AUTH,
    headers: {
        'Content-Type': 'application/json',
    }
})
userAuth.defaults.withCredentials = true;

export const useCart = axios.create({
    baseURL: process.env.NEXT_PUBLIC_PRODUCT_CART,
    headers: {
        'Content-Type': 'application/json',
    },
})
useCart.defaults.withCredentials = true;

export const myCart = axios.create({
    baseURL: process.env.NEXT_PUBLIC_MY_CART,
    headers: {
        'Content-Type': 'application/json',
    },
})
myCart.defaults.withCredentials = true;

export const updateQuantity = axios.create({
    baseURL: process.env.NEXT_PUBLIC_UPDATE_QUANTITY,
    headers: {
        'Content-Type': 'application/json',
    },
})
updateQuantity.defaults.withCredentials = true;

export const deleteProduct = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DELETE_PRODUCT,
    headers: {
        'Content-Type': 'application/json',
    },
})
deleteProduct.defaults.withCredentials = true;

export const UpdateProfiles = axios.create({
    baseURL: process.env.NEXT_PUBLIC_UPDATE_PROFILES,
    headers: {
        'Content-Type': 'application/json',
    },
})
UpdateProfiles.defaults.withCredentials = true;

export const searchData = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SEARCH_PRODUCT,
    headers: {
        'Content-Type': 'application/json',
    },
})
searchData.defaults.withCredentials = true;

export const StripePayment = axios.create({
    baseURL: process.env.NEXT_PUBLIC_STRIPE_PAYMENT,
    headers: {
        'Content-Type': 'application/json',
    },
})
StripePayment.defaults.withCredentials = true;

export const Orders = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ORDERS,
    headers: {
        'Content-Type': 'application/json',
    },
})
Orders.defaults.withCredentials = true;

export const getOrderHistory = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ORDER_HISTORY,
    headers: {
        'Content-Type': 'application/json',
    },
})
getOrderHistory.defaults.withCredentials = true;
