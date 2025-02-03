import React, { useState, useEffect } from 'react'
import { Users, ChevronDown, ChevronUp, FileCode, Mails } from 'lucide-react'
import { useSideBarState } from '../../state/Sidebar'
import TabItem from '../TabItem'

const CustManagementTab = () => {
    const { activeTab, setActiveTab, setMainTab, mainTab } = useSideBarState()
    const [ isOpen, setOpen ] = useState<boolean>(false)

    const handeOpen = () => {
        setMainTab('Customer')
        setOpen(!isOpen)
    }

    useEffect(()=> {
        if(mainTab !== 'Customer') {
            setOpen(false)
        }
    }, [isOpen, mainTab])

    return (
        <>
            <div className={`flex items-center rounded-md hover:bg-blue-600 lg:justify-between justify-center lg:pl-3 lg:pr-2 py-2 hover:text-white px-2`} onClick={handeOpen}>
                <div className="flex items-center gap-2">
                    <div className="tooltip sm:tooltip-right" data-tip="Users">
                        <Users size={20}/>
                    </div>
                    <h2 className='hidden lg:block'>Users</h2>
                </div>
                {isOpen ? (
                    <ChevronUp size={20} className='hidden lg:block'/>
                ) : (
                    <ChevronDown size={20} className='hidden lg:block'/>
                )}
            </div>
            <div className={`lg:pl-2 flex flex-row sm:flex-col gap-1 text-sm`}>
                {isOpen && mainTab === 'Customer' && (
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
                        label='Announcement'
                        isActive={activeTab === 'Messages/Support'}
                        onClick={() => setActiveTab('Messages/Support')}
                        tooltip='Announcement'
                        />
                    </>
                )}
            </div>
        </>
    )
}

export default CustManagementTab
