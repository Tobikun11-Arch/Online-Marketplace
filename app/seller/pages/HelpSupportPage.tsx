import Image from 'next/image'
import React from 'react'

export default function HelpSupportPage() {
    return (
      <main className='px-6 pt-5 pb-16 sm:px-2 sm:py-5 sm:pl-16 sm:pr-4 lg:px-5 xl:px-12'>
        <section className='flex'>
          <Image 
          loading='lazy'
          alt='sajubot Image'
          width={100}
          height={100}
          src="/assets/sajubot.png"
          placeholder='blur'
          blurDataURL='data:image/svg+xml;base64,...'
          className='w-[30em] h-[30em]'
        /> 
        </section>
      </main>
    )
}
