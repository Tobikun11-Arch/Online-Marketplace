import React, { useEffect, useRef } from 'react'
import { Dot } from 'lucide-react'
import { NotifBuyer } from '../state/Chart'

interface NotifyProps {
    isNotify: boolean
    setNotify: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Notifications({ isNotify, setNotify }: NotifyProps) {
    const { Chart } = NotifBuyer()

    const NotificationData = [
        {
            notifications: ['May anne buy 2 shoes', 'John buy 3 adidas'],
            date: ['June 11, 2024', 'March 24, 2024']
        }
    ]

/**   const newOrders = Chart.map(order => `${order.productQuantity}x '${order.productName}'`).join(", ");
        const message = `🛒 New Order Alert! ${newOrders} has been purchased. 📦`; */

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
        <div ref={dropdownRef} className='fixed bg-[#FAFAFA] shadow-md pl-2 pr-5 py-4 flex flex-col gap-1 top-16 right-32 sm:right-44 text-gray-700'>
            <h1 className='text-sm font-semibold'>Notifications</h1>
            {Chart ? (
                Chart.map((notification, chartIndex) => (
                    <div key={`chart-${chartIndex}`} className='flex flex-col gap-1'>
                        <div className="flex flex-col">
                            <div className="flex items-center">
                                <Dot color="red" />
                                <h2 className="text-xs text-gray-600">
                                    {`${notification.productQuantity}x '${notification.productName}'📦`}
                                </h2>
                            </div>
                            <h2 className="text-[10px] text-gray-600 pl-6">
                                {new Date(notification.AddedAt).toLocaleString("en-US", {
                                    month: "long",
                                    day: "2-digit",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                })}
                            </h2>
                        </div>
                    </div>
                ))
            ) : (
                <p>No Notifications</p>
            )}

        </div>
    )
}   