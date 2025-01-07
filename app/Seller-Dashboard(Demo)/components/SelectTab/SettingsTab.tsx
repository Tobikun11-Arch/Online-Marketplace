import React, { useState, useEffect } from 'react'
import { Settings, ChevronDown, ChevronUp, User, CreditCard } from 'lucide-react'
import { useSideBarState } from '../../state/Sidebar'
import TabItem from '../TabItem'
import UseScreenSize from '../UseScreenSize'

const SettingsTab = () => {
    const { activeTab, setActiveTab, setMainTab, mainTab } = useSideBarState()
    const [ isOpen, setOpen ] = useState<boolean>(false)
    const { width } = UseScreenSize();
    const isLargeScreen = width >= 1024; 

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
            <div className={`flex tooltip tooltip-right items-center rounded-md hover:bg-blue-600 lg:justify-between justify-center lg:pl-3 lg:pr-2 py-2 hover:text-white px-2`} onClick={handeOpen} data-tip={!isLargeScreen ? "Settings" : ""}>
                <div className="flex items-center gap-2">
                    <Settings size={20}/>
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
                        icon={User}
                        label='Profile'
                        isActive={activeTab === 'Profile'}
                        onClick={() => setActiveTab('Profile')}
                        tooltip='Profile'
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
