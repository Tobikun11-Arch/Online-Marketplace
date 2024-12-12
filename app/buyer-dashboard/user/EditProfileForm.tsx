import {  Dialog, DialogPanel } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import { useUserForms } from '../store/User'
import AppearanceTab from './AppearanceTab'
import ProfileTab from './ProfileTab'
import { X } from 'lucide-react';
import OrdersTab from './OrdersTab'

const EditProfileForm = () => {
    const { opEditProfile, setEdit } = useUserForms() //setEdit(!opEditProfile) later
    const [ activeTab, setActiveTab ] = useState<string>('Profile')

    useEffect(()=> {
        setActiveTab(activeTab)
    }, [activeTab])

    return (
        <>
            <Dialog open={opEditProfile} as="div" className="relative z-10 cursor-default focus:outline-none" onClose={close}>
            <div className="fixed inset-0 bg-black bg-opacity-75" aria-hidden="true"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center">
                        <DialogPanel
                        transition
                        className="w-full min-h-screen md:w-[800px] md:min-h-0 md:h-[500px] bg-[#ffff] dark:bg-[#4444] p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 text-black dark:text-white flex flex-col md:flex md:flex-row">
                            <div className='md:h-full md:w-40 flex md:flex md:flex-col pr-3 sm:gap-2 md:gap-1'>
                                <h2 onClick={()=> setActiveTab('Profile')} className={`${activeTab === 'Profile' && 'bg-[#3333]'} py-2 sm:px-7 px-4 md:p-2 rounded-lg hover:bg-[#3333]`}>Profile</h2>
                                <h2 onClick={()=> setActiveTab('Orders')} className={`${activeTab === 'Orders' && 'bg-[#3333]'} py-2 sm:px-7 px-4 md:p-2 rounded-lg hover:bg-[#3333]`}>Orders</h2>
                                <h2 onClick={()=> setActiveTab('Appearance')} className={`${activeTab === 'Appearance' && 'bg-[#3333]'} py-2 sm:px-7 px-4 md:p-2 rounded-lg hover:bg-[#3333]`}>Appearance</h2>
                            </div>  
                            <div className='flex flex-grow md:px-4 md:py-2 mt-5 md:mt-0'>
                                {activeTab === 'Appearance' && <AppearanceTab/>}
                                {activeTab === 'Orders' && <OrdersTab/>}
                                {activeTab === 'Profile' && <ProfileTab/>}
                            </div>
                            <div className='absolute top-2 right-2 md:-top-2 md:-right-2'>
                                <X className='text-black p-1 bg-white rounded-full font-bold' size={25} strokeWidth={5} onClick={()=> setEdit(false)}/>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
            
        </>
    )
}

export default EditProfileForm
