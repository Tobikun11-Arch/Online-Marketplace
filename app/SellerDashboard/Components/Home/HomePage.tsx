
import BoxItem from '../Common/BoxItem'               
import AddProduct from './AddProduct'
import {Download} from 'lucide-react'

export default function HomePage() {

  return (
    <>
        <div className='w-full min-h-screen flex items-start flex-col cursor-default pb-4 dark:text-black'>
          <h1 className='foont-abc font-bold text-3xl cursor-default mt-12 xl:mt-10 xl:ml-64 pl-3'>Your Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 w-full xl:w-3/4 md:grid-cols-4 p-2 gap-2 xl:mt-0 BoxItemContainer xl:ml-64">
              <BoxItem 
              DataNumber={1}
              label='Incomplete'
              />

              <BoxItem 
              DataNumber={7}
              label='InReview'
              />

              <BoxItem 
              DataNumber={3}
              label='Published'
              />

              <BoxItem 
              DataNumber={2}  
              label='Archived'
              />
            </div>
          <h1 className='font-abc font-semibold mt-4 CreateProduct cursor-default px-4 xl:ml-64'>Create a New Product</h1>

          <div className='xl:ml-64 px-4 xl:pl-4 xl:pr-2 mt-2 w-full xl:w-3/4 AddProductBtn'>
          <AddProduct
          href='/SellerDashboard/NewProduct'
          label='Add new Product' 
          />
          </div>

          <div className="Sales px-4 pt-4 w-full">
            <div className="flex justify-between xl:ml-64 mt-2 w-full xl:w-3/4">
              <h1 className='font-bold'>Latest Sales</h1>
              <div className="flex gap-1 items-center px-3 py-1 border">
                <Download size={15}/>
                <p className='text-xs'>Download Report</p>
              </div>
            </div>

            <div className='xl:ml-64 mt-2 w-full xl:w-3/4 overflow-x-auto border rounded-md'>
            <table className="min-w-full table-auto border-collapse rounded-lg cursor-default ">
              <thead className="bg-white">
                <tr>
                  <th className="px-4 py-2 border-b-2 border-gray-500 text-left">Product Name</th>
                  <th className="px-4 py-2 border-b-2 border-gray-500 text-left">Price</th>
                  <th className="px-4 py-2 border-b-2 border-gray-500 text-left">Date</th>
                  <th className="px-4 py-2 border-b-2 border-gray-500 text-left">Order id</th>
                </tr>
              </thead>

              <tbody>
                <tr className='bg-white border-b border-gray-400'>
                <td className="pl-4 pr-16 py-2 cursor-default text-sm text-gray-800">Product Name</td>
                  <td className="pl-4 pr-16 py-2 cursor-default text-sm text-gray-800">Price</td>
                  <td className="pl-4 pr-16 py-2 cursor-default text-sm text-gray-800">Date</td>
                  <td className="pl-4 pr-16 py-2 cursor-default text-sm text-gray-800">Order id</td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>

        </div>
    </>
  )
}