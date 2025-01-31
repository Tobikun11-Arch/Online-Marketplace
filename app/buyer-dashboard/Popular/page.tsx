import React, { useEffect, } from 'react'
import { ArrowLeft } from 'lucide-react';
import ProductLists from '../components/pages/ProductList';
import { Product } from '../entities/entities';
import { useSuspenseQuery } from '@tanstack/react-query';
import { AllProducts } from '../axios/dataStore';

interface Response {
    popular_products: Product[]
}

const Page = async () => {
    const { data: Response } = useSuspenseQuery<Response>({
        queryKey: ['popular_products'],
        queryFn: async () => {
            const response = await AllProducts.get('')
            const { popular_products } = response.data
            return { popular_products }
        }
    })

    useEffect(()=> {
        console.log("products: ", Response)
    }, [Response])

    return (
        <div className='min-h-screen bg-white dark:bg-[#171717] cursor-default'>
            <div className="px-5 pt-5">
                <div className='flex gap-1 items-center' onClick={() => window.history.back()}>
                    <ArrowLeft size={20}/>
                    <h2>Back</h2>
                </div>
                <h1 className='text-2xl font-semibold mt-2'>Popular Products Today</h1>
                <p className='mb-3 text-xs text-gray-400'>Discover the most loved products this week.</p>
                <ProductLists product={Response.popular_products}/>
            </div>
        </div>
    )
}

export default Page