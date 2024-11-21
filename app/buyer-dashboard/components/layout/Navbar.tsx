import React from 'react'
import Input from '../common/Input'
import { Search } from 'lucide-react'
import NavItems from '../ui/NavItems'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
interface NavbarProps {
    className?: string
    isOpen: boolean
}

const Navbar = ({ className, isOpen }: NavbarProps) => {
    const router = useRouter()

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
                <div className={`md:w-2/5 ${isOpen ? '' : 'relative'}`}>
                    <Input type='search' className='bg-transparent border w-full rounded-md h-10 text-sm pl-2 pr-7 text-gray-800 dark:text-white outline-none' placeholder='Search for products...'/>
                    <div className={`inset-y-0 right-0 flex items-center pr-3 ${isOpen ? 'hidden' : 'absolute'}`}>
                    <Search strokeWidth={1.4} color='gray' size={15}/>
                    </div>
                </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar
