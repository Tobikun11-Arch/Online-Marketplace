"use client"
import React, { useState } from 'react'
import OverallStorage from './OverallStorage'
import InStock from './InStock'
import OutofStock from './OutofStock'
import Draft from './Draft'
import ProductTable from './ProductTable'

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

  const handleSelectChange = (name: keyof Select, value: string) => {
  setSelect({
  OverallStorage: name === "OverallStorage" ? value : null,
  InStock: name === "InStock" ? value : null,
  OutofStock: name === "OutofStock" ? value : null,
  Draft: name === "Draft" ? value : null
  });
  }

  

  return (
  <>
  <div className='w-full h-screen flex items-start flex-col px-2'>
    <h1 className='mt-14 xl:mt-0 xl:ml-64 text-2xl font-bold'>Manage Products</h1>
    <p className='text-xs font-medium'>You have 0 products in your catalog.</p>
    <input type="text" placeholder='Search' className='bg-white outline-none rounded-md w-full px-2 mt-2 h-12'/>

    <div className="w-full flex items-center gap-x-2 pb-2 overflow-x-auto overflow-y-hidden">  
    <OverallStorage
    className='select text-black font-bold bg-white mt-3 font-abc'
    onChange={(e)=> handleSelectChange("OverallStorage", e.target.value)}
    value={Selected.OverallStorage || ''}
    />

    <InStock
    className="select text-black font-abc font-bold bg-white mt-3" 
    onChange={(e)=> handleSelectChange("InStock", e.target.value)}
    value={Selected.InStock || ''}
    />

    <OutofStock
    className="select text-black font-abc font-bold bg-white mt-3" 
    onChange={(e)=> handleSelectChange("OutofStock", e.target.value)}
    value={Selected.OutofStock || ''}
    />

    <Draft
    className="select font-abc font-bold text-black bg-white mt-3" 
    onChange={(e)=> handleSelectChange("Draft", e.target.value)}
    value={Selected.Draft || ''}
    />
    </div>

    <ProductTable/>
    </div>
    </>
  )
}
