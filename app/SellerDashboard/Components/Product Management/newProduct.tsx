"use client"
import React from 'react'
import {ChevronLeft, Images} from 'lucide-react'
import Input from '../../NewProduct/Prototype/Input'
import TextArea from '../../NewProduct/Prototype/TextArea'
import Category from '../Common/Category'
import Condition from './Condition'
import Weight from '../../NewProduct/Prototype/Weight'

export default function newProduct() {

  const handleChange = () => {

  }

  return (
    <>
      <main className='px-3 pb-3 pt-14 md:pt-14'>

        <div className='flex items-center h-10'>
        <ChevronLeft/>
        <h1 className='font-abc font-bold text-xl'>Add New Product</h1>
        </div>

        <section className='h-full w-full md:flex gap-4'>
          <div className="parent1 bg-white px-5 md:w-2/3 py-5 ">

            <h1 className='font-bold'>Description</h1>
              <div className="merge border border-gray-300 p-4 rounded-sm">
                <h3 className='text-sm'>Product Name</h3>
                <Input
                className='w-full pl-2 bg-white h-10 rounded-lg outline-none border border-gray-300'
                onChange={handleChange}
                type='text'
                id=''
                accept=''
                style={{}}
                required={true}
                />
                <h3 className='text-sm pt-1'>Business Description</h3>
                <TextArea
                name=''
                id=''
                className='w-full bg-white h-36 rounded-lg outline-none resize-none border border-gray-300 p-2'
                />
              </div>

              <h1 className='font-bold mt-4 pb-1'>Category & Quality</h1>
            <div className="merge border border-gray-300 p-4 rounded-sm">
              <h3 className='text-sm'>Product Category</h3>
              <Category
              className= 'select border-slate-300 text-black bg-white w-full'
              onChange={handleChange}
              value=''
              />

              <h3 className='text-sm pt-1'>Product Quality</h3>
              <Condition
              onChange={handleChange}
              className='select border-slate-300 text-black bg-white w-full'
              value=''
              />
            </div>

            <h1 className='font-bold mt-4 pb-1'>Inventory</h1>
            <div className="merge border border-gray-300 p-4 rounded-sm">
              <h3 className='text-sm'>Quantity</h3>
              <Input
                className='w-full pl-2 bg-white h-10 rounded-lg outline-none border border-gray-300'
                onChange={handleChange}
                type='text'
                id=''
                accept=''
                style={{}}
                required={true}
              />

              <h3 className='text-sm pt-1'>SKU (Optional)</h3>
              <Input
                className='w-full pl-2 bg-white h-10 rounded-lg outline-none border border-gray-300'
                onChange={handleChange}
                type='text'
                id=''
                accept=''
                style={{}}
                required={false}
              />
            </div>
          </div>

          <div className='parent2 bg-white pt-5 px-5 md:w-2/4'>

            <h1>Product Images</h1>
            <div className="merge border border-gray-300 p-4 rounded-sm">
              <div className='box1 flex gap-3'>
                <div className='h-36 w-2/4 bg-white border-2 border-dashed border-gray-400 flex flex-col justify-center items-center'>
                  <Images />
                  <p className='text-xs'>Browse Images</p>
                </div>
                <div className='h-36 w-2/4 bg-gray-300'>
                  <div className=''></div>
                </div>
              </div>

               <div className='box2 flex gap-3 pt-3'>
                 <div className='h-36 w-2/4 bg-gray-300'>
                  <div className=''></div>
                </div>
                 <div className='h-36 w-2/4 bg-gray-300'>
                  <div className=''></div>
                </div>
               </div>
            </div>

            <h1 className='font-bold mt-4 pb-1'>Shipping & Delivery</h1>
            <div className="merge border border-gray-300 p-4 rounded-sm">
              <h3 className='text-sm'>Items Weight</h3>
              <div className="relative w-full max-w-md">
              <Input
                className='w-full pl-2 bg-white h-10 rounded-lg outline-none border border-gray-300'
                onChange={handleChange}
                type='text'
                id=''
                accept=''
                style={{}}
                required={true}
              />

              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Weight
                className='bg-transparent text-gray-400'
                onChange={handleChange}
                value={''}
                />
              </div>
              </div>

              <h3 className='text-sm pt-1'>Package Size</h3>
              <Input
                className='w-full pl-2 bg-white h-10 rounded-lg outline-none border border-gray-300'
                onChange={handleChange}
                type='text'
                id=''
                accept=''
                style={{}}
                required={false}
              />
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
