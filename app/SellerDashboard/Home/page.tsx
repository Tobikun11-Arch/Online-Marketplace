"use client"
import React from 'react'
import NavBar from '../Components/NavBar'
import BoxItem from '../Components/BoxItem'
import AddProduct from '../Components/AddProduct'

export default function Home() {

      const handleAddProducts = () => {

      }

  return (
    <>
      <div className="flex">
        <NavBar />
        <div className="flex flex-col ml-10 mt-5">
          <h1 className='foont-abc font-bold text-3xl cursor-default'>Your Dashboard</h1>

          <div className="flex gap-3 mt-4">
          <BoxItem 
          DataNumber={4}
          label='Incomplete'
          />

          <BoxItem 
          DataNumber={7}
          label='In Review'
          />

          <BoxItem 
          DataNumber={3}
          label='Published'
          />

          <BoxItem 
          DataNumber={2}
          label='Archived'
          />
          </div>

          <h1 className='font-abc font-semibold mt-4'>Create a New Product</h1>

          <AddProduct
          href='/SellerDashboard/Seller'
          onClick={handleAddProducts}
          label='Add new Product'
          />

          <h1 className='font-abc font-semibold text-xl mt-4'>Latest Activty</h1>

        </div>
      </div>
    </>    
  )
}
