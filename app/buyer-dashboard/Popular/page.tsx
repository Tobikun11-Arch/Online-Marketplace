"use client"
import React from 'react'
import { ArrowLeft } from 'lucide-react';
import { useProductData } from '../store/storeProduct'
import ProductLists from '../components/pages/ProductList';

const Page = () => {
    const { product } = useProductData()

    //:Products in database must have sold and connected to buyer if there a buy method na
    // Set the product data in popular page to filter the value products sold in Products kung sino mas marami nasold naproducts

    return (
        <div className='min-h-screen bg-white dark:bg-[#171717] cursor-default'>
            <div className="px-5 pt-5">
                <div className='flex gap-1 items-center' onClick={() => window.history.back()}>
                    <ArrowLeft size={20}/>
                    <h2>Back</h2>
                </div>
                <h1 className='text-2xl font-semibold mt-2'>Popular Products Today</h1>
                <p className='mb-3 text-xs text-gray-400'>Discover the most loved products this week.</p>
                <ProductLists product={product}/>
            </div>
        </div>
    )
}

export default Page