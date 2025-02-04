import React, { useEffect } from 'react'
import { httpRequestGet } from '../services/axios-instance/GetInstance'
import { useUser } from '../state/User'
import { ResponseData } from '../services/axios-instance/GetInstance'
import { seller_products } from '../services/axios/ProductRequests'
import { useSuspenseQuery } from '@tanstack/react-query'
import InventoryTable from '../components/Inventory/InventoryTable'
import { useProductDetails } from '../state/manage-products/table'

export default function InventoryPage() {
    const { user } = useUser()
    const { setInventory, setUnitSold } = useProductDetails()

    async function get_products(): Promise<ResponseData> {
        try {
            const response = await httpRequestGet('', seller_products, user?._id!)
            if(!response) {
                return { user_data: [], productQuantities: [], product_orders: [], buyer_info: [], seller_data: [] }
            }
            return response
        } catch (error) {
            console.error("Fetching error: ", error)
            return { user_data: [], productQuantities: [], product_orders: [], buyer_info: [], seller_data: [] };
        }
    }

    const { data } = useSuspenseQuery<ResponseData>({
        queryKey: ['user_products'],
        queryFn: get_products
    })

    useEffect(()=> {
        const simplifiedData = data.user_data.map((product) => ({
            _id: product._id,
            Sku: product.Sku,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            images: product.images[0],
            productCategory: product.productCategory,
            productDescription: product.productDescription,
            productDiscount: product.productDiscount,
            productName: product.productName,
            productPrice: product.productPrice, 
            productQuality: product.productQuality,
            productSize: product.productSize,
            productStock: product.productStock,
            status: product.status,
        }));
        setInventory(simplifiedData)

        const productQuantities = data.productQuantities.map((product_unit)=> ({
            productId: product_unit.productId,
            totalQuantity: product_unit.totalQuantity
        }))
        setUnitSold(productQuantities)
    }, [data])

    return (
        <div className='px-6 pt-5 pb-16 sm:px-2 sm:py-5 sm:pl-16 sm:pr-4 lg:px-5 xl:px-12'>
            <InventoryTable/>
        </div>
    )
}
