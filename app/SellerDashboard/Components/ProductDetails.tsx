"use client"
import React, { useState } from 'react'
import { CircleChevronLeft, Upload, X, CircleAlert } from 'lucide-react'
import Link from 'next/link'
import Input from '../Components/Input'
import TextArea from '../Components/textArea'
import CategoryProduct from '../Components/Category'
import ProductCondition from '../Components/Condition'
import Button from '../Components/Button'
import '../Responsive/AddProducts.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function ProductDetails() {
    const router = useRouter();
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [images, setImages] = useState<File[]>([])
    const [message, setMessage] = useState('')
    const [formData, setFormdata] = useState({
        productName: '',
        description: '',
        productPrice: '',
    })

    const [Category, setCategory] = useState<string | null>(null)
    const [Condition, setCondition] = useState<string | null>(null)


    const HandleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value)
    }

    const HandleCondition = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCondition(event.target.value)
    }

    const openModal = () => {
        const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
        if (modal) {
          modal.showModal();
        }
      };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormdata({ ...formData, [name]: value });
        if(name === "productPrice") {
            const inputValue = e.target.value;
            if (/^\d*$/.test(inputValue)) {
                setFormdata({...formData, [name]: inputValue});   
            }   
            else {
                setFormdata({...formData, [name]: ''});
            }
        }
        
    };

        const HandleImage = (e:React.                          ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
        if (images.length > 3) {
                alert("You can only upload up to 3 images.");
                return;
            }

          const file = e.target.files[0];
          setImages((prevImages) => [...prevImages, file]);
            
          const urlImage = URL.createObjectURL(file);
          setPreviewImages((prevPreviews) => [...prevPreviews, urlImage]);
        }
      };

      const previewImage = (urlImage: string) => {
        window.open(urlImage, "_blank");
      };

      const removeImage = (index: number) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    
        const updatedPreviewImages = previewImages.filter((_, i) => i !== index);
        setPreviewImages(updatedPreviewImages);
      };


      //Handle Submitting to Database
     const HandlePublish = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.productName || !formData.description || !formData.productPrice || images.length === 3 || !Category || !Condition) {
          setMessage("Please fill in all fields and Upload four images.");
          return;
        }

        setMessage('')  
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

            const imgData = new FormData();
            imgData.append('file', image);
            imgData.append('upload_preset', 'Onlinemarket');
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
            if (!cloudName) {  
              throw new Error('Cloudinary cloud name is not set');  
            }

            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, imgData);
            const data = response.data;
            return data.secure_url;
            });

          const cloudinaryUrls = await Promise.all(uploadPromises);
          console.log("url: ", cloudinaryUrls)

          const productData = {
            productName: formData.productName,
            description: formData.description,
            productPrice: formData.productPrice,
            category: Category,
            condition: Condition,
            images: cloudinaryUrls, 
        };

          await axios.post('https://online-marketplace-backend-six.vercel.app/api/Products',productData, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          setFormdata({
            productName: '',
            description: '',
            productPrice: ''
          });
          setCategory(null)
          setCondition(null)
          setPreviewImages([]);
        } 

        catch (error) {
          console.error('Error making request:', error);
          setMessage("Please Try again!")
        }
      }

  return (
    <>
     <div className="flex min-h-screen">

            <div className="h-screen pt-10 pl-5 md:flex gap-8 justify-center ">

             <Link href={'/SellerDashboard/Home'} className='h-10'>
            <div className="items-center gap-1 hidden 2xl:block">
            <CircleChevronLeft size={32}/>
            <p>Back</p>
            </div>
            </Link> 

            {/* Modal for Submit Button */}
            <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">✕</button>
                </form>
                <p className="py-4 text-white">{message ? `${message}` : 'Product Published'}</p>
            </div>
            </dialog>

            <div className="FormBox ml-5 mt-10 flex flex-col w-96 Products h-auto sm:h-3/4 bg-white rounded-sm p-2" style={{filter: 'drop-shadow(-9px 9px 0px #000000)'}}>
            <h1 className='foont-abc font-bold text-3xl cursor-default'>Add new Product</h1>
            
            <Input
            value={formData.productName}
            onChange={handleChange}
            placeholder='Product Name'
            name='productName'
            id='productName'
            />

            <TextArea  
            name='description'
            id='description'
            placeholder='Enter product description (200 characters max)'
            length={200}
            rows={5}
            onChange={handleChange}
            value={formData.description}
            />    

            <Input
            value={formData.productPrice}
            onChange={handleChange}
            placeholder='Price'
            name='productPrice'
            id='productPrice'
            />   

            <CategoryProduct
            onChange={HandleCategory}
            value={Category || ''}
            />

            <ProductCondition
            value={Condition || ''}
            onChange={HandleCondition}
            />
            </div>    

            <div className="flex flex-col">
            <div className="flex w-96 h-36 Products mt-10 parent pl-10 md:pl-0 parentUpload">
            <div className="w-32 h-32  bg-gray-800 flex flex-col justify-center items-center ImageRes UploadBox" onClick={() => document.getElementById('product-image')?.click()}>
            <Upload size={40} color='white'/>
            </div>

            <input type="file" id="product-image" accept=".jpg, .jpeg, .png"  style={{ display: 'none' }} onChange={HandleImage} required/>

            <div className="mt-5 Warning">
            <div className="flex flex-col">
            {images.length > 3 ? (
                <>
                <p className='text-xs ml-5 font-bold'>Please check before submitting.</p>
                </>
                ) : (
                <>
                <div className='flex gap-1 items-center ml-2'>
                <CircleAlert color="#043481" size={20}/>
                <p className='text-xs font-bold'>Please Upload four images.</p>
                 </div>
                </>
            )}
            <div className='flex mt-2 items-center' onClick={openModal}>
            <Button className='px-4 py-1 rounded-lg font-abc font-bold text-sm h-10 w-24'>Cancel</Button>
            <div className='SubmitButton '>
            <Button className='px-4 py-1 rounded-lg font-abc font-bold text-white w-24 bg-blue-800 text-sm' onClick={HandlePublish}>Submit</Button>
            </div>

            </div>
            </div>
            </div>
            </div>
            
            <div className='grid grid-cols-2 gap-3 pb-4'> {/* Show all upload */}
            {previewImages.map((imageUrl, index) => (
            <div
            className='previewImage w-40 h-40'
            key={index}
            style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }}
            onClick={() => previewImage(imageUrl)}
            >
            <button
            className='publish-button'
            onClick={(e) => {
            e.stopPropagation();
            removeImage(index);
            }}>
            <div className="bg-gray-600">
            <X color='white'/>
            </div>
            </button>
            </div>  
            ))}
            </div>

            </div>  {/* Closed of handle upload */}
            </div>
         </div>
    </>
  )
}


