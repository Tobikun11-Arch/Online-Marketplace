"use client"
import React, { useCallback, useState } from 'react'
import NavMenu from './ui/NavMenu'
import { User } from 'lucide-react'
import MenuProps from '../Components/ui/Menu'
import { useOpen } from '../State Handlers/StateHnadler'
import Theme from './ui/Theme'
import { useTokenValidation } from '../../userData/TokenValidation'

const NavBar = () => {
    const { isOpen, setOpen }= useOpen()
    const [ isUser, setUser ] = useState<boolean>(false)
    const toggleMenu = useCallback(()=> {
        setOpen(!isOpen)
    }, [isOpen])
    const { isToken } = useTokenValidation()

    return (
        <div className='h-20 flex justify-end md:justify-between items-center px-4 md:px-12 cursor-default'>
            {/* <div className="Menu flex gap-1 md:hidden">
                {isOpen ? (
                    ''
                ) : (
                    <Menu size={28} strokeWidth={1.5} className='md:hidden' onClick={toggleMenu}/>
                )}
            </div>  docs for next possible project if i will use burger for mobile view*/} 
            <h1 className='text-gray-500 font-medium text-2xl hidden md:block pb-1 dark:text-white'>Saju<span className='text-blue-800'>Baz</span>aar</h1>
            <div className="flex items-center gap-6">
                <User size={20} strokeWidth={1.5} onClick={()=> setUser(!isUser)}/>
                {isUser && (<>
                    <div className='fixed bg-white h-12 w-10 mt-20'>
                        {/**if the token exist === tommorow*/}
                        
                        {isToken ? (<><p className='text-black'>True</p></>):(<><p className='text-black'>False</p></>)}
                    </div>
                </>)}
                <Theme/>
            </div>

            {isOpen && (
                <>
                    <div className="fixed inset-0 bg-white dark:bg-gray-950 z-40" onClick={toggleMenu}></div>
                    <MenuProps className={`fixed inset-0 flex items-center justify-center z-50 flex-col gap-2`} />
                </>
            )}
        </div>
    )
}

export default NavBar
