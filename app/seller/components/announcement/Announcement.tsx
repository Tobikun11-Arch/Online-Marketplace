import React from 'react'
import data from './announcement.json'

export default function Announcement() {
    return (
        <main className='mt-5'>
            {data.map((announce, index) => (
                <section key={index}>
                   <div className='shadow-lg rounded-md py-3 px-2'>
                    <div className='flex justify-between items-center'>
                        <h1 className='mt-5 text-red-600 font-semibold text-lg'>{announce.Headlines}</h1>
                        <h4 className='text-xs text-gray-500'>{announce.date}</h4>
                    </div>
                    <h4 className='text-sm'>{announce.About}</h4>
                   </div>
                </section>
            ))}
        </main>
    )
}
