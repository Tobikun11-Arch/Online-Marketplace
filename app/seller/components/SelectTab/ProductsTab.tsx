import React, { useEffect, useState } from 'react'
import { ShoppingCart, ChevronDown, ChevronUp, PackagePlus, Package, Settings2 } from 'lucide-react'
import { useSideBarState } from '../../state/Sidebar'
import TabItem from '../TabItem'

const ProductsTab = () => {
    const { activeTab, setActiveTab, setMainTab, mainTab } = useSideBarState()
    const [ isOpen, setOpen ] = useState<boolean>(false)

    const handeOpen = () => {
        setMainTab('Products')
        setOpen(!isOpen)
    }

    useEffect(()=> {
        if(mainTab !== 'Products') {
            setOpen(false)
        }
    }, [isOpen, mainTab])

    return (
        <>
            <div className={`flex items-center rounded-md hover:bg-blue-600 lg:justify-between justify-center lg:pl-3 lg:pr-2 py-2 hover:text-white px-2`} onClick={handeOpen}>
                <div className="flex items-center gap-2">
                    <div className="tooltip sm:tooltip-right" data-tip="Products">
                        <ShoppingCart size={20} />
                    </div>
                    <h2 className='hidden lg:block'>Products</h2>
                </div>
                {isOpen ? (
                    <ChevronUp size={20} className='hidden lg:block'/>
                ) : (
                    <ChevronDown size={20} className='hidden lg:block'/>
                )}
            </div>
            <div className={`lg:pl-2 flex flex-row sm:flex-col gap-1 text-sm`}>
                {isOpen && mainTab === 'Products' && (
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
