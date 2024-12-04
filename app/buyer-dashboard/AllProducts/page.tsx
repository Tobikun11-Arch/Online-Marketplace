"use client"
import React, { useEffect, useState } from 'react'
import { Products } from '../entities/entities'
import { useProductData } from '../store/storeProduct'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { AllProducts } from '../../buyer-dashboard/axios/dataStore'
import { lineSpinner } from 'ldrs'
import ProductLists from '../components/pages/ProductList';
import Header from '../components/layout/Header';
import { List, ArrowDownAZ, ArrowDownZA  } from "lucide-react";
import Category from '../../SellerDashboard/Components/Common/Category';

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

    const categories = [
        "Electronics",
        "Home & Kitchen",
        "Fashion",
        "Health & Beauty",
        "Sports & Outdoors",
        "Toys & Games",
        "Automotive",
        "Office Supplies",
        "Books & Media",
        "Food & Beverages",
        "Pet Supplies",
        "Garden & Outdoor",
        "Crafts & Hobbies",
    ];

    const ProductList = () => {
        const { setProduct, product } = useProductData()
        const [ sort, sortAlpha ] = useState<boolean>(false)
        const [ view, setView ] = useState<boolean>(false)
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
                setProduct(ProductResponse.SellerProducts.sort((a, b)=> a.productName.localeCompare(b.productName)))
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

        const sortAlphabetically = () => {
            sortAlpha(!sort)
            const productSorted = [...product].sort((a, b)=> sort ? a.productName.localeCompare(b.productName) :
            b.productName.localeCompare(a.productName))
            setProduct(productSorted)
        };
    
        const handleToggle = () => {
            setView(!view)
        };

        const handleCategory = (category: string) => {
            console.log(category)
        }

        return (
            <div className='min-h-screen bg-[#FAFAFA] dark:bg-[#171717] cursor-default'>
                <Header/>
                <div className="flex gap-3 px-5 w-full justify-between">
                    <div className='flex gap-1'>
                        <List color='gray' onClick={handleToggle}/>
                        <h1 className='text-xs text-gray-600'>Sort products into categories</h1>
                    </div>
                    {view && (
                        <div className="absolute dark:bg-opacity-90 dark:backdrop-blur-sm backdrop-blur-md md:border dark:border-black top-28 w-44 h-96 z-50 dark:bg-black dark:text-white font-bold flex flex-col overflow-y-scroll">
                            {categories.map((list, index) => (
                                <ul key={index}>
                                    <li className="p-2 text-sm hover:bg-[#3333]" onClick={()=> handleCategory(list)}>{list}</li>
                                </ul>
                            ))}
                        </div>
                    )}
                    <div className='flex gap-1'>
                        <h1 className='text-xs text-gray-600'>Sort products: </h1>
                        {sort ?  <ArrowDownAZ color='gray' onClick={sortAlphabetically}/> :  <ArrowDownZA color='gray' onClick={sortAlphabetically}/>}
                    </div>
                </div>
                <div className="px-4 flex flex-col gap-4">
                    <div className='flex gap-2'>
                    </div>
                    <ProductLists product={product}/>
                </div>
            </div>
        )
    }