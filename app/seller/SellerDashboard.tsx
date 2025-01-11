"use client"
import React, { useEffect } from 'react';
import { Header, Sidebar, Footer } from './layout/index'
import { useSideBarState } from './state/Sidebar';
import { HelpSupportPage, OrdersPage, AddProduct, ManageProducts, InventoryPage, ProfilePage, PaymentPage, CustomerPage, SupportPage, MyAccount, Calendar } from './pages/index'
import Overview from './pages/Overview';
import { useUser } from './state/User'

export default function SellerDashboardLayout() {
    const { activeTab } = useSideBarState()
    const { setUser } = useUser()

    useEffect(()=> {
        const storedUser = localStorage.getItem('user');
        const user = JSON.parse(storedUser!)
        setUser(user)
    }, [])

    return (
        <div className='h-screen text-black bg-[#FAFAFA] dark:bg-[#FAFAFA] cursor-default'>
            <div className='flex h-full flex-1 overflow-hidden'>
                <div className='lg:w-80 lg:h-full fixed top-[140px] lg:top-0 lg:relative hidden sm:flex flex-col justify-center lg:justify-start bg-[#FAFAFA] lg:bg-[#1B2130] text-gray-300 z-10'>
                    <Sidebar />
                </div>
                <div className="relative w-screen flex-1 flex flex-col">
                    <Header />
                    <div className="flex-1 overflow-y-auto h-full"> 
                        {activeTab === 'Dashboard' && <Overview/>}
                        {activeTab === 'Orders' && <OrdersPage/>}
                        {activeTab === 'Help & Support' && <HelpSupportPage/>}
                        {activeTab === 'Add New Product' && <AddProduct/>}
                        {activeTab === 'Manage Products' && <ManageProducts/>}
                        {activeTab === 'Inventory' && <InventoryPage/>}
                        {activeTab === 'Profile' && <ProfilePage/>}
                        {activeTab === 'Payment Methods' && <PaymentPage/>}
                        {activeTab === 'Customer List' && <CustomerPage/>}
                        {activeTab === 'Messages/Support' && <SupportPage/>}
                        {activeTab === 'My Account' && <MyAccount/>}
                        {activeTab === 'Calendar' && <Calendar/>}
                    </div>
                </div>
                <footer className='sm:hidden bg-[#1B2130] fixed bottom-0 left-0 right-0 py-2 shadow-lg px-2'>
                    <Footer />
                </footer>
            </div>
        </div>
    );
}