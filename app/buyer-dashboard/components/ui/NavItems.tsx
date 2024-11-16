import { useRouter } from 'next/navigation'
import React from 'react'
import { useToggle } from '../../store/useToggle'
interface navProps {
    className: string
}

const NavItems = ({ className }: navProps) => {
    const router = useRouter()
    const { setToggle } = useToggle()
    const hover = 'hover:underline hover:text-white cursor-default'

    const Items = (item: string) => {
        switch (item) {
            case 'Home':
                router.push('/')
                setToggle(false)
            break;


            case 'All products':
                router.push('/buyer-dashboard/AllProducts')
                setToggle(false)
            break;

            case 'Popular':
                router.push('/buyer-dashboard/Popular')
                setToggle(false)
            break;

            case 'Shop':
                router.push('/buyer-dashboard/Shop')
                setToggle(false)
            break;
        
            default:
                break;
        }
    }

    return (
        <div className={className}>
            <h2 onClick={()=> Items('Home')} className={hover}>Home</h2>
            <h2 onClick={()=> Items('All products')} className={hover}>All products</h2>
            <h2 onClick={()=> Items('Popular')} className={hover}>Popular</h2>
            <h2 onClick={()=> Items('Shop')} className={hover}>Shop</h2>
        </div>
    )
}

export default NavItems