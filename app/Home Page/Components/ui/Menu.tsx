"use client"
import React from 'react'
import { useNavMenu, useOpen } from '../../State Handlers/StateHnadler'
import Link from 'next/link';

interface Menuprops {
    className: string;
}

const Menu = ({className}: Menuprops) => {
    const { setOpen } = useOpen()
    const { selected, setSelected } = useNavMenu()

    return (
        <ul className={className} onClick={()=> setOpen(false)}>
            {['Home', 'About', 'Blog', 'Contact'].map((item) => (
                <li
                    key={item}
                    className={`${
                        selected === item ? 'text-black' : 'text-gray-500 hover:text-gray-400'
                    }`}
                    onClick={() => setSelected(item)}>  

                <Link href={`#${item}`}>{item}</Link>
                </li>
            ))}
        </ul>
    )
}

export default Menu
