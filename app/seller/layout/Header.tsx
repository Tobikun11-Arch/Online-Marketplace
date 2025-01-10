"use client"
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
import { Send, Bell, UserPen, CalendarDays, LogOut } from 'lucide-react'
import { useSideBarState } from '../state/Sidebar'
import NavList from '../components/NavList'
import Notifications from '../components/Notifications'
import Messages from '../components/Messages'
import LoadingTimerPage from '../loading/LoadingTimer'

const Header = () => {
    const [ userOpen, setUserOpen ] = useState<boolean>(false)
    const [ isNotify, setNotify ] = useState<boolean>(false)
    const [ isMessage, setMessage ] = useState<boolean>(false)
    const { setActiveTab } = useSideBarState()
    const [ isLogout, setLogout ] = useState<boolean>(false)

    const dropdownRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setUserOpen(false) 
            }
        }
        if (userOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [userOpen]) 
    
    if(isLogout) {
        return <LoadingTimerPage/>
    }

    return (
        <div className='h-20 w-full sticky top-0 z-999 shadow-md flex justify-between lg:justify-end items-center px-4 sm:px-8'>
                <div className='flex items-center gap-1 lg:hidden'>
                    <Image
                    width={50}
                    height={50}
                    src="/assets/sajubazaarlogo.png"
                    alt='SajuBazaar logo'
                    />
                    <h2 className='font-bold hidden sm:block'><span className='text-blue-600'>Saju</span>Bazaar</h2>
                </div>

                <div className='flex items-center gap-3'>
                    <div className='p-1 w-10 h-10 flex justify-center items-center rounded-full bg-gray-200' onClick={()=> setNotify(true)}>
                        <Bell strokeWidth={1.5} size={20} className='text-[#1a1a1a'/>
                    </div> 
                    {isNotify && (
                        <Notifications setNotify={setNotify} isNotify={isNotify}/>
                    )}
                    <div className='p-1 w-10 h-10 flex justify-center items-center rounded-full bg-gray-200' onClick={()=> setMessage(true)}>
                        <Send strokeWidth={1.5} size={20} className='text-[#1a1a1a'/>
                    </div>
                    {isMessage && (
                        <Messages isMessage={isMessage} setMessage={setMessage}/>
                    )}
                    <div className='flex items-center gap-1'>
                        <div className='user-details hidden sm:block'>
                            <h3 className='text-sm text-black font-medium'>Joenel Sevellejo</h3>
                            <h3 className='text-xs text-gray-500 flex justify-end'>Seller </h3>
                        </div>
                        <div className='p-0.3 bg-blue-600 rounded-full flex justify-center items-center' onClick={()=> setUserOpen(true)}>
                            <Image
                                width={40}
                                height={40}
                                src="/assets/default_user_profile.png"
                                alt='SajuBazaar logo'
                            />
                        </div>
                        {userOpen && (
                            <div ref={dropdownRef} className='fixed bg-[#FAFAFA] shadow-md pl-4 pr-14 py-4 flex flex-col gap-4 top-16 right-5 text-gray-700'>
                                <NavList
                                    icon={UserPen}
                                    label='My Account'
                                    onClick={()=> setActiveTab("My Account")}
                                />
                                <NavList
                                    icon={CalendarDays}
                                    label='Calendar'
                                    onClick={()=> setActiveTab("Calendar")}
                                />
                                <hr className='-mr-14 -ml-4 border-t border-gray-500'/>
                                <div className='flex items-center gap-2 hover:text-blue-700 text-sm' onClick={()=> setLogout(true)}>
                                    <LogOut size={20}/>
                                    <h2>Log out</h2>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
        </div>
    )
}

export default Header
