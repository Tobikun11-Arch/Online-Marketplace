import Image from 'next/image'
import React, { useEffect } from 'react'
import { bouncy, ping } from 'ldrs'
import { Signout } from '../services/axios/UserAuthentication'
import { useRouter } from 'next/navigation'
import { SignOut } from '../../Auth/actions/authAction'

export default function LoadingTimerPage() {
    const router = useRouter()

    useEffect(()=> {
        if (typeof window !== 'undefined') {
            bouncy.register()
            ping.register()
        } 
        const handleSellerLogout = async () => { //Signout from socmed any socmed and to clear token and storage
            try {
                SignOut()
                const response = await Signout.post('', {}, { withCredentials: true })
                console.log("Signout working")
                if(response.data.message === 'Signed out successfully!') {
                    router.push('/')
                    localStorage.clear();
                }
            } catch (error) {
                console.error("Error during signout: ", error);
            }
        }
        handleSellerLogout()
    }, [])


    return (
        <div className='w-full h-screen bg-white flex flex-col items-center justify-center'>
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
