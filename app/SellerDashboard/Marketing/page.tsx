import React from 'react'
import NavBar from '../Components/Common/NavBar'

export default function Page() {
  return (
    <>
         <div className='w-full h-screen bg-gray-200'>
        <NavBar/>
        <div className='w-full h-screen flex items-start flex-col'>
          <h1 className='mt-14 xl:mt-0 xl:ml-64'>Marketings</h1>
        </div>
     </div>
   </>
  )
}
