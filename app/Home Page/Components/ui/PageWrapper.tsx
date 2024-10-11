"use client"
import React from 'react'
import { motion, AnimatePresence } from "framer-motion"

interface PageWrapperProps {
    children: React.ReactNode;
}

const PageWrapper = ({children}: PageWrapperProps) => {
    return (
        <>
            <motion.div
            initial={{ opacity: 0, scale: 0.9 }}  // Start slightly smaller and faded
            animate={{ opacity: 1, scale: 1 }}    // Fade in and grow to full size
            exit={{ opacity: 0, scale: 0.9 }}     // Shrink and fade out
            transition={{
                duration: 0.8,                     // Control the speed of the animation
                ease: [0.6, -0.05, 0.01, 0.99],    // Smooth easing for a natural feel
            }}
            className='min-h-screen flex items-center justify-center'>
                {children}
            </motion.div>
        </>
    )
}

export default PageWrapper


{/* <AnimatePresence>
<motion.div 
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
className='min-h-screen flex items-center justify-center'> 
    {children}
</motion.div>
</AnimatePresence> */}