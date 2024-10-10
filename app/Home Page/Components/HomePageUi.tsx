import React from 'react'
import Image from 'next/image'

const HomePageUi = () => {
    return (
        <main className='px-4 md:px-12 grid grid-cols-1 md:grid-cols-2'>
            <section>
                <h1>Section</h1>
            </section>

            <div>
                <Image 
                loading='lazy'
                alt='Zoro picture'
                width={300}
                height={300}
                src={"https://i.pinimg.com/564x/c0/51/4a/c0514ad71f49a6f94b879b863184e621.jpg"}
                placeholder='blur'
                blurDataURL='data:image/svg+xml;base64,...'
                />
            </div>
        </main>
    )
}

export default HomePageUi
