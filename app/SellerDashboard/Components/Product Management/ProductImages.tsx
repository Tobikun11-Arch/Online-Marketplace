"use client"
import React, {useMemo, useState} from 'react'
import {Images, X} from 'lucide-react'
import { UseProductStore } from '../../hooks/UseHooks'
import Input from '../../NewProduct/Prototype/Input'
import Button from '../Common/Button'

export default function ProductImages() {
    const {
        productImages,
        setProductImages,
        previewImages,
        setPreviewImages
    } = UseProductStore()

    const [viewIndex, setView] = useState<number | null>(null)

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files); // convert FileList to array
            const newImagePreviews = filesArray.map((file) => URL.createObjectURL(file));

            // Append the new images to the existing ones
            setProductImages([...productImages, ...filesArray]);
            setPreviewImages([...previewImages, ...newImagePreviews]);
        }
    };

    const removeImage = (index: number) => {
        const updatedImages = productImages.filter((_, i) => i !== index);
        setProductImages(updatedImages);

        const updatedPreviewImages = previewImages.filter((_, i) => i !== index);
        setPreviewImages(updatedPreviewImages);
    };

    const previewImage = (urlImage: string) => {
        window.open(urlImage, "_blank");
    };

    const urlImage = previewImages.map((image) => image)

    const handleView = (index: number) => {
        setView(index)
    }

  return (
   <>
        <div className='box1 flex gap-3'>
            <Input
            className=''
            onChange={handleImage}
            type='file'
            id='product-image'
            accept='.jpg, .jpeg, .png'
            style={{display: 'none'}}
            placeholder=''
            value={''}
            required={true}
            />

            <div className='h-36 w-2/4 bg-white border-2 border-dashed border-gray-400 flex flex-col justify-center items-center' onClick={() => document.getElementById('product-image')?.click()}>
                <Images />
                <p className='text-xs cursor-default'>Browse Images</p>
                </div>

                <div className='h-36 w-2/4 bg-gray-300'
                style={{ background: previewImages[0] ? `url(${previewImages[0]}) center / cover no-repeat` : '' }}
                onClick={()=> handleView(0)}
                >
                    {previewImages[0] && viewIndex === 0 ? (
                        <>
                        <div className='w-full h-full flex flex-col justify-center relative'>
                            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                            <div className='absolute top-0 right-0 m-2 z-10' onClick={(e) => {
                                e.stopPropagation();
                                setView(null);
                                }}>
                                <X color='white'/>
                            </div>

                            <div className="z-10 flex flex-col items-center space-y-2">
                                <Button className='py-1 px-6 rounded-lg text-sm font-medium bg-white text-black' onClick={() => previewImage(urlImage[0])}>View</Button>
                                <Button className='py-1 px-3 rounded-lg text-sm font-medium bg-white text-black' onClick={(e) => {
                                e.stopPropagation();
                                setView(null);
                                removeImage(0);}}>Remove</Button>
                            </div>

                        </div>
                        </>
                    ) : ''}

                </div>

            </div>

            <div className='box2 flex gap-3 pt-3'>
                <div className='h-36 w-2/4 bg-gray-300'
                style={{ background: previewImages[1] ? `url(${previewImages[1]}) center / cover no-repeat` : '' }}
                onClick={()=> handleView(1)}
                >
                    {previewImages[1] && viewIndex === 1 ? (
                        <>
                        <div className='w-full h-full flex flex-col justify-center relative'>
                            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                            <div className='absolute top-0 right-0 m-2 z-10' onClick={(e) => {
                                e.stopPropagation();
                                setView(null);
                                }}>
                                <X color='white'/>
                            </div>

                            <div className="z-10 flex flex-col items-center space-y-2">
                                <Button className='py-1 px-6 rounded-lg text-sm font-medium bg-white text-black' onClick={() => previewImage(urlImage[1])}>View</Button>
                                <Button className='py-1 px-3 rounded-lg text-sm font-medium bg-white text-black' onClick={(e) => {
                                e.stopPropagation();
                                setView(null);
                                removeImage(1);}}>Remove</Button>
                            </div>

                        </div>
                        </>
                    ) : ''}
                    
                </div>

                <div className='h-36 w-2/4 bg-gray-300'
                style={{ background: previewImages[2] ? `url(${previewImages[2]}) center / cover no-repeat` : '' }}
                onClick={()=> handleView(2)}
                >
                    {previewImages[2] && viewIndex === 2 ? (
                        <>
                        <div className='w-full h-full flex flex-col justify-center relative'>
                            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                            <div className='absolute top-0 right-0 m-2 z-10' onClick={(e) => {
                                e.stopPropagation();
                                setView(null);
                                }}>
                                <X color='white'/>
                            </div>

                            <div className="z-10 flex flex-col items-center space-y-2">
                                <Button className='py-1 px-6 rounded-lg text-sm font-medium bg-white text-black' onClick={() => previewImage(urlImage[2])}>View</Button>
                                <Button className='py-1 px-3 rounded-lg text-sm font-medium bg-white text-black' onClick={(e) => {
                                e.stopPropagation();
                                setView(null);
                                removeImage(2);}}>Remove</Button>
                            </div>

                        </div>
                        </>
                    ) : ''}

            </div>

        </div>
   </>
  )
}
