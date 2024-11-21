import React from 'react'

interface productProps {
    dataProduct: {
        productName: string
        OriginalPrice: number
    } 
}

const ProductInfoCard = ({ dataProduct }: productProps) => {

    return (
        <div className="absolute bottom-5 left-5 flex items-center pr-3">
            <div className="flex justify-center items-center gap-3 text-xs font-semibold bg-transparent p-1 border rounded-full">
                <h1 className='pl-2'>{dataProduct?.productName}</h1>
                <h1 className='bg-blue-700 px-2 py-1 rounded-full text-white'>₱{dataProduct?.OriginalPrice} Php</h1>
            </div>
        </div>
    )
}

export default ProductInfoCard