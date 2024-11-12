import React, { useEffect } from 'react'
import { X, ShoppingCart } from 'lucide-react'

interface CartProps {
    isOpen: boolean
    onClose: () => void
}

const CartComponent = ({ isOpen, onClose } : CartProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Disable scrolling
        } else {
            document.body.style.overflow = 'unset'; // Enable scrolling
        }
        
        return () => {
            document.body.style.overflow = 'unset'; // Cleanup on unmount
        };
    }, [isOpen]);

    return (
        <div className={`h-screen z-50 bg-gray-200 bg-opacity-65 dark:bg-opacity-90 md:backdrop-blur-sm md:border dark:border-black border-white border-opacity-18 fixed top-0 right-0 w-full md:w-[350px] transition-transform transform text-black p-4 flex flex-col gap-2 dark:bg-black dark:text-white ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-between items-center">
                <h2 className='text-lg font-bold'>My Cart</h2>
                <X className='p-2 border rounded-lg' strokeWidth={1.7} size={40} onClick={onClose}/>
            </div>

            <h1>Cart is empty</h1>
        </div>
    )
}

export default CartComponent
