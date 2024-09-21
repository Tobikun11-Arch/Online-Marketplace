import React from 'react'
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

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files); // convert FileList to array
            const newImagePreviews = filesArray.map((file) => URL.createObjectURL(file));

            // Append the new images to the existing ones
            setProductImages([...productImages, ...filesArray]);
            setPreviewImages([...previewImages, ...newImagePreviews]);
        }
    };

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
                >
                </div>

                <div className='h-36 w-2/4 bg-gray-300'>
                <div className=''></div>
            </div>

        </div>
   </>
  )
}
