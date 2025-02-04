import React, { useState, useEffect } from 'react'
import { Settings, ChevronDown, ChevronUp, UserPen, CreditCard } from 'lucide-react'
import { useSideBarState } from '../../state/Sidebar'
import TabItem from '../TabItem'

const SettingsTab = () => {
    const { activeTab, setActiveTab, setMainTab, mainTab } = useSideBarState()
    const [ isOpen, setOpen ] = useState<boolean>(false)

    const handeOpen = () => {
        setMainTab('Settings')
        setOpen(!isOpen)
    }

    useEffect(()=> {
        if(mainTab !== 'Settings') {
            setOpen(false)
        }
    }, [isOpen, mainTab])

    return (
        <>
            <div className={`flex items-center rounded-md hover:bg-blue-600 lg:justify-between justify-center lg:pl-3 lg:pr-2 py-2 hover:text-wh    ite px-2`} onClick={handeOpen}>
                <div className="flex items-center gap-2">
                    <div className="tooltip sm:tooltip-right" data-tip="Settings">
                        <Settings size={20}/>
                    </div>
                    <h2 className='hidden lg:block'>Settings</h2>
                </div>
                {isOpen ? (
                    <ChevronUp size={20} className='hidden lg:block'/>
                ) : (
                    <ChevronDown size={20} className='hidden lg:block'/>
                )}
            </div>
            <div className={`lg:pl-2 flex flex-row sm:flex-col gap-1 text-sm`}>
                {isOpen && mainTab === 'Settings' && (
                    <>
                        <TabItem
                        icon={UserPen}
                        label='My Account'
                        isActive={activeTab === 'Profile'}
                        onClick={() => setActiveTab('Profile')}
                        tooltip='My Account'
                        />

                        <TabItem
                        icon={CreditCard}
                        label='Payment Methods'
                        isActive={activeTab === 'Payment Methods'}
                        onClick={() => setActiveTab('Payment Methods')}
                        tooltip='Payment Methods'
                        />
                    </>
                )}
            </div>
        </>
    )
}

export default SettingsTab
