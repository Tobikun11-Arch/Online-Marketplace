"use client"
import React, { useState, useEffect } from 'react'
import { useLoading, useSelectedProducts } from '../hooks/ReusableHooks'
import Condition from '../Components/Product Management/Condition'
import Category from '../Components/Common/Category'
import Weight from '../NewProduct/Prototype/Weight'
import { useRouter } from 'next/navigation'
import {Cloudinary, ProductApi} from '../axios/axios'
import { useProductDetails } from '../hooks/EditProduct'
import { spiral } from 'ldrs'

export default function Edit_ProductInformation() {
    const { productSelected } = useSelectedProducts()
    const router = useRouter()
    const { productName, productDescription, productCategory, productQuality, productQuantity, Sku, productWeight, productSize, productPrice, productDiscount,
            setProductName, setProductDescription, setProductCategory, setProductQuality, setProductQuantity, setSku, setProductWeight, setProductSize, setProductPrice,
            setProductDiscount, productImages
        } = useProductDetails()

useEffect(() => {
        if (productSelected) {
        setProductName(productSelected.productName || '');
        setProductDescription(productSelected.productDescription || '');
        setProductCategory(productSelected.productCategory || '');
        setProductQuality(productSelected.productQuality || '');
        setProductQuantity(productSelected.productQuantity || '');
        setSku(productSelected.Sku || '');
        setProductWeight('Weight', productSelected.productweight?.Weight || '');
        setProductWeight('WeightIndicator', productSelected.productweight?.WeightIndicator || 'kg');
        setProductSize('length', productSelected.productSize?.length || '');
        setProductSize('breadth', productSelected.productSize?.breadth || '');
        setProductSize('width', productSelected.productSize?.width || '');
        setProductPrice(productSelected.productPrice || '');
        setProductDiscount(productSelected.productDiscount || '');
        }
    }, [productSelected]);

    const productId = productSelected?.productId
    const { isError, setError, setLoadingPublish, isLoadingPublish } = useLoading()

    const Prod_Price = productSelected?.productPrice ? parseInt(productSelected?.productPrice.toString(), 10) : 0
    const Disc_Price = productSelected?.productDiscount ? parseInt(productSelected?.productDiscount.toString(), 10) : 0
    const Final_Price = Prod_Price - Disc_Price
    const product = productSelected?.productStatus

    useEffect(() => {
        if (typeof window !== 'undefined') {
            spiral.register()
        }
    }, []);

    const isNumber = (value: string) => /^\d*$/.test(value);

    const handleUploadEdit = async () => {

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
        )  {
        // If validation fails, log the error
        setError(true)
        return;
        } 

        else{
            // If all validations pass, log the product details
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/SellerDashboard/Products');
                return;
            }

            setLoadingPublish(true)

            try{
                const productData = {
                    productId,
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
                    images: productImages, 
                    status: 'Published',
                };

                await ProductApi.post('', productData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                router.push('/SellerDashboard/Products')
                setLoadingPublish(false)
                setError(false)

            }

            catch (error) {
                console.error('Error making request:', error);
            }
        }

    }

    return (
    <>
        <div className='w-full sm:flex mt-4'>

        {isLoadingPublish ? 
        (<>
        <div className="w-full h-screen flex justify-center items-center fixed top-0 left-0 bg-black opacity-50 z-50">
        <div className="load">
            <l-spiral
                size="70"
                speed="0.9" 
                color="white" 
            ></l-spiral>
            </div>
        </div>
        </>) : ('')}

            <div className='w-full px-2'>
            <p className='text-sm text-gray-400'>Product Name</p>
                <input type="text" 
                className='border bg-white outline-none w-full text-black h-8 pl-2 text-sm'
                value={productName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setProductName(e.target.value)}
                />
                
                <p className='text-sm mt-2 text-gray-400'>Product Quality</p>
                <Condition
                className= 'border-slate-300 border text-sm text-black h-8 pl-1 bg-white w-full'
                onChange={(e: React.ChangeEvent<HTMLSelectElement>)=> setProductQuality(e.target.value)}
                value={productQuality}
                />

                <p className='text-sm mt-2 text-gray-400'>Product Category</p>
                <Category
                className='border-slate-300 border text-black h-8 pl-1 bg-white w-full text-sm'
                onChange={(e: React.ChangeEvent<HTMLSelectElement>)=> setProductCategory(e.target.value)}
                value={productCategory}
                />

                <p className='text-sm mt-2 text-gray-400'>Product Qauntity</p>
                <input type="text" 
                className='border bg-white outline-none w-full text-black text-sm h-8 pl-2'
                value={productQuantity}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setProductQuantity(e.target.value)}
                />   

                <p className='text-sm mt-2 text-gray-400'>Sku (Optional)</p>
                <input type="text" 
                className='border bg-white outline-none w-full text-black h-8 pl-2'
                value={Sku}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setSku(e.target.value)}
                />
                </div>

                {/* One side */}
                <div className='w-full px-2 mt-2 sm:mt-0 pb-2'>

                <p className='text-sm mt-2 text-gray-400'>Final Price</p>
                <input type="text" 
                className='border bg-white outline-none text-black w-full h-8 pl-2 text-sm'
                value={`$${Final_Price}`}
                />

                <p className='text-sm mt-2 text-gray-400'>Price</p>
                <input type="text" 
                className='border bg-white outline-none text-black w-full h-8 pl-2 text-sm'
                value={productPrice}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setProductPrice(e.target.value)}
                />

                <p className='text-sm mt-2 text-gray-400'>Discount Price</p>
                <input type="text" 
                className='border bg-white outline-none text-black w-full h-8 pl-2 text-sm'
                value={productDiscount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setProductDiscount(e.target.value)}
                />

                <p className='text-sm mt-2 text-gray-400'>Product Weight</p>
                <div className="relative w-full">
                <input
                className='w-full pl-2 bg-white h-10 rounded-lg outline-none border border-gray-300'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductWeight('Weight',e.target.value)}
                type='text'
                required={true}
                pattern='\d*'
                value={productWeight.Weight}
                />

                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Weight
                    className='bg-transparent text-gray-400'
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProductWeight('WeightIndicator',e.target.value)}
                    value={productWeight.WeightIndicator}
                />
                </div>
                </div>

                <div className="PackageSize flex gap-2 mt-2">
                <div>
                    <p className='text-xs text-gray-400'>Length</p>
                    <div className="relative max-w-md"> 
                        <input
                        className='w-full pl-2 bg-white h-10 rounded-lg text-sm outline-none border pr-7 border-gray-300'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductSize('length', e.target.value)}
                        type='text'
                        style={{}}
                        required={true}
                        pattern='\d*'
                        value={productSize.length}
                        />

                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <p className='text-gray-400'>in</p>
                        </div>
                    </div>
                </div>

                <div>
                    <p className='text-xs text-gray-400'>Breadth</p>
                    <div className="relative max-w-md">
                        <input
                        className='w-full pl-2 bg-white h-10 text-sm rounded-lg outline-none border pr-7 border-gray-300'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductSize('breadth', e.target.value)}
                        type='text'
                        required={true}
                        pattern='\d*'
                        value={productSize.breadth}
                        />

                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <p className='text-gray-400'>in</p>
                        </div>
                    </div>
                </div>

                <div>
                    <p className='text-xs text-gray-400'>Width</p>
                    <div className="relative max-w-md">
                        <input
                            className='w-full pl-2 bg-white h-10 text-sm rounded-lg outline-none border pr-7 border-gray-300'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductSize('width', e.target.value)}
                            type='text'
                            required={true}
                            pattern='\d*'
                            value={productSize.width}
                        />

                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <p className='text-gray-400'>in</p>
                        </div>

                    </div>
                </div>
            </div>

            <textarea
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setProductDescription(e.target.value)}
                name=''
                className='w-full bg-white h-36 rounded-lg mt-2 outline-none resize-none border border-gray-300 p-2'
                value={productDescription}
                />

                <div className="flex justify-between items-center cursor-default">
                    <p className='text-red-700 pt-2'>{isError ? 'Please fill all fields' : ''}</p>
                    <h1 className='mt-2 py-1 px-5 rounded-lg text-white bg-blue-700' onClick={handleUploadEdit}>{product !== 'Published' ? 'Publish' : 'Save'}</h1>
                </div>
            </div>
        </div>
    </>
    )
}
