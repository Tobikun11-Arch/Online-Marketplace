import React from 'react'
import { X } from 'lucide-react'

interface CartProps {
    isOpen: boolean
    onClose: () => void
}

const CartComponent = ({ isOpen, onClose } : CartProps) => {
    return (
        <div className={`h-screen bg-white fixed top-0 right-0 w-full transition-transform transform text-black p-4 flex flex-col gap-2 dark:bg-black dark:text-white ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-between items-center">
                <h2 className='text-lg font-bold'>My Cart</h2>
                <X className='p-2 border rounded-lg' strokeWidth={1.7} size={40} onClick={onClose}/>
            </div>
        </div>
    )
}

export default CartComponent
