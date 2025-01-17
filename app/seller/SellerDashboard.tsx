"use client"
import React, { useEffect } from 'react';
import { Header, Sidebar, Footer } from './layout/index'
import { useSideBarState } from './state/Sidebar';
import { HelpSupportPage, OrdersPage, AddProduct, ManageProducts, InventoryPage, ProfilePage, PaymentPage, CustomerPage, SupportPage, MyAccount, Calendar, Overview, ViewProduct, EditProduct } from './pages/index'
import { useUser } from './state/User'

export default function SellerDashboardLayout() {
    const { activeTab } = useSideBarState()
    const { setUser } = useUser()

    useEffect(()=> {
        const storedUser = localStorage.getItem('user');
        if(storedUser) {
            const user = JSON.parse(storedUser!)
            setUser(user)
        } else {
            console.log("No stored user found")
        }
    }, [])

    const tabComponents: Record<string, JSX.Element> = {
        'Dashboard': <Overview />,
        'Orders': <OrdersPage />,
        'Help & Support': <HelpSupportPage />,
        'Add New Product': <AddProduct />,
        'Manage Products': <ManageProducts />,
        'Inventory': <InventoryPage />,
        'Profile': <ProfilePage />,
        'Payment Methods': <PaymentPage />,
        'Customer List': <CustomerPage />,
        'Messages/Support': <SupportPage />,
        'My Account': <MyAccount />,
        'Calendar': <Calendar />,
        'ViewProduct': <ViewProduct/>,
        'EditProduct': <EditProduct/>
    };

    return (
        <div className='h-screen text-black bg-[#FAFAFA] dark:bg-[#FAFAFA] cursor-default'>
            <div className='flex h-full flex-1 overflow-hidden'>
                <div className='lg:w-80 lg:h-full fixed top-[140px] lg:top-0 lg:relative hidden sm:flex flex-col justify-center lg:justify-start bg-[#FAFAFA] lg:bg-[#1B2130] text-gray-300 z-10'>
                    <Sidebar />
                </div>
                <div className="relative w-screen flex-1 flex flex-col">
                    <Header />
                    <div className="flex-1 overflow-y-auto h-full"> 
                        {tabComponents[activeTab] || <Overview />}
                    </div>
                </div>
                <footer className='sm:hidden bg-[#1B2130] fixed bottom-0 left-0 right-0 py-2 shadow-lg px-2'>
                    <Footer />
                </footer>
            </div>
        </div>
    );
}