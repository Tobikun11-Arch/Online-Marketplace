import React from 'react'
import { Products } from '../../entities/entities'

interface productImage {
    products: Products[]
}

const ProductCard = ({ products }: productImage) => {
    return (
        <>
            {products.map((product)=> (
                <h1>{product.images}</h1>
            ))}
        </>
    )
}

export default ProductCard
