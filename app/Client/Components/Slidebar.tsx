"use client"
import React, { useState, useEffect } from 'react'
import AsideValue from './AsideValue'
import { Menu } from 'lucide-react';

export default function Slidebar() {

  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleResize = () => {

      if (window.matchMedia('(min-width: 1024px)').matches) {
        setShow(false); // Close the sidebar if in lg size
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  

  return (
    <>

    <div className="lg:hidden ml-5 pt-5 fixed">
    <Menu size={44} color="#000000" onClick={() => setShow(true)} />
    </div>

    <aside className={`border-r-2 border-r-black h-screen w-96 bg-white ${
          show ? 'block' : 'hidden'
        } lg:block ${show ? 'fixed' : ''} ${show ? 'w-64' : 'w-96'}`}>
          
      <AsideValue />

       {show ? (
        <>
        <div className='w-full flex justify-center'>
         <h1 className='font-bold text-black text-3xl mt-10 cursor-default' style={{filter: 'drop-shadow(-8px 7px 0px #008000)'}} onClick={() => setShow(false)}>X</h1>
         </div>
         </>
       ) : (
        ''
       )}
    </aside>

    
   
    </>
  )
}
