"use client"
import React, { useEffect } from 'react'
import { lineSpinner } from 'ldrs'
import { useRouter } from 'next/navigation'

const Page = () => {
    const router = useRouter()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            lineSpinner.register();
        }

        const timeout = setTimeout(() => {
            router.push('/');
        }, 2000);

        return () => clearTimeout(timeout);
    }, [router]);

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

export default Page