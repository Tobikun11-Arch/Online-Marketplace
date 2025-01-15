import Image from 'next/image'
import React, { useEffect } from 'react'
import { bouncy, ping } from 'ldrs'

export default function TabsLoading() {

    useEffect(()=> {
        if (typeof window !== 'undefined') {
            bouncy.register()
            ping.register()
        }   
    }, [])


    return (
        <div className='w-full h-full bg-white flex flex-col items-center justify-center'>
            <div className="relative">
                <div className='absolute -right-1'>
                    <l-ping
                        size="20"
                        speed="2" 
                        color="red" 
                    ></l-ping>
                </div>
                <Image
                    width={50}
                    height={50}
                    src="/assets/sajubazaarlogo.png"
                    alt='SajuBazaar logo'
                />
            </div>
            <div className='flex gap-1'>
                <h2 className='font-bold text-black'><span className='text-blue-600'>Saju</span>Bazaar</h2>
                <div>
                    <l-bouncy
                        size="20"
                        speed="1.75" 
                        color="blue">
                    </l-bouncy>
                </div>
            </div>
        </div>
    )
}
