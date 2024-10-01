import React from 'react'
import { useSelectedProducts } from '../../hooks/ReusableHooks'
import { X } from 'lucide-react'

export default function ProductDetails() {
    const { productSelected, isModalOpen, setModalOpen } = useSelectedProducts()
    
    const Prod_Price = productSelected?.productPrice ? parseInt(productSelected?.productPrice.toString(), 10) : 0
    const Disc_Price = productSelected?.productDiscount ? parseInt(productSelected?.productDiscount.toString(), 10) : 0
    const Final_Price = Prod_Price * Disc_Price

return (
    <>
        {isModalOpen ? 
        (<>
            <div className="w-full h-screen flex justify-center items-center fixed top-0 left-0 z-50 px-5 sm:px-0" onClick={()=> setModalOpen(false)}>
                <div className="bg-white rounded-md w-11/12 sm:w-11/12 max-w-lg min-h-3/6 text-black border border-black pb-3">
                    <div className='px-3 pt-3 '>
                            <h1 className='font-bold font-abc text-2xl'>Product detail</h1>
                            <div className='flex gap-5 mt-3'>
                                <div className="h-32 w-full xl:w-full rounded-lg bg-cover bg-center" style={{background: productSelected?.images[0] ? `url(${productSelected?.images[0]}) center center / contain no-repeat` : '' }}></div>

                                <div className="h-32 w-full xl:w-full rounded-lg bg-cover bg-center" style={{background: productSelected?.images[1] ? `url(${productSelected?.images[1]}) center center / contain no-repeat` : '' }}></div>

                                <div className="h-32 w-full xl:w-full rounded-lg bg-cover bg-center" style={{background: productSelected?.images[2] ? `url(${productSelected?.images[2]}) center center / contain no-repeat` : '' }}></div>
                            </div>      

                            <div className="flex justify-between text-xl font-semibold mt-3">
                                <p>{productSelected?.productName}</p>
                                <p>${Final_Price}</p>    
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
