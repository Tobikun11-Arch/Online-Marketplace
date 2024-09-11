"use client"
import React, { ChangeEvent, useEffect, useState } from 'react'
import AddProduct from '../Svg/AddProducts'
import AddImage from '../Svg/AddImage'
import '../auth/Css/Background.css'
import { useRouter } from 'next/navigation'
import '../auth/Css/Background.css'
import dotenv from 'dotenv';
import axios from 'axios'

dotenv.config();

export default function AddProducts() {

  const [userId, setuserID] = useState<{userId: string} | null>(null)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [description, setDescription] = useState('')
  const [productName, setproductName] = useState('')
  const [productPrice, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [images, setImages] = useState<File[]>([])
  const router = useRouter();
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const openModal = () => {
    const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };


  const HandleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {

      const file = e.target.files[0];
      setImages((prevImages) => [...prevImages, file]);

      const urlImage = URL.createObjectURL(file);
      setPreviewImages((prevPreviews) => [...prevPreviews, urlImage]);
    }
  };  


  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    const updatedPreviewImages = previewImages.filter((_, i) => i !== index);
    setPreviewImages(updatedPreviewImages);
  };


  const previewImage = (urlImage: string) => {
    window.open(urlImage, "_blank");
  };

  //Fetch Api
    useEffect(() => {

      const fetchData = async () => {

        const token = localStorage.getItem('token');
  
      if (!token) {
          router.push('/');
          return;
      }
      
      try {
        
        const response = await axios.get('https://online-marketplace-backend-six.vercel.app/api/dashboard', {
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      });

        const data = response.data;

        setuserID({userId: data.user.userId})
      
    }//try close

      catch (error: unknown) {
        
        if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        
        if(data && data.error === "Invalid token") {

            router.push('/')

        }

        console.error('Error fetching protected data:', data || error.message);

      }

      else {

        console.error('Unexpected error:', error);

      }

    }


    }

    fetchData();

  }, [router])



  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName || !description || images.length === 0) {
      setMessage("Please fill in all fields and add at least one image.");
      setOpen(true); 
      return;
    }

    setMessage('')
  
    setOpen(true)

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    try {

  const uploadPromises = images.map(async (image:any, index) => {
        if (!(image instanceof File)) {
          throw new Error(`Image ${index + 1} is not a valid file object`);
        }
        
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'Onlinemarket');
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

        if (!cloudName) {  
          throw new Error('Cloudinary cloud name is not set');  
        }

        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
        const data = response.data;
        return data.secure_url;
      });

      
      //modal closed
      const closeModalAfterDelay = () => {
        const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
          setTimeout(() => {
            modal.close();
          }, 1200);

      };
      

  
      const cloudinaryUrls = await Promise.all(uploadPromises);
      
      await axios.post('https://online-marketplace-backend-six.vercel.app/api/Products',{
        productName,
        productPrice,
        quantity,
        description,
        images: cloudinaryUrls,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      setproductName('');
      setDescription('');
      setPreviewImages([]);
    } 
    
    catch (error) {
      console.error('Error making request:', error);
      setMessage("Please Try again!")
    }

  }



  const handleNumber = (e: ChangeEvent<HTMLInputElement>) => {

      const inputValue = e.target.value;
      if (/^\d*$/.test(inputValue)) {
        setPrice(inputValue);   
      } else {
        setPrice('');
      }

  }


  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {

    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setQuantity(inputValue);   
    } else {
      setQuantity('');
    }

}



  return (
    <>
    
    <div className="flex w-36 h-40 ml-7 mt-10 lg:mt-0 bg-black rounded-xl flex-col items-center">
      <h1 className='text-white font-bold text-base mt-5'>Add Products</h1>
    
      <div className="mt-4">
      <AddProduct onClick={openModal}/>
      </div>

    </div>


     {/**Modal ======>*/}
     <dialog id="my_modal_3" className="modal">
        <div className="modal-box px-10 pt-10 pb-8 bg-white overflow-hidden">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-2 border-black"
              aria-label="Close"
            >
              ✕
            </button>

          </form>
          <form onSubmit={handlePublish}>
      <div>

                <div className="w-full flex justify-center">
              {open && (
            message ? (
          <div role="alert" className="alert alert-error w-3/5 top-5 absolute flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{message}</span>
          </div>
            ) : (
          <>
          
          <div role="alert" className="alert alert-success w-3/5 ModalSize top-5 absolute flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Product Published!</span>
          </div>
              
          </>
            )
          )}
          </div>
        
        <label htmlFor="product-name" className='mt-10'>Product Name:</label>
        <input type="text" id="product-name" placeholder='Shoes' className='border-b-2 bg-white marginLeft border-black outline-none' value={productName} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setproductName(e.target.value)} required />
         </div>

        <div className="mt-4 lg:mt-0">
       <label htmlFor="product-price" className='mt-10'>Product Price:</label>
       <input type="text" id="product-price" placeholder='₱345.00' className='border-b-2 bg-white lg:mt-4 ProductPrice border-black outline-none' value={productPrice} onChange={handleNumber} required />
       </div>

      <div className="mt-4 lg:mt-0">
       <label htmlFor="product-quantity" className='mt-10'>Product Qty:</label>
       <input type="text" id="product-quantity" placeholder='105' className='border-b-2 Qty bg-white lg:mt-4 border-black outline-none' value={quantity} onChange={handleQuantity} required />
       </div>


      <div className='flex flex-col'>
        <label htmlFor="product-description" className='mt-5'>Product Description:</label>
        <textarea id="product-description" className='border-b-2 border-l-2 bg-white border-black outline-none mt-2 pl-2 resize-none' placeholder='Enter product description (200 characters max)'value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=> setDescription(e.target.value)} maxLength={200} rows={5} required />
      </div>

      <p className='cursor-default text-gray-500 mt-5'>Add Image {images.length}/3</p>

      <div className="flex items-center gap-1 mt-3 h-20">
      <div className="w-12 h-12 bg-gray-300 flex justify-center items-center" onClick={() => document.getElementById('product-image')?.click()}>
        <AddImage />
      </div>

      {previewImages.map((imageUrl, index) => (
                <div
                className='previewImage'
                  key={index}
                  style={{
                   backgroundImage: `url(${imageUrl})`,
                  }}
                  onClick={() => previewImage(imageUrl)}
                >
                  <button
                  className='publish-button'
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

        <input type="file" id="product-image" accept=".jpg, .jpeg, .png"  style={{ display: 'none' }} onChange={HandleImage} required/>
  
      
      <div className="w-full flex justify-end">
        <p></p>
      <button className='mt-10 bg-blue-800 p-2 text-white rounded-md'>Publish</button></div>
    </form>
        </div>

      </dialog>
   

    </>
  )
}
