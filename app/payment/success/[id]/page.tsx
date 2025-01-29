"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Orders } from '../../../buyer-dashboard/axios/dataStore';

const Page = () => {
    const router = useRouter();
    const params = useParams()
    const userId = params.id
    const search_params = useSearchParams()
    const [ isProcessing, setProcessiong ] = useState(false)

    const handleOrders = async() => {
        setProcessiong(true)
        const allProducts = JSON.parse(decodeURIComponent(search_params.get('ids') || '[]'))
        if(allProducts) {
            const product = {
                userId,
                cartProducts: allProducts
            }
            const response = await Orders.put('', product, {withCredentials: true})
            if(response.data.message === "Update success") {
                router.push('/')
            }
        }
    }

    return (
        <div className="h-screen bg-white flex flex-col items-center">
            <div className="relative w-full h-1/5 bg-cover bg-center flex justify-center items-center"
            style={{backgroundImage: "url('/assets/18773909_6000027.svg')",
            }}>
                <div className='w-32 h-32 bg-white rounded-full flex justify-center items-center'>
                    <Image
                        src={`/assets/like_payment.png`}
                        alt={`Like image`}
                        width={100}
                        height={100}
                        className="object-contain object-center"
                        placeholder = 'blur'
                        blurDataURL='add new url later'
                    />
                </div>
            </div>
            <h1 className='mt-20 text-2xl font-semibold text-[#38E08B]'>Thank you!</h1>
            <div className='flex items-center mt-4 gap-2'>
                <div className='bg-[#38E08B] h-8 w-8 p-1 rounded-full flex justify-center items-center'>
                    <Check strokeWidth={3}/>
                </div>
                <h3 className='text-black'>Payment Done Successfully</h3>
            </div>
            <button className='bg-[#38E08B] text-white mt-10 py-2 px-4 text-xs font-semibold' disabled={isProcessing} onClick={handleOrders}>Confirm payment</button>
        </div>
    )
}

export default Page