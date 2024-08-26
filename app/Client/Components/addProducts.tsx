"use client"
import React, { useState } from 'react'
import AddProducts from '../Svg/AddProducts'
import AddImage from '../Svg/AddImage'
import '../auth/Css/Background.css'

export default function addProducts() {

  const [images, setImages] = useState<string[]>([])

  const openModal = () => {
    const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const HandleImage = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files && e.target.files[0]) {

        if(images.length > 2) {

          alert("You can only upload up to 3 images.");
          return
  
        }

        const file = e.target.files[0];
        const urlImage = URL.createObjectURL(file); // Create a local URL for the image
        setImages((prevImages) => [...prevImages, urlImage]);

    }

  }


  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  
  const previewImage = (urlImage: string) => {
    window.open(urlImage, "_blank");
  };

  return (
    <>
    
    <div className="h-full bg-white pt-7 lg:ml-0 lg:rounded-3xl">
 
    <div className="flex w-36 h-40 ml-7 bg-black rounded-xl flex-col items-center">
      <h1 className='text-white font-bold text-base mt-5'>Add Products</h1>
    
      <div className="mt-4">
      <AddProducts onClick={openModal}/>
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
          <form >
      <div>
        <label htmlFor="product-name" className='mt-10'>Product Name:</label>
        <input type="text" id="product-name" placeholder='Shoes' className='border-b-2 bg-white marginLeft border-black outline-none' required />
      </div>

      <div className='flex flex-col'>
        <label htmlFor="product-description" className='mt-5'>Product Description:</label>
        <textarea id="product-description" className='border-b-2 border-l-2 bg-white border-black outline-none mt-2 pl-2 resize-none' placeholder='Enter product description (200 characters max)' maxLength={200} rows={5} required />
      </div>

      <p className='cursor-default text-gray-500 mt-5'>Add Image {images.length}/3</p>

      <div className="flex items-center gap-1 mt-3">
      <div className="w-12 h-12 bg-gray-300 flex justify-center items-center" onClick={() => document.getElementById('product-image')?.click()}>
        <AddImage />
      </div>

      {images.map((imageUrl, index) => (
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

        <input type="file" id="product-image" accept=".jpg, .jpeg, .png"  style={{ display: 'none' }} onChange={HandleImage} required/>
  
      
      <div className="w-full flex justify-end">
        <p></p>
      <button type="submit" className='mt-10 bg-blue-800 p-2 text-white rounded-md'>Publish</button></div>
    </form>
        </div>

      </dialog>
   
    </div>
    </>
  )
}
