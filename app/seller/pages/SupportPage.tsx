import React from 'react'
import Announcement from '../components/announcement/Announcement'

export default function AnnouncementPage() {
    return (
        <div className='px-6 pt-5 pb-16 sm:px-2 sm:py-5 sm:pl-16 sm:pr-4 lg:px-5 xl:px-12'> 
            <h1 className='italic font-semibold text-xl'>Announcement</h1>
            <Announcement />
        </div>
    )
}