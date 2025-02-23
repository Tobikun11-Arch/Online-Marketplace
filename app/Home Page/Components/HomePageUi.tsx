"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import PageWrapper from './ui/PageWrapper'
import { useRouter } from 'next/navigation'
import _ from 'lodash'
import { CheckUser } from '../../SellerDashboard/axios/axios'

const HomePageUi = () => {
    const router = useRouter()

    const handleUser = async () => {
        const userString = localStorage.getItem('user');

        if (userString) {
            const userObject = JSON.parse(userString);  
            const selectedData = _.pick(userObject, "Email"); 
            try {
                const response = await CheckUser.post('', { Email: selectedData.Email }, { withCredentials: true })
                const { Role } = response.data
                if(Role === 'Seller') {
                    router.push('./SellerDashboard')
                }
                else if(Role === 'Buyer') {
                    router.push('/BuyerDashboard')
                }
            } catch (error) {
                router.push('/Auth')
            }
        } else {
            router.push('/Auth')
        }
    }

    return (
        <PageWrapper>
            <main className='px-4 md:px-12 flex flex-col-reverse md:grid md:grid-cols-2 h-full'>
                <section className='flex h-full items-start pt-10 md:pt-0 md:justify-center flex-col pr-4'>
                    <h1 className='text-xl md:text-3xl font-medium text-gray-700 dark:text-white'>Stylish and Durable Bag <br /> for Everyday Use</h1>
                    <p className='pt-2 md:pt-4 dark:text-gray-300 text-gray-500'>Explore our range of fashionable, durable, and spacious bags, perfect for your everyday adventures. Built with high-quality materials to ensure long-lasting use.</p>
                    <button className='mt-4 md:mt-14 px-6 py-2 border border-gray-500 hover:bg-gray-800 hover:text-white' onClick={handleUser}>Shop Now</button>
                </section>

                <div className='flex flex-grow h-full items-center justify-center z-1 relative'>
                    <Image 
                    loading='lazy'
                    alt='Sofa'
                    width={300}
                    height={300}
                    src={"https://res.cloudinary.com/darzhuvon/image/upload/v1728560175/61iI1qEoiKL._AC_SL1500_-removebg-preview_nt9ghl.png"}
                    placeholder='blur'
                    blurDataURL='data:image/svg+xml;base64,...'
                    />
                </div>
            </main>
        </PageWrapper>
    )
}

export default HomePageUi
