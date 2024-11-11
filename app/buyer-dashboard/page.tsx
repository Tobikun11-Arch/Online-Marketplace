"use client"
import React, { useEffect, useState } from 'react'
import Header from './components/layout/Header'
import MainShopProduct from './components/Container/MainShopProduct'
import { Products } from './entities/entities'
import { useToggle } from './store/useToggle'
import { useProuctDetails } from './store/storeProduct'
import { fetchProduct, fetchProducts } from '../buyer-dashboard/@actions/getUsersData'

const Page = () => {
    const [ product, setProduct ] = useState<Products[] | []>([])
    const [ productList, setProductList ] = useState<Products[] | []>([])
    const { isCart, isToggle } = useToggle()
    const { setUrl } = useProuctDetails()

    useEffect(() => {
        const fetchData = async() => {
            const product = await fetchProduct()
            const ProductList = await fetchProducts()
            setProduct(product)
            setProductList(ProductList)
        }
        fetchData()
    }, [])

    useEffect(()=> {
        const images = product?.map((product)=> product.images[0])
        setUrl(images)
        console.log(productList)
    }, [product, productList])

    return (
        <div className='min-h-screen bg-[#FAFAFA] dark:bg-[#171717]'>
            <Header/>
            <MainShopProduct isOpen={isCart || isToggle}/>
            {/* Footer  */}
        </div>
    )
}

export default Page