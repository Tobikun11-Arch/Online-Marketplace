"use client"
import React, { useState } from 'react'
import AddProducts from '../Svg/AddProducts'
import '../auth/Css/Background.css'

export default function addProducts() {

  const openModal = () => {
    const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <>
    
    <div className="h-full bg-white pt-7 lg:ml-0 lg:rounded-3xl">
 
    <div className="flex w-36 h-40 ml-7 bg-black rounded-xl flex-col items-center">
      <h1 className='text-white font-bold text-base mt-5'>Add Products</h1>
    
      <div className="mt-4">
      <AddProducts onClick={openModal}/>
      </div>

    </div>

  
    <h1 className='text-black font-bold text-2xl mt-6 ml-7 '>PRODUCTS:</h1>


     {/**Modal ======>*/}
     <dialog id="my_modal_3" className="modal">
        <div className="modal-box px-14 pt-14 pb-8 bg-white">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              aria-label="Close"
            >
              ✕
            </button>

          </form>
          <form >
      <div>
        <label htmlFor="product-name" className='mt-10'>Product Name:</label>
        <input type="text" id="product-name" placeholder='Shoes' className='border-b-2 marginLeft border-black outline-none' required />
      </div>

      <div className='flex flex-col'>
        <label htmlFor="product-description" className='mt-5'>Product Description:</label>
        <textarea id="product-description" className='border-b-2 border-l-2 border-black outline-none mt-2 pl-2 resize-none' placeholder='Enter product description (200 characters max)' maxLength={200} rows={5} required />
      </div>

      <div className='mt-5'>
        <label htmlFor="product-image">Product Image:</label>
        <input type="file" id="product-image" accept=".jpg, .jpeg, .png" required />
      </div>
      
      <div className="w-full flex justify-end">
        <p></p>
      <button type="submit" className='mt-10 bg-blue-800 p-2 text-white rounded-md'>Publish</button></div>
    </form>
        </div>

      </dialog>
   
    </div>
    </>
  )
}
