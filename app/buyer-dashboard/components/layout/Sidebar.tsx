import React, { useEffect } from 'react'
import { X, Search } from 'lucide-react'
import NavItems from '../ui/NavItems'
import { useSearch } from '../../store/userSearch'
import { useUser } from '../../store/User'
import { searchData } from '../../axios/dataStore'
import { useProductData } from '../../store/storeProduct'
const fuzz = require('fuzzball');
import { useRouter } from 'next/navigation'
import { useToggle } from '../../store/useToggle'

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

const Sidebar = ({ isOpen, onClose } : SidebarProps) => { 
    const { setSearch, search } = useSearch()
    const { user, setuser } = useUser()
    const {  setHandler, product } = useProductData()
    const { setToggle } = useToggle()
    const router = useRouter()

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

    const searchMobile = async() => {
            if(search === "") {
                //No search
            }
            else {
                if(user) {
                    const details = {
                        userId: user?._id,
                        search
                    }
                    await searchData.put('', details, { withCredentials: true }) //add new search on database
                    setuser({
                        ...user,
                        SearchData: [...user.SearchData, search]
                    });
                }   
                const product_search = product.map(product => ({
                    product,
                    search_similarity: fuzz.ratio(product.productName, search),
                }));
                const filter_average = product_search.filter(item  => item.search_similarity > 70)
                const product_data = filter_average.map(item => item.product)
                setToggle(false)
                router.push('/buyer-dashboard/AllProducts')
                setHandler(product_data)
            }
        }

    return (
        <div className={`h-screen  bg-white z-50 fixed top-0 left-0 w-full transition-transform transform text-black p-4 flex flex-col gap-2 dark:bg-black cursor-default dark:text-white ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <X className='p-2 border rounded-lg' strokeWidth={1.7} size={40} onClick={onClose}/>
            <div className="relative w-full">
                <input type='search'
                value={search}
                onChange={(e) => setSearch(e.target.value)} 
                className='bg-transparent border w-full rounded-md h-12 text-base pl-2 pr-7 text-gray-800 dark:text-white outline-none' placeholder='Search for products...'/>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Search strokeWidth={2} className='text-black dark:text-white' size={15} onClick={searchMobile}/>
                </div>
            </div>
            <NavItems className='navItems cursor-default'/>
        </div>
    )
}

export default Sidebar