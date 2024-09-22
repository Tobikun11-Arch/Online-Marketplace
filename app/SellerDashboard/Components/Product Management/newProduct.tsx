"use client"
import React from 'react'
import {ChevronLeft} from 'lucide-react'
import Input from '../../NewProduct/Prototype/Input'
import TextArea from '../../NewProduct/Prototype/TextArea'
import Category from '../Common/Category'
import Condition from './Condition'
import Weight from '../../NewProduct/Prototype/Weight'
import PackageSize from './PackageSize'
import Pricing from './Pricing'
import Button from '../Common/Button'
import Link from 'next/link'
import { UseProductStore } from '../../hooks/UseHooks'
import ProductImages from './ProductImages'

export default function newProduct() {
  const { 
    productName, 
    productDescription, 
    productCategory, 
    productQuality, 
    productQuantity, 
    Sku, 
    productSize,
    productPrice,
    productDiscount,
    productWeight, 
    productImages,
    message, 
    setProductName, 
    setProductDescription, 
    setProductCategory, 
    setProductQuality, 
    setProductQuantity, 
    setSku, 
    setProductWeight,  
    setMessage 
  } = UseProductStore();

  const handlePublish = () => {

    if (/^\d*$/.test(productQuantity)) {
        console.log("Number")

        console.table({
          "ProductName:": productName,
          "productDescription:": productDescription,
          "product Size": productSize,
          "Category": productCategory,
          "Quality": productQuality,
          "Price": productPrice,
          "Discount": productDiscount,
          "Sku": Sku,
          "Quantity": productQuantity,
          "Weight": productWeight,
          "productImages": productImages
        })  
    }

  }

  return (
    <>
      <main className='px-3 pb-3 pt-12 md:pt-12 xl:pt-0'>

        <Link href={'/SellerDashboard/Home'}>
        <div className='flex items-center h-10 xl:ml-60'>
        <ChevronLeft/>
        <h1 className='font-abc font-bold text-xl cursor-default'>Add New Product</h1>
        </div>
        </Link>

        <section className='h-full w-full md:flex'>
          <div className="parent1 bg-white px-2 md:w-2/3 py-3 xl:ml-60">

              <h1 className='font-bold pb-1'>Description</h1>
              <div className="merge border border-gray-300 p-4 rounded-sm">
                <h3 className='text-sm'>Product Name</h3>
                <Input
                className='w-full pl-2 bg-white h-10 rounded-lg outline-none border border-gray-300'
                onChange={(e) => setProductName(e.target.value)}
                type='text'
                id=''
                accept=''
                style={{}}
                required={true}
                value={productName}
                placeholder=''
                />
                <h3 className='text-sm pt-1'>Business Description</h3>
                <TextArea
                onChange={(e) => setProductDescription(e.target.value)}
                name=''
                id=''
                className='w-full bg-white h-36 rounded-lg outline-none resize-none border border-gray-300 p-2'
                value={productDescription}
                />
              </div>

              <h1 className='font-bold mt-4 pb-1'>Category & Quality</h1>
            <div className="merge border border-gray-300 p-4 rounded-sm">
              <h3 className='text-sm'>Product Category</h3>
              <Category
              className= 'select border-slate-300 text-black bg-white w-full'
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProductCategory(e.target.value)}
              value={productCategory}
              />

              <h3 className='text-sm pt-1'>Product Quality</h3>
              <Condition
              onChange={(e) => setProductQuality(e.target.value)}
              className='select border-slate-300 text-black bg-white w-full'
              value={productQuality}
              />
            </div>

            <h1 className='font-bold mt-4 pb-1'>Inventory</h1>
            <div className="merge border border-gray-300 p-4 rounded-sm lg:flex lg:gap-5">
              <div className="flex flex-col w-full">
                <h3 className='text-sm'>Quantity</h3>
                <Input
                  className='w-full pl-2 bg-white h-10 rounded-lg outline-none border border-gray-300'
                  onChange={(e) => setProductQuantity(e.target.value)}
                  type='text'
                  id=''
                  accept=''
                  style={{}}
                  required={true}
                  placeholder=''
                  value={productQuantity}
                />
              </div>

              <div className="flex flex-col w-full">
                <h3 className='text-sm pt-1 lg:pt-0'>SKU (Optional)</h3>
                <Input
                  className='w-full pl-2 bg-white h-10 rounded-lg outline-none border border-gray-300'
                  onChange={(e) => setSku(e.target.value)}
                  type='text'
                  id=''
                  accept=''
                  style={{}}
                  required={false}
                  placeholder=''
                  value={Sku}
                />
              </div>
            </div>
          </div>

          <div className='parent2 bg-white pt-3 px-2 md:w-2/4'>

            <h1 className='font-bold pb-1'>Product Images</h1>
            <div className="merge border border-gray-300 p-4 rounded-sm">
             <ProductImages/>
            </div>

            <h1 className='font-bold mt-4 pb-1'>Shipping & Delivery</h1>
            <div className="merge border border-gray-300 p-4 rounded-sm">
              <h3 className='text-sm'>Items Weight</h3>
              <div className="relative w-full">
              <Input
                className='w-full pl-2 bg-white h-10 rounded-lg outline-none border border-gray-300'
                onChange={(e) => setProductWeight('Weight', e.target.value)}
                type='text'
                id=''
                accept=''
                style={{}}
                required={true}
                placeholder=''
                value={productWeight.Weight}
              />

              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Weight
                className='bg-transparent text-gray-400'
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProductWeight('WeightIndicator', e.target.value)}
                value={productWeight.WeightIndicator}
                />
              </div>
              </div>

              <h3 className='text-sm pt-2'>Package Size</h3>
              <PackageSize/>
            </div>

            <h1 className='font-bold mt-4 pb-1'>Pricing</h1>
            <div className="merge border border-gray-300 p-4 rounded-sm">
              <Pricing/>
            </div>

            <div className='mt-3 flex justify-between pb-3'>
              <Button className='rounded-lg font-bold font-abc px-4 py-1 border border-gray-400'>Discard</Button>
              <div className="Save flex gap-2">
                <Button className='rounded-lg font-bold font-abc bg-gray-200 px-4 py-1 text-blue-600'>Schedule</Button>
                <Button className='rounded-lg font-bold font-abc px-4 py-1 bg-blue-600 text-white' onClick={handlePublish}>Publish</Button>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
