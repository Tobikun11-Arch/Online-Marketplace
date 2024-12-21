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
                  initial={{ opacity: 0, y: 100 }}  // Start from the bottom (y: 100)
                  animate={{ opacity: 1, y: 0 }}    // Move to the normal position (y: 0)
                  exit={{ opacity: 0, y: 100 }}     // Animate back to the bottom on exit
                    transition={{
                    duration: 0.8,
                    ease: [0.6, -0.05, 0.01, 0.99],    
                    }}
                className='h-full'> 
                {/* min-h-screen flex items-center justify-center */}
                    {children}
                </motion.div>
            </AnimatePresence>
        </>
    )
}

export default PageWrapper