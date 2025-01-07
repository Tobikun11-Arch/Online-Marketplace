import React, { useState } from 'react'
import { Settings, ChevronDown, ChevronUp, User, CreditCard } from 'lucide-react'
import { useSideBarState } from '../../state/Sidebar'
import TabItem from '../TabItem'
import UseScreenSize from '../UseScreenSize'

const SettingsTab = () => {
    const { activeTab, setActiveTab } = useSideBarState()
    const [ isOpen, setOpen ] = useState<boolean>(false)
    const { width } = UseScreenSize();
    const isLargeScreen = width >= 1024; 

    const handeOpen = () => {
        setActiveTab('Settings')
        setOpen(!isOpen)
    }

    return (
        <>
            <div className={`flex justify-between tooltip tooltip-right items-center rounded-md hover:bg-blue-600 pl-3 py-2 pr-2 hover:text-white ${activeTab === 'Settings' && 'bg-blue-600 text-white'}`} onClick={handeOpen} data-tip={!isLargeScreen ? "Settings" : ""}>
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
            <div className='lg:pl-2 flex flex-col gap-1 text-sm'>
                {isOpen && (
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
