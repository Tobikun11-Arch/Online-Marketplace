import React from 'react'
import NavBar from '../Components/NavBar'
import ProductDetails from '../Components/ProductDetails'

export default function Page() {
  return (
    <>
      <div className="w-full h-min bg-gray-200 flex">
        <NavBar />
        <div className="w-full flex-grow overflow-y-scroll flex justify-center">
            <ProductDetails />
         </div>
      </div>  
    </>
  )
}
