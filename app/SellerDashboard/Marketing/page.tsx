import React from 'react'
import NavBar from '../Components/NavBar'

export default function Page() {
  return (
    <>
      <div className='w-full h-screen bg-gray-200 flex'>
        <NavBar/>

        <main className='ml-5'>
        <h1>Marketing</h1>
        </main>
        </div>
   </>
  )
}
