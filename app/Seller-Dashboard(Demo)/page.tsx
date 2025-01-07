"use client"
import React from 'react'
import Header from './layout/Header'
import Sidebar from './layout/Sidebar'
import UseScreenSize from './components/UseScreenSize'

const Page = () => {
    const { width } = UseScreenSize()
    const isLowLg = width <= 1024

    return (
        <div className='h-screen text-black bg-[#FAFAFA] dark:bg-[#FAFAFA] cursor-default'>
            <div className='flex h-screen'>
                <div className='lg:w-80 lg:h-full flex flex-col justify-center lg:justify-start bg-[#FAFAFA] lg:bg-[#1B2130] text-gray-300'>
                    <Sidebar/>
                </div>
                <div className={`w-screen ${isLowLg && 'fixed'}`}>
                    <Header/>
                    <h1 className={`${isLowLg && 'ml-20'}`}>Content</h1>
                </div>
            </div>
        </div>
    )
}

export default Page