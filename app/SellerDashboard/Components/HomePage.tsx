import React from 'react'
import BoxItem from './BoxItem'               
import AddProduct from './AddProduct'

export default function HomePage() {

  return (
    <>
        <div className='w-full h-screen flex items-start flex-col'>
          <h1 className='foont-abc font-bold text-3xl cursor-default mt-10 xl:ml-64 pl-3'>Your Dashboard</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 p-4 gap-4 xl:mt-0 h-60 md:h-24 xl:ml-64">
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

          <div className='xl:ml-64 pl-3'>
          <AddProduct
          href='/SellerDashboard/Add-Product'
          label='Add new Product'
          />
          </div>

        </div>
    </>
  )
}



{/* <h1 className='foont-abc font-bold text-3xl cursor-default'>Your Dashboard</h1>

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
href='/SellerDashboard/Add-Product'
onClick={handleAddProducts}
label='Add new Product'
/>

<h1 className='font-abc font-semibold text-xl mt-4'>Latest Activty</h1> */}
