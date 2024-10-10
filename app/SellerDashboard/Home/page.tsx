"use client"
import React from 'react'
import NavBar from '../Components/Common/NavBar'
import HomePage from '../Components/Home/HomePage'

export default function Home() {

  return (
    <>
      <div className='w-full min-h-screen bg-white'>
          <NavBar/>
          <HomePage/>
      </div>
    </>    
  )
}






