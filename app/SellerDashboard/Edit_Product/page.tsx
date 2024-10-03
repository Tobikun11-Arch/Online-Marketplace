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
        <div className='min-h-screen sm:h-screen bg-gray-200 px-3 py-5'>

            <div className="flex justify-between items-center">
                <div className="flex gap-1 items-center text-xl font-semibold ">
                    <Link href={'/SellerDashboard/Products'}>
                    <h1 className='text-gray-400 text-xs'>My product</h1>
                    </Link>
                    <ChevronRight size={20} color='gray'/>
                    <h1 className='text-xs'>Edit Product</h1>
                </div>

                <div className='flex bg-[#2FCC73] pl-5 py-2 rounded-3xl items-center gap-6 pr-3'>
                    <h1 className='text-white text-xs'>{product !== 'Published' ? '' : 'Save'}</h1>
                    <ArrowRight size={16} color='white'/>
                </div>
            </div>

            <div className='w-full bg-white mt-2 sm:flex'>
                <Edit_ProductImages/>
                <Edit_ProductInformation/>
            </div>

        </div>
    )
}
