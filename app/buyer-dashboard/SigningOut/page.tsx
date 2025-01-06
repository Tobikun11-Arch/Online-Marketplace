"use client"
import React, { useEffect } from 'react'
import { lineSpinner } from 'ldrs'
import { useRouter } from 'next/navigation'
import { useUser } from '../store/User'

const Page = () => {
    const router = useRouter()
    const { setuser } = useUser()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            lineSpinner.register();
        }

        const timeout = setTimeout(() => {
            localStorage.clear();
            setuser(null)
            router.push('/');
        }, 2000);

        return () => clearTimeout(timeout);
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#171717]">
            <l-line-spinner
            size="30"
            bg-opacity="0.1"
            speed="1.75" 
            color="blue" 
            ></l-line-spinner>
        </div>
    )
}

export default Page
