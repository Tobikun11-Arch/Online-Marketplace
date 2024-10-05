import React, { useState } from 'react'
import { useSelectedProducts } from '../hooks/ReusableHooks'
import Condition from '../Components/Product Management/Condition'
import Category from '../Components/Common/Category'
import Weight from '../NewProduct/Prototype/Weight'
import { useRouter } from 'next/navigation'

export default function Edit_ProductInformation() {
    const { productSelected } = useSelectedProducts()
    const [ condition, setCondition ] = useState(productSelected?.productQuality)
    const [ category, setProductCategory ] = useState(productSelected?.productCategory) //make form for this tomorrow
    const [ productWeight, setProductWeight ] = useState(productSelected?.productweight.Weight)
    const [ productWeightIndicator, setProductWeightIndicator ] = useState(productSelected?.productweight.WeightIndicator)
    const router = useRouter()

    //Package Size
    const [ productLength, setProductLength ] = useState(productSelected?.productSize.length)
    const [ productBreadth, setProductBreadth ] = useState(productSelected?.productSize.breadth)
    const [ productWidth, setProductWidth ] = useState(productSelected?.productSize.width)

    const [ productDescription, setDescription ] = useState(productSelected?.productDescription)

    const Prod_Price = productSelected?.productPrice ? parseInt(productSelected?.productPrice.toString(), 10) : 0
    const Disc_Price = productSelected?.productDiscount ? parseInt(productSelected?.productDiscount.toString(), 10) : 0
    const Final_Price = Prod_Price - Disc_Price
    const product = productSelected?.productStatus

    const handleUploadEdit = async () => {

        //need to change all variable name to current edit name and the productImages too
      
        // If all validations pass, log the product details
        const token = localStorage.getItem('token');
            if (!token) {
                router.push('/');
                return;
            }
    
            try {
              const uploadPromises = productImages.map(async (image:any, index) => {
                  if (!(image instanceof File)) {
                      throw new Error(`Image ${index + 1} is not a valid file object`);
                  }
    
                  const imgData = new FormData();
                  imgData.append('file', image);
                  imgData.append('upload_preset', 'Onlinemarket');
    
                  const response = await Cloudinary.post('', imgData);
                  const data = response.data;
                  return data.secure_url;
              });
    
              const cloudinaryUrls = await Promise.all(uploadPromises);
    
              if (status === 'Scheduled') {
                if (!TimeSchedule || !DateSchedule) {
                  setLoadingSchedule(false)
                  return;
                }
              }
    
              const ScheduleData = {
                TimePublish: TimeSchedule,
                DatePublish: DateSchedule
              }
    
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
                status: status,
                ScheduleDate: ScheduleData || undefined,
                Featured: featured ? 'Featured' : 'not feature'
            };
    
            await ProductApi.post('', productData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            } 
    
            catch (error) {
                console.error('Error making request:', error);
            }
    
      }


    return (
    <>
        <div className='w-full sm:flex mt-4'>

            <div className='w-full px-2'>
            <p className='text-sm text-gray-400'>Product Name</p>
                <input type="text" 
                className='border bg-white outline-none w-full text-black h-8 pl-2 text-sm'
                value={productSelected?.productName || ''}
                />
                
                <p className='text-sm mt-2 text-gray-400'>Product Quality</p>
                <Condition
                className= 'border-slate-300 border text-sm text-black h-8 pl-1 bg-white w-full'
                onChange={(e)=> setCondition(e.target.value)}
                value={condition || ''}
                />

                <p className='text-sm mt-2 text-gray-400'>Product Category</p>
                <Category
                className='border-slate-300 border text-black h-8 pl-1 bg-white w-full text-sm'
                onChange={(e)=> setProductCategory(e.target.value)}
                value={category || ''}
                />

                <p className='text-sm mt-2 text-gray-400'>Product Qauntity</p>
                <input type="text" 
                className='border bg-white outline-none w-full text-black text-sm h-8 pl-2'
                value={productSelected?.productQuantity || ''}
                />   

                <p className='text-sm mt-2 text-gray-400'>Sku (Optional)</p>
                <input type="text" 
                className='border bg-white outline-none w-full text-black h-8 pl-2'
                value={productSelected?.Sku || ''}
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
                value={`$${Prod_Price}`}
                />

                <p className='text-sm mt-2 text-gray-400'>Discount Price</p>
                <input type="text" 
                className='border bg-white outline-none text-black w-full h-8 pl-2 text-sm'
                value={`$${Disc_Price}`}
                />

                <p className='text-sm mt-2 text-gray-400'>Product Weight</p>
                <div className="relative w-full">
                <input
                className='w-full pl-2 bg-white h-10 rounded-lg outline-none border border-gray-300'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductWeight(e.target.value)}
                type='text'
                required={true}
                pattern='\d*'
                value={productWeight}
                />

                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Weight
                    className='bg-transparent text-gray-400'
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProductWeightIndicator(e.target.value)}
                    value={productWeightIndicator || 'kg'}
                />
                </div>
                </div>

                <div className="PackageSize flex gap-2 mt-2">
                <div>
                    <p className='text-xs text-gray-400'>Length</p>
                    <div className="relative max-w-md"> 
                        <input
                        className='w-full pl-2 bg-white h-10 rounded-lg text-sm outline-none border pr-7 border-gray-300'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductLength(e.target.value)}
                        type='text'
                        style={{}}
                        required={true}
                        pattern='\d*'
                        value={productLength}
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductBreadth(e.target.value)}
                        type='text'
                        required={true}
                        pattern='\d*'
                        value={productBreadth}
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductWidth(e.target.value)}
                            type='text'
                            required={true}
                            pattern='\d*'
                            value={productWidth}
                        />

                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <p className='text-gray-400'>in</p>
                        </div>

                    </div>
                </div>
            </div>

            <textarea
                onChange={(e) => setDescription(e.target.value)}
                name=''
                className='w-full bg-white h-36 rounded-lg mt-2 outline-none resize-none border border-gray-300 p-2'
                value={productDescription}
                />

                <div className="flex justify-between">
                    <h1></h1>
                    <h1 className='mt-2 py-1 px-5 rounded-lg text-white bg-blue-700' onClick={handleUploadEdit}>{product !== 'Published' ? 'Publish' : 'Save'}</h1>
                </div>
            </div>
        </div>
    </>
    )
}
