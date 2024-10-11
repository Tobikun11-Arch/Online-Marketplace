"use client"
import React from 'react'
import NavBar from './Components/NavBar'
import HomePageUi from './Components/HomePageUi'
import PageWrapper from './Components/ui/PageWrapper'

const HeroSection = () => {
    return (
        <>
            <div id='Home' className='Home h-screen flex flex-col dark:bg-gray-950'>
                <NavBar/>
                <PageWrapper>
                    <HomePageUi/> 
                </PageWrapper>  
                {/* you can also add an flex-grow to div */}
            </div>

            <div id='About' className="About h-screen bg-white dark:bg-gray-950">
                <h1>About</h1>
            </div>
        </>
    )
}

export default HeroSection
