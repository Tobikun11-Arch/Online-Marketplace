import React from 'react'
import NewProduct from '../Components/Product Management/newProduct'
import NavBar from '../Components/Common/NavBar'

export default function Page() {
  return (
   <>
     <div className='w-full min-h-screen bg-white'>
     <NavBar/>
      <NewProduct />
     </div> 
   </>
  )
}
