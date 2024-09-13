"use client"
import React, { useState } from 'react'
import OverallStorage from './OverallStorage'
import InStock from './InStock'
import OutofStock from './OutofStock'
import Draft from './Draft'

interface Select {
    OverallStorage: string | null;
    InStock: string | null;
    OutofStock: string | null;
    Draft: string | null;
}

export default function ManageProducts() {
    const [Selected, setSelect] = useState<Select>({
    OverallStorage: null,
    InStock: null,
    OutofStock: null, 
    Draft: null,  
    })


    //Make custom hooks for these 4 tommorow
    const handleStorage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSelect({...Selected, [name]: value})
    setSelect({ OverallStorage: value, InStock: null, OutofStock: null, Draft: null});
    }

    const handleInStock = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSelect({...Selected, [name]: value})
    setSelect({ OverallStorage: null, InStock: value, OutofStock: null, Draft: null});
    }

    const handleOutofStock = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSelect({...Selected, [name]: value})
    setSelect({ OverallStorage: null, InStock: null, OutofStock: value, Draft: null });
    }

    const handleDraft = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSelect({...Selected, [name]: value})
    setSelect({ OverallStorage: null, InStock: null, OutofStock: null, Draft: value });
    }

    return (
    <>
         <div className='w-full h-screen flex items-start flex-col'>
          <h1 className='mt-14 xl:mt-0 xl:ml-64 text-xl'>Manage Products</h1>
          <p className='text-xs'>You have 24 products in your catalog.</p>
          <input type="text" className='bg-white outline-none'/>

          <div className="flex">
          <OverallStorage
          onChange={handleStorage}
          value={Selected.OverallStorage || ''}
          />

          <InStock
          onChange={handleInStock}
          value={Selected.InStock || ''}
          />

          <OutofStock
          onChange={handleOutofStock}
          value={Selected.OutofStock || ''}
          />

          <Draft
          onChange={handleDraft}
          value={Selected.Draft || ''}
          />
          </div>
        </div>
    </>
  )
}
