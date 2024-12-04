import React from 'react'
import ProductCard from '../Container/ProductCard'
import { Products } from '../../entities/entities'

interface products {
    product: Products[]
}

const ProductList = ({ product }: products) => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4'>
            <ProductCard product={product}/>
        </div>
    )
}

export default ProductList