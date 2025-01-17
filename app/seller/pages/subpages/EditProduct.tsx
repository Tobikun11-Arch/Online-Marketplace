import React, { useEffect, useState } from 'react'
import { useProducts } from '../../state/manage-products/Products'
import { useProductId } from '../../state/manage-products/ViewProduct'
import { Product } from '../../types/product'

export default function EditProduct() {
    const { isResult } = useProducts()
    const { product_id } = useProductId()
    const [ products, setproducts ] = useState<Product[]>([])

    useEffect(()=> {
        console.log("Id: ", product_id)
        const filtered = isResult.filter((product)=> product._id === product_id)
        setproducts(filtered)
        console.log("Filtered data: ", filtered)
    }, [isResult])

    return (
        <div>EditProduct</div>
    )
}
