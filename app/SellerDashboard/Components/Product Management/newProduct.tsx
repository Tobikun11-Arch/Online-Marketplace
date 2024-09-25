"use client"
import React, {useEffect} from 'react'
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
import { useRouter } from 'next/navigation'
import { useLoading } from '../../hooks/ReusableHooks'
import { waveform } from 'ldrs'
import {Cloudinary, ProductApi} from '../../axios/axios'

export default function NewProduct() {
  const { 
    productName, productDescription, productCategory, productQuality, 
    productQuantity, Sku, productSize, productPrice, productDiscount, 
    productWeight, productImages, previewImages, message, setPreviewImages, 
    setProductImages, setProductName, setProductDescription, setProductCategory, 
    setProductQuality, setProductQuantity, setSku, setProductWeight, setMessage, 
    setProductSize, setProductPrice, setProductDiscount 
  } = UseProductStore();

  const { isLoading, setLoading } = useLoading();
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      waveform.register(); 
    }
  }, []);

  const handleStatusChange = async (status: 'Published' | 'Unpublished') => {
    const isNumber = (value: string) => /^\d*$/.test(value);

    if (
      !productName               || !productDescription    ||
      !productCategory           || !productQuality        || 
      !productQuantity           || !isNumber(productQuantity) ||
      !productSize.length        || !isNumber(productSize.length) ||
      !productSize.breadth       || !isNumber(productSize.breadth) ||
      !productSize.width         || !isNumber(productSize.width) ||
      !productWeight.Weight      || !isNumber(productWeight.Weight) ||
      !productPrice              || !isNumber(productPrice) ||
      !productDiscount           || !isNumber(productDiscount) ||
      productImages.length <= 2
    ) {
    // If validation fails, log the error
    setMessage("Failed to publish: One or more fields are invalid or empty.");
    return;
  } 
  
  else {
    // If all validations pass, log the product details
    const token = localStorage.getItem('token');
        if (!token) {
            router.push('/');
            return;
        }

        setLoading(true)

        try {
          const uploadPromises = productImages.map(async (image:any, index) => {
              if (!(image instanceof File)) {
                  throw new Error(`Image ${index + 1} is not a valid file object`);
              }

              const imgData = new FormData();
              imgData.append('file', image);
              imgData.append('upload_preset', 'Onlinemarket');
            

              const response = await Cloudinary.post('/image/upload', imgData);
              const data = response.data;
              return data.secure_url;
          });

          const cloudinaryUrls = await Promise.all(uploadPromises);

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
            status: status
          };

          await ProductApi.post('', productData, {
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
              },
          });

        setLoading(false)
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
        setMessage('')
      } 

      catch (error) {
          console.error('Error making request:', error);
          setMessage("Please Try again!")
      }

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
                  placeholder='e.g., 10'
                  pattern='\d*'
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
                placeholder='e.g., 50'
                pattern='\d*'
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
              <Button className='rounded-lg font-bold font-abc px-4 py-1 border border-gray-400' onClick={()=> handleStatusChange('Unpublished')}>
                {
                  isLoading ? (
                    <>
                    <div className="flex gap-2 items-center">
                      <l-waveform
                      size="15"
                      stroke="4"  
                      speed="4.5" 
                      color="blue" 
                      ></l-waveform>
                    </div>
                    </> 
                  ):('Discard')
                }
              </Button>
              <div className="Save flex gap-2">
                <Button className='rounded-lg font-bold font-abc bg-gray-200 px-4 py-1 text-blue-600'>Schedule</Button>
                <Button className='rounded-lg font-bold font-abc px-4 py-1 bg-blue-600 text-white' onClick={()=> handleStatusChange('Published')}>
                  {
                    isLoading ? (
                      <>
                      <div className="flex gap-2 items-center">
                          <l-waveform
                          size="15"
                          stroke="4"
                          speed="4.5" 
                          color="white" 
                        ></l-waveform>
                      </div>
                      </> 
                    ):('Publish')
                  }
                </Button>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}