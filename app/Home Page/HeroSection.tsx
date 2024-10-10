import React from 'react'
import NavBar from './Components/NavBar'
import HomePageUi from './Components/HomePageUi'

const HeroSection = () => {
    return (
        <>
            <div id='Home' className='Home h-screen bg-gray-100 flex flex-col'>
                <NavBar/>
                <HomePageUi/>   
                {/* you can also add an flex-grow to div */}
            </div>

            <div id='About' className="About h-screen bg-gray-100">
                <h1>About</h1>
            </div>
        </>
    )
}

export default HeroSection
