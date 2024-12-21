import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

const AppearanceTab = () => {
    const { setTheme, theme } = useTheme()
    const [ selectedTheme, setSelected ] = useState<string>(theme || 'dark')

    const handleTheme = (theme: string) => {
        setTheme(theme)
        setSelected(theme)
    }

    return (
        <div>
            <h1 className='text-xl font-bold'>Appearance</h1>
            <h2 className='text-xs text-gray-800 dark:text-gray-500 font-semibold w-3/5'>Customize the appearance of the app. Automatically switch between day and night themes.</h2>
            <div className='mt-5'>
                <h1 className='font-semibold'>Theme</h1>
                <h2 className='text-xs text-gray-800 dark:text-gray-500 font-semibold'>Select the theme for the dashboard.</h2>
            </div>

            <div className='flex flex-col gap-5 sm:flex-row sm:gap-2 mt-4'>
                <div className={`w-full h-40 bg-white rounded-lg p-4 space-y-2 relative ${selectedTheme === 'light' ? 'border-black border-4' : 'border-[#3333]'}`} onClick={()=> handleTheme('light')}>
                    <div className="flex justify-between items-center space-x-4">
                        <div className="flex space-x-1">
                            <div className="w-8 h-2 bg-gray-700 rounded"></div> 
                            <div className="w-8 h-2 bg-gray-700 rounded"></div>
                            <div className="w-8 h-2 bg-gray-700 rounded"></div>
                        </div>
                        <div className="flex space-x-1">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        </div>
                    </div>
                    <div className="w-full h-4 bg-green-600 rounded"></div>
                    <div className='absolute bottom-1 flex gap-1'>
                        <h2 className='text-black font-medium'>Light theme</h2>
                    </div>
                </div>

                <div className={`w-full h-40 bg-gray-800 rounded-lg p-4 space-y-2 relative ${selectedTheme === "dark" && 'border-white border-4'}`} onClick={()=> handleTheme('dark')}>
                    <div className="flex justify-between items-center space-x-4">
                        <div className="flex space-x-1">
                            <div className="w-8 h-2 bg-gray-700 rounded"></div>
                            <div className="w-8 h-2 bg-gray-700 rounded"></div>
                            <div className="w-8 h-2 bg-gray-700 rounded"></div>
                        </div>
                        <div className="flex space-x-1">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        </div>
                    </div>
                    <div className="w-full h-4 bg-green-600 rounded"></div>
                    <div className='absolute bottom-1 flex gap-1'>
                        <h2 className='text-white font-medium'>Dark theme</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppearanceTab
