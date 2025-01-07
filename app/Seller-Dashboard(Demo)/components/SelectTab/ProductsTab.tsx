import React, { useState } from 'react'
import { ShoppingCart, ChevronDown, ChevronUp, PackagePlus, Package, Settings2 } from 'lucide-react'
import { useSideBarState } from '../../state/Sidebar'
import TabItem from '../TabItem'
import UseScreenSize from '../UseScreenSize'

const ProductsTab = () => {
    const { activeTab, setActiveTab } = useSideBarState()
    const [ isOpen, setOpen ] = useState<boolean>(false)
    const { width } = UseScreenSize();
    const isLargeScreen = width >= 1024; 

    const handeOpen = () => {
        setActiveTab('Products')
        setOpen(!isOpen)
    }

    return (
        <>
            <div className={`flex justify-between tooltip tooltip-right items-center rounded-md hover:bg-blue-600 pl-3 py-2 pr-2 hover:text-white ${activeTab === 'Products' && 'bg-blue-600 text-white'}`} onClick={handeOpen} data-tip={!isLargeScreen ? "Products" : ""}>
                <div className="flex items-center gap-2">
                    <ShoppingCart size={20}/>
                    <h2 className='hidden lg:block'>Products</h2>
                </div>
                {isOpen ? (
                    <ChevronUp size={20} className='hidden lg:block'/>
                ) : (
                    <ChevronDown size={20} className='hidden lg:block'/>
                )}
            </div>
            <div className='lg:pl-2 flex flex-col gap-1 text-sm'>
                {isOpen && (
                    <>
                        <TabItem
                        icon={PackagePlus}
                        label='Add New Product'
                        isActive={activeTab === 'Add New Product'}
                        onClick={() => setActiveTab('Add New Product')}
                        tooltip='Add New Product'
                        />

                        <TabItem
                        icon={Settings2}
                        label='Manage Products'
                        isActive={activeTab === 'Manage Products'}
                        onClick={() => setActiveTab('Manage Products')}
                        tooltip='Manage Products'
                        />

                        <TabItem
                        icon={Package}
                        label='Inventory'
                        isActive={activeTab === 'Inventory'}
                        onClick={() => setActiveTab('Inventory')}
                        tooltip='Inventory'
                        />
                    </>
                )}
            </div>
        </>
    )
}

export default ProductsTab
