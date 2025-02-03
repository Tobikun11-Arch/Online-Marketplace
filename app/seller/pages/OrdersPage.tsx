import React, { useEffect } from 'react'
import OrderTable from '../components/order table/OrderTable'
import { useSuspenseQuery } from '@tanstack/react-query'
import { httpRequestGet } from '../services/axios-instance/GetInstance'
import { orders_products } from '../services/axios/ProductRequests'
import { useUser } from '../state/User'
import { ResponseData } from '../services/axios-instance/GetInstance'
import { useProductDetails } from '../state/manage-products/table'

export default function OrdersPage() {
    const { user } = useUser()
    const { setorderTable } = useProductDetails()

    async function order_products(): Promise<ResponseData> {
        try {
            const response = await httpRequestGet('', orders_products, user?._id!)
            if(!response) {
                return { user_data: [], productQuantities: [], product_orders: [], buyer_info: [] }
            }
            return response
        } catch (error) {
            console.error("Fetching error: ", error)
            return { user_data: [], productQuantities: [], product_orders: [], buyer_info: [] };
        }
    }

    const { data } = useSuspenseQuery<ResponseData>({
        queryKey: ['product_orders'],
        queryFn: order_products
    })

    useEffect(() => {
        const order_table = data.product_orders.flatMap(product=> ({
            productId: product.productId,
            productName: product.productName,
            images: product.images[0],
            quantity: product.quantity,
            price: product.price,
            _id: product._id,
            addedAt:product.addedAt
        }))

        setorderTable(order_table)
    }, [data]);
    

    return (
         <div className='px-6 pt-5 pb-16 sm:px-2 sm:py-5 sm:pl-16 sm:pr-4 lg:px-5 xl:px-12'>
            <OrderTable/>
        </div>
    )
}
