import React from 'react'

interface productProps {
    dataProduct: {
        productName: string
        OriginalPrice: number
    } 
}


function trimString(str: string, maxLen: number) {
    if (str?.length > maxLen) {
        return str.slice(0, maxLen) + '...'
    }
    return str
}

const ProductInfoCard = ({ dataProduct }: productProps) => {
    const trimmedProductName = trimString(dataProduct?.productName, 10)

    return (
        <div className="absolute bottom-5 left-5 flex items-center pr-3">
            <div className="flex justify-center items-center gap-3 text-xs font-semibold bg-transparent p-1 border rounded-full">
                <h1 className='pl-2'>{trimmedProductName}</h1>
                <h1 className='bg-blue-700 px-2 py-1 rounded-full text-white'>${dataProduct?.OriginalPrice.toFixed(2)} usd</h1>
            </div>
        </div>
    )
}

export default ProductInfoCard