import { useRouter } from 'next/navigation'
import React from 'react'
import { useToggle } from '../../store/useToggle'
interface navProps {
    className: string
}

const NavItems = ({ className }: navProps) => {
    const router = useRouter()
    const { setToggle } = useToggle()
    const hover = 'hover:underline dark:hover:text-white cursor-default text-black dark:text-white'

    const Items = (item: string) => {
        switch (item) {
            case 'Popular':
                router.push('/buyer-dashboard/Popular')
                setToggle(false)
            break;

            case 'All':
                router.push('/buyer-dashboard/AllProducts')
                setToggle(false)
            break;
        
            default:
                break;
        }
    }

    return (
        <div className={className}>
            <h2 onClick={()=> Items('Popular')} className={hover}>Popular</h2>
            <h2 onClick={()=> Items('All')} className={hover}>All products</h2>
        </div>
    )
}

export default NavItems