"use client"
import React, {useMemo, useState} from 'react'
import {Images} from 'lucide-react'
import { UseProductStore } from '../../hooks/UseHooks'
import Input from '../../NewProduct/Prototype/Input'

export default function ProductImages() {
    const {
        productImages,
        setProductImages,
        previewImages,
        setPreviewImages
    } = UseProductStore()

    const [string, setString] = useState('')

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files); // convert FileList to array
            const newImagePreviews = filesArray.map((file) => URL.createObjectURL(file));

            // Append the new images to the existing ones
            setProductImages([...productImages, ...filesArray]);
            setPreviewImages([...previewImages, ...newImagePreviews]);
        }
    };

    const previewImage = (urlImage: string) => {
        window.open(urlImage, "_blank");
    };

    const urlImage = previewImages.map((image) => image)

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
                style={{ backgroundImage: previewImages[0] ? `url(${previewImages[0]})` : '',
                    backgroundPosition: 'center',   
                    backgroundSize: 'cover',     
                    backgroundRepeat: 'no-repeat'
                }}
                // onClick={() => previewImage(urlImage[0])}
                >
                </div>

            </div>

            <div className='box2 flex gap-3 pt-3'>
                <div className='h-36 w-2/4 bg-gray-300'
                style={{ backgroundImage: previewImages[1] ? `url(${previewImages[1]})` : '',
                    backgroundPosition: 'center',   
                    backgroundSize: 'cover',     
                    backgroundRepeat: 'no-repeat'
                }}
                // onClick={() => previewImage(urlImage[1])}
                >
                </div>

                <div className='h-36 w-2/4 bg-gray-300'
                style={{ backgroundImage: previewImages[2] ? `url(${previewImages[2]})` : '',
                    backgroundPosition: 'center',   
                    backgroundSize: 'cover',     
                    backgroundRepeat: 'no-repeat'
                }}
                // onClick={() => previewImage(urlImage[2])}
                >
            </div>

        </div>
   </>
  )
}