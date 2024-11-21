"use client"
import React, { useEffect, useState } from 'react'
import { Products } from '../entities/entities'
import { useProductData } from '../store/storeProduct'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { AllProducts, MainShop } from '../../buyer-dashboard/axios/dataStore'
import { lineSpinner } from 'ldrs'
import ProductLists from '../components/pages/ProductList';
import Header from '../components/layout/Header';
import Category from './Category';

const queryClient = new QueryClient()
export default function Page() {
        return (
            <QueryClientProvider client={queryClient}>
                <ProductList />
            </QueryClientProvider>
        )
    }

    interface ProductResponse {
        SellerProducts: Products[]
    }

    const ProductList = () => {
        const { setProduct, product } = useProductData()
        const { isLoading, error, data: ProductResponse } = useQuery<ProductResponse>({
            queryKey: ['product'],
            queryFn: async () => {
                const response = await AllProducts.get(''); //Main shop
                const { SellerProducts } = response.data 
                return { SellerProducts }
            },
        })

        useEffect(() => {
            if (typeof window !== 'undefined') {
                lineSpinner.register()
            }
        }, [])

        useEffect(() => {
            if (ProductResponse) {
                setProduct(ProductResponse.SellerProducts)
                console.log("Product List: ", ProductResponse.SellerProducts)
            }
        }, [ProductResponse])

        if (isLoading) {
            return (
                <div className="flex items-center justify-center min-h-screen bg-[#171717] dark:bg-[#171717]">
                    <l-line-spinner
                    size="50"
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
                <div className="px-4 flex flex-col gap-4">
                    <div className='flex gap-2'>
                    <Category/>
                    {/* change this to Filtered category later */}
                    <Category/> 
                    </div>
                    <ProductLists product={product}/>
                </div>
            </div>
        )
    }