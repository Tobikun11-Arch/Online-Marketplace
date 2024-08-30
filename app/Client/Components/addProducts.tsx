"use client"
import React, { useEffect, useState } from 'react'
import AddProduct from '../Svg/AddProducts'
import AddImage from '../Svg/AddImage'
import '../auth/Css/Background.css'
import { useRouter } from 'next/navigation'
import '../auth/Css/Background.css'
import dotenv from 'dotenv';

dotenv.config();



export default function AddProducts() {

  const [userId, setuserID] = useState<{userId: string} | null>(null)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [description, setDescription] = useState('')
  const [productName, setproductName] = useState('')
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
      if (images.length > 2) {
        alert("You can only upload up to 3 images.");
        return;
      }
  
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
        
        const response = await fetch('https://online-marketplace-backend-six.vercel.app/api/dashboard', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      });

      if(response.ok) {

        const data = await response.json();

        setuserID({userId: data.user.userId})

      }

      else {

        const data = await response.json();
        
        if(data.error === "Invalid token") {

            router.push('/')

        }

        console.error('Error fetching protected data:', data);

    }
      
    }//try close

      catch (error) {
        
        console.error('Error making request:', error);

      }

    }

    fetchData();

  }, [router])




  const HandleAdd = () => {

    const timer = setTimeout(() => {
      setOpen(false);
    }, 3000);
  
    return () => clearTimeout(timer);
  };


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
        console.log('Cloudinary Cloud Name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

        if (!cloudName) {
          
          throw new Error('Cloudinary cloud name is not set');
          
        }
  
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData
        });
  
        if (!response.ok) {

          const errorText = await response.text();
          console.error(`Failed to upload image ${index + 1}. Status: ${response.status}. Response: ${errorText}`);
          throw new Error(`Failed to upload image ${index + 1}. Status: ${response.status}`);
          
        }
  
        const data = await response.json();
        return data.secure_url;
      });
  
      const cloudinaryUrls = await Promise.all(uploadPromises);
      
      const response = await fetch('https://online-marketplace-backend-six.vercel.app/api/Products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName,
          description,
          images: cloudinaryUrls,
        }),
      });
  
      if(response.ok) {

      setproductName('');
      setDescription('');
      setPreviewImages([]);

      const modal = document.getElementById('my_modal_3') as HTMLDialogElement;

      if (modal) {

       modal.close();

      }

    } 

    } //try close
    
    catch (error) {

      console.error('Error making request:', error);
      setMessage("Please Try again!")

    }

  }

  return (
    <>
    
    <div className="h-full bg-white pt-7 lg:ml-0 lg:rounded-3xl">

    <div className="flex w-36 h-40 ml-7 mt-10 lg:mt-0 bg-black rounded-xl flex-col items-center">
      <h1 className='text-white font-bold text-base mt-5'>Add Products</h1>
    
      <div className="mt-4">
      <AddProduct onClick={openModal}/>
      </div>

    </div>

  
    <h1 className='text-black font-bold text-2xl mt-6 ml-7 '>PRODUCTS:</h1>


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
                  key={index}
                  style={{
                    position: "relative",
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "80px",
                    height: "80px",
                    margin: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => previewImage(imageUrl)}
                >
                  <button
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      border: "none",
                      borderRadius: "50%",
                      cursor: "pointer",
                      padding: "2px 5px",
                      fontSize: "12px",
                    }}
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

        <input type="file" multiple id="product-image" accept=".jpg, .jpeg, .png"  style={{ display: 'none' }} onChange={HandleImage} required/>
  
      
      <div className="w-full flex justify-end">
        <p></p>
      <button className='mt-10 bg-blue-800 p-2 text-white rounded-md' onClick={HandleAdd}>Publish</button></div>
    </form>
        </div>

      </dialog>
   
    </div>
    </>
  )
}
