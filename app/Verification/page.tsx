import React from 'react'
import './verified.css'

export default function page() {
  return (
    <>
    
    <div className="w-full h-screen bg-gray-900 flex justify-center items-center">

    <div className="success-checkmark">
  <div className="check-icon">
    <span className="icon-line line-tip"></span>
    <span className="icon-line line-long"></span>
    <div className="icon-circle"></div>
    <div className="icon-fix"></div>
  </div>
  <button className='text-white mt-5 bg-green-600 px-6 py-1'><a href="https://online-marketplace-beta.vercel.app">Login</a></button>

</div>

    </div>
    
    </>
  )
}
