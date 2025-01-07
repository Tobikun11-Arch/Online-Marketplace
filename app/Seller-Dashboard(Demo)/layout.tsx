"use client"
import React from 'react';
import { Header, Sidebar, Footer } from './layout/index'
import { useSideBarState } from './state/Sidebar';
import { HelpSupportPage, OrdersPage, AddProduct, ManageProducts, InventoryPage, ProfilePage, PaymentPage, CustomerPage, SupportPage } from './pages/index'

export default function SellerDashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const { activeTab } = useSideBarState()

    return (
        <div className='h-screen text-black bg-[#FAFAFA] dark:bg-[#FAFAFA] cursor-default'>
            <div className='flex h-screen'>
                <div className='lg:w-80 lg:h-full hidden sm:flex flex flex-col justify-center lg:justify-start bg-[#FAFAFA] lg:bg-[#1B2130] text-gray-300'>
                    <Sidebar />
                </div>
                <div className="fixed lg:relative w-screen">
                    <Header />
                    {activeTab === 'Dashboard' && children}
                    {activeTab === 'Orders' && <OrdersPage/>}
                    {activeTab === 'Help & Support' && <HelpSupportPage/>}
                    {activeTab === 'Add New Product' && <AddProduct/>}
                    {activeTab === 'Manage Products' && <ManageProducts/>}
                    {activeTab === 'Inventory' && <InventoryPage/>}
                    {activeTab === 'Profile' && <ProfilePage/>}
                    {activeTab === 'Payment Methods' && <PaymentPage/>}
                    {activeTab === 'Customer List' && <CustomerPage/>}
                    {activeTab === 'Messages/Support' && <SupportPage/>}
                </div>
                <footer className='sm:hidden bg-[#1B2130] fixed bottom-0 left-0 right-0 py-2 shadow-lg px-2'>
                    <Footer />
                </footer>
            </div>
        </div>
    );
}