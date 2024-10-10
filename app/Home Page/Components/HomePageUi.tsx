import React from 'react'
import Image from 'next/image'

const HomePageUi = () => {
    return (
        <main className='px-4 md:px-12 grid grid-cols-1 md:grid-cols-2'>
            <section className='flex h-full items-center justify-center'>
                <h1>Stylish and Durable Bag for Everyday Use</h1>
            </section>

            <div>
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
