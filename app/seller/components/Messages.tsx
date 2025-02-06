import React, { useEffect, useRef } from 'react'
import { Dot } from 'lucide-react'

interface MessageProps {
    isMessage: boolean
    setMessage: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Messages({ isMessage, setMessage }: MessageProps) {
    const Messages = [
        {
            names: ['Messages soon!', "Reminder"],
            messages: ['Wait for new update.', 'Please upload png file only'],
            time: ['2mns ago', '1hr ago']
        }
    ]

    const dropdownRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setMessage(false) 
            }
        }
        if (isMessage) {
            document.addEventListener('mousedown', handleClickOutside)
        } return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isMessage]) 

    return (
        <div ref={dropdownRef} className='fixed bg-[#FAFAFA] shadow-md pl-4 pr-8 py-4 flex flex-col gap-1 top-16 right-20 sm:right-36 text-gray-700'>
            <h1 className='text-sm font-semibold'>Messages</h1>
            {Messages.map((message, index)=> (
                <div key={index}>
                    {message.names.map((name, i)=> (
                        <div key={i} className='flex items-center gap-2 hover:text-blue-600'>
                            <div className='h-10 w-10 bg-black rounded-full'></div>
                            <div className='mt-1'>
                                <h2 className='text-sm' key={i}>{name}</h2>
                                <h2 className='text-gray-600 text-[11px]'>{message.messages[i]}</h2>
                                <h2 className='text-gray-600 text-[11px]'>{message.time[i]}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}   