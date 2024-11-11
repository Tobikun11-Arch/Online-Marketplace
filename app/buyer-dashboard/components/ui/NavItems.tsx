import { useRouter } from 'next/navigation'
import React from 'react'

interface navProps {
    className: string
}

const NavItems = ({ className }: navProps) => {
    const router = useRouter()

    return (
        <div className={className}>
            <h2 onClick={()=> router.push('/buyer-dashboard/AllProducts')}>All products</h2>
            <h2>Popular</h2>
            <h2>Shop</h2>
        </div>
    )
}

export default NavItems