import React, { useState } from 'react'
import { ShoppingCart, ChevronDown, ChevronUp, PackagePlus, Package, Settings2 } from 'lucide-react'
import { useSideBarState } from '../../state/Sidebar'
import TabItem from '../TabItem'

const ProductsTab = () => {
    const { activeTab, setActiveTab } = useSideBarState()
    const [ isOpen, setOpen ] = useState<boolean>(false)

    const handeOpen = () => {
        setActiveTab('Products')
        setOpen(!isOpen)
    }

    return (
        <>
            <div className={`flex justify-between items-center rounded-md hover:bg-blue-600 pl-3 py-2 pr-2 hover:text-white ${activeTab === 'Products' && 'bg-blue-600 text-white'}`} onClick={handeOpen}>
                <div className="flex gap-2">
                    <ShoppingCart size={20}/>
                    <h2>Products</h2>
                </div>
                {isOpen ? (
                    <ChevronUp size={20}/>
                ) : (
                    <ChevronDown size={20}/>
                )}
            </div>
            <div className='pl-2 flex flex-col gap-1'>
                {isOpen && (
                    <>
                        <TabItem
                        icon={PackagePlus}
                        label='Add New Product'
                        isActive={activeTab === 'Add New Product'}
                        onClick={() => setActiveTab('Add New Product')}
                        />

                        <TabItem
                        icon={Settings2}
                        label='Manage Products'
                        isActive={activeTab === 'Manage Products'}
                        onClick={() => setActiveTab('Manage Products')}
                        />

                        <TabItem
                        icon={Package}
                        label='Inventory'
                        isActive={activeTab === 'Inventory'}
                        onClick={() => setActiveTab('Inventory')}
                        />
                    </>
                )}
            </div>
        </>
    )
}

export default ProductsTab
