import React from 'react'
import { useSelectedProducts } from '../../hooks/ReusableHooks'
import { X } from 'lucide-react'

export default function ProductDetails() {
    const { productSelected, isModalOpen, setModalOpen } = useSelectedProducts()
    
    console.log("discount price: ", productSelected?.productDiscount)
    console.log("price: ", productSelected?.productPrice)

return (
    <>
        {isModalOpen ? 
        (<>
            <div className="w-full h-screen flex justify-center items-center fixed top-0 left-0 z-50 px-5 sm:px-0">
                <div className="bg-white rounded-md w-4/5 max-w-sm h-3/6 text-black border border-black">
                    <div className=' px-5 pt-5'>

                        <div className="relative"> 
                            <div className="h-52 w-3/4 xl:w-full rounded-lg bg-cover bg-center" style={{background: productSelected?.images[0] ? `url(${productSelected?.images[0]}) center center / contain no-repeat` : '' }}></div>

                            <div className="absolute inset-y-0 right-0 top-0 flex pr-3">
                                <X 
                                className='hover:bg-gray-500 p-1 rounded-full'
                                onClick={()=> setModalOpen(false)}
                                />
                            </div>
                        </div>

                        <div className="details">
                            <h1 className='text-2xl'>{productSelected?.productName}</h1>
                            <p>{productSelected?.productStatus}</p>
                            <p>{productSelected?.productCategory}</p>
                            <p>{productSelected?.productQuality}</p>
                            <p>{productSelected?.productQuantity}</p>
                            <p>${productSelected?.productPrice}</p> 
                            <p>{productSelected?.productDiscount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>) 
        : 
        (<>
        
        </>)}
    </>
  )
}
