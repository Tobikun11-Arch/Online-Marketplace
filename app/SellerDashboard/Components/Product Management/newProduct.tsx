"use client"
import React, {useEffect, useState} from 'react'
import {ChevronLeft, CircleHelp, Star} from 'lucide-react'
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
import { useRouter } from 'next/navigation'
import { useLoading, useSchedule } from '../../hooks/ReusableHooks'
import { pinwheel } from 'ldrs'
import {Cloudinary, ProductApi} from '../../axios/axios'
import Schedule from './Schedule'

export default function NewProduct() {
  const { 
    productName, productDescription, productCategory, productQuality, 
    productQuantity, Sku, productSize, productPrice, productDiscount, 
    productWeight, productImages, previewImages, setPreviewImages, 
    setProductImages, setProductName, setProductDescription, setProductCategory, 
    setProductQuality, setProductQuantity, setSku, setProductWeight, 
    setProductSize, setProductPrice, setProductDiscount 
  } = UseProductStore();

  const { isLoadingPublish, setLoadingPublish, isLoadingDiscard, setLoadingDiscard, setLoadingSchedule, isLoadingSchedule, isError, setError } = useLoading()
  const { setSchedule, isSchedule, DateSchedule, TimeSchedule, setTime, setDate } = useSchedule()
  const [ featured, setFeature ] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      pinwheel.register()
    }
  }, []);

  const isNumber = (value: string) => /^\d*$/.test(value);

  const handleStatusChange = async (status: 'Published' | 'Unpublished' | 'Scheduled', type: 'publish' | 'discard' | 'schedule') => {

    if (
      !productName               || !productDescription    ||
      !productCategory           || !productQuality        || 
      !productQuantity           || !isNumber(productQuantity) ||
      !productSize.length        || !isNumber(productSize.length) ||
      !productSize.breadth       || !isNumber(productSize.breadth) ||
      !productSize.width         || !isNumber(productSize.width) ||
      !productWeight.Weight      || !isNumber(productWeight.Weight) ||
      !productPrice              || !isNumber(productPrice)       
      || !isNumber(productDiscount) ||
      productImages.length <= 2 
    ) {
    // If validation fails, log the error
    setError(true)
    return;
  } 
  
  else {
    // If all validations pass, log the product details
    const token = localStorage.getItem('token');
        if (!token) {
            router.push('/');
            return;
        }

        if (type === 'publish') {
          setLoadingPublish(true);
        } 
        else if (type === 'discard') {
          setLoadingDiscard(true);
        }
        else {
          setLoadingSchedule(true)
        }

        

        try {
          const uploadPromises = productImages.map(async (image:any, index) => {
              if (!(image instanceof File)) {
                  throw new Error(`Image ${index + 1} is not a valid file object`);
              }

              const imgData = new FormData();
              imgData.append('file', image);
              imgData.append('upload_preset', 'Onlinemarket');

              const response = await Cloudinary.post('', imgData);
              const data = response.data;
              return data.secure_url;
          });

          const cloudinaryUrls = await Promise.all(uploadPromises);

          if (status === 'Scheduled') {
            if (!TimeSchedule || !DateSchedule) {
              setLoadingSchedule(false)
              return;
            }
          }

          const ScheduleData = {
            TimePublish: TimeSchedule,
            DatePublish: DateSchedule
          }

          const productData = {
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
            images: cloudinaryUrls, 
            status: status,
            ScheduleDate: ScheduleData || undefined,
            Featured: featured ? 'Featured' : 'not feature'
          };

          await ProductApi.post('', productData, {
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
              },
          });

        setProductName('')
        setProductDescription('') 
        setProductCategory('') 
        setProductQuality('') 
        setProductQuantity('') 
        setSku('')
        setProductWeight('WeightIndicator', '')
        setProductWeight('Weight', '')
        setProductSize('length', '')
        setProductSize('breadth', '')
        setProductSize('width', '')
        setPreviewImages([])
        setProductImages([])
        setProductPrice('')
        setProductDiscount('')
        setTime('')
        setDate('')
        setSchedule(false)
        setError(false)
      } 

      catch (error) {
          console.error('Error making request:', error);
      }

      finally{
        if (type === 'publish') {
          setLoadingPublish(false);
        } 
        else if (type === 'discard') {
          setLoadingDiscard(false);
        }
        else {
          setLoadingSchedule(false)
        }
      }

    }
  }

  return (
    <>
      <main className='px-3 pb-3 pt-12 md:pt-12 xl:pt-0'>

          {isLoadingDiscard || isLoadingPublish ? 
          (<>
          <div className="w-full h-screen flex justify-center items-center fixed top-0 left-0 bg-black opacity-50 z-50">
            <div className="load">
                <l-pinwheel
                  size="70"
                  stroke="3.5"
                  speed="0.9" 
                  color="white" 
                ></l-pinwheel>
              </div>
          </div>
          </>) : ('')}

          {isSchedule ?
        (<>
        <div className="w-full h-screen flex justify-center items-center fixed top-0 left-0 z-50 px-5 sm:px-0">
          <div className="bg-gray-800 rounded-md py-5 pl-5 text-white">
            <Schedule/>

            <div className='pt-12 flex justify-between pr-5'> 
            <Button className='bg-gray-400 px-5 py-1 rounded-md text-black font-bold font-abc' onClick={()=> setSchedule(false)}>
                Cancel
            </Button>

            <Button className='bg-blue-800 px-8 py-1 rounded-md text-white font-bold font-abc' onClick={()=> handleStatusChange('Scheduled', 'schedule')}>
                Post
            </Button>

            {isLoadingSchedule ? 
          (<>
          <div className="w-full h-screen flex justify-center items-center fixed top-0 left-0 bg-black opacity-50 z-50">
            <div className="load">
                <l-pinwheel
                  size="70"
                  stroke="3.5"
                  speed="0.9" 
                  color="white" 
                ></l-pinwheel>
              </div>
          </div>
          </>) : ('')}
       </div>
          </div>
        </div>
        </>) : ('')}


        <Link href={'/SellerDashboard/Home'}>
        <div className='flex items-center h-10 xl:ml-60'>
        <ChevronLeft/>
        <h1 className='font-abc font-bold text-xl cursor-default'>Add New Product</h1>
        </div>
        </Link>

        <section className='h-full w-full md:flex'>
          <div className="parent1 bg-white px-2 md:w-2/3 py-3 xl:ml-60">

              <div className="flex justify-between items-center">
              <h1 className='font-bold pb-1'>Description</h1>
              <p className='text-xs xl:text-base text-gray-400'>Please fill in all the fields.</p>
              </div>
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
                  placeholder='e.g., 10'
                  pattern='\d*'
                  value={productQuantity}
                /> 
                {isNumber(productQuantity) ? '' : (<><p className='text-red-600 font-abc text-xs'>Please Input an number</p></>)}
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
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1 pb-1">
                <h1 className='font-bold'>Product Images</h1>
                <CircleHelp size={15} color='gray'/>
              </div>
              <Star
              onClick={()=> setFeature(prev => !prev)}
              fill={featured ? 'yellow' : 'transparent'}
              size={20}
              />
            </div>
            <div className="merge border border-gray-300 p-4 rounded-sm">
              <ProductImages/>
              {isError ? 
              (<>
              {productImages.length <= 2 ? (<><p className='text-red-600 font-abc text-xs'>Upload 3 images of your product</p></>) : '' }
              </>) 
              : 
              ''}
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
                placeholder='e.g., 50'
                pattern='\d*'
                value={productWeight.Weight}
              />

              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Weight
                className='bg-transparent text-gray-400'
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProductWeight('WeightIndicator', e.target.value)}
                value={productWeight.WeightIndicator || 'kg'}
                />
              </div>
              </div>
              {isNumber(productWeight.Weight ) ? '' : (<><p className='text-red-600 font-abc text-xs'>Please Input an number</p></>)}

              <h3 className='text-sm pt-2'>Package Size</h3>
              <PackageSize/>
              {isNumber(productSize.breadth) && isNumber(productSize.length) && isNumber(productSize.width) ? '' : (<><p className='text-red-600 font-abc text-xs'>Please Input an number</p></>)}
            </div>

            <h1 className='font-bold mt-4 pb-1'>Pricing</h1>
            <div className="merge border border-gray-300 p-4 rounded-sm">
              <Pricing/>
              {isNumber(productPrice) && isNumber(productDiscount) ? '' : (<><p className='text-red-600 font-abc text-xs'>Please Input an number</p></>)}
            </div>

            <div className='mt-3 flex justify-between pb-3'>
              <Button className='rounded-lg font-bold font-abc px-4 py-1 border border-gray-400' onClick={()=> handleStatusChange('Unpublished', 'discard')}>Discard</Button>
              <div className="Save flex gap-2">
                <Button className='rounded-lg font-bold font-abc bg-gray-200 px-4 py-1 text-blue-600' onClick={()=> setSchedule(true)}>Schedule</Button>
                <Button className='rounded-lg font-bold font-abc px-4 py-1 bg-blue-600 text-white'  onClick={() => handleStatusChange('Published', 'publish')}>Publish</Button>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}