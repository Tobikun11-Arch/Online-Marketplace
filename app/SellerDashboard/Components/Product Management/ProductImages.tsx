"use client"
import React, {useMemo, useState} from 'react'
import {Images, X} from 'lucide-react'
import { UseProductStore } from '../../hooks/UseHooks'
import Input from '../../NewProduct/Prototype/Input'
import Button from '../Common/Button'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from './CropUtils' 

interface PixelCrop {
    x: number;
    y: number;
    width: number;
    height: number;
}


export default function ProductImages() {
    const {
        productImages,
        setProductImages,
        previewImages,
        setPreviewImages
    } = UseProductStore()

    const [viewIndex, setView] = useState<number | null>(null)
    const [croppingImage, setCroppingImage] = useState<string | null>(null); //to crop
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    async function getCroppedImg(imageSrc: string, pixelCrop: PixelCrop): Promise<Blob | null> {
        const image = new Image();
        image.src = imageSrc;
    
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
    
        // Set canvas dimensions based on the cropped area
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
    
        // Wait for the image to load
        await new Promise<void>((resolve) => {
            image.onload = () => resolve();
        });
    
        // Draw the cropped image onto the canvas
        ctx?.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );
    
        // Export the canvas as a PNG with transparency
        return new Promise<Blob | null>((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/png');
        });
    }

    const handleCrop = async () => {
        if (croppingImage && croppedAreaPixels) {
            const croppedImageBlob = await getCroppedImg(croppingImage, croppedAreaPixels);
    
            if (croppedImageBlob) {
                const croppedFile = new File([croppedImageBlob], 'croppedImage.png', { type: 'image/png' });
    
                setProductImages([...productImages, croppedFile]);
                setPreviewImages([...previewImages, URL.createObjectURL(croppedFile)]);
                setCroppingImage(null); // Close cropping modal
            } else {
                console.error('Failed to create cropped image blob');
            }
        }
    };
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files); 
            filesArray.forEach((file) => {
                const img = new Image();
                img.src = URL.createObjectURL(file);

                img.onload = () => {
                    if (img.width === 1380 && img.height === 1500) {
                        // Add images with correct dimensions directly to the productImages
                        setProductImages([...productImages, file]);
                        setPreviewImages([...previewImages, img.src]);
                    } else {
                        // Set the image for cropping if dimensions are incorrect
                        setCroppingImage(img.src);
                    }
                };
            });
        }
    };

    //Remove bg integration for later integration
    // const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files) {
    //         const filesArray = Array.from(e.target.files); // Convert FileList to array
    // const newImagePreviews: string[] = [];

    //     for (const file of filesArray) {
    //     const formData = new FormData();
    //     formData.append('image_file', file);

    //     try {
    //         const response = await Remove_Bg.post('', formData, {
    //             headers: {
    //             'X-Api-Key': process.env.NEXT_PUBLIC_REMOVEBGAPI, 
    //             'Content-Type': 'multipart/form-data',
    //             },
    //             responseType: 'blob', 
    //         });

    //         const newImageUrl = URL.createObjectURL(response.data);
    //         newImagePreviews.push(newImageUrl);
    //     } catch (error) {
    //         console.error('Error removing background:', error);
    //     }
    // }

    // // Append the new images to the existing ones
    // setProductImages([...productImages, ...filesArray]);
    // setPreviewImages([...previewImages, ...newImagePreviews]);
    //     }
    // };

    const removeImage = (index: number) => {
        const updatedImages = productImages.filter((_, i) => i !== index);
        setProductImages(updatedImages);
        const updatedPreviewImages = previewImages.filter((_, i) => i !== index);
        setPreviewImages(updatedPreviewImages);
    };

    // Opens a new tab to preview the selected image in full size
    const previewImage = (urlImage: string) => {
        window.open(urlImage, "_blank");
    };

    // Get URLs of preview images to use in UI
    const urlImage = previewImages.map((image) => image);

    // Handles setting which image is currently viewed
    const handleView = (index: number) => {
        setView(index);
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

                {croppingImage && (
                    <div className="w-full h-screen flex justify-center items-center fixed top-0 left-0 z-50 px-5 sm:px-0">
                        <div className="crop-container relative" style={{ width: '460px', height: '500px' }}> 
                            <Cropper
                                image={croppingImage}
                                crop={crop}
                                zoom={zoom}
                                aspect={1380 / 1500} // Maintains a fixed aspect ratio
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                            <Button className="absolute bottom-4 right-4 z-10 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg" onClick={handleCrop}>
                                    Crop & Upload
                            </Button> 
                        </div>
                    </div>
                )}

                <div className='h-36 w-2/4 bg-gray-300'
                style={{ background: previewImages[0] ? `url(${previewImages[0]}) center center / contain no-repeat` : '',
                height: '144px', // Height should match the height of your gray box
                width: '50%', 
                }}
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
                                <Button className='py-1 px-6 rounded-lg text-sm font-medium bg-white text-black' onClick={() => previewImage(urlImage[0])}>Preview</Button>
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
                style={{ background: previewImages[1] ? `url(${previewImages[1]}) center center / contain no-repeat` : '' }}
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
                                <Button className='py-1 px-6 rounded-lg text-sm font-medium bg-white text-black' onClick={() => previewImage(urlImage[1])}>Preview</Button>
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
                style={{ background: previewImages[2] ? `url(${previewImages[2]}) center center / contain no-repeat` : '' }}
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
                                <Button className='py-1 px-6 rounded-lg text-sm font-medium bg-white text-black' onClick={() => previewImage(urlImage[2])}>Preview</Button>
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
