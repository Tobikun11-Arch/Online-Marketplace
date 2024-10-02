import React from 'react'
import { useSelectedProducts } from '../../hooks/ReusableHooks'
import Ratings from './Ratings'
import ProductImages from './ProductImages'
import Size from './Size'
import Button from '../Common/Button'
import { Eye, PencilLine, X } from "lucide-react"

export default function ProductDetails() {
    const { isModalOpen, setModalOpen } = useSelectedProducts()

return (
    <>
        {isModalOpen ? 
        (<>
            <div className="w-full h-screen flex justify-center items-center fixed top-0 left-0 z-50 px-5 sm:px-0 cursor-default">
                <div className="bg-white rounded-md w-11/12 h-3/4 sm:h-auto overflow-y-auto overflow-x-hidden max-w-lg min-h-3/6 text-black border border-gray-400 pb-5">
                    <div className='px-5 pt-3 '>
                        <div className="flex justify-between items-center">
                            <h1 className='font-bold font-abc text-xl'>Product detail</h1>
                            <X
                            onClick={()=> setModalOpen(false)}
                            />
                        </div>
                        <ProductImages/>
                        <Ratings/> 
                        <Size/>

                        <div className="flex flex-wrap justify-center items-center gap-3 mt-4">
                            <div className="flex gap-2 items-center justify-center w-full sm:w-auto bg-white border py-2.5 px-8 rounded-md">
                                <Eye strokeWidth={1} size={18}/>
                                <Button className='text-sm font-semibold'>Customer View</Button>
                            </div>

                            <div className="flex gap-2 items-center w-full justify-center sm:w-auto bg-gray-200 py-2.5 px-8 rounded-md ">
                                <PencilLine strokeWidth={1} size={18}/>
                                <Button className='text-sm font-semibold'>Edit Product</Button>
                            </div>
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
