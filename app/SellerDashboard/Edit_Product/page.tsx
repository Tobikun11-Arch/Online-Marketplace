"use client"
import React from 'react'
import { ChevronRight, ArrowRight } from "lucide-react"
import Link from 'next/link'
import { useSelectedProducts } from '../hooks/ReusableHooks'
import Edit_ProductImages from './Edit_ProductImages'
import { useRouter } from 'next/navigation'
import Edit_ProductInformation from './Edit_ProductInformation'

export default function Page() {
    const { productSelected } = useSelectedProducts()
    const product = productSelected?.productStatus
    const router = useRouter()

    if(!product) {
        router.push('/SellerDashboard/Products')
    }

    return (
        <div className='min-h-screen sm:h-screen bg-gray-200 px-3 py-5 sm:px-7 dark:text-black'>

            <div className="flex justify-between items-center">
                <div className="flex gap-1 items-center text-xl font-semibold ">
                    <Link href={'/SellerDashboard/Products'}>
                    <h1 className='text-gray-400 text-xs sm:text-xl'>My product</h1>
                    </Link>
                    <ChevronRight size={20} color='gray'/>
                    <h1 className='text-xs sm:text-xl'>Edit Product</h1>
                </div>
            </div>

            <div className='w-full h-5/6 bg-white mt-2 sm:mt-8 sm:flex'>
                <Edit_ProductImages/>
                <Edit_ProductInformation/>
            </div>

        </div>
    )
}
