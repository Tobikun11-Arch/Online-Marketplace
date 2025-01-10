import Image from 'next/image'
import React from 'react'


interface SubImagesProps {
    src: string
    alt: string
}

export default function SubImage({ src, alt }: SubImagesProps) {
    return (
        <div className='relative w-full mt-2 h-28 flex flex-col justify-center items-center md:mb-0 bg-[#EFEFEF] rounded-md'>
            <div className='relative w-3/4 h-3/4 aspect-w-1 aspect-h-1'>
                <Image
                fill
                src={src ? src : '/assets/sub_img.png'}
                alt={alt}
                className="object-contain object-center"
                placeholder = 'blur'
                blurDataURL='add new url later'
                />
            </div>
        </div>
    )
}
