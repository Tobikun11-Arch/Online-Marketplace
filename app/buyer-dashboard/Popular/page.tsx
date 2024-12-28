"use client"
import React, { useEffect } from 'react'
import Header from '../components/layout/Header'
import { useProductData } from '../store/storeProduct'
import ProductLists from '../components/pages/ProductList';

const Page = () => {
    const { product } = useProductData()
    useEffect(() => {
        if(product) {
            console.log("checking")
        }
    }, [product])

    //:Products in database must have sold and connected to buyer if there a buy method na
    // Set the product data in popular page to filter the value products sold in Products kung sino mas marami nasold naproducts

    return (
        <div className='min-h-screen bg-white dark:bg-[#171717]'>
            {/* <Header/> */}
            <div className="px-5">
                <h1 className='text-2xl font-semibold'>Popular Products Today</h1>
                <p className='mb-3 text-xs text-gray-400'>Discover the most loved products this week.</p>
                <ProductLists product={product}/>
            </div>
            <h1>Removed the error</h1>
        </div>
    )
}

export default Page