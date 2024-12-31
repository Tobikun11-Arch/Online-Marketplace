"use client"
import React from 'react'
import Image from 'next/image'
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();

    return (
        <div className="h-screen bg-white flex flex-col items-center">
            <div className="relative w-full h-1/5 bg-cover bg-center flex justify-center items-center"
            style={{backgroundImage: "url('/assets/18773909_6000027.svg')",
            }}>
                <div className='w-32 h-32 bg-red-700 rounded-full flex justify-center items-center'>
                    <Image
                        src={`/assets/unlike.png`}
                        alt={`Like image`}
                        width={100}
                        height={100}
                        className="object-contain object-center"
                        placeholder = 'blur'
                        blurDataURL='add new url later'
                    />
                </div>
            </div>
            <h1 className='mt-20 text-2xl font-semibold text-black'>Payment Error!</h1>
            <div className='flex items-center mt-4 gap-2 px-4'>
                <div className='bg-black h-8 w-8 p-2 rounded-full flex justify-center items-center'>
                    <X strokeWidth={5}/>
                </div>
                <h3 className='text-black text-center'>Sorry, your transaction has failed. <br /> Please try again later.</h3>
            </div>

            <button className='bg-blue-700 mt-10 py-2 px-4 text-xs font-semibold' onClick={()=> router.push('/')}>Back to Profile</button>
        </div>
    )
}

export default Page