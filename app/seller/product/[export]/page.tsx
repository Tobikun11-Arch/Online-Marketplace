"use client"
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { httpRequestGet } from '../../services/axios-instance/GetInstance'
import { seller_products } from '../../services/axios/ProductRequests'
import { useUser } from '../../state/User'
import { useProducts } from '../../state/manage-products/Products'
import html2pdf from 'html2pdf.js'

export default function Page() {
    const params = useParams()
    const { user } = useUser()
    const { setExport, isExport } = useProducts()
    
    useEffect(()=> {
        const handle_export = async() => {
            try {
                const paramsArray = Object.values(params).map(value => value.toString());
                const response = await httpRequestGet('', seller_products, user?._id, paramsArray)
                if(response) {
                    setExport(Array.isArray(response.user_data) ? response.user_data : [response.user_data])
                }
            } catch (error) {
                console.error("Internal error: ", error)
            }
        }
        handle_export()
    }, [])

    async function handleExportPDF() {
        const element = document.querySelector('#exportpdf')
        if (element && isExport.length > 0) {
            const productName = isExport[0].productName; 
            const fileName = `${productName}.pdf`;

            const options = {
                margin: 10,
                filename: fileName,
                html2canvas: {
                    scale: 2,
                    useCORS: true, 
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            };
            
            try {
                await html2pdf().set(options).from(element).save();
            } catch (error) {
                console.error('Error exporting PDF:', error);
            }
        }
    }

    return (
        <div id='exportpdf' className='comtainer h-screen bg-white dark:bg-white text-black p-8'>
        <button className='bg-black py-1 px-3 text-white shadow-md rounded-md' onClick={handleExportPDF} data-html2canvas-ignore>Export to pdf</button>
        <div className='space-y-4 mt-3'>
            {isExport.map((product, index) => (
                <div key={index} className='p-4 rounded-lg shadow-sm'>
                    <h1 className='text-xl font-semibold'>{product.productName}</h1>
                    <p className='text-gray-500 text-sm'>Product description: {product.productDescription}</p>
                    <div className='grid sm:grid-cols-2 gap-2 mt-2'>
                        <p><strong>Category:</strong> {product.productCategory}</p>
                        <p><strong>Price:</strong> ${product.productPrice}</p>
                        <p><strong>Stock:</strong> {product.productStock}</p>
                        <p><strong>Quality:</strong> {product.productQuality}</p>
                        <p><strong>Size:</strong> {product.productSize}</p>
                        <p><strong>Discount:</strong> {product.productDiscount}%</p>
                    </div>
                    <div className='mt-8'>
                        <strong>Product images:</strong>
                        <div className='flex space-x-2 mt-2'>
                            {product.images.map((image, idx) => (
                                <img
                                    key={idx}
                                    src={image}
                                    alt={`Product ${index + 1} Image ${idx + 1}`}
                                    className='w-20 h-20 sm:w-36 sm:h-36 object-cover rounded'
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    )
}
