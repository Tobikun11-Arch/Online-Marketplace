import { useRouter } from 'next/navigation'
import React from 'react'

interface navProps {
    className: string
}

const NavItems = ({ className }: navProps) => {
    const router = useRouter()
    const hover = 'hover:underline hover:text-white'

    return (
        <div className={className}>
            <h2 onClick={()=> router.push('/buyer-dashboard/AllProducts')} className={hover}>All products</h2>
            <h2 onClick={()=> router.push('/buyer-dashboard/Popular')} className={hover}>Popular</h2>
            <h2 onClick={()=> router.push('/buyer-dashboard/Shop')} className={hover}>Shop</h2>
        </div>
    )
}

export default NavItems