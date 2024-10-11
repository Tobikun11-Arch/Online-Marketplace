"use client"
import React from 'react'
import { motion, AnimatePresence } from "framer-motion"

interface PageWrapperProps {
    children: React.ReactNode;
}

const PageWrapper = ({children}: PageWrapperProps) => {
    return (
        <>
            <AnimatePresence>
                <motion.div
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}    
                exit={{ opacity: 0, scale: 0.9 }}   
                transition={{
                    duration: 0.8,                    
                    ease: [0.6, -0.05, 0.01, 0.99],    
                }}
                className='min-h-screen flex items-center justify-center'>
                    {children}
                </motion.div>
            </AnimatePresence>
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