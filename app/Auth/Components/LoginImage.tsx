import React from 'react'
import Image from 'next/image'
import LoginWrapper from './ui/LoginWrapper'

const LoginImage = () => {
    return (
        <div className='w-2/4 hidden md:block'>
            <Image 
                loading='lazy'
                alt='Login Image'
                width={300}
                height={300}
                src="/assets/Auth.jpg"
                placeholder='blur'
                blurDataURL='data:image/svg+xml;base64,...'
                className='h-full w-full'
            /> 
        </div>
    )
}

export default LoginImage
