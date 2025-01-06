import React from 'react'
import Header from './layout/Header'
import Sidebar from './layout/Sidebar'

const Page = () => {
    return (
        <div className='h-screen text-black bg-[#FAFAFA] dark:bg-[#FAFAFA] cursor-default'>
            <div className='flex h-screen'>
                <div className='w-72 h-full bg-[#1B2130] text-gray-300'>
                    <Sidebar/>
                </div>
                <div className='w-screen'>
                    <Header/>
                    <h1>Content</h1>
                </div>
            </div>
        </div>
    )
}

export default Page
