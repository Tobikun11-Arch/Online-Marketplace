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


export const searchList = axios.create({
    baseURL: 'http://localhost:5000/api/users/ViewList',
    headers: {
        'Content-Type': 'application/json',
    },
})
searchList.defaults.withCredentials = true;