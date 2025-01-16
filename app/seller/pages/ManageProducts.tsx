import React, { useEffect, useState } from 'react'
import { Plus  } from 'lucide-react'
import DataTableComp from '../components/manage-products/data-table'
import { useSideBarState } from '../state/Sidebar'
import { seller_products } from '../services/axios/ProductRequests'
import { httpRequestGet } from '../services/axios-instance/GetInstance'
import { useProductDetails, usefilter } from '../state/manage-products/table' 
import { Product } from '../state/manage-products/product'
import TabsLoading from '../loading/TabsLoading'

export default function ManageProducts() {
    const { setActiveTab } = useSideBarState()
    const { setTableData } = useProductDetails()
    const [ isResult, setResult ] = useState<Product[] | []>([])
    const { isStatus } = usefilter()

    function StatusFunction(statusdata: Product[], statusType: string) {
        const status = statusdata.filter((status)=> status.status === statusType)
        const simplifiedData = status.map((product)=> ({
            _id: product._id,
            productName: product.productName,
            productPrice: product.productPrice,
            status: product.status,
            images: product.images[0]
        }))
        setTableData(simplifiedData)
    }

    useEffect(()=> {
        const get_products = async() => {
            try {
                const response = await httpRequestGet('', seller_products)
                if(response) {
                    setResult(response.user_data)
                } else {
                    console.log("No response from server")
                }
            } catch (error) {   
                console.error("Error fetching: ", error)
            }
        }
        get_products()
    }, [isStatus])

    useEffect(() => {
        if (isResult.length > 0) {
            console.log("true");
            if (isStatus === "draft") {
                StatusFunction(isResult, "draft");
                return;
            } else if (isStatus === "Published") {
                StatusFunction(isResult, "Published");
                return;
            }
            const simplifiedData = isResult.map((product) => ({
                _id: product._id,
                productName: product.productName,
                productPrice: product.productPrice,
                status: product.status,
                images: product.images[0]
            }));
            setTableData(simplifiedData);
        }
    }, [isResult, isStatus]);

    return (
        <>
            {isResult ? (
                <div className='px-6 pt-5 pb-16 sm:px-2 sm:py-5 sm:pl-16 sm:pr-4 lg:px-5 xl:px-12'>
                <div className='flex justify-between'>
                <div className='flex gap-1 items-center'>
                    <div className='w-3 h-6 rounded-sm bg-[#C4BAF6]'></div>
                    <h1 className='text-2xl font-semibold'>Products</h1>
                </div>
                <button className='flex gap-1 bg-blue-600 rounded-md justify-center items-center text-white px-2 text-xs' onClick={()=> setActiveTab('Add New Product')}>
                    <Plus size={20}/>
                    Add New
                </button>
                </div>
                <DataTableComp/>
                </div>
            ) : (
                <TabsLoading/>
            )}
        </>
    )
}
