import React, { useEffect } from 'react'
import { X, Search } from 'lucide-react'
import Input from '../common/Input'
import NavItems from '../ui/NavItems'
interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

const Sidebar = ({ isOpen, onClose } : SidebarProps) => { 

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; 
        } else {
            document.body.style.overflow = 'unset'; 
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <div className={`h-screen  bg-white z-50 fixed top-0 left-0 w-full transition-transform transform text-black p-4 flex flex-col gap-2 dark:bg-black dark:text-white ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <X className='p-2 border rounded-lg' strokeWidth={1.7} size={40} onClick={onClose}/>
            <div className="relative w-full">
                <Input type='search' className='bg-transparent border w-full rounded-md h-12 text-base pl-2 pr-7 text-gray-800 dark:text-white outline-none' placeholder='Search for products...'/>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Search strokeWidth={1.4} color='gray' size={15}/>
                </div>
            </div>
            <NavItems className='navItems cursor-default'/>
        </div>
    )
}

export default Sidebar
