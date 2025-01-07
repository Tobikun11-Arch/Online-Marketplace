"use client"
import React from 'react'
import { House, Truck, Headset } from 'lucide-react'
import TabItem from '../components/TabItem'
import { useSideBarState } from '../state/Sidebar'
import { ProductsTab, SettingsTab, CustManagementTab } from '../components/SelectTab/index'

const Footer = () => {
    const { activeTab, setActiveTab, setMainTab } = useSideBarState()
    const handleTab = (tab: string) => {
        setActiveTab(tab)
        setMainTab('')
    }

    return (
        <div className='flex gap-1 justify-center text-white'>
            <TabItem
                icon={House}
                label="Dashboard"
                isActive={activeTab === 'Dashboard'}
                onClick={()=> handleTab('Dashboard')}
                tooltip='Dashboard'
            />
            <ProductsTab/>
            <TabItem
                icon={Truck}
                label="Orders"
                isActive={activeTab === 'Orders'}
                onClick={()=> handleTab('Orders')}
                tooltip='Orders'
            />
            <SettingsTab/>
            <CustManagementTab/>
            <TabItem
                icon={Headset}
                label="Help & Support"
                isActive={activeTab === 'Help & Support'}
                onClick={()=> handleTab('Help & Support')}
                tooltip='Help & Support'
            />
        </div>
    )
}

export default Footer
