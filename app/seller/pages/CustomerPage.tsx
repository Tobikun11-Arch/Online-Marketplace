import React, { useEffect } from 'react'
import CustomerTable from '../components/customer-list/CustomerTable'
import { useSuspenseQuery } from '@tanstack/react-query'
import { httpRequestGet } from '../services/axios-instance/GetInstance'
import { orders_products } from '../services/axios/ProductRequests'
import { useUser } from '../state/User'
import { ResponseData } from '../services/axios-instance/GetInstance'
import { useProductDetails } from '../state/manage-products/table'

export default function CustomerPage() {
    const { user } = useUser()
    const { setCustomerTable } = useProductDetails()

    async function customer_data(): Promise<ResponseData> {
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
        queryKey: ['customer_list'],
        queryFn: customer_data
    })

    useEffect(() => {
        const customer_table = data.buyer_info.map(buyer => ({
            buyer_firstName: buyer.buyer_firstName,
            buyer_lastName: buyer.buyer_lastName,
            buyer_email: buyer.buyer_email,
            buyer_username: buyer.buyer_username,
            total_purchases: buyer.total_purchases
        }))

        setCustomerTable(customer_table)
    }, [data]);
    

    return (
         <div className='px-6 pt-5 pb-16 sm:px-2 sm:py-5 sm:pl-16 sm:pr-4 lg:px-5 xl:px-12'>
            <CustomerTable />
        </div>
    )
}
