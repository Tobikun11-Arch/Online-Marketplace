import React, { useState } from 'react'
import { Users, ChevronDown, ChevronUp, FileCode, Mails } from 'lucide-react'
import { useSideBarState } from '../../state/Sidebar'
import TabItem from '../TabItem'
import UseScreenSize from '../UseScreenSize'

const CustManagementTab = () => {
    const { activeTab, setActiveTab } = useSideBarState()
    const [ isOpen, setOpen ] = useState<boolean>(false)
    const { width } = UseScreenSize();
    const isLargeScreen = width >= 1024; 

    const handeOpen = () => {
        console.log(width)
        setActiveTab('Customer')
        setOpen(!isOpen)
    }

    return (
        <>
            <div className={`flex tooltip tooltip-right justify-between items-center rounded-md hover:bg-blue-600 pl-3 py-2 pr-2 hover:text-white ${activeTab === 'Customer' && 'bg-blue-600 text-white'}`} onClick={handeOpen} data-tip={!isLargeScreen ? "Customer" : ""}>
                <div className="flex items-center gap-2">
                    <Users size={20}/>
                    <h2 className='hidden lg:block'>Customer</h2>
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
                        icon={FileCode}
                        label='Customer List'
                        isActive={activeTab === 'Customer List'}
                        onClick={() => setActiveTab('Customer List')}
                        tooltip='Customer List'
                        />

                        <TabItem
                        icon={Mails}
                        label='Messages/Support'
                        isActive={activeTab === 'Messages/Support'}
                        onClick={() => setActiveTab('Messages/Support')}
                        tooltip='Messages/Support'
                        />
                    </>
                )}
            </div>
        </>
    )
}

export default CustManagementTab
