"use client"
import React from 'react'
import Header from './layout/Header'
import Sidebar from './layout/Sidebar'
import Footer from './layout/Footer'

const Page = () => {
    return (
        <div className='h-screen text-black bg-[#FAFAFA] dark:bg-[#FAFAFA] cursor-default'>
            <div className='flex h-screen'>
                <div className='lg:w-80 lg:h-full hidden sm:flex flex flex-col justify-center lg:justify-start bg-[#FAFAFA] lg:bg-[#1B2130] text-gray-300'>
                    <Sidebar/>
                </div>
                <div className="fixed lg:relative w-screen">
                    <Header/>
                    <h1 className="ml-20 lg:ml-0">Content</h1>
                </div>
                <footer className='sm:hidden bg-[#1B2130] fixed bottom-0 left-0 right-0 py-2 shadow-lg px-2'>
                    <Footer/>
                </footer>
            </div>
        </div>  
    )
}

export default Page