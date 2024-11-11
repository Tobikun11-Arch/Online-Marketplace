"use client"
import React, { useEffect, useState } from 'react'
import Header from './components/layout/Header'
import MainShopProduct from './components/Container/MainShopProduct'
import { Products } from './entities/entities'
import { useToggle } from './store/useToggle'
import { useProuctDetails, useProductData } from './store/storeProduct'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { MainShop, AllProducts } from '../buyer-dashboard/axios/dataStore'
import { lineSpinner } from 'ldrs'

const queryClient = new QueryClient()
export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
    <BuyerDashboard />
    </QueryClientProvider>
    )
}

interface ProductResponse {
    MainShopProducts: Products[]
    SellerProducts: Products[]
}

const BuyerDashboard = () => {
    const { isCart, isToggle } = useToggle()
    const { setUrl } = useProuctDetails()
    const { setProduct } = useProductData()

    const { isLoading, error, data: ProductResponse } = useQuery<ProductResponse>({
        queryKey: ['product'],
        queryFn: async () => {
            const response = await MainShop.get(''); //Main shop
            const { MainShopProducts, SellerProducts } = response.data 
            return { MainShopProducts, SellerProducts }
        },
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            lineSpinner.register()
        }
    }, [])

    useEffect(() => {
        if (ProductResponse) {
            const images = ProductResponse.MainShopProducts.map((product)=> product.images[0])
            setUrl(images)
            setProduct(ProductResponse.SellerProducts)
        }
    }, [ProductResponse, setUrl])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#171717] dark:bg-[#171717]">
                <l-line-spinner
                size="70"
                bg-opacity="0.1"
                speed="1.75" 
                color="white" 
                ></l-line-spinner>
            </div>
        )
    }

    if(error) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#171717] dark:bg-[#171717]">
                <h1 className='text-2xl text-red-800'>Error Fetching</h1>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-[#FAFAFA] dark:bg-[#171717]'>
            <Header/>
            <MainShopProduct isOpen={isCart || isToggle}/>
        </div>
    )
}