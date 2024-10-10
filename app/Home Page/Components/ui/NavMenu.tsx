"use client"
import React, { useState } from 'react';

const NavMenu = () => {
    const [selected, setSelected] = useState('Home');

    return (
        <div>
            <ul className="flex gap-16 items-center cursor-pointer">
                {['Home', 'Shop', 'About', 'Blog', 'Contact'].map((item) => (
                    <li
                        key={item}
                        className={`${
                            selected === item ? 'text-black' : 'text-gray-500 hover:text-gray-400'
                        }`}
                        onClick={() => setSelected(item)}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NavMenu;
