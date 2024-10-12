import React from 'react'
import Image from 'next/image'
import LoginWrapper from './ui/LoginWrapper'

const LoginImage = () => {
    return (
        <div className='w-2/4 hidden md:block'>
            <Image 
                loading='lazy'
                alt='Zoro picture'
                width={300}
                height={300}
                src={"https://res.cloudinary.com/darzhuvon/image/upload/v1728732428/Pngtree_simple_online_shopping_e-commerce_hd_1108659_su3oae.jpg"}
                placeholder='blur'
                blurDataURL='data:image/svg+xml;base64,...'
                className='h-full w-full'
            /> 
        </div>
    )
}

export default LoginImage
