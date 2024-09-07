"use client"
import React, { useState, useEffect } from 'react'
import { House, Box, Truck, ChartNoAxesCombined, Megaphone, Settings } from 'lucide-react';
import NavItem from './NavItem';
import IconHome from '../Home/IconHome';
import { Menu } from 'lucide-react';


export default function NavBar() {
            const [activeItem, setActiveItem] = useState<string | null>(null);

            useEffect(() => {
                if (typeof window !== 'undefined') {
                    const savedItem = localStorage.getItem('activeItem') || 'Dashboard';
                    setActiveItem(savedItem);  
                }
            }, []);

            useEffect(() => {
                if (activeItem !== null && typeof window !== 'undefined') {
                    localStorage.setItem('activeItem', activeItem);
                }
            }, [activeItem]);

            const handleItemClick = (item: string) => {    
                setActiveItem(item);
            };

            return (
            <>

            <div className="xl:hidden ml-5 pt-5 fixed">
             <Menu size={44} color="#000000" />
            </div>

            <nav className='xl:w-80 h-screen bg-gray-50 '>
            <ul className='pt-10 pl-10 hidden xl:block'>

            <NavItem
            icon={activeItem === 'Dashboard' ? <IconHome/> : <House/>}
            label="Dashboard"
            isActive={activeItem === 'Dashboard'}
            onClick={() => handleItemClick('Dashboard')}
            href='/SellerDashboard/Home'
            />

            <NavItem
            icon={<Box />}
            label="Manage Products"
            isActive={activeItem === 'Manage Products'}
            onClick={() => handleItemClick('Manage Products')}
            href='/SellerDashboard/Products'
            />

            <NavItem
            icon={<Truck />}
            label="Orders"
            isActive={activeItem === 'Orders'}
            onClick={() => handleItemClick('Orders')}
            href='/SellerDashboard/Orders'
            />

            <NavItem
            icon={<ChartNoAxesCombined />}
            label="Analytics"
            isActive={activeItem === 'Analytics'}
            onClick={() => handleItemClick('Analytics')}
            href='/SellerDashboard/Analytics'
            />

            <NavItem
            icon={<Megaphone />}
            label="Marketing"
            isActive={activeItem === 'Marketing'}
            onClick={() => handleItemClick('Marketing')}
            href='/SellerDashboard/Marketing'
            />

            <NavItem
            icon={<Settings />}
            label="Settings"
            isActive={activeItem === 'Settings'}
            onClick={() => handleItemClick('Settings')}
            href='/SellerDashboard/Settings'
            />

            </ul>
        </nav>
    </>
  )
}
