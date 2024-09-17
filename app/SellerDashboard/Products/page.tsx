import React from 'react'
import NavBar from '../Components/Common/NavBar'
import ManageProducts from '../Components/Product Management/ManageProducts'

export default function Products() {
  return (
   <>
     <div className='w-full min-h-screen bg-gray-200'>
        <NavBar/>
       <ManageProducts/>
     </div>
   </>
  )
}
