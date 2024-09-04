import React from 'react'
import Slidebar from '../../Components/Slidebar'
import Inventory from '../../Components/Inventory'


export default function Page() {
  return (
    <>
    <div className="w-full h-screen flex bg-gray-900" style={{filter: 'drop-shadow(-8px 7px 0px #008000)'}}>
    <Slidebar/>
    <div className="lg:pt-3 lg:pb-3 lg:w-full w-full lg:pr-3 lg:pl-3">

    <div className="h-full bg-white pt-7 lg:ml-0 lg:rounded-3xl">

    <Inventory /> 
    
    </div>
    </div>
    </div>


   </>
  )
}
