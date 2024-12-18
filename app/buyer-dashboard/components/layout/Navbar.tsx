import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import NavItems from '../ui/NavItems'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { searchData } from '../../axios/dataStore'
import { useUser } from '../../store/User'
import { Popover } from '@headlessui/react'

interface NavbarProps {
    className?: string
    isOpen: boolean
}

const Navbar = ({ className, isOpen }: NavbarProps) => {
    const [ search, setSearch ] = useState('')
    const { user } = useUser()
    const [ history, setHistory ] = useState<string[]>([])
    const router = useRouter()
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const SearchHover = 'text-sm py-1 font-semibold px-2 rounded hover:bg-[#3333]'

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const details = {
                userId: user?._id,
                search
            }
            await searchData.put('', details, { withCredentials: true })
            setSearch('');
        }
    };

    useEffect(()=> {
        if (user?.SearchData) {
            setHistory(user.SearchData);
        }
    }, [user])

    return (
        <>
        <nav className={className}>
            <div className='flex items-center md:gap-16 xl:gap-32 cursor-default'>
                <div className='flex items-center gap-10'>
                    <div className="logo flex items-center" onClick={()=> router.push('/')}>
                        <Image
                            alt='logo Image'
                            width={40}
                            height={40}
                            src="/assets/logo.png"
                            placeholder='blur'
                            blurDataURL='data:image/svg+xml;base64,...'
                            className='h-full w-full block dark:hidden'
                        />
                        <Image
                            alt='Whitelogo Image'
                            width={40}
                            height={40}
                            src="/assets/whiteLogo.png"
                            placeholder='blur'
                            blurDataURL='data:image/svg+xml;base64,...'
                            className='h-full w-full hidden dark:block'
                        />
                        <h2 className='text-sm font-bold'>Bazaar</h2>
                    </div>
                    <NavItems className="cursor-default flex gap-3 items-center text-sm text-gray-500"/>
                </div>
                <Popover className="relative md:w-2/5">
                    <>
                        <div className="relative w-full">
                            <input
                            type="search"
                            value={search}
                            onFocus={() => setIsPopoverOpen(true)}
                            onBlur={() => setTimeout(() => setIsPopoverOpen(false), 10)}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-transparent border w-full rounded-md h-10 text-sm pl-2 pr-7 text-gray-800 dark:text-white outline-none"
                            placeholder="Search for products..."
                            />
                            <div className={`absolute inset-y-0 right-3 flex items-center ${isOpen ? 'hidden' : 'absolute'}`}>
                                <Search strokeWidth={1.4} color="gray" size={15} />
                            </div>
                        </div>
                        {isPopoverOpen && (
                            <Popover.Panel
                            className="absolute z-10 mt-1 w-full dark:bg-opacity-90 dark:backdrop-blur-sm backdrop-blur-md md:border dark:border-black dark:bg-black dark:text-white rounded-md shadow-lg text-gray-500"
                            static
                            >
                                <div className="flex flex-col p-2">
                                    {user?.Role === 'buyer' ? (
                                        <>
                                            {history.map((history)=> (
                                                <h2 className={SearchHover}>{history}</h2>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            <h2 className={SearchHover}>Air Jordan 4 Retro 'White Thunder'</h2>
                                            <h2 className={SearchHover}>Adidas Samba</h2>
                                            <h2 className={SearchHover}>New Balance 9060</h2>
                                            <h2 className={SearchHover}>Nike Zoom Vomero 5</h2>
                                            <h2 className={SearchHover}>Veja Campo</h2>
                                            <h2 className={SearchHover}>Levi's 501 Original Jeans</h2>
                                            <h2 className={SearchHover}>Hoka One One Bondi 8</h2>
                                            <h2 className={SearchHover}>Carhartt WIP Detroit Jacket</h2>
                                            <h2 className={SearchHover}>Patagonia Better Sweater Fleece Jacket</h2>
                                            <h2 className={SearchHover}>Zara Satin Slip Dresses</h2>
                                        </>
                                    )}
                                </div>
                            </Popover.Panel>
                        )}
                    </>
                </Popover>
            </div>
        </nav>
        </>
    )
}

export default Navbar
