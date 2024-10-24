"use client"
import React from 'react'
import NavBar from './Components/NavBar'
import HomePageUi from './Components/HomePageUi'

const HeroSection = () => {
    return (
        <>
            <div className='Home h-screen flex flex-col dark:bg-gray-950'>
                <NavBar/>
                <div className="flex-grow">
                    <HomePageUi/>
                </div>
            </div>
        </>
    )
}

export default HeroSection
