import React from 'react'
import BoxItem from './BoxItem'               
import AddProduct from './AddProduct'

export default function HomePage() {

  return (
    <>
        <div className='w-full h-screen flex items-start flex-col'>
          <h1 className='foont-abc font-bold text-3xl cursor-default mt-14 xl:ml-64 pl-3'>Your Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 w-full xl:w-3/4 md:grid-cols-4 p-2 gap-2 xl:mt-0 BoxItemContainer xl:ml-64">
            <BoxItem 
            DataNumber={4}
            label='Incomplete'
            />

            <BoxItem 
            DataNumber={7}
            label='InReview'
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

          <h1 className='font-abc font-semibold mt-4 CreateProduct cursor-default px-4 xl:ml-64'>Create a New Product</h1>

          <div className='xl:ml-64 px-4 xl:pl-4 xl:pr-2 mt-2 w-full xl:w-3/4 AddProductBtn'>
          <AddProduct
          href='/SellerDashboard/Add-Product'
          label='Add new Product' 
          />
          </div>

        </div>
    </>
  )
}