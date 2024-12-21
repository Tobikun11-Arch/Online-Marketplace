"use client"
import React, { useEffect } from 'react'
import NavBar from './Components/NavBar'
import HomePageUi from './Components/HomePageUi'
import { useRouter } from 'next/navigation'
import { auth } from '../SellerDashboard/axios/axios';
import { useTokenValidation } from '../userData/TokenValidation'

const HeroSection = () => {
    const router = useRouter();
    const { setToken } = useTokenValidation()

    useEffect(() => {
        const verifyAccessToken = async () => {
            try {
                const response = await auth.get('', { withCredentials: true });
                if (response.data.verToken === false) {
                    setToken(false)
                }
                setToken(true)
            } catch (error: any) {
                setToken(false)
            }
        };

        verifyAccessToken();
    }, [router]);

    return (
        <>
            <div className='Home h-screen flex flex-col dark:bg-gray-950'>
                <NavBar/>
                <div className="flex-grow">
                    <HomePageUi/>
                </div>
            </div>
        </>
    )
}

export default HeroSection
