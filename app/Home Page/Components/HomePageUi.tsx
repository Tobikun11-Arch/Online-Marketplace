import React from 'react'
import Image from 'next/image'

const HomePageUi = () => {
    return (
        <main className='px-4 md:px-12 flex flex-col-reverse md:grid md:grid-cols-2 h-full '>
            <section className='flex h-full items-start pt-16 md:pt-0 md:justify-center flex-col pr-4'>
                <h1 className='text-xl md:text-3xl font-medium text-gray-700'>Stylish and Durable Bag <br /> for Everyday Use</h1>
                <p className='pt-2 md:pt-4 text-gray-500'>Explore our range of fashionable, durable, and spacious bags, perfect for your everyday adventures. Built with high-quality materials to ensure long-lasting use.</p>
                <button className='mt-4 md:mt-14 px-6 py-2 border border-gray-500 hover:bg-gray-800 hover:text-white'>Shop Now</button>
            </section>

            <div className='flex h-full items-center justify-center'>
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
    )
}

export default HomePageUi
