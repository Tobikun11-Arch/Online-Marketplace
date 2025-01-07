"use client"
import Image from 'next/image'
import React from 'react'
import { House, Truck } from 'lucide-react'
import TabItem from '../components/TabItem'
import { useSideBarState } from '../state/Sidebar'
import { ProductsTab, SettingsTab, CustManagementTab } from '../components/SelectTab/index'


const Sidebar = () => {
    const { activeTab, setActiveTab } = useSideBarState()

    return (
        <div className='lg:px-5 py-5 bg-[#1B2130] lg:bg-inherit rounded-2xl px-2 ml-1'>
            <div className='flex items-center gap-1'>
                <Image
                width={50}
                height={50}
                src="/assets/sajubazaarlogo.png"
                alt='SajuBazaar logo'
                />
                <h2 className='font-bold hidden lg:block'><span className='text-blue-600'>Saju</span>Bazaar</h2>
            </div>

            {/**Menus */}
            <div className='mt-10 font-medium text-base flex flex-col gap-1'>
                <TabItem
                    icon={House}
                    label="Dashboard"
                    isActive={activeTab === 'Dashboard'}
                    onClick={() => setActiveTab('Dashboard')}
                    tooltip='Dashboard'
                />
                <ProductsTab/>
                <TabItem
                    icon={Truck}
                    label="Orders"
                    isActive={activeTab === 'Orders'}
                    onClick={() => setActiveTab('Orders')}
                    tooltip='Orders'
                />
                <SettingsTab/>
                <CustManagementTab/>
                <TabItem
                    icon={Truck}
                    label="Help & Support"
                    isActive={activeTab === 'Help & Support'}
                    onClick={() => setActiveTab('Help & Support')}
                    tooltip='Help & Support'
                />
            </div>
        </div>
    )
}

export default Sidebar
