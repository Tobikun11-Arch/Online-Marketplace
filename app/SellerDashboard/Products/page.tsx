import React from 'react'
import NavBar from '../Components/NavBar'
import ManageProducts from '../Components/ManageProducts'

export default function Products() {
  return (
   <>
     <div className='w-full h-screen bg-gray-200'>
        <NavBar/>
       <ManageProducts/>
     </div>
   </>
  )
}
