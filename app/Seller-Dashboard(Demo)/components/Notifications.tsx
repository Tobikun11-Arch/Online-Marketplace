import React, { useEffect, useRef } from 'react'
import { Dot } from 'lucide-react'

interface NotifyProps {
    isNotify: boolean
    setNotify: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Notifications({ isNotify, setNotify }: NotifyProps) {
    const NotificationData = [
        {
            notifications: ['May anne buy 2 shoes', 'John buy 3 adidas'],
            date: ['June 11, 2024', 'March 24, 2024']
        }
    ]

    const dropdownRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setNotify(false) 
            }
        }
        if (isNotify) {
            document.addEventListener('mousedown', handleClickOutside)
        } return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isNotify]) 

    return (
        <div ref={dropdownRef} className='fixed bg-[#FAFAFA] shadow-md pl-2 pr-5 py-4 flex flex-col gap-1 top-16 right-24 sm:right-40 text-gray-700'>
            <h1 className='text-sm font-semibold'>Notifications</h1>
            {NotificationData.map((notification, index) => (
                <div key={index} className='flex flex-col gap-1'>
                    {notification.notifications.map((msg, i) => (
                        <div key={i} className='flex flex-col'>
                            <div className='flex items-center'>
                                <Dot color='red'/>
                                <h2 className='text-xs text-gray-600'>{msg}</h2>
                            </div>
                            <h2 className='text-[10px] text-gray-600 pl-6'>{notification.date[i]}</h2>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}   