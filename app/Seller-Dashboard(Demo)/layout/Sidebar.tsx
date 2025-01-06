"use client"
import Image from 'next/image'
import React from 'react'
import { House, Truck } from 'lucide-react'
import TabItem from '../components/TabItem'
import { useSideBarState } from '../state/Sidebar'
import ProductsTab from '../components/SelectTab/ProductsTab'

const Sidebar = () => {
    const { activeTab, setActiveTab } = useSideBarState()


    return (
        <div className='px-5 py-5'>
            <div className='flex items-center gap-1'>
                <Image
                width={50}
                height={50}
                src="/assets/sajubazaarlogo.png"
                alt='SajuBazaar logo'
                />
                <h2 className='font-bold'><span className='text-blue-600'>Saju</span>Bazaar</h2>
            </div>

            {/**Menus */}
            <div className='mt-10 font-medium text-base flex flex-col gap-1'>
                <TabItem
                    icon={House}
                    label="Dashboard"
                    isActive={activeTab === 'Dashboard'}
                    onClick={() => setActiveTab('Dashboard')}
                />
                <ProductsTab/>
                <TabItem
                    icon={Truck}
                    label="Orders"
                    isActive={activeTab === 'Orders'}
                    onClick={() => setActiveTab('Orders')}
                />
            </div>
        </div>
    )
}

export default Sidebar
